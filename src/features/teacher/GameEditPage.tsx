import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Loading, Modal } from '@/shared/components';
import {
  getGame,
  getQuestions,
  createGame,
  updateGame,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
} from '@/services';
import { uploadQuestionImage } from '@/services/storageService';
import { Question, QuestionType, Choice } from '@/types';
import { generateId, parseCsv, toCsv } from '@/utils';
import { DEFAULT_TIME_LIMIT, DEFAULT_POINTS } from '@/constants';

const gameSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  description: z.string().optional(),
  shuffleQuestions: z.boolean(),
  shuffleChoices: z.boolean(),
});

type GameForm = z.infer<typeof gameSchema>;

const questionSchema = z.object({
  type: z.enum(['multiple-choice', 'true-false', 'image']),
  text: z.string().min(1, '問題文は必須です'),
  timeLimit: z.number().min(5).max(120),
  points: z.number().min(100).max(5000),
  explanation: z.string().optional(),
});

type QuestionForm = z.infer<typeof questionSchema>;

export function GameEditPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNew = !gameId || gameId === 'create';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(gameId || '');
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GameForm>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: '',
      description: '',
      shuffleQuestions: false,
      shuffleChoices: false,
    },
  });

  const fetchData = useCallback(async () => {
    if (isNew || !gameId) return;
    setIsLoading(true);
    try {
      const game = await getGame(gameId);
      if (game) {
        reset({
          title: game.title,
          description: game.description,
          shuffleQuestions: game.shuffleQuestions,
          shuffleChoices: game.shuffleChoices,
        });
        setCurrentGameId(game.id);
      }
      const qs = await getQuestions(gameId);
      setQuestions(qs);
    } catch {
      alert('データの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, [gameId, isNew, reset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSaveGame = async (data: GameForm) => {
    if (!user) return;
    setIsSaving(true);
    try {
      if (isNew || !currentGameId) {
        const id = await createGame({
          title: data.title,
          description: data.description || '',
          hostId: user.uid,
          status: 'draft',
          questionCount: 0,
          shuffleQuestions: data.shuffleQuestions,
          shuffleChoices: data.shuffleChoices,
        });
        setCurrentGameId(id);
        navigate(`/games/${id}/edit`, { replace: true });
      } else {
        await updateGame(currentGameId, {
          title: data.title,
          description: data.description || '',
          shuffleQuestions: data.shuffleQuestions,
          shuffleChoices: data.shuffleChoices,
        });
      }
    } catch {
      alert('保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('この問題を削除しますか？')) return;
    try {
      await deleteQuestion(currentGameId, questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } catch {
      alert('削除に失敗しました');
    }
  };

  const handleDuplicateQuestion = async (questionId: string) => {
    try {
      await duplicateQuestion(currentGameId, questionId);
      const qs = await getQuestions(currentGameId);
      setQuestions(qs);
    } catch {
      alert('コピーに失敗しました');
    }
  };

  const handleCsvImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const rows = parseCsv(text);
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i] as Record<string, string>;
        const type = (row['type'] || 'multiple-choice') as QuestionType;
        const choices: Choice[] = type === 'true-false'
          ? [
              { id: generateId(), text: '○', isCorrect: row['correctIndex'] === '0' },
              { id: generateId(), text: '×', isCorrect: row['correctIndex'] === '1' },
            ]
          : [
              { id: generateId(), text: row['choice1'] || '', isCorrect: row['correctIndex'] === '0' },
              { id: generateId(), text: row['choice2'] || '', isCorrect: row['correctIndex'] === '1' },
              { id: generateId(), text: row['choice3'] || '', isCorrect: row['correctIndex'] === '2' },
              { id: generateId(), text: row['choice4'] || '', isCorrect: row['correctIndex'] === '3' },
            ];

        await addQuestion(currentGameId, {
          gameId: currentGameId,
          type,
          text: row['text'] || '',
          choices,
          timeLimit: parseInt(row['timeLimit'] || String(DEFAULT_TIME_LIMIT)),
          points: parseInt(row['points'] || String(DEFAULT_POINTS)),
          explanation: row['explanation'] || '',
          imageUrl: null,
          order: questions.length + i,
        });
      }
      
      const qs = await getQuestions(currentGameId);
      setQuestions(qs);
    };
    input.click();
  };

  const handleCsvExport = () => {
    const data = questions.map(q => ({
      type: q.type,
      text: q.text,
      choice1: q.choices[0]?.text || '',
      choice2: q.choices[1]?.text || '',
      choice3: q.choices[2]?.text || '',
      choice4: q.choices[3]?.text || '',
      correctIndex: String(q.choices.findIndex(c => c.isCorrect)),
      timeLimit: String(q.timeLimit),
      points: String(q.points),
      explanation: q.explanation,
    }));
    const csv = toCsv(data, ['type', 'text', 'choice1', 'choice2', 'choice3', 'choice4', 'correctIndex', 'timeLimit', 'points', 'explanation']);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/games" className="text-primary-600 hover:underline text-sm mb-4 inline-block">&larr; ゲーム一覧に戻る</Link>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isNew ? 'ゲーム作成' : 'ゲーム編集'}
        </h1>

        {/* Game settings form */}
        <form onSubmit={handleSubmit(onSaveGame)} className="card mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">タイトル</label>
              <input {...register('title')} className="input-field" placeholder="クイズのタイトル" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">説明</label>
              <textarea {...register('description')} className="input-field" rows={2} placeholder="クイズの説明（任意）" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('shuffleQuestions')} className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">問題シャッフル</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('shuffleChoices')} className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">選択肢シャッフル</span>
              </label>
            </div>
            <Button type="submit" isLoading={isSaving}>保存</Button>
          </div>
        </form>

        {/* Questions section */}
        {currentGameId && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">問題一覧 ({questions.length}問)</h2>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddQuestion}>問題追加</Button>
                <Button variant="secondary" size="sm" onClick={handleCsvImport}>CSVインポート</Button>
                <Button variant="secondary" size="sm" onClick={handleCsvExport}>CSVエクスポート</Button>
              </div>
            </div>

            <Reorder.Group
              axis="y"
              values={questions}
              onReorder={async (newOrder) => {
                setQuestions(newOrder);
                for (let i = 0; i < newOrder.length; i++) {
                  if (newOrder[i].order !== i) {
                    await updateQuestion(currentGameId, newOrder[i].id, { order: i });
                  }
                }
              }}
              className="space-y-3"
            >
              <AnimatePresence>
                {questions.map((question, index) => (
                  <Reorder.Item key={question.id} value={question}>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="card flex items-center gap-4"
                    >
                      <span className="text-lg font-bold text-gray-400 w-8">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{question.text}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {question.type === 'multiple-choice' ? '四択' : question.type === 'true-false' ? '○×' : '画像'} ・ {question.timeLimit}秒 ・ {question.points}点
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditQuestion(question)}>編集</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDuplicateQuestion(question.id)}>コピー</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(question.id)}>削除</Button>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {questions.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>まだ問題がありません</p>
                <Button className="mt-4" onClick={handleAddQuestion}>最初の問題を追加</Button>
              </div>
            )}
          </div>
        )}

        {/* Question Edit Modal */}
        <QuestionEditModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          question={editingQuestion}
          gameId={currentGameId}
          order={questions.length}
          onSaved={async () => {
            const qs = await getQuestions(currentGameId);
            setQuestions(qs);
            setIsQuestionModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

/** Question Edit Modal Component */
function QuestionEditModal({
  isOpen,
  onClose,
  question,
  gameId,
  order,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  gameId: string;
  order: number;
  onSaved: () => void;
}) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: 'multiple-choice',
      text: '',
      timeLimit: DEFAULT_TIME_LIMIT,
      points: DEFAULT_POINTS,
      explanation: '',
    },
  });

  const questionType = watch('type');

  useEffect(() => {
    if (question) {
      reset({
        type: question.type,
        text: question.text,
        timeLimit: question.timeLimit,
        points: question.points,
        explanation: question.explanation,
      });
      setChoices(question.choices);
    } else {
      reset({
        type: 'multiple-choice',
        text: '',
        timeLimit: DEFAULT_TIME_LIMIT,
        points: DEFAULT_POINTS,
        explanation: '',
      });
      setChoices([
        { id: generateId(), text: '', isCorrect: true },
        { id: generateId(), text: '', isCorrect: false },
        { id: generateId(), text: '', isCorrect: false },
        { id: generateId(), text: '', isCorrect: false },
      ]);
    }
  }, [question, reset, isOpen]);

  useEffect(() => {
    if (questionType === 'true-false' && choices.length !== 2) {
      setChoices([
        { id: generateId(), text: '○', isCorrect: true },
        { id: generateId(), text: '×', isCorrect: false },
      ]);
    } else if (questionType === 'multiple-choice' && choices.length < 4) {
      const newChoices = [...choices];
      while (newChoices.length < 4) {
        newChoices.push({ id: generateId(), text: '', isCorrect: false });
      }
      setChoices(newChoices);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType]);

  const onSubmit = async (data: QuestionForm) => {
    setIsSaving(true);
    try {
      let imageUrl: string | null = question?.imageUrl || null;
      if (imageFile) {
        imageUrl = await uploadQuestionImage(imageFile);
      }

      const questionData = {
        gameId,
        type: data.type,
        text: data.text,
        choices,
        timeLimit: data.timeLimit,
        points: data.points,
        explanation: data.explanation || '',
        imageUrl,
        order: question?.order ?? order,
      };

      if (question) {
        await updateQuestion(gameId, question.id, questionData);
      } else {
        await addQuestion(gameId, questionData);
      }
      onSaved();
    } catch {
      alert('保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChoiceChange = (index: number, text: string) => {
    setChoices(prev => prev.map((c, i) => i === index ? { ...c, text } : c));
  };

  const handleCorrectChange = (index: number) => {
    setChoices(prev => prev.map((c, i) => ({ ...c, isCorrect: i === index })));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={question ? '問題を編集' : '問題を追加'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">問題タイプ</label>
          <select {...register('type')} className="input-field">
            <option value="multiple-choice">四択</option>
            <option value="true-false">○×</option>
            <option value="image">画像問題</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">問題文</label>
          <textarea {...register('text')} className="input-field" rows={3} placeholder="問題文を入力" />
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
        </div>

        {(questionType === 'image' || questionType === 'multiple-choice') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">画像（任意）</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="input-field"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">選択肢</label>
          <div className="space-y-2">
            {choices.map((choice, index) => (
              <div key={choice.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={choice.isCorrect}
                  onChange={() => handleCorrectChange(index)}
                  className="text-primary-600"
                />
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="input-field flex-1"
                  placeholder={`選択肢 ${index + 1}`}
                  disabled={questionType === 'true-false'}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">制限時間（秒）</label>
            <input type="number" {...register('timeLimit', { valueAsNumber: true })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">配点</label>
            <input type="number" {...register('points', { valueAsNumber: true })} className="input-field" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">解説（任意）</label>
          <textarea {...register('explanation')} className="input-field" rows={2} placeholder="正解の解説" />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isSaving} className="flex-1">保存</Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">キャンセル</Button>
        </div>
      </form>
    </Modal>
  );
}

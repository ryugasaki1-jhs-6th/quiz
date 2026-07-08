import { generateId } from '@/utils';
import { Question } from '@/types';

export interface QuizTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  questions: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'gameId'>[];
}

export const QUIZ_TEMPLATES: QuizTemplate[] = [
  {
    id: 'edo-period-review',
    title: '江戸時代の総復習',
    description: '中学校の歴史で習う江戸時代の政治、外交、文化、人物を網羅した復習テストです。',
    category: '社会',
    subcategory: '歴史',
    questions: [
      {
        type: 'multiple-choice',
        text: '1603年、江戸幕府を開き初代将軍となった人物は誰ですか？',
        choices: [
          { id: generateId(), text: '徳川家康', isCorrect: true },
          { id: generateId(), text: '徳川家光', isCorrect: false },
          { id: generateId(), text: '織田信長', isCorrect: false },
          { id: generateId(), text: '豊臣秀吉', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '徳川家康は関ヶ原の戦いに勝利した後、1603年に征夷大将軍に任命され江戸幕府を開きました。',
        imageUrl: null,
        order: 0,
      },
      {
        type: 'multiple-choice',
        text: '三代将軍・徳川家光が定めた、大名が1年おきに江戸と領地を行き来する制度は何ですか？',
        choices: [
          { id: generateId(), text: '参勤交代', isCorrect: true },
          { id: generateId(), text: '武家諸法度', isCorrect: false },
          { id: generateId(), text: '禁中並公家諸法度', isCorrect: false },
          { id: generateId(), text: '目安箱', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '参勤交代は、大名の経済力を削ぎ、幕府への反乱を防ぐ目的がありました。',
        imageUrl: null,
        order: 1,
      },
      {
        type: 'multiple-choice',
        text: '江戸時代、幕府がキリスト教を禁止するために、キリストやマリアの像を踏ませた行事は何ですか？',
        choices: [
          { id: generateId(), text: '絵踏（踏絵）', isCorrect: true },
          { id: generateId(), text: '宗門改', isCorrect: false },
          { id: generateId(), text: '檀家制度', isCorrect: false },
          { id: generateId(), text: '五人組', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '絵踏は、キリスト教徒を見つけ出すための手段として行われました。',
        imageUrl: null,
        order: 2,
      },
      {
        type: 'multiple-choice',
        text: '「享保の改革」を行い、目安箱の設置や公事方御定書を定めた八代将軍は誰ですか？',
        choices: [
          { id: generateId(), text: '徳川吉宗', isCorrect: true },
          { id: generateId(), text: '徳川綱吉', isCorrect: false },
          { id: generateId(), text: '徳川慶喜', isCorrect: false },
          { id: generateId(), text: '徳川家斉', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '徳川吉宗は「米将軍」とも呼ばれ、幕府の財政再建に努めました。',
        imageUrl: null,
        order: 3,
      },
      {
        type: 'multiple-choice',
        text: '江戸時代中期、上方（京都・大坂）を中心に栄えた、町人の活気あふれる文化は何ですか？',
        choices: [
          { id: generateId(), text: '元禄文化', isCorrect: true },
          { id: generateId(), text: '化政文化', isCorrect: false },
          { id: generateId(), text: '桃山文化', isCorrect: false },
          { id: generateId(), text: '東山文化', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '元禄文化では、松尾芭蕉の俳諧や近松門左衛門の人形浄瑠璃などが有名です。',
        imageUrl: null,
        order: 4,
      },
      {
        type: 'multiple-choice',
        text: '江戸時代後期、江戸を中心に栄えた、皮肉や滑稽さを特徴とする文化は何ですか？',
        choices: [
          { id: generateId(), text: '化政文化', isCorrect: true },
          { id: generateId(), text: '元禄文化', isCorrect: false },
          { id: generateId(), text: '天平文化', isCorrect: false },
          { id: generateId(), text: '国風文化', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '化政文化では、葛飾北斎や歌川広重の浮世絵、伊能忠敬の日本地図などが生まれました。',
        imageUrl: null,
        order: 5,
      },
      {
        type: 'multiple-choice',
        text: '1853年、浦賀に黒船で来航し、幕府に開国を求めたアメリカの提督は誰ですか？',
        choices: [
          { id: generateId(), text: 'ペリー', isCorrect: true },
          { id: generateId(), text: 'ハリス', isCorrect: false },
          { id: generateId(), text: 'マッカーサー', isCorrect: false },
          { id: generateId(), text: 'シャクシャイン', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: 'ペリーの来航により、長年続いた「鎖国」が終わるきっかけとなりました。',
        imageUrl: null,
        order: 6,
      },
      {
        type: 'multiple-choice',
        text: '「解体新書」を出版し、蘭学の発展に貢献した人物は杉田玄白ともう一人は誰ですか？',
        choices: [
          { id: generateId(), text: '前野良沢', isCorrect: true },
          { id: generateId(), text: '本居宣長', isCorrect: false },
          { id: generateId(), text: '平賀源内', isCorrect: false },
          { id: generateId(), text: '緒方洪庵', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '杉田玄白と前野良沢は、オランダ語の解剖書「ターヘル・アナトミア」を翻訳しました。',
        imageUrl: null,
        order: 7,
      },
      {
        type: 'multiple-choice',
        text: '老中として「寛政の改革」を行い、厳しい倹約令を出した人物は誰ですか？',
        choices: [
          { id: generateId(), text: '松平定信', isCorrect: true },
          { id: generateId(), text: '田沼意次', isCorrect: false },
          { id: generateId(), text: '水野忠邦', isCorrect: false },
          { id: generateId(), text: '井伊直弼', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '松平定信は朱子学以外の講義を禁止するなど、保守的な政治を行いました。',
        imageUrl: null,
        order: 8,
      },
      {
        type: 'multiple-choice',
        text: '1867年、政権を朝廷に返した出来事を何といいますか？',
        choices: [
          { id: generateId(), text: '大政奉還', isCorrect: true },
          { id: generateId(), text: '王政復古の大号令', isCorrect: false },
          { id: generateId(), text: '廃藩置県', isCorrect: false },
          { id: generateId(), text: '明治維新', isCorrect: false },
        ],
        timeLimit: 20,
        points: 1000,
        explanation: '十五代将軍・徳川慶喜が大政奉還を行い、約260年続いた江戸幕府が幕を閉じました。',
        imageUrl: null,
        order: 9,
      },
    ],
  },
];

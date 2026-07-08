import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/shared/components';
import { ROUTES } from '@/constants';

const registerSchema = z.object({
  displayName: z.string().min(2, '名前は2文字以上です').max(20, '名前は20文字以下です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上です'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.displayName);
      navigate(ROUTES.HOME);
    } catch {
      setError('登録に失敗しました。メールアドレスが既に使用されている可能性があります。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">新規登録</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">アカウントを作成してください</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">名前</label>
            <input type="text" {...register('displayName')} className="input-field" placeholder="表示名" />
            {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">メールアドレス</label>
            <input type="email" {...register('email')} className="input-field" placeholder="email@example.com" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">パスワード</label>
            <input type="password" {...register('password')} className="input-field" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">パスワード確認</label>
            <input type="password" {...register('confirmPassword')} className="input-field" placeholder="••••••••" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            登録
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          既にアカウントをお持ちの方は{' '}
          <Link to={ROUTES.LOGIN} className="text-primary-600 hover:underline font-medium">
            ログイン
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

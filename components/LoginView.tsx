import React, { useState } from 'react';
import { School, Lock, Mail, ArrowRight } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      // Remover a senha antes de passar o objeto user para o estado global
      const { password, ...safeUser } = user;
      onLogin(safeUser);
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 bg-indigo-600 text-center">
          <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4 backdrop-blur-sm">
            <School className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">EduManager Pro</h1>
          <p className="text-indigo-100 text-sm">Portal de Gestão Escolar</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Acadêmico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="ex: diretor@escola.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-[1.02]"
            >
              Entrar no Sistema
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500 mb-4">Credenciais de Teste (Mock):</p>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between">
                <span><span className="font-bold">Diretor:</span> diretor@escola.com</span>
                <span>123</span>
              </div>
              <div className="flex justify-between">
                <span><span className="font-bold">Prof:</span> prof@escola.com</span>
                <span>123</span>
              </div>
              <div className="flex justify-between">
                <span><span className="font-bold">Aluno:</span> aluno@escola.com</span>
                <span>123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { MOCK_USERS } from '../../constants';

export const useLogin = (onLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulação de delay de rede (opcional, bom para testar o loading)
    // await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      const { password: _, ...safeUser } = user;
      // Salva o token fictício se necessário
      localStorage.setItem('auth_token', 'token-fake-123');
      onLogin(safeUser);
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
    
    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin
  };
};
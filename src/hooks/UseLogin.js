import { useState } from 'react';

export const useLogin = (onLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    // ESSA LINHA É A MAIS IMPORTANTE: Impede o "?" na URL e o refresh
    e.preventDefault(); 
    
    setLoading(true);
    setError(null);

    // Simulação de delay para teste
    setTimeout(() => {
      if (email === 'teste@teste.com' && password === '123') {
        onLogin({
          id: 1,
          name: 'Luan Gabriel',
          role: 'ALUNO', 
          email: email
        });
      } else {
        setError("Email ou senha incorretos.");
      }
      setLoading(false);
    }, 800);
  };

  return {
    email, setEmail,
    password, setPassword,
    error, loading,
    handleLogin
  };
};
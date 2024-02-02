import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validBtn, setValidBtn] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitLogin(email));
    navigate('/carteira');
  };

  useEffect(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = /^[a-z0-9]{6,}$/i;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setValidBtn(false);
    } else {
      setValidBtn(true);
    }
  }, [email, password]);

  return (
    <form onSubmit={ handleSubmit }>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        onChange={ (e) => { setEmail(e.target.value); } }
      />

      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ (e) => { setPassword(e.target.value); } }
      />

      <button
        type="submit"
        disabled={ validBtn }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;

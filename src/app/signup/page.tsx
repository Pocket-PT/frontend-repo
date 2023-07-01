'use client';

import useInput from '@/hooks/useInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUpPage = () => {
  const { handleSubmit } = useForm();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const nickname = 'test';

  const onValid = () => {
    console.log(email, password);
    axios
      .post('http://localhost:3095/api/users', {
        email,
        nickname,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally();
  };
  return (
    <div className="w-2/3 mx-auto mt-16">
      <form onSubmit={handleSubmit(onValid)}>
        <input
          className="w-full mb-4 bg-lightGray"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className="w-full bg-lightGray"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;

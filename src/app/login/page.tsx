'use client';

import useInput from '@/hooks/useInput';
import { cls } from '@/utils/cls';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const router = useRouter();

  const onValid = (e) => {
    axios
      .post(
        'http://localhost:3095/api/users/login',
        { email, password },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('success', response);
        router.push('/');
      })
      .catch((error) => {
        console.log('error', error.response);
      });
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default SignUpPage;

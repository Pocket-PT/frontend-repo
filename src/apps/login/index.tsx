import useInput from 'hooks/useInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import usePushToPage from 'hooks/usePushToPage';
import { Link } from 'gatsby-link';

const SignInPage = () => {
  const { handleSubmit } = useForm<FieldValues>();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { moveTo } = usePushToPage();
  const onValid: SubmitHandler<FieldValues> = () => {
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
        moveTo('Main', false);
      })
      .catch((error) => {
        console.log('error', error.response);
        if (
          error.response.data === '로그인하지 않은 사용자만 접근 가능합니다.'
        ) {
          moveTo('Main', false);
        }
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
      <Link to="/chats">
        <div>TEST</div>
      </Link>
    </div>
  );
};

export default SignInPage;

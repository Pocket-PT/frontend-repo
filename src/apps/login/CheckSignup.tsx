import { useCheckSignupQuery } from 'apis/useCheckSignupQuery';
import LoadingSpinner from 'components/common/LoadingSpinner';
import usePushToPage from 'hooks/usePushToPage';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';
const CheckSignup = () => {
  const { isLoading, isError } = useCheckSignupQuery();
  const { replaceTo } = usePushToPage();
  const { data: userData } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (isError) return;
    console.log(userData);
    if (userData?.message === '특정 회원 상세 조회 성공') {
      replaceTo('Main');
    } else {
      replaceTo('BeforeLogin');
    }
  }, [isError, isLoading, userData]);
  if (isLoading || isError) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>CheckSignup</h1>
    </div>
  );
};

export default CheckSignup;

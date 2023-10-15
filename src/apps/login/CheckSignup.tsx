import { useCheckSignupQuery } from 'apis/useCheckSignupQuery';
import LoadingSpinner from 'components/common/LoadingSpinner';
import usePushToPage from 'hooks/usePushToPage';
import { useEffect } from 'react';
const CheckSignup = () => {
  const { isLoading, isError, data: userData } = useCheckSignupQuery();
  const { replaceTo } = usePushToPage();

  useEffect(() => {
    console.log(isLoading, isError, userData);
    if (isLoading) return;
    if (isError) return;
    if (userData?.data.isAccountSignedUp) {
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

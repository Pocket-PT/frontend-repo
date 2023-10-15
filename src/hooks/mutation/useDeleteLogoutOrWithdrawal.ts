import { useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { myprofileKeys } from 'constants/querykey';
import usePushToPage from 'hooks/usePushToPage';

// kind: logout, withdrawal 중 하나가 들어오게 type 선언

export default function useDeleteLogoutOrWithdrawal(
  kind: 'logout' | 'withdrawal',
) {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { replaceTo } = usePushToPage();

  return useMutation(
    () => {
      return serverInstance.delete(`/api/v1/account/${kind}`);
    },
    {
      onSuccess: () => {
        queryClient.cancelQueries(myprofileKeys.all);
        replaceTo('SignInPage');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('logoutError : ', error);
      },
    },
  );
}

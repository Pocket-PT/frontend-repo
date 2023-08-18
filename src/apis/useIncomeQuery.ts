import { useQuery, UseQueryOptions } from 'react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';
import { IMyProfileKeys, myprofileKeys } from 'constants/querykey';

type IncomeReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = IncomeReturnType<IMyProfileKeys['income']>;

interface Data {
  ptMatchingId: number;
  status: string;
  subscriptionPeriod: number;
  paymentAmount: number;
  expiredDate: string;
  accountId: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}

export interface IncomeData {
  code: number;
  message: string;
  data: {
    totalSales: number;
    ptMatchingSummaryList: Data[];
  };
}

const useIncomeQuery = (
  filters: { value: string; date: string },
  options?: Omit<
    UseQueryOptions<AxiosResponse, unknown, IncomeData, MyProfileKeyReturnType>,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  console.log('query', filters);
  serverInstance.defaults.headers.common[
    'Authorization'
  ] = `eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6WyJtZW1iZXIiXSwic3ViIjoia2ltdGtzNDU2QG5hdmVyLmNvbSIsImlhdCI6MTY5MTEzMzg2MSwiZXhwIjoxNzAxNTAxODYxfQ.ZNHYOzUN5QSjNE_S_6kuPIkUQl_2-TGlopu9mFcvS3gS1j0zwY1rr4WncL0m-C5f16NDfmGmFiObSfUTTkeBLQ`;
  const result = useQuery(
    myprofileKeys.income(),
    () => serverInstance.get(`/api/v1/account/trainer/sales/total`),
    {
      select: (response) => {
        return {
          ...response.data,
          data: {
            ...response.data.data,
            ptMatchingSummaryList:
              !filters.value && !filters.date
                ? response.data.data.ptMatchingSummaryList
                : filters.value && !filters.date
                ? response.data.data.ptMatchingSummaryList.filter(
                    (item: Data) =>
                      item.subscriptionPeriod === Number(filters.value),
                  )
                : !filters.value && filters.date
                ? response.data.data.ptMatchingSummaryList.filter(
                    (item: Data) =>
                      item.expiredDate.slice(0, 7) === filters.date,
                  )
                : response.data.data.ptMatchingSummaryList.filter(
                    (item: Data) =>
                      item.subscriptionPeriod === Number(filters.value) &&
                      item.expiredDate.slice(0, 7) === filters.date,
                  ),
          },
        };
      },
      staleTime: 300000,
      ...options,
    },
  );

  return result;
};

export default useIncomeQuery;

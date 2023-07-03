'use client';

import { Scrollbars } from 'react-custom-scrollbars-2';

const MyProfilePage = () => {
  return (
    <Scrollbars autoHeight autoHeightMin="90vh" autoHide>
      <div className="pb-8">
        <div className="flex flex-col items-center justify-center w-full h-auto mb-8">
          <div className="w-20 h-20 mx-auto mt-6 mb-2 bg-mainPurple rounded-xl" />
          <div>슈퍼맨</div>
          <div className="mb-4 text-sm font-light text-gray">test@1234</div>
          <div>상태메시지 너무길면 ...으로 표시</div>
        </div>
        <div className="mb-8 text-lg">
          <div className="relative flex flex-row mb-8">
            <div className="absolute left-[30%]">이름</div>
            <div className="absolute left-[60%] font-bold">김일곤</div>
          </div>
          <div className="relative flex flex-row mb-8">
            <div className="absolute left-[30%]">생년월일</div>
            <div className="absolute left-[60%] font-bold">1111-11-11</div>
          </div>
        </div>
        <div className="flex justify-center mt-16">내 이력보기</div>
        <div className="relative mx-auto mb-8">
          <div className="relative mx-auto">
            <div className="w-3/4 pt-1 mx-auto border rounded-lg border-gray">
              <div className="container p-4 mx-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-mainPurple">
                        대회명, 자격증
                      </th>
                      <th className="px-4 py-2 text-mainPurple">경력사항</th>
                    </tr>
                  </thead>
                  <tbody className="font-normal">
                    <tr>
                      <td className="px-4 py-2 mx-auto text-center">
                        대회명, 자격증
                      </td>
                      <td className="px-4 py-2 text-center">경력사항</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-center">대회명, 자격증</td>
                      <td className="px-4 py-2 text-center">경력사항</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-center">대회명, 자격증</td>
                      <td className="px-4 py-2 text-center">경력사항</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-center">대회명, 자격증</td>
                      <td className="px-4 py-2 text-center">경력사항</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-center">대회명, 자격증</td>
                      <td className="px-4 py-2 text-center">경력사항</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">PT 금액</div>
        <div className="relative mx-auto">
          <div className="w-3/4 pt-1 mx-auto border rounded-lg border-gray">
            <div className="container p-4 mx-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-mainPurple">개월</th>
                    <th className="px-4 py-2 text-mainPurple">금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 mx-auto text-center">1개월</td>
                    <td className="px-4 py-2 text-center">100,000원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-center">2개월</td>
                    <td className="px-4 py-2 text-center">80,000원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-center">3개월</td>
                    <td className="px-4 py-2 text-center">60,000원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-center">6개월</td>
                    <td className="px-4 py-2 text-center">50,000원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-center">1년 이상</td>
                    <td className="px-4 py-2 text-center">40,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default MyProfilePage;

import PrizeIcon from '../../../public/icons/PrizeIcon';
import ArrowRightIcon from '../../../public/icons/ArrowRightIcon';
import GraphIcon from '../../../public/icons/GraphIcon';
import Link from 'next/link';

const MyProfileCard = () => {
  return (
    <div>
      <div className="flex h-auto py-6">
        <div className="w-20 h-20 rounded-full bg-mainPurple ring-4 ring-lightGray" />
        <div className="flex flex-col justify-center ml-8">
          <div className="mb-2 text-3xl font-extrabold">
            슈퍼맨
            <span className="pl-2 text-sm font-light text-darkGray">
              test@1234
            </span>
          </div>
          <div>상태메시지 너무길면 ...으로 표시</div>
        </div>
      </div>
      <div className="mb-8 text-lg">
        <div>
          <div className="w-full h-[1px] bg-lightGray rounded-full" />
          <div className="relative flex items-center h-16 gap-8">
            <div className="absolute text-sm font-light top-2 left-4 self-baseline text-darkGray">
              개인정보
            </div>
            <div className="absolute flex flex-row gap-8 py-4 right-12">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-1 font-bold">김일곤</div>
                <div className="text-sm text-gray">이름</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-1 font-bold">1111-11-11</div>
                <div className="text-sm text-gray">생년월일</div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] rounded-full bg-lightGray" />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title }: { title: string }) => {
  const getIcon = (title: string) => {
    if (title === '이력관리') return <PrizeIcon fill="#8075F8" />;
    if (title === '매출관리') return <GraphIcon fill="#8075F8" />;
  };
  return (
    <div className="relative flex flex-row items-center w-full h-auto py-3 border rounded shadow border-lightGray hover:border-dark group">
      <div className="w-6 h-6 ml-3">{getIcon(title)}</div>
      <div className="pt-1 ml-8 font-bold text-mainPurple">{title}</div>
      <div className="absolute w-6 h-6 right-6 text-gray group">
        <ArrowRightIcon />
      </div>
    </div>
  );
};

const MyProfilePage = () => {
  return (
    <div className="px-6 pb-8">
      <MyProfileCard />
      <div className="mt-8 mb-1 text-lg font-bold">내 정보관리</div>
      <div className="space-y-2 ">
        <Link href="/myprofile/portfolio">
          <InfoCard title="이력관리" />
        </Link>
        <InfoCard title="매출관리" />
      </div>
      {/* <div className="relative mx-auto mb-8">
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
        </div> */}
    </div>
  );
};

export default MyProfilePage;

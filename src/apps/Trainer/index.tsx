/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import MyLayout from 'components/MyLayout';
import BottomWhitePlain from 'components/common/BottomWhitePlain';
//import { StaticImage } from 'gatsby-plugin-image';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cls } from 'utils/cls';
import numberWithCommas from 'utils/numberWithCommas';
import usePan from 'hooks/usePan';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { animated } from '@react-spring/web';
import { Link } from 'libs/link';

type TrainerPageProps = {
  name: string;
  introduce: string;
  profileUrl: string;
};

const TrainerPageWrapper: ActivityComponentType<TrainerPageProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <TrainerPage params={params} />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrainerPage: React.FC<any> = ({
  params,
}: {
  params: TrainerPageProps;
}) => {
  const { pop } = usePushToPage();
  const { bindUpAndDown, isOpen } = usePan();

  const { name, profileUrl } = params;
  return (
    <div className="relative">
      <button
        className="absolute z-10 w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
      >
        <BackIcon />
      </button>
      <div className="w-full relative h-[100vh] overflow-hidden">
        <div>
          <div className="absolute top-0 w-full h-full -z-40 bg-dark opacity-60" />
          <img
            className="absolute object-cover w-full h-full scale-125 -z-50 blur-lg"
            src={profileUrl}
            alt="trainer-profile"
          />
          <div className="w-full h-full mt-8">
            <img
              className="w-[15vh] rounded-full h-[15vh] mx-auto"
              src={profileUrl}
              alt="trainer-profile"
            />
            <div className="flex flex-col items-center justify-center w-full gap-2 mt-3">
              <div className="text-xl font-bold leading-tight text-white">
                이장민
              </div>
              <div className="text-xs leading-tight text-white text-opacity-60">
                jangmin123@kakao.com
              </div>
            </div>
            <div className="flex gap-[10px] w-full justify-center mt-3">
              <button className="duration-300 ease-in-out transform active:scale-125">
                <a
                  href="https://instagram.com/_leejangmin?igshid=MTVnYXYybjgxd2ZxaQ=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24"
                      height="24"
                      fill="url(#pattern0)"
                      fillOpacity="0.6"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_827_836"
                          transform="scale(0.0111111)"
                        />
                      </pattern>
                      <image
                        id="image0_827_836"
                        width="90"
                        height="90"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEyElEQVR4nO2cy29VVRSHLwOKjqsDCpiAMaKiWIsSHo1xaKLEKY8pCcrDmTiCONKgYUSBBhgCaqLgA5Uo8Q8wGA0+agLqEAExpcRabtvPrHQRSune99G1zzl37/0lN2lu2rXW+eV0nbXX3mfVaplMJpPJZDKZTCaTIsAC4AXgLeAU8AtwHbhFeYxpDD9rTBLb8xJrrdMAngEGgX/oHK4Dh4Cna1UHWAl8QWczCXwOPFWrGsB9wH6gTjzUgffk2mpVAHgE+IF4+R54uGyRVwFXiJ+/gTVlifwscIN0uAH0lZEurpIefwHLinzwSd5KlR+B+4sQWqqL1NkXWuQnIyvh2kU0WBlS6C/bDi0+Pg0lcq+ummJiDHgD6NHPbv2uGSaDLNe1dxEbu2e5ThG7WQ6G6MJ1UoOoWXpmuVa5s1tZyHRZCi2tThIRelGLNvothZaeLYmkjjdbtLHXUujTxMmY5uR2Hoa3+dhSaNkZKYOLwACwUauebmC+frr1u03yUAIulRTjT5ZCXysw8HHgBLC2xRjnAeuAk2qjKK5aCt3qv1O7nAUeNYj3MeCbgmL+z0blqcBD8y+w1SzgO3FvA0ZDB28ZcEiuyAaCWbD3xv5c6JauZbAhRV5uFqg/lQQT2zLQUOliVRO+HwJ2Al8BQ8BN/QzpdzuAJU3YWR0qjVRd6K0NfC4GjjVZQcjvHJVVXQObr6Ym9NkG/l4BRtrc19vQwPa5VIQe95VwwOvAxBzsy9/u8th/3LrOrqrQxxvcyXMR+TYTvjsb+IAEhF7rycntpAtfGulx+Fofu9AXZans8CEPPmuOeJbrf8Qs9ICnhAvRnxCbix0+D8cs9EaHfamTQ7Hd4XNzzEL3lrC7fsbhsy9mobsd9n8jHEMOnw/GLHSXw75ltTGTEc+GswlZ6CmGUxS622E/pw5joXsdQueHobHQmxxCS6szFK85fG6xcjCHZHFPUFYcdNhfEmjBUvcsWAZjFvqSZwku/WRrBj1L8D9jFlpY5/CxyPidmGFgocNXv6Gfygp90uPnRaMUIm3Slz1+PiQBocdls9Tja5dB43+nx/4Ko5535YUWvm7gb0ObaUTSxUseu5Kbv8WYKgstbGvgUw4dHmkyldS1iljYwGaQMrLqQo/K4ZYmfMvOy3Z9mf9X7YuM6M9npE52lXAz7KyR41spCo0eanHma8P4nwh5UNMyUAKLvdos2Nnv5KCnYS2DDc2oHG4xC/jOg29HqHQxnU48tntOzl0YxLsiRHVRxLHdIg+iTwDv65GAeS3ewf26GDGtk4s8iF7WqxW/6271Zt3jk9cpuvTzgH63RUs7s+MDZb5aEevLQhZ8ZCl0rK+/WbDHUuhYX+i0YL2l0At0LlzmbqRImG8mtPURqog4YCpyxGMk5sJksCGE2sTJTHE6iMjTmjNlDnCtCvXgIzWBd8u+ygrwTlCRp1Ug50mX7wobgSyzOnXYXmpcBpYWIvKMuaQpjcwclrnYhYo8Tey+RO7sy6WJPCONnI88Jy+tVQF9QO6LrPS7BbxtOgXMeKTmZx2+gpwEPrHY6Slq1v+AzoXrpAbRQNCZo6HQIVP9MrJMGuTABb2govYgZ2NMY7igMe3VGG27cJlMJpPJZDKZTCZT6xD+Bw8TuAekC6jrAAAAAElFTkSuQmCC"
                      />
                    </defs>
                  </svg>
                </a>
              </button>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 8.608V16.75C22 18.483 20.6435 19.8992 18.9344 19.9949L18.75 20H5.25C3.51697 20 2.10075 18.6435 2.00514 16.9344L2 16.75V8.608L11.652 13.6644C11.87 13.7785 12.13 13.7785 12.348 13.6644L22 8.608ZM5.25 4H18.75C20.4347 4 21.8201 5.28191 21.9838 6.92355L12 12.1533L2.01619 6.92355C2.17386 5.34271 3.46432 4.09545 5.06409 4.00523L5.25 4H18.75H5.25Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full px-5 mx-auto mt-6 mb-10 text-sm font-normal leading-tight text-center text-white">
              안녕하세요, 이장민입니다. <br />
              원하는 목표를 이룰 수 있도록 최선을 다하겠습니다.
            </div>
          </div>
        </div>
        <BottomWhitePlain isOpen={isOpen}>
          <BottomSheet
            isOpen={isOpen}
            bindPanUp={bindUpAndDown}
            bindPanDown={bindUpAndDown}
          />
        </BottomWhitePlain>
        <Link
          activityName="TrainerApplyPage"
          activityParams={{
            step: 'trainer-code',
            name,
            profileUrl,
          }}
        >
          <div className="absolute flex items-center justify-center w-full bottom-3">
            <button className="flex items-center justify-center w-[90%] active:scale-105 transform duration-300 ease-in-out bg-mainBlue h-14 rounded-xl">
              <div className="text-base font-bold leading-tight text-center text-white">
                PT 신청하기
              </div>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

type BottomSheetProps = {
  isOpen: boolean;
  bindPanUp: (...args: unknown[]) => ReactDOMAttributes;
  bindPanDown: (...args: unknown[]) => ReactDOMAttributes;
};

const BottomSheet = ({ bindPanDown }: BottomSheetProps) => {
  const [selectedBar, setSelectedBar] = useState('prize');
  const onClickBar = (bar: string) => {
    setSelectedBar(bar);
  };

  return (
    <div className="relative px-5">
      <animated.div
        className="box-border absolute left-0 z-50 w-full pt-10 -top-8 h-14"
        {...bindPanDown()}
      ></animated.div>
      <div className="absolute w-20 h-[7px]  -translate-x-1/2 rounded-full left-1/2 bg-lightGray" />
      <div className="relative flex flex-row justify-between w-full pt-8">
        <button
          className={cls(
            'relative flex flex-row items-center gap-1',
            selectedBar === 'prize' ? 'text-mainBlue' : 'text-gray',
          )}
          onClick={() => onClickBar('prize')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 4.00006C5.50102 2.89636 6.39606 2.00195 7.5 2.00195H12.5C13.6039 2.00195 14.499 2.89636 14.5 4.00006H15.4954C16.3238 4.00006 16.9954 4.67163 16.9954 5.50006V7.0047C16.9954 8.52535 15.8622 9.78134 14.3942 9.97434C13.9841 11.8328 12.425 13.2598 10.5 13.4726V14.9684H12.5034C13.608 14.9684 14.5034 15.8638 14.5034 16.9684V17.4684C14.5034 17.7445 14.2796 17.9684 14.0034 17.9684H6.00342C5.72728 17.9684 5.50342 17.7445 5.50342 17.4684V16.9684C5.50342 15.8638 6.39885 14.9684 7.50342 14.9684H9.5V13.4726C7.57413 13.2597 6.01455 11.8315 5.6052 9.97185C4.13696 9.77722 2.99536 8.52171 2.99536 6.99804V5.50006C2.99536 4.67163 3.66693 4.00006 4.49536 4.00006H5.5ZM14.5 8.9369C15.36 8.71499 15.9954 7.93404 15.9954 7.0047V5.50006C15.9954 5.22392 15.7715 5.00006 15.4954 5.00006H14.5V8.9369ZM5.5 5.00006H4.49536C4.21922 5.00006 3.99536 5.22392 3.99536 5.50006V6.99804C3.99536 7.92741 4.63591 8.71114 5.5 8.93434V5.00006Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-bold leading-tight ">수상내역</span>
          {selectedBar === 'prize' && (
            <motion.div
              className="w-full h-[2px] bg-mainBlue absolute -bottom-2"
              layoutId="underline"
            />
          )}
        </button>
        <button
          className={cls(
            'relative flex flex-row items-center gap-1',
            selectedBar === 'price' ? 'text-mainBlue' : 'text-gray',
          )}
          onClick={() => onClickBar('price')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 2.48872C2.994 2.21779 2.7725 2 2.50012 2C2.22398 2 2.00012 2.22386 2.00012 2.5V9.48914C1.99996 9.49655 1.99996 9.50398 2.00012 9.51141V17.5C2.00012 17.7761 2.22398 18 2.50012 18H17.5001C17.7763 18 18.0001 17.7761 18.0001 17.5C18.0001 17.2239 17.7763 17 17.5001 17H3V2.48872ZM16.0001 16V5.5C16.0001 5.3078 15.89 5.13261 15.7167 5.04935C15.5435 4.96609 15.3379 4.9895 15.1878 5.10957L10.4531 8.89728L7.24819 7.06588C7.11001 6.98692 6.94249 6.97846 6.79706 7.04309L4 8.28623V16H16.0001Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-bold leading-tight ">가격플랜</span>
          {selectedBar === 'price' && (
            <motion.div
              className="w-full h-[2px] bg-mainBlue absolute -bottom-2"
              layoutId="underline"
            />
          )}
        </button>
        <button
          className={cls(
            'relative flex flex-row items-center gap-1',
            selectedBar === 'photo' ? 'text-mainBlue' : 'text-gray',
          )}
          onClick={() => onClickBar('photo')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM7.5 7.5H4.16667V4.16667H7.5V7.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM7.5 15.8333H4.16667V12.5H7.5V15.8333ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM15.8333 7.5H12.5V4.16667H15.8333V7.5ZM10.8333 10.8333V17.5H17.5V10.8333H10.8333ZM15.8333 15.8333H12.5V12.5H15.8333V15.8333Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-bold leading-tight ">사진</span>
          {selectedBar === 'photo' && (
            <motion.div
              className="w-full h-[2px] bg-mainBlue absolute -bottom-2"
              layoutId="underline"
            />
          )}
        </button>
      </div>
      <div className="w-full mt-6">
        {selectedBar === 'prize' && <PrizeCard />}
        {selectedBar === 'price' && <PriceCard />}
        {selectedBar === 'photo' && <PhotoCard />}
      </div>
    </div>
  );
};

const PrizeCard = () => {
  const prizeMockData = [
    { id: 1, title: 'IFBB PRO', introduce: '2023년 03월 03일' },
    { id: 2, title: '기타 대회 수상', introduce: '취득날짜나 대회 설명' },
    { id: 3, title: '기타 대회 수상', introduce: '취득날짜나 대회 설명' },
    { id: 4, title: '기타 대회 수상', introduce: '취득날짜나 대회 설명' },
    { id: 5, title: '기타 대회 수상', introduce: '취득날짜나 대회 설명' },
  ];
  return (
    <div className="space-y-3">
      {prizeMockData.map((prize) => {
        return (
          <div
            className="relative flex flex-row items-center w-full h-20 gap-3 p-5 bg-hoverGray rounded-xl"
            key={prize.id}
          >
            <div className="text-base font-bold leading-tight text-black">
              🏆
            </div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">
                {prize.title}
              </div>
              <div className="text-xs font-normal leading-none text-gray">
                {prize.introduce}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PriceCard = () => {
  const priceMockData = [
    { id: 1, month: 1, payment: 50000 },
    { id: 2, month: 6, payment: 250000 },
  ];
  return (
    <div className="relative space-y-3">
      <div className="absolute z-40 w-full h-full text-lg font-bold text-center top-8">
        PT 신청 과정에서 확인할 수 있습니다
      </div>
      {priceMockData.map((price) => {
        return (
          <div
            className="relative flex flex-row items-center justify-between w-full h-20 gap-3 p-5 blur-md bg-hoverGray rounded-xl"
            key={price.id}
          >
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">
                {price.month}
              </div>
              <div className="text-xs font-normal leading-none text-gray">
                {`1개월 당 ${
                  !Number.isNaN(Math.floor(price.payment / price.month))
                    ? numberWithCommas(Math.floor(price.payment / price.month))
                    : 0
                }원`}
              </div>
            </div>
            <div className="text-base font-bold">
              {numberWithCommas(price.payment)}원
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PhotoCard = () => {
  const photoMockData = [
    { id: 1, url: '/trainer-lee.jpeg' },
    { id: 2, url: '/trainer-lee-2.jpeg' },
    { id: 3, url: '/trainer-lee-3.jpeg' },
    { id: 4, url: '/trainer-lee-4.jpeg' },
    { id: 5, url: '/trainer-lee-5.jpeg' },
  ];
  return (
    <div className="grid w-full grid-cols-3 gap-1">
      {photoMockData.map((photo) => {
        return (
          <div
            key={photo.id}
            className="w-[100%] relative after:pb-[100%] after:block"
          >
            <img
              key={photo.id}
              src={photo.url}
              alt="trainer-images"
              className="absolute object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
};

export default TrainerPageWrapper;

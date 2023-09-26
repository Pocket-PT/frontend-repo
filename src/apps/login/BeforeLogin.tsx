/* eslint-disable react/prop-types */
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useStepFlow } from 'libs/stackflow';
import useHashLocation from 'hooks/useHashLocation';
import useTokenStore from 'stores/token';
import { useEffect, useState } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import Input from 'components/common/Input';
import { cls } from 'utils/cls';
import useInput from 'hooks/useInput';
import { koreanOrEnglishRegex, koreanPhoneNumberRegex } from 'constants/global';
import React from 'react';
import usePostAccountMutation from 'hooks/mutation/usePostAccountMutation';
import usePushToPage from 'hooks/usePushToPage';
//import useUser from 'hooks/useUser';

type BeforeLoginProps = {
  title?: string;
};

const BeforeLogin: ActivityComponentType<BeforeLoginProps> = ({ params }) => {
  const { stepPush } = useStepFlow('BeforeLogin');
  const { setToken } = useTokenStore();
  const { params: props } = useHashLocation();
  const [selectedString, setSelectedString] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(true);
  const [inputName, onChangeInputName] = useInput('');
  const [nickName, onChangeNickName] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const { mutate } = usePostAccountMutation();
  const { replaceTo } = usePushToPage();
  // const { data } = useUser();
  // console.log('userData', data);

  useEffect(() => {
    setToken(props.accessToken ?? '');
  }, []);

  const onNextClick = () => {
    // `stepPush()`을 호출하면 params.title이 변경돼요.
    stepPush({
      title: 'Next Title',
    });
  };

  const onClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent,
  ) => {
    const target = e.target as HTMLDivElement;
    console.log(target.innerText);
    setSelectedString(target.innerText);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (inputName !== '' && nickName !== '' && phoneNumber !== '') {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }
  }, [inputName, nickName, phoneNumber]);

  const onSubmit = () => {
    if (!onValidation()) {
      alert('입력값을 확인해주세요.');
      return;
    }

    mutate(
      {
        name: inputName,
        phoneNumber: phoneNumber,
        nickname: nickName,
      },
      {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다.');
          replaceTo('Main');
        },
      },
    );
  };

  const onValidation = () => {
    if (!koreanOrEnglishRegex.test(inputName)) {
      console.log(inputName);
      console.log(koreanOrEnglishRegex.test(inputName));
      return false;
    }
    if (!koreanOrEnglishRegex.test(nickName)) {
      console.log(nickName);
      console.log(koreanOrEnglishRegex.test(nickName));
      return false;
    }
    if (!koreanPhoneNumberRegex.test(phoneNumber)) {
      console.log(phoneNumber);
      console.log(koreanPhoneNumberRegex.test(phoneNumber));
      return false;
    }
    return true;
  };

  return (
    <AppScreen>
      <div>
        {params.title !== 'Next Title' ? (
          <div className="px-6 mt-5">
            <div className="flex flex-row w-full h-16 mb-8 rounded shadow">
              <div
                onClick={(e) => onClick(e)}
                onKeyDown={(e) => onClick(e)}
                role="presentation"
                className={cls(
                  'flex items-center justify-center w-1/2 h-full border-r border-lightGray rounded-tl-xl rounded-bl-xl transition-all duration-300 ease-in-out',
                  selectedString === '트레이너'
                    ? 'bg-mainBlue text-white'
                    : 'bg-white text-darkGray',
                )}
              >
                트레이너
              </div>
              <div
                className={cls(
                  'flex items-center justify-center w-1/2 h-full rounded-tr-xl rounded-br-xl  transition-all duration-300 ease-in-out',
                  selectedString === '일반회원'
                    ? 'bg-mainBlue text-white'
                    : 'bg-white text-darkGray',
                )}
                onClick={(e) => onClick(e)}
                onKeyDown={(e) => onClick(e)}
                role="presentation"
              >
                일반회원
              </div>
            </div>
            <button
              onClick={onNextClick}
              disabled={isDisabled}
              className={cls(
                'w-full h-10 pt-1 text-white rounded-full',
                isDisabled ? 'bg-lightGray' : 'bg-mainBlue',
              )}
            >
              다음
            </button>
          </div>
        ) : (
          <div className="px-6 mt-5 space-y-4">
            <Input>
              <Input.TextField
                value={inputName}
                onChange={onChangeInputName}
                placeholder="이름"
              />
            </Input>
            <Input>
              <Input.TextField
                value={nickName}
                onChange={onChangeNickName}
                placeholder="닉네임"
              />
            </Input>
            <Input>
              <Input.TextField
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                placeholder="휴대폰 번호"
              />
            </Input>
            <button
              onClick={onSubmit}
              disabled={isSubmit}
              className={cls(
                'w-full h-10 pt-1 text-white rounded-full',
                isSubmit ? 'bg-lightGray' : 'bg-mainBlue',
              )}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </AppScreen>
  );
};

export default React.memo(BeforeLogin);

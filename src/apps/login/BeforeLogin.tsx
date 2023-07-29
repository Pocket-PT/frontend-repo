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

type BeforeLoginProps = {
  title?: string;
};

const BeforeLogin: ActivityComponentType<BeforeLoginProps> = ({ params }) => {
  const { stepPush } = useStepFlow('BeforeLogin');
  const { token, setToken } = useTokenStore();
  const { name, params: props } = useHashLocation();
  const [selectedString, setSelectedString] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(true);
  const [inputName, onChangeInputName] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');

  useEffect(() => {
    setToken(props.accessToken ?? '');
  }, []);
  console.log('BeforeLogin: ', name, props, params, token);
  const onNextClick = () => {
    // `stepPush()`을 호출하면 params.title이 변경돼요.
    stepPush({
      title: 'Next Title',
    });
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.target.innerText);
    setSelectedString(e.target.innerText);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (inputName !== '' && phoneNumber !== '') {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }
  }, [inputName, phoneNumber]);

  const onSubmit = () => {};
  console.log(selectedString);

  return (
    <AppScreen appBar={{ title: '회원가입' }}>
      <div>
        <h1>{params.title ?? 'hi'}</h1>
        {params.title !== 'Next Title' ? (
          <div className="px-6">
            <div className="flex flex-row w-full h-16 mb-8 rounded shadow">
              <div
                onClick={(e) => onClick(e)}
                onKeyDown={(e) => onClick(e)}
                role="presentation"
                className={cls(
                  'flex items-center justify-center w-1/2 h-full border-r border-lightGray rounded-tl-xl rounded-bl-xl transition-all duration-300 ease-in-out',
                  selectedString === '트레이너'
                    ? 'bg-mainPurple text-white'
                    : 'bg-white text-darkGray',
                )}
              >
                트레이너
              </div>
              <div
                className={cls(
                  'flex items-center justify-center w-1/2 h-full rounded-tr-xl rounded-br-xl  transition-all duration-300 ease-in-out',
                  selectedString === '일반회원'
                    ? 'bg-mainPurple text-white'
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
                isDisabled ? 'bg-lightGray' : 'bg-mainPurple',
              )}
            >
              다음
            </button>
          </div>
        ) : (
          <div className="px-6 space-y-4">
            <Input>
              <Input.TextField
                value={inputName}
                onChange={onChangeInputName}
                placeholder="이름"
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
                isSubmit ? 'bg-lightGray' : 'bg-mainPurple',
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

export default BeforeLogin;

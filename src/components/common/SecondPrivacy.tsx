import BackIcon from 'icons/BackIcon';
import Scrollbars from 'react-custom-scrollbars-2';

interface PrivacyListProps {
  title: string;
  body: string;
}

type BeforeLoginProps = {
  title?: string;
};

const PrivacyList = ({ title, body }: PrivacyListProps) => {
  return (
    <div>
      <div className="text-lg font-bold">{title}</div>
      <div>{body}</div>
    </div>
  );
};

const SecondPrivacy = ({
  stepReplace,
}: {
  stepReplace: (params: BeforeLoginProps, options?: object | undefined) => void;
}) => {
  const goBack = () => {
    stepReplace({ title: 'CheckPrivacy' });
  };
  return (
    <div className="relative flex w-full h-full">
      <div className="w-full px-6 mt-10">
        <div className="flex flex-row">
          <button className="w-6 h-6 mt-1 mr-2" onClick={goBack}>
            <BackIcon />
          </button>
          <div className="mb-3 text-2xl font-bold">개인정보 처리방침</div>
        </div>
        <Scrollbars autoHide autoHeight autoHeightMin={'80vh'}>
          <div className="space-y-4 leading-relaxed">
            <div>
              PocketPT 개인정보 처리방침 귀하는 아래 개인정보 수집∙이용에 대해
              동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 PocketPT
              서비스를 제공받을 수 없습니다.
            </div>
            <PrivacyList
              title="제1조 (개인정보 처리목적)"
              body="1. PocketPT는 다음의 목적을 위하여 개인정보를 처리하며, 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다. 이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              1. 트레이너 매칭 서비스 제공
                  
                  i. 트레이너 매칭 서비스 제공을 목적으로 개인정보를 처리합니다.
                  
                  ii. 트레이너 매칭 결과에 대한 문자 제공을 위해 개인정보를 처리합니다.
                  
              2. PT 피드백 서비스 제공
                  
                  i. PT 피드백 서비스 제공을 위해 개인정보를 처리합니다.
                  
                  ii. PT 피드백 생성을 위한 인공지능 모델 학습을 목적으로 개인정보를 처리합니다."
            />
            <PrivacyList
              title="제2조 (개인정보의 처리 및 보유기간)"
              body="1. PocketPT는 법령에 명시되어 있거나 이용자로부터 개인정보 수집 시 동의받은 개인정보의 보유 및 이용기간 내에서 개인정보를 처리 및 보유합니다.
              2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                  
                  a. 트레이너 매칭 서비스 제공
                  
                  i.이용자가 제공한 정보 (이름, 전화번호, 이메일, 프로필 사진) : **회원 탈퇴시까지**
                  
                  b. PT 피드백 서비스 제공
                  
                  1. 이용자가 제공한 사진 : 이용자 삭제 요청 시까지 (최대 1년)
                  2. 이용자가 제공한 영상 : 이용자 삭제 요청 시까지 (최대 1년)
                  3. 이용자가 제공한 정보 (신체 정보) : 이용자 삭제 요청 시까지 (최대 1년)"
            />
            <PrivacyList
              title="제3조 (개인정보의 제3자 제공)"
              body="1. PocketPT는 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위내에서만 처리하며, 이용자의 동의, 법률의 특별한 규정 등 개인정보 보호법에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              2. PocketPT는 제3자에게 개인정보를 제공하지 않으며, 제공하게 될 경우 이용자에게 동의를 받겠습니다."
            />
            <PrivacyList
              title="제4조 (개인정보처리의 위탁)"
              body="1. PocketPT는 개인정보 업무처리를 위해 서비스를 위탁하지 않습니다.
              2. 위탁업무의 내용이 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다."
            />
            <PrivacyList
              title="제5조 (정보주체의 권리, 의무 및 행사방법)"
              body="1. 정보주체는 PocketPT에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
              2. 제1항에 따른 권리 행사는 PocketPT에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 PocketPT는 이에 대해 지체 없이 조치하겠습니다.
              3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
              5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
              6. PocketPT는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다."
            />
            <PrivacyList
              title="제6조 (처리하는 개인정보 항목)"
              body=" 1. PocketPT는 다음의 개인정보 항목을 처리하고 있습니다.

              | 구분 | 수집, 이용목적 | 필수/선택 | 수집 및 이용항목 |
              | --- | --- | --- | --- |
              | PT 매칭 | PT 매칭 용도 | 필수 | 이용자 이름, 성별, 휴대폰 번호, 이메일   |
              | 회원가입 / PT 매칭 | 서비스 회원가입 및 로그인을 위한 본인 인증 용도 /  PT 매칭 결과 통보용 문자 제공 | 필수 | 이용자 휴대폰 번호, 이메일, 프로필 사진 |
              | PT 피드백 | PT 피드백을 위해 이용자가 제공한 정보 | 필수 | 이용자 신체정보, 사진, 영상 |
              1. 모바일 기기의 카메라를 활용한 사진 촬영 시, 서비스 제공을 위해 이용자의 사진을 PocketPT의 서버로 전송합니다.
              2. 이용자의 동의는 PocketPT 서비스 종료 시까지 유지되며,  개인정보의 수집 및 이용에 대한 동의를 거부할 수 있습니다. 다만, 거부하시는 경우 PocketPT에서 제공하는 서비스를 이용할 수 없습니다."
            />
            <PrivacyList
              title="제7조 (개인정보의 파기)"
              body="1. PocketPT는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.(법령에 따른 보관 기간은 제 2조를 참조하시기 바랍니다.)
              3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                  
                  a. 파기절차
                  
                  i.PocketPT는 파기 사유가 발생한 개인정보를 선정하고, PocketPT의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                  
                  b. 파기방법
                  
                  i. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다"
            />
            <PrivacyList
              title="제8조 (개인정보의 안전성 확보 조치)"
              body="1. PocketPT는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
    
              a. 관리적 조치
              
              i. 내부관리계획 수립 및 시행, 정기적인 접속기록 점검 등
              
              b. 기술적 조치
              
              i. 개인정보처리시스템 등의 접근권한 관리, 보안프로그램 설치, 암호화 등
              
              c.물리적 조치
              
              i. 데이터 및 서버 직접적 접근통제 등"
            />
            <PrivacyList
              title="제 9조 (개인정보 처리방침의 변경)"
              body="본 개인정보 처리방침은 법령 및 지침의 변경과 PocketPT의 약관 및 내부 정책에 따라 변경될 수 있으며 이를 개정하는 경우, PocketPT는 변경사항에 대해 「개인정보 보호법」 제30조 및 동법 시행령 제31조에 따라 개정 내용을 개인정보 처리방침 페이지를 통해 공개하겠습니다."
            />
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default SecondPrivacy;

import Layout from 'components/Layout';
import useInput from 'hooks/useInput';
import usePushToPage from 'hooks/usePushToPage';
import EditIcon from 'icons/EditIcon';
import useMyProfileStore from 'stores/myProfile';

const MyProfileEditPage = () => {
  const { nickname, description, onEditDescription, onEditNickname } =
    useMyProfileStore();
  const [editNickname, onChangeEditNickname] = useInput(nickname);
  const [editDescription, onChangeEditDescription] = useInput(description);
  const { moveTo } = usePushToPage();

  const onValidateForm = () => {
    if (editNickname.trim() === '') {
      alert('닉네임을 입력해주세요');
      return false;
    }
    if (editNickname.length > 10) {
      alert('닉네임은 10자 이내로 입력해주세요');
      return false;
    }
    if (editDescription.trim() === '') {
      alert('상태메세지를 입력해주세요');
      return false;
    }
    if (editDescription.length > 60) {
      alert('상태메세지는 60자 이내로 입력해주세요');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!onValidateForm()) return;
    onEditNickname(editNickname);
    onEditDescription(editDescription);
    moveTo('MyProfilePage');
  };

  return (
    <Layout title="Edit">
      <div className="px-6 mt-12 space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-mainPurple ring-4 ring-lightGray" />
        <form className="space-y-3">
          <div className="relative group">
            <input
              className="w-full h-8 mb-2 border-b outline-none border-b-lightGray group-focus-within:border-b-dark"
              value={editNickname}
              onChange={onChangeEditNickname}
            />
            <div className="absolute w-6 h-6 top-1 text-lightGray right-2 group-focus-within:text-dark">
              <EditIcon />
            </div>
          </div>
          <div className="relative group">
            <input
              className="w-full h-8 border-b outline-none border-b-lightGray group-focus-within:border-b-dark"
              value={editDescription}
              onChange={onChangeEditDescription}
            />
            <div className="absolute w-6 h-6 top-1 text-lightGray right-2 group-focus-within:text-dark">
              <EditIcon />
            </div>
          </div>
          <button
            className="w-full h-auto py-1 text-white rounded-full bg-mainPurple"
            onClick={onSubmit}
          >
            <div className="mt-1">수정완료</div>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MyProfileEditPage;

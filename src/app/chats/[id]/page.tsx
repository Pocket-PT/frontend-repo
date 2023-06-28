import Message from '@/components/Message';

const ChatDetailPage = () => {
  const testMessage: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full">
      {testMessage.map((item) => (
        <div className="mb-2 mr-4" key={item}>
          <Message message="hi" />
        </div>
      ))}
    </div>
  );
};

export default ChatDetailPage;

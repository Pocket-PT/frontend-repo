import useMessageInfiniteQuery from 'apis/useMessageInfiniteQuery';
import Layout from 'components/Layout';

const TestPage = () => {
  const { data, fetchNextPage } = useMessageInfiniteQuery(1);
  console.log(data);
  return (
    <Layout hasFooter={false}>
      <div>
        <h1>Test Page</h1>
        <button onClick={() => fetchNextPage()}>NEXT PAGE</button>
      </div>
    </Layout>
  );
};

export default TestPage;

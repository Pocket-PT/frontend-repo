import Layout from 'components/Layout';

const TestPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('testCode: ', code);
  return (
    <Layout title="Test">
      <div>
        <h1>Test Page</h1>
      </div>
    </Layout>
  );
};

export default TestPage;

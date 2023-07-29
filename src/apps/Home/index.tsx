import { Stack } from 'libs/stackflow';
import { QueryClient, QueryClientProvider } from 'react-query';

const Home: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
};

export default Home;

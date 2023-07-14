import { Router } from '@reach/router';
import OtherProfile from 'apps/Home/OtherProfile';
import Home from 'apps/Home';
import NotFoundPage from 'apps/404';

const App = () => {
  return (
    <Router basepath="/">
      <Home path="/" />
      <OtherProfile path="/:id" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;

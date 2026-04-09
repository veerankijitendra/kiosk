import useSocket from './hooks/useSocket';
import Router from './router';
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const token = useAuthStore((state) => state.token);
  useSocket(token);

  return <Router />;
};

export default App;

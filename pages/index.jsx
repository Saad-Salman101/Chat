import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import Chats from '../components/Chats';
import Login from '../components/Login';

function App() {
  const router = useRouter();

  return (
    <AuthProvider>
      {router.pathname === '/chats' ? (
        <Chats />
      ) : (
        <Login />
      )}
    </AuthProvider>
  );
}

export default App;

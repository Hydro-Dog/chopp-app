import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/shared/context/auth-context';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.accessToken) {
      router.replace('/login');
    }
  }, [auth, router]);

  return auth?.accessToken ? children : null; // Render children or null while checking
};

export default ProtectedRoute;

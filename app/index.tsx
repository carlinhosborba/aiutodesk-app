import { useAuthStore } from '@/store/useAuthStore';
import { Redirect } from 'expo-router';

/**
 * INDEX REDIRECT
 * Redireciona baseado no estado de autenticação
 * Verifica a sessão ao carregar o app
 */
export default function IndexRedirect() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Enquanto verifica autenticação, não mostra nada
  if (isLoading) {
    return null;
  }

  // Se não estiver autenticado, vai para login
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Se estiver autenticado, vai para as tabs
  return <Redirect href="/(tabs)" />;
}

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { PaperProvider } from 'react-native-paper';

export const unstable_settings = {
  initialRouteName: 'index',
};

/**
 * ROOT LAYOUT - Gerencia navegação baseada em estado de autenticação
 * - Se não autenticado: Mostra stack de Auth (login/signup)
 * - Se autenticado: Mostra stack de App (tabs)
 * - Na inicialização: Tenta restaurar sessão do SecureStore
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  /**
   * Ao montar o layout, verifica se há uma sessão ativa
   * (usuario fez login anteriormente e seu token ainda é válido)
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error('[RootLayout] Erro ao restaurar sessão:', error);
      } finally {
        setIsReady(true);
      }
    };

    initializeAuth();
  }, [checkAuthStatus]);

  /**
   * Enquanto verifica autenticação, mostra loading screen
   */
  if (!isReady || isLoading) {
    return (
      <PaperProvider>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
          }}
        >
          <ActivityIndicator size="large" color="#7B3AED" />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          {!isAuthenticated ? (
            <>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login"
                options={{
                  headerShown: false,
                  animationEnabled: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="signup"
                options={{
                  headerShown: false,
                  animationEnabled: true,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  animationEnabled: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: 'modal',
                  title: 'Modal',
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}

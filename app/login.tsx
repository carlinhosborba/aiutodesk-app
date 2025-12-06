import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    setLocalError('');
    clearError();

    // Validações básicas
    if (!email || !password) {
      setLocalError('Preencha e-mail e senha para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setLocalError('E-mail inválido.');
      return;
    }

    try {
      // Chama a ação de login da store (faz chamada real de API)
      await login({
        email: email.toLowerCase(),
        password,
      });

      // Se chegou aqui, login foi bem-sucedido
      router.replace('/(tabs)');
    } catch (err) {
      // Erro já foi tratado e setado no store
      // A tela já exibe displayError abaixo
      console.error('[LoginScreen] Erro no login:', err);
    }
  };

  const handleGoToSignup = () => {
    setLocalError('');
    clearError();
    router.push('/signup');
  };

  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo ao AIUTODESK</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <AppInput
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />

        <AppInput
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
          error={displayError}
        />

        {displayError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{displayError}</Text>
          </View>
        )}

        <AppButton
          title={isLoading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={isLoading}
        />

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#7B3AED" />
          </View>
        )}

        <TouchableOpacity onPress={handleGoToSignup} disabled={isLoading}>
          <Text style={[styles.link, isLoading && styles.linkDisabled]}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#6B7280',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '500',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#7B3AED',
    fontSize: 15,
    fontWeight: '500',
  },
  linkDisabled: {
    opacity: 0.5,
  },
});

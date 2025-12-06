import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSignup = async () => {
    setLocalError('');
    clearError();

    // Validações básicas
    if (!name || !email || !password || !confirmPassword || !tenantId) {
      setLocalError('Preencha todos os campos para continuar.');
      return;
    }

    if (!email.includes('@')) {
      setLocalError('E-mail inválido.');
      return;
    }

    if (password.length < 6) {
      setLocalError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('As senhas não conferem.');
      return;
    }

    try {
      // Chama a ação de signup da store
      await signup({
        name,
        email: email.toLowerCase(),
        password,
        tenantId, // Obrigatório
      });

      // Se conseguiu registrar, redireciona para login
      setLocalError('');
      router.replace('/login');
    } catch (err) {
      const errorMessage =
        error ||
        (err instanceof Error ? err.message : 'Erro ao registrar');

      // Tratamento específico para erros comuns
      if (
        errorMessage.includes('409') ||
        errorMessage.includes('already registered')
      ) {
        setLocalError('Este e-mail já está cadastrado.');
      } else if (errorMessage.includes('404')) {
        setLocalError('Empresa não encontrada. Verifique o ID.');
      } else if (errorMessage.includes('Network')) {
        setLocalError('Erro de conexão. Verifique sua internet.');
      } else {
        setLocalError(
          errorMessage || 'Erro ao registrar. Tente novamente.'
        );
      }
    }
  };

  const handleGoToLogin = () => {
    setLocalError('');
    clearError();
    router.replace('/login');
  };

  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados para se cadastrar no AIUTODESK
          </Text>

          <AppInput
            label="Nome completo"
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
          />

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
            placeholder="Crie uma senha (mín. 6 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <AppInput
            label="Confirmação de senha"
            placeholder="Repita a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <AppInput
            label="ID da Empresa (Tenant)"
            placeholder="UUID da empresa"
            value={tenantId}
            onChangeText={setTenantId}
            editable={!isLoading}
            autoCapitalize="none"
          />

          {displayError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{displayError}</Text>
            </View>
          )}

          <AppButton
            title={isLoading ? 'Cadastrando...' : 'Cadastrar'}
            onPress={handleSignup}
          />

          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#7B3AED" />
            </View>
          )}

          <TouchableOpacity onPress={handleGoToLogin} disabled={isLoading}>
            <Text
              style={[
                styles.link,
                isLoading && styles.linkDisabled,
              ]}
            >
              Já tenho conta – fazer login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    minHeight: '100%',
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#991B1B',
    fontWeight: '500',
  },
  loaderContainer: {
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#7B3AED',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  linkDisabled: {
    color: '#D1D5DB',
    textDecorationLine: 'none',
  },
});

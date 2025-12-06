import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { useAuthStore } from '@/store/useAuthStore';
import { useTenantStore } from '@/store/useTenantStore';
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
  const { availableTenants, fetchTenants, isLoading: tenantsLoading, error: tenantsError } =
    useTenantStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [localError, setLocalError] = useState('');
  const [showTenantPicker, setShowTenantPicker] = useState(false);

  // Carregar tenants ao montar o componente
  React.useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      console.log('📦 Iniciando carregamento de tenants...');
      await fetchTenants();
      console.log('✅ Tenants carregados com sucesso');
    } catch (err) {
      console.error('❌ Erro ao carregar tenants:', err);
      setLocalError('Erro ao carregar empresas. Tente novamente.');
    }
  };

  const handleSignup = async () => {
    setLocalError('');
    clearError();

    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
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

    if (!selectedTenantId) {
      setLocalError('Selecione uma empresa para continuar.');
      return;
    }

    try {
      // Chama a ação de signup da store
      await signup({
        name,
        email: email.toLowerCase(),
        password,
        tenantId: selectedTenantId,
      });

      // Se conseguiu registrar, redireciona para login
      // (não faz login automático conforme design da API)
      router.replace('/login');
    } catch (err) {
      const errorMessage =
        error ||
        (err instanceof Error ? err.message : 'Erro ao registrar');

      // Tratamento específico para erros comuns
      if (
        errorMessage.includes('409') ||
        errorMessage.includes('already exists')
      ) {
        setLocalError('Este e-mail já está cadastrado.');
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
  const selectedTenant = availableTenants.find(
    (t) => t.id === selectedTenantId
  );

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

          {/* Seletor de Tenant */}
          <View style={styles.tenantContainer}>
            <Text style={styles.tenantLabel}>Empresa *</Text>
            {tenantsLoading ? (
              <View style={styles.tenantLoading}>
                <ActivityIndicator size="small" color="#7B3AED" />
                <Text style={styles.tenantLoadingText}>
                  Carregando empresas...
                </Text>
              </View>
            ) : tenantsError ? (
              <View style={styles.tenantErrorContainer}>
                <Text style={styles.tenantErrorText}>
                  ❌ Erro ao carregar empresas: {tenantsError}
                </Text>
                <TouchableOpacity
                  style={styles.tenantRetryButton}
                  onPress={() => loadTenants()}
                >
                  <Text style={styles.tenantRetryText}>🔄 Tentar novamente</Text>
                </TouchableOpacity>
              </View>
            ) : availableTenants.length === 0 ? (
              <View style={styles.tenantErrorContainer}>
                <Text style={styles.tenantErrorText}>
                  Nenhuma empresa disponível. Contate o suporte.
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.tenantButton,
                  !isLoading && styles.tenantButtonActive,
                ]}
                onPress={() =>
                  !isLoading && setShowTenantPicker(!showTenantPicker)
                }
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.tenantButtonText,
                    selectedTenantId && styles.tenantButtonTextSelected,
                  ]}
                >
                  {selectedTenant?.name || 'Selecione uma empresa'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Lista de Tenants */}
            {showTenantPicker && availableTenants.length > 0 && (
              <View style={styles.tenantList}>
                {availableTenants.map((tenant) => (
                  <TouchableOpacity
                    key={tenant.id}
                    style={[
                      styles.tenantOption,
                      selectedTenantId === tenant.id &&
                        styles.tenantOptionSelected,
                    ]}
                    onPress={() => {
                      console.log('👉 Selecionando tenant:', tenant.id, tenant.name);
                      setSelectedTenantId(tenant.id);
                      setShowTenantPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.tenantOptionText,
                        selectedTenantId === tenant.id &&
                          styles.tenantOptionTextSelected,
                      ]}
                    >
                      {tenant.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {displayError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{displayError}</Text>
            </View>
          )}

          <AppButton
            title={isLoading ? 'Cadastrando...' : 'Cadastrar'}
            onPress={handleSignup}
            disabled={isLoading || tenantsLoading}
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
  tenantContainer: {
    marginBottom: 16,
  },
  tenantLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  tenantButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  tenantButtonActive: {
    opacity: 1,
  },
  tenantButtonText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tenantButtonTextSelected: {
    color: '#1F2937',
  },
  tenantLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tenantLoadingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  tenantErrorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  tenantErrorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  tenantRetryButton: {
    backgroundColor: '#DC2626',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  tenantRetryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  tenantList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  tenantOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tenantOptionSelected: {
    backgroundColor: '#F3E8FF',
  },
  tenantOptionText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tenantOptionTextSelected: {
    color: '#7B3AED',
    fontWeight: '600',
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

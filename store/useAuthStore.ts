/**
 * ============================================================================
 * AUTH STORE (Zustand)
 * Gerencia o estado global de autenticação
 * Integrado com AuthService e persistência via SecureStore
 * ============================================================================
 */

import { create } from 'zustand';
import authService from '../services/api/auth.service';
import {
    AuthenticatedUser,
    LoginRequestDto,
    SignupRequestDto,
} from '../types';

export interface AuthStore {
  // Estado
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Ações
  login: (credentials: LoginRequestDto) => Promise<void>;
  signup: (data: SignupRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Estado inicial
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Faz login com email e senha
   * Fluxo: 1. Validar entrada
   *        2. Chamar /auth/login para obter token
   *        3. Armazenar token
   *        4. Chamar fetchMe() para obter dados do usuário
   */
  login: async (credentials: LoginRequestDto) => {
    set({ isLoading: true, error: null });

    try {
      // Valida entrada básica
      if (!credentials.email || !credentials.password) {
        throw new Error('Email e senha são obrigatórios');
      }

      console.log('[AuthStore] Enviando login para API:', credentials.email);

      // Requisita o token contra a API (vai falhar se credenciais inválidas)
      const loginResponse = await authService.login(credentials);
      console.log('[AuthStore] ✅ Token recebido');

      // Busca os dados do usuário autenticado
      const user = await authService.fetchMe();
      console.log('[AuthStore] ✅ Dados do usuário carregados');

      set({
        user,
        token: loginResponse.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      const status = error.response?.status;
      let errorMessage = error.message;

      // Mensagens de erro específicas
      if (status === 401) {
        errorMessage = 'Email ou senha inválidos';
      } else if (status === 400) {
        errorMessage = 'Dados de login inválidos';
      } else if (error.message?.includes('Network')) {
        errorMessage = 'Erro de conexão com servidor';
      }

      console.error('[AuthStore] ❌ Erro no login:', errorMessage);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Registra um novo usuário
   */
  signup: async (data: SignupRequestDto) => {
    set({ isLoading: true, error: null });

    try {
      const newUser = await authService.signup(data);

      set({
        user: newUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao registrar';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Faz logout removendo token e dados do usuário
   */
  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await authService.logout();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao fazer logout';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Busca os dados do usuário autenticado
   * Usado após login para obter informações completas
   */
  fetchMe: async () => {
    set({ isLoading: true, error: null });

    try {
      const user = await authService.fetchMe();

      set({
        user,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao buscar dados do usuário';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Verifica o status de autenticação no app startup
   * Se houver um token armazenado, tenta restaurar a sessão
   */
  checkAuthStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const storedToken = await authService.getStoredToken();

      if (storedToken) {
        set({ token: storedToken });

        // Tenta buscar os dados do usuário
        try {
          const user = await authService.fetchMe();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Se falhar (token expirado), remove o token
          await authService.logout();
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao verificar autenticação';

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  /**
   * Limpa a mensagem de erro
   */
  clearError: () => set({ error: null }),
}));

/**
 * ============================================================================
 * AUTH SERVICE
 * Encapsula todas as chamadas de autenticação com a API
 * ============================================================================
 */

import {
  AuthenticatedUser,
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from '../../types';
import { tokenStorage } from '../storage/token-storage';
import AxiosClient from './axios-client';

class AuthService {
  private axios = AxiosClient.getInstance();

  /**
   * Faz login com email e senha
   * POST /auth/login
   * Retorna accessToken que é armazenado localmente
   */
  async login(credentials: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      console.log('[AuthService] POST /auth/login');
      const response = await this.axios.post<LoginResponseDto>(
        '/auth/login',
        credentials
      );

      console.log('[AuthService] ✅ Login response:', response.status);

      // Armazena o token localmente
        if (response.data.access_token) {
          await tokenStorage.setToken(response.data.access_token);
          console.log('[AuthService] ✅ Token armazenado');
        }

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;
      
      console.error('[AuthService] ❌ Erro no login:', {
        status,
        message: error.message,
        data,
      });
      
      throw error;
    }
  }

  /**
   * Registra um novo usuário
   * POST /auth/signup
   * Backend espera: { name, email, password, tenantId }
   * Retorna: { message, user } - SEM token (precisa fazer login depois)
   */
  async signup(userData: SignupRequestDto): Promise<SignupResponseDto> {
    try {
      console.log('[AuthService] POST /auth/signup com dados:', {
        name: userData.name,
        email: userData.email,
        tenantId: userData.tenantId,
      });

      const response = await this.axios.post<{ message: string; user: SignupResponseDto }>(
        '/auth/signup',
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          tenantId: userData.tenantId, // Obrigatório
        }
      );

      console.log('[AuthService] ✅ Usuário criado com sucesso');
      console.log('[AuthService] Response:', response.data);
      
      // Retorna apenas o user, já que o message é só confirmação
      return response.data.user;
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;
      
      console.error('[AuthService] ❌ Erro no signup:', {
        status,
        message: error.message,
        data,
      });
      throw error;
    }
  }

  /**
   * Obtém os dados do usuário autenticado
   * GET /users/:id
   * Requer o userId (pode vir da decodificação do JWT)
   */
  async fetchMe(userId: number): Promise<AuthenticatedUser> {
    try {
      console.log('[AuthService] GET /users/:id');
      const response = await this.axios.get<AuthenticatedUser>(`/users/${userId}`);
      console.log('[AuthService] ✅ Dados do usuário obtidos');
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 401) {
        await tokenStorage.deleteToken();
      }
      console.error('[AuthService] ❌ Erro ao buscar dados do usuário:', error.message);
      throw error;
    }
  }

  /**
   * Faz logout removendo o token armazenado
   */
  async logout(): Promise<void> {
    try {
      // Remove o token do armazenamento local
      await tokenStorage.deleteToken();
    } catch (error) {
      console.error('[AuthService] Erro no logout:', error);
      throw error;
    }
  }

  /**
   * Verifica se há um token armazenado
   */
  async getStoredToken(): Promise<string | null> {
    try {
      return await tokenStorage.getToken();
    } catch (error) {
      console.error('[AuthService] Erro ao recuperar token:', error);
      return null;
    }
  }
}

export default new AuthService();

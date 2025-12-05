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
      if (response.data.accessToken) {
        await tokenStorage.setToken(response.data.accessToken);
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
   */
  async signup(userData: SignupRequestDto): Promise<SignupResponseDto> {
    try {
      const response = await this.axios.post<SignupResponseDto>(
        '/auth/signup',
        userData
      );

      return response.data;
    } catch (error) {
      console.error('[AuthService] Erro no signup:', error);
      throw error;
    }
  }

  /**
   * Obtém os dados do usuário autenticado
   * GET /auth/me
   * Backend retorna: { user: {...} }
   */
  async fetchMe(): Promise<AuthenticatedUser> {
    try {
      const response = await this.axios.get<{ user: AuthenticatedUser }>('/auth/me');
      console.log('[AuthService] ✅ Dados do usuário obtidos');
      return response.data.user;
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

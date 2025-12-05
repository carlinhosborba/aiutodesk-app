/**
 * ============================================================================
 * CLIENTE AXIOS CONFIGURADO
 * Gerencia requisições HTTP com autenticação JWT e interceptores globais
 * ============================================================================
 */

import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import { ApiErrorResponse } from '../../types';
import { tokenStorage } from '../storage/token-storage';

// URL base da API (ajustar conforme ambiente)
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'  // Proxy local na WEB
    : 'https://aiutodesk-backend.onrender.com'); // Na produção/celular

/**
 * Cria e configura a instância do Axios com interceptores
 */
class AxiosClient {
  private static instance: AxiosInstance | null = null;

  /**
   * Retorna a instância singleton do Axios
   */
  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Interceptor de REQUISIÇÃO: Adiciona o token JWT
      this.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          try {
            const token = await tokenStorage.getToken();

            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('[Axios] Erro ao recuperar token:', error);
          }

          console.log('[Axios] 📤 Requisição:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            fullUrl: `${config.baseURL}${config.url}`,
          });

          return config;
        },
        (error: any) => {
          return Promise.reject(error);
        }
      );

      // Interceptor de RESPOSTA: Trata erros globalmente
      this.instance.interceptors.response.use(
        (response: any) => response,
        async (error: AxiosError) => {
          const status = error.response?.status;
          const data = error.response?.data as ApiErrorResponse | undefined;

          console.error(
            '[Axios] ❌ Erro HTTP:',
            status,
            error.config?.url,
            data?.message || error.message
          );

          // Token expirado: Remove token e redireciona para login
          if (status === 401) {
            try {
              await tokenStorage.deleteToken();
              // Nota: Aqui você pode disparar um evento global para redirecionar para login
              console.warn('[Axios] Token expirado. Faça login novamente.');
            } catch (err) {
              console.error('[Axios] Erro ao deletar token:', err);
            }
          }

          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }

  /**
   * Reseta a instância (útil para testes)
   */
  static reset(): void {
    this.instance = null;
  }
}

export default AxiosClient;
export { API_BASE_URL };

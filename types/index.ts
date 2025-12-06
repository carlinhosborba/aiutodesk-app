/**
 * ============================================================================
 * TIPOS DO AIUTODESK BASEADOS NA API NESTJS
 * Fonte da Verdade: Backend em NestJS
 * ============================================================================
 */

/**
 * TENANT (Empresa)
 * Representa uma organização/empresa no sistema multi-tenant
 */
export interface Tenant {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * USER (Usuário)
 * Usuário dentro de um tenant com role específico
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Nunca retornado pela API (@Exclude)
  role: 'admin' | 'master' | 'user';
  status: 'active' | 'inactive';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AUTHENTICATED USER (Usuário Autenticado)
 * Dados do usuário atualmente logado (sem password)
 */
export type AuthenticatedUser = Omit<User, 'password'>;

/**
 * AUTH DTO - LOGIN REQUEST
 * Body esperado na requisição de login
 */
export interface LoginRequestDto {
  email: string;
  password: string;
}

/**
 * AUTH DTO - LOGIN RESPONSE
 * Resposta da API ao fazer login (token + dados do usuário)
 */
export interface LoginResponseDto {
  access_token: string;
  user: AuthenticatedUser;
}

/**
 * AUTH DTO - SIGNUP REQUEST
 * Body esperado na requisição de registro
 */
export interface SignupRequestDto {
  name: string;
  email: string;
  password: string;
  tenantId: string;
}

/**
 * AUTH DTO - SIGNUP RESPONSE
 * Resposta da API ao registrar um novo usuário
 */
export type SignupResponseDto = AuthenticatedUser;

/**
 * AUTH RESPONSE - /auth/me
 * Dados do usuário autenticado (retornado por GET /auth/me)
 */
export type AuthMeResponseDto = AuthenticatedUser;

/**
 * TENANT DTO - LIST REQUEST
 * Query params para listar tenants
 */
export interface TenantListQueryDto {
  tenantId?: string;
  status?: 'active' | 'inactive';
  limit?: number;
  offset?: number;
}

/**
 * API ERROR RESPONSE
 * Estrutura padrão de erro retornado pela API
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}

/**
 * API SUCCESS RESPONSE (genérico)
 * Para respostas que retornam dados
 */
export interface ApiResponse<T> {
  data?: T;
  statusCode?: number;
  message?: string;
}

/**
 * PAGINATED RESPONSE
 * Para endpoints que retornam dados paginados
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * AUTH STATE (Zustand Store)
 * Estado de autenticação da aplicação
 */
export interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * TENANT STATE (Zustand Store)
 * Estado de tenants
 */
export interface TenantState {
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  error: string | null;
}

/**
 * AXIOS REQUEST CONFIG COM TENANT
 * Para incluir automaticamente o tenantId nas requisições
 */
export interface AxiosRequestConfigWithTenant {
  tenantId?: string;
  [key: string]: any;
}

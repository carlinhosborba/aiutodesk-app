/**
 * ============================================================================
 * TENANT SERVICE
 * Gerencia operações relacionadas a Tenants (Empresas)
 * ============================================================================
 */

import { PaginatedResponse, Tenant, TenantListQueryDto } from '../../types';
import AxiosClient from './axios-client';

class TenantService {
  private axios = AxiosClient.getInstance();

  /**
   * Lista todos os tenants disponíveis
   * GET /tenants
   */
  async listTenants(
    query?: TenantListQueryDto
  ): Promise<PaginatedResponse<Tenant> | Tenant[]> {
    try {
      console.log('🌐 [TenantService] GET /tenants');
      const response = await this.axios.get<
        PaginatedResponse<Tenant> | Tenant[]
      >('/tenants', { params: query });

      console.log('✅ [TenantService] Status:', response.status);
      console.log('✅ [TenantService] Data:', JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      const message = error.message;
      
      console.error('[TenantService] ❌ Erro:', {
        status,
        statusText,
        message,
        url: error.config?.url,
        data: error.response?.data,
      });

      throw error;
    }
  }

  /**
   * Obtém os detalhes de um tenant específico
   * GET /tenants/:id
   */
  async getTenantById(id: string): Promise<Tenant> {
    try {
      const response = await this.axios.get<Tenant>(`/tenants/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        '[TenantService] Erro ao buscar tenant por ID:',
        error
      );
      throw error;
    }
  }

  /**
   * Cria um novo tenant
   * POST /tenants
   */
  async createTenant(data: Partial<Tenant>): Promise<Tenant> {
    try {
      const response = await this.axios.post<Tenant>('/tenants', data);
      return response.data;
    } catch (error) {
      console.error('[TenantService] Erro ao criar tenant:', error);
      throw error;
    }
  }

  /**
   * Atualiza um tenant existente
   * PATCH /tenants/:id
   */
  async updateTenant(id: string, data: Partial<Tenant>): Promise<Tenant> {
    try {
      const response = await this.axios.patch<Tenant>(
        `/tenants/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('[TenantService] Erro ao atualizar tenant:', error);
      throw error;
    }
  }

  /**
   * Deleta um tenant
   * DELETE /tenants/:id
   */
  async deleteTenant(id: string): Promise<void> {
    try {
      await this.axios.delete(`/tenants/${id}`);
    } catch (error) {
      console.error('[TenantService] Erro ao deletar tenant:', error);
      throw error;
    }
  }
}

export default new TenantService();

/**
 * ============================================================================
 * TENANT STORE (Zustand)
 * Gerencia o estado de tenants (empresas) do usuário
 * ============================================================================
 */

import { create } from 'zustand';
import tenantService from '../services/api/tenant.service';
import { Tenant } from '../types';

export interface TenantStore {
  // Estado
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchTenants: () => Promise<void>;
  setCurrentTenant: (tenant: Tenant) => void;
  createTenant: (data: Partial<Tenant>) => Promise<Tenant>;
  updateTenant: (id: string, data: Partial<Tenant>) => Promise<void>;
  deleteTenant: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTenantStore = create<TenantStore>((set, get) => ({
  // Estado inicial
  currentTenant: null,
  availableTenants: [],
  isLoading: false,
  error: null,

  /**
   * Busca todos os tenants disponíveis (HARDCODED)
   */
  fetchTenants: async () => {
    set({ isLoading: true, error: null });

    try {
      // Empresas hardcoded
      const tenants: Tenant[] = [
        {
          id: '6e976210-e9f5-4296-9087-bf1e6a8e320f',
          name: 'Empresa Exemplo',
          subdomain: 'empresa-exemplo',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5c7202d8-b9bb-4b43-9f7b-73fe4726eb90',
          name: 'Empresa Demo',
          subdomain: 'empresa-demo',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '644131b9-d42e-4c21-8d19-d77dca61b479',
          name: 'Teste Corp',
          subdomain: 'teste-corp',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      console.log(`✅ Tenants carregados (hardcoded): ${tenants.length}`);

      set({
        availableTenants: tenants,
        isLoading: false,
      });

      // Seleciona o primeiro se nenhum selecionado
      if (!get().currentTenant && tenants.length > 0) {
        set({ currentTenant: tenants[0] });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao buscar tenants';

      console.error('❌ Erro ao buscar tenants:', error);

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Define o tenant atual
   */
  setCurrentTenant: (tenant: Tenant) => {
    set({ currentTenant: tenant });
  },

  /**
   * Cria um novo tenant
   */
  createTenant: async (data: Partial<Tenant>) => {
    set({ isLoading: true, error: null });

    try {
      const newTenant = await tenantService.createTenant(data);

      set((state) => ({
        availableTenants: [...state.availableTenants, newTenant],
        isLoading: false,
      }));

      return newTenant;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao criar tenant';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Atualiza um tenant existente
   */
  updateTenant: async (id: string, data: Partial<Tenant>) => {
    set({ isLoading: true, error: null });

    try {
      const updatedTenant = await tenantService.updateTenant(id, data);

      set((state) => ({
        availableTenants: state.availableTenants.map((t) =>
          t.id === id ? updatedTenant : t
        ),
        currentTenant:
          state.currentTenant?.id === id
            ? updatedTenant
            : state.currentTenant,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar tenant';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Deleta um tenant
   */
  deleteTenant: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await tenantService.deleteTenant(id);

      set((state) => ({
        availableTenants: state.availableTenants.filter((t) => t.id !== id),
        currentTenant: state.currentTenant?.id === id ? null : state.currentTenant,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao deletar tenant';

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  /**
   * Limpa a mensagem de erro
   */
  clearError: () => set({ error: null }),
}));

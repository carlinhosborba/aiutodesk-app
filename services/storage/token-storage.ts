import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';

const isWeb = Platform.OS === 'web';

async function setTokenWeb(token: string): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.warn('[token-storage] Não foi possível salvar token no localStorage:', error);
  }
}

async function getTokenWeb(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.warn('[token-storage] Não foi possível ler token no localStorage:', error);
    return null;
  }
}

async function deleteTokenWeb(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.warn('[token-storage] Não foi possível remover token do localStorage:', error);
  }
}

export const tokenStorage = {
  async setToken(token: string): Promise<void> {
    if (isWeb) {
      await setTokenWeb(token);
      return;
    }

    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    if (isWeb) {
      return getTokenWeb();
    }

    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async deleteToken(): Promise<void> {
    if (isWeb) {
      await deleteTokenWeb();
      return;
    }

    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};

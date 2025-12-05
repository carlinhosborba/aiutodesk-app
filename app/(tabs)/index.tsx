import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/store/auth";

export default function HomeScreen() {
  const router = useRouter();

  // Pegamos o estado inteiro (sem chamar nada que atualize)
  const auth = useAuth();
  const isLoggedIn = !!auth.token;

  function handleLogout() {
    if (isLoggedIn) {
      // limpa usuário/token no Zustand
      auth.logout();
      // volta para a tela de login
      router.replace("/login");
    }
  }

  function goToSobre() {
    router.push("/sobre");
  }

  function goToEquipe() {
    router.push("/equipe");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card de autenticação */}
      <View style={styles.authCard}>
        <Text style={styles.authTitle}>Estado de autenticação (Zustand)</Text>

        {isLoggedIn && auth.user ? (
          <>
            <Text style={styles.authText}>
              Usuário logado:{" "}
              <Text style={styles.authBold}>{auth.user.nome}</Text>
            </Text>
            <Text style={styles.authText}>{auth.user.email}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.authText}>Nenhum usuário logado.</Text>
        )}
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>AIUTODESK</Text>
        <Text style={styles.subtitle}>Bem-vindo ao app da equipe!</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={goToSobre}>
          <Text style={styles.primaryButtonText}>Sobre o Projeto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={goToEquipe}>
          <Text style={styles.primaryButtonText}>Equipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  authCard: {
    backgroundColor: "#f7e9ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  authTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  authText: {
    fontSize: 14,
    marginBottom: 4,
  },
  authBold: {
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#ff4b4b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  mainContent: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#7b2cff",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

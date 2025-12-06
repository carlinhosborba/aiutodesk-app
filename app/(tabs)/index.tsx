import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/ui/AppButton";

import { chamadosFake } from "@/constants/chamados";

export default function DashboardScreen() {
  const router = useRouter();
  const usuario = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Novo logout com redirecionamento:
  function handleLogout() {
    logout();               // limpa Zustand
    router.replace("/login"); // volta à tela de login
  }

  // Estatísticas mock
  const abertos = chamadosFake.filter((c) => c.status === "Aberto").length;
  const andamento = chamadosFake.filter((c) => c.status === "Em andamento").length;
  const fechados = chamadosFake.filter((c) => c.status === "Fechado").length;

  function getInitials(nome: string) {
    if (!nome) return "?";
    const partes = nome.split(" ");
    return partes[0][0].toUpperCase();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* 🔹 Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(usuario?.nome || "U")}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Olá,</Text>
          <Text style={styles.username}>{usuario?.nome}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
        </View>

        {/* 🔹 Botão SAIR CORRIGIDO */}
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Ações rápidas */}
      <Text style={styles.sectionTitle}>Ações rápidas</Text>
      <View style={styles.quickActions}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/chamado/novo")}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionText}>Novo chamado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionText}>Meus chamados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/equipe")}
        >
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionText}>Equipe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/sobre")}
        >
          <Text style={styles.actionIcon}>ℹ️</Text>
          <Text style={styles.actionText}>Sobre o app</Text>
        </TouchableOpacity>

      </View>

      {/* 🔹 Estatísticas */}
      <Text style={styles.sectionTitle}>Estatísticas</Text>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: "#FEE2E2" }]}>
          <Text style={styles.statNumber}>{abertos}</Text>
          <Text style={styles.statLabel}>Abertos</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#FEF3C7" }]}>
          <Text style={styles.statNumber}>{andamento}</Text>
          <Text style={styles.statLabel}>Em andamento</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#D1FAE5" }]}>
          <Text style={styles.statNumber}>{fechados}</Text>
          <Text style={styles.statLabel}>Fechados</Text>
        </View>
      </View>

      {/* 🔹 Últimos chamados */}
      <Text style={styles.sectionTitle}>Últimos chamados</Text>

      <View style={styles.lastCallsBox}>
        {chamadosFake.slice(0, 3).map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.lastCallItem}
            onPress={() => router.push(`/chamado/${c.id}`)}
          >
            <Text style={styles.lastCallTitle}>{c.titulo}</Text>
            <Text style={styles.lastCallStatus}>{c.status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <AppButton
        title="Ver todos os chamados"
        onPress={() => router.push("/explore")}
        style={{ marginTop: 16 }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 18,
    backgroundColor: "#F3F4F6",
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#4C1D95",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "700",
  },
  welcome: {
    fontSize: 14,
    color: "#6B7280",
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
  },
  logout: {
    padding: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },

  // AÇÕES RÁPIDAS
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 26,
  },
  actionCard: {
    width: "47%",
    backgroundColor: "#FFF",
    paddingVertical: 22,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 26,
  },
  actionText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  // ESTATÍSTICAS
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    width: "32%",
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  // ÚLTIMOS CHAMADOS
  lastCallsBox: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 14,
  },
  lastCallItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  lastCallTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  lastCallStatus: {
    fontSize: 12,
    color: "#6B7280",
  },
});

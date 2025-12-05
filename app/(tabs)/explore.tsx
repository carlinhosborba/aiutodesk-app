import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/ui/AppButton";
import { chamadosFake } from "@/constants/chamados";

export default function ChamadosScreen() {
  const router = useRouter();

  function handleNovoChamado() {
    // Agora abre a tela de "Novo chamado"
    router.push("/chamado/novo");
  }

  function handleAbrirChamado(chamadoId: number) {
    router.push(`/chamado/${chamadoId}`);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Aberto":
        return "#EF4444";
      case "Em andamento":
        return "#F59E0B";
      case "Fechado":
        return "#10B981";
      default:
        return "#6B7280";
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chamados</Text>
        <Text style={styles.subtitle}>
          Acompanhe os tickets de suporte do AIUTODESK
        </Text>
      </View>

      <AppButton
        title="Novo chamado"
        onPress={handleNovoChamado}
        variant="primary"
        style={{ marginBottom: 20 }}
      />

      {chamadosFake.map((chamado) => (
        <TouchableOpacity
          key={chamado.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleAbrirChamado(chamado.id)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{chamado.titulo}</Text>

            <View
              style={[
                styles.statusPill,
                { backgroundColor: getStatusColor(chamado.status) + "22" },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(chamado.status) },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(chamado.status) },
                ]}
              >
                {chamado.status}
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardMeta}>
              Prioridade:{" "}
              <Text style={styles.cardMetaBold}>{chamado.prioridade}</Text>
            </Text>
            <Text style={styles.cardMeta}>
              Solicitante:{" "}
              <Text style={styles.cardMetaBold}>{chamado.solicitante}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardFooter: {
    marginTop: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: "#4B5563",
  },
  cardMetaBold: {
    fontWeight: "600",
  },
});

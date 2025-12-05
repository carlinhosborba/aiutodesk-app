import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { chamadosFake } from "@/constants/chamados";
import { AppButton } from "@/components/ui/AppButton";

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

export default function ChamadoDetalheScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const chamado = chamadosFake.find((item) => item.id === Number(id));

  if (!chamado) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Chamado não encontrado.</Text>
        <AppButton
          title="Voltar para a lista"
          onPress={() => router.push("/explore")}
          variant="outline"
          style={{
            marginTop: 16,
            borderColor: "#4C1D95",
            backgroundColor: "#F9FAFB",
          }}
        />
      </View>
    );
  }

  const statusColor = getStatusColor(chamado.status);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{chamado.titulo}</Text>

        <View
          style={[
            styles.statusPill,
            { backgroundColor: statusColor + "22" },
          ]}
        >
          <View
            style={[styles.statusDot, { backgroundColor: statusColor }]}
          />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {chamado.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Prioridade</Text>
        <Text style={styles.infoValue}>{chamado.prioridade}</Text>

        <Text style={styles.infoLabel}>Solicitante</Text>
        <Text style={styles.infoValue}>{chamado.solicitante}</Text>

        <Text style={styles.infoLabel}>Data de abertura</Text>
        <Text style={styles.infoValue}>{chamado.dataAbertura}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.sectionText}>{chamado.descricao}</Text>
      </View>

      <AppButton
        title="Voltar para a lista"
        onPress={() => router.push("/explore")}
        variant="outline"
        style={{
          marginTop: 24,
          borderColor: "#4C1D95",
          backgroundColor: "#F9FAFB",
        }}
      />
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
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  statusPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#374151",
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  notFoundText: {
    fontSize: 16,
    color: "#111827",
  },
});

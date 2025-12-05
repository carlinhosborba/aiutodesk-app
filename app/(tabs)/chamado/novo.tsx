import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/ui/AppButton";

export default function NovoChamadoScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  function handleSalvar() {
    // Validação simples
    if (!titulo || !descricao) {
      // Para não usar Alert, vamos só “destacar” o erro no console por enquanto
      console.warn("Preencha título e descrição antes de salvar.");
      return;
    }

    // Aqui ainda é MOCK: não envia para back-end,
    // apenas volta para a lista de chamados.
    router.push("/explore");
  }

  function handleCancelar() {
    router.push("/explore");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Novo chamado</Text>
        <Text style={styles.subtitle}>
          Preencha as informações abaixo para registrar um pedido de suporte.
        </Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Problema ao acessar o sistema"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o problema com o máximo de detalhes possível."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Prioridade (mock)</Text>
        <TextInput
          style={styles.input}
          value={prioridade}
          onChangeText={setPrioridade}
        />

        <AppButton
          title="Salvar chamado"
          onPress={handleSalvar}
          style={{ marginTop: 16 }}
        />

        <AppButton
          title="Cancelar"
          variant="outline"
          onPress={handleCancelar}
          style={{
            marginTop: 8,
            borderColor: "#4C1D95",
            backgroundColor: "#F9FAFB",
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    color: "#374151",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

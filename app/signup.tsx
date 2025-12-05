import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

export default function SignupScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");

  function handleSignup() {
    setErro("");

    if (!nome || !email || !senha || !confirmacao) {
      setErro("Preencha todos os campos para continuar.");
      return;
    }

    if (senha !== confirmacao) {
      setErro("As senhas não conferem.");
      return;
    }

    // 👉 Por enquanto: cadastro FAKE
    // Aqui no futuro entra a chamada para a API (Express)
    console.log("Usuário cadastrado (FAKE):", { nome, email });

    // Depois de cadastrar, volta para o login
    router.replace("/login");
  }

  function handleGoToLogin() {
    setErro("");
    router.replace("/login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>
          Preencha os dados para se cadastrar no AIUTODESK
        </Text>

        <AppInput
          label="Nome completo"
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <AppInput
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AppInput
          label="Senha"
          placeholder="Crie uma senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <AppInput
          label="Confirmação de senha"
          placeholder="Repita a senha"
          value={confirmacao}
          onChangeText={setConfirmacao}
          secureTextEntry
          error={erro}
        />

        <AppButton title="Cadastrar" onPress={handleSignup} />

        <TouchableOpacity onPress={handleGoToLogin}>
          <Text style={styles.link}>Já tenho conta – fazer login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#7B3AED",
    fontSize: 15,
    fontWeight: "500",
  },
});

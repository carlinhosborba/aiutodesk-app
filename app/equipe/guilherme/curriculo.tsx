import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Divider } from 'react-native-paper';
import { Link } from 'expo-router';

export default function CurriculoGuilherme() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Guilherme Martins"
          subtitle="Desenvolvedor em Formação | Estudante de Sistemas para Internet"
          left={(props) => <Avatar.Text {...props} label="GM" />}
        />

        <Card.Content>
          <Text style={styles.sectionTitle}>Experiência Profissional</Text>

          <Text style={styles.itemTitle}>Projetos Acadêmicos — Spring Boot & PostgreSQL</Text>
          <Text style={styles.subtitle}>2024 - 2025 • Unicap</Text>
          <Text style={styles.text}>
            Criação de APIs REST utilizando Spring Boot, PostgreSQL e conceitos essenciais de arquitetura de software,
            incluindo SOLID, coesão, acoplamento e aplicação de padrões de projeto.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.itemTitle}>Aplicativo Mobile — React Native & Expo</Text>
          <Text style={styles.subtitle}>2024 - 2025 • Projeto Autônomo</Text>
          <Text style={styles.text}>
            Desenvolvimento de um aplicativo de currículos com React Native, utilizando Expo Router, navegação modular
            e integração com API externa.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>

          <Text style={styles.itemTitle}>Sistemas para Internet</Text>
          <Text style={styles.subtitle}>Universidade Católica de Pernambuco • 2023 - Atual</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Tecnologias e Competências</Text>
          <Text style={styles.text}>• Java, Spring Boot, JPA / Hibernate, PostgreSQL</Text>
          <Text style={styles.text}>• JavaScript, TypeScript, Node.js com Express</Text>
          <Text style={styles.text}>• React Native, Expo, navegação e estados</Text>
          <Text style={styles.text}>• Git e GitHub (@guicms03)</Text>
          <Text style={styles.text}>• Estruturação limpa de código, SOLID e padrões de arquitetura</Text>
          <Text style={styles.text}>• Boa comunicação, aprendizado rápido e autonomia</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/guilherme" asChild>
            <Text style={styles.linkVoltar}>← Voltar ao perfil</Text>
          </Link>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 32,
  },
  card: {
    borderRadius: 16,
    paddingBottom: 18,
    elevation: 3,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.75,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 21,
  },
  divider: {
    marginVertical: 16,
  },
  actions: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  linkVoltar: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6A1B9A',
  },
});
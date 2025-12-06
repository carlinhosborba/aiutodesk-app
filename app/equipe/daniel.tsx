import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function DanielLunaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Daniel Luna Paiva"
          subtitle="Frontend Developer | AIUTODESK"
          left={(props) => <Avatar.Text {...props} label="DL" />}
        />
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.text}>
            Frontend Developer com expertise em Angular, React, JavaScript e TypeScript. 
            Trabalho na Avanade como Sr. Associate e contribuo no projeto AIUTODESK, 
            desenvolvendo interfaces intuitivas e soluções web de alta performance.
          </Text>

          <Text style={styles.sectionTitle}>Tecnologias</Text>
          <Text style={styles.text}>
            Angular • React • JavaScript • TypeScript • Git • Scrum • Web • SEO
          </Text>

          <Text style={styles.sectionTitle}>Formação</Text>
          <Text style={styles.text}>
            CST em Sistemas para Internet (UNICAP, 2024-2026) • 
            Técnico em Multimídia (ETE Ginásio Pernambucano, 2021-2023)
          </Text>

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 daniel.00008353754@unicap.br</Text>
          <Text style={styles.text}>🔗 linkedin.com/in/daniel-luna27</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/daniel/curriculo" asChild>
            <Button mode="contained">Ver currículo resumido</Button>
          </Link>

          <Link href="/equipe" asChild>
            <Button mode="text">Voltar para a equipe</Button>
          </Link>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 32,
  },
  card: {
    borderRadius: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Card, Text, Avatar, Button } from 'react-native-paper';

export default function GuilhermeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Guilherme Martins"
          subtitle="Colaborador da equipe AIUTODESK"
          left={(props) => <Avatar.Text {...props} label="GM" />}
        />

        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.text}>
            Trabalho como assistente administrativo em uma empresa de transporte de valores e curso o 4º período de Sistemas para Internet na Unicap.
          </Text>

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 E-mail: martinsg750@gmail.com</Text>
          <Text style={styles.text}>🐙 GitHub: @guicms03</Text>
          <Text style={styles.text}>💼 LinkedIn: Guilherme Martins</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/guilherme/curriculo" asChild>
            <Button mode="contained">Currículo resumido</Button>
          </Link>

          <Link href="/equipe" asChild>
            <Button mode="text">Voltar à lista</Button>
          </Link>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 40,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 17,
    fontWeight: '700',
  },
  text: {
    marginBottom: 6,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
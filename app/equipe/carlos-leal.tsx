import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Card, Text, Avatar, Button } from 'react-native-paper';

export default function CarlosLealScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Carlos Leal"
          subtitle="Integrante da equipe AIUTODESK"
          left={(props) => <Avatar.Text {...props} label="CL" />}
        />
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.text}>
            Carlos Leal é integrante da equipe AIUTODESK, colaborando nas decisões
            técnicas do projeto, no desenvolvimento das telas e na organização das
            funcionalidades do app.
          </Text>

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 E-mail: carlos.lneeto@gmail.com</Text>
          <Text style={styles.text}>🐙 GitHub: https://github.com/carloslneeto</Text>
          <Text style={styles.text}>💼 LinkedIn: https://www.linkedin.com/in/carlos-leal-30790a236?utm_source=share_via&utm_content=profile&utm_medium=member_ios</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/carlos-leal/curriculo" asChild>
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

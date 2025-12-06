import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Card, Text, Avatar, Button } from 'react-native-paper';

export default function AlysonScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Alyson Lima"
          subtitle="Integrante da equipe AIUTODESK"
          left={(props) => <Avatar.Text {...props} label="AL" />}
        />
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.text}>
            Sou um integrante da equipe AIUTODESK, colaborando no desenvolvimento 
            do aplicativo, tomada de decisões técnicas e suporte às funcionalidades 
            ligadas ao front-end e à integração com o back-end.
          </Text>

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 E-mail: (alysonrafael2005@gmail.com)</Text>
          <Text style={styles.text}>🐙 GitHub: (https://github.com/AlysonLima1)</Text>
          <Text style={styles.text}>💼 LinkedIn: (https://www.linkedin.com/in/alyson-lima-a556522a0/)</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/alyson/curriculo" asChild>
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

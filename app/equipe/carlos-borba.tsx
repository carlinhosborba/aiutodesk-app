import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Card, Text, Avatar, Button } from 'react-native-paper';

export default function CarlosBorbaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Carlos Borba"
          subtitle="Assessor Técnico • Desenvolvedor Front-End"
          left={(props) => <Avatar.Text {...props} label="CB" />}
        />
        <Card.Content>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.text}>
            Assessor Técnico na Secretaria de Gestão e Inovação da Prefeitura Municipal
            da Aliança, formado em Direito e graduando em Sistemas para Internet (UNICAP).
            Atuo como desenvolvedor front-end, com foco em criação de interfaces modernas
            e experiências digitais acessíveis.
          </Text>

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 E-mail: carlinhos.borba@hotmail.com</Text>
          <Text style={styles.text}>🐙 GitHub: https://github.com/carlinhosborba</Text>
          <Text style={styles.text}>💼 LinkedIn: linkedin.com/in/carlos-borba-770b71169</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/carlos-borba/curriculo" asChild>
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

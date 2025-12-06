import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, Divider, Text } from 'react-native-paper';

export default function CurriculoDanielLuna() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Daniel Luna Paiva"
          subtitle="Frontend Developer | Especialista em Aplicações Industriais"
          left={(props) => <Avatar.Text {...props} label="DL" />}
        />

        <Card.Content>
          <Text style={styles.sectionTitle}>Resumo Profissional</Text>
          <Text style={styles.text}>
            Frontend Developer com experiência em Angular, React, JavaScript, TypeScript e tecnologias modernas. Trabalho na Avanade como Sr. Associate, desenvolvendo soluções web e aplicações industriais com foco em performance, acessibilidade e experiência do usuário.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Experiência Profissional</Text>

          <Text style={styles.itemTitle}>Sr. Associate, Front-end Developer | Analista Júnior</Text>
          <Text style={styles.subtitle}>Avanade • Janeiro de 2025 - Presente (1 ano)</Text>
          <Text style={styles.text}>
            Desenvolvimento de soluções web e aplicações industriais com foco em arquitetura escalável e boas práticas de design. Expertise em Angular, React e tecnologias modernas.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.itemTitle}>Estagiário de Desenvolvimento Web</Text>
          <Text style={styles.subtitle}>Prefeitura da Cidade do Recife • Julho de 2024 - Novembro de 2024 (5 meses)</Text>
          <Text style={styles.text}>
            Desenvolvimento de aplicações web, criação de componentes reutilizáveis e integração com APIs. Participação ativa em projetos de modernização de sistemas municipais.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          <Text style={styles.itemTitle}>Curso Superior de Tecnologia (CST)</Text>
          <Text style={styles.subtitle}>Universidade Católica de Pernambuco • Sistemas para Internet</Text>
          <Text style={styles.text}>Março de 2024 - Dezembro de 2026</Text>

          <Text style={styles.itemTitle}>Técnico em Multimídia</Text>
          <Text style={styles.subtitle}>ETE Ginásio Pernambucano</Text>
          <Text style={styles.text}>Fevereiro de 2021 - Dezembro de 2023</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Tecnologias e Habilidades</Text>
          <Text style={styles.text}>• Angular, React, JavaScript, TypeScript</Text>
          <Text style={styles.text}>• Git, Scrum, Kanban</Text>
          <Text style={styles.text}>• Web, SEO, Oratória, AMS L3</Text>
          <Text style={styles.text}>• Design centrado no usuário e acessibilidade web</Text>
          <Text style={styles.text}>• Desenvolvimento de aplicações industriais e soluções empresariais</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Idiomas</Text>
          <Text style={styles.text}>• Português (Nativo ou Bilíngue)</Text>
          <Text style={styles.text}>• Inglês (Profissional Working)</Text>
          <Text style={styles.text}>• Espanhol (Profissional Working)</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Certificações</Text>
          <Text style={styles.text}>• Microsoft Certified: Azure AI Fundamentals</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.text}>📧 daniel.00008353754@unicap.br</Text>
          <Text style={styles.text}>🔗 www.linkedin.com/in/daniel-luna27</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/daniel" asChild>
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
    padding: 16,
    paddingTop: 24,
  },
  card: {
    borderRadius: 12,
    paddingBottom: 12,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 12,
  },
  actions: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  linkVoltar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A1B9A',
  },
});

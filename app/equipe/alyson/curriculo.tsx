import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Divider } from 'react-native-paper';
import { Link } from 'expo-router';

export default function CurriculoAlyson() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Alyson Lima"
          subtitle="Currículo Resumido"
          left={(props) => <Avatar.Text {...props} label="AL" />}
        />

        <Card.Content>
          <Text style={styles.sectionTitle}>Experiência Profissional</Text>

          <Text style={styles.itemTitle}> Estagiario em Tecnico de Informatica </Text>
          <Text style={styles.subtitle}>7 Meses de Atuação • Auto Norte Distribuidora de Peças Automotivas (preencher)</Text>
          <Text style={styles.text}>
            Como atividades desenvolvidas durante meu estágio como Técnico de Informática, destaco:
            Suporte aos usuários na resolução de problemas de hardware e software.
            Instalação e configuração de computadores, impressoras e periféricos.
            Atualização e formatação de sistemas operacionais.
            Auxílio na manutenção preventiva e corretiva de equipamentos.
            Configuração de redes básicas (Wi-Fi, cabo, compartilhamento de pastas).
            Monitoramento e organização de chamados técnicos.
            Apoio na instalação de programas e ferramentas corporativas.
            Documentação de processos e suporte ao setor de TI em tarefas gerais.

          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          <Text style={styles.itemTitle}>Sistemas para Internet (preencher)</Text>
          <Text style={styles.subtitle}>Universidade Catolica de Pernambuco • Quarto Período</Text>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Tecnologias e Habilidades</Text>
          <Text style={styles.text}>• Domino com certa perspicacia Java</Text>
          
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Link href="/equipe/alyson" asChild>
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

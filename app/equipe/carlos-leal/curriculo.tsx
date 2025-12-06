import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Divider } from 'react-native-paper';
import { Link } from 'expo-router';

export default function CurriculoCarlosLealNeto() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Card style={styles.card}>
        <Card.Title
          title="Carlos Leal Neto"
          subtitle="Currículo Resumido"
          left={(props) => <Avatar.Text {...props} label="CL" />}
        />

        <Card.Content>

          {/* Experiência Profissional */}
          <Text style={styles.sectionTitle}>Experiência Profissional</Text>

          <Text style={styles.itemTitle}>Jovem aprendiz - Loja de Comércio</Text>
          <Text style={styles.subtitle}>jun 2023 – atualmente</Text>
          <Text style={styles.text}>
            Atendimento ao público, organização de estoque, suporte geral às operações 
            de vendas, sistemas e auxílio no funcionamento diário da loja.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.itemTitle}>Suporte de TI - Karne Keijo</Text>
          <Text style={styles.subtitle}>ago 2025 – nov 2025</Text>
          <Text style={styles.text}>
            Apoio operacional, desenvolvimento de dashboards, atendimento e manutenção dos números da empresa.
          </Text>

          <Divider style={styles.divider} />

          <Text style={styles.itemTitle}>Assistente administrativo - Parvi</Text>
          <Text style={styles.subtitle}>nov 2025 – atualmente</Text>
          <Text style={styles.text}>
            Suporte às atividades da unidade, organização interna, atendimento ao cliente 
            e apoio às rotinas administrativas.
          </Text>

          <Divider style={styles.divider} />

          {/* Formação Acadêmica */}
          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>

          <Text style={styles.itemTitle}>Sistemas para Internet – UNICAP</Text>
          <Text style={styles.subtitle}>2024–2026 (cursando)</Text>

          <Divider style={styles.divider} />

          {/* Tecnologias */}
          <Text style={styles.sectionTitle}>Tecnologias e Habilidades</Text>

          <Text style={styles.text}>• React • React Native • Expo • Next.js</Text>
          <Text style={styles.text}>• Node.js • Express • PostgreSQL</Text>
          <Text style={styles.text}>• Tailwind CSS • UI Design • Git/GitHub</Text>
          <Text style={styles.text}>• Excel • Power BI • Docs</Text>

        </Card.Content>

        {/* Botão voltar */}
        <Card.Actions style={styles.actions}>
          <Link href="/equipe/carlos-borba" asChild>
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

// constants/chamados.ts

export type Chamado = {
  id: number;
  titulo: string;
  status: "Aberto" | "Em andamento" | "Fechado";
  prioridade: "Alta" | "Média" | "Baixa";
  solicitante: string;
  descricao: string;
  dataAbertura: string;
};

export const chamadosFake: Chamado[] = [
  {
    id: 1,
    titulo: "Erro ao acessar sistema interno",
    status: "Aberto",
    prioridade: "Alta",
    solicitante: "Maria Souza",
    descricao:
      "Usuária relata que não consegue acessar o sistema interno desde o início do expediente. Já tentou trocar de navegador e reiniciar o computador.",
    dataAbertura: "05/12/2025 08:15",
  },
  {
    id: 2,
    titulo: "Impressora do setor financeiro parada",
    status: "Em andamento",
    prioridade: "Média",
    solicitante: "João Lima",
    descricao:
      "Impressora não responde a novos pedidos de impressão. Já foi reiniciada, mas o problema persiste.",
    dataAbertura: "04/12/2025 15:42",
  },
  {
    id: 3,
    titulo: "Solicitação de criação de e-mail institucional",
    status: "Fechado",
    prioridade: "Baixa",
    solicitante: "Carlos Borba",
    descricao:
      "Criação de novo e-mail institucional para colaborador recém-contratado no setor de inovação.",
    dataAbertura: "03/12/2025 10:05",
  },
];

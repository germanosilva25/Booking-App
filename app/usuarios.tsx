import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

const clientes = [
  {
    id: 1,
    nome: "Carlos Andrade",
    tipo: "Compulsivo",
    dificuldade: "Fácil",
    estrategia: "Criar senso de urgência e usar gatilhos emocionais",
    ambiente: "Loja iluminada e cheia de estímulos visuais"
  },
  {
    id: 2,
    nome: "Fernanda Lima",
    tipo: "Analítico",
    dificuldade: "Difícil",
    estrategia: "Fornecer dados e comparações detalhadas",
    ambiente: "Ambiente neutro e sem pressões"
  },
  {
    id: 3,
    nome: "Roberto Souza",
    tipo: "Fiel e Repetitivo",
    dificuldade: "Médio",
    estrategia: "Personalizar o atendimento e oferecer benefícios exclusivos",
    ambiente: "Local familiar e confortável"
  },
  {
    id: 4,
    nome: "Juliana Mendes",
    tipo: "Emocional e Indeciso",
    dificuldade: "Médio",
    estrategia: "Criar um ambiente de confiança e eliminar objeções",
    ambiente: "Local tranquilo e sem distrações"
  },
  {
    id: 5,
    nome: "Eduardo Martins",
    tipo: "Gosta de Negociar",
    dificuldade: "Difícil",
    estrategia: "Criar margem para negociação e oferecer exclusividade",
    ambiente: "Local informal para conversas abertas"
  },
  {
    id: 6,
    nome: "Camila Pereira",
    tipo: "Compulsivo",
    dificuldade: "Fácil",
    estrategia: "Usar escassez e promoções relâmpago",
    ambiente: "Shopping com grande fluxo de pessoas"
  },
  {
    id: 7,
    nome: "Ricardo Nunes",
    tipo: "Analítico",
    dificuldade: "Difícil",
    estrategia: "Demonstrar estudos de caso e provas concretas",
    ambiente: "Reunião empresarial com apresentação de dados"
  },
  {
    id: 8,
    nome: "Tatiane Alves",
    tipo: "Fiel e Repetitivo",
    dificuldade: "Médio",
    estrategia: "Construir um relacionamento de longo prazo",
    ambiente: "Local aconchegante e bem conhecido"
  },
  {
    id: 9,
    nome: "Guilherme Costa",
    tipo: "Emocional e Indeciso",
    dificuldade: "Médio",
    estrategia: "Usar depoimentos e garantir suporte pós-venda",
    ambiente: "Ambiente descontraído e sem pressão"
  },
  {
    id: 10,
    nome: "Mariana Silva",
    tipo: "Gosta de Negociar",
    dificuldade: "Difícil",
    estrategia: "Mostrar opções e permitir que o cliente sinta controle",
    ambiente: "Local de negociação flexível e informal"
  }
];

const dias_da_semana = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sánado'
]

const App = () => {
  // Estado para armazenar os clientes e o status de carregamento
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados dos clientes
    const fetchClientes = async () => {
      try {
        // const response = await fetch('http://localhost/agendamentos/usuarios');
        const response = await fetch('localhost/agendamentos/create-usuario?name=Bruno+Mendes&email=elizabetecordeiro@mail.com&id_grupo=3&data_nascimento=2000-05-01&senha=kmlkmKMKLm9890NNMO');
        // const data = await response.json(); // Supondo que a resposta seja JSON
        const data = clientes;
        setClientes(data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchClientes();
  }, []); // O array vazio significa que o efeito será disparado uma vez quando o componente for montado

  if (loading) {
    // Exibe um indicador de carregamento enquanto os dados não chegam
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfis de Clientes</Text>
      <Link href="/cadastrarCliente" asChild>
                  <Pressable>
                    <Text>Cadastrar Usuário</Text>
                  </Pressable>
                </Link>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Dificuldade: {item.dificuldade}</Text>
            <Text>Estratégia: {item.estrategia}</Text>
            <Text>Ambiente Ideal: {item.ambiente}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;

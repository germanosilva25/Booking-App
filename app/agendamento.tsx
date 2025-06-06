process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import { StyleSheet, Text, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
// import { Usuarios } from '@/constants/usuario';


type Agendamento = {
  id_agendamento: number;
  id_usuario: number;
  id_agenda: number;
  id_servico: number;
  data: string;
  nome_usuario: string;
  nome_grupo: string;
  email: string;
};



// type User = {
//   id: number;
//   nome: string;
//   nome_grupo: string;
// };

export default function ListaAgendamentos() {
  const [users, setUsers] = useState<Agendamento[] | null>(null);
  useEffect(() => {

    const getAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/get-agendamentos');
        const data = await response.json();
        setUsers(data.agendamentos);
        console.error('users:', data.agendamentos);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    getAgendamentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos do dia</Text>

      <Link href="criarAgendamento" asChild>
        <Text>Agendar</Text>
      </Link>

      <FlatList
        data={users || []}
        keyExtractor={(item) => item.id_agendamento.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id_agendamento}</Text>
            <Text>Cliente: {item.usuario.nome_usuario}</Text>
            <Text>Profissional: {item.agenda.usuario.nome_usuario}</Text>
            <Text>Servico: {item.servico.nome_servico}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Hora: {item.agenda.horario}</Text>
          </View>
        )}
      />
    </View>
  );
}

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
    boxboxShadowColor: '#000',
    boxboxShadowOffset: { width: 0, height: 2 },
    boxboxShadowOpacity: 0.1,
    boxboxShadowRadius: 4,
    elevation: 3,
  },
});

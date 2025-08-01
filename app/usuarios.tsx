process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import { StyleSheet, Text, FlatList, View, Alert, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
// import { Usuarios } from '@/constants/usuario';


type User = {
  id_usuario: number;
  id_grupo: number;
  data_de_nascimento: string;
  nome_usuario: string;
  nome_grupo: string;
  email: string;
};



// type User = {
//   id: number;
//   nome: string;
//   nome_grupo: string;
// };

export default function ListaUsuarios() {
  const [users, setUsers] = useState<User[] | null>(null);
  const router = useRouter();
  useEffect(() => {

    const getUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/usuarios');
        // const response = await fetch('https://novo.mobi-rio.rio.br/get-avisos');
        const data = await response.json();
        setUsers(data.usuarios);
        console.error('users:', data.usuarios);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    getUsuarios();
  }, []);
  //adicionar filter
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <Link href="CadastrarUsuario" asChild>
        <Text>Cadastrar Usuário</Text>
      </Link>

      <FlatList
        data={users || []}
        keyExtractor={(item) => item.id_usuario.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id_usuario}</Text>
            <Text>Nome: {item.nome_usuario}</Text>
            <Text>Nome do grupo: {item.nome_grupo}</Text>
            <View style={{ margin: 5 }}>
              <Button
                title="Editar"

                color="orange"
                onPress={() => {
                  router.push({
                    pathname: '/EditarUsuario',
                    params: { id: item.id_usuario },
                  });
                }}
              />
            </View>
            <View style={{ margin: 5 }}>
              <Button
                title="Deletar"
                color="red"
                onPress={() => {
                  router.push({
                    pathname: '/confirmarDelecao',
                    params: { id: item.id_usuario, nome: item.nome_usuario },
                  });
                }}
              />
            </View>
          </View>
        )}
      />

    </View >
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

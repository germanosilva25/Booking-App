
import { Agendamentos } from '@/constants/agendamentos';
import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Text, FlatList, View, Pressable } from 'react-native';



export default function HomeScreen() {
  return (
    
    <View style={styles.container}>
     
      <Text style={styles.title}>Perfis de Clientes</Text>
      <FlatList
        data={Agendamentos()}
        keyExtractor={(item) => item.id_agendamento.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id_agendamento}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Hora: {item.hora}</Text>
            <Text>Nome do Cliente: {item.nome_cliente}</Text>
            <Text>Nome do profissional: {item.nome_profissional}</Text>
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
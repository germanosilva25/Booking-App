
import { Servicos } from '@/constants/servicos';
import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Text, FlatList, View, Pressable } from 'react-native';



export default function HomeScreen() {
  return (
    
    <View style={styles.container}>
     
      <Text style={styles.title}>Perfis de Clientes</Text>
      <FlatList
        data={Servicos()}
        keyExtractor={(item) => item.id_servico.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id_servico}</Text>
            <Text>Nome: {item.nome_servico}</Text>
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
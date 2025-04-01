import { Usuarios } from '@/constants/usuario';
import { Image, StyleSheet, Platform, Text, FlatList, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (

    <View style={styles.container}>
      
      <Text style={styles.title}>Perfis de Clientes</Text>
      <FlatList
        data={Usuarios()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Id: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Nome do grupo: {item.nome_grupo}</Text>
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
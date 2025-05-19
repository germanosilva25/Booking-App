import { Usuarios } from '@/constants/usuario';
import { Image, StyleSheet, Platform, Text, FlatList, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 20, padding: 10}}>
        
        <View style={{width: '33%', backgroundColor: 'gray'}}>

          <Link href="/servicos" asChild>
            <Pressable>
              <Text>Serviços</Text>
            </Pressable>
          </Link>

        </View>

        <View style={{width: '33%', backgroundColor: 'gray'}}>
          <Link href="/agendamento" asChild>
            <Pressable>
              <Text>Agendamento</Text>
            </Pressable>
          </Link>
        </View>

        <View style={{width: '33%', backgroundColor: 'gray'}}>
          <Link href="/usuarios" asChild>
            <Pressable>
              <Text>Usuários</Text>
            </Pressable>
          </Link>
        </View>
        
      </View>

     
      
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
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MenuItem href="/servicos" image={require('@/assets/images/servicos_agendamento.png')} label="Serviços" />
        <MenuItem href="/agendamento" image={require('@/assets/images/agandamento_agendamento.png')} label="Agendamento" />
        <MenuItem href="/usuarios" image={require('@/assets/images/usuarios_agendamento.png')} label="Usuários" />
      </View>
      <View style={styles.row}>
        <MenuItem href="/agendas" image={require('@/assets/images/agenda_agendamento.png')} label="Agendas" />
        <MenuItem href="/clientes" image={require('@/assets/images/agendamento_cliente.png')} label="Clientes" />
        <MenuItem href="/profissionais" image={require('@/assets/images/agendamento_profissional.png')} label="Profissionais" />
        {/* Adicione mais itens aqui, se necessário */}
      </View>
    </View>
  );
}

function MenuItem({ href, image, label }) {
  return (
    <View style={styles.menuItem}>
      <Link href={href} asChild>
        <Pressable style={styles.button}>
          <Image source={image} style={styles.image} />
          <Text style={styles.label}>{label}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '30%',
    padding: 10,
  },
  button: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
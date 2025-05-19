import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Platform, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    celular: '',
    password: '',
    documento: '',
    id_grupo: 'cliente',
    cargo: 'cabeleiro',
    status: 'ativo',
    data_nascimento: new Date(),
    avatar: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.data_nascimento;
    setShowDatePicker(Platform.OS === 'ios');
    setForm({ ...form, data_nascimento: currentDate });
  };

  const handleSubmit = async () => {
    console.log('handleSubmit executed')
    // Cria a URL para enviar os dados
    const { name, email, id_grupo, data_nascimento, password } = form;
    const formattedDate = data_nascimento.toISOString().split('T')[0]; // Formata a data como "YYYY-MM-DD"
    
    const url = `http://localhost/agendamentos/create-usuario?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&id_grupo=${encodeURIComponent(id_grupo)}&data_nascimento=${encodeURIComponent(formattedDate)}&senha=${encodeURIComponent(password)}`;
    console.log('url', url)
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      } else {
        Alert.alert('Erro', 'Houve um erro ao cadastrar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Não foi possível se conectar ao servidor.');
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => setForm({ ...form, email: text })}
      />


      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        secureTextEntry
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      <Text>Grupo</Text>
      <Picker
        selectedValue={form.cargo}
        onValueChange={(itemValue) => setForm({ ...form, cargo: itemValue })}
        style={styles.input}
      >
        <Picker.Item label="Admin" value="1" />
        <Picker.Item label="Profissional" value="2" />
        <Picker.Item label="Cliente" value="3" />
      </Picker>

      <Text style={styles.title}>Selecione uma Data</Text>
      <Button onPress={() => setShowDatePicker(true)} title="Escolher Data" />

      {showDatePicker && (
        <DateTimePicker
          value={form.data_nascimento}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.selectedDate}>Data Selecionada: {form.data_nascimento.toLocaleDateString()}</Text>

      <Button title="Salvar" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
};

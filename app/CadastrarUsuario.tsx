import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";

export default function CadastroUsuario() {
    const router = useRouter();

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        id_grupo: 1,
        data_de_nascimento: new Date(),
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.data_de_nascimento;
        setShowDatePicker(Platform.OS === 'ios');
        setForm({ ...form, data_de_nascimento: currentDate });
    };

    const handleSubmit = async () => {
        // Prepara os dados para enviar
        const dados = {
            ...form,
            // Se precisar, formate a data para string aqui, ex:
            data_de_nascimento: form.data_de_nascimento.toISOString().split('T')[0],
            id_grupo: Number(form.id_grupo), // garantir que é número
        };

        try {
            const jsonValue = JSON.stringify(dados);
            const response = await fetch("http://localhost/agendamentos/create-usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: jsonValue,
            });

            if (response.ok) {
                // Navegar para a tela "usuarios" após salvar
                router.push('/usuarios'); // caminho da rota, ajuste se necessário
            } else {
                const errorText = await response.text();
                console.error("Erro ao salvar:", errorText);
                Alert.alert("Erro", "Não foi possível salvar os dados.");
            }
        } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro", "Não foi possível enviar os dados.");
        }
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                value={form.nome}
                onChangeText={(text) => setForm({ ...form, nome: text })}
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
                value={form.senha}
                secureTextEntry
                onChangeText={(text) => setForm({ ...form, senha: text })}
            />

            <Text>Grupo</Text>
            <Picker
                selectedValue={form.id_grupo}
                onValueChange={(itemValue) => setForm({ ...form, id_grupo: itemValue })}
                style={styles.input}
            >
                <Picker.Item label="Admin" value={1} />
                <Picker.Item label="Profissional" value={2} />
                <Picker.Item label="Cliente" value={3} />
            </Picker>

            <Text>Data de Nascimento</Text>
            <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
            <Text>{form.data_de_nascimento.toLocaleDateString()}</Text>
            {showDatePicker && (
                <DateTimePicker
                    value={form.data_de_nascimento}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

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
};

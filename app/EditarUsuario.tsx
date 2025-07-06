import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditarUsuario() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [form, setForm] = useState({
        nome_usuario: '',
        email: '',
        senha: '',
        id_grupo: 1,
        data_de_nascimento: new Date(),
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!id) return;
        const buscarUsuario = async () => {
            try {
                const response = await fetch(`http://localhost/agendamentos/get-usuario/${id}`);
                const data = await response.json();
                setForm({
                    nome_usuario: data.nome_usuario,
                    email: data.email,
                    senha: '', // não retorna senha, o campo fica em branco
                    id_grupo: Number(data.id_grupo),
                    data_de_nascimento: new Date(data.data_de_nascimento),
                });
                setCarregando(false);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
                router.back();
            }
        };

        buscarUsuario();
    }, [id]);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.data_de_nascimento;
        setShowDatePicker(Platform.OS === 'ios');
        setForm({ ...form, data_de_nascimento: currentDate });
    };

    const handleSubmit = async () => {
        const dados = {
            ...form,
            data_de_nascimento: form.data_de_nascimento.toISOString().split('T')[0],
            id_grupo: Number(form.id_grupo),
            id_usuario: Number(id),
        };

        try {
            //não esquecer de colocar essa rota no C:\xampp\htdocs\agendamentos\app\Http\Middleware\VerifyCsrfToken.php
            const response = await fetch("http://localhost/agendamentos/editar-usuario", {
                method: "POST", // ou "PUT" se seu backend aceitar
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
                router.replace('/usuarios');
            } else {
                const errorText = await response.text();
                console.error("Erro ao editar:", errorText);
                Alert.alert("Erro", "Não foi possível editar os dados.");
            }
        } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro", "Erro de comunicação com o servidor.");
        }
    };

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                value={form.nome_usuario}
                onChangeText={(text) => setForm({ ...form, nome_usuario: text })}
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
                placeholder="Deixe em branco se não for alterar"
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

            <Button title="Salvar Alterações" onPress={handleSubmit} />
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

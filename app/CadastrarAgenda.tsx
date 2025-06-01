import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Platform, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";

type User = {
    id_usuario: number;
    id_grupo: number;
    data_de_nascimento: string;
    nome_usuario: string;
    nome_grupo: string;
    email: string;
};

export default function CadastroUsuario() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    const [form, setForm] = useState({
        horario_inicio: '',
        horario_final: '',
        dia_da_semana: '',
        id_usuario: ''
    });

    const handleSubmit = async () => {
        // Prepara os dados para enviar
        const dados = {
            ...form,
        };

        try {
            const jsonValue = JSON.stringify(dados);
            const response = await fetch("http://localhost/agendamentos/criar-agenda", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: jsonValue,
            });

            if (response.ok) {
                // Navegar para a tela "usuarios" após salvar
                router.push('/agendas'); // caminho da rota, ajuste se necessário
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

      useEffect(() => {
            const getUsuarios = async () => {
                try {
                    const response = await fetch('http://localhost/agendamentos/usuarios-profissional');
                    const data = await response.json();
                    setUsers(data.usuarios || []);
                } catch (error) {
                    console.error('Erro ao buscar usuários:', error);
                    setUsers([]);
                }
            };
            getUsuarios();
        }, []);

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text>Horário Início</Text>
            <TextInput
                style={styles.input}
                value={form.horario_inicio}
                onChangeText={(text) => setForm({ ...form, horario_inicio: text })}
            />

            <Text>Horário Final</Text>
            <TextInput
                style={styles.input}
                value={form.horario_final}
                onChangeText={(text) => setForm({ ...form, horario_final: text })}
            />


            <Text>Dia da Semana</Text>
            <Picker
                selectedValue={form.dia_da_semana}
                onValueChange={(itemValue) => setForm({ ...form, dia_da_semana: itemValue })}
                style={styles.input}
            >
                <Picker.Item label="Domingo" value={0} />
                <Picker.Item label="Segunda-feira" value={1} />
                <Picker.Item label="Terça-feira" value={2} />
                <Picker.Item label="Quarta-feira" value={3} />
                <Picker.Item label="Quinta-feira" value={4} />
                <Picker.Item label="Sexta-feira" value={5} />
                <Picker.Item label="Sábado" value={6} />
            </Picker>

            <Text style={styles.label}>Profissional:</Text>
            <Picker
                selectedValue={form.id_usuario}
                onValueChange={(itemValue) => setForm({ ...form, id_usuario: itemValue })}
                style={styles.input}
            >
                <Picker.Item label="Selecione um profissional" value="" />
                {users.map((cliente) => (
                    <Picker.Item
                        key={cliente.id_usuario}
                        label={cliente.nome_usuario}
                        value={cliente.id_usuario}
                    />
                ))}
            </Picker>


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

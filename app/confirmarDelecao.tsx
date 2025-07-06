import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConfirmarDelecao() {
    const router = useRouter();
    const { id, nome } = useLocalSearchParams<{ id: string; nome: string }>();

    const handleDelete = () => {
        fetch(`http://localhost/agendamentos/deletar-usuario/${id}`, {
            method: 'get',
        })
            .then((response) => {
                if (response.ok) {
                    Alert.alert('Sucesso', 'Usuário deletado com sucesso!');
                    router.replace('/usuarios');
                } else {
                    Alert.alert('Erro', 'Falha ao deletar o usuário.');
                }
            })
            .catch(() => {
                Alert.alert('Erro', 'Erro ao conectar com o servidor.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deseja deletar o usuário:</Text>
            <Text style={styles.nome}>{nome}</Text>

            <View style={styles.buttonGroup}>
                <Button title="Sim" onPress={handleDelete} color="red" />
                <Button title="Não" onPress={() => router.back()} color="gray" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 20, marginBottom: 10 },
    nome: { fontSize: 18, fontWeight: 'bold', marginBottom: 30 },
    buttonGroup: { gap: 15 },
});

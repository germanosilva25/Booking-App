import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { Usuarios } from '@/constants/usuario';
import { Servicos } from '@/constants/servicos';

export default function FormularioAgendamento() {
    const [dataAgendamento, setDataAgendamento] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [corteSelecionado, setCorteSelecionado] = useState('');

    const mostrarDatePicker = () => setDatePickerVisibility(true);
    const esconderDatePicker = () => setDatePickerVisibility(false);

    const confirmarData = (date) => {
        setDataAgendamento(date);
        esconderDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Data do Agendamento:</Text>
            <Button title="Selecionar Data" onPress={mostrarDatePicker} />
            <Text style={styles.dateText}>{dataAgendamento.toLocaleDateString()}</Text>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarData}
                onCancel={esconderDatePicker}
            />

            <Text style={styles.label}>Cliente:</Text>
            <Picker
                selectedValue={clienteSelecionado}
                onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
            >
                <Picker.Item label="Selecione um cliente" value="" />
                {Usuarios().map((cliente) => (
                    <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Corte:</Text>
            <Picker
                selectedValue={corteSelecionado}
                onValueChange={(itemValue) => setCorteSelecionado(itemValue)}
            >
                {Servicos().map((servico) => (
                    <Picker.Item key={servico.id_servico} label={servico.nome_servico} value={servico.id_servico} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 40,
    },
    label: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    dateText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
    },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../src/services/api';

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        loadPedidos();
    }, []);

    async function loadPedidos() {
    // MOCK: Dados falsos de pedidos
    setPedidos([
      { id: 101, situacao: 'AGUARDANDO_PRODUCAO' },
      { id: 102, situacao: 'EM_PRODUCAO' },
      { id: 103, situacao: 'FINALIZADO' },
    ] as any);
  }

  async function handleCancelar(id: number) {
    // MOCK: Apenas exibe o alerta
    Alert.alert('Sucesso', `Pedido #${id} cancelado visualmente.`);
  }

    return (
        <View style={styles.container}>
            <FlatList
                data={pedidos}
                keyExtractor={(item: any) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>Pedido #{item.id}</Text>
                        <Text style={styles.status}>Status: {item.situacao}</Text>

                        {item.situacao !== 'CANCELADO' && (
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={() => handleCancelar(item.id)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
    card: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 8, elevation: 2 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    status: { marginBottom: 10, color: '#555' },
    buttonCancel: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
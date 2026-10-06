import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type CorDisponivel = {
    nome: string;
    codigo: string;
};

type Camiseta = {
    id: number;
    nome: string;
    descricao: string;
    tamanhos: string[];
    cores: CorDisponivel[];
};

const camisetasMock: Camiseta[] = [
    {
        id: 1,
        nome: 'Camiseta Básica Algodão',
        descricao: 'Algodão confortável para todo dia',
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: [
            { nome: 'Preto', codigo: '#252A27' },
            { nome: 'Branco', codigo: '#F8F9F6' },
            { nome: 'Cinza', codigo: '#A5AAA5' },
            { nome: 'Verde oliva', codigo: '#667457' },
        ],
    },
    {
        id: 2,
        nome: 'Camiseta DryFit',
        descricao: 'Leveza para acompanhar o treino',
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: [
            { nome: 'Branco', codigo: '#F8F9F6' },
            { nome: 'Preto', codigo: '#252A27' },
            { nome: 'Azul-marinho', codigo: '#34485A' },
        ],
    },
    {
        id: 3,
        nome: 'Moletom Canguru',
        descricao: 'Camada extra para antes e depois',
        tamanhos: ['P', 'M', 'G', 'GG'],
        cores: [
            { nome: 'Cinza mescla', codigo: '#A5AAA5' },
            { nome: 'Preto', codigo: '#252A27' },
            { nome: 'Verde musgo', codigo: '#59664C' },
        ],
    },
];

function CartaoCamiseta({ camiseta }: { camiseta: Camiseta }) {
    const [tamanho, setTamanho] = useState('M');
    const [cor, setCor] = useState(camiseta.cores[0]);
    const [menuAberto, setMenuAberto] = useState<'tamanho' | 'cor' | null>(null);
    const [selecaoConfirmada, setSelecaoConfirmada] = useState(false);
    const corClara = cor.codigo === '#F8F9F6';

    function iniciarPersonalizacao() {
        setSelecaoConfirmada(true);
    }

    return (
        <View style={styles.card}>
            <View style={styles.productRow}>
                <View style={[styles.productPreview, { backgroundColor: corClara ? '#ECEFEC' : cor.codigo }]}>
                    <MaterialCommunityIcons
                        name="tshirt-crew"
                        size={62}
                        color={corClara ? '#9BA49D' : '#F8F9F6'}
                    />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productIndex}>MODELO {String(camiseta.id).padStart(2, '0')}</Text>
                    <Text style={styles.productName}>{camiseta.nome}</Text>
                    <Text style={styles.productDescription}>{camiseta.descricao}</Text>
                </View>
            </View>

            <View style={styles.selectorsRow}>
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar tamanho. Atual: ${tamanho}`}
                    accessibilityState={{ expanded: menuAberto === 'tamanho' }}
                    style={styles.selector}
                    onPress={() => setMenuAberto(menuAberto === 'tamanho' ? null : 'tamanho')}
                >
                    <View style={styles.selectorTextGroup}>
                        <Text style={styles.selectorLabel}>TAMANHO</Text>
                        <Text style={styles.selectorValue}>{tamanho}</Text>
                    </View>
                    <Feather name={menuAberto === 'tamanho' ? 'chevron-up' : 'chevron-down'} size={17} color="#465149" />
                </TouchableOpacity>

                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar cor. Atual: ${cor.nome}`}
                    accessibilityState={{ expanded: menuAberto === 'cor' }}
                    style={styles.selector}
                    onPress={() => setMenuAberto(menuAberto === 'cor' ? null : 'cor')}
                >
                    <View style={styles.selectorTextGroup}>
                        <Text style={styles.selectorLabel}>COR</Text>
                        <View style={styles.colorValueRow}>
                            <View style={[styles.colorDot, { backgroundColor: cor.codigo }]} />
                            <Text style={styles.selectorValue}>{cor.nome}</Text>
                        </View>
                    </View>
                    <Feather name={menuAberto === 'cor' ? 'chevron-up' : 'chevron-down'} size={17} color="#465149" />
                </TouchableOpacity>
            </View>

            {menuAberto === 'tamanho' && (
                <View style={styles.optionsPanel}>
                    {camiseta.tamanhos.map((opcao) => {
                        const selecionado = opcao === tamanho;
                        return (
                            <TouchableOpacity
                                key={opcao}
                                accessibilityRole="button"
                                accessibilityState={{ selected: selecionado }}
                                style={[styles.sizeOption, selecionado && styles.selectedOption]}
                                onPress={() => {
                                    setTamanho(opcao);
                                    setMenuAberto(null);
                                    setSelecaoConfirmada(false);
                                }}
                            >
                                <Text style={[styles.sizeOptionText, selecionado && styles.selectedOptionText]}>{opcao}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            {menuAberto === 'cor' && (
                <View style={styles.optionsPanel}>
                    {camiseta.cores.map((opcao) => {
                        const selecionado = opcao.nome === cor.nome;
                        return (
                            <TouchableOpacity
                                key={opcao.nome}
                                accessibilityRole="button"
                                accessibilityLabel={opcao.nome}
                                accessibilityState={{ selected: selecionado }}
                                style={[styles.colorOption, selecionado && styles.selectedColorOption]}
                                onPress={() => {
                                    setCor(opcao);
                                    setMenuAberto(null);
                                    setSelecaoConfirmada(false);
                                }}
                            >
                                <View style={[styles.colorDot, { backgroundColor: opcao.codigo }]} />
                                <Text style={styles.colorOptionText}>{opcao.nome}</Text>
                                {selecionado && <Feather name="check" size={14} color="#324B32" />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            <TouchableOpacity accessibilityRole="button" style={styles.button} onPress={iniciarPersonalizacao}>
                <Text style={styles.buttonText}>Personalizar essa peça</Text>
                <Feather name="arrow-right" size={17} color="#FFFFFF" />
            </TouchableOpacity>
            {selecaoConfirmada && (
                <View style={styles.selectionConfirmation}>
                    <Feather name="check-circle" size={15} color="#456B43" />
                    <Text style={styles.selectionConfirmationText}>Seleção pronta: {cor.nome} · {tamanho}</Text>
                </View>
            )}
        </View>
    );
}

export default function Catalogo() {
    return (
        <FlatList
            style={styles.list}
            contentContainerStyle={styles.content}
            data={camisetasMock}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <CartaoCamiseta camiseta={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={(
                <View style={styles.header}>
                    <Text style={styles.eyebrow}>POIESIS / CATÁLOGO</Text>
                    <Text style={styles.title}>Sua base.{ '\n' }Sua identidade.</Text>
                    <View style={styles.headerFooter}>
                        <Text style={styles.subtitle}>Escolha o modelo, o tamanho e a cor.</Text>
                        <Text style={styles.modelCount}>03 MODELOS</Text>
                    </View>
                </View>
            )}
            ListFooterComponent={<Text style={styles.footer}>CORES E TAMANHOS DISPONÍVEIS POR MODELO</Text>}
        />
    );
}

const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: '#F3F5F2' },
    content: { width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 34 },
    header: { paddingBottom: 21 },
    eyebrow: { color: '#59635B', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
    title: { color: '#202522', fontSize: 34, lineHeight: 37, fontWeight: '900', marginTop: 20 },
    headerFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 10 },
    subtitle: { flex: 1, color: '#667068', fontSize: 12, lineHeight: 18 },
    modelCount: { color: '#89918A', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
    card: { padding: 14, borderWidth: 1, borderColor: '#E2E6E1', borderRadius: 7, backgroundColor: '#FFFFFF' },
    productRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 14 },
    productPreview: { width: 82, height: 82, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    productInfo: { flex: 1 },
    productIndex: { color: '#89918A', fontSize: 9, fontWeight: '800', letterSpacing: 0.9 },
    productName: { color: '#202522', fontSize: 15, lineHeight: 19, fontWeight: '800', marginTop: 4 },
    productDescription: { color: '#667068', fontSize: 11, lineHeight: 16, marginTop: 4 },
    selectorsRow: { flexDirection: 'row', gap: 8 },
    selector: { minHeight: 54, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 11, borderWidth: 1, borderColor: '#DDE2DC', borderRadius: 4, backgroundColor: '#FBFCFA' },
    selectorTextGroup: { flex: 1 },
    selectorLabel: { color: '#89918A', fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
    selectorValue: { color: '#202522', fontSize: 12, fontWeight: '700', marginTop: 3 },
    colorValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    colorDot: { width: 13, height: 13, borderRadius: 7, borderWidth: 1, borderColor: '#D3D8D2' },
    optionsPanel: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, padding: 10, marginTop: 8, borderWidth: 1, borderColor: '#E2E6E1', borderRadius: 4, backgroundColor: '#F8F9F6' },
    sizeOption: { width: 39, height: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DDE2DC', borderRadius: 4, backgroundColor: '#FFFFFF' },
    selectedOption: { borderColor: '#324B32', backgroundColor: '#324B32' },
    sizeOptionText: { color: '#465149', fontSize: 12, fontWeight: '700' },
    selectedOptionText: { color: '#FFFFFF' },
    colorOption: { minHeight: 34, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 8, borderWidth: 1, borderColor: '#E2E6E1', borderRadius: 4, backgroundColor: '#FFFFFF' },
    selectedColorOption: { borderColor: '#8EA386' },
    colorOptionText: { color: '#465149', fontSize: 11, fontWeight: '600' },
    button: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, marginTop: 12, borderRadius: 4, backgroundColor: '#202522' },
    buttonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
    selectionConfirmation: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 11 },
    selectionConfirmationText: { color: '#456B43', fontSize: 11, fontWeight: '700' },
    separator: { height: 12 },
    footer: { color: '#89918A', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, textAlign: 'center', marginTop: 19, paddingHorizontal: 12 },
});
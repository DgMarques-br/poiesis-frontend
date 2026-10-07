import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type SituacaoPedido = 'AGUARDANDO_PRODUCAO' | 'EM_PRODUCAO' | 'FINALIZADO' | 'CANCELADO';

type Pedido = {
    id: number;
    camisetaNome: string;
    cor: string;
    corHex: string;
    tamanho: string;
    situacao: SituacaoPedido;
    criadoEm: string;
};

const pedidosMock: Pedido[] = [
    {
        id: 101,
        camisetaNome: 'Camiseta Essencial',
        cor: 'Preto',
        corHex: '#252A27',
        tamanho: 'M',
        situacao: 'AGUARDANDO_PRODUCAO',
        criadoEm: '06 OUT 2026',
    },
    {
        id: 102,
        camisetaNome: 'Camiseta DryFit',
        cor: 'Branco',
        corHex: '#F8F9F6',
        tamanho: 'G',
        situacao: 'EM_PRODUCAO',
        criadoEm: '04 OUT 2026',
    },
    {
        id: 103,
        camisetaNome: 'Moletom Canguru',
        cor: 'Cinza mescla',
        corHex: '#A5AAA5',
        tamanho: 'GG',
        situacao: 'FINALIZADO',
        criadoEm: '29 SET 2026',
    },
];

const apresentacaoStatus: Record<SituacaoPedido, { label: string; cor: string; fundo: string; etapa: number }> = {
    AGUARDANDO_PRODUCAO: { label: 'Aguardando produção', cor: '#795B27', fundo: '#F5ECD8', etapa: 0 },
    EM_PRODUCAO: { label: 'Em produção', cor: '#456B43', fundo: '#E5EDE1', etapa: 1 },
    FINALIZADO: { label: 'Finalizado', cor: '#465149', fundo: '#E9ECE8', etapa: 2 },
    CANCELADO: { label: 'Cancelado', cor: '#8A4841', fundo: '#F4E7E4', etapa: -1 },
};

const etapas = ['Recebido', 'Em produção', 'Finalizado'];

function CartaoPedido({ pedido, aoCancelar }: { pedido: Pedido; aoCancelar: (id: number) => void }) {
    const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);
    const status = apresentacaoStatus[pedido.situacao];
    const podeCancelar = pedido.situacao === 'AGUARDANDO_PRODUCAO';
    const corClara = pedido.corHex === '#F8F9F6';

    return (
        <View style={styles.card}>
            <View style={styles.cardTopline}>
                <View>
                    <Text style={styles.orderEyebrow}>PEDIDO Nº {pedido.id}</Text>
                    <Text style={styles.orderDate}>{pedido.criadoEm}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status.fundo }]}>
                    <View style={[styles.statusDot, { backgroundColor: status.cor }]} />
                    <Text style={[styles.statusText, { color: status.cor }]}>{status.label}</Text>
                </View>
            </View>

            <View style={styles.productRow}>
                <View style={[styles.productPreview, { backgroundColor: corClara ? '#ECEFEC' : pedido.corHex }]}>
                    <MaterialCommunityIcons
                        name="tshirt-crew"
                        size={44}
                        color={corClara ? '#9BA49D' : '#F8F9F6'}
                    />
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{pedido.camisetaNome}</Text>
                    <Text style={styles.productDetails}>{pedido.cor} <Text style={styles.detailDot}>·</Text> Tam. {pedido.tamanho}</Text>
                </View>
                <Feather name="arrow-up-right" size={17} color="#89918A" />
            </View>

            {pedido.situacao === 'CANCELADO' ? (
                <View style={styles.cancelledNote}>
                    <Feather name="x-circle" size={15} color={status.cor} />
                    <Text style={[styles.cancelledText, { color: status.cor }]}>Este pedido foi cancelado.</Text>
                </View>
            ) : (
                <View style={styles.timeline}>
                    <View style={styles.timelineTrack}>
                        <View style={[styles.timelineProgress, { width: `${(status.etapa / 2) * 100}%` }]} />
                    </View>
                    {etapas.map((etapa, index) => {
                        const concluida = index < status.etapa;
                        const atual = index === status.etapa;
                        return (
                            <View key={etapa} style={styles.timelineStep}>
                                <View style={[styles.timelineNode, (concluida || atual) && styles.timelineNodeActive]}>
                                    {concluida ? (
                                        <Feather name="check" size={11} color="#FFFFFF" />
                                    ) : (
                                        <Text style={[styles.timelineNumber, atual && styles.timelineNumberActive]}>{index + 1}</Text>
                                    )}
                                </View>
                                <Text style={[styles.timelineLabel, atual && styles.timelineLabelActive]}>{etapa}</Text>
                            </View>
                        );
                    })}
                </View>
            )}

            {podeCancelar && !confirmandoCancelamento && (
                <Pressable
                    accessibilityRole="button"
                    style={styles.cancelButton}
                    onPress={() => setConfirmandoCancelamento(true)}
                >
                    <Feather name="x" size={15} color="#8A4841" />
                    <Text style={styles.cancelButtonText}>Cancelar pedido</Text>
                </Pressable>
            )}

            {confirmandoCancelamento && (
                <View style={styles.confirmationPanel}>
                    <Text style={styles.confirmationText}>Cancelar este pedido de demonstração?</Text>
                    <View style={styles.confirmationActions}>
                        <Pressable
                            accessibilityRole="button"
                            style={styles.keepButton}
                            onPress={() => setConfirmandoCancelamento(false)}
                        >
                            <Text style={styles.keepButtonText}>Manter pedido</Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            style={styles.confirmCancelButton}
                            onPress={() => {
                                setConfirmandoCancelamento(false);
                                aoCancelar(pedido.id);
                            }}
                        >
                            <Text style={styles.confirmCancelText}>Confirmar cancelamento</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

export default function Pedidos() {
    const [pedidos, setPedidos] = useState(pedidosMock);
    const emAndamento = pedidos.filter((pedido) =>
        pedido.situacao === 'AGUARDANDO_PRODUCAO' || pedido.situacao === 'EM_PRODUCAO',
    ).length;
    const finalizados = pedidos.filter((pedido) => pedido.situacao === 'FINALIZADO').length;

    function cancelarPedido(id: number) {
        setPedidos((atuais) => atuais.map((pedido) =>
            pedido.id === id ? { ...pedido, situacao: 'CANCELADO' } : pedido,
        ));
    }

    return (
        <FlatList
            style={styles.list}
            contentContainerStyle={styles.content}
            data={pedidos}
            keyExtractor={(pedido) => String(pedido.id)}
            renderItem={({ item }) => <CartaoPedido pedido={item} aoCancelar={cancelarPedido} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={(
                <View style={styles.header}>
                    <View style={styles.headerTopline}>
                        <Text style={styles.eyebrow}>POIESIS / ACOMPANHAMENTO</Text>
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{String(pedidos.length).padStart(2, '0')} PEDIDOS</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Acompanhe seus pedidos.</Text>
                    <Text style={styles.subtitle}>Cada etapa da sua peça, do pedido à finalização.</Text>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{String(emAndamento).padStart(2, '0')}</Text>
                            <Text style={styles.summaryLabel}>EM ANDAMENTO</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>{String(finalizados).padStart(2, '0')}</Text>
                            <Text style={styles.summaryLabel}>FINALIZADOS</Text>
                        </View>
                        <Feather name="activity" size={19} color="#718264" />
                    </View>
                    <Text style={styles.sectionTitle}>Seus pedidos</Text>
                </View>
            )}
            ListEmptyComponent={(
                <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="tshirt-crew-outline" size={36} color="#89918A" />
                    <Text style={styles.emptyTitle}>Nenhum pedido por aqui</Text>
                    <Text style={styles.emptyText}>Quando fizer um pedido, o acompanhamento aparece nesta tela.</Text>
                </View>
            )}
            ListFooterComponent={<Text style={styles.footer}>STATUS DE DEMONSTRAÇÃO · ATUALIZAÇÕES REAIS VIRÃO DO BACKEND</Text>}
        />
    );
}

const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: '#F3F5F2' },
    content: { width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 34 },
    header: { paddingBottom: 20 },
    headerTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    eyebrow: { color: '#59635B', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    countBadge: { backgroundColor: '#DDE8D8', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 4 },
    countText: { color: '#324B32', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
    title: { color: '#202522', fontSize: 30, lineHeight: 35, fontWeight: '900', marginTop: 22, maxWidth: 360 },
    subtitle: { color: '#667068', fontSize: 13, lineHeight: 19, marginTop: 7 },
    summaryRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 15, marginTop: 21, backgroundColor: '#E9EDE7', borderRadius: 5 },
    summaryItem: { minWidth: 82 },
    summaryNumber: { color: '#202522', fontSize: 19, lineHeight: 23, fontWeight: '900' },
    summaryLabel: { color: '#667068', fontSize: 8, fontWeight: '800', letterSpacing: 0.6, marginTop: 2 },
    summaryDivider: { width: 1, height: 31, backgroundColor: '#CDD5CB' },
    sectionTitle: { color: '#202522', fontSize: 17, fontWeight: '800', marginTop: 25 },
    card: { padding: 15, borderWidth: 1, borderColor: '#E2E6E1', borderRadius: 7, backgroundColor: '#FFFFFF' },
    cardTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    orderEyebrow: { color: '#202522', fontSize: 11, fontWeight: '900', letterSpacing: 0.6 },
    orderDate: { color: '#89918A', fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 4 },
    statusBadge: { minHeight: 27, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, borderRadius: 4 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 9, fontWeight: '800' },
    productRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 14, marginTop: 12, borderTopWidth: 1, borderTopColor: '#EEF0ED', borderBottomWidth: 1, borderBottomColor: '#EEF0ED' },
    productPreview: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
    productInfo: { flex: 1 },
    productName: { color: '#202522', fontSize: 14, fontWeight: '800' },
    productDetails: { color: '#667068', fontSize: 11, marginTop: 5 },
    detailDot: { color: '#89918A', fontWeight: '800' },
    timeline: { position: 'relative', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 3 },
    timelineTrack: { position: 'absolute', top: 27, left: '16%', right: '16%', height: 2, backgroundColor: '#E2E6E1' },
    timelineProgress: { height: 2, backgroundColor: '#718264' },
    timelineStep: { width: '33.33%', alignItems: 'center', gap: 7 },
    timelineNode: { width: 23, height: 23, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CCD3CA', borderRadius: 12, backgroundColor: '#FFFFFF' },
    timelineNodeActive: { borderColor: '#718264', backgroundColor: '#718264' },
    timelineNumber: { color: '#89918A', fontSize: 9, fontWeight: '800' },
    timelineNumberActive: { color: '#FFFFFF' },
    timelineLabel: { color: '#89918A', fontSize: 8, fontWeight: '700', textAlign: 'center' },
    timelineLabelActive: { color: '#465149' },
    cancelButton: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, borderWidth: 1, borderColor: '#E8D6D2', borderRadius: 4 },
    cancelButtonText: { color: '#8A4841', fontSize: 11, fontWeight: '800' },
    confirmationPanel: { padding: 11, marginTop: 10, borderWidth: 1, borderColor: '#E8D6D2', borderRadius: 4, backgroundColor: '#FBF7F6' },
    confirmationText: { color: '#5F3935', fontSize: 11, fontWeight: '700' },
    confirmationActions: { flexDirection: 'row', gap: 8, marginTop: 10 },
    keepButton: { minHeight: 36, flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D9DEDA', borderRadius: 4, backgroundColor: '#FFFFFF' },
    keepButtonText: { color: '#465149', fontSize: 10, fontWeight: '800' },
    confirmCancelButton: { minHeight: 36, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 4, backgroundColor: '#8A4841' },
    confirmCancelText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
    cancelledNote: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingTop: 15 },
    cancelledText: { fontSize: 11, fontWeight: '700' },
    separator: { height: 12 },
    emptyState: { alignItems: 'center', paddingHorizontal: 25, paddingVertical: 40, borderWidth: 1, borderColor: '#E2E6E1', borderRadius: 6, backgroundColor: '#FFFFFF' },
    emptyTitle: { color: '#202522', fontSize: 15, fontWeight: '800', marginTop: 12 },
    emptyText: { color: '#667068', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6 },
    footer: { color: '#89918A', fontSize: 8, lineHeight: 14, fontWeight: '700', letterSpacing: 0.5, textAlign: 'center', marginTop: 21, paddingHorizontal: 10 },
});
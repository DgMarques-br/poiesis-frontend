import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type Customizacao = {
  id: number;
  camisetaId: number;
  camisetaNome: string;
  cor: string;
  corHex: string;
  tamanho: string;
  texto: string;
  posicaoArte: 'FRENTE' | 'COSTAS';
};

const customizacoesMock: Customizacao[] = [
  {
    id: 1,
    camisetaId: 1,
    camisetaNome: 'Camiseta essencial',
    cor: 'Preto',
    corHex: '#202522',
    tamanho: 'M',
    texto: 'POIESIS',
    posicaoArte: 'FRENTE',
  },
  {
    id: 2,
    camisetaId: 3,
    camisetaNome: 'Moletom de treino',
    cor: 'Cinza mescla',
    corHex: '#A5AAA5',
    tamanho: 'GG',
    texto: 'Sem texto',
    posicaoArte: 'COSTAS',
  },
];

function CustomizacaoCard({ item }: { item: Customizacao }) {
  function avisarAcao(acao: string) {
    Alert.alert('Modo demonstração', `${acao} da peça #${item.id} estará disponível com o backend.`);
  }

  return (
    <View style={styles.card}>
      <View style={[styles.preview, { backgroundColor: item.corHex }]}>
        <View style={styles.previewTopline}>
          <Text style={styles.previewLabel}>POIESIS / LAB</Text>
          <Feather name="arrow-up-right" size={18} color="#F6F7F4" />
        </View>
        <MaterialCommunityIcons name="tshirt-crew" size={112} color="#F6F7F4" />
        <View style={styles.previewStamp}>
          <Text style={styles.previewStampText}>{item.texto === 'Sem texto' ? 'CUSTOM' : item.texto}</Text>
        </View>
        <View style={styles.previewFooter}>
          <Text style={styles.previewFooterText}>{item.posicaoArte} / {item.cor.toUpperCase()}</Text>
          <Text style={styles.previewFooterText}>Nº {String(item.id).padStart(2, '0')}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardHeading}>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.itemEyebrow}>MODELO {String(item.camisetaId).padStart(2, '0')}</Text>
            <Text style={styles.itemName}>{item.camisetaNome}</Text>
          </View>
          <View style={styles.sizeBadge}><Text style={styles.sizeText}>{item.tamanho}</Text></View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.colorSwatch}>
            <View style={[styles.colorDot, { backgroundColor: item.corHex }]} />
            <Text style={styles.detailText}>{item.cor}</Text>
          </View>
          <View style={styles.detailDivider} />
          <Text style={styles.detailText}>{item.posicaoArte === 'FRENTE' ? 'Estampa frontal' : 'Estampa nas costas'}</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.editButton}
            onPress={() => avisarAcao('A edição')}
          >
            <Feather name="edit-3" size={16} color="#202522" />
            <Text style={styles.editButtonText}>Editar peça</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.orderButton}
            onPress={() => avisarAcao('O pedido')}
          >
            <Text style={styles.orderButtonText}>Pedir peça</Text>
            <Feather name="arrow-right" size={16} color="#172018" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Customizacoes() {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={customizacoesMock}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={(
        <View style={styles.header}>
          <View style={styles.headerTopline}>
            <Text style={styles.kicker}>POIESIS / SEU ESPAÇO</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{String(customizacoesMock.length).padStart(2, '0')} PEÇAS</Text>
            </View>
          </View>
          <Text style={styles.title}>Feitas para{ '\n' }entrar em jogo.</Text>
          <Text style={styles.subtitle}>Suas ideias, no seu ritmo. Ajuste os detalhes ou avance para o pedido.</Text>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Suas criações</Text>
            <Text style={styles.sectionHint}>MADE BY YOU</Text>
          </View>
        </View>
      )}
      renderItem={({ item }) => <CustomizacaoCard item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={<Text style={styles.footerNote}>PRÉVIA DE DEMONSTRAÇÃO · SEUS DADOS FICAM PRONTOS PARA A API</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#F3F5F2' },
  content: { width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 34 },
  header: { paddingBottom: 22 },
  headerTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  kicker: { color: '#59635B', fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  countBadge: { backgroundColor: '#DDE8D8', paddingHorizontal: 11, paddingVertical: 7, borderRadius: 4 },
  countText: { color: '#324B32', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  title: { color: '#202522', fontSize: 34, lineHeight: 37, fontWeight: '900' },
  subtitle: { color: '#667068', fontSize: 14, lineHeight: 21, marginTop: 11, maxWidth: 330 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 },
  sectionTitle: { color: '#202522', fontSize: 18, fontWeight: '800' },
  sectionHint: { color: '#89918A', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  card: { overflow: 'hidden', borderRadius: 7, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E6E1' },
  preview: { height: 218, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  previewTopline: { position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewLabel: { color: '#F6F7F4', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  previewStamp: { position: 'absolute', top: '47%', left: '50%', transform: [{ translateX: -36 }], backgroundColor: '#D7F36A', minWidth: 72, paddingHorizontal: 7, paddingVertical: 5, alignItems: 'center' },
  previewStampText: { color: '#202522', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  previewFooter: { position: 'absolute', bottom: 15, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  previewFooterText: { color: '#F6F7F4', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  cardBody: { padding: 16 },
  cardHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitleWrap: { flex: 1, paddingRight: 10 },
  itemEyebrow: { color: '#89918A', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  itemName: { color: '#202522', fontSize: 17, fontWeight: '800', marginTop: 4 },
  sizeBadge: { width: 38, height: 38, borderWidth: 1, borderColor: '#DDE2DC', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  sizeText: { color: '#202522', fontSize: 13, fontWeight: '800' },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 16 },
  colorSwatch: { flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 13, height: 13, borderRadius: 7, borderWidth: 1, borderColor: '#D3D8D2', marginRight: 7 },
  detailText: { color: '#667068', fontSize: 12, fontWeight: '600' },
  detailDivider: { height: 14, width: 1, backgroundColor: '#DDE2DC', marginHorizontal: 12 },
  actionsRow: { flexDirection: 'row', gap: 9 },
  editButton: { minHeight: 44, flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DDE2DC', borderRadius: 4 },
  editButtonText: { color: '#202522', fontSize: 12, fontWeight: '800' },
  orderButton: { minHeight: 44, flex: 1.15, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D7F36A', borderRadius: 4 },
  orderButtonText: { color: '#202522', fontSize: 12, fontWeight: '900' },
  separator: { height: 14 },
  footerNote: { color: '#89918A', fontSize: 9, lineHeight: 14, fontWeight: '700', letterSpacing: 0.6, textAlign: 'center', marginTop: 23, paddingHorizontal: 15 },
});
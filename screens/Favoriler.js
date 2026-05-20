import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tarifler from '../data/tarifler';

export default function Favoriler({ navigation, favoriIdler = [], toggleFavori }) {
    const favoriTarifler = tarifler.filter((tarif) => favoriIdler.includes(tarif.id));

    const renderFavori = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.kart}
                onPress={() => navigation.navigate('TarifDetay', {
                    isim: item.isim,
                    sure: item.sure,
                    resim: item.resim,
                    malzemeler: item.malzemeler,
                    yapilis: item.yapilis,
                    zorluk: item.zorluk,
                    id: item.id,
                    toggleFavori: toggleFavori,
                    favoriMi: true,
                })}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.resim }} style={styles.kartResim} />
                    <View style={styles.heartContainer}>
                        <Ionicons name="heart" size={16} color="#27AE60" />
                    </View>
                </View>
                <View style={styles.kartFooter}>
                    <Text style={styles.kartBaslik} numberOfLines={2}>{item.isim}</Text>
                    <View style={styles.sureContainer}>
                        <Ionicons name="time-outline" size={12} color="#7F8C8D" />
                        <Text style={styles.kartSure}>{item.sure} dk</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="heart" size={28} color="#27AE60" />
                <Text style={styles.baslik}>Favorilerim</Text>
            </View>

            {favoriTarifler.length === 0 ? (
                <View style={styles.bosAlani}>
                    <Ionicons name="heart-dislike-outline" size={80} color="#BDC3C7" style={{ marginBottom: 20 }} />
                    <Text style={styles.bosMesaj}>Henüz favori yok.</Text>
                    <Text style={styles.bosAciklama}>Tariflerdeki kalp ikonuna tıklayarak buraya tarif ekleyebilirsin.</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriTarifler}
                    renderItem={renderFavori}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9F9', paddingTop: 60 },
    header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    baslik: { fontSize: 24, fontWeight: 'bold', color: '#1A2530', marginLeft: 10 },
    listContainer: { padding: 15, paddingBottom: 150 },
    row: { justifyContent: 'space-between', marginBottom: 15 },
    kart: {
        width: '47%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        padding: 5,
    },
    imageContainer: { position: 'relative' },
    kartResim: { width: '100%', height: 140, borderRadius: 15 },
    heartContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    kartFooter: { padding: 10 },
    kartBaslik: { fontSize: 14, fontWeight: '700', color: '#1A2530', marginBottom: 5 },
    sureContainer: { flexDirection: 'row', alignItems: 'center' },
    kartSure: { fontSize: 12, color: '#7F8C8D', marginLeft: 4, fontWeight: '500' },
    bosAlani: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, marginTop: -50 },
    bosMesaj: { fontSize: 20, fontWeight: 'bold', color: '#1A2530', textAlign: 'center', marginBottom: 10 },
    bosAciklama: { fontSize: 15, color: '#95A5A6', textAlign: 'center', lineHeight: 22 }
});
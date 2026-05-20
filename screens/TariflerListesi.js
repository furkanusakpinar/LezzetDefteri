import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tarifler from '../data/tarifler';

export default function TarifListesi({ navigation, toggleFavori, favoriIdler }) {
    const [aramaMetni, setAramaMetni] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [seciliKategori, setSeciliKategori] = useState('Tümü');
    const kategoriler = ['Tümü', ...new Set(tarifler.map(t => t.kategori).filter(Boolean))];

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    };

    const renderTarif = ({ item }) => {
        const isFavori = favoriIdler.includes(item.id);
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
                    kategori: item.kategori,
                    id: item.id,
                    toggleFavori: toggleFavori,
                    favoriMi: favoriIdler.includes(item.id),
                })}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.resim }} style={styles.kartResim} />

                    <TouchableOpacity
                        style={styles.heartContainer}
                        onPress={() => toggleFavori(item.id)}
                    >
                        <Ionicons name="heart" size={20} color={isFavori ? "#27AE60" : "#1A2530"} />
                    </TouchableOpacity>


                </View>

                <View style={styles.kartFooter}>
                    <View style={styles.headerRow}>
                        <Text style={styles.kartBaslik} numberOfLines={1}>{item.isim}</Text>
                    </View>

                    <View style={styles.sureContainer}>
                        <Ionicons name="time" size={14} color="#7F8C8D" />
                        <Text style={styles.kartSure}>{item.sure} dk</Text>

                        <Ionicons name="restaurant" size={14} color="#7F8C8D" style={{ marginLeft: 15 }} />
                        <Text style={[styles.kartSure, { textTransform: 'capitalize' }]}>{item.zorluk}</Text>

                        {item.kategori && (
                            <>
                                <Ionicons name="folder-outline" size={14} color="#7F8C8D" style={{ marginLeft: 15 }} />
                                <Text style={[styles.kartSure, { textTransform: 'capitalize' }]}>{item.kategori}</Text>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.logoText}>Lezzet Defteri</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#7F8C8D" style={{ marginLeft: 15 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tarif ya da malzeme ara..."
                    placeholderTextColor="#95A5A6"
                    value={aramaMetni}
                    onChangeText={setAramaMetni}
                />
            </View>

            <View style={styles.kategoriContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kategoriScroll}>
                    {kategoriler.map((kat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.kategoriBtn, seciliKategori === kat && styles.kategoriBtnActive]}
                            onPress={() => setSeciliKategori(kat)}
                        >
                            <Text style={[styles.kategoriText, seciliKategori === kat && styles.kategoriTextActive]}>{kat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={tarifler.filter(t => t.isim.toLowerCase().includes(aramaMetni.toLowerCase()) && (seciliKategori === 'Tümü' || t.kategori === seciliKategori))}
                renderItem={renderTarif}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#27AE60" colors={['#27AE60']} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9F9', paddingTop: 60 },
    topBar: { alignItems: 'center', marginBottom: 20 },
    logoText: { fontSize: 24, fontWeight: '800', color: '#1A2530' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F4F4', marginHorizontal: 20, borderRadius: 25, height: 50, marginBottom: 20 },
    searchInput: { flex: 1, height: '100%', paddingHorizontal: 10, fontSize: 15, color: '#1A2530' },
    kart: { backgroundColor: '#FFFFFF', borderRadius: 25, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 },
    imageContainer: { position: 'relative', width: '100%', height: 200 },
    kartResim: { width: '100%', height: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
    heartContainer: { position: 'absolute', top: 15, right: 15, backgroundColor: '#F8F9F9', borderRadius: 20, padding: 8 },
    ratingBadge: { position: 'absolute', bottom: 15, left: 15, backgroundColor: 'rgba(26, 37, 48, 0.7)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    ratingText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
    kartFooter: { padding: 20 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    kartBaslik: { fontSize: 18, fontWeight: 'bold', color: '#1A2530', flex: 1, paddingRight: 10 },
    priceText: { fontSize: 16, fontWeight: 'bold', color: '#34D399' },
    sureContainer: { flexDirection: 'row', alignItems: 'center' },
    kartSure: { fontSize: 14, color: '#7F8C8D', marginLeft: 6, fontWeight: '500' },
    kategoriContainer: { marginBottom: 20 },
    kategoriScroll: { paddingHorizontal: 20 },
    kategoriBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F4F4', marginRight: 10 },
    kategoriBtnActive: { backgroundColor: '#27AE60' },
    kategoriText: { color: '#7F8C8D', fontWeight: '600', fontSize: 14 },
    kategoriTextActive: { color: '#FFFFFF' }
});
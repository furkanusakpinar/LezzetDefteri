import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TarifDetay({ route, navigation, toggleFavori, favoriIdler = [] }) {
    const { isim, sure, resim, malzemeler, yapilis, id, zorluk, kategori } = route.params;
    const isFavori = favoriIdler.includes(id);

    const [checkedIngredients, setCheckedIngredients] = useState([]);

    const toggleIngredient = (index) => {
        if (checkedIngredients.includes(index)) {
            setCheckedIngredients(checkedIngredients.filter(i => i !== index));
        } else {
            setCheckedIngredients([...checkedIngredients, index]);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                <View style={styles.imageHeader}>
                    <Image source={{ uri: resim }} style={styles.resim} />
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.heartBtn}
                        onPress={() => {
                            if (toggleFavori) {
                                toggleFavori(id);
                            }
                        }}
                    >
                        <Ionicons name="heart" size={24} color={isFavori ? "#27AE60" : "#FFFFFF"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.detayContainer}>

                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <Text style={styles.baslik}>{isim}</Text>
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>{kategori || 'Tarif'}</Text>
                        </View>
                    </View>

                    <Text style={styles.yapilisKisa} numberOfLines={3}>{yapilis}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Ionicons name="time" size={24} color="#27AE60" />
                            <Text style={styles.infoVal}>{sure} dk</Text>
                            <Text style={styles.infoLabel}>SÜRE</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Ionicons name="flame" size={24} color="#27AE60" />
                            <Text style={styles.infoVal}>450 kcal</Text>
                            <Text style={styles.infoLabel}>KALORİ</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Ionicons name="bar-chart" size={24} color="#27AE60" />
                            <Text style={[styles.infoVal, { textTransform: 'capitalize' }]}>{zorluk}</Text>
                            <Text style={styles.infoLabel}>ZORLUK</Text>
                        </View>
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Malzemeler</Text>
                        <Text style={styles.itemCount}>{malzemeler.length} ürün</Text>
                    </View>

                    {malzemeler.map((malzeme, index) => {
                        const isChecked = checkedIngredients.includes(index);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.malzemeBox, isChecked && { backgroundColor: '#F0FBF5' }]}
                                onPress={() => toggleIngredient(index)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.rowCenter}>
                                    <Ionicons name={isChecked ? "checkmark-circle" : "ellipse-outline"} size={22} color={isChecked ? "#27AE60" : "#BDC3C7"} style={{ marginRight: 15 }} />
                                    <Text style={[styles.malzemeText, isChecked && { color: '#95A5A6', textDecorationLine: 'line-through' }]}>{malzeme}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                        <Text style={styles.sectionTitle}>Şefin Önerisi</Text>
                    </View>
                    <View style={styles.tipBox}>
                        <Text style={styles.tipText}>"{yapilis}"</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#F8F9F9' },
    scrollArea: { flex: 1 },
    imageHeader: { width: '100%', height: 320, position: 'relative' },
    resim: { width: '100%', height: '100%', resizeMode: 'cover' },
    backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.4)', padding: 10, borderRadius: 20 },
    heartBtn: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(0,0,0,0.4)', padding: 10, borderRadius: 20 },
    detayContainer: { flex: 1, marginTop: -30, backgroundColor: '#F8F9F9', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingTop: 30, minHeight: 600 },
    badgeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    badgeText: { backgroundColor: '#E8F8F5', color: '#27AE60', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, overflow: 'hidden' },
    ratingText: { fontSize: 13, fontWeight: 'bold', color: '#2C3E50', marginLeft: 4 },
    baslik: { fontSize: 26, fontWeight: 'bold', color: '#1A2530', marginBottom: 10 },
    yapilisKisa: { fontSize: 15, color: '#7F8C8D', lineHeight: 22, paddingBottom: 20 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    infoBox: { backgroundColor: '#FFFFFF', width: '31%', paddingVertical: 18, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
    infoVal: { fontSize: 15, fontWeight: 'bold', color: '#1A2530', marginTop: 10 },
    infoLabel: { fontSize: 10, color: '#95A5A6', marginTop: 3, fontWeight: '700' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A2530' },
    itemCount: { fontSize: 13, color: '#95A5A6' },
    malzemeBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 18, borderRadius: 20, marginBottom: 10 },
    rowCenter: { flexDirection: 'row', alignItems: 'center' },
    malzemeText: { fontSize: 15, fontWeight: '600', color: '#1A2530' },
    amountText: { fontSize: 14, color: '#95A5A6', fontWeight: '500' },
    tipBox: { backgroundColor: '#E8F8F5', padding: 20, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: '#27AE60', marginBottom: 20 },
    tipText: { fontSize: 15, color: '#2C3E50', fontStyle: 'italic', lineHeight: 24 }
});
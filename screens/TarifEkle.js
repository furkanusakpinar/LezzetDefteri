import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tarifler from '../data/tarifler';

export default function TarifEkle({ navigation }) {
    const [isim, setIsim] = useState('');
    const [sure, setSure] = useState('');
    const [zorluk, setZorluk] = useState('');
    const [kategori, setKategori] = useState('');
    const [resim, setResim] = useState('');
    const [malzemeler, setMalzemeler] = useState('');
    const [yapilis, setYapilis] = useState('');

    const kaydet = () => {
        if (!isim || !sure || !malzemeler || !yapilis || !zorluk || !kategori) {
            Alert.alert('Hata', 'Lütfen resim hariç tüm alanları doldurun!');
            return;
        }

        const yeniTarif = {
            id: Math.random().toString(36).substring(7),
            isim,
            sure: parseInt(sure),
            zorluk: zorluk.toLowerCase(),
            kategori,
            resim: resim || 'https://images.unsplash.com/photo-1495195134817-a1a28078aca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            malzemeler: malzemeler.split(',').map(m => m.trim()),
            yapilis,
        };

        tarifler.push(yeniTarif);

        Alert.alert('Başarılı', 'Tarif başarıyla eklendi!', [
            {
                text: 'Tamam', onPress: () => {
                    setIsim('');
                    setSure('');
                    setZorluk('');
                    setKategori('');
                    setResim('');
                    setMalzemeler('');
                    setYapilis('');
                    navigation.navigate('Anasayfa');
                }
            }
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Ionicons name="add-circle" size={32} color="#27AE60" />
                <Text style={styles.baslik}>Yeni Tarif Ekle</Text>
            </View>

            <View style={styles.formKart}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tarif Adı</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: Kremalı Mantarlı Makarna"
                        value={isim}
                        onChangeText={setIsim}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hazırlama Süresi (dakika)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: 25"
                        keyboardType="numeric"
                        value={sure}
                        onChangeText={setSure}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Zorluk Seviyesi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: Kolay, Orta, Zor"
                        value={zorluk}
                        onChangeText={setZorluk}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Kategori</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Örn: Kahvaltılık, Ana Yemek, Tatlı"
                        value={kategori}
                        onChangeText={setKategori}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Görsel URL (İsteğe bağlı)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://..."
                        value={resim}
                        onChangeText={setResim}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Malzemeler (Virgülle ayırın)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Örn: 250g Makarna, 1 bardak krema..."
                        multiline={true}
                        numberOfLines={3}
                        value={malzemeler}
                        onChangeText={setMalzemeler}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Yapılışı</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Adım adım yapılışını yazın..."
                        multiline={true}
                        numberOfLines={5}
                        value={yapilis}
                        onChangeText={setYapilis}
                        placeholderTextColor="#95A5A6"
                    />
                </View>

                <TouchableOpacity style={styles.kaydetBtn} onPress={kaydet}>
                    <Text style={styles.kaydetBtnText}>Tarifi Kaydet</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9F9' },
    contentContainer: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 120 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
    baslik: { fontSize: 26, fontWeight: 'bold', color: '#1A2530', marginLeft: 10 },
    formKart: { backgroundColor: '#FFFFFF', borderRadius: 25, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
    inputContainer: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#1A2530', marginBottom: 8, marginLeft: 4 },
    input: { backgroundColor: '#F8F9F9', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 15, fontSize: 16, color: '#1A2530', borderWidth: 1, borderColor: '#EAECEE' },
    textArea: { height: 100, textAlignVertical: 'top' },
    kaydetBtn: { flexDirection: 'row', backgroundColor: '#27AE60', paddingVertical: 18, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#27AE60', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
    kaydetBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QrOkuyucu({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Kamera izni sorgulanıyor...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Kamerayı kullanmak için izin vermelisiniz.</Text>
                <Button title="İzin Ver" onPress={requestPermission} color="#27AE60" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }) => {
        if (scanned || !data) return;
        setScanned(true);

        const trimmedData = data.trim();
        const lowerData = trimmedData.toLowerCase();

        if (
            lowerData === 'lezzetdefteri://tarifler' ||
            lowerData === 'lezzetdefteri:tarifler' ||
            lowerData === 'tarifler-listesi' ||
            lowerData === 'tarifler'
        ) {
            Alert.alert(
                'QR Kod Algılandı',
                'Tarifler listesine yönlendiriliyorsunuz.',
                [
                    {
                        text: 'Tamam',
                        onPress: () => {
                            setScanned(false);
                            navigation.navigate('Anasayfa');
                        }
                    }
                ],
                { cancelable: false }
            );
        } 
        else if (lowerData.startsWith('http://') || lowerData.startsWith('https://')) {
            Alert.alert(
                'Bağlantı Algılandı',
                `${trimmedData}\n\nAçılsın mı?`,
                [
                    {
                        text: 'İptal',
                        style: 'cancel',
                        onPress: () => setScanned(false)
                    },
                    {
                        text: 'Aç',
                        onPress: () => {
                            Linking.openURL(trimmedData)
                                .catch(() => {
                                    Alert.alert('Hata', 'Bağlantı açılamadı.');
                                })
                                .finally(() => {
                                    setScanned(false);
                                });
                        }
                    }
                ],
                { cancelable: false }
            );
        } 
        else {
            Alert.alert(
                'Taranan Metin',
                trimmedData,
                [
                    {
                        text: 'Tamam',
                        onPress: () => setScanned(false)
                    }
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>Kamerayı QR Koda Doğrultun</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9f9',
    },
    loadingText: {
        color: '#7f8c8d',
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        color: '#1a2530',
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    overlay: {
        position: 'absolute',
        bottom: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    overlayText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
    },
});

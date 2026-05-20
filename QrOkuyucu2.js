import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QrOkuyucu({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) return null;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ marginBottom: 16 }}>Kamera izni gerekli</Text>
                <Button title="İzin Ver" onPress={requestPermission} color="#27AE60" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }) => {
        if (scanned || !data) return;
        setScanned(true);

        if (data.startsWith('http') || data.startsWith('https')) {
            Linking.openURL(data)
                .catch(() => Alert.alert('Hata', 'Link açılamadı.'))
                .finally(() => setScanned(false));
        } else if (data.includes('tarifler')) {
            navigation.navigate('Anasayfa');
            setScanned(false);
        } else {
            Alert.alert('QR Kod', data, [{ text: 'Tamam', onPress: () => setScanned(false) }]);
        }
    };

    return (
        <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import TarifListesi from './screens/TariflerListesi';
import TarifDetay from './screens/TarifDetay';
import Favoriler from './screens/Favoriler';
import TarifEkle from './screens/TarifEkle';
import QrOkuyucu from './screens/QrOkuyucu';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [favoriIdler, setFavoriIdler] = useState([]);

  const toggleFavori = (id) => {
    setFavoriIdler((onceki) => {
      if (onceki.includes(id)) {
        return onceki.filter((favId) => favId !== id);
      } else {
        return [...onceki, id];
      }
    });
  };

  function AnasayfaStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TarifListesi">
          {(props) => (
            <TarifListesi {...props} toggleFavori={toggleFavori} favoriIdler={favoriIdler} />
          )}
        </Stack.Screen>
        <Stack.Screen name="TarifDetay">
          {(props) => <TarifDetay {...props} toggleFavori={toggleFavori} favoriIdler={favoriIdler} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function FavorilerStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FavorilerListesi">
          {(props) => <Favoriler {...props} favoriIdler={favoriIdler} toggleFavori={toggleFavori} />}
        </Stack.Screen>
        <Stack.Screen name="TarifDetay">
          {(props) => <TarifDetay {...props} toggleFavori={toggleFavori} favoriIdler={favoriIdler} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#27AE60',
          tabBarInactiveTintColor: '#BDC3C7',
          tabBarStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 10,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Anasayfa') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favoriler') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Ekle') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'QR Tarayıcı') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            }
            return (
              <View>
                <Ionicons name={iconName} size={24} color={color} />
                {route.name === 'Favoriler' && favoriIdler.length > 0 && (
                  <View style={{
                    position: 'absolute',
                    right: -8,
                    top: -4,
                    backgroundColor: '#E74C3C',
                    borderRadius: 9,
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {favoriIdler.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }
        })}
      >
        <Tab.Screen name="Anasayfa" component={AnasayfaStack} />
        <Tab.Screen name="QR Tarayıcı" component={QrOkuyucu} />
        <Tab.Screen name="Ekle" component={TarifEkle} />
        <Tab.Screen name="Favoriler" component={FavorilerStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
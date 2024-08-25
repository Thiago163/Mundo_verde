import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Entypo, FontAwesome, Feather } from '@expo/vector-icons';

import tFavoritos from './pages/tFavoritos/index';
import tConfiguracaoCui from './pages/telasCadastroUsuario/tConfiguracaoCui';
import tPesquisa from './pages/tPesquisa';
import tRecentes from './pages/tRecentes';

const Tab = createBottomTabNavigator();

export default function Routes2() {
    return (
        <Tab.Navigator screenOptions={{

            tabBarActiveTintColor: '#1E90FF',
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#FFC0CB',
            }
        }}>
            <Tab.Screen
                name="Pesquisa" component={tPesquisa} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <FontAwesome name="search" size={size} color={color} />
                        }

                        return <Feather name="search" size={size} color={color} />
                    }
                }}
            />


            <Tab.Screen name="Favoritos" component={tFavoritos} options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <FontAwesome name="heart" size={size} color={color} />
                    }

                    return <Feather name="heart" size={size} color={color} />
                }
            }} />


            <Tab.Screen name="Recentes" component={tRecentes} options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <Entypo name="back-in-time" size={size} color={color} />
                    }

                    return <Entypo name="back-in-time" size={size} color={color} />
                }
            }} />


            <Tab.Screen name="PerfilBaba" component={tConfiguracaoCui} options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <FontAwesome name="user-circle" size={size} color={color} />
                    }

                    return <FontAwesome name="user-circle-o" size={size} color={color} />
                }
            }} />
        </Tab.Navigator>
    )
}
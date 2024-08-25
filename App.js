// Aplicativo para buscar babas
// Autores: Luiz Felipe de Oliveira, Lucas Emanuel, Thiago Silva da Cruz
// O aplivacivo vem sendo feito desde fevereiro de 2023

import { StatusBar } from 'expo-status-bar';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import AppLoading from 'expo-app-loading';
import React from 'react';
import Routes from './src/routes';

export default function App() {
        const [fontsLoaded] = useFonts({
            Roboto_400Regular,
            Roboto_500Medium,
            Ubuntu_700Bold
        });

        if (!fontsLoaded) {
            return <AppLoading/>
        }

        else {
            return (
                <>
                    <StatusBar style="dark" backgroundColor="transparent" translucent />
                    <Routes/>
                </>
            );
        }
}
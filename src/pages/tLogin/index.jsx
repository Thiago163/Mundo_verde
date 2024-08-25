import React, { useState } from "react";
import { View, Image, ImageBackground, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import styles from './estilo';
import styleGeral from '../estiloGeral/style'
import { SalvarJWT } from "../../AuthContext";

export default function tLogin() {
    const navigation = useNavigation()

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    function Navegar(rota) {
        navigation.navigate(rota);
    }

    function Esqueci() {
        navigation.navigate('tEsqueciSenha');
    }

    function Criar() {
        navigation.navigate('tSelecaoUser');
    }

    async function Login() {
        const formData = new URLSearchParams();
        formData.append('login', login);
        formData.append('senha', senha);

        try {
            // Tentando autenticar com o primeiro endpoint
            const response = await axios.post('https://cuidadores.azurewebsites.net/api/loginusu/Login', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            SalvarJWT(response.data);
        } catch (error) {
            console.log("Erro ao autenticar com o primeiro endpoint", error);

            try {
                // Tentando autenticar com o segundo endpoint
                const response = await axios.post('https://cuidadores.azurewebsites.net/api/logincui/Login', formData.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                SalvarJWT(response.data);
            } catch (error) {
                console.log("Erro ao autenticar com o segundo endpoint", error);
                alert("Erro ao autenticar");
            }
        }

        // Navegar para a próxima tela após tentativa de login
        Navegar("Routes2");  // ou "Routes3", conforme necessário
    }

    return (
        <ImageBackground style={styleGeral.container}>
            <View style={styles.main}>
                <Image style={{ width: 250, height: 100, marginTop: 200, marginLeft: 30 }}
                    source={require('../../assets/logo.png')} />
            </View>

            <View style={styles.footer}>
                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite seu email ou CPF"
                    onChangeText={(texto) => setLogin(texto)}
                />
                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite sua senha"
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={(texto) => setSenha(texto)}
                />

                <TouchableOpacity style={styleGeral.button} onPress={Login}>
                    <Text style={styleGeral.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Esqueci sua senha?
                    <TouchableOpacity onPress={Esqueci}>
                        <Text style={styles.hyperlinkStyle}>Clique aqui</Text>
                    </TouchableOpacity>
                </Text>

                <Text style={styles.title}>Não possui uma conta?
                    <TouchableOpacity onPress={Criar}>
                        <Text style={styles.hyperlinkStyle}>Clique aqui</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ImageBackground>
    );
}
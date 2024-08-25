import React, { useEffect, useState } from "react";
import { View, Image, ImageBackground, Text, TextInput, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './estilo';
import styleGeral from '../../estiloGeral/style'
import { HeaderRequisicao, DadosUsuario } from '../../../AuthContext';


export default function tConfirmarSenha() {
    const navigation = useNavigation()

    const [senha, setSenha] = useState("");
    const [senhaPuxada, setSenhaPuxada] = useState("");

    function Navegar() {
        navigation.navigate('tEditarUsuario');
    }

    function verificarSenha() {
        // Verificar se a senha digitada é igual à senha obtida
        if (senha === senhaPuxada) {
            Navegar(); // Navegar para a próxima tela
        } else {
            alert("Senha incorreta. Tente novamente."); // Senha incorreta
        }
    }

    async function MostrarUsuario() {
        const userData = await DadosUsuario();
        const headers = await HeaderRequisicao();
        //const url = `https://localhost:44396/api/ConfigUsu?id=${userData.ID}`;
        const url = `https://cuidadores.azurewebsites.net/api/ConfigUsu?id=${userData.ID}`;

        fetch(url, {
            method: 'GET',
            headers,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const usuario = data[0];
                    setSenhaPuxada(usuario.senha || '');
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Erro ao puxar informações');
            });
    }

    useEffect(() => {
        MostrarUsuario();
    }, []);

    return (
        <ImageBackground style={styleGeral.container}>
            <View style={styles.main}>
                <Image style={{ width: 207, height: 225, marginTop: 200, marginLeft: 60 }}
                    source={require('../../../assets/logo.png')} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.title}>Para alterar as informações é necessário confirmar a senha</Text>
                <TextInput
                    style={styleGeral.input}
                    placeholder="Confirmar a senha"
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={(texto) => setSenha(texto)}
                />

                <RectButton style={styleGeral.button} onPress={verificarSenha}>
                    <Text style={styleGeral.buttonText}>Confirmar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}
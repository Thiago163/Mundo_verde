import React, { useState } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from './estilo';
import styleGeral from '../../../estiloGeral/style'

export default function tCadastrarFotoU() {

    const route = useRoute();
    const [nome, setnome] = useState(route.params?.nome || '');
    const [cpf, setcpf] = useState(route.params?.cpf || '');
    const [celular, setcelular] = useState(route.params?.celular || '');
    const [email, setemail] = useState(route.params?.email || '');
    const [senha, setsenha] = useState(route.params?.senha || '');
    const [sexo, setsexo] = useState(route.params?.sexo || '');
    const [sobrenome, setsobrenome] = useState(route.params?.sobrenome || '');
    const [data_de_nasc, setdata_de_nasc] = useState(route.params?.data_de_nasc || '');

    const [cep, setcep] = useState(route.params?.cep || '');
    const [endereco, setendereco] = useState(route.params?.logradouro || '');
    const [cidade, setcidade] = useState(route.params?.localidade || '');
    const [estado, setestado] = useState(route.params?.uf || '');
    const [bairro, setbairro] = useState(route.params?.bairro || '');

    const [descricao, setdescricao] = useState("");
    const [imagem, setimagem] = useState("");

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }
        setimagem(result.assets[0].uri);
    }

    function Cadastrar() {

        const body = { nome, cpf, celular, endereco, email, senha, imagem, cep, sexo, sobrenome, cidade, estado, data_de_nasc, descricao, bairro };

        //fetch("https://localhost:44396/api/cadusu", {
        fetch("https://cuidadores.azurewebsites.net/api/cadusu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((response) => { alert("Usuário cadastrado com sucesso"); })
            .catch((error) => {
                console.log(error);
                alert("Erro ao cadastrar usuário");
            });
    }

    const navigation = useNavigation();

    const Cadastrar_Avancar = () => {
        Cadastrar();
        Avancao();
    };

    function Avancao() {
        navigation.navigate('tLogin')
    }

    function Voltar() {
        navigation.goBack()
    }

    return (
        <ImageBackground style={styleGeral.container}>

            <View style={styles.main2}>
                <Image source={{ uri: imagem }} style={styles.image} />
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Selecione sua melhor foto (png, jpg, svg) </Text>
            </View>

            <TextInput
                style={styles.description}
                placeholder="Descrição..."
                multiline
                value={descricao}
                onChangeText={(texto) => setdescricao(texto)}
            />

            <RectButton style={styleGeral.button} onPress={selecionarImagem}>
                <Text style={styleGeral.buttonText}>Escolher Foto</Text>
            </RectButton>

            <RectButton style={styleGeral.button} onPress={Cadastrar_Avancar}>
                <Text style={styleGeral.buttonText}>Avançar</Text>
            </RectButton>

            <RectButton style={styleGeral.buttonReturn} onPress={Voltar}>
                <Text style={styleGeral.buttonText}>Voltar</Text>
            </RectButton>
        </ImageBackground>
    );
}
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './estilo';
import { HeaderRequisicao, DadosUsuario } from '../../../AuthContext';

function TConfiguracaoCui() {
    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");

    async function mostrarUsuario() {
        const userData = await DadosUsuario();
        const headers = await HeaderRequisicao();
        //const url = `https://localhost:44396/api/ConfigCui?id=${userData.ID}`;
        const url = `https://cuidadores.azurewebsites.net/api/ConfigCui?id=${userData.ID}`;

        fetch(url, {
            method: 'GET',
            headers
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    const usuario = data[0];
                    setNome(usuario.nome || "");
                    setSobrenome(usuario.sobrenome || "");
                    setEmail(usuario.email || "");
                    setCidade(usuario.cidade || "");
                    setCelular(usuario.celular || "");
                    setDescricao(usuario.descricao || "");
                    setImagem(usuario.imagem || "");
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Erro ao inserir informações');
            });
    }

    useEffect(() => {
        mostrarUsuario();
    }, []);

    function avancar() {
        navigation.navigate('tConfirmarSenhaCui');
    }

    function handleNomeChange(text) {
        setNome(text);
    }

    function handleSobrenomeChange(text) {
        setSobrenome(text);
    }

    function handleEmailChange(text) {
        setEmail(text);
    }

    function handleCidadeChange(text) {
        setCidade(text);
    }

    function handleCelularChange(text) {
        setCelular(text);
    }

    function handleDescricaoChange(text) {
        setDescricao(text);
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Olá, Usuário!</Text>

                <View style={styles.view}>
                    <Image
                        source={{ uri: imagem }}
                        style={styles.image}
                        resizeMode="cover"
                    />


                    <View style={styles.editor}>
                        <FontAwesome
                            name="pencil-square-o"
                            size={24}
                            color="black"
                            onPress={avancar}
                        />
                    </View>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={handleNomeChange}
                        editable={false}
                    />

                    <Text style={styles.text}>Sobrenome</Text>
                    <TextInput
                        style={styles.input}
                        value={sobrenome}
                        onChangeText={handleSobrenomeChange}
                        editable={false}
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={handleEmailChange}
                        editable={false}
                    />

                    <Text style={styles.text}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        onChangeText={handleCidadeChange}
                        editable={false}
                    />

                    <Text style={styles.text}>Celular</Text>
                    <TextInput
                        style={styles.input}
                        value={celular}
                        onChangeText={handleCelularChange}
                        editable={false}
                    />

                    <Text style={styles.text}>Descrição</Text>
                    <TextInput
                        style={styles.inputDesc}
                        value={descricao}
                        onChangeText={handleDescricaoChange}
                        multiline
                        editable={false}
                    />

                </View>
            </View>
        </ScrollView>
    );
}

export default TConfiguracaoCui;
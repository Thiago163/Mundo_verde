import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

import styles from './estilo';
import { HeaderRequisicao, DadosUsuario } from '../../../AuthContext';

function EditarUsuario() {
    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [data_de_nasc, setData_de_nasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [sexoPicker, setSexoPicker] = useState('');
    const opcoesSexo = [
        { label: 'Masculino', value: '1' },
        { label: 'Feminino', value: '2' },
        { label: 'Não Binário', value: '3' },
        { label: 'Prefiro não responder', value: '4' },
    ];
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [preco, setPreco] = useState('');
    const [link, setLink] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    async function MostrarUsuario() {
        const userData = await DadosUsuario();
        const headers = await HeaderRequisicao();
        //const url = `https://localhost:44396/api/ConfigCui?id=${userData.ID}`;

        const url = `https://cuidadores.azurewebsites.net/api/ConfigCui?id=${userData.ID}`;

        fetch(url, {
            method: 'GET',
            headers,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    const usuario = data[0];

                    setId(usuario.id || '');
                    setNome(usuario.nome || '');
                    setSobrenome(usuario.sobrenome || '');
                    setData_de_nasc(usuario.data_de_nasc || '');
                    setCpf(usuario.cpf || '');

                    const opcaoInicial = opcoesSexo.find(opcao => opcao.label.toLowerCase() === usuario.sexo.toLowerCase());
                    const valorInicial = opcaoInicial ? opcaoInicial.value : '';

                    setSexoPicker(valorInicial);

                    setSexo(usuario.sexo || '');
                    setCelular(usuario.celular || '');
                    setEmail(usuario.email || '');
                    setSenha(usuario.senha || '');
                    setPreco(usuario.preco || '');
                    setLink(usuario.link || '');

                    setCep(usuario.cep || '');
                    setEndereco(usuario.endereco || '');
                    setCidade(usuario.cidade || '');
                    setEstado(usuario.estado || '');
                    setBairro(usuario.bairro || '');

                    setDescricao(usuario.descricao || '');
                    setImagem(usuario.imagem || '');
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

    async function Editar() {
        const body = {
            id, nome, sobrenome, data_de_nasc, cpf, sexo: sexoPicker, celular, email, senha, cep, endereco, cidade, estado, bairro, descricao, imagem, preco, link
        };
        const headers = await HeaderRequisicao();

        //fetch('https://localhost:44396/api/ConfigCui', {
        fetch('https://cuidadores.azurewebsites.net/api/ConfigCui', {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        })
            .then(() => {
                alert('Usuário editado com sucesso');
            })
            .catch((error) => {
                console.log(error);
                alert('Erro ao editar resultado');
            });
    }

    function handleChange(field, value) {
        switch (field) {
            case 'nome':
                setNome(value);
                break;
            case 'sobrenome':
                setSobrenome(value);
                break;
            case 'data_de_nasc':
                setData_de_nasc(value);
                break;
            case 'cpf':
                setCpf(value);
                break;
            case 'sexo':
                setSexo(value);
                break;
            case 'celular':
                setCelular(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'senha':
                setSenha(value);
                break;
            case 'preco':
                setPreco(value);
                break;
            case 'link':
                setLink(value);
                break;
            case 'cep':
                setCep(value);
                break;
            case 'endereco':
                setEndereco(value);
                break;
            case 'cidade':
                setCidade(value);
                break;
            case 'estado':
                setEstado(value);
                break;
            case 'bairro':
                setBairro(value);
                break;
            case 'descricao':
                setDescricao(value);
                break;
            case 'imagem':
                setImagem(value);
                break;
            default:
                break;
        }
    }

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }
        setImagem(result.assets[0].uri);
    }
    
    async function Editar_Navegar() {
        await Editar();
        Navegar();
    }

    function Navegar() {
        navigation.navigate('Routes3');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.title}>Olá, Cuidador, Altere os campos que desejar</Text>
                <View style={styles.view}>

                    <Text style={styles.text}>Imagem</Text>
                    <Image
                        source={{ uri: imagem }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <RectButton style={styles.button} onPress={selecionarImagem}>
                        <Text style={styles.buttonText}>Escolher Foto</Text>
                    </RectButton>

                    <Text style={styles.text}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={(text) => handleChange('nome', text)}
                    />

                    <Text style={styles.text}>Sobrenome</Text>
                    <TextInput
                        style={styles.input}
                        value={sobrenome}
                        onChangeText={(text) => handleChange('sobrenome', text)}
                    />

                    <Text style={styles.text}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        value={data_de_nasc}
                        onChangeText={(text) => handleChange('data_de_nasc', text)}
                    />

                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        value={cpf}
                        onChangeText={(text) => handleChange('cpf', text)}
                    />

                    <Text style={styles.text}>Sexo</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={sexoPicker}
                        onValueChange={(itemValue) => setSexoPicker(itemValue)}
                    >
                        {opcoesSexo.map((opcao, index) => (
                            <Picker.Item
                                key={index}
                                label={opcao.label}
                                value={opcao.value}
                            />
                        ))}
                    </Picker>

                    <Text style={styles.text}>Celular</Text>
                    <TextInput
                        style={styles.input}
                        value={celular}
                        onChangeText={(text) => handleChange('celular', text)}
                    />

                    <Text style={styles.text}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => handleChange('email', text)}
                    />

                    <Text style={styles.text}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={senha}
                        onChangeText={(text) => handleChange('senha', text)}
                    />

                    <Text style={styles.text}>CEP</Text>
                    <TextInput
                        style={styles.input}
                        value={cep}
                        onChangeText={(text) => handleChange('cep', text)}
                    />

                    <Text style={styles.text}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        value={endereco}
                        onChangeText={(text) => handleChange('endereco', text)}
                    />

                    <Text style={styles.text}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        onChangeText={(text) => handleChange('cidade', text)}
                    />

                    <Text style={styles.text}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        value={estado}
                        onChangeText={(text) => handleChange('estado', text)}
                    />

                    <Text style={styles.text}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        value={bairro}
                        onChangeText={(text) => handleChange('bairro', text)}
                    />

                    <Text style={styles.text}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        value={descricao}
                        onChangeText={(text) => handleChange('descricao', text)}
                    />

                    <Text style={styles.text}>Preço</Text>
                    <TextInput
                        style={styles.input}
                        value={preco}
                        onChangeText={(text) => handleChange('preco', text)}
                    />

                    <Text style={styles.text}>Link</Text>
                    <TextInput
                        style={styles.input}
                        value={link}
                        onChangeText={(text) => handleChange('link', text)}
                    />

                    <RectButton style={styles.button} onPress={Editar_Navegar}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </RectButton>
                </View>
            </View>
        </ScrollView>
    );
}

export default EditarUsuario;
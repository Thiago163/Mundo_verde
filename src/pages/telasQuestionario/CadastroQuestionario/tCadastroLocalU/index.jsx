import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


import styles from './estilo';
import styleGeral from '../../../estiloGeral/style'

export default function tCadastroLocalU() {

    const route = useRoute();

    const [nome, setnome] = useState(route.params?.nome);
    const [sobrenome, setsobrenome] = useState(route.params?.sobrenome);
    const [data_de_nasc, setdata_de_nasc] = useState(route.params?.data_de_nasc);
    const [cpf, setcpf] = useState(route.params?.cpf || '');
    const [sexo, setsexo] = useState(route.params?.sexo || '');
    const [celular, setcelular] = useState(route.params?.celular || '');
    const [email, setemail] = useState(route.params?.email || '');
    const [senha, setsenha] = useState(route.params?.senha || '');

    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [localidade, setLocalidade] = useState("")
    const [uf, setUf] = useState(1)
    const [bairro, setBairro] = useState('');

    const Estado = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
    ];

    const navigation = useNavigation();

    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        const checkFormCompletion = () => {
            if (
                uf !== '' &&
                localidade !== '' &&
                bairro !== '' &&
                logradouro !== ''
            ) {
                setIsFormComplete(true);
            } else {
                setIsFormComplete(false);
            }
        };

        checkFormCompletion();
    }, [uf, localidade, bairro, logradouro]);

    async function BuscarCep() {
        let url = `https://viacep.com.br/ws/${cep}/json/`;

        let req = await fetch(url);
        let res = await req.json();

        setLogradouro(res.logradouro);
        setLocalidade(res.localidade);
        setBairro(res.bairro);

        const estadoEncontrado = Estado.find((estado) => estado.value === res.uf);
        if (estadoEncontrado) {
            setUf(estadoEncontrado.value);
        }

        else {
            setUf("");
        }
    }

    function handleNavigate() {
        navigation.navigate('tCadastroFotoU', {
            nome: nome, sobrenome: sobrenome, celular: celular, cpf: cpf, email: email, senha: senha, sexo: sexo, data_de_nasc: data_de_nasc, logradouro: logradouro, localidade: localidade, uf: uf, cep: cep, bairro: bairro,
        });
    }

    function Voltar() {
        navigation.goBack()
    }

    return (
        <ImageBackground style={styleGeral.container}>
            <View>
                <Image style={{ width: 100, height: 109, marginTop: -30 }}
                    source={require('../../../../assets/logo.png')} />
            </View>

            <View>
                <Text style={styles.title}>Cadastro Usuário</Text>
            </View>

            <ScrollView>
                <View style={styles.footer}>

                    <TextInput
                        style={styleGeral.input}
                        value={cep}
                        onChangeText={(texto) => setCep(texto)}
                        placeholder='Cep'
                    />

                    <TouchableOpacity style={styleGeral.button}>
                        <Text style={styleGeral.buttonText} onPress={BuscarCep}>Buscar</Text>
                    </TouchableOpacity>

                    <Picker
                        style={styleGeral.input}
                        selectedValue={uf}
                        onValueChange={(itemValue) => {
                            setUf(itemValue);
                            const estado = Estado.find((estado) => estado.label === itemValue);
                        }}
                    >
                        {Estado.map((opcao) => (
                            <Picker.Item
                                key={opcao.value}
                                label={opcao.label}
                                value={opcao.value}
                            />
                        ))}
                    </Picker>

                    <TextInput
                        style={styleGeral.input}
                        value={localidade}
                        onChangeText={(texto) => setLocalidade(texto)}
                        placeholder="Cidade"
                    />

                    <TextInput
                        style={styleGeral.input}
                        value={bairro}
                        onChangeText={(texto) => setBairro(texto)}
                        placeholder="Bairro"
                    />

                    <TextInput
                        style={styleGeral.input}
                        value={logradouro}
                        onChangeText={(texto) => setLogradouro(texto)}
                        placeholder="Endereço"
                    />

                </View>
            </ScrollView>

            <View>
                <RectButton
                    style={[styleGeral.button, !isFormComplete && styleGeral.buttonDisabled]}
                    onPress={isFormComplete ? handleNavigate : null}
                    enabled={isFormComplete}
                >
                    <Text style={styleGeral.buttonText}>Avançar</Text>
                </RectButton>

                <RectButton style={styleGeral.buttonReturn} onPress={Voltar}>
                    <Text style={styleGeral.buttonText}>Voltar</Text>
                </RectButton>
            </View>
        </ImageBackground >
    );
}
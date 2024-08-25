import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import styles from './estilo';
import styleGeral from '../../../estiloGeral/style'

export default function tCadastrarInfoC() {

    const [nome, setnome] = useState("");
    const [sobrenome, setsobrenome] = useState("");
    const [cpf, setcpf] = useState("");
    const [sexo, setsexo] = useState(1);
    const [celular, setcelular] = useState("");
    const [email, setemail] = useState("");
    const [senha, setsenha] = useState("");
    const [preco, setpreco] = useState("");
    const [link, setlink] = useState("");

    const [dia, setdia] = useState("");
    const [mes, setmes] = useState("");
    const [ano, setano] = useState("");

    const navigation = useNavigation();

    const opcoesSexo = [
        { label: 'Masculino', value: 1 },
        { label: 'Feminino', value: 2 },
        { label: 'Não binário', value: 3 },
        { label: 'Prefiro não responder', value: 4 },
    ];

    const dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

    const meses = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    ];

    const anos = Array.from({ length: 100 }, (_, i) =>
        String(2023 - i),
    );

    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        // Verifica se todos os campos obrigatórios estão preenchidos
        const checkFormCompletion = () => {
            if (
                nome !== '' &&
                sobrenome !== '' &&
                cpf !== '' &&
                celular !== '' &&
                email !== '' &&
                senha !== '' &&
                preco !== '' &&
                link !== '' &&
                dia !== '' &&
                mes !== '' &&
                ano !== ''
            ) {
                setIsFormComplete(true);
            } else {
                setIsFormComplete(false);
            }
        };

        checkFormCompletion();
    }, [nome, sobrenome, cpf, celular, email, senha, preco, link, dia, mes, ano]);

    function handleNavigate() {
        const dataNasc = `${ano}-${mes}-${dia}`;
        navigation.navigate('tCadastroLocalC', {
            nome: nome, sobrenome: sobrenome, celular: celular, cpf: cpf, email: email, senha: senha, preco: preco, link: link, sexo: sexo, data_de_nasc: dataNasc
        });
    }

    function Voltar() {
        navigation.goBack()
    }

    return (
        <ImageBackground style={styleGeral.container}>
            <View>
                <Image style={{ width: 280, height: 110, marginTop: 30, marginright: 20}}
                    source={require('../../../../assets/logo.png')} />
            </View>

            <View>
                <Text style={styles.title}>Cadastro Usuario</Text>
            </View>

            <ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        style={styleGeral.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(texto) => setnome(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChangeText={(texto) => setsobrenome(texto)}
                    />

                    <Picker
                        style={styleGeral.input}
                        selectedValue={sexo}
                        onValueChange={(itemValue) => setsexo(itemValue)}
                    >
                        {opcoesSexo.map((opcao) => (
                            <Picker.Item
                                key={opcao.value}
                                label={opcao.label}
                                value={opcao.value}
                            />
                        ))}
                    </Picker>

                    <View style={styles.inputContainer}>
                        <Picker
                            style={styles.input_nasc_data}
                            selectedValue={dia}
                            onValueChange={(itemValue) => setdia(itemValue)}
                        >
                            <Picker.Item label="Dia" value="" />
                            {dias.map((dia) => (
                                <Picker.Item key={dia} label={dia} value={dia} />
                            ))}
                        </Picker>

                        <Picker
                            style={styles.input_nasc_data}
                            selectedValue={mes}
                            onValueChange={(itemValue) => setmes(itemValue)}
                        >
                            <Picker.Item label="Mês" value="" />
                            {meses.map((mes, index) => (
                                <Picker.Item key={index} label={mes} value={mes} />
                            ))}
                        </Picker>

                        <Picker
                            style={styles.input_nasc_data}
                            selectedValue={ano}
                            onValueChange={(itemValue) => setano(itemValue)}
                        >
                            <Picker.Item label="Ano" value="" />
                            {anos.map((ano) => (
                                <Picker.Item key={ano} label={ano} value={ano} />
                            ))}
                        </Picker>
                    </View>


                    <TextInput
                        style={styleGeral.input}
                        placeholder="Celular"
                        value={celular}
                        onChangeText={(texto) => setcelular(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="CPF"
                        value={cpf}
                        onChangeText={(texto) => setcpf(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(texto) => setemail(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="Senha"
                        value={senha}
                        onChangeText={(texto) => setsenha(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="Preço"
                        value={preco}
                        onChangeText={(texto) => setpreco(texto)}
                    />

                    <TextInput
                        style={styleGeral.input}
                        placeholder="Link"
                        value={link}
                        onChangeText={(texto) => setlink(texto)}
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
import { View, Image, ImageBackground, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './estilo';
import styleGeral from '../estiloGeral/style'

export default function tEsquiciSenha() {
    const navigation = useNavigation()

    function Avancao() {
        navigation.navigate('tNovaSenha');
    }

    function Voltar() {
        navigation.goBack()
    }

    return (
        <ImageBackground style={styleGeral.container}>
            <View style={styles.main}>
                <Image style={{ width: 250, height: 100, marginTop: -10, marginLeft: 30}}
                    source={require('../../assets/logo.png')} />
            </View>

            <View style={styles.main}>

            <Text style={styles.title}>Esqueci minha senha(a)</Text>

                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite seu email"
                />
                
                <Text style={styles.description}>Ou</Text>

                <TextInput
                    style={styleGeral.input}
                    placeholder="Digite seu número de Celular"
                    autoCorrect={false}
                />

                <RectButton style={styleGeral.button} onPress={Avancao}>
                    <Text style={styleGeral.buttonText}>Avançar</Text>
                </RectButton>
                <RectButton style={styleGeral.buttonReturn} onPress={Voltar}>
                    <Text style={styleGeral.buttonText}>Voltar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}
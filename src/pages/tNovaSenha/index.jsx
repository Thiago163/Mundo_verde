import { View, Image, ImageBackground, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './estilo';
import styleGeral from '../estiloGeral/style';

export default function tEsqueciSenha() {
  const navigation = useNavigation();

  function Avancao() {
    navigation.navigate('tLogin');
  }

  function Voltar() {
    navigation.goBack();
  }

  return (
    <ImageBackground style={styleGeral.container}>

      <View style={styles.main}>
        <Image style={{ width: 207, height: 225, marginTop: 10, marginLeft: 60 }} source={require('../../assets/logo.png')} />
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>Redefinir minha Senha</Text>

        <TextInput style={styleGeral.input} placeholder="Digite a nova senha" />

        <Text style={styles.description}>&</Text>

        <TextInput style={styleGeral.input} placeholder="Confirme a nova senha" autoCorrect={false} />

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

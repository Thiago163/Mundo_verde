import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';;
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from "react-native-vector-icons";

import styles from './estilo';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function tDetalhes() {

    const navigation = useNavigation();
    const route = useRoute();
    const { usuario } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    function voltar() {
        navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Ionicons
                    name="chevron-back"
                    size={40}
                    color="black"
                    onPress={voltar}
                />

                <Image
                    source={{ uri: usuario.imagem }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View>
                    <View>
                        <View style={styles.view1}>
                            <Text style={styles.subtitle}> DESCRIÇÃO </Text>
                            <Text style={styles.title3}>{usuario.descricao}</Text>
                        </View>

                        <View style={styles.view1}>
                            <Text style={styles.subtitle}> DADOS BÁSICOS </Text>

                            <Text style={styles.title1}>NOME: {usuario.nome} {usuario.sobrenome}</Text>
                            <Text style={styles.title1}>Data de nascimento: {usuario.data_de_nasc}</Text>
                            <Text style={styles.title1}>Preço: {usuario.preco}</Text>
                            <Text style={styles.title1}>Link: {usuario.link}</Text>
                        </View>


                        <View style={styles.view2}>
                            <Text style={styles.subtitle}>CONTATO</Text>

                            <Text style={styles.title2}>Email: {usuario.email}</Text>
                            <Text style={styles.title2}>Celular: {usuario.celular}</Text>
                        </View>


                        <View style={styles.view3}>
                            <Text style={styles.subtitle}> LOCALIZAÇÃO </Text>

                            <Text style={styles.title3}>Estado: {usuario.estado}</Text>
                            <Text style={styles.title3}>Cidade: {usuario.cidade}</Text>

                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
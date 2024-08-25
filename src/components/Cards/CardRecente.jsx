import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DadosUsuario, HeaderRequisicao } from '../../AuthContext';

function CardRecente({ usuario }) {
  const navigation = useNavigation();

  const abrirDetalhes = () => {
    navigation.navigate('tDetalhes', { usuario });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={abrirDetalhes}>
      <Image
        source={{ uri: usuario.imagem }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{usuario.nome}</Text>
        <View style={styles.tipo}>
          <Text style={styles.tipoText}>{usuario.tipo}</Text>
        </View>
        <Text style={styles.distanciaText}>Estado: {usuario.estado}</Text>
        <Text style={styles.precoText}>Preço por dia: R$ {usuario.preco}</Text>
        <View style={styles.upperContainer}>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  distanciaText: {
    fontSize: 15,
    marginBottom: 5,
  },
  
  estrelasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  estrela: {
    marginLeft: 5,
  },

  image: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 100,
    width: 120,
    height: 120,
    overflow: 'hidden',
  },

  infoContainer: {
    marginLeft: 10,
  },

  nameText: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 5,
  },

  precoText: {
    fontSize: 15,
    marginBottom: 5,
  },

  tipo: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },

  tipoText: {
    fontSize: 12,
    color: 'black',
  },

  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default CardRecente;
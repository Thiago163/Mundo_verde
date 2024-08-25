import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DadosUsuario, HeaderRequisicao } from '../../AuthContext';

function CardUsuario({ usuario }) {
  const navigation = useNavigation();
  const [favorito, setFavorito] = useState(false);
  const [recentes, setRecentes] = useState(false);
  const [classificacao, setClassificacao] = useState(5);

  const Detalhes_Recentes = () => {
    handleToggleRecentes();
    abrirDetalhes();
  };

  const abrirDetalhes = () => {
    navigation.navigate('tDetalhes', { usuario });
  };

  const enviarParaBancoDeDados = async (method, favoriteId) => {
    const cuidadorId = usuario.id; // ID do cuidador
    const userData = await DadosUsuario(); // Usuário logado no aplicativo
    //const url = 'https://localhost:44396/api/favoritosusu';
    const url = 'https://cuidadores.azurewebsites.net/api/favoritosusu';

    const headers = await HeaderRequisicao();
    console.log(headers);

    if (method === 'DELETE') {
      // Adicione o ID do favorito na URL de exclusão
      fetch(`${url}?usuario_id=${userData.ID}&cuidador_id=${cuidadorId}`, { headers, method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Sucesso ao excluir os dados da API
            console.log('Dados excluídos com sucesso da API');
          }

          else {
            // Erro ao excluir os dados da API
            throw new Error('Erro ao excluir os dados da API');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Erro ao excluir informações');
        });
    }

    else {
      const body = JSON.stringify({ usuario_id: userData.ID, cuidador_id: cuidadorId });

      fetch(url, { headers, method: "POST", body })
        .then((response) => {
          if (response.ok) {
            // Sucesso ao enviar os dados para a API
            console.log('Dados enviados com sucesso para a API');
          }

          else {
            // Erro ao enviar os dados para a API
            throw new Error('Erro ao enviar os dados para a API');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Erro ao inserir informações');
        });
    }
  };

  const enviarParaBancoDeDadosRecentes = async (method, favoriteId) => {
    const cuidadorId = usuario.id; // ID do cuidador
    const userData = await DadosUsuario(); // Usuário logado no aplicativo
    //const url2 = 'https://localhost:44396/api/recentesusu';
    const url2 = 'https://cuidadores.azurewebsites.net/api/recentesusu';


    const headers = await HeaderRequisicao();
    console.log(headers);

    if (method === 'DELETE') {
      // Adicione o ID do favorito na URL de exclusão
      fetch(`${url2}?usuario_id=${userData.ID}&cuidador_id=${cuidadorId}`, { headers, method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Sucesso ao excluir os dados da API
            console.log('Dados excluídos com sucesso da API');
          }

          else {
            // Erro ao excluir os dados da API
            throw new Error('Erro ao excluir os dados da API');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Erro ao excluir informações');
        });
    }

    else {
      const body = JSON.stringify({ usuario_id: userData.ID, cuidador_id: cuidadorId });

      fetch(url2, { headers, method: "POST", body })
        .then((response) => {
          if (response.ok) {
            // Sucesso ao enviar os dados para a API
            console.log('Dados enviados com sucesso para a API');
          }

          else {
            // Erro ao enviar os dados para a API
            throw new Error('Erro ao enviar os dados para a API');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Erro ao inserir informações');
        });
    }
  };

  const handleToggleFavorito = () => {
    setFavorito((prevFavorito) => !prevFavorito);

    if (favorito) {
      enviarParaBancoDeDados('DELETE', usuario.favoritoId);
    }

    else {
      enviarParaBancoDeDados('POST');
    }
  };

  const handleToggleRecentes = () => {
    setRecentes((prevRecentes) => !prevRecentes);

    if (recentes) {
      enviarParaBancoDeDadosRecentes('DELETE', usuario.recentesId);
    }

    else {
      enviarParaBancoDeDadosRecentes('POST');
    }
  };

  const renderEstrelas = () => {
    return [1, 2, 3, 4, 5].map((index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setClassificacao(index)}
        style={styles.estrela}
      >
        <Icon
          name={index <= classificacao ? 'star' : 'star-o'}
          size={18}
          color="gold"
        />
      </TouchableOpacity>
    ));
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={Detalhes_Recentes}>
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
          <TouchableOpacity onPress={handleToggleFavorito}>
            {favorito ? (
              <Icon name="heart" size={18} color="red" />
            ) : (
              <Icon name="heart-o" size={18} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.estrelasContainer}>{renderEstrelas()}</View>
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

export default CardUsuario;
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import CardFavorito from '../../components/Cards/CardFavorito';
import { HeaderRequisicao } from "../../AuthContext";

function tFavoritos({ searchTerm }) {
  const [usuarios, setUsuarios] = useState([]);

  async function ListarFavoritos() {
    const headers = await HeaderRequisicao();
    //fetch('https://localhost:44396/api/favoritosusu', {
    fetch('https://cuidadores.azurewebsites.net/api/favoritosusu', {
      method: 'GET', 
      headers
    })
      .then((response) => response.json())
      .then((json) => {
        const uniqueUsuarios = json.reduce((unique, favorito) => {
          if (!unique.some((item) => item.cuidador.id === favorito.cuidador.id)) {
            unique.push(favorito);
          }
          return unique;
        }, []);

        setUsuarios(uniqueUsuarios);
      })
      .catch((error) => {
        console.log(error);
        alert('Erro ao inserir informações');
      });
  }

  useEffect(() => {
    ListarFavoritos();
  }, []);

  const handleDeleteUsuario = (usuarioId) => {
    // Lógica de exclusão do usuário com o ID fornecido
    console.log(`Excluindo usuário com ID: ${usuarioId}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {usuarios.map((favorito, index) => (
          <CardFavorito
            usuario={favorito.cuidador}
            key={index}
            onDelete={() => handleDeleteUsuario(favorito.cuidador.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default tFavoritos;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F0F0F5',
      paddingVertical: 25,
  }
});
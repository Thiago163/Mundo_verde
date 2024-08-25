import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { HeaderRequisicao, DadosUsuario } from '../../AuthContext';
import CardUsuario from '../../components/Cards/CardRecente';
import styles from '../tRecentes/estilo';

function ListaDeRecentes({ searchTerm }) {
  const [recentes, setRecentes] = useState([]);

  async function ListarRecentes() {
    const userData = await DadosUsuario();
    const headers = await HeaderRequisicao();
    //const url = `https://localhost:44396/api/recentesusu`;
    const url = `https://cuidadores.azurewebsites.net/api/recentesusu`;

    fetch(url, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((json) => {
        setRecentes(json);
      })
      .catch((error) => {
        console.log(error);
        alert('Erro ao obter informações');
      });
  }

  useEffect(() => {
    ListarRecentes();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {recentes.map((recente) => (
          <CardUsuario
            usuario={recente.cuidador}
            key={recente.id}
            favorito={false} // Definindo o favorito como false para manter o coração vazio
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default ListaDeRecentes;
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { HeaderRequisicao } from '../../AuthContext';
import CardUsuario from '../../components/Cards/CardUsuario';

function ListaDeUsuarios({ searchTerm }) {
  const [usuarios, setUsuarios] = useState([]);

  async function ListarCuidadores() {
    const headers = await HeaderRequisicao();
    //fetch('https://localhost:44396/api/cuidadores', {
    fetch('https://cuidadores.azurewebsites.net/api/cuidadores', {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((json) => {
        setUsuarios(json);
      })
      .catch((error) => {
        console.log(error);
        alert('Erro ao inserir informações');
      });
  }

  useEffect(() => {
    ListarCuidadores();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      {filteredUsuarios.map((usuario, index) => (
        <CardUsuario usuario={usuario} key={index} />
      ))}
    </View>
  );
}

export default ListaDeUsuarios;
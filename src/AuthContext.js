import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "jwt-decode";

export async function SalvarJWT(jwtData) {
  //debugger;
  console.log('executou o salvar jwt')
  const userData = jwt(jwtData);

  await AsyncStorage.setItem("@jwt", jwtData);
  await AsyncStorage.setItem("@userData", JSON.stringify(userData));
}

export async function HeaderRequisicao() {
  const usuarioLogado = await ChecarLoginUsuario();

  if (usuarioLogado == false) {
    // Navegar('Login')
  }

  const token = await AsyncStorage.getItem("@jwt");

  return new Headers({
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
  });
}

export async function ChecarLoginUsuario() {

  //Verificar se tem o tokem armarzenado
  const token = await AsyncStorage.getItem("@jwt");
  console.log(token);

  if (!token) {
    return false;
  }

  //Pega os dados do usuario logado
  const userData = JSON.parse(await AsyncStorage.getItem("@userData"));

  //DEtermina o tempo que o usuario fica logado
  const actualDate = Date.parse(new Date()) / 1000;

  if (actualDate > userData.exp) {
    //usuario expirado
    await AsyncStorage.remove("@jwt");
    return false;
  }

  return true;
}

export async function DadosUsuario() {
  return JSON.parse(await AsyncStorage.getItem("@userData"));
}
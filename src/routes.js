import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import tCadastroFotoC from './pages/telasCadastroUsuario/CadastroUsuario/tCadastroFotoC';
import tCadastroInfoC from './pages/telasCadastroUsuario/CadastroUsuario/tCadastroInfoC';
import tCadastroLocalC from './pages/telasCadastroUsuario/CadastroUsuario/tCadastroLocalC';
import tEditarUsuarioCui from './pages/telasCadastroUsuario/tEditarUsuarioCui'
import tConfirmarSenhaCui from './pages/telasCadastroUsuario/tConfirmarSenhaCui'

import tCadastroFotoU from './pages/telasQuestionario/CadastroQuestionario/tCadastroFotoU';
import tCadastroInfoU from './pages/telasQuestionario/CadastroQuestionario/tCadastroInfoU';
import tCadastroLocalU from './pages/telasQuestionario/CadastroQuestionario/tCadastroLocalU';
import tConfirmarSenha from './pages/telasQuestionario/tConfirmarSenha'
import tEditarUsuario from './pages/telasQuestionario/tEditarUsuario'

import tEsqueciSenha from './pages/tEsqueciSenha';
import tNovaSenha from './pages/tNovaSenha';
import tSelecaoUser from './pages/tSelecaoUser/index';
import tLogin from './pages/tLogin/index';
import tDetalhes from './pages/tDetalhes';
import Routes2 from './routes2';
import Routes3 from './routes3';

const AppStack = createStackNavigator();
export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" screenOptions={{
                cardStyle: { backgroundColor: '#F0F0F5' }
            }}>
                <AppStack.Screen name="tLogin" component={tLogin} />
                <AppStack.Screen name="tCadastroFotoC" component={tCadastroFotoC} />
                <AppStack.Screen name="tCadastroFotoU" component={tCadastroFotoU} />
                <AppStack.Screen name="tCadastroInfoC" component={tCadastroInfoC} />
                <AppStack.Screen name="tCadastroInfoU" component={tCadastroInfoU} />
                <AppStack.Screen name="tCadastroLocalC" component={tCadastroLocalC} />
                <AppStack.Screen name="tCadastroLocalU" component={tCadastroLocalU} />
                <AppStack.Screen name="tEsqueciSenha" component={tEsqueciSenha} />
                <AppStack.Screen name="tSelecaoUser" component={tSelecaoUser} />
                <AppStack.Screen name="tNovaSenha" component={tNovaSenha} />
                <AppStack.Screen name="tDetalhes" component={tDetalhes} />
                <AppStack.Screen name="tConfirmarSenha" component={tConfirmarSenha} />
                <AppStack.Screen name="tConfirmarSenhaCui" component={tConfirmarSenhaCui} />
                <AppStack.Screen name="tEditarUsuario" component={tEditarUsuario} />
                <AppStack.Screen name="tEditarUsuarioCui" component={tEditarUsuarioCui} />
                <AppStack.Screen name="Routes2" component={Routes2} />
                <AppStack.Screen name="Routes3" component={Routes3} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
}
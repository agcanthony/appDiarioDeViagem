import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Form } from '../screens/Form';
import { CadastrarEntrada } from 'screens/Entrada/Cadastro';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          animation: 'slide_from_right',
          animationDuration: 200,
          statusBarTranslucent: true,
          statusBarStyle: 'auto',
        }}>
        <Screen name="Home" component={Home} />
        <Screen
          name="CadastrarViagemForm"
          component={Form}
          initialParams={{ title: 'Minha Viagem', apenasConsulta: false }}
        />
        <Screen
          name="ConsultarViagemForm"
          component={Form}
          initialParams={{ title: 'Minha Viagem', apenasConsulta: true }}
        />
        <Screen
          name="AlterarViagemForm"
          component={Form}
          options={{ animation: 'fade_from_bottom', animationDuration: 400 }}
          initialParams={{ title: 'Minha Viagem', apenasConsulta: false }}
        />
        <Screen
          name="CadastrarEntrada"
          component={CadastrarEntrada}
          initialParams={{ title: 'Entrada', apenasConsulta: false }}
        />
        <Screen
          name="ConsultarEntrada"
          component={CadastrarEntrada}
          initialParams={{ title: 'Entrada', apenasConsulta: true }}
        />
        <Screen
          name="AlterarEntrada"
          component={CadastrarEntrada}
          options={{ animation: 'fade_from_bottom', animationDuration: 400 }}
          initialParams={{ title: 'Entrada', apenasConsulta: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

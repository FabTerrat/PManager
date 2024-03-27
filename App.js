import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HeaderBox from './components/Header';

import Accueil from './pages/Accueil';
import NewEvent from './pages/NewEvent';
import Event from './pages/Event';
import Partages from './pages/Partages';
import Invite from './pages/Invite';
import NewResource from  "./pages/NewResource";

// import db from './data/database';

const Stack = createStackNavigator();



export default function App() {
  return (
  
    <NavigationContainer>
      <HeaderBox/>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="Event" component={Event} options={{ headerShown: false }} />
        <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: false }} />
        <Stack.Screen name="Partages" component={Partages}/>
        <Stack.Screen name="Invite" component={Invite} />
        <Stack.Screen name="NewResource" component={NewResource} options={{ title:"Ajouter une ressource"}}/>
        {/* Ajoutez d'autres écrans ici si nécessaire */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
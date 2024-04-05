import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {UserProvider} from './service/ContextProvider/UserContext';
import {EventProvider}  from './service/ContextProvider/EventContext';
import {ResourceProvider} from './service/ContextProvider/ResourceContext';
import {ParticipationProvider}  from './service/ContextProvider/ParticipationContext';
import {ContributionProvider}  from './service/ContextProvider/ContributionContext';

import HeaderBox from './components/Header';

// Importation des pages 
import Accueil from './pages/Accueil';
import NewEvent from './pages/NewEvent';
import Event from './pages/Event';
import Partages from './pages/Partages';
import Invite from './pages/Invite';
import NewResource from  "./pages/NewResource";

const Stack = createStackNavigator(); // Crée le bloc de navigation

// ------------------ Application principale créant le lien entre les pages via la navigation et propage les données ---------------
export default function App() {
  return (
    // Pour l'instant data lisibles par toutes les pages, A modifier éventuellement plus tard
    // Propagation des données à l'ensemble des pages pour faciliter leur appel
    <UserProvider>
    <EventProvider>
    <ResourceProvider>
    <ParticipationProvider>
    <ContributionProvider>
    <NavigationContainer>
      <HeaderBox/>
      <Stack.Navigator initialRouteName="Accueil"> 
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="Event" component={Event} options={{ headerShown: false }} />
        <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: false }} />
        <Stack.Screen name="Partages" component={Partages}/>
        <Stack.Screen name="Invite" component={Invite} />
        <Stack.Screen name="NewResource" component={NewResource} options={{ title:"Ajouter une ressource"}}/> 
        {/* ...  */}
      </Stack.Navigator>
    </NavigationContainer>

    </ContributionProvider>
    </ParticipationProvider>
    </ResourceProvider>
    </EventProvider>
    </UserProvider>
  );
}
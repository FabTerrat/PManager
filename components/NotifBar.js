import React from 'react';
import { View, StatusBar, } from 'react-native';

const NotifBar = () => {
  return (
    <View>
      <StatusBar
        backgroundColor="#1A237E" // Couleur de fond de la barre de statut
        barStyle="light-content" // Style du texte de la barre de statut (clair ou foncé)
      />
    </View>
  );
}

export default NotifBar;
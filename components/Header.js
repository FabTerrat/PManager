import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import NotifBar from './NotifBar'
import Icon from 'react-native-vector-icons/FontAwesome'

const HeaderBox = () => {
  return (
    <View>
      <NotifBar/>
    <View style={styles.safeArea}>
      <View style={styles.header_container}>
        <Text style={styles.header_title}>PartyManager</Text>
        <TouchableOpacity onPress={() => console.log('Settings clicked')}>
            <Icon name="cog" size={24} color="white" style={styles.settingsIcon} />
          </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    paddingTop: 20, // padding en haut pour s'assurer que le texte n'est pas collé au bord supérieur de la boîte
    paddingBottom: 20, // padding en bas pour un peu d'espace
    paddingHorizontal: 15, // padding horizontal pour un peu d'espace sur les côtés
    flexDirection: 'row', // disposition horizontale des éléments enfants
    alignItems: 'center', // alignement des éléments enfants sur l'axe vertical
    justifyContent: 'space-between', // alignement des éléments enfants sur l'axe horizontal
    backgroundColor : 'black',
  },
  header_title: {
    color: 'white', // couleur du texte du titre
    fontSize: 20, // taille de la police du titre
    fontWeight: 'bold', // graisse du texte en gras
  },
  settingsIcon: {
    marginLeft: 10, // Marge à gauche pour séparer le titre de l'icône
  },
});

export default HeaderBox;
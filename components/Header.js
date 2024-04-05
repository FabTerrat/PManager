import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NotifBar from './NotifBar'
import Icon from 'react-native-vector-icons/FontAwesome'

// --------- Composant permettant d'afficher Le titre en haut de page ---------   (+ un bouton paramètre non configuré) ------------------
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


// ------------- Style du header -----------------
const styles = StyleSheet.create({
  header_container: {
    paddingTop: 20, 
    paddingBottom: 20, 
    paddingHorizontal: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor : 'black',
  },
  header_title: {
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold', 
  },
  settingsIcon: {
    marginLeft: 10, 
  },
});

export default HeaderBox;
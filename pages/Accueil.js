import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles from '../theme/styles';

import EventContext from '../service/ContextProvider/EventContext';


// Fonction pour formater la date
export const formatDate = (timestamp) => {
  const dateObject = timestamp.toDate(); // Convertir le Timestamp en objet Date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('fr-FR', options); // Utilisez la locale 'fr-FR' pour formater la date en français
};

const ListItem = ({ date, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, styles.itemMargin]}>
      <View style={styles.itemContent}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


// ------------------Barre Footer-----------------------
const FooterBar = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.bottomBar}>
      <TouchableOpacity style={styles.button} >
        <Icon name="history" size={30} color="white" />
        <Text style={styles.buttonText}>Historique</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewEvent')}>
        <Icon name="add-circle" size={30} color="white" />
        <Text style={styles.buttonText}>Nouvel évènement</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


//-------------------MainPage------------------------------------------

const Accueil = ({ navigation }) => {

  // ------------------Données Test ----------------
  // const events = [
  //   { id: 1, date: '8 Août 2024', title: 'Pool Party chez Mario ', description: 'Description 1-2' },
  //   { id: 2, date: '2 Dec. 2026', title: 'Raclette de la Team', description: 'Description 2-2' },
  //   { id: 3, date: 'Item 3', title: 'Titre 3-1', description: 'Description 3-2' },
  //   { id: 4, date: 'Item 4', title: 'Titre 4-1', description: 'Description 1616465' }
  // ];

  const {events} = useContext(EventContext)

  const handleItemPress = (event) => {
    // Navigation vers la nouvel page en transmettant les informations de l'event selectionné
    navigation.navigate('Event', { event });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
    <ScrollView style={styles.container}>
      {events?.map((event) => (
        <ListItem
          key={event.id}
          date={formatDate(event.date)}
          title={event.title}
          description={event.description}
          onPress={() => handleItemPress(event)}
        />
      ))}
    </ScrollView>
    <FooterBar/>
    </View>
    </SafeAreaView>
  );
};


export default Accueil;
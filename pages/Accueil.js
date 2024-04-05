import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles from '../theme/styles';

import EventContext from '../service/ContextProvider/EventContext';


// ---------- Fonction pour formater la date ------------
export const formatDate = (timestamp) => {
  const dateObject = timestamp.toDate(); // Convertir le Timestamp en objet Date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('fr-FR', options); // Utilisez la locale 'fr-FR' pour formater la date en français
};


// -------- Permet de lister tous les événements lues  à l'identique / format de chaque item ----------
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
// Lien vers la page Nouvel Evénement
// Bouton Historique non configuré
const FooterBar = () => {
  const navigation = useNavigation();  // Permet de naviguer sur d'autres pages et transmettre également des paramètres
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

  //  Récupération des données events dans la base de données via le Context propre au user
  const {events} = useContext(EventContext)

  const handleItemPress = (event) => {
    // Navigation vers la nouvel page en transmettant les informations de l'event selectionné
    navigation.navigate('Event', { event });
  };

  // Lecture de tous les évènements un par un
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
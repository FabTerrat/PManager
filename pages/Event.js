import React, { useContext } from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
// import Icons from 'react-native-vector-icons/FontAwesome';
import PageRessource from '../components/Ressources';
import { formatDate } from './Accueil';
import UserContext , {UserProvider} from '../service/ContextProvider/UserContext';
import {ResourceProvider} from '../service/ContextProvider/ResourceContext';
import ParticipationContext,{ParticipationProvider}  from '../service/ContextProvider/ParticipationContext';
import {ContributionProvider}  from '../service/ContextProvider/ContributionContext';
// import { query } from 'firebase/firestore';




//-----------------Barre Footer ---------------------------------------

const FooterBar = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.bottomBar}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Accueil')}>
        <Icon name="arrow-back" size={40} color="white" />
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('NewResource')}>
        <Icon name="add-circle" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Partages')}>
        <Icon name="folder-shared" size={30} color="white" />
        <Text style={styles.buttonText}>Partages</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

  //-----------------Main page  ---------------------------------------
const Event = () => {

    const [currentPage, setCurrentPage] = useState('Infos'); // État pour suivre la page actuellement sélectionnée
  
    // Fonction pour changer la page actuellement sélectionnée
    const changePage = (page) => {
      setCurrentPage(page);
    };

    const navigation = useNavigation();
    const route = useRoute();
    const { event } = route.params; // Récupérer les données de l'événement depuis les paramètres de navigation

    const {participations} = useContext(ParticipationContext);
    const {users} = useContext(UserContext);
    const guests = participations.filter(participation => participation.eventId === event.id);
    // const guests = allUsers.filter(guest => guest.id === participation.userId)

    const nbParticipations = participations.length;



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.container}>
            <View style={styles_Event.presentation}>
              {/* Titre en gros centré en haut */}
              <Text style={styles_Event.title}>{event.title}</Text>
              
              {/* Information (ex. Date) */}
              <Text style={styles_Event.date}>{formatDate(event.date)}</Text>
              
              {/* Description en gris */}
              <Text style={styles_Event.description}>{event.description}</Text>

              {/* Barre de navigation */}
          <ScrollView
            horizontal
            contentContainerStyle={styles_Event.navigationBar}
            showsHorizontalScrollIndicator={false}
            style={styles.middleNavBar}
            onScroll={(event) => {
              setScrollPosition(event.nativeEvent.contentOffset.x);
            }}
            scrollEventThrottle={16}>
            <TouchableOpacity
              style={[styles_Event.tab, currentPage === 'Infos' && styles_Event.activeTab]}
              onPress={() => changePage('Infos')}>
              <Text style={[styles_Event.tabText, currentPage === 'Infos' && styles_Event.activeTabText]}>Infos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles_Event.tab, currentPage === 'Ressources' && styles_Event.activeTab]}
              onPress={() => changePage('Ressources')}>
              <Text style={[styles_Event.tabText, currentPage === 'Ressources' && styles_Event.activeTabText]}>Ressources</Text>
            </TouchableOpacity>
          </ScrollView>
            </View>
          


        {/* Contenu en dessous de la barre de navigation */}
        {currentPage === 'Infos' ? (
            <View>
              {/* Contenu pour la page Info */}
              {/* Légendes */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <Text style={styles.legendDescription}>Theme </Text>
              <Text style={styles.infoText}>{event.theme}</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendDescription}>Organisateur</Text>
              <Text style={styles.infoText}>{event.organizer}</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendDescription}>Lieu</Text>
              <Text style={styles.infoText}>{event.address}</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendDescription}>Commentaire</Text>
              <Text style={styles.infoText}>{event.comment}</Text>
            </View>
          </View>

          {/* Lien pour le nombre d'invités */}
          <TouchableOpacity style={styles_Event.button} onPress={() => navigation.navigate('Invite')}>
            <Text style={styles_Event.buttonTextTop}>Nombre d'invités: {nbParticipations}</Text>
            <Text style={styles_Event.buttonTextBottom}>Voir les invités</Text>
          </TouchableOpacity>
        </View>
          ) : (
            //------------------------------Page ressources --------------------------------
            <View style={styles.container}>
              <ResourceProvider/>
              <UserProvider>
              <ParticipationProvider>
              <ContributionProvider >
                <PageRessource event={event} />
              </ContributionProvider>
              </ParticipationProvider>
              </UserProvider>
              <ResourceProvider/>
            </View>
          )}

          
      </ScrollView>
      <FooterBar/>
    </View>
    
    </SafeAreaView>
  );
};

const styles_Event = StyleSheet.create({

  presentation: {
    flexDirection : 'column',
    alignItems: 'center',
    marginBottom : 10,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  date: {
    flexDirection : 'row',
    alignItem : 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40, // Ajustez selon votre préférence
    marginBottom: 20,
    height : 60,
    backgroundColor: 'lightblue', // Couleur de fond de la barre de navigation
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 35, 
  },
  activeTab: {
    borderRadius: 20,
    backgroundColor: '#1A237E', // Couleur de fond de l'onglet actif
  },
  tabText: {
    fontSize: 18,
    color: 'white',
  },
  activeTabText: {
    fontWeight: 'bold', // Texte en gras pour l'onglet actif
  },

  link: {
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    marginBottom: 20,
    width: '100%', // Pour étendre le bouton sur toute la largeur
  },
  button: {
    alignItems: 'center',
    backgroundColor : 'gray',
    margin : 10,
    alignContent : 'center',
  },
  buttonTextTop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5, // Pour ajouter de l'espace entre les lignes
  },
  buttonTextBottom: {
    fontSize: 18,
    color: 'white',
  },
});

export default Event;


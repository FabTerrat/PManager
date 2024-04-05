import React, { useContext } from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
// import Icons from 'react-native-vector-icons/FontAwesome';
import PageRessource from './Resources';
import { formatDate } from './Accueil';
import UserContext , {UserProvider} from '../service/ContextProvider/UserContext';
import {ResourceProvider} from '../service/ContextProvider/ResourceContext';
import ParticipationContext,{ParticipationProvider}  from '../service/ContextProvider/ParticipationContext';
import {ContributionProvider}  from '../service/ContextProvider/ContributionContext';
// import { query } from 'firebase/firestore';




//-----------------Barre Footer ---------------------------------------
// Retour vers Accueil / Navigation vers Newresource / Navigation vers Partages

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

    // Récupération des données
    const route = useRoute(); 
    const { event } = route.params; // Récupérer les données de l'événement depuis les paramètres de navigation


    // ------------Préparation à afficher la requête finale pour afficher seulement les invités de l'évènement -------------
    // const {participations} = useContext(ParticipationContext);
    // const guests = participations.filter(participation => participation.eventId === event.id); 
    // // const guests = allUsers.filter(guest => guest.id === participation.userId)

    // Récupération de tous les users pour le moment 
    const {users} = useContext(UserContext);
    const nbParticipations = users.length;



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.container}>
            <View style={styles_Event.presentation}>
              {/* Titre de l'événement*/}
              <Text style={styles_Event.title}>{event.title}</Text>
              
              {/* Date de l'événement */}
              <Text style={styles_Event.date}>{formatDate(event.date)}</Text>
              
              {/* Description de l'événement */}
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
              {/* Implémentation de la barre d'onglet */}
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
              {/* ---------------- Contenu pour la page Info------------------- */}
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

          {/* Lien pour le nombre d'invités  (tous les users pour le moment) */}
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



// ----------------- style de la page ----------------------
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
    paddingHorizontal: 40, 
    marginBottom: 20,
    height : 60,
    backgroundColor: 'lightblue', 
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 35, 
  },
  activeTab: {
    borderRadius: 20,
    backgroundColor: '#1A237E', 
  },
  tabText: {
    fontSize: 18,
    color: 'white',
  },
  activeTabText: {
    fontWeight: 'bold', 
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
    width: '100%', 
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
    marginBottom: 5, 
  },
  buttonTextBottom: {
    fontSize: 18,
    color: 'white',
  },
});

export default Event;


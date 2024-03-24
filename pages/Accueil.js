import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles from '../theme/styles';




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
  const events = [
    { id: 1, date: '8 Août 2024', title: 'Pool Party chez Mario ', description: 'Description 1-2' },
    { id: 2, date: '2 Dec. 2026', title: 'Raclette de la Team', description: 'Description 2-2' },
    { id: 3, date: 'Item 3', title: 'Titre 3-1', description: 'Description 3-2' },
    { id: 4, date: 'Item 4', title: 'Titre 4-1', description: 'Description 1616465' }
    // Add more items as needed
  ];


  // useEffect(() => {
  //   db.collection('events')
  //     .get()
  //     .then(querySnapshot => {
  //       const eventsData = [];
  //       querySnapshot.forEach(doc => {
  //         eventsData.push({ id: doc.id, ...doc.data() });
  //       });
  //       setEvents(eventsData);
  //     })
  //     .catch(error => {
  //       console.error('Error getting documents: ', error);
  //     });
  // }, []);



  const handleItemPress = (item) => {
    // Navigate to a new page with details of the selected item
    navigation.navigate('Event', { item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
    <ScrollView style={styles.container}>
      {events?.map(item => (
        <ListItem
          key={item.id}
          date={item.date}
          title={item.title}
          description={item.description}
          onPress={() => handleItemPress(item.id)}
        />
      ))}
    </ScrollView>
    <FooterBar/>
    </View>
    </SafeAreaView>
  );
};


export default Accueil;
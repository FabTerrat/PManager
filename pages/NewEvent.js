import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles, {styles_New} from '../theme/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addDoc, collection } from 'firebase/firestore';


import db from '../service/FireConfig';


// ------------------------Footer Bar -----------------------------------------------------
// Lien de retour et lien de validation

const FooterBar = ({handleSaveEvent, navigation}) => {

  return (
    <SafeAreaView style={styles.bottomBar}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Accueil')}> 
        <Icon name="arrow-back" size={40} color="white" />
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
        <Icon name="check-circle" size={40} color="white" />
        <Text style={styles.buttonText}>Valider - nouvel évènement</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// ---------------------- Main Page - New Event ----------------------------------
const NewEvent = ({}) => {

  const navigation = useNavigation();

  // L'initialisation des données à rentrée dans le nouvel événement
  const [titleData, setTitle] = useState('');
  const [descriptionData, setDescription] = useState('');
  const [dateData, setDate] = useState( new Date() );
  const [organizerData, setOrganizer] = useState('');
  const [themeData, setTheme] = useState('');
  const [addressData, setAddress] = useState('');
  const [commentData, setComment] = useState('');

  const [eventData, setEventData] = useState(new Date());

  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  // ----------------Fonction pour gérer la date / TimeStamp ------
  // Modifier la fonction handleDateChange
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateData;
    setShowDatePicker(false);
    setShowTimePicker(true);
    setDate(currentDate); // Mettre à jour l'état de la date
    setTempDate(currentDate); // Mettre à jour la date temporaire sélectionnée
    setEventData(currentDate); // Mettre à jour l'état de la date de l'événement
  };

  // Modifier la fonction handleTimeChange
  const handleTimeChange = (event, selectedTime) => {
    const currentDate = new Date(dateData);
    currentDate.setHours(selectedTime.getHours());
    currentDate.setMinutes(selectedTime.getMinutes());
    setShowTimePicker(false);
    setEventData(currentDate); // Mettre à jour l'état de l'heure de l'événement
  };

  // -------------- fonction d'ajout de l'événement
  const handleSaveEvent = async () => {
    try {
      // Utilisez addDoc pour ajouter des données à la collection "events"
      await addDoc(collection(db, 'events'), {
        title: titleData,
        description: descriptionData,
        organizer: organizerData,
        theme: themeData,
        address: addressData,
        comment: commentData,
        date: dateData
      }); 
      navigation.navigate('Accueil'); // => retour à l'écran d'Accueil
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  };

  // ---------------- Les champs de la page ------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
    <ScrollView style={styles_New.container}>
    <Text style={styles_New.title}>Nouvel évènement</Text>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Titre</Text>
        <TextInput style={styles_New.input} onChangeText={value => setTitle(value)}/>
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Description</Text>
        <TextInput style={styles_New.input} onChangeText={value => setDescription(value)}/>
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Date et Heure</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={{ flex: 1 }}>
            <Text>
              {dateData.toLocaleString()}
            </Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
        <DateTimePicker
          value={tempDate} // Utiliser tempDate pour la sélection de la date
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={dateData} // Utiliser dateData pour la sélection de l'heure
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Organisateur</Text>
        <TextInput style={styles_New.input} onChangeText={value => setOrganizer(value)} />
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>thème</Text>
        <TextInput style={styles_New.input} onChangeText={value => setTheme(value)} />
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Lieu</Text>
        <TextInput style={styles_New.input} onChangeText={value => setAddress(value)} />
      </View>
      <View style={styles_New.fieldContainer}>
        <Text style={styles_New.label}>Commentaire</Text>
        <TextInput style={styles_New.input}  onChangeText={value => setComment(value)} />
      </View>
      <Text></Text>
      <Text></Text>
    
    </ScrollView>
    <FooterBar handleSaveEvent={handleSaveEvent} navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};


export default NewEvent;




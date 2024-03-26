import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles from '../theme/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addDoc, collection } from 'firebase/firestore';


import db from '../service/FireConfig';


// ------------------------Footer Bar -----------------------------------------------------
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

// ---------------------- Main Page New Event ----------------------------------
const NewEvent = ({}) => {

  const navigation = useNavigation();

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
      navigation.navigate('Accueil');
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
    <ScrollView style={styles_NewEvent.container}>
    <Text style={styles_NewEvent.title}>Nouvel évènement</Text>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Titre</Text>
        <TextInput style={styles_NewEvent.input} onChangeText={value => setTitle(value)}/>
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Description</Text>
        <TextInput style={styles_NewEvent.input} onChangeText={value => setDescription(value)}/>
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Date et Heure</Text>
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
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Organisateur</Text>
        <TextInput style={styles_NewEvent.input} onChangeText={value => setOrganizer(value)} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>thème</Text>
        <TextInput style={styles_NewEvent.input} onChangeText={value => setTheme(value)} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Lieu</Text>
        <TextInput style={styles_NewEvent.input} onChangeText={value => setAddress(value)} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Commentaire</Text>
        <TextInput style={styles_NewEvent.input}  onChangeText={value => setComment(value)} />
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


// Styles
const styles_NewEvent = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
});

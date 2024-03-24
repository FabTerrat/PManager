import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importez l'icône FontAwesome
import styles from '../theme/styles';



const ListItem = ({ date, title, description, onPress }) => {
  const navigation = useNavigation();
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


const FooterBar = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.bottomBar}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Accueil')}> 
        <Icon name="arrow-back" size={40} color="white" />
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="check-circle" size={40} color="white" />
        <Text style={styles.buttonText}>Valider - nouvel évènement</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const NewEvent = ({ navigation }) => {
  const items = [
    { id: 1, date: '02/01/2024', title: 'Je vois pas ', description: 'Description 1-2' },
    { id: 2, date: 'Item 2', title: 'Quoi ???', description: 'Description 2-2' },
    { id: 3, date: 'Item 3', title: 'Titre 3-1', description: 'Description 3-2' },
    { id: 4, date: 'Item 4', title: 'Titre 4-1', description: 'Description 1616465' }
    // Add more items as needed
  ];

  const handleItemPress = (itemId) => {
    // Navigate to a new page with details of the selected item
    navigation.navigate('ItemDetails', { itemId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
    <ScrollView style={styles_NewEvent.container}>
    <Text style={styles_NewEvent.title}>Nouvel évènement</Text>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Titre</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Description</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Date</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Organisateur</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>thème</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Lieu</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Commentaire</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <View style={styles_NewEvent.fieldContainer}>
        <Text style={styles_NewEvent.label}>Participants</Text>
        <TextInput style={styles_NewEvent.input} />
      </View>
      <Text></Text>
      <Text></Text>
    
    </ScrollView>
    <FooterBar/>
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

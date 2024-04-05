import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import styles, {styles_New} from '../theme/styles';
import style_res from './Resources';
import { collection, addDoc } from 'firebase/firestore';
import db from '../service/FireConfig';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';


// ------------- Main Page - Nouvelle Ressource -------------------------------
const AddResource = ({}) => {   //{navigation}
  // Initialisation des paramètres de la ressource à entrer
  const [proprio, setProprio] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('A');
  const [quantity, setQuantity] = useState('');
  const [toShare, setToShare] = useState(1);

  // Fonction d'ajout (non fonctionnelle)
  const handleAddResource = async () => {
    try {
        // Ajoutez la nouvelle ressource à l'événement
        const docRef = await addDoc(collection(db, 'contributions'), {
            proprio,
            nom: name,
            category,
            quantity,
            toShare,
            // Ajouter les autres champs plus tard
        });
          console.log('Document written with ID: ', docRef.id);

          // Réinitialiser les champs après l'ajout de la ressource
          setProprio('');
          setName('');
          setCategory('A');
          setQuantity('');
          setToShare(1);
      } catch (error) {
          console.error('Error adding document: ', error);
      }
  };

  // Champs des paramètres à entrer pour l'ajout de la ressource
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles_New.contentContainer}>
        <View style={styles_New.legendContainer}>
          <Text style={styles_New.legendRessource}>Ajouter une nouvelle ressource</Text>
        </View>
        <View style={styles_New.inputContainer}>
          <View style={style_res.inputRow}>
            <View style={styles_New.legendContainer}>
              <Text style={style_res.legendText}>Propriétaire</Text>
            </View>
            <View style={style_res.nameContainer}>
              <TextInput
                style={style_res.nameText}
                placeholder="Propriétaire"
                value={proprio}
                onChangeText={setProprio}
              />
            </View>
          </View>
          <View style={style_res.inputRow}>
            <View style={style_res.legendContainer}>
              <Text style={style_res.legendText}>Nom</Text>
            </View>
            <View style={style_res.nameContainer}>
              <TextInput
                style={style_res.nameText}
                placeholder="Nom"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          <View style={styles_New.inputRow}>
            <View style={styles_New.legendContainer}>
              <Text style={styles_New.legendText}>Catégorie</Text>
              <Text>("A", "B", "J", ou "X" / Aliment, Boisson, Jeux, Autre)</Text>
            </View>
            <View style={style_res.logoContainer}>
              {category === 'A' && (
                <Icon name="food-bank" size={40} color="black" />
              )}
              {category === 'B' && (
                <Icons name="drink" size={40} color="black" />
              )}
              <TextInput
                style={styles_New.legendRessource}
                placeholder="Catégorie"
                value={category}
                onChangeText={setCategory}
              />
            </View>
          </View>
          <View style={styles_New.inputRow}>
            <View style={styles_New.legendContainer}>
              <Text style={styles_New.legendText}>Quantité</Text>
            </View>
            <View style={styles_New.quantityContainer}>
              <TextInput
                style={styles_New.quantityText}
                placeholder="Quantité"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>
          </View>
          <View style={styles_New.inputRow}>
            <View style={styles_New.legendContainer}>
              <Text style={styles_New.legendText}>Partage</Text>
            </View>
            <View style={styles_New.toShareContainer}>
              <Icon
                name="safety-divider"
                size={50}
                color="black"
                onPress={() => setToShare(toShare === 1 ? 0 : 1)}
              />
              <Text style={styles_New.legendRessource}>
                {/*  Permet en un clic sur l'icone de changer le statut de partage */}
                {toShare === 1 ? 'Partager les frais' : 'Ne pas partager les frais'}
              </Text>
            </View>
          </View>
        </View>
        <Button title="Ajouter la ressource" onPress={handleAddResource} margin='5'/> 

      </View>
    </SafeAreaView>
  );
}; 

export default AddResource;



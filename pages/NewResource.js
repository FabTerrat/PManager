import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import styles from '../theme/styles';
import style_res from '../components/Ressources';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';

const AddResource = ({}) => {   //{navigation}
  const [proprio, setProprio] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('A');
  const [quantity, setQuantity] = useState('');
  const [toShare, setToShare] = useState(1);

  const handleAddResource = () => {
    // Ajouter la logique pour enregistrer la nouvelle ressource
    console.log('Nouvelle ressource ajoutée :', {
      proprio,
      name,
      category,
      quantity,
      toShare,
    });

    // Réinitialiser les champs après l'ajout de la ressource
    setProprio('');
    setName('');
    setCategory('A');
    setQuantity('');
    setToShare(1);
  };

  return (
    <SafeAreaView style={style_re.safeArea}>
      <View style={style_re.contentContainer}>
        <View style={style_re.legendContainer}>
          <Text style={style_re.legendRessource}>Ajouter une nouvelle ressource</Text>
        </View>
        <View style={style_res.inputContainer}>
          <View style={style_res.inputRow}>
            <View style={style_res.legendContainer}>
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
          <View style={style_res.inputRow}>
            <View style={style_res.legendContainer}>
              <Text style={style_res.legendText}>Catégorie</Text>
            </View>
            <View style={style_res.logoContainer}>
              {category === 'A' && (
                <Icon name="food-bank" size={40} color="black" />
              )}
              {category === 'B' && (
                <Icons name="drink" size={40} color="black" />
              )}
              <TextInput
                style={style_re.legendRessource}
                placeholder="Catégorie"
                value={category}
                onChangeText={setCategory}
              />
            </View>
          </View>
          <View style={style_res.inputRow}>
            <View style={style_res.legendContainer}>
              <Text style={style_res.legendText}>Quantité</Text>
            </View>
            <View style={style_res.quantityContainer}>
              <TextInput
                style={style_res.quantityText}
                placeholder="Quantité"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>
          </View>
          <View style={style_res.inputRow}>
            <View style={style_res.legendContainer}>
              <Text style={style_res.legendText}>Partage</Text>
            </View>
            <View style={style_res.toShareContainer}>
              <Icon
                name="safety-divider"
                size={50}
                color="black"
                onPress={() => setToShare(toShare === 1 ? 0 : 1)}
              />
              <Text style={style_re.legendRessource}>
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


const style_re = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  legendContainer: {
    marginBottom: 10,
  },

})
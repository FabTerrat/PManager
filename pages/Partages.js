import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '../components/CheckBox';

const ListResources = ({ proprio, name, category, quantity, toShare, price, nbMax, onPress, checkBoxValue }) => {
    
    // ---- A modif avec BDD -----------
    const [maxPersons, setMaxPersons] = useState(1);
    const handleCheckBoxChange = (value) => {
        if (value === 1) {
            setMaxPersons(maxPersons + 1);
        } else {
            setMaxPersons(maxPersons - 1);
        }
    }
    return (
        <SafeAreaView style={style_res.container}>

                <Text style={style_res.proprio}>{proprio}</Text>
                <View style={style_res.itemContainer}>
                    {/* Première partie: Logo */}                
                    <View style={style_res.logoContainer}>
                        <Icon name="food-bank" size={40} color="black" />
                    </View>
                                    
                {/* Deuxième partie: Nom */} 
                <View style={style_res.nameContainer}>
                <Text style={style_res.nameText}>{name}</Text>
            </View>
            {/* Troisième partie: Quantité */} 
            <View style={style_res.quantityContainer}>
                <Text style={style_res.quantityText}>*{quantity}</Text>
            </View>
            {/* Quatrième partie: Checkbox et Prix */} 
            
                <View style={style_res.toShareContainer}>
                    <CheckBox onValueChange={handleCheckBoxChange} value={checkBoxValue}/>
                    <Text style={style_res.maxPersonsText}>{maxPersons}/{nbMax}Max</Text>
                </View>
                {checkBoxValue === 1 && maxPersons > 1 && (
                <Text style={style_res.plusOneContributorText}>+1 contributeur</Text>
                )}
                <Text style={style_res.priceText}>{price}</Text>
                </View>

        </SafeAreaView>
    );
};

const PageRessource = ({ navigation }) => {
    const resource = [
        { id: 1, proprio : 'Tom', nom : 'Pomme', categorie: 'Aliment', quantity : "2", toShare: 1, price : "8$", nbMax: 3 },
        { id: 2, proprio : 'Malick', nom : "jus de pomme", categorie: 'B', quantity : "2L", toShare: 1, price : "2.3$", nbMax: 3 },
        { id: 3, proprio : 'Malick', nom : "noix", categorie: 'Aliment', quantity : "1kg",toShare: 0, price : "2.3$", nbMax: 1 },
        { id: 4, proprio : 'Malick', nom : "jus de carotte", categorie: 'B', quantity : "3L", toShare: 0, price : "2.3$", nbMax: 0 },
    ];

    const handleResourcePress = (resources_id) => {
        // Navigate to a new page with details of the selected item
        navigation.navigate('Partage', { event_id, resources_id });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* <Text style={styles.legendRessource}>Catégorie</Text>
            <Text style={styles.legendRessource}>Nom</Text>
            <Text style={styles.legendRessource}>Quantité</Text>
            <Text style={styles.legendRessource}>Partage</Text> */}
            <View style={styles.contentContainer}>
            {resource.map(resource => (
    // Vérifie si toShare est égal à 1
    resource.toShare === 1 && (
        <ListResources
            key={resource.id}
            proprio={resource.proprio}
            name={resource.nom}
            category={resource.categorie} /* Mise à jour de la propriété category */
            quantity={resource.quantity}
            toShare={resource.toShare}
            price={resource.price}
            nbMax={resource.nbMax}
            onPress={() => handleResourcePress(resource.id)}
        />
    )
))}
            </View>
        </SafeAreaView>
    );
};

const style_res = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    proprio: {
        fontSize: 14,
        marginBottom: 5
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    nameContainer: {
        flex: 2,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flex: 1,
    },
    quantityText: {
        fontSize: 16,
    },
    toShareContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    maxPersonsText: {
        marginRight: 5,
        fontSize: 16,
    },
    priceText: {
        fontSize: 25,
        fontStyle: 'Bold',
        margin: 5,
    },
});

export default PageRessource;
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import styles from '../theme/styles';
import ResourceContext from '../service/ContextProvider/ResourceContext';
import UserContext from '../service/ContextProvider/UserContext';
import ParticipationContext from '../service/ContextProvider/ParticipationContext';
import ContributionContext from '../service/ContextProvider/ContributionContext';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Entypo';


// -------------format de chaque ressource affichée -----------------
const ListResources = ({ proprio, name, category, quantity, toShare}) => {
  
    return (
        <SafeAreaView style={style_res.container}>
            <Text style={style_res.proprio}>{proprio}</Text>
            <View style={style_res.itemContainer}>
                {/* Première partie: Logo des catégories */}
                {category === 'A' && (
                    <View style={style_res.logoContainer}>
                        <Icon name="food-bank" size={40} color="black" />
                    </View>
                )}
                {category === 'B' && (
                    <View style={style_res.logoContainer}>
                        <Icons name="drink" size={40} color="black" />
                    </View>
                )}

                {/* Deuxième partie: Nom */}
                <View style={style_res.nameContainer}>
                    <Text style={style_res.nameText} numberOfLines={2}>{name}</Text>
                </View>
                {/* Troisième partie: Quantité */}
                <View style={style_res.quantityContainer}>
                    <Text style={style_res.quantityText}>*{quantity}</Text>
                </View>
                {/* Si ressource partageable financièrement : logo de partage financier */}
                {toShare === "1" && (
                    <View style={style_res.toShareContainer}>
                        <Icon name="safety-divider" size={20} color="black" />
                        <Icon name="currency-exchange" size={20} color="black" />
                    </View>
                )}
                {/* Si ressource non partageable financièrement : mettre ok */}
                {toShare === "0" && (
                    <View style={style_res.toShareContainer}>
                        <Icon name="safety-divider" size={20} color="black" />
                        <Text>Ok</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};


// ---------------------- Main Page - Ressource ------------------------------------------------
const PageRessource = ({ event }) => {
    
    // --------Données tests utilisée également dans la partie partage--------------
    // const resource = [
    //     { id: 1, proprio : 'Tom', nom : 'Pomme', category: 'A', quantity : "2", toShare: 1},
    //     { id: 2, proprio : 'Malick', nom : "jus de pomme", category: 'B', quantity : "2L", toShare: 1},
    //     { id: 3, proprio : 'Malick', nom : "noix", category: 'A', quantity : "1kg",toShare: 0},
    //     { id: 4, proprio : 'Malick', nom : "jus de carotte", category: 'B', quantity : "3L", toShare: 0},
    // ];

    //Récupération des données nécessaires
    const {resources} = useContext(ResourceContext);
    const {allUsers} = useContext(UserContext);
    const {allParticipations}=useContext(ParticipationContext);
    const {allContributions}=useContext(ContributionContext);

    // -----------Partie Non fonctionnelle qui devrait permettre de récupérer tous les éléments nécessaire à donner les infos d'une ressource---
    // const [resources, setResources] = useState([]); ... Bonne utilisation de if et query : Non réussi

    
    //  Affichage des éléments ressources / Pour l'instant, toutes les ressources sont présentes
    return (
        <SafeAreaView style={styles.safeArea}>
            <SafeAreaView style={style_res.legendItemContainer}>
            <Text style={styles.legendRessource}>Catégorie</Text>
            <Text style={styles.legendRessource}>Nom</Text>
            <Text style={styles.legendRessource}>Quantité</Text>
            <Text style={styles.legendRessource}>Partage</Text>
            </SafeAreaView>
            <View style={styles.contentContainer}>
                {resources.map(contribution => (
                    <ListResources
                        key={contribution.id}
                        proprio="Nom du propriétaire"  // Devra rendre le user.username du user dont contribution.userId = user.id
                        name={contribution.name} // Rend le resource.name de la resource dont contribution.resourceId = resource.id
                        category={contribution.category} // Rend le categories.name de la resource dont resource.category=categorie.id et contribution.resourceId = resource.id
                        quantity={contribution.quantity} // Rend le resource.quantity de la resource dont contribution.resourceId = resource.id
                        toShare={contribution.toShare} // Rend le resource.toShare de la resource dont contribution.resourceId = resource.id
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};



// ----------------- style de la page ----------------------
export const style_res = StyleSheet.create({
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
    legendItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight : 'Bold',
        justifyContent : 'space-between',
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
        width: '30%',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
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
        fontSize: 16,
    },
});

export default PageRessource;
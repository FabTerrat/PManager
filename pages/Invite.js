import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from '../service/ContextProvider/UserContext';


const ListGuest = ({ username, status, onPress, onDelete }) => {
    
    if (status === 1) {
        callStatus = "Admin";
    } else if (status === 0) {
        callStatus = "Guest";
    } else {
        callStatus = "Autre";
    } 
    
    return (
        <SafeAreaView style={style_res.container}>
            <View style={style_res.itemContainer}>
            <Text style={style_res.nameText}> {username} - {callStatus} </Text>
            {status !== 1 && (
                <Icon
                    name="delete"
                    size={24}
                    color="red"
                    onPress={onDelete}
                />
            )}
            </View>
        </SafeAreaView>
    );
};

const PageInvite = ({ navigation }) => {
    // const guests = [
    //     { id: 1, name : 'Tom', status : 'Admin' },
    //     { id: 2, name : 'Louis', status : 'Guest' },
    //     { id: 3, name : 'Margerite', status : 'Guest' },
    //     { id: 4, name : 'Ninon', status : 'Guest' },
    // ];

    // const handleGuestPress = (id) => {
    //     // Navigate to the guest's details page
    // };

    const {users, deleteUser}  = useContext(UserContext);

    //Supprimer l'utilisateur avec son id
    const handleDeletePress = (id) => {
        deleteUser(id);
    };

    const handleAddGuestPress = () => {
        // A implémenter pour faire voir le profil 
    }

    return (
        <View style={style_res.container}>
            {users.slice() // Crée une copie du tableau pour éviter de modifier l'ordre des éléments dans l'original
            .sort((a, b) => b.status - a.status) // Trie les utilisateurs en fonction de leur statut
            .map((guest) => (
                <ListGuest
                    key={guest.id}
                    username={guest.username}
                    status={guest.status}
                    onPress={() => handleGuestPress(guest.id)}
                    onDelete={ () => handleDeletePress(guest.id)}
                />               
            ))}
            <TouchableOpacity onPress={handleAddGuestPress} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add guest</Text>
            </TouchableOpacity>
        </View>
    );
};


const style_res = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align delete button to the end of the row
      },
      nameText: {
        fontSize: 16,
        marginRight: 10, // Add some space between name and delete button
      },
});

export default PageInvite;
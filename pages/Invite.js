import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';


const ListGuest = ({ name, status, onPress }) => {
  
    return (
        <SafeAreaView style={style_res.container}>
                <Text style={style_res.nameText}> {name} - {status} </Text>
        </SafeAreaView>
    );
};

const PageInvite = ({ navigation }) => {
    const guest = [
        { id: 1, name : 'Tom', status : 'Admin' },
        { id: 2, name : 'Louis', status : 'Guest' },
        { id: 3, name : 'Margerite', status : 'Guest' },
        { id: 4, name : 'Ninon', status : 'Guest' },

    ];


    // const handleProfilPress = (participation_id) => {
    //     // Navigate to a new page with details of the selected item
    //     navigation.navigate('Profil', { event_id, profile_id });
    // };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
            {guest.map(guest => (
        <ListGuest
            key={guest.id}
            name={guest.name}
            status={guest.status}
            // onPress={() => handleProfilPress(guest.id)}
        />
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PageInvite;
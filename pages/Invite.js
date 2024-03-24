import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import styles from '../theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';


const ListGuest = ({ name, status, onPress, onDelete }) => {
    return (
        <SafeAreaView style={style_res.container}>
            <View style={style_res.itemContainer}>
            <Text style={style_res.nameText}> {name} - {status} </Text>
            {status.toLowerCase() !== 'admin' && (
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
    const guests = [
        { id: 1, name : 'Tom', status : 'Admin' },
        { id: 2, name : 'Louis', status : 'Guest' },
        { id: 3, name : 'Margerite', status : 'Guest' },
        { id: 4, name : 'Ninon', status : 'Guest' },
    ];

    // const handleGuestPress = (id) => {
    //     // Navigate to the guest's details page
    // };

    const handleDeletePress = (id) => {
        // Delete the guest with by his id
        setGuests(guests.filter((guest) => guest.id !== id));
    };

    return (
        <View style={style_res.container}>
            {guests.map((guest) => (
                <ListGuest
                    key={guest.id}
                    name={guest.name}
                    status={guest.status}
                    onPress={() => handleGuestPress(guest.id)}
                    onDelete={guest.status !== 'Admin' ? () => handleDeletePress(guest.id) : undefined}
                />
            ))}
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
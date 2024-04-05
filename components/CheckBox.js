import React, {useState} from "react";
import {Feather} from '@expo/vector-icons';
import {TouchableOpacity}  from 'react-native';

//------- Création du CheckBox : chaque clic permet le changement d'état entre coché ou non. -----------
const CheckBox = () => {
    const [isChecked, setChecked] = useState(0);

    return (
        <TouchableOpacity onPress={()=> setChecked(isChecked ? 0 : 1)}>
            <Feather name={ isChecked === 1 ? 'check-square' : 'square'} size={24} color={'black'}/>
        </TouchableOpacity>
    )
}


export default CheckBox;
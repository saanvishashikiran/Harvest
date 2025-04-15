import { StyleSheet, Text, View, Image, ScrollView, TextInput, Alert, TouchableOpacity} from 'react-native';
import React from "react"
import * as ImagePicker from 'expo-image-picker'
import DropDownPicker from 'react-native-dropdown-picker'

const buttonPress = () => {
    Alert.alert("Button pressed!")
}


const PickerPersonalProfile = () => {
    const [name, nameChange] = React.useState('')
    const [phoneNumber, phoneChange] = React.useState('')
    const [email, emailChange] = React.useState('')
    const [experience, experienceChange] = React.useState('')
    const [location, locationChange] = React.useState('')
    const [bio, bioChange] = React.useState('')
    const [profile, setImage] = React.useState<string | null >(null);
    const [open, isOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: 'Coffee', value: 'coffee'},
        {label: 'Tea', value: 'tea'},
        {label: 'Equipment', value: 'equipment'},
        {label: 'Splicing', value: 'splicing'},
        {label: 'Pesticides', value: 'pesticides'},
        {label: 'Picking', value: 'picking'}
    ]);

    const changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality:1,
        });
    
        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }; 

    return (
        <View style = {{flex: 1, backgroundColor: '#FFFFFF'}}>
             <View style={styles.logoimage}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <View style = {styles.bigbox}>
                <View style = {styles.bigboxheader}>
                    <Text style = {styles.bigboxtext}>Profile</Text>
                </View>
                <ScrollView>
                    <View style = {styles.image}>
                        {profile ? ( <Image source = {{uri : profile}} style = {styles.profileImage} />)
                            : (<Image source = {{uri : "../../../photos/BlankUser.png"}} style = {styles.profileImage}/>)
                        }
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                        <View style = {styles.star}>
                            <Image source={require('../../../photos/Star.png')}/>
                        </View>
                        <Text style = {{marginTop: 15, marginLeft: 5, fontFamily: 'Roboto Regular', fontSize: 17}}>5</Text>
                    </View>
                    <TouchableOpacity onPress = {changeImage} style = {styles.photoButton}>
                        <Text style = {styles.photoButtonText}>Change Photo</Text>
                    </TouchableOpacity>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>NAME</Text>
                        <TextInput style = {styles.textBox} onChangeText = {nameChange} value = {name} placeholder = "Name" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>PHONE NUMBER</Text>
                        <TextInput style = {styles.textBox} onChangeText =  {phoneChange} value = {phoneNumber} placeholder = "Phone Number" keyboardType = "numeric" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>EMAIL</Text>
                        <TextInput style = {styles.textBox} onChangeText = {emailChange} value = {email} placeholder = "Email" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>EXPERIENCE</Text>
                        <TextInput style = {styles.textBox} onChangeText = {experienceChange} value = {experience} placeholder = "Experience" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>LOCATION</Text>
                        <TextInput style = {styles.textBox} onChangeText = {locationChange} value = {location} placeholder = "Location" />
                    </View>
                    <View style = {styles.dropDown}>
                        <Text style = {styles.textStyled}>SKILLS</Text>
                        <DropDownPicker
                            placeholder = "Select an Item"
                            open = {open}
                            value = {value}
                            items = {items}
                            setOpen = {isOpen}
                            setValue = {setValue}
                            setItems = {setItems}
                            listMode = "SCROLLVIEW"
                            style = {styles.dropBox}
                        /> 
                    </View> 
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>BIOGRAPHY</Text>
                                    <TextInput style = {styles.descripBox} 
                                        editable
                                        multiline
                                        numberOfLines = {4}
                                        maxLength = {350}
                                        onChangeText = {bioChange} 
                                        value = {bio} 
                                        placeholder = "Biography" />
                    </View>
                    <TouchableOpacity onPress = {buttonPress} style = {styles.button}>
                        <Text style = {styles.buttonText}>UPDATE</Text>
                    </TouchableOpacity> 
                </ScrollView>
            </View>
        </View>
    )
}

export default PickerPersonalProfile;

const styles = StyleSheet.create({
    bigbox: {
        height: 610,
        width: 340,
        marginTop: 30,
        backgroundColor: '#F6F9F3',
        marginLeft: 30,
        borderRadius: 10
    },
    bigboxheader: {
        width: 340,
        height: 50,
        backgroundColor: '#477943',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    bigboxtext: {
        color: 'white',
        fontSize: 25,
        marginLeft: 137,
        marginTop: 8,
        fontWeight: 700,
        fontFamily: 'Roboto Regular'
    },
    image: {
        marginTop: 25,
        marginLeft: 125
    },
    textStyled: {
        fontSize: 15,
        fontWeight: 500,
        color:  "#477943",
        fontFamily: 'Roboto Regular'
    },
    textBox: {
        height: 40,
        width: 295,
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 7
    },
    infoBox: {
        marginTop: 10,
        marginLeft: 20
    },
    button: {
        backgroundColor: "#477943",
        borderRadius: 20,
        marginTop: 15,
        width: 130,
        height: 30,
        marginLeft: 110,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 40,
        marginTop: 7,
        fontWeight: 700,
        fontFamily: 'Roboto Regular'
    },
    photoButton: {
        backgroundColor: "#477943",
        marginTop: 5,
        width: 120,
        height: 27,
        marginLeft: 117,
        marginBottom: 5,
        borderRadius: 20,
    },
    photoButtonText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 20,
        marginTop: 5,
        fontFamily: 'Roboto Regular'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3
    },
    logoimage: {
        marginTop: 50, 
        marginLeft: 110,
        width: 178,
        height: 40
    },
    dropDown: {
        marginTop: 10,
        marginLeft: 20
    },
    dropBox : {
        height: 40,
        width: 295,
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        marginBottom: 10
    },
    descripBox : {
        height: 70,
        width: 295,
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 7,
        fontFamily: 'Roboto Regular'
    },
    star : {
        marginTop: 14,
        marginLeft: 155
    },
    logo: {
        width: 170,
        height: 70,
        marginBottom: 0,
      }
})
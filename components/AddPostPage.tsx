import { StyleSheet, Text, View, Image, ScrollView, TextInput, Alert, TouchableOpacity} from 'react-native';
import React from "react"

const buttonPress = () => {
    Alert.alert("Button pressed!")
}


const AddPostPage = () => {
    const [name, nameChange] = React.useState('')
    const [email, emailChange] = React.useState('')
    const [experience, experienceChange] = React.useState('')
    const [location, locationChange] = React.useState('')
    const [bio, bioChange] = React.useState('')

    return (
        <View>
            <View style={styles.logoimage}>
                <Image source={require('./../photos/Logo_Final.png')}/>
            </View>
            <View style = {styles.bigbox}>
                <View style = {styles.bigboxheader}>
                    <Text style = {styles.bigboxtext}>Post</Text>
            </View>

                <ScrollView>
                    <View style = {{marginTop: 25, marginLeft: 20}}>
                        <Text style = {styles.textStyled}>DATE</Text>
                        <TextInput style = {styles.textBox} onChangeText = {nameChange} value = {name} placeholder = "Date" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>AVAILABLE POSITIONS</Text>
                        <TextInput style = {styles.textBox} onChangeText = {emailChange} value = {email} placeholder = "Available Positions" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>PAY RATE</Text>
                        <TextInput style = {styles.textBox} onChangeText = {experienceChange} value = {experience} placeholder = "Pay Rate" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>LOCATION</Text>
                        <TextInput style = {styles.textBox} onChangeText = {locationChange} value = {location} placeholder = "Location" />
                    </View>
                    <View style = {styles.infoBox}>
                        <Text style = {styles.textStyled}>DESCRIPTION</Text>
                        <TextInput style = {styles.descripBox} 
                            editable
                            multiline
                            numberOfLines = {4}
                            maxLength = {350}
                            onChangeText = {bioChange} 
                            value = {bio} 
                            placeholder = "Description" />
                    </View>
                    <TouchableOpacity onPress = {buttonPress} style = {styles.button}>
                        <Text style = {styles.buttonText}>ADD</Text>
                    </TouchableOpacity> 
                </ScrollView>
            </View>
        </View>
    )
}

export default AddPostPage;

const styles = StyleSheet.create({
    bigbox: {
        height: 535,
        width: 340,
        marginTop: 10,
        backgroundColor: '#F6F9F3',
        marginLeft: 30,
        borderRadius: 10
    },
    bigboxheader: {
        width: 340,
        height: 50,
        backgroundColor: '#477943',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        fontFamily: 'Roboto Regular'
    },
    bigboxtext: {
        color: 'white',
        fontSize: 25,
        marginLeft: 145,
        marginTop: 8,
        fontWeight: 700,
        fontFamily: 'Roboto Regular'
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
        marginTop: 20,
        width: 130,
        height: 30,
        marginLeft: 110,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 50,
        marginTop: 7,
        fontWeight: 700,
        fontFamily: 'Roboto Regular'
    },
    photoButton: {
        backgroundColor: "#477943",
        marginTop: 5,
        width: 120,
        height: 27,
        marginLeft: 135,
        marginBottom: 5,
        borderRadius: 20
    },
    photoButtonText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 20,
        marginTop: 5,
        fontFamily: 'Roboto Regular'
    },
    logoimage: {
        marginTop: 63, 
        marginLeft: 110,
        width: 178,
        height: 40,
        marginBottom: 30
    },
    descripBox : {
        height: 70,
        width: 295,
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 7
    }
})
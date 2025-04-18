import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import React from "react"

type CustomerProps = {
    date ? : string,
    location ?: string,
    position ?: number,
    pay ?: number, 
    jobDescription ?: string
};

const buttonPress = () => {
    Alert.alert("Button pressed!")
}



const Post = (props : CustomerProps) => {
    return (
        <View style= {styles.box}>
                <View style={styles.header}> 
                    <View style = {{flex: 1, flexWrap: 'wrap', marginTop: 8, marginLeft: 10}}>
                        <Image source={require('./../../photos/UserPhoto.png')}/>
                        <View style = {{marginTop: 7, marginLeft: 8}}>
                            <Text style = {styles.text}>username</Text>
                        </View>
                    </View>
                </View>

                <Text style = {styles.helpText}>Help Needed {props.date}!</Text>

                <View style = {{flex: 1, flexWrap: 'wrap', alignContent: 'space-between', flexDirection: 'row'
                }}>
                    <View style = {{flex: 1, marginLeft: 15, marginTop: 5}}>
                        <Text style = {styles.miniGreen}>{props.location}</Text>
                        <Text style = {styles.miniBlack}>Available Positions: <Text style = {{fontWeight: '700'}}>{props.position}</Text></Text>
                        <Text style = {styles.miniBlack}>Pay Rate: <Text style = {{fontWeight: '700'}}>${props.pay}/hr</Text></Text>
                        <Text style = {styles.miniGreen}>Description</Text>
                        <Text style = {styles.miniBlack}>{props.jobDescription}</Text>
                    </View>

                    <View style = {{marginTop: 10, marginRight: 15}}>
                        <Image source={require('./../../photos/MapOne.png')}/>

                        <TouchableOpacity onPress = {buttonPress} style = {styles.button}>
                            <Text style = {styles.buttonText}>Send My Profile</Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    box : {
        width: 367,
        height: 268,
        backgroundColor: "#F6F9F3",
        marginVertical: 10, 
        marginLeft: 12,
        borderRadius: 8
    },
    text : {
        fontFamily: 'Roboto Regular',
        fontSize: 17,
        color: "white"
    },
    header : {
        width: 367,
        height: 50,
        backgroundColor: "#477943",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        fontWeight: '400'
    },
    helpText : {
        fontSize : 20,
        marginLeft: 15,
        marginTop: 10,
        color:  "#2D5015",
        fontWeight: '700'
    },
    miniGreen : {
        marginBottom: 5,
        color: "#477943",
        fontWeight: '700'
    },
    miniBlack : {
        marginBottom: 5
    },
    button : {
        backgroundColor: "#477943",
        borderRadius: 20,
        marginTop: 7,
        width: 130,
        height: 27,
        marginLeft: 12,
    },
    buttonText : {
        color: 'white',
        fontSize: 12,
        marginLeft: 22,
        marginTop: 5
    },
    touch :{
        borderRadius: 20
    }

})
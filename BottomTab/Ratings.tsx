import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import React from "react"
import {StackParamList} from './StackNav'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type CustomerProps = {
    date ? : string,
    location ?: string,
    position ?: number,
    pay ?: number, 
    jobDescription ?: string
} & NativeStackScreenProps<StackParamList, 'Ratings'>;



const FarmerPost = (props : CustomerProps) => {
  const { navigation } = props;
  const goToRateWorker = () => {
    navigation.navigate('RateWorker');

  };

    return (
        <View style={styles.screen}>
       <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style= {styles.box}>
                <View style={styles.header}> 
                    <View style = {{flex: 1, flexWrap: 'wrap', marginTop: 8, marginLeft: 10}}>
                        <Image source={require('../assets/UserPhoto.png')}/>
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
                        <Image source={require('../assets/MapOne.png')}/>

                        <TouchableOpacity onPress = {goToRateWorker} style = {styles.button}>
                            <Text style = {styles.buttonText}>View Workers</Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>
        </View>
        </View>
    )
}

export default FarmerPost;

const styles = StyleSheet.create({
    box : {
        width: 367,
        height: 268,
        backgroundColor: "#F6F9F3",
        marginVertical: 10, 
        marginLeft: 12,
        marginTop: 12,
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
        marginLeft: 27,
        marginTop: 6
    },
    touch :{
        borderRadius: 20
    },
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50, // or use SafeAreaView
        alignItems: 'center',
      },
      logo: {
        width: 170,
        height: 70,
        marginBottom: 0,
      }
})
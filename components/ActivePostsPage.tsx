import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from "react"
import FarmerPost from "./jobcomponents/FarmerPost"


const ActivePostsPage = () => {
    return (
        <View>
            <View style={styles.image}>
                <Image source={require('./../photos/Logo_Final.png')}/>
            </View>
            <ScrollView contentContainerStyle = {{flexGrow: 1, justifyContent: 'space-between'}}>
                <FarmerPost date = "3/20/20" position = {400} location = "Farmington, CT" pay = {2} jobDescription='You can pick anything you want'/>
            </ScrollView>
        </View>
    )
}

export default ActivePostsPage;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        marginTop: 63, 
        marginLeft: 110,
        marginBottom: 60,
        width: 178,
        height: 40
    },
    scroll : {

    }
})
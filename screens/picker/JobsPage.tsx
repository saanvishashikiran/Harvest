import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from "react"
import Post from "../jobcomponents/Post"


const JobsPage = () => {
    return (
        <View>
            <View style={styles.image}>
                <Image source={require('../../assets/logo.png')}/>
            </View>
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
                <Post date = "3/20/20" position = {400} location = "Farmington, CT" pay = {2} jobDescription='You can pick anything you want'/>
                <Post />
                <Post />
                <Post />
            </ScrollView>
        </View>
    )
}

export default JobsPage;

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
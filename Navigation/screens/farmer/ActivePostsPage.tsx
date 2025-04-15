import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from "react"
import FarmerPost from "../jobcomponents/FarmerPost"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../FarmerStackNav'; 

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const ActivePostsPage = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <FarmerPost
                    navigation={navigation}
                    title="Apple Picking"
                    date="3/20/20"
                    position={400}
                    location="Farmington, CT"
                    pay={2}
                    jobDescription="You can pick anything you want"
                />
                <FarmerPost
                    navigation={navigation}
                    title="Apple Picking"
                    date="3/20/20"
                    position={400}
                    location="Farmington, CT"
                    pay={2}
                    jobDescription="You can pick anything you want"
                />
                <FarmerPost
                    navigation={navigation}
                    title="Apple Picking"
                    date="3/20/20"
                    position={400}
                    location="Farmington, CT"
                    pay={2}
                    jobDescription="You can pick anything you want"
                />
                <FarmerPost
                    navigation={navigation}
                    title="Apple Picking"
                    date="3/20/20"
                    position={400}
                    location="Farmington, CT"
                    pay={2}
                    jobDescription="You can pick anything you want"
                />


            </ScrollView>
        </View>
    )
}

export default ActivePostsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    image: {
        marginTop: 50,
        marginLeft: 110,
        marginBottom: 32,
        width: 178,
        height: 40
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 170,
        height: 70,
        marginBottom: 0,
      }
});

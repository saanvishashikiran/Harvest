import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, Text, View, Image } from 'react-native';
import React from "react"
import JobsPage from "./../components/JobsPage"
import AddPage from "./../components/AddPage"
import EmailPage from "./../components/EmailPage"
import ActivePostsPage from "./ActivePostsPage";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown : false,
                tabBarShowLabel : false,
                tabBarStyle : {
                    backgroundColor: "#477943"
                }
            }}
        >
            <Tab.Screen
            name = "Home"
            component = {ActivePostsPage}
            options = {{
                tabBarIcon: ({focused}) =>{
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <View style={styles.image}>
                                <Image source={require('./../photos/HomeImage.png')}/>
                            </View>
                        </View>
                    )
                }
            }}
            />
            <Tab.Screen 
            name = "Add" 
            component={AddPage} 
            options = {{
                tabBarIcon: ({focused}) =>{
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <View style={{marginTop: 25}}>
                                <Image source={require('./../photos/Add.png')}/>
                            </View>
                        </View>
                    )
                }
            }}
            />
            <Tab.Screen 
            name = "Email" 
            component={EmailPage} 
            options = {{
                tabBarIcon: ({focused}) =>{
                    return (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <View style={{marginTop: 25}}>
                                <Image source={require('./../photos/Email.png')}/>
                            </View>
                        </View>
                    )
                }
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;

const styles = StyleSheet.create({
    image: {
        marginTop: 20
    }
})

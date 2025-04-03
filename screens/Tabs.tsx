import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, Text, View, Image } from 'react-native';
import React from "react"
import JobsPage from "./farmer/JobsPage"
import AddPage from "./farmer/AddPage"
import EmailPage from "./EmailPage"

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
            component = {JobsPage}
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

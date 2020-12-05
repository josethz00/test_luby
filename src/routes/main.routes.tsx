import React from 'react';
import Dashboard from '../screens/Dashboard';
import Repositories from '../screens/Repositories';
import Followers from '../screens/Followers';
import Following from '../screens/Following';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, SimpleLineIcons } from 'expo-vector-icons';
import RepositoryDetails from '../screens/RepositoryDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#5271ff',
                inactiveTintColor: '#aaa',
                labelStyle:{
                    fontSize: 11,
                    fontWeight: 'bold'
                },
                style: {
                    backgroundColor: '#2a2f37',
                    height: 60,
                    borderWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0
                }
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarIcon:({color}) => (
                    <Ionicons color={color} name="ios-home" size={26}/> 
                )
            }}/>
            <Tab.Screen name="Repositories" component={Repositories} options={{ tabBarIcon:({color}) => (
                    <Ionicons color={color} name="ios-folder-open" size={26}/> 
                )
            }}/>
            <Tab.Screen name="Followers" component={Followers} options={{ tabBarIcon:({color}) => (
                    <SimpleLineIcons color={color} name="people" size={26}/>  
                )
            }}/>
            <Tab.Screen name="Following" component={Following} options={{ tabBarIcon:({color}) => (
                    <SimpleLineIcons color={color} name="user-following" size={26}/>
                )
            }}/>
        </Tab.Navigator>
    );
}

const MainRoutes: React.FC = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    gestureEnabled: true,
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }}
            >
                <Stack.Screen
                    name='Home'
                    options={({ route }) => ({
                        headerShown: false
                    })}
                >
                    {props=>
                        <Tabs/>
                    }
                </Stack.Screen>
                <Stack.Screen
                    name='RepositoryDetails'
                    options={({ route }) => ({
                        headerShown: false
                    })}
                >
                    {props=>
                        <RepositoryDetails />
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default MainRoutes;
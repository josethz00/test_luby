import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from '../screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SignIn' component={SignIn} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default AuthRoutes;
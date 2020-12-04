import React from 'react';
import Dashboard from '../screens/Dashboard';
import Repositories from '../screens/Repositories';
import Followers from '../screens/Followers';
import Following from '../screens/Following';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const MainRoutes: React.FC = () => {

    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Repositories" component={Repositories} />
                <Tab.Screen name="Followers" component={Followers} />
                <Tab.Screen name="Following" component={Following} />
            </Tab.Navigator>
        </NavigationContainer>
    );

};

export default MainRoutes;
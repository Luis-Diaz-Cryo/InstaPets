import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../views/HomeScreen';
import ProfileScreen from '../views/ProfileScreen';
import MapScreen from '../views/MapScreen';
import ContactScreen from '../views/ContactScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch(route.name){
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Contact':
                            iconName = 'contacts';
                            break;
                        case 'Map':
                            iconName = 'map';
                            break;
                        case 'Profile':
                            iconName = 'account';
                            break;
                        default:

                            break;
                    }  
                                    
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
            
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNav;


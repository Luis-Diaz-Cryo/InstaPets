import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../views/HomeScreen";
import ProfileScreen from "../views/ProfileScreen";
import MapScreen from "../views/MapScreen";
import ContactScreen from "../views/ContactScreen";
import QRCodeScreen from "../views/QRCodeScreen";
import PetNameGeneratorScreen from "../views/PetNameGeneratorScreen";
import CameraScreen from "../views/CameraScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Contact":
              iconName = "contacts";
              break;
            case "Map":
              iconName = "map";
              break;
            case "Profile":
              iconName = "account";
              break;
            case "QR Code":
              iconName = "qrcode";
              break;
            case "Pet Name Generator":
              iconName = "paw";
              break;
            case "Camera":
              iconName = "camera";
              break;
            default:
              break;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="QR Code" component={QRCodeScreen} />
      <Tab.Screen
        name="Pet Name Generator"
        component={PetNameGeneratorScreen}
      />
      <Tab.Screen name="Camera" component={CameraScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

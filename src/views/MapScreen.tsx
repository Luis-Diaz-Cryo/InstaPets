import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen({ navigation }: any) {
  const onRegionChange = (region) => {
   
  };

  
     

  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      
      style={styles.map}
      onRegionChange={onRegionChange}
      initialRegion={{
        latitude: -26.852691607783505,
        latitudeDelta: 27.499085419977938,
        longitude: 148.1104129487327,
        longitudeDelta: 15.952148000000022,
      }}
      
    >
      
       <Marker
        pinColor='#00ff00'
        coordinate={{ latitude: -35, longitude: 147}}
      />
        
    </MapView>
    
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

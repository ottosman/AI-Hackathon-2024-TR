import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
    const [latitude, setLatitude] = useState(38.6745556); 
    const [longitude, setLongitude] = useState(34.7390683); 
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="My Location"
            description="This is my current location."
          />
        </MapView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({

    container: {
        flex: 1
      },
      map: {
        flex: 1
      },
  });
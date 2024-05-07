import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { MonoText } from '@/components/StyledText';
import { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import {db, createDatabase, fetchAllData, fetchLastFourData, saveDataToDatabase} from '../../database/database';
import { dbTest, fetchImage, runAI } from '@/api/apiClient';
import FancyTable from 'react-native-fancy-table'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';


export default function TabOneScreen() {




  useEffect(() => {
    const getImageAndSetUri = async () => {
      const response = await fetchImage('7.jpg');
      if (response) {
        setImageUri(response);
        createDatabase();
        fetchLastFourData().then(dbDatas => setData(dbDatas as never[]));
        setLights();
      } else {
      }
    };
  
    getImageAndSetUri();
  }, []);

  const [data, setData] = useState([])


  const handleRunAI = () => {
      const randomImageNumber = Math.floor(Math.random() * 39) + 1;
  
      const imageName = `${randomImageNumber}.jpg`;
  
      const url = `http://172.20.10.7:5057/api/runAI/${imageName}`;
  
      axios.get(url).then(e => {
        setVehicleCount(e.data.vehicle_count)

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        saveDataToDatabase(e.data.vehicle_count, formattedTime);

        let url = `http://172.20.10.7:5057/api/image/${imageName}`;
        axios.get(url).then(e => {
          setImageUri(e.data)
        })
      })
  }
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
  }, [imageUri]);

  const processedData = data.map((dataItem: { vehicle_count: number, time: string }) => {
    return {
      value: dataItem.vehicle_count,
      dataPointText: dataItem.vehicle_count.toString(),
      label: dataItem.time,
    };
  }).reverse();

  const [chartData, setChartData] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(null);

  const navigation = useNavigation();

  const handleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Yeni Bildirim!',
          body: 'Bu bir test bildirimidir.',
        },
        trigger: null, // Anında gönder
      });
    } catch (error) {
    }
  };
  
const lightsJSON = [
  {"light1": 0},
  {"light2": 1},
  {"light3": 0},
  {"light4": 1},
  {"light5": 1},
  {"light6": 0},
];

const setLights = () => {
  lightsJSON.forEach((light, index) => {
    const lightNumber = `light${index + 1}`;
    const lightStatus = Object.values(light)[0];

    switch(lightNumber) {
      case "light1":
        setIsRed1(lightStatus === 0);
        setIsGreen1(lightStatus === 1);
        break;
      case "light2":
        setIsRed2(lightStatus === 0);
        setIsGreen2(lightStatus === 1);
        break;
      case "light3":
        setIsRed3(lightStatus === 0);
        setIsGreen3(lightStatus === 1);
        break;
      case "light4":
        setIsRed4(lightStatus === 0);
        setIsGreen4(lightStatus === 1);
        break;
      case "light5":
        setIsRed5(lightStatus === 0);
        setIsGreen5(lightStatus === 1);
        break;
      case "light6":
        setIsRed6(lightStatus === 0);
        setIsGreen6(lightStatus === 1);
        break;
      default:
        break;
    }
  });
};

const [isRed1, setIsRed1] = useState(true);
const [isGreen1, setIsGreen1] = useState(false);
const [isRed2, setIsRed2] = useState(true);
const [isGreen2, setIsGreen2] = useState(false);
const [isRed3, setIsRed3] = useState(true);
const [isGreen3, setIsGreen3] = useState(false);
const [isRed4, setIsRed4] = useState(true);
const [isGreen4, setIsGreen4] = useState(false);
const [isRed5, setIsRed5] = useState(true);
const [isGreen5, setIsGreen5] = useState(false);
const [isRed6, setIsRed6] = useState(true);
const [isGreen6, setIsGreen6] = useState(false);


const toggleLight = (lightNumber) => {
  switch (lightNumber) {
    case 1:
      setIsRed1(!isRed1);
      setIsGreen1(!isGreen1);
      break;
    case 2:
      setIsRed2(!isRed2);
      setIsGreen2(!isGreen2);
      break;
    case 3:
      setIsRed3(!isRed3);
      setIsGreen3(!isGreen3);
      break;
    case 4:
      setIsRed4(!isRed4);
      setIsGreen4(!isGreen4);
      break;
    case 5:
      setIsRed5(!isRed5);
      setIsGreen5(!isGreen5);
      break;
    case 6:
      setIsRed6(!isRed6);
      setIsGreen6(!isGreen6);
      break;
    default:
      break;
  }
};
const [value, setValue] = useState("");
const [isFocus, setIsFocus] = useState(false);
const dataKavsak = [
  { label: 'Niğde Üniversite Kavşağı', value: '1' },
  { label: 'Nevşehir Üniversite Kavşağı', value: '2' },
]
useEffect(() => {
  const fetchData = async () => {
      try {
          const fetchedData = await fetchLastFourData();
          setData(fetchedData);
      } catch (error) {
      }
  };

  fetchData();
}, [vehicleCount]);
  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('map', { presentation: 'modal' })}>
          <Image style={styles.image} source={{uri:imageUri}} />
        </TouchableOpacity>
        {/* Görselin önünde trafik ışıkları */}

        {/*sol üst ışık*/}
        <View style={[styles.overlay, { backgroundColor: 'transparent', left:-130, top:-80, width:'140%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed1 && styles.red]}
            onPress={() => toggleLight(1)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen1 && styles.green]}
            onPress={() => toggleLight(1)}
          />
        </View>

        {/*sağ ışık*/}
        <View style={[styles.overlay, { backgroundColor: 'transparent', left:-130,top:-50 , width:'260%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed2 && styles.red]}
            onPress={() => toggleLight(2)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen2 && styles.green]}
            onPress={() => toggleLight(2)}
          />
        </View>

        {/*orta üst ışık*/}
        <View style={[styles.overlay, { backgroundColor: 'transparent', left:-130,top:-50 , width:'180%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed3 && styles.red, {width:15, height:15}]}
            onPress={() => toggleLight(3)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen3 && styles.green, {width:15, height:15}]}
            onPress={() => toggleLight(3)}
          />
        </View>

          {/*orta alt ışık*/}
           <View style={[styles.overlay, { backgroundColor: 'transparent', left:-85,top:-10 , width:'170%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed4 && styles.red, {width:15, height:15}]}
            onPress={() => toggleLight(4)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen4 && styles.green, {width:15, height:15}]}
            onPress={() => toggleLight(4)}
          />
        </View>


          {/*sol ışık*/}
          <View style={[styles.overlay, { backgroundColor: 'transparent', left:-85,top:-10 , width:'75%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed5 && styles.red, {width:20, height:20}]}
            onPress={() => toggleLight(5)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen5 && styles.green, {width:20, height:20}]}
            onPress={() => toggleLight(5)}
          />
        </View>

          {/*sağ alt ışık*/}
          <View style={[styles.overlay, { backgroundColor: 'transparent', left:-85,top:55 , width:'245%' }]}>
          {/* Kırmızı ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isRed6 && styles.red, {width:20, height:20}]}
            onPress={() => toggleLight(6)}
          />
          {/* Yeşil ışık */}
          <TouchableOpacity
            style={[styles.trafficLight, isGreen6 && styles.green, {width:20, height:20}]}
            onPress={() => toggleLight(6)}
          />
        </View>

      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />





      { /* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}


      <View style={{ ...styles.container }}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Kavşaktaki Araç Sayısı:
          <MonoText>{vehicleCount}</MonoText>


        </Text>

        <View style={{ ...styles.container }}>
          <View style={[styles.dropdownContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Dropdown
              style={[styles.dropdown, { width: 200 }, isFocus && styles.dropdownFocus]}
              data={dataKavsak}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Kavşak Seçiniz' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}

            />
            <TouchableOpacity
              style={styles.button} 
              onPress={handleRunAI}
              >
              <Text style={styles.buttonText}>Göster</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>





      <MonoText>Araç-Zaman Grafiği</MonoText>
      <View style={{marginLeft: 60}}>
        <LineChart
          data={processedData}
          spacing={105}
          color='red'
          thickness={2}
          isAnimated={true}
          textShiftY={-6}
          textShiftX={-3}
        />
      </View>
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // DropdownLabel'ın ortalanması için
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownLabel: {
    fontSize: 16,
    color: 'gray',
  },
  dropdownFocus: {
    borderColor: 'blue', // Focus olduğunda çerçeve rengini değiştir
  },

  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  trafficLightsContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  trafficLight: {
    width: 20,
    height: 20,
    borderRadius: 25,
    marginVertical: 3,
    borderWidth: 2,
  },
  overlay: {
    position: 'absolute', // Make the overlay absolute within the image container
    top: 0, // Position the overlay at the top
    left: 0, // Position the overlay at the left
    width: '100%', // Match the width of the image container
    height: '100%', // Match the height of the image container
    justifyContent: 'center', // Center traffic lights vertically within the overlay
    alignItems: 'center', // Center traffic lights horizontally within the overlay
  },
  verticalLight: {
    transform: [{ rotate: '90deg' }],
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative', // Make the image container relative
  },
  red: {
    backgroundColor: 'red',
    borderColor: 'darkred',
  },
  green: {
    backgroundColor: 'green',
    borderColor: 'darkgreen',
  },
    scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%', 
    aspectRatio: 16 / 9, 
    paddingHorizontal: 20
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});

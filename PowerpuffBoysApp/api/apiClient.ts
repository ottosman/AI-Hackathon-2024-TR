import axios from 'axios';
import { db, saveDataToDatabase } from '../database/database';

const fetchDataFromAPI = async (date, time) => {
  try {
    let url = 'http://172.20.10.7:8082/api/find';
    
    if (date) {
      url += `?date=${date}`;
    }
    
    if (time && !date) {
      url += `?time=${time}`;
    }
    
    if (time && date) {
      url += `&time=${time}`;
    }
    
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error('API response is empty');
    }
    // await saveDataToDatabase(response.data.vehicle_count, response.data.time);

    return response;
  } catch (error) {
  }
};

const runAI = () => {
  try {
    const randomImageNumber = Math.floor(Math.random() * 39) + 1;

    const imageName = `${randomImageNumber}.jpg`;

    const url = `http://172.20.10.7:5057/api/runAI/${imageName}`;

    const r = axios.get(url);

  } catch (err) {
  }
};

const fetchImage =(imageName) => {
  try {
    let url = `http://172.20.10.7:5057/api/image/${imageName}`;
    return url;
  } catch (err) {
    return null; // Hata durumunda null döndür
  }
};


export { fetchDataFromAPI, fetchImage, runAI  };

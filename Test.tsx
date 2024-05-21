import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const API_KEY = '5bd2e0405c5b05e7f1dcda04a58619b5';
////// thi s api key is expired if you have another one then you can able to test .

const Test = () => {
  const [lat, setLat] = useState(21.764473); ///default bhavnagar
  const [long, setLong] = useState(72.151932);
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = () => {
    if (lat !== 0 && long !== 0) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=6`,
      )
        .then(response => response.json())
        .then(data => {
          const {time, weather_code, temperature_2m_max, temperature_2m_min} =
            data.daily;

          if (
            time &&
            weather_code &&
            temperature_2m_max &&
            temperature_2m_min &&
            time.length === weather_code.length &&
            time.length === temperature_2m_max.length &&
            time.length === temperature_2m_min.length
          ) {
            const weatherData = time.map((date, index) => ({
              date,
              weatherCode: weather_code[index],
              temperatureMax: temperature_2m_max[index],
              temperatureMin: temperature_2m_min[index],
            }));
            setWeatherData(weatherData);
          } else {
            console.error('Invalid data structure:', data.daily);
          }
        })
        .catch(error =>
          console.error('Error fetching historical weather data:', error),
        );
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.dateText}>Date: {item.date}</Text>
        <Text style={styles.tempText}>Max Temp: {item.temperatureMax}°C</Text>
        <Text style={styles.tempText}>Min Temp: {item.temperatureMin}°C</Text>
        <Text style={styles.weatherText}>Weather Code: {item.weatherCode}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search your city"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details?.geometry?.location !== undefined) {
              setLat(details?.geometry?.location?.lat);
              setLong(details?.geometry?.location?.lng);
            }
          }}
          query={{
            key: API_KEY,
            language: 'en',
            types: '(cities)',
          }}
          styles={Google_place_style}
        />
        <TouchableOpacity onPress={fetchData} style={styles.fetchButton}>
          <Text style={styles.buttonText}>Fetch</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fetchButton: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tempText: {
    fontSize: 14,
    marginBottom: 3,
  },
  weatherText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

const Google_place_style = {
  container: {
    flex: 1,
    marginTop: 10,
  },
  textInputContainer: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'black',
  },
  textInput: {
    color: 'black',
    fontSize: 16,
    margin: 0,
    padding: 0,
    height: 40,
  },
  predefinedPlacesDescription: {
    color: 'black',
  },
  poweredContainer: {
    borderWidth: 0,
    borderRadius: 7,
  },
};

export default Test;

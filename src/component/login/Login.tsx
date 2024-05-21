import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { showToast } from '../utils/Utils';

export default function Login({ navigation, route }) {
    const [accessToken, setAccessToken] = useState(null);

  const handleLoginFinished = (error, result) => {
    if (error) {
      console.log("login has error: " + result.error);
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data.accessToken.toString());
        setAccessToken(data.accessToken);
        navigation.navigate('Home');
        showToast("test;");
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LoginButton
        onLoginFinished={handleLoginFinished}
        onLogoutFinished={() => console.log("logout.")}
      />
      <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('Home')}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};


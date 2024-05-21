// ItemScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, addItem } from '../redux/store';
import ResponsivePixels from '../res/styles/ResponsivePixels';
import Strings from '../res/Strings';
export default function ItemScreen({ navigation, route }) {
  const { itemId } = route.params;
  const isEditing = itemId !== undefined;
  const item = useSelector(state => state.items.find(item => item.id === itemId));
  const dispatch = useDispatch();

  const [name, setName] = useState(item ? item.name : '');
  const [price, setPrice] = useState(item ? item.price : '');
  const [imageUri, setImageUri] = useState(item ? item.imageUri : null);

  const items = useSelector(state => state.items);

  useEffect(() => {
    if (isEditing && !item) {
      navigation.goBack();
    }
    navigation.setOptions({ title: isEditing ? 'Edit Item' : 'Add Item' });
  }, [isEditing, item, navigation]);

  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };
 const gotoCart=()=>{

  navigation.navigate('Cart')
  }

  const saveItem = () => {
    const newItem = { id: isEditing ? itemId : Math.random(), name, price, imageUri };
    if (isEditing) {
      dispatch(updateItem(newItem));
    } else {
      dispatch(addItem(newItem));
    }
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.itemImage} />}
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Price: {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={gotoCart}>
        <View style={{padding:ResponsivePixels.size10,alignItems:"flex-end"}}>
        
            <Text>Cart</Text>

        </View>
      </TouchableOpacity>

   

      <TouchableOpacity onPress={selectImage}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text>{Strings.select_image}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={Strings.name}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={Strings.price}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title={isEditing ? "Update" : "Save"} onPress={saveItem} />

      <Text style={styles.listHeader}>Items List:</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

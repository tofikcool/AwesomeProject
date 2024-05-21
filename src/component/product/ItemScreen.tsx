import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, addItem, toggleCart } from '../redux/store';
import { Toast } from 'native-base';
import { showToast } from '../utils/Utils';

export default function ItemScreen({ navigation, route }) {
  // let isEditing = itemId !== undefined;
  const item = useSelector(state => state.items.find(item => item.id === id));
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(item ? true : false);
  const [price, setPrice] = useState(item ? item.price : '');
  const [imageUri, setImageUri] = useState(item ? item.imageUri : null);
  const [name, setName] = useState(item ? item.name : '');
  const [id, setId] = useState(item ? item.id : undefined);
  const items = useSelector(state => state.items);

  useEffect(() => {
    // if (isEditing && !item) {
    //   navigation.goBack();
    // }
    navigation.setOptions({
      title: isEditing ? 'Edit Item' : 'Add Item',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButton}>Cart</Text>
        </TouchableOpacity>
      ),
    });
  }, [isEditing, item, navigation]);

  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const saveItem = () => {
    const newItem = { id: isEditing ? id : Math.random(), name, price, imageUri, inCart: false };
    if (isEditing) {
      dispatch(updateItem(newItem));
      showToast("updated successfully");
    } else {
      dispatch(addItem(newItem));
      showToast("saved successfully");
    }
    setName("");
    setImageUri("");
    setPrice("");
    setId("");
    setIsEditing(false)
    
  };

  const toggleItemCart = (itemId) => {
    dispatch(toggleCart(itemId));
  };

  const editItem = (item) => {
    setIsEditing(true)
    setId(item.id)
    setName(item.name);
    setImageUri(item.imageUri);
    setPrice(item.price);
    
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.itemImage} />}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price: {item.price}</Text>
        </View>
        <Button  title={item.inCart ? "Added to Cart" : "Add to Cart"} onPress={() => toggleItemCart(item.id)} />
        <Button  title="Edit" onPress={() => editItem(item)} />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text>Select an Image</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
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
        ItemSeparatorComponent={renderSeparator}
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
    height: 150,
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
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  cartButton: {
    marginRight: 10,
    fontSize: 16,
    color: 'blue',
  },
});

import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/store';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.items.filter(item => item.inCart));

  const removeItemFromCart = (itemId) => {
    dispatch(toggleCart(itemId));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.itemImage} />}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price: {item.price}</Text>
        </View>
        <Button title="Remove" onPress={() => removeItemFromCart(item.id)} />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Navigate back or handle back action as needed
        // For now, let's just return true to prevent default back behavior
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
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
});

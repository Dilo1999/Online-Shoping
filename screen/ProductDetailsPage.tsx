import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ProductDetailsPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as { product: Product };

  // Function to add item to cart
  const addToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      // Check if product already exists in cart
      const isProductInCart = cart.some((item: Product) => item.id === product.id);

      if (!isProductInCart) {
        cart.push(product);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        Alert.alert('Added to Cart', `${product.title} has been added.`);
      } else {
        Alert.alert('Already in Cart', `${product.title} is already in your cart.`);
      }

      // Navigate to CartPage after adding
      navigation.navigate('CartPage');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productCategory}>Category: {product.category}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#007BFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsPage;

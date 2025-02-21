import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const CartPage: React.FC = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from AsyncStorage
  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  // Save cart to AsyncStorage
  const saveCart = async (cartItems: Product[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  // Remove item from cart and update storage
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCart(updatedCart);
    Alert.alert('Removed', 'Item has been removed from the cart.');
  };

  // Remove all items from cart
  const clearCart = () => {
    setCart([]); // Clear the cart from the state
    saveCart([]); // Clear the cart in AsyncStorage
    Alert.alert('Cart Cleared', 'All items have been removed from the cart.');
  };

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${total}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('PaymentPage')} // Navigate to Payment Page
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>

          {/* Clear Cart Button */}
          <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
  },
  removeButton: {
    marginTop: 5,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearCartButton: {
    backgroundColor: 'orange',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  clearCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartPage;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string; // Add category field for filtering
}

const SecondPage: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State for filtered products
  const [activeFilter, setActiveFilter] = useState<string>(''); // State to track active filter

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initially display all products
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Unable to fetch products.');
    }
  };

  // Function to load cart from AsyncStorage
  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Function to save cart to AsyncStorage
  const saveCart = async (newCart: Product[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart); // Update local cart state
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Function to add product to cart
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    saveCart(updatedCart);
    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`);
  };

  // Filter products by category
  const filterByCategory = (category: string) => {
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
    setActiveFilter(category); // Set active filter
  };

  // Filter products by price range
  const filterByPrice = (price: number) => {
    const filtered = products.filter((product) => product.price <= price);
    setFilteredProducts(filtered);
    setActiveFilter(`under-${price}`); // Set active filter
  };

  useEffect(() => {
    fetchProducts();
    loadCart(); // Load the cart when the page loads
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Shop Our Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
          <Image source={require('../assets/images/cart.png')} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === '' && styles.activeFilterButton]}
          onPress={() => {
            setFilteredProducts(products);
            setActiveFilter('');
          }}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'electronics' && styles.activeFilterButton]}
          onPress={() => filterByCategory('electronics')}
        >
          <Text style={styles.filterButtonText}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'jewelery' && styles.activeFilterButton]}
          onPress={() => filterByCategory('jewelery')}
        >
          <Text style={styles.filterButtonText}>Jewelry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'men\'s clothing' && styles.activeFilterButton]}
          onPress={() => filterByCategory('men\'s clothing')}
        >
          <Text style={styles.filterButtonText}>Men's Clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'women\'s clothing' && styles.activeFilterButton]}
          onPress={() => filterByCategory('women\'s clothing')}
        >
          <Text style={styles.filterButtonText}>Women's Clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'under-50' && styles.activeFilterButton]}
          onPress={() => filterByPrice(50)}
        >
          <Text style={styles.filterButtonText}>Under $50</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.productList}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product })}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Adjusted to space out buttons
    paddingVertical: 5,
    paddingHorizontal: 10, // Padding around the container
  },
  filterButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5, // Smaller height for button
    paddingHorizontal: 10, // Smaller horizontal padding
    borderRadius: 5,
    marginBottom: 5,
    width: '30%', // Using percentage for spacing, so buttons stay responsive
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%', // Adds space between buttons in the row
  },
  activeFilterButton: {
    backgroundColor: '#0056b3', // Active button color
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12, // Smaller font size for buttons
  },
  productList: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  productCard: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SecondPage;

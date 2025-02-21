import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentPage: React.FC = () => {
  const navigation = useNavigation();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [PayAmount, Amount] = useState('');

  // Handle payment
  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    // Simulating a payment process
    Alert.alert('Payment Successful', 'Your payment has been processed successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('CartPage'); // Navigate back to the cart or home page
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={PayAmount}
        onChangeText={Amount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Add the image below the Pay Now button */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/payment.png')} style={styles.paymentImage} />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8f9fa', // Bootstrap's light background color
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#343a40', // Bootstrap's dark text color
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ced4da', // Bootstrap's border color
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#007bff', // Bootstrap's primary button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageContainer: {
    flexDirection: 'row', // Align the images horizontally
    justifyContent: 'space-between', // Space out the images evenly
    marginTop: 30,
  },
  paymentImage: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginRight: 10, // Space between the two images
  },
  smallImage: {
    width: 50, // Adjust the small image size
    height: 50, // Adjust the small image size
  },
});

export default PaymentPage;

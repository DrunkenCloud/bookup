import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const goodreadsLinks = [
  { link: 'https://www.goodreads.com/book/show/1', title: 'Book One' },
  { link: 'https://www.goodreads.com/book/show/2', title: 'Book Two' },
  { link: 'https://www.goodreads.com/book/show/3', title: 'Book Three' }
];

const App = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const loadSavedBooks = async () => {
      const saved = await AsyncStorage.getItem('savedBooks');
      if (saved) setSavedBooks(JSON.parse(saved));
    };
    loadSavedBooks();
  }, []);

  const captureImage = () => {
    const randomBook = goodreadsLinks[Math.floor(Math.random() * goodreadsLinks.length)];
    return randomBook;
  };

  const saveBook = async (book) => {
    const updatedBooks = [...savedBooks, book];
    setSavedBooks(updatedBooks);
    await AsyncStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {cameraActive ? (
        <Camera style={{ flex: 1 }} />
      ) : (
        <View>
          <Button title="Enable Camera" onPress={() => setCameraActive(true)} />
          <Button title="Capture Image" onPress={() => saveBook(captureImage())} />
          <Text>Saved Books:</Text>
          <FlatList
            data={savedBooks}
            keyExtractor={(item) => item.link}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => console.log(item.link)}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default App;
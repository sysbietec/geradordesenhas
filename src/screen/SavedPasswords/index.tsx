import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import * as Localization from 'expo-localization';
import { translations } from '../../localization/translations';

const getTranslation = (key: keyof typeof translations['en']): string => {
  const locales = Localization.getLocales(); 
  const language = locales[0]?.languageCode as keyof typeof translations;  
  return translations[language]?.[key] || translations['en'][key];  
};


export const SavedPasswords = () => {
  const [passwords, setPasswords] = useState<{ name: string; password: string }[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPasswords = async () => {
      const savedPasswords = (await AsyncStorage.getItem('passwords')) || '[]';
      setPasswords(JSON.parse(savedPasswords));
    };
    fetchPasswords();
  }, []);

  const deletePasswords = async () => {
    try {
      await AsyncStorage.removeItem('passwords');
      setPasswords([]);
      Alert.alert(getTranslation('success'), getTranslation('deleteAllSuccess'));
    } catch (error) {
      Alert.alert(getTranslation('error'), getTranslation('deleteAllError'));
    }
  };

  const deletePassword = async (index: number) => {
    try {
      const updatedPasswords = [...passwords];
      updatedPasswords.splice(index, 1);

      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);

      Alert.alert(getTranslation('success'), getTranslation('deletePasswordSuccess'));
    } catch (error) {
      Alert.alert(getTranslation('error'), getTranslation('deletePasswordError'));
    }
  };

  const copyToClipboard = (password: string) => {
    Clipboard.setString(password);
    Alert.alert(getTranslation('success'), getTranslation('copyToClipboardSuccess'));
  };

  return (
    <View style={styles.container}>
    <View style={styles.passwordsaveContainer}>
  {/* Flecha à esquerda */}
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Icon name="arrow-left" size={24} color="#6C63FF" />
  </TouchableOpacity>

  {/* Texto à direita da flecha */}
  <Text style={styles.title}>{getTranslation('savedPasswords')}</Text>
</View>


      {passwords.length === 0 ? (
        <Text style={styles.listEmptyText}>{getTranslation('noSavedPasswords')}</Text>
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.savedPassword}>
              <View style={styles.passwordInfo}>
                <Text style={styles.passwordName}>{item.name}</Text>
                <Text style={styles.passwordText}>{item.password}</Text>
              </View>

              <View style={styles.iconGroup}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => copyToClipboard(item.password)}
                >
                  <Icon name="copy" size={20} color="#6C63FF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => deletePassword(index)}
                >
                  <Icon name="trash" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={deletePasswords}>
        <Text style={styles.deleteButtonText}>{getTranslation('deleteAllPasswords')}</Text>
      </TouchableOpacity>
    </View>
  );
};

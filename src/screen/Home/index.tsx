import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, TouchableOpacity, TextInput, Alert, Share, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles';
import * as Localization from 'expo-localization';
import { translations } from '../../localization/translations';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const getTranslation = (key: keyof typeof translations['en']): string => {
  const locales = Localization.getLocales(); 
  const language = locales[0]?.languageCode as keyof typeof translations;  
  return translations[language]?.[key] || translations['en'][key];  
};



interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [length, setLength] = useState<number>(8);
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState<boolean>(false);

  const generatePassword = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
    setShowNameInput(true);
  };

  const sharePassword = async () => {
    if (!password) {
      Alert.alert(getTranslation('error'), getTranslation('generatePasswordFirst'));
      return;
    }

    try {
      await Share.share({
        message: `${getTranslation('yourGeneratedPassword')} ${password}`,
      });
    } catch (error) {
      Alert.alert(getTranslation('error'), getTranslation('sharePasswordError'));
    }
  };

  const shareApp = async () => {
    const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.seuapp'; // Atualize com o ID do seu app

    try {
      await Share.share({
        message: `${getTranslation('shareAppMessage')} ${googlePlayLink}`,
      });
    } catch (error) {
      Alert.alert(getTranslation('error'), getTranslation('shareAppError'));
    }
  };

  const savePassword = async () => {
    if (!password) {
      Alert.alert(getTranslation('error'), getTranslation('generatePasswordFirst'));
      return;
    }

    try {
      const savedPasswords = (await AsyncStorage.getItem('passwords')) || '[]';
      const passwordsArray = JSON.parse(savedPasswords);

      passwordsArray.push({ name: name || getTranslation('unnamedPassword'), password });
      await AsyncStorage.setItem('passwords', JSON.stringify(passwordsArray));

      Alert.alert(getTranslation('success'), getTranslation('passwordSaved'));
      setName('');
      setShowNameInput(false);
    } catch (error) {
      Alert.alert(getTranslation('error'), getTranslation('savePasswordError'));
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(getTranslation('exitAppTitle'), getTranslation('exitAppMessage'), [
        {
          text: getTranslation('cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        { text: getTranslation('yes'), onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Ícone */}
        <View style={styles.headerIconContainer}>
          <Icon name="lock" size={90} color="#6C63FF" style={styles.icon} />
        </View>

        {/* Título */}
        <Text style={styles.title}>{getTranslation('title')}</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>{getTranslation('subtitle')}</Text>

        {/* Configuração de Tamanho */}
        <View style={styles.card}>
          <Text style={styles.label}>{getTranslation('passwordLength')}</Text>
          <View style={styles.lengthSelector}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => setLength((prev) => Math.max(4, prev - 1))}
            >
              <Icon name="minus" size={20} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.lengthDisplay}>
              <Text style={styles.lengthText}>{length}</Text>
            </View>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => setLength((prev) => Math.min(20, prev + 1))}
            >
              <Icon name="plus" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Gerar Senha */}
        <TouchableOpacity style={styles.generateButton} onPress={generatePassword}>
          <Text style={styles.buttonText}>{getTranslation('generatePassword')}</Text>
        </TouchableOpacity>

        {/* Resultado */}
        {password && (
          <View style={styles.resultContainer}>
            <Text style={styles.password}>{password}</Text>
            {showNameInput && (
              <TextInput
                style={styles.input}
                placeholder={getTranslation('enterName')}
                value={name}
                onChangeText={setName}
              />
            )}
          </View>
        )}

        {/* Ações */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.smallActionButton} onPress={savePassword}>
            <Icon name="save" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>{getTranslation('save')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallActionButton} onPress={() => navigation.navigate('SavedPasswords')}>
            <Icon name="folder" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>{getTranslation('savedPasswords')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallActionButton} onPress={sharePassword}>
            <Icon name="share-alt" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>{getTranslation('sharePassword')}</Text>
          </TouchableOpacity>
        </View>

        {/* Compartilhar App */}
        <TouchableOpacity style={styles.shareAppButton} onPress={shareApp}>
          <Icon name="share-square" size={20} color="#FFF" />
          <Text style={styles.shareAppButtonText}>{getTranslation('shareApp')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

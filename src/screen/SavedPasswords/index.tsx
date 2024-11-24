import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native'; // Importa o hook useNavigation
import { styles } from './styles';

export const SavedPasswords = () => {
  const [passwords, setPasswords] = useState<{ name: string; password: string }[]>([]);
  const navigation = useNavigation(); // Define a navegação

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
      Alert.alert('Sucesso', 'Todas as senhas foram apagadas.');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao apagar as senhas.');
    }
  };

  const deletePassword = async (index: number) => {
    try {
      const updatedPasswords = [...passwords];
      updatedPasswords.splice(index, 1);

      await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);

      Alert.alert('Sucesso', 'Senha apagada com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao apagar a senha.');
    }
  };

  const copyToClipboard = (password: string) => {
    Clipboard.setString(password);
    Alert.alert('Sucesso', 'Senha copiada para a área de transferência!');
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#6C63FF" />
      </TouchableOpacity>

      <Text style={styles.title}>Senhas Salvas</Text>

      {passwords.length === 0 ? (
        <Text style={styles.listEmptyText}>Nenhuma senha salva.</Text>
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
        <Text style={styles.deleteButtonText}>Apagar Todas</Text>
      </TouchableOpacity>
    </View>
  );
};

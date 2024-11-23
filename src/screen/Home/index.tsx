import React, { useState , useEffect} from 'react';
import { View, Text, BackHandler, TouchableOpacity, TextInput, Alert, Share, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

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
      Alert.alert('Erro', 'Gere uma senha antes de compartilhar.');
      return;
    }

    try {
      await Share.share({
        message: `Sua senha gerada é: ${password}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a senha.');
    }
  };

  const shareApp = async () => {
    const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.seuapp'; // Atualize com o ID do seu app

    try {
      await Share.share({
        message: `Instale este incrível aplicativo para gerar senhas seguras: ${googlePlayLink}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o aplicativo.');
    }
  };

  const savePassword = async () => {
    if (!password) {
      Alert.alert('Erro', 'Gere uma senha antes de salvar.');
      return;
    }

    try {
      const savedPasswords = (await AsyncStorage.getItem('passwords')) || '[]';
      const passwordsArray = JSON.parse(savedPasswords);

      passwordsArray.push({ name: name || 'Senha Sem Nome', password });
      await AsyncStorage.setItem('passwords', JSON.stringify(passwordsArray));

      Alert.alert('Sucesso', 'Senha salva com sucesso!');
      setName('');
      setShowNameInput(false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a senha.');
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Sair', 'Deseja fechar o aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Intercepta o botão voltar
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Remove o evento ao desmontar o componente
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
        <Text style={styles.title}>Gerador de Senhas</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>Crie senhas seguras com facilidade</Text>

        {/* Configuração de Tamanho */}
        <View style={styles.card}>
          <Text style={styles.label}>Tamanho da senha</Text>
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
          <Text style={styles.buttonText}>Gerar Senha</Text>
        </TouchableOpacity>

        {/* Resultado */}
        {password && (
          <View style={styles.resultContainer}>
            <Text style={styles.password}>{password}</Text>
            {showNameInput && (
              <TextInput
                style={styles.input}
                placeholder="Digite um nome (Opcional)"
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
            <Text style={styles.actionButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallActionButton} onPress={() => navigation.navigate('SavedPasswords')}>
            <Icon name="folder" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Senhas Salvas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallActionButton} onPress={sharePassword}>
            <Icon name="share-alt" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Compartilhar Senha</Text>
          </TouchableOpacity>
        </View>

        {/* Compartilhar App */}
        <TouchableOpacity style={styles.shareAppButton} onPress={shareApp}>
          <Icon name="share-square" size={20} color="#FFF" />
          <Text style={styles.shareAppButtonText}>Compartilhar App</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

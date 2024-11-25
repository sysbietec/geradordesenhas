import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import * as Localization from 'expo-localization';
import { translations } from '../../localization/translations';

// Tipagem para as traduções
type TranslationsType = typeof translations;

// Função para obter traduções baseadas no idioma do dispositivo
export const getTranslation = (key: keyof TranslationsType['en']): string => {
  const language = Localization.locale.split('-')[0] as keyof TranslationsType;
  return translations[language]?.[key] || translations['en'][key];
};

// Tipagem para navegação
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const AnimatedLine = Animated.createAnimatedComponent(Line);

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const progress = useSharedValue(0);
  const lockScale = useSharedValue(1);

  // Valores animados para a marca
  const marcaScale = useSharedValue(0.5);
  const marcaTranslateY = useSharedValue(300);
  const marcaRotate = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false);
    lockScale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);

    // Animação para a marca Sysbietec
    marcaScale.value = withTiming(1, { duration: 1500 });
    marcaTranslateY.value = withTiming(0, { duration: 1500 });
    marcaRotate.value = withTiming(360, { duration: 1500 });
  }, [progress, lockScale, marcaScale, marcaTranslateY, marcaRotate]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: lockScale.value }],
  }));

  const animatedMarcaStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: marcaScale.value },
      { translateY: marcaTranslateY.value },
      { rotate: `${marcaRotate.value}deg` },
    ],
  }));

  const renderLoadingBars = () => {
    const bars = [];
    const radius = 90;
    const barLength = 10;

    for (let i = 0; i < 36; i++) {
      const angle = (i * 10 * Math.PI) / 180;

      const x1 = radius * Math.cos(angle);
      const y1 = radius * Math.sin(angle);
      const x2 = (radius + barLength) * Math.cos(angle);
      const y2 = (radius + barLength) * Math.sin(angle);

      const opacity = Math.abs(Math.sin((progress.value * Math.PI - (i * Math.PI)) / 18));

      bars.push(
        <Line
          key={i}
          x1={110 + x1}
          y1={110 + y1}
          x2={110 + x2}
          y2={110 + y2}
          stroke="#6C63FF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={opacity}
        />
      );
    }
    return bars;
  };

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Svg width={220} height={220} style={styles.svg}>
        <Circle cx="110" cy="110" r="100" fill="none" stroke="#EDEDED" strokeWidth="2" />
        {renderLoadingBars()}
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <Icon name="lock" size={90} color="#6C63FF" />
        </Animated.View>
      </Svg>

      <Text style={styles.subtitle}>
        <Text style={{ fontWeight: 'bold' }}>🔑 </Text>
        {getTranslation('subtitle')}
      </Text>

      <Animated.View style={[styles.marcaContainer, animatedMarcaStyle]}>
        <LinearGradient colors={['#6C63FF', '#A57FFF']} style={styles.marcaContainer}>
          <Text style={styles.title_marca}>{getTranslation('title_marca')}</Text>
          <Text style={styles.marcaText}>{getTranslation('marcaText')}</Text>
        </LinearGradient>
      </Animated.View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>{getTranslation('start')}</Text>
      </TouchableOpacity>
    </View>
  );
};

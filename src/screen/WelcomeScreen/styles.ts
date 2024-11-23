import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fundo branco puro
    paddingVertical: 50,
  },
  svg: {
    position: 'relative', // Permitindo que os elementos dentro sejam posicionados
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute', // Centraliza dentro do SVG
    top: 110 - 45, // 110 (centro) menos metade do tamanho do ícone
    left: 110 - 45, // Ajustando para centralizar horizontalmente
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED', // Fundo suave para o ícone
    borderRadius: 45,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icon: {
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#4D4D4D',
    textAlign: 'center',
    marginTop: 30,
    opacity: 0.85,
  },
  continueButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 4,
    marginTop: 50,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
 
  gif: {
    width: 80,
    height: 80,
  },
  
});

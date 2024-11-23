import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  savedPassword: {
    flexDirection: 'row', // Permite alinhar informações e ícones na mesma linha
    justifyContent: 'space-between', // Espaço entre o texto e os ícones
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Sombra leve
    width: '90%',
    alignSelf: 'center',
  },
  passwordInfo: {
    flex: 1, // Faz com que o texto ocupe o máximo de espaço disponível
    marginRight: 10,
  },
  passwordName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 5,
  },
  passwordText: {
    fontSize: 16,
    color: '#333',
  },
  iconGroup: {
    flexDirection: 'row', // Organiza os ícones lado a lado
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 10, // Espaçamento entre os ícones
    backgroundColor: '#FFF',
    elevation: 1, // Sombra leve para o botão
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra leve
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listEmptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  flatList: {
    width: '100%',
  },
});

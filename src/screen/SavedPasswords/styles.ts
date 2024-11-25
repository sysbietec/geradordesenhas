import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
 
  savedPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
  },
  passwordInfo: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
      justifyContent:'center',
      marginLeft:15,
      alignItems:'center',
      backgroundColor:'#fff',
      padding:10,
      width:48,
      height:48,
      borderRadius:5,
      elevation:3
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
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
  passwordsaveContainer: {
    flexDirection: 'row', // Alinha os elementos na horizontal
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'flex-start', // Alinha os elementos à esquerda
    paddingHorizontal: 20, // Espaçamento nas laterais
    marginTop: 20, // Espaçamento no topo
    width: '100%', // Ocupa toda a largura disponível
    marginBottom:30,
  },
  backButton: {
    marginRight: 10, // Espaçamento entre a flecha e o texto
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
  },  
});

import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 48, // Largura recomendada
    height: 48, // Altura recomendada
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    elevation: 2, // Sombra leve
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 20,
    textAlign: 'center',
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
});

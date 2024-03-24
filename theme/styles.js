import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea :{
    flex : 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderWidth: 2, // Ajout de la bordure
    borderColor: 'black', // Couleur de la bordure
    borderRadius: 5, // Ajout de la bordure arrondie
    padding: 10,
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date : {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight : 'bold',
    color: '#555',
  },
  descriptionContainer: {
    flexDirection: 'column',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  itemMargin: {
    marginBottom: 10, // Ajout de la marge entre les éléments
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 5,
    color : 'white',
  },
  bottomBar: {
    height: 80,
    backgroundColor: '#1A237E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  buttonAdd: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 0
  },


 //-------Event ------------

  middleNavBar: {
    borderRadius: 30
  },
  legendContainer: {
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignContent: 'center',
  },
  legendDescription: {
    fontSize: 16,
    marginHorizontal : 10,
    fontWeight : 'bold',
  },
  infoText: {
    marginLeft: 10,
  },


  //----Ressources-----
  resourceContainer: {
    borderWidth: 2, // Ajout de la bordure
    borderColor: 'black', // Couleur de la bordure
    borderRadius: 5, // Ajout de la bordure arrondie
    padding: 10,
    marginBottom: 10,
  },
  legendRessource : {
    fontWeight : 'bold',
    marginBottom : 10,
  }
});


export default styles;




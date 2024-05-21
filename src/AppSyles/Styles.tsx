import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#301E5F',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D1C9DB',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#D1C9DB',
        textAlign: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    loginButton: {
        backgroundColor: '#322564'
    },
    signUpButton: {
        backgroundColor: '#221944'
    },
    logoContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#301E5F" 
    },
    logo:{
        width: windowWidth, 
        height: windowHeight,
        resizeMode: 'contain', 
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#221944', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        borderRadius: 10, 
        width: '100%', 
        fontSize: 16, 
        color: '#333' 
    },
    textInputLabel: {
        color: '#D1C9DB',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%', 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    chatWindowncontainer: {
        backgroundColor: '#301E5F',
        flex: 1,
        padding: 20,
      },
      messagesList: {
        flex: 1,
        marginBottom: 10,
      },
      message: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
      },
      userMessage: {
        backgroundColor: '#e0e0e0',
        alignSelf: 'flex-end',
      },
      geminiMessage: {
        backgroundColor: '#007bff',
        color: '#fff',
        alignSelf: 'flex-start',
      },
      Chatinput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        maxHeight: 150,
        backgroundColor: 'white',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      loadingText:{
        color:"white"
      },
      homeContainer: {
        flex: 1,
        backgroundColor: '#301E5F',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
      },
      homeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D1C9DB',
        marginBottom: 10,
      },
      homeSubtitle: {
        fontSize: 16,
        color: '#D1C9DB',
        textAlign: 'center',
        marginBottom: 20,
      },
      contactCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: '100%',
      },
      
      contactsContainer: {
     
        borderRadius: 10,
        padding: 10,
        width: '100%',
      },
      
      contactName: {
        color: '#301E5F',
        fontSize: 18,
        fontWeight: 'bold',
      },
      recentMessage: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
      },
      bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: windowWidth,
        position: 'absolute',
        bottom: 0,
    },
    
    bottomBarButton: {
        flex: 1,
        alignItems: 'center',
    },
});


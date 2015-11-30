'use strict';

var React = require('react-native');
//var SearchResults = require('./SearchResults');

var {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Component,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var STORAGE_KEY = '@BeaconMobile:authToken';

var styles = StyleSheet.create({
  container: {
        marginTop: 65,
        padding: 10
    },
    textInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    },
    loading:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});

var SignOutAction = React.createClass({

  getInitialState: function(){
    return {

    }
  },

  componentDidMount: function(){
    console.log("SignOutAction/componentDidMount")

  },

  render: function(){
    return (
      <View style={styles.container}>
      <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableHighlight>
      </View>
    );
  },

  signOut: function(){
    console.log("SignOutAction signOut");
    this.props.signOut();
  },

});



module.exports = SignOutAction;

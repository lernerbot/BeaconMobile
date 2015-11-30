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

var SignInAction = React.createClass({

  getInitialState: function(){
    return {
      email: '',
      password: '',
      isLoading: false,
      errorMessage: '',
      jsonData: '',
      token: '',
      authToken: '',
      messages: [],
      isLoggedIn: false,
    }
  },

  componentDidMount: function(){
    console.log("SignInAction/componentDidMount")
    var status = this.props.status;
    console.log("Status:", status);
    this.setState({
      isLoggedIn: status,
    });
  },

  render: function(){

    if (this.state.isLoading){
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
      <Text style={styles.instructions}>Please Sign In</Text>
        <View>
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput style={styles.textInput} onChange={this.emailInput}/>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Password:</Text>
          <TextInput style={styles.textInput} secureTextEntry={true} onChange={this.passwordInput}/>
        </View>
        <TouchableHighlight style={styles.button}
            underlayColor='#f1c40f'
            onPress={this.signIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    );
  },

  emailInput: function(event){
    this.setState({email: event.nativeEvent.text});
  },

  passwordInput: function(event){
    this.setState({password: event.nativeEvent.text});
  },

  signIn: function(){
    console.log("SignInAction signIn");
    this.fetchData();
  },

  renderLoadingView: function(){
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>
          Signing In...
        </Text>
      </View>
    );
  },

  fetchData: function(){
    var URL = "https://beekon-staging.herokuapp.com/login.json";
    var URL2 = "https://beekon-staging.herokuapp.com/users/sign_in";
    //var URL = "http://192.168.0.4:5000/login.json";
    //var URL2 = "http://192.168.0.4:5000/users/sign_in";
    this.setState({
      isLoading: true,
    })
    fetch(URL, {
      method: 'GET',
    })
    .then((responseData) => {
      this.setState({
        jsonData: responseData
      });
      console.log("GET Response:", this.state.jsonData._bodyText);
      var body = JSON.parse(this.state.jsonData._bodyText);
      console.log("CSRF Token:", body.token);
      this.setState({
        token: body.token
      });
    })
    .then(()=> {
      fetch(URL2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.token
        },
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            remember_me: 1
          }
        })
      })
      .then((response) => response.text())
      .then((responseText) => {
        //console.log("Post Response", responseText);
        var responseJSON = JSON.parse(responseText);
        //console.log("Response JSON:", responseJSON);
        var authToken = responseJSON.authentication_token;
        //console.log("Auth Token:", authToken);
        this.setState({
          authToken: authToken,
          isLoggedIn: true,
        });
        console.log("SignInAction/fetchData:", this.state.authToken);
        this.props.returnedToken(this.state.authToken);
        this.setState({
          isLoading: false,
        })
      })
      .catch((error) => {
        console.warn(error);
      });
    })
  },
});


/*
style={styles.button}
underlayColor='#f1c40f'
*/


module.exports = SignInAction;

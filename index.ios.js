'use strict';

var React = require('react-native');
var SignInView = require('./SignInView');
var SignInAction = require('./SignInAction');
var SignOutView = require('./SignOutView');
var SignOutAction = require('./SignOutAction');
var UpcomingEventsTab = require('./UpcomingEventsTab');
var MapViewTab = require('./MapViewTab');
var STORAGE_KEY = '@BeaconMobile:authToken';

var {
  AppRegistry,
  AsyncStorage,
  TabBarIOS,
  StyleSheet,
  NavigatorIOS,
  Text,
  ActivityIndicatorIOS,
  View,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});

var Beacon = React.createClass({
  getInitialState: function(){
    console.log("Get Initial State Run");
    return {
      selectedTab: 'signinview',
      isLoggedIn: false,
      authToken: ''
    }
  },

  signedIn: function(newToken){
    console.log("index.ios/signedIn, newToken", newToken);
    this.setState({
      selectedTab: 'upcomingeventstab',
      isLoggedIn: true,
      authToken: newToken
    });
    console.log("index.ios/signedIn, Token is:", this.state.authToken);
    this.saveToken(newToken);
  },

  signOut: function(){
    console.log("index.ios/signOut");
    AsyncStorage.setItem(STORAGE_KEY, '');
    this.setState({
      selectedTab: 'signinview',
      isLoggedIn: false,
      authToken: '',
    });
  },

  componentDidMount: function(){
    console.log("index.ios ComponentDidMount Run");
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      console.log("Value is:", value);
      if (value !== null){
        this.setState({
          authToken: value,
          isLoggedIn: true,
          selectedTab: 'upcomingeventstab',
        });
        console.log("Key Retrieved:", value);
      } else {
        this.setState({
          selectedTab: 'signinview',
        });
        console.log("Empty key found")
      }

    }).done();

    //uncomment section below to invalidate key to sign out in
    //AsyncStorage.setItem(STORAGE_KEY, '');
  },

  saveToken: function(value) {
        AsyncStorage.setItem(STORAGE_KEY, value);
  },

  render: function(){
    console.log("index.ios Render Run");
    console.log("Logged In:", this.state.isLoggedIn);
    console.log("this.state.authToken", this.state.authToken);

    var loggedIn = this.state.isLoggedIn ?
      (<SignOutView signOut={this.signOut} />) :
      (<SignInView getToken={this.signedIn} />);


    return(
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
            selected={this.state.selectedTab === 'signinview'}
            systemIcon = "search"
            onPress={() => {
              this.setState({
                selectedTab: 'signinview'
              });
            }}>
            {loggedIn}
        </TabBarIOS.Item>
        <TabBarIOS.Item
            selected={this.state.selectedTab === 'upcomingeventstab'}
            systemIcon = "featured"
            onPress={() => {
              this.setState({
                selectedTab: 'upcomingeventstab'
              });
            }}>
            <UpcomingEventsTab authToken={this.state.authToken} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            selected={this.state.selectedTab === 'mapviewtab'}
            systemIcon = "more"
            onPress={() => {
              this.setState({
                selectedTab: 'mapviewtab'
              });
            }}>
            <MapViewTab authToken={this.state.authToken} />
        </TabBarIOS.Item>
    </TabBarIOS>
  );
},

  renderSignInView: function(){
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Sign In',
          component: SignInAction,
          passProps: { returnedToken: this.signedIn},
        }}/>
    );
  }
})


AppRegistry.registerComponent('Beacon', () => Beacon);

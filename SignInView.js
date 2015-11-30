'use strict';

var React = require('react-native');
var SignInAction = require('./SignInAction')

var {
  StyleSheet,
  NavigatorIOS,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

var SignInView = React.createClass({
  getInitialState: function(){
    return {
      authToken: '',
    }
  },

  componentDidMount: function(){
    console.log("SignInView/componentDidMount");
  },

  getToken: function(newToken){
    console.log("SignInView/getToken:", newToken);
    this.props.getToken(newToken);
  },


  render: function(){
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Sign In',
          component: SignInAction,
          passProps: {
            returnedToken: this.getToken,
            },
        }}/>
    );
  }
})


module.exports = SignInView;

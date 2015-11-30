'use strict';

var React = require('react-native');
var SignOutAction = require('./SignOutAction')

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

var SignOutView = React.createClass({
  getInitialState: function(){
    return {
      authToken: '',
    }
  },

  componentDidMount: function(){
    console.log("SignOutView/componentDidMount");
  },

  signOut: function(){
    console.log("SignOutView/signOut");
    this.props.signOut();
  },

  render: function(){
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Sign Out',
          component: SignOutAction,
          passProps: {
            signOut: this.signOut,
          },
        }}/>
    );
  }
})


module.exports = SignOutView;

'use strict';

var React = require('react-native');
var MapView = require('./MapView');


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

var MapViewTab = React.createClass({
  getInitialState: function(){
    return {
      authToken: '',
    }
  },

  componentDidMount: function(){
    this.setState({
      authToken: this.props.authToken,
    });

    console.log("MapViewTab componentDidMount");
    console.log("Auth Token:", this.props.authToken);
  },

  render: function() {
    console.log("MapViewTab Render Run");
    return(
      <NavigatorIOS
        navigationBarHidden={true}
        style={styles.container}
        initialRoute={{
          title: 'Events Map',
          component: MapView,
          passProps: { authToken: this.props.authToken},
        }}/>
    );
  }
})



module.exports = MapViewTab;

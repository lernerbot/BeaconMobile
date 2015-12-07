'use strict';

var React = require('react-native');
var MyEventsList = require('./MyEventsList');


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

var MyEventsTab = React.createClass({
  getInitialState: function(){
    return {
      authToken: '',
    }
  },

  componentDidMount: function(){
    this.setState({
      authToken: this.props.authToken,
    });

    console.log("MyEventsTab Component Did Mount Ran");
    console.log("Auth Token:", this.props.authToken);
  },

  render: function() {
    console.log("My Events Tab Render Run");
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'My Events',
          component: MyEventsList,
          passProps: { authToken: this.props.authToken},
        }}/>
    );
  }
})



module.exports = MyEventsTab;

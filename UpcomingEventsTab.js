'use strict';

var React = require('react-native');
var UpcomingEventsList = require('./UpcomingEventsList');


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

var UpcomingEventsTab = React.createClass({
  getInitialState: function(){
    return {
      authToken: '',
    }
  },

  componentDidMount: function(){
    this.setState({
      authToken: this.props.authToken,
    });

    console.log("UpcomingEventsTab Component Did Mount Ran");
    console.log("Auth Token:", this.props.authToken);
  },

  render: function() {
    console.log("Upcoming Events Tab Render Run");
    return(
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Events',
          component: UpcomingEventsList,
          passProps: { authToken: this.props.authToken},
        }}/>
    );
  }
})



module.exports = UpcomingEventsTab;

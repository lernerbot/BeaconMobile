'use strict';

var React = require('react-native');
//var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

var {
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
  Component,
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  title: {
    padding: 10,
    fontSize: 15,
    color: '#000000'
  },
});

var MapView = React.createClass({

  render: function(){
    console.log("MapView render");
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Loading Map...</Text>
      </View>
    );
  },
});

module.exports = MapView;

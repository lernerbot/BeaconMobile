'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Component,
    Image,
    TouchableHighlight,
   } = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#000000',
    },
    namecontainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF',
      padding: 10,
      marginTop: 0,
    },
    mapcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 10,
    },
    description: {
        padding: 10,
        fontSize: 18,
        color: '#000000'
    },
    subdescription: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        fontSize: 14,
        color: '#000000',
        flexWrap: 'wrap',
    },
    seperator: {
      height: 1,
      backgroundColor: '#dddddd'
    },


});

var MyEventsDetail = React.createClass({

  render: function() {
      //console.log("event item:", this.props.eventItem);
      var name = this.props.eventItem.name;
      console.log("Name:", name);
      var date = this.props.eventItem.meet_time;
      console.log("Date:", date);
      var host = this.props.eventItem.user_id;
      console.log("Host:", host);
      var address = this.props.eventItem.address;
      console.log("Address:", address);
      var activityType = this.props.eventItem.activity_type;
      console.log("Activity Type:", activityType);
      var lat = this.props.eventItem.latitude;
      console.log("LAT:", lat);
      var lon = this.props.eventItem.longitude;
      console.log("LON:", lon);


      //var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
      //var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
      return (
          <View>
            <View style={styles.namecontainer}>
              <Text style={styles.description}>{name}</Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Map Goes Here</Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Date: {date}</Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}> Start Point: {lat}, {lon}</Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Address: {address}</Text>
            </View>
            <View style={styles.seperator} />
          </View>



      );
  }
})



module.exports = MyEventsDetail;

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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#F5FCFF',
      padding: 10,
      marginTop: 65,
    },
    mapcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 0,
      marginTop: 0,
    },
    description: {
        padding: 10,
        fontSize: 18,
        color: '#000000'
    },
    subdescription: {
        padding: 10,
        fontSize: 14,
        color: '#000000'
    },
    rightContainer: {
      flex: 1,
      marginLeft: 100,
    },
    button: {
        height: 30,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
});

var EventDetail = React.createClass({

  render: function() {
      //console.log("event item:", this.props.eventItem);
      var name = this.props.eventItem.name;
      console.log("Name:", name);
      var date = this.props.eventItem.date_field;
      console.log("Date:", date);
      var time = this.props.eventItem.time_field;
      console.log("Time:", time);
      var distance = this.props.eventItem.route.distance;
      console.log("Distance:", distance);
      var elevation = this.props.eventItem.route.elevation_gain;
      console.log("Elevation:", elevation);
      var address = this.props.eventItem.address;
      console.log("Address:", address);
      var activityType = this.props.eventItem.activity_type;
      console.log("Activity Type:", activityType);
      var userID = this.props.eventItem.user_id;
      console.log("User ID:", userID);
      var participants = this.props.eventItem.participations;
      console.log("Participants:", participants);

      //var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
      //var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
      return (
          <View style={styles.container}>
            <View style={styles.namecontainer}>
              <Text style={styles.description}>{name}</Text>
              <View style={styles.rightContainer}>
                <TouchableHighlight style={styles.button}
                    underlayColor='#f1c40f'
                    onPress={console.log("Button Pressed")}>
                  <Text style={styles.buttonText}>Join</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Map Goes Here</Text>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Attendees: {participants.length}</Text>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Date: {date} {time}</Text>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Distance: {distance} m</Text>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Elevation: {elevation}</Text>
            </View>
            <View style={styles.mapcontainer}>
              <Text style={styles.subdescription}>Address: {address}</Text>
            </View>
          </View>



      );
  }
})



module.exports = EventDetail;

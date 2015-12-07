'use strict';

var React = require('react-native');
var EventDetail = require('./EventDetail');


var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  seperator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView:{
    marginTop: 65,
    backgroundColor: '#FFFFFF'
  },
  loading:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

var UpcomingEventsList = React.createClass({
  getInitialState: function(){
    return {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
    }
  },

  componentDidMount: function(){
    this.fetchData();
  },

  fetchData: function(){
    var URL = "https://beekon-staging.herokuapp.com/activities/1.json";
    //var URL = "http://192.168.0.4:5000/activities/100.json";
    fetch(URL, {
      method: 'GET',
    })
    .then((responseData) => {
      console.log(responseData);
      var body = JSON.parse(responseData._bodyText);
      console.log("Name:", body.activity.name);
      var name = body.activity;
      var items = {name};
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        isLoading: false
      });
    })
    .catch((error) => {
        console.warn(error);
    });
  },

  render: function(){
    if (this.state.isLoading){
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEvent}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function(){
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>
          Loading Upcoming Events...
        </Text>
      </View>
    );
  },

  showEventDetail: function(eventItem){
    //console.log("showEventDetail", eventItem);
    this.props.navigator.push({
      title: eventItem.name,
      component: EventDetail,
      passProps: {eventItem}
    });
  },

  renderEvent: function(eventItem){
    return(
      <TouchableHighlight onPress={() => this.showEventDetail(eventItem)}  underlayColor='#dddddd'>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{eventItem.name}</Text>
          </View>
          <View style={styles.seperator} />
        </View>
      </TouchableHighlight>
    );
  },

});


module.exports = UpcomingEventsList;

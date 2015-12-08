'use strict';

var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

var {
    StyleSheet,
    Text,
    View,
    Component,
    Image,
    TouchableHighlight,
    ActivityIndicatorIOS,
    StatusBarIOS,
   } = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#000000',
    },
    map: {
      flex: 1,
      marginTop: 20,
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
    loading:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

});

var MyEventsDetail = React.createClass({
  mixins: [Mapbox.Mixin],
  getInitialState: function(){
    return {
      isLoading: true,
      distance: '',
      elevation: '',
      geoJson: '',
      center: {
        latitude: 34.05013,
        longitude: -118.51302000000001
      },
      zoom: 11,
      annotations: [{
        coordinates: [34.05013, -118.51302000000001],
        'type': 'point',
        title: 'This is marker 1',
        id: 'Start'

      }]

    }
  },

  componentDidMount: function(){
    this.fetchData();
  },

  fetchData: function(){
    var activity = this.props.eventItem.id;
    var baseURL = "https://beekon-staging.herokuapp.com/activities/";
    //var baseURL = "http://192.168.0.4:5000/activities/100.json";
    var URL = baseURL + activity + ".json";
    console.log("URL is:", URL);
    fetch(URL, {
      method: 'GET',
    })
    .then((responseData) => {
      //console.log(responseData);
      var body = JSON.parse(responseData._bodyText);
      //console.log("Route is:", body.activity.route);
      var distance = body.activity.route.distance;
      //console.log("Distance:", distance);
      var elevation = body.activity.route.elevation_gain;
      //console.log("Elevation:", elevation);
      var geoJson = body.activity.route.geojson;
      //console.log("Geo JSON:", geoJson.features);

      var coordinates = geoJson.features.map((feature) => {
        return feature.geometry.coordinates.map((element) =>{
          return element.reverse();
        });
      });
      var merged = [].concat.apply([], coordinates);
      var lastCoordinate = merged[merged.length - 1];

      console.log("Coordinates length: ", merged.length);
      this.setState({
        isLoading: false,
        distance: distance,
        elevation: elevation,
        geoJson: geoJson,
        center: {
          latitude: this.props.eventItem.latitude,
          longitude: this.props.eventItem.longitude
        },
        annotations: [{
            coordinates: [this.props.eventItem.latitude, this.props.eventItem.longitude],
            'type': 'point',
            title: 'Start',
            id: 'Start',
          },
          {
            'coordinates': merged,
            'type': 'polyline',
            'strokeColor': '#00FB00',
            'strokeWidth': 4,
            'strokeAlpha': .5,
            'id': 'Test'
          },
          {
              coordinates: lastCoordinate,
              'type': 'point',
              title: 'Finish',
              id: 'Finish',
          },
        ]
      });
    })
    .catch((error) => {
        console.warn(error);
    });
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log(location);
  },
  onUpdateUserLocation(location) {
    console.log(location);
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  onRightAnnotationTapped(e) {
    console.log(e);
  },
  onLongPress(location) {
    console.log('long pressed', location);
  },

  render: function() {
      //console.log("event item:", this.props.eventItem);
      /*var name = this.props.eventItem.name;
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
      StatusBarIOS.setHidden(true);*/

      if (this.state.isLoading){
        return this.renderLoadingView();
      }

      return (
        <View style={styles.map}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={'pk.eyJ1Ijoibmlib3JnIiwiYSI6IjBlZWJjNmU1NjczMWI3ZjFlMzY1Y2FjNWZmNzczMDMzIn0.iQkP6nIFwoTpfTpk4QplJQ'}
          styleURL={this.mapStyles.emerald}
          userTrackingMode={this.userTrackingMode.none}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
        </View>
      );

      /*return (
          <View>
            <View style={styles.namecontainer}>
              <Text style={styles.description}>{name}</Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.mapcontainer}>
              <Mapbox
                style={styles.map}
                direction={0}
                rotateEnabled={false}
                scrollEnabled={true}
                zoomEnabled={true}
                showsUserLocation={true}
                ref={mapRef}
                accessToken={'pk.eyJ1Ijoibmlib3JnIiwiYSI6IjBlZWJjNmU1NjczMWI3ZjFlMzY1Y2FjNWZmNzczMDMzIn0.iQkP6nIFwoTpfTpk4QplJQ'}
                styleURL={this.mapStyles.emerald}
                userTrackingMode={this.userTrackingMode.none}
                centerCoordinate={this.state.center}
                zoomLevel={this.state.zoom}
                onRegionChange={this.onRegionChange}
                onRegionWillChange={this.onRegionWillChange}
                annotations={this.state.annotations}
                onOpenAnnotation={this.onOpenAnnotation}
                onRightAnnotationTapped={this.onRightAnnotationTapped}
                onUpdateUserLocation={this.onUpdateUserLocation}
                onLongPress={this.onLongPress} />
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



      );*/
  },

  renderLoadingView: function(){
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS size='large'/>
        <Text>
          Loading Event...
        </Text>
      </View>
    );
  },
})



module.exports = MyEventsDetail;

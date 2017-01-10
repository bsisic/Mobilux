
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text} from 'native-base';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var FBLoginMock = require('./facebook/FBLoginMock.js');

import { setUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;

const background = require('../../../images/logo.png');

var FB_PHOTO_WIDTH = 200;

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: '',
      forgotpassword: 'Mot de passe oublié ?',
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.logo} />
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                  />
                </InputGroup>
                <Button style={styles.btn} onPress={() => this.replaceRoute('home')}>
                  Connexion
                </Button>
                <Text style={styles.forgot}>{this.state.forgotpassword}</Text>
                <View style={styles.bottombtn}>
                  <FBLogin style={styles.fbbtn}
                    permissions={["email","user_friends"]}
                    onLogin={function(data){
                      console.log("Logged in!");
                      console.log(data);
                      _this.setState({ user : data.credentials });
                    }}
                    onLogout={function(){
                      console.log("Logged out.");
                      _this.setState({ user : null });
                    }}
                    onLoginFound={function(data){
                      console.log("Existing login found.");
                      console.log(data);
                      _this.setState({ user : data.credentials });
                    }}
                    onLoginNotFound={function(){
                      console.log("No user logged in.");
                      _this.setState({ user : null });
                    }}
                    onError={function(data){
                      console.log("ERROR");
                      console.log(data);
                    }}
                    onCancel={function(){
                      console.log("User cancelled.");
                    }}
                    onPermissionsMissing={function(data){
                      console.log("Check permissions!");
                      console.log(data);
                    }}
                  />
                  <Button style={styles.registerbtn} onPress={() => this.replaceRoute('home')}>
                      Créer un nouveau compte
                  </Button>
                </View>
              </View>
                { user && <Photo user={user} /> }
                { user && <Info user={user} /> }

                <Text>{ user ? user.token : "" }</Text>
          </Content>
        </View>
      </Container>
    );
  }
}


var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render: function(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
});

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);

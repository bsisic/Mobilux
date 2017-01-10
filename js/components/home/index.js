
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import Hr from 'react-native-hr';

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title style={{color:'#fff'}}>{(this.props.name) ? this.props.name : 'Home'}</Title>
        </Header>

        <Content>
          <Grid style={styles.mt}>
          <Row>
            <Icon style={styles.iconmt} name="ios-car" />
            <Text style={styles.imptxt}>Alerte Trafic : accident sur l'A4</Text>
          </Row>
          <Row style={styles.details}>
            <Text style={styles.dettxt}>Dernière mise à jour : il y a 36 min</Text>
          </Row>

          <Row>
            <Icon style={styles.iconmt} name="ios-train" />
            <Text style={styles.imptxt}>Alerte Train : retard de +/- 35min sur la ligne 5</Text>
          </Row>
          <Row style={styles.details}>
            <Text style={styles.dettxt}>Dernière mise à jour : il y a 6 min</Text>
          </Row>

          <Hr lineColor='#b3b3b3'
              text='Météo'
          />

          <Row style={{paddingTop:20}}>
            <Icon style={styles.iconmt} name="ios-thunderstorm-outline" />
            <Text style={styles.imptxt}>Alerte Météo : orage prévu vers 17h</Text>
          </Row>
          <Row style={styles.details}>
            <Text style={styles.dettxt}>Dernière mise à jour : il y a 11 min</Text>
          </Row>
          </Grid>

          <Button style={styles.alertbtn} onPress={() => this.pushRoute('blankPage')}>
            +
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#5EC4E8'}}>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon style={{color:'#fff'}} name="ios-arrow-back" />
          </Button>

          <Title style={{color:'#fff'}}>{(name) ? this.props.name : "Création d'une alerte"}</Title>
        </Header>

        <Content padder style={styles.cont}>
          <Text style={styles.txt}>Si</Text>
          <Button bordered success><Icon name="ios-add-circle-outline"/> Ajouter un flux d'entrée</Button>
          <Text style={styles.txt}>Alors</Text>
          <Button bordered danger><Icon name="ios-add-circle-outline"/> Ajouter un flux de sortie</Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);

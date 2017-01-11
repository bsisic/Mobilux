
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, View } from 'native-base';
import Modal from 'react-native-root-modal';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class BlankPage extends Component {
  constructor() {
        super();
        this.state = {
            visible: false
        };
    }

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  showModal = () => {
        this.setState({
            visible: true
        });
    };

    hideModal = () => {
        this.setState({
            visible: false
        });
    };

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

        <Content style={styles.cont}>
          <Text style={styles.txt}>Si</Text>
          <Button bordered success style={styles.btn} onPress={this.showModal}><Icon name="ios-add-circle-outline"/> Ajouter un flux d'entrée</Button>
          <Text style={styles.txt}>Alors</Text>
          <Button bordered danger style={styles.btn}><Icon name="ios-add-circle-outline"/> Ajouter un flux de sortie</Button>

            <Modal
              style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
              visible={this.state.visible}>
              <Button style={styles.close} onPress={this.hideModal}>
                <Icon name='ios-close-circle' />
              </Button>
              <View style={{alignSelf:'center',width:null}}>
                <Button style={styles.inflow} large info>Météo</Button>
                <Button style={styles.inflow} large info>Trafic Routier</Button>
                <Button style={styles.inflow} large info>Trafic Ferroviaire</Button>
                <Button style={styles.inflow} large info>Trafic Bus</Button>
                <Button style={styles.inflow} large info>Stations de vélos</Button>
              </View>
            </Modal>
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

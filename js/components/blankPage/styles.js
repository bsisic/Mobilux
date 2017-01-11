
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  cont: {
    width: deviceWidth / 1.2,
    alignSelf:'center'
  },
  txt:{
    textAlign:'center',
    paddingBottom:10,
    paddingTop:10,
    fontSize: 20,
  },
  btn:{
    width: deviceWidth / 1.2,
  },
  close: {
      position: 'absolute',
      right: 20,
      top: 40,
  }
});

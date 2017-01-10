
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    height: deviceHeight / 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5EC4E8',
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    marginTop: 40,
  },
  bg: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: 300,
    backgroundColor: '#222',
    alignSelf: 'center',
  },
  fbbtn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  bottombtn: {
    height: 20,
    marginBottom: 1,
  },
  forgot: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine : 'underline',
  },
  registerbtn: {
    marginTop: 20,
    width: 300,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fff'
  }
});

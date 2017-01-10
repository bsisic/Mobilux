
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  alertbtn: {
    marginTop: 20,
    alignSelf: 'center',
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#222',
  }
});

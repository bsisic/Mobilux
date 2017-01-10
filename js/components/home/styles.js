
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;

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
    width: null,
    alignSelf: 'center',
  },
  iconmt: {
    fontSize: 18,
  },
  imptxt: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  details: {
    paddingLeft: 30,
  },
  dettxt: {
    color: 'grey',
    fontSize: 12,
    textAlign: 'center',
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

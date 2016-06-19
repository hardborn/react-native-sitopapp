'use strict';

import React from 'react';
import {
	View,
	StatusBar,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import SiTopNavigator from './SiTopNavigator';

class SiTopApp extends React.Component{
	render(){
		return (
			<View style={styles.container}>
			<StatusBar
			  translucent={true}
			  backgroundColor="rgba(0, 0, 0, 0.2)"
			  barStyle="light-content"
			 />
        <SiTopNavigator />
      </View>
      );
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
  };
}

export default SiTopApp;

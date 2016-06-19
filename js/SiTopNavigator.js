'use strict';

import React from 'react';
import {
	Navigator,
  StyleSheet
  } from 'react-native';
import SiTopTabsView from './tabs/SiTopTabsView';

class SiTopNavigator extends React.Component{
	render(){
		return (
			<Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
            return Navigator.SceneConfigs.FloatFromBottom;
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
			);
	}
	renderScene(route, navigator) {
    return <SiTopTabsView />;
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default SiTopNavigator;

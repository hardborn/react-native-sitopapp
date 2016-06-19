'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class CoursewareView extends React.Component{
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render(){
    return(
      
      <View
        style={styles.row}
        ref={component => this._root = component} {...this.props}>
        <Image
          style={styles.thumb}
          source={require('../image/story-background.png')}/>
        <View>
          <Text style={styles.text}>
            {this.props.rowData}
          </Text>
          <Text style={styles.text}>
            {this.props.rowData}
          </Text>
        </View>
      </View>

    )
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    margin:5,
    backgroundColor: 'gray',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

export default CoursewareView;

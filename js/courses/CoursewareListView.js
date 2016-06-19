'use strict';

import React from 'react';
import {
  ListView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import CoursewareView from './CoursewareView';



class CoursewareListView extends React.Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state={
    dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  };
  }
  render(){
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderRow}
      />
    );
  }
  _renderRow(rowData:Object,sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void){
    return (
        <TouchableOpacity>
        <CoursewareView rowData={rowData}/>
        </TouchableOpacity>
    );
  }
}

// <TouchableHighlight
// style={{margin:5,backgroundColor:'gray'}}
// onPress={() => {
//     highlightRow(sectionID, rowID);
//     }}>

// <CoursewareView rowData={rowData}/>
// </TouchableHighlight>

// CoursewareListView.propTypes = {
//   dataSource: React.PropTypes.a
// };

// CoursewareListView.defaultProps = {
//     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
// };
export default CoursewareListView;

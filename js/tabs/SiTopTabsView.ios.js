'use strict';

import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TabBarIOS,
	TabBarItemIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CoursewareListView from '../courses/CoursewareListView';

const TABNAME={
Home:"Home",
Course:"Course",
Person:"Person"
};

class SiTopTabsView extends React.Component {
  constructor(props) {
    super(props);
		this.state={
			selectedTab:TABNAME.Home
		}
  }

  render() {
    return (
      <TabBarIOS>
			<Icon.TabBarItem
            title="首页"
            iconName="ios-home-outline"
            selectedIconName="ios-home"
						selected={this.state.selectedTab === TABNAME.Home}
						onPress={()=>{
							this.setState({
								selectedTab:TABNAME.Home
							});
						}}
          >
					<View style={{flex:1,backgroundColor:'white'}}>
					<CoursewareListView />
					</View>
        </Icon.TabBarItem>
				<Icon.TabBarItem
	            title="课程"
	            iconName="ios-book-outline"
	            selectedIconName="ios-book"
	          >
							<CoursewareListView />
	        </Icon.TabBarItem>
					<Icon.TabBarItem
		            title="我"
		            iconName="ios-person-outline"
		            selectedIconName="ios-person"
		          >
								<CoursewareListView />
		        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default SiTopTabsView;

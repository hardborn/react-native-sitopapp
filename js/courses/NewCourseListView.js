'use strict';

import React from 'react';
import {
	ActivityIndicatorIOS,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import CourseView from './CourseView';
import TimerMixin from 'react-timer-mixin';

var BASE_URL = 'http://newsblock.io/api/';

var resultsCache = {
	dataForQuery: {},
	totalForQuery: {},
	timeForQuery: {}
}
var baseDataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
class NewCourseListView extends React.Component {
	mixins: [TimerMixin];

	constructor(props) {
		super(props);
		this.displayName = 'NewCourseListView';
		
		this.state = {
			dataSource: baseDataSource,
			isLoading: true,
			filter: 'nation',
		};
	}

	componentDidMount() {
		var _filter = this.props.filter || this.state.filter;
		this.fetchVideos(_filter);
	}

	render() {
		return (
			<View style={styles.container}>
              <View style={[styles.separator, {marginTop: 64}]} />
              <ListView
            ref="listview"
            dataSource={this.state.dataSource}
            renderHeader={this.renderHeader}
            renderRow={this.renderRow}
            initialListSize={8}
            pageSize={8}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            onScroll={this.handleScroll}/>
          </View>
		);
	}

	renderRow(video: Object) {
		return (
			<CourseView
            onSelect={() => this.selectVideo(video)}
            video={video}
        />
		);
	}

	renderHeader() {
		//if (this.state.isLoading) {
			return (
				<View style={styles.container}>
                <ActivityIndicatorIOS
                    animating={true}
                    style={[{marginTop: 10}]}
                />
            </View>
			);
		//}

	}

	handleScroll(event: Object) {

		if (event.nativeEvent.contentOffset.y < -110) { // pull-down
			this.setState({
				isLoading: true
			});
			var filter = this.props.filter || this.state.filter;
			// reduce dup fetches
			//this.clearTimeout(this.timeoutID);
			this.setTimeout(() => this.fetchVideos(filter), 250);
		}
	}

	fetchVideos(query: string) {

		//this.timeoutID = null;
		this.setState({
			isLoading: true,
			filter: query
		});

		var expiry = 1 * 60 * 1000; // cache expiration
		if (resultsCache.timeForQuery[query] + expiry > new Date().getTime()) {
			this.setState({
				isLoading: false,
				dataSource:baseDataSource.cloneWithRows(['row 1', 'row 2']), //baseDataSource.cloneWithRows(resultsCache.dataForQuery[query])
			});
			return;
		}
console.info(BASE_URL + query);
		fetch(BASE_URL + query)
			.then((response) => response.json())
			.catch((error) => {
				console.log('## error for: ' + query);
				var availableData = resultsCache.dataForQuery[query] || [];
console.info(availableData);
				this.setState({
					dataSource:baseDataSource.cloneWithRows(['row 1', 'row 2']),// baseDataSource.cloneWithRows(availableData),
					isLoading: false,
				});
			})
			.then((responseData) => {

				if (!responseData || !responseData.videos) { // abort when no videos
					console.log('### no responseData');
					return;
				}
				console.log('## fetched', responseData.videos.length, query);

				resultsCache.totalForQuery[query] = responseData.videos.length;
				resultsCache.dataForQuery[query] = responseData.videos;
				resultsCache.timeForQuery[query] = new Date().getTime();

				this.setState({
					isLoading: false,
					dataSource: ds.cloneWithRows(['row 1', 'row 2']),//baseDataSource.cloneWithRows(resultsCache.dataForQuery[query]),
				});
			})
			.done();
	}

	selectVideo(video: Object) {

		var domain = 'https://www.youtube.com';
		this.props.navigator.push({
			title: video.title,
			component: VideoWebView,
			passProps: {
				video: video,
				url: domain + '/embed/' + video.videoId + '?autoplay=1' // domain+'/watch?v='+video.videoId
			}
		});
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	centerText: {
		alignItems: 'center',
	},
	noResultsText: {
		marginTop: 80,
		color: '#888888',
	},
	separator: {
		height: 1,
		backgroundColor: '#eeeeee',
	},
	spinner: {
		width: 30,
	},
	scrollSpinner: {
		marginVertical: 20,
	},
	wrapper: {
		height: 60,
		marginTop: 10,
	},
	loading: {
		height: 20,
	},
});

export default NewCourseListView;
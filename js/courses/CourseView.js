'use strict';

import moment from 'moment';

import React from 'react';

import {
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
    } from 'react-native';

import getImageSource from './getImageSource';

class CourseView extends React.Component{
    render() {
        var viewCount = 123;//this.props.video.stats.viewCount;
        var pubDate = 123;// moment(this.props.video.publishedAt).fromNow(true);
        var channelTitle = 123;//this.props.video.channelTitle;
        var title = 123;//this.props.video.title;
        var thumbnail = 123;//{uri:this.props.video.thumbnails.default.url};
        var defaultImg = require('../image/story-background.png');
        return (
            <View>
                <TouchableHighlight onPress={this.props.onSelect}>
                    <View style={styles.row}>
                        <DelayedImage
                            defaultSource={defaultImg}
                            source={thumbnail}
                            style={styles.cellImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={2}>{title}</Text>
                            <Text style={styles.channel} numberOfLines={1}>
                                {channelTitle} {' '} &bull;{' '} {pubDate} &bull;{' '} {viewCount} views
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.cellBorder} />
            </View>
        );
    }
}



class DelayedImage extends React.Component{
    propTypes: Image.propTypes;
    constructor(props){
        super(props);
        this.state={
            showImage: true
        };
    }

componentWillReceiveProps(nextProps: any) {
    if(this.props.source.uri != nextProps.source.uri) {
        this.setState({ showImage: false });
        setTimeout(() => this.setState({ showImage: true }), 0);
    }
}
render(){
    return <Image {...this.props} source={{uri: this.state.showImage ? this.props.source.uri : null}} />
}
}

var styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    channel: {
        color: '#999999',
        fontSize: 12,
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 65,
        marginRight: 10,
        width: 60,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
});
export default CourseView;
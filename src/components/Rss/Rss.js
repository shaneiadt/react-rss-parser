import React, { Component } from 'react';
import Feed from '../Feed/Feed';
import Parser from 'rss-parser';
import Spinner from '../UI/Spinner/Spinner';

class Rss extends Component {

    state = {
        feeds: [
            'https://css-tricks.com/feed/',
            'https://codepen.io/posts/feed',
            'https://blog.safia.rocks/rss',
            'https://hnrss.org/frontpage',
            'https://tj.ie/feed.rss',
            'http://github-trends.ryotarai.info/rss/github_trends_javascript_daily.rss'
        ],
        loading: true,
        feedContent: []
    }

    componentDidMount() {

        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

        let parser = new Parser();
        // parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss', function (err, feed) {
        //     console.log(feed.title);
        //     feed.items.forEach(function (entry) {
        //         console.log(entry.title + ':' + entry.link);
        //     })
        // });

        let feedContent = [];

        const feedRequests = this.state.feeds.map(feed => {
            return parser.parseURL(CORS_PROXY + feed, function (err, content) {
                feedContent.push(content);
                return content;
            });
        });

        Promise.all(feedRequests).then(response => {
            this.setState({loading:false, feedContent: feedContent});
        });

    }

    render() {
        return (
            <div>
                <p>Rss Feed Info</p>
                {this.state.loading ? <Spinner /> : <Feed title={this.state.feedContent[0].title} url={this.state.feedContent[0].link} />}
            </div>
        );
    }
}

export default Rss;
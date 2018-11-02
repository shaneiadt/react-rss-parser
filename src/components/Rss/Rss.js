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

        let feedContent = [];

        const feedRequests = this.state.feeds.map(feed => {
            return parser.parseURL(CORS_PROXY + feed, function (err, content) {
                feedContent.push(content);
                return content;
            });
        });

        Promise.all(feedRequests).then(response => {
            let arr = feedContent.map((item, i) => {
                return <Feed
                    key={i}
                    title={item.title}
                    url={item.link}
                    itemsCount={item.items.length} />
            });
            console.log(arr);
            this.setState({ loading: false, feedContent: arr });
        });

    }

    render() {
        return (
            <div>
                <h1>Rss Feed Info</h1>
                {this.state.loading ? <Spinner /> : this.state.feedContent}
            </div>
        );
    }
}

export default Rss;
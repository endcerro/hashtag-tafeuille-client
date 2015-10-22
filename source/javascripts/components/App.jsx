/*jshint esnext: true */

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: this.props.tweets || [],
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false,
      blueCount: 0,
      redCount: 0,
      timer: 0
    };
  }

  componentWillReceiveProps(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  }

  componentDidMount(){
    var self = this;
    var socket = io.connect('http://localhost:8080');

    socket.on('tweet', function (tweet) {
      socket.on('timer', function (timer) {
        if (timer > 0) {
          self.addTweet(tweet);
        }
      });
    });

    socket.on('timer', function (data) {
        self.setState({timer: data});
    });
  }

  addTweet(tweet){
    var updated = this.state.tweets;
    var count = this.state.count + 1;
    var skip = this.state.skip + 1;

    updated.unshift(tweet);

    if (tweet.blueKeyword && this.state.timer > 0) {
      this.setState({blueCount: this.state.blueCount + 1});
    }

    if (tweet.redKeyword && this.state.timer > 0) {
      this.setState({redCount: this.state.redCount + 1});
    }

    this.setState({tweets: updated, count: count, skip: skip});
  }

  render() {
    var players = this.props.players;

    return (
      <div>

      <header>
        <Scoreboard timer={this.state.timer} blueCount={this.state.blueCount} redCount={this.state.redCount}/>
        <Player team='blue' player={players[1]}/>
        <Countdown timer={this.state.timer}/>
        <Player team='red' player={players[0]}/>
      </header>
          <Feed tweets={this.state.tweets} />
      </div>
    );
  }
}

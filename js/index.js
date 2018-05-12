var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TwitchTV = function (_React$Component) {
  _inherits(TwitchTV, _React$Component);

  /*
    TODOS: listing, sorting, filtering
  */
  function TwitchTV(props) {
    _classCallCheck(this, TwitchTV);

    var _this = _possibleConstructorReturn(this, (TwitchTV.__proto__ || Object.getPrototypeOf(TwitchTV)).call(this, props));

    _this.state = {
      channels: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]
    };
    return _this;
  }

  _createClass(TwitchTV, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Twitchtv JSON AI"
        ),
        React.createElement(TwitchList, { channels: this.state.channels })
      );
    }
  }]);

  return TwitchTV;
}(React.Component);

var TwitchList = function (_React$Component2) {
  _inherits(TwitchList, _React$Component2);

  function TwitchList(props) {
    _classCallCheck(this, TwitchList);

    var _this2 = _possibleConstructorReturn(this, (TwitchList.__proto__ || Object.getPrototypeOf(TwitchList)).call(this, props));

    _this2.createItems = function (channels) {
      return channels.map(function (channel) {
        return React.createElement(TwitchListItemContainer, { channel: channel });
      });
    };

    var items = _this2.createItems(_this2.props.channels);

    _this2.state = {
      twitchItems: items
    };
    return _this2;
  }

  _createClass(TwitchList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.twitchItems
      );
    }
  }]);

  return TwitchList;
}(React.Component);

var TwitchListItemContainer = function (_React$Component3) {
  _inherits(TwitchListItemContainer, _React$Component3);

  function TwitchListItemContainer(props) {
    _classCallCheck(this, TwitchListItemContainer);

    var _this3 = _possibleConstructorReturn(this, (TwitchListItemContainer.__proto__ || Object.getPrototypeOf(TwitchListItemContainer)).call(this, props));

    _this3.ajaxTwitch = function (channelName, api) {
      return $.ajax({
        context: _this3,
        url: 'https://wind-bow.gomix.me/twitch-api/' + api + '/' + channelName,
        dataType: 'jsonp'
      });
    };

    _this3.state = {
      channelData: "",
      streamData: ""
    };

    _this3.ajaxTwitch(_this3.props.channel, 'channels').done(function (response) {
      return _this3.setState({ channelData: response.status });
    });
    _this3.ajaxTwitch(_this3.props.channel, 'streams').done(function (response) {
      return _this3.setState({ streamData: response.stream });
    });
    return _this3;
  }

  _createClass(TwitchListItemContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(TwitchListItem, { name: this.props.channel, channel: this.state.channelData, stream: this.state.streamData });
    }
  }]);

  return TwitchListItemContainer;
}(React.Component);

var TwitchListItem = function (_React$Component4) {
  _inherits(TwitchListItem, _React$Component4);

  function TwitchListItem(props) {
    _classCallCheck(this, TwitchListItem);

    return _possibleConstructorReturn(this, (TwitchListItem.__proto__ || Object.getPrototypeOf(TwitchListItem)).call(this, props));
  }

  _createClass(TwitchListItem, [{
    key: "render",
    value: function render() {
      var isStreaming = this.props.stream ? "Streaming" : "Not Streaming";
      var channelStatus = this.props.channel == 404 ? "Not Active" : "Active";
      var twitchLink = "https://www.twitch.tv/" + this.props.name;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: twitchLink, target: "_blank" },
          this.props.name
        ),
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            channelStatus
          ),
          React.createElement(
            "li",
            null,
            isStreaming
          )
        )
      );
    }
  }]);

  return TwitchListItem;
}(React.Component);

ReactDOM.render(React.createElement(TwitchTV, null), document.getElementById('container'));
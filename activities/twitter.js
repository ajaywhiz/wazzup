twitter = function twitter() {

    var _TwitterSearchUrl = "http://search.twitter.com/search.json?callback=?&rpp=10&result_type=recent&q="; //geocode    
    var _WazzupProps = {};
    var _since_id = null;
    var _hTimeout = null;

    this.getActivity = getActivity;
    this.setLocation = setLocation;
    this.onTweetAction = onTweetAction;
    this.setProperty = setProperty;
    this.start = start;
    this.stop = stop;

    function setLocation(position, address) {
        _WazzupProps.position = position;
        _WazzupProps.address = address;
    }

    function setProperty(propName, value) {
        _WazzupProps[propName] = value;
    }

    function onTweetAction(activity) {
    }

    function start() {
        getActivity();
    }

    function stop() {
        if (_hTimeout != null) {
            clearTimeout(_hTimeout);
        }
    }


    function getActivity() {
        var searchUrl = _TwitterSearchUrl + _WazzupProps.address.city; // _WazzupProps.position.coords.latitude.toString() + "," + _WazzupProps.position.coords.longitude.toString() + ",25km&q="+l
        if (_since_id != null) {
            searchUrl += "&since_id=" + _since_id.toString();
        }
        $.getJSON(searchUrl, function (data) {
            if (data.results.length > 0) {
                if (data.results[0].id != _since_id) {
                    var tweetHtml = "";
                    for (var i = 0; i < data.results.length; i++) {
                        var tweet = data.results[i];
                        var activity = {};
                        tweetHtml = "<img src='" + tweet.profile_image_url + "' style='height:48px;widht:48px;'/> <strong>" + tweet.from_user + "</strong>: " + tweet.text ;
                        activity.date = tweet.created_at;
                        activity.html = tweetHtml;
                        activity.onClick = onTweetAction;
                        _WazzupProps.activityCallback(activity);
                    }
                }
            }
            _since_id = data.max_id;
        });
        _hTimeout = setTimeout(getActivity, 300000);
    }
}

myWazzup.registerService(new twitter());            
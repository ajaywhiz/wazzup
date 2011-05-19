wazzup = function () {

    var _location;
    var _address;
    var _services = [];
    var _activities = [];
    var _MAX_ITEMS = 50;
    var _HasAnimationStarted = false;
    var _CurrentActivityIndex = 0;
    var _CurrentActivity = null;

    this.start = start;
    this.registerService = registerService;
    this.setLocation = setLocation;
    this.onNewActivity = onNewActivity;
    this.showActivity = showActivity;


    function setLocation(location, address) {
        _location = location;
        _address = address;

        for (var iLoop = 0; iLoop < _services.length; iLoop++) {
            _services[iLoop].setLocation(_location, _address);
        }
    }

    function start() {

        startActivities();
        showActivity();
    }

    function stop() {
        stopActivities();
    }

    function startActivities() {
        for (var iLoop = 0; iLoop < _services.length; iLoop++) {
            setTimeout(_services[iLoop].start, 1000);
        }
    }

    function stopActivities() {
        for (var iLoop = 0; iLoop < _services.length; iLoop++) {
            setTimeout(_services[iLoop].stop, 1000);
        }
    }

    function registerService(service) {

        service.setLocation(_location, _address);
        service.setProperty("activityCallback", onNewActivity);
        _services.push(service);
    }

    function onNewActivity(activity) {


        if ((_activities.length + 1) > _MAX_ITEMS) {
            _activities.pop();
        }

        activity.html = "<div id='actnew' class='activity trans before'><div class='actData'>" + activity.html + "</div></div>";

        _activities.unshift(activity);

        //document.querySelector("#content").innerHTML += activity.html;
    }


    function showActivity() {
        if (_activities.length > 0) {
            if (_CurrentActivityIndex >= _activities.length) {
                _CurrentActivityIndex = 0;
            }

            _CurrentActivity = _activities[_CurrentActivityIndex];
            _CurrentActivityIndex++;
            $("#container").append(_CurrentActivity.html);
            $("#actold").removeClass("after").addClass("before");
            $("#actnew").removeClass("before").addClass("after");            

            setTimeout(function () {
                $("#actold").remove();                
                $("#actnew").attr('id', "actold");
            }, 3000);

            //            $(".activity").hide("slow", function () {
            //                $(this).replaceWith(_CurrentActivity.html);
            //            });
        }
        setTimeout(showActivity, 30000);
    }

}

var myWazzup = new wazzup();
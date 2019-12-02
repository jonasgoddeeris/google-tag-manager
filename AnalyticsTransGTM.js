<script>
/*!
* AnalyticsTransGTM.js Library v0.9.0
*
* Copyright 2017, Stefan Maris
* MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
*
*
* Last update: December 5, 2017
*/
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['analyticstracker'], function (analyticstracker) {
			factory(analyticstracker, window);
		  });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('analyticstracker'), window);
  } else {
    // Browser globals
    root.analyticsTransGTM = factory(root.analyticstracker, window);
  }

}(this, function (analyticstracker, w) {
// UMD Definition above, do not remove this line
  'use strict';

  var _instance;

  var analyticsTransGTM = function analyticsTransGTM() {
    if (!(this instanceof analyticsTransGTM)) {
      return new analyticsTransGTM();
    }

    this.tracker = analyticstracker();
    if ((typeof w != "undefined") && (w != null)) {
      w.dataLayer = w.dataLayer || [];
    }
    this._subscribe();
  }

  analyticsTransGTM.prototype.getInstance = function() {
    if (!_instance) {
        _instance = analyticsTransGTM();
    }
    return _instance;
  }

  analyticsTransGTM.prototype._subscribe = function() {
    try {
      this.tracker.trackingSubscribe("GTM", function (event, data) {
    		console.log("GTM tracker: " + event);
      	console.log(data);
      	console.log("********");

        if ((typeof w != "undefined") && (w != null)) {
          w.dataLayer.push(data);
        }
    	});
    } catch (e) {
      console.log("GTM tracker ERROR: " + e.name + ": " + e.message);
    }
  }

  _instance  = analyticsTransGTM();
  return analyticsTransGTM.prototype.getInstance;
}));

</script>

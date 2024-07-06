
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ServerCom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd275iqnndLToBuUOYxMq3n', 'ServerCom');
// Scripts/ServerCom.js

"use strict";

var root = window;
cc.Class({
  "extends": cc.Component,
  properties: {
    loading: {
      "default": null,
      type: cc.Node
    },
    reconnecting: {
      "default": null,
      type: cc.Node
    },
    tracker: {
      "default": {}
    },
    errorLabel: {
      "default": null,
      type: cc.Label
    },
    trackerCount: 0,
    timer: 0
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // Created ServerCom Gloabaly so that we can access it anywhere we want
    root.ServerCom = this;
    this.checkOrientation(); // Add event listener for canvas resize to handle orientation change

    cc.view.on('canvas-resize', this.checkOrientation, this);
  },
  // following function is to check the width and change the orientation(Landscape/Potrait) for mobile or dekstop
  checkOrientation: function checkOrientation() {
    try {
      var winSize = cc.winSize; // Check if the width is greater than the height to determine orientation

      if (winSize.width > winSize.height) {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      } else {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      }
    } catch (error) {
      console.error("Error checking orientation:", error);
    }
  },
  clearTracker: function clearTracker() {
    this.trackerCount = 0;
    this.tracker = {};
  },

  /**
   * @method httpPostRequest
   * @description HTTP request - POST data 
   * @param {String} address -address of Server 
   * @param {Object} data -Data/PayLoad to be sent
   * @param {method} callback -Callback to be executed if response.succss is true!
   * @param {method} error -Callback to be executed if response.success is false!
   * @param {Number} timeout -value in milli seconds, Specify request timeout time! 
   * @memberof Utilities.ServerCom#
   */
  httpRequest: function httpRequest(method, address, data, callback, error, timeout) {
    var inst = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout || 1000;

    if (!ServerCom.loading.active) {
      ServerCom.loading.active = true;
    }

    xhr.onreadystatechange = function () {
      K.internetAvailable = true;

      if (xhr.readyState == 4) {
        ServerCom.loading.active = false;
        var response = xhr.responseText;

        if (xhr.status >= 200 && xhr.status < 400) {
          if (callback !== null && callback !== undefined) {
            var data = JSON.parse(response);
            console.log("fgbfgbfgbfgb", data, "and xhr is", xhr);
            callback(data);
          }
        } else {
          var errorMsg = "Unknown error";

          try {
            var errorData = JSON.parse(response);

            if (errorData.error) {
              errorMsg = errorData.error;
            }

            console.log("errorDataerrorData", errorData, xhr);
          } catch (e) {
            console.error("Error parsing error response:", e);
          }
        }
      }
    };

    xhr.onerror = function (err) {
      ServerCom.loading.active = false;
      K.internetAvailable = false;
      var errorMsg = "Unknown error";

      try {
        var errorData = JSON.parse(xhr.responseText);

        if (errorData.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
    };

    xhr.ontimeout = function () {
      ServerCom.loading.active = false;
      K.disconnectRequestedByPlayer = false;
      K.internetAvailable = false; // 

      inst.emit('error', {
        code: K.Error.TimeOutError,
        response: "Timeout " + address
      });
    };

    xhr.open(method, address, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var token = cc.sys.localStorage.getItem("token");

    if (token) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    }

    if (method === "POST") {
      xhr.send(JSON.stringify(data));
    } else if (method === "GET") {
      xhr.send();
    }
  } // WILL use the following code later to check if the same api is request untill we gets its response
  // /**
  // updateTracker: function (val, key, showLoading) {
  //     var incr = val ? +1 : -1;
  //     this.trackerCount = this.trackerCount + incr;
  //     var isActive = val && showLoading;
  //     if(!this.loading.active && showLoading){
  //         this.loading.active = true; 
  //     }else if(this.loading.active && !showLoading) {
  //         this.loading.active = false;
  //     }
  //     //this.loading.active = val && showLoading;
  //     this.tracker[key] = val;
  // },

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJyb290Iiwid2luZG93IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwidHlwZSIsIk5vZGUiLCJyZWNvbm5lY3RpbmciLCJ0cmFja2VyIiwiZXJyb3JMYWJlbCIsIkxhYmVsIiwidHJhY2tlckNvdW50IiwidGltZXIiLCJvbkxvYWQiLCJTZXJ2ZXJDb20iLCJjaGVja09yaWVudGF0aW9uIiwidmlldyIsIm9uIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0T3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSIsIk9SSUVOVEFUSU9OX1BPUlRSQUlUIiwiZXJyb3IiLCJjb25zb2xlIiwiY2xlYXJUcmFja2VyIiwiaHR0cFJlcXVlc3QiLCJtZXRob2QiLCJhZGRyZXNzIiwiZGF0YSIsImNhbGxiYWNrIiwidGltZW91dCIsImluc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImFjdGl2ZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIksiLCJpbnRlcm5ldEF2YWlsYWJsZSIsInJlYWR5U3RhdGUiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImxvZyIsImVycm9yTXNnIiwiZXJyb3JEYXRhIiwiZSIsIm9uZXJyb3IiLCJlcnIiLCJvbnRpbWVvdXQiLCJkaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIiLCJlbWl0IiwiY29kZSIsIkVycm9yIiwiVGltZU91dEVycm9yIiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJ0b2tlbiIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZW5kIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLElBQUksR0FBR0MsTUFBWDtBQUNBQyxFQUFFLENBQUND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S0FGRCxNQUVPLElBQUlGLE1BQU0sS0FBSyxLQUFmLEVBQXNCO0FBQ3pCTSxNQUFBQSxHQUFHLENBQUMrQixJQUFKO0FBQ0g7QUFDSixHQS9ISSxDQWlJTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTlJSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcm9vdCA9IHdpbmRvdztcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVjb25uZWN0aW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2tlcjoge1xuICAgICAgICAgICAgZGVmYXVsdDoge30sXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTGFiZWw6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHRyYWNrZXJDb3VudDogMCxcbiAgICAgICAgdGltZXIgOiAwLFxuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyBDcmVhdGVkIFNlcnZlckNvbSBHbG9hYmFseSBzbyB0aGF0IHdlIGNhbiBhY2Nlc3MgaXQgYW55d2hlcmUgd2Ugd2FudFxuICAgICAgICByb290LlNlcnZlckNvbSA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hlY2tPcmllbnRhdGlvbigpO1xuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGNhbnZhcyByZXNpemUgdG8gaGFuZGxlIG9yaWVudGF0aW9uIGNoYW5nZVxuICAgICAgICBjYy52aWV3Lm9uKCdjYW52YXMtcmVzaXplJywgdGhpcy5jaGVja09yaWVudGF0aW9uLCB0aGlzKTtcbiAgICB9LFxuICAgIC8vIGZvbGxvd2luZyBmdW5jdGlvbiBpcyB0byBjaGVjayB0aGUgd2lkdGggYW5kIGNoYW5nZSB0aGUgb3JpZW50YXRpb24oTGFuZHNjYXBlL1BvdHJhaXQpIGZvciBtb2JpbGUgb3IgZGVrc3RvcFxuICAgIGNoZWNrT3JpZW50YXRpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgd2luU2l6ZSA9IGNjLndpblNpemU7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgd2lkdGggaXMgZ3JlYXRlciB0aGFuIHRoZSBoZWlnaHQgdG8gZGV0ZXJtaW5lIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBpZiAod2luU2l6ZS53aWR0aCA+IHdpblNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9MQU5EU0NBUEUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX1BPUlRSQUlUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjaGVja2luZyBvcmllbnRhdGlvbjpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjbGVhclRyYWNrZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudHJhY2tlckNvdW50ID0gMDtcbiAgICAgICAgdGhpcy50cmFja2VyID0ge307XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgaHR0cFBvc3RSZXF1ZXN0XG4gICAgICogQGRlc2NyaXB0aW9uIEhUVFAgcmVxdWVzdCAtIFBPU1QgZGF0YSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyAtYWRkcmVzcyBvZiBTZXJ2ZXIgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLURhdGEvUGF5TG9hZCB0byBiZSBzZW50XG4gICAgICogQHBhcmFtIHttZXRob2R9IGNhbGxiYWNrIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjc3MgaXMgdHJ1ZSFcbiAgICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLXZhbHVlIGluIG1pbGxpIHNlY29uZHMsIFNwZWNpZnkgcmVxdWVzdCB0aW1lb3V0IHRpbWUhIFxuICAgICAqIEBtZW1iZXJvZiBVdGlsaXRpZXMuU2VydmVyQ29tI1xuICAgICAqL1xuICAgIGh0dHBSZXF1ZXN0OiBmdW5jdGlvbiAobWV0aG9kLCBhZGRyZXNzLCBkYXRhLCBjYWxsYmFjaywgZXJyb3IsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGluc3QgPSB0aGlzO1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dCB8fCAxMDAwO1xuICAgICAgICBpZighU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlKXtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmZ2JmZ2JmZ2JmZ2JcIiwgZGF0YSwgXCJhbmQgeGhyIGlzXCIsIHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGVycm9yRGF0YS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JEYXRhZXJyb3JEYXRhXCIsIGVycm9yRGF0YSwgeGhyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgZXJyb3IgcmVzcG9uc2U6XCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIFxuICAgICAgICAgICAgdmFyIGVycm9yTXNnID0gXCJVbmtub3duIGVycm9yXCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGVycm9yIHJlc3BvbnNlOlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgSy5kaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFxuICAgICAgICAgICAgaW5zdC5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBLLkVycm9yLlRpbWVPdXRFcnJvcixcbiAgICAgICAgICAgICAgICByZXNwb25zZTogXCJUaW1lb3V0IFwiICsgYWRkcmVzcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub3BlbihtZXRob2QsIGFkZHJlc3MsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgYEJlYXJlciAke3Rva2VufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvLyBXSUxMIHVzZSB0aGUgZm9sbG93aW5nIGNvZGUgbGF0ZXIgdG8gY2hlY2sgaWYgdGhlIHNhbWUgYXBpIGlzIHJlcXVlc3QgdW50aWxsIHdlIGdldHMgaXRzIHJlc3BvbnNlXG4gICAgLy8gLyoqXG4gICAgLy8gdXBkYXRlVHJhY2tlcjogZnVuY3Rpb24gKHZhbCwga2V5LCBzaG93TG9hZGluZykge1xuICAgIC8vICAgICB2YXIgaW5jciA9IHZhbCA/ICsxIDogLTE7XG4gICAgLy8gICAgIHRoaXMudHJhY2tlckNvdW50ID0gdGhpcy50cmFja2VyQ291bnQgKyBpbmNyO1xuICAgIC8vICAgICB2YXIgaXNBY3RpdmUgPSB2YWwgJiYgc2hvd0xvYWRpbmc7XG4gICAgLy8gICAgIGlmKCF0aGlzLmxvYWRpbmcuYWN0aXZlICYmIHNob3dMb2FkaW5nKXtcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSB0cnVlOyBcbiAgICAvLyAgICAgfWVsc2UgaWYodGhpcy5sb2FkaW5nLmFjdGl2ZSAmJiAhc2hvd0xvYWRpbmcpIHtcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvL3RoaXMubG9hZGluZy5hY3RpdmUgPSB2YWwgJiYgc2hvd0xvYWRpbmc7XG4gICAgLy8gICAgIHRoaXMudHJhY2tlcltrZXldID0gdmFsO1xuICAgIC8vIH0sXG5cbn0pOyJdfQ==
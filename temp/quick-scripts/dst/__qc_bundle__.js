
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/Config/GameConfig');
require('./assets/Scripts/Lobby/Lobby');
require('./assets/Scripts/ServerCom');
require('./assets/Scripts/login/Login');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/login/Login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac1ac5oJ6VEUL3rD+Zja0yl', 'Login');
// Scripts/login/Login.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    userName: {
      "default": null,
      type: cc.EditBox
    },
    password: {
      "default": null,
      type: cc.EditBox
    },
    rememberMe: {
      "default": null,
      type: cc.Toggle
    },
    lobbyNode: {
      "default": null,
      type: cc.Node
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.rememberMe) {
      this.rememberMe.isChecked = false;
    }
  },
  onLoginClick: function onLoginClick() {
    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };
    ServerCom.httpRequest("POST", address, data, function (response) {
      if (response.token) {
        cc.sys.localStorage.setItem("token", response.token);
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        cc.sys.localStorage.setItem("index", randomNumber);
        setTimeout(function () {
          this.lobbyNode.active = true;
        }.bind(this), 1000);
      }
    }.bind(this));
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJvbkxvYWQiLCJpc0NoZWNrZWQiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJ0b2tlbiIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzZXRUaW1lb3V0IiwiYWN0aXZlIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxLQVZKO0FBY1JDLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFTLElBREg7QUFFTkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXO0FBRkg7QUFkRixHQUhQO0FBdUJMO0FBQ0FDLEVBQUFBLE1BeEJLLG9CQXdCSztBQUNOLFFBQUcsS0FBS0osVUFBUixFQUFtQjtBQUNmLFdBQUtBLFVBQUwsQ0FBZ0JLLFNBQWhCLEdBQTRCLEtBQTVCO0FBQ0g7QUFDSixHQTVCSTtBQThCTEMsRUFBQUEsWUE5QkssMEJBOEJVO0FBQ1gsUUFBSUMsT0FBTyxHQUFHQyxDQUFDLENBQUNDLGFBQUYsQ0FBZ0JDLFNBQWhCLEdBQTRCRixDQUFDLENBQUNHLFNBQUYsQ0FBWUMsS0FBdEQ7QUFDQSxRQUFJQyxJQUFJLEdBQUc7QUFDUEMsTUFBQUEsUUFBUSxFQUFFLEtBQUtsQixRQUFMLENBQWNtQixNQURqQjtBQUVQaEIsTUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQUwsQ0FBY2dCO0FBRmpCLEtBQVg7QUFJQUMsSUFBQUEsU0FBUyxDQUFDQyxXQUFWLENBQXNCLE1BQXRCLEVBQThCVixPQUE5QixFQUF1Q00sSUFBdkMsRUFBNkMsVUFBVUssUUFBVixFQUFvQjtBQUM3RCxVQUFJQSxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFDaEIzQixRQUFBQSxFQUFFLENBQUM0QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEVBQXFDSixRQUFRLENBQUNDLEtBQTlDO0FBQ0EsWUFBTUksWUFBWSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLElBQWlDLENBQXREO0FBQ0FsQyxRQUFBQSxFQUFFLENBQUM0QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEVBQXFDQyxZQUFyQztBQUNBSSxRQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQixlQUFLekIsU0FBTCxDQUFlMEIsTUFBZixHQUF3QixJQUF4QjtBQUNILFNBRlUsQ0FFVEMsSUFGUyxDQUVKLElBRkksQ0FBRCxFQUVJLElBRkosQ0FBVjtBQUdIO0FBRUosS0FWNEMsQ0FVM0NBLElBVjJDLENBVXRDLElBVnNDLENBQTdDO0FBWUg7QUFoREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxuICAgICAgICB9LFxuICAgICAgICByZW1lbWJlck1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVG9nZ2xlXG4gICAgICAgIH0sXG4gICAgICAgIGxvYmJ5Tm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfVxuICAgIFxuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgaWYodGhpcy5yZW1lbWJlck1lKXtcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJNZS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvZ2luQ2xpY2sgKCl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmxvZ2luO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lLnN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLnN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQT1NUXCIsIGFkZHJlc3MsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRva2VuKSB7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgcmVzcG9uc2UudG9rZW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaW5kZXhcIiwgcmFuZG9tTnVtYmVyKTsgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICB9LFxufSk7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Config/GameConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8da19Kpt7FCnoycSPF3SsWw', 'GameConfig');
// Scripts/Config/GameConfig.js

"use strict";

/**
 * @namespace Configs
 */

/**
 * @class GameConfig
 * @memberof Configs
 */

/** 
 * @alias window
 * @name root
 * @memberof Configs.GameConfig#
 */
var root = window;
root.K = {};
root.K.internetAvailable = true;
/**
 * @enum {Number} Represents possible errors in the game
 * @name Error
 * @memberof Configs.GameConfig#
 */

root.K.Error = cc.Enum({
  CredentialsError: 401,
  SuccessFalseError: 404
});
root.K.WS = false;
root.K.DeveloperMode = true;
root.K.ServerAddress = {
  ////// IP and URLS update as per requirements
  ipAddress: "https://game-crm-rtp-backend.onrender.com" // OTL

};
/**
 * @description Server APIs
 * @name ServerAPI
 * @memberof Configs.GameConfig#
 */

root.K.ServerAPI = {
  login: "/api/users/login",
  game: "/api/games/getGames?category"
};
/**
 * @description Represents sound effects played on user related events
 * @name Sounds
 * @memberof Configs.GameConfig#
 */

root.K.Sounds = {}; // /**
//  * @description Data that maybe stored on a system
//  * @name SystemStorageKeys
//  * @memberof Configs.GameConfig#
//  */
// root.K.SystemStorageKeys = {
//     userId: "userId",
//     password: "password",
//     rememberMePreference: "rememberMePreference",
// };

module.exports = {
  K: K
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJTb3VuZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxNQUFYO0FBRUFELElBQUksQ0FBQ0UsQ0FBTCxHQUFTLEVBQVQ7QUFFQUYsSUFBSSxDQUFDRSxDQUFMLENBQU9DLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDRSxDQUFMLENBQU9FLEtBQVAsR0FBZUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBREM7QUFFbkJDLEVBQUFBLGlCQUFpQixFQUFFO0FBRkEsQ0FBUixDQUFmO0FBTUFSLElBQUksQ0FBQ0UsQ0FBTCxDQUFPTyxFQUFQLEdBQVksS0FBWjtBQUVBVCxJQUFJLENBQUNFLENBQUwsQ0FBT1EsYUFBUCxHQUF1QixJQUF2QjtBQUVBVixJQUFJLENBQUNFLENBQUwsQ0FBT1MsYUFBUCxHQUF1QjtBQUNuQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsMkNBRlEsQ0FFcUM7O0FBRnJDLENBQXZCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVosSUFBSSxDQUFDRSxDQUFMLENBQU9XLFNBQVAsR0FBbUI7QUFDZkMsRUFBQUEsS0FBSyxFQUFFLGtCQURRO0FBRWZDLEVBQUFBLElBQUksRUFBRTtBQUZTLENBQW5CO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWYsSUFBSSxDQUFDRSxDQUFMLENBQU9jLE1BQVAsR0FBZ0IsRUFBaEIsRUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JoQixFQUFBQSxDQUFDLEVBQUVBO0FBRFUsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG5hbWVzcGFjZSBDb25maWdzXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgR2FtZUNvbmZpZ1xuICogQG1lbWJlcm9mIENvbmZpZ3NcbiAqL1xuXG4vKiogXG4gKiBAYWxpYXMgd2luZG93XG4gKiBAbmFtZSByb290XG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG52YXIgcm9vdCA9IHdpbmRvdztcblxucm9vdC5LID0ge307XG5cbnJvb3QuSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XG4vKipcbiAqIEBlbnVtIHtOdW1iZXJ9IFJlcHJlc2VudHMgcG9zc2libGUgZXJyb3JzIGluIHRoZSBnYW1lXG4gKiBAbmFtZSBFcnJvclxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xucm9vdC5LLkVycm9yID0gY2MuRW51bSh7XG4gICAgQ3JlZGVudGlhbHNFcnJvcjogNDAxLFxuICAgIFN1Y2Nlc3NGYWxzZUVycm9yOiA0MDQsXG59KTtcblxuXG5yb290LksuV1MgPSBmYWxzZTtcblxucm9vdC5LLkRldmVsb3Blck1vZGUgPSB0cnVlO1xuXG5yb290LksuU2VydmVyQWRkcmVzcyA9IHtcbiAgICAvLy8vLy8gSVAgYW5kIFVSTFMgdXBkYXRlIGFzIHBlciByZXF1aXJlbWVudHNcbiAgICBpcEFkZHJlc3M6IFwiaHR0cHM6Ly9nYW1lLWNybS1ydHAtYmFja2VuZC5vbnJlbmRlci5jb21cIiwgLy8gT1RMXG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBTZXJ2ZXIgQVBJc1xuICogQG5hbWUgU2VydmVyQVBJXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG5yb290LksuU2VydmVyQVBJID0ge1xuICAgIGxvZ2luOiBcIi9hcGkvdXNlcnMvbG9naW5cIixcbiAgICBnYW1lOiBcIi9hcGkvZ2FtZXMvZ2V0R2FtZXM/Y2F0ZWdvcnlcIixcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFJlcHJlc2VudHMgc291bmQgZWZmZWN0cyBwbGF5ZWQgb24gdXNlciByZWxhdGVkIGV2ZW50c1xuICogQG5hbWUgU291bmRzXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG5yb290LksuU291bmRzID0ge1xufTtcblxuXG5cbi8vIC8qKlxuLy8gICogQGRlc2NyaXB0aW9uIERhdGEgdGhhdCBtYXliZSBzdG9yZWQgb24gYSBzeXN0ZW1cbi8vICAqIEBuYW1lIFN5c3RlbVN0b3JhZ2VLZXlzXG4vLyAgKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuLy8gICovXG4vLyByb290LksuU3lzdGVtU3RvcmFnZUtleXMgPSB7XG4vLyAgICAgdXNlcklkOiBcInVzZXJJZFwiLFxuLy8gICAgIHBhc3N3b3JkOiBcInBhc3N3b3JkXCIsXG4vLyAgICAgcmVtZW1iZXJNZVByZWZlcmVuY2U6IFwicmVtZW1iZXJNZVByZWZlcmVuY2VcIixcbi8vIH07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBLOiBLLFxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Lobby/Lobby.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44269NOlMVGd7tbn16fpN+w', 'Lobby');
// Scripts/Lobby/Lobby.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    userId: {
      "default": null,
      type: cc.Label
    },
    coinsLabel: {
      "default": null,
      type: cc.Label
    },
    category: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
    }.bind(this));
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlcklkIiwidHlwZSIsIkxhYmVsIiwiY29pbnNMYWJlbCIsImNhdGVnb3J5Iiwib25Mb2FkIiwiYWRkcmVzcyIsIksiLCJTZXJ2ZXJBZGRyZXNzIiwiaXBBZGRyZXNzIiwiU2VydmVyQVBJIiwiZ2FtZSIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1hDLElBQUFBLE1BQU0sRUFBQztBQUNKLGlCQUFTLElBREw7QUFFSkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkosS0FESTtBQUtYQyxJQUFBQSxVQUFVLEVBQUM7QUFDUixpQkFBUyxJQUREO0FBRVJGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBTEE7QUFTWEUsSUFBQUEsUUFBUSxFQUFFO0FBVEMsR0FIUDtBQWdCTDtBQUVBQyxFQUFBQSxNQWxCSyxvQkFrQks7QUFDTixRQUFHLENBQUMsS0FBS0QsUUFBVCxFQUFrQjtBQUNkLFdBQUtBLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDs7QUFDRCxRQUFJRSxPQUFPLEdBQUdDLENBQUMsQ0FBQ0MsYUFBRixDQUFnQkMsU0FBaEIsR0FBNEJGLENBQUMsQ0FBQ0csU0FBRixDQUFZQyxJQUF4QyxHQUE4QyxHQUE5QyxHQUFtRCxLQUFLUCxRQUF0RTtBQUVBUSxJQUFBQSxTQUFTLENBQUNDLFdBQVYsQ0FBc0IsS0FBdEIsRUFBNkJQLE9BQTdCLEVBQXNDLFVBQVVRLFFBQVYsRUFBb0I7QUFDdkRDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaLEVBQWlERixRQUFqRDtBQUNGLEtBRnFDLENBRXBDRyxJQUZvQyxDQUUvQixJQUYrQixDQUF0QztBQUdIO0FBM0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIlxuICAgICAgICB9XG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmdhbWUgK1wiPVwiKyB0aGlzLmNhdGVnb3J5O1xuICAgICAgICBcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiR0VUXCIsIGFkZHJlc3MsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlcmVzcG9uc2VyZXNwb25zZSBpbiBsb2JieVwiLCByZXNwb25zZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

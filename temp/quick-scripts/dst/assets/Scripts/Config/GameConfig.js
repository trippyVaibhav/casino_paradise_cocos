
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
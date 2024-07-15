
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29uZmlnXFxHYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJTb3VuZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxNQUFYO0FBRUFELElBQUksQ0FBQ0UsQ0FBTCxHQUFTLEVBQVQ7QUFFQUYsSUFBSSxDQUFDRSxDQUFMLENBQU9DLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDRSxDQUFMLENBQU9FLEtBQVAsR0FBZUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBREM7QUFFbkJDLEVBQUFBLGlCQUFpQixFQUFFO0FBRkEsQ0FBUixDQUFmO0FBTUFSLElBQUksQ0FBQ0UsQ0FBTCxDQUFPTyxFQUFQLEdBQVksS0FBWjtBQUVBVCxJQUFJLENBQUNFLENBQUwsQ0FBT1EsYUFBUCxHQUF1QixJQUF2QjtBQUVBVixJQUFJLENBQUNFLENBQUwsQ0FBT1MsYUFBUCxHQUF1QjtBQUNuQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsMkNBRlEsQ0FFcUM7O0FBRnJDLENBQXZCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVosSUFBSSxDQUFDRSxDQUFMLENBQU9XLFNBQVAsR0FBbUI7QUFDZkMsRUFBQUEsS0FBSyxFQUFFLGtCQURRO0FBRWZDLEVBQUFBLElBQUksRUFBRTtBQUZTLENBQW5CO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWYsSUFBSSxDQUFDRSxDQUFMLENBQU9jLE1BQVAsR0FBZ0IsRUFBaEIsRUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JoQixFQUFBQSxDQUFDLEVBQUVBO0FBRFUsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbmFtZXNwYWNlIENvbmZpZ3NcclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIEdhbWVDb25maWdcclxuICogQG1lbWJlcm9mIENvbmZpZ3NcclxuICovXHJcblxyXG4vKiogXHJcbiAqIEBhbGlhcyB3aW5kb3dcclxuICogQG5hbWUgcm9vdFxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxudmFyIHJvb3QgPSB3aW5kb3c7XHJcblxyXG5yb290LksgPSB7fTtcclxuXHJcbnJvb3QuSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XHJcbi8qKlxyXG4gKiBAZW51bSB7TnVtYmVyfSBSZXByZXNlbnRzIHBvc3NpYmxlIGVycm9ycyBpbiB0aGUgZ2FtZVxyXG4gKiBAbmFtZSBFcnJvclxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxucm9vdC5LLkVycm9yID0gY2MuRW51bSh7XHJcbiAgICBDcmVkZW50aWFsc0Vycm9yOiA0MDEsXHJcbiAgICBTdWNjZXNzRmFsc2VFcnJvcjogNDA0LFxyXG59KTtcclxuXHJcblxyXG5yb290LksuV1MgPSBmYWxzZTtcclxuXHJcbnJvb3QuSy5EZXZlbG9wZXJNb2RlID0gdHJ1ZTtcclxuXHJcbnJvb3QuSy5TZXJ2ZXJBZGRyZXNzID0ge1xyXG4gICAgLy8vLy8vIElQIGFuZCBVUkxTIHVwZGF0ZSBhcyBwZXIgcmVxdWlyZW1lbnRzXHJcbiAgICBpcEFkZHJlc3M6IFwiaHR0cHM6Ly9nYW1lLWNybS1ydHAtYmFja2VuZC5vbnJlbmRlci5jb21cIiwgLy8gT1RMXHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFNlcnZlciBBUElzXHJcbiAqIEBuYW1lIFNlcnZlckFQSVxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxucm9vdC5LLlNlcnZlckFQSSA9IHtcclxuICAgIGxvZ2luOiBcIi9hcGkvdXNlcnMvbG9naW5cIixcclxuICAgIGdhbWU6IFwiL2FwaS9nYW1lcy9nZXRHYW1lcz9jYXRlZ29yeVwiLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBSZXByZXNlbnRzIHNvdW5kIGVmZmVjdHMgcGxheWVkIG9uIHVzZXIgcmVsYXRlZCBldmVudHNcclxuICogQG5hbWUgU291bmRzXHJcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXHJcbiAqL1xyXG5yb290LksuU291bmRzID0ge1xyXG59O1xyXG5cclxuXHJcblxyXG4vLyAvKipcclxuLy8gICogQGRlc2NyaXB0aW9uIERhdGEgdGhhdCBtYXliZSBzdG9yZWQgb24gYSBzeXN0ZW1cclxuLy8gICogQG5hbWUgU3lzdGVtU3RvcmFnZUtleXNcclxuLy8gICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcclxuLy8gICovXHJcbi8vIHJvb3QuSy5TeXN0ZW1TdG9yYWdlS2V5cyA9IHtcclxuLy8gICAgIHVzZXJJZDogXCJ1c2VySWRcIixcclxuLy8gICAgIHBhc3N3b3JkOiBcInBhc3N3b3JkXCIsXHJcbi8vICAgICByZW1lbWJlck1lUHJlZmVyZW5jZTogXCJyZW1lbWJlck1lUHJlZmVyZW5jZVwiLFxyXG4vLyB9O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEs6IEssXHJcbn0iXX0=
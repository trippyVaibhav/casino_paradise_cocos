
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
var Cookies = require('js-cookies');

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
    cloudAnimNode: {
      "default": null,
      type: cc.Node
    },
    sprite: {
      "default": null,
      type: cc.SpriteFrame
    },
    smallItemNode: {
      "default": null,
      type: cc.Node
    },
    rightTiltNode: {
      "default": null,
      type: cc.Node
    },
    leftTiltNode: {
      "default": null,
      type: cc.Node
    },
    spinWheelNode: {
      "default": null,
      type: cc.Node
    },
    OuterAnimation: {
      "default": null,
      type: cc.Node
    },
    category: null,
    lefttiltAngle: -7,
    // Angle to tilt the node (in degrees)
    tiltDuration: 0.2,
    // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
    }.bind(this)); // Set initial position of the sprite
    //  var rightTitlAction = cc.rotateTo(this.tiltDuration, this.righttiltAngle);
    //  var continueRightTilt = cc.repeatForever(rightTitlAction);
    //  this.rightTiltNode.runAction(continueRightTilt);
    //  var leftTitleAction = cc.rotateTo(this.tiltDuration, this.lefttiltAngle)
    //  var continueLeftTilt = cc.repeatForever(leftTitleAction);
    //  this.leftTiltNode.runAction(continueLeftTilt);

    this.smallItemNode.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this); // Register mouse leave event

    this.smallItemNode.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  },
  onMouseEnter: function onMouseEnter() {
    this.rightTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.righttiltAngle));
    this.leftTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.lefttiltAngle));
  },
  onMouseLeave: function onMouseLeave() {
    this.rightTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.originalRotation));
    this.leftTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.originalRotation));
  },
  // for full Screen
  zoomFullScreenClick: function zoomFullScreenClick() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  },
  closeSpinNode: function closeSpinNode() {
    if (this.spinWheelNode.active) {
      this.spinWheelNode.active = false;
    }
  },
  openSpinWheelNode: function openSpinWheelNode() {
    var rotateAction = cc.rotateBy(5, 360);
    var continueRotate = cc.repeatForever(rotateAction);
    this.OuterAnimation.runAction(continueRotate);

    if (!this.spinWheelNode.active) {
      this.spinWheelNode.active = true;
    }
  },
  logOutClick: function logOutClick() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1c2VySWQiLCJ0eXBlIiwiTGFiZWwiLCJjb2luc0xhYmVsIiwiY2xvdWRBbmltTm9kZSIsIk5vZGUiLCJzcHJpdGUiLCJTcHJpdGVGcmFtZSIsInNtYWxsSXRlbU5vZGUiLCJyaWdodFRpbHROb2RlIiwibGVmdFRpbHROb2RlIiwic3BpbldoZWVsTm9kZSIsIk91dGVyQW5pbWF0aW9uIiwiY2F0ZWdvcnkiLCJsZWZ0dGlsdEFuZ2xlIiwidGlsdER1cmF0aW9uIiwib3JpZ2luYWxSb3RhdGlvbiIsInJpZ2h0dGlsdEFuZ2xlIiwib25Mb2FkIiwiYWRkcmVzcyIsIksiLCJTZXJ2ZXJBZGRyZXNzIiwiaXBBZGRyZXNzIiwiU2VydmVyQVBJIiwiZ2FtZSIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiYmluZCIsIm9uIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJvbk1vdXNlRW50ZXIiLCJNT1VTRV9MRUFWRSIsIm9uTW91c2VMZWF2ZSIsInJ1bkFjdGlvbiIsInJvdGF0ZVRvIiwiem9vbUZ1bGxTY3JlZW5DbGljayIsImRvY3VtZW50IiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwiY2FuY2VsRnVsbFNjcmVlbiIsIm1vekNhbmNlbEZ1bGxTY3JlZW4iLCJ3ZWJraXRDYW5jZWxGdWxsU2NyZWVuIiwiY2xvc2VTcGluTm9kZSIsImFjdGl2ZSIsIm9wZW5TcGluV2hlZWxOb2RlIiwicm90YXRlQWN0aW9uIiwicm90YXRlQnkiLCJjb250aW51ZVJvdGF0ZSIsInJlcGVhdEZvcmV2ZXIiLCJsb2dPdXRDbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDWEMsSUFBQUEsTUFBTSxFQUFDO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSixLQURJO0FBS1hDLElBQUFBLFVBQVUsRUFBQztBQUNSLGlCQUFTLElBREQ7QUFFUkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FMQTtBQVNYRSxJQUFBQSxhQUFhLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZFLEtBVEg7QUFhWEMsSUFBQUEsTUFBTSxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMTCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1c7QUFGSixLQWJHO0FBaUJaQyxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBakJGO0FBcUJaSSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZSLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBckJGO0FBeUJaSyxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUyxJQURBO0FBRVRULE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZBLEtBekJEO0FBNkJaTSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FB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dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuY29uc3QgQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZXMnKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2xvdWRBbmltTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgfSxcbiAgICAgc3ByaXRlOiB7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG4gICAgc21hbGxJdGVtTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICByaWdodFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgbGVmdFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIE91dGVyQW5pbWF0aW9uOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgIH0sXG4gICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICBsZWZ0dGlsdEFuZ2xlOiAtNywgIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgIHRpbHREdXJhdGlvbjogMC4yLCAgLy8gRHVyYXRpb24gb2YgdGhlIHRpbHQgYW5pbWF0aW9uXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgIHJpZ2h0dGlsdEFuZ2xlOiA3LFxuICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgaWYoIXRoaXMuY2F0ZWdvcnkpe1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9IFwiYWxsXCJcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2FtZSArXCI9XCIrIHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgIFxuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZXJlc3BvbnNlIGluIGxvYmJ5XCIsIHJlc3BvbnNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgIC8vIFNldCBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcblxuICAgICAgICAvLyAgdmFyIHJpZ2h0VGl0bEFjdGlvbiA9IGNjLnJvdGF0ZVRvKHRoaXMudGlsdER1cmF0aW9uLCB0aGlzLnJpZ2h0dGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gIHZhciBjb250aW51ZVJpZ2h0VGlsdCA9IGNjLnJlcGVhdEZvcmV2ZXIocmlnaHRUaXRsQWN0aW9uKTtcbiAgICAgICAgLy8gIHRoaXMucmlnaHRUaWx0Tm9kZS5ydW5BY3Rpb24oY29udGludWVSaWdodFRpbHQpO1xuXG4gICAgICAgIC8vICB2YXIgbGVmdFRpdGxlQWN0aW9uID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdHRpbHRBbmdsZSlcbiAgICAgICAgLy8gIHZhciBjb250aW51ZUxlZnRUaWx0ID0gY2MucmVwZWF0Rm9yZXZlcihsZWZ0VGl0bGVBY3Rpb24pO1xuICAgICAgICAvLyAgdGhpcy5sZWZ0VGlsdE5vZGUucnVuQWN0aW9uKGNvbnRpbnVlTGVmdFRpbHQpO1xuXG4gICAgICAgICB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcblxuICAgICAgICAvLyBSZWdpc3RlciBtb3VzZSBsZWF2ZSBldmVudFxuICAgICAgICB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxlYXZlLCB0aGlzKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yaWdodFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodHRpbHRBbmdsZSkpO1xuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdHRpbHRBbmdsZSkpO1xuICAgICAgICBcbiAgICB9LFxuICAgIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yaWdodFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKSk7XG4gICAgICAgIHRoaXMubGVmdFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKSk7XG4gICAgfSxcblxuICAgICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgICAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKFxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsb3NlU3Bpbk5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5TcGluV2hlZWxOb2RlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICAgICAgdmFyIGNvbnRpbnVlUm90YXRlID0gY2MucmVwZWF0Rm9yZXZlcihyb3RhdGVBY3Rpb24pO1xuICAgICAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvZ091dENsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgXG4gICAgfSwgICBcbn0pO1xuIl19
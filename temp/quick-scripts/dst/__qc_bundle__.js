
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

var login = require('Login');

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
    passwordNode: {
      "default": null,
      type: cc.Node
    },
    passwordChangeButton: {
      "default": null,
      type: cc.Node
    },
    popupNode: {
      "default": null,
      type: cc.Node
    },
    oldPassword: {
      "default": null,
      type: cc.Label
    },
    newPassword: {
      "default": null,
      type: cc.Label
    },
    confirmPassword: {
      "default": null,
      type: cc.Label
    },
    profileNode: {
      "default": null,
      type: cc.Node
    },
    saveProfileBtn: {
      "default": null,
      type: cc.Node
    },
    allTab: {
      "default": null,
      type: cc.Node
    },
    fishTab: {
      "default": null,
      type: cc.Node
    },
    favTab: {
      "default": null,
      type: cc.Node
    },
    slotTab: {
      "default": null,
      type: cc.Node
    },
    kenoTab: {
      "default": null,
      type: cc.Node
    },
    otherTab: {
      "default": null,
      type: cc.Node
    },
    loginNode: {
      "default": null,
      type: login
    },
    category: null,
    lefttiltAngle: -7,
    // Angle to tilt the node (in degrees)
    tiltDuration: 0.2,
    // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7,
    targetX: 0,
    moveDuration: 2.0,
    scaleUp: 0.9,
    // Scale factor when mouse enters
    scaleNormal: 0.9
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var currentPos = this.cloudAnimNode.getPosition();
    var moveAction = cc.moveTo(this.moveDuration, cc.v2(this.targetX, currentPos.y)); // Run the move action on the sprite node

    this.cloudAnimNode.runAction(moveAction);
    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
    }.bind(this));
    var leftAngle = cc.scaleTo(this.tiltDuration, this.leftTiltAngle);
    var sleftDownAction = cc.scaleTo(this.animationDuration, this.scaleNormal); // Create the sequence action

    var scaleSequence = cc.sequence(leftAngle, sleftDownAction); // Repeat the sequence forever

    this.leftTiltNode.runAction(cc.repeatForever(scaleSequence)); // Set initial position of the sprite
    //  let leftTilt = cc.rotateTo(this.tiltDuration, this.leftTiltAngle);
    // //  let rightTilt = cc.rotateTo(this.tiltDuration, this.rightTiltAngle);
    //  let originalTilt = cc.rotateTo(this.tiltDuration, this.originalRotation);
    //  // Create the sequence action for leftTiltNode
    //  let tiltSequence = cc.sequence(leftTilt, originalTilt);
    //  // Run the sequence action indefinitely on leftTiltNode
    //  this.leftTiltNode.runAction(cc.repeatForever(tiltSequence));
    //  // Create the tilt actions for rightTiltNode
    // //  let leftTiltRightNode = cc.rotateTo(this.tiltDuration, this.leftTiltAngle);
    //  let rightTiltRightNode = cc.rotateTo(this.tiltDuration, this.rightTiltAngle);
    //  let originalTiltRightNode = cc.rotateTo(this.tiltDuration, this.originalRotation);
    //  // Create the sequence action for rightTiltNode
    //  let tiltSequenceRightNode = cc.sequence(rightTiltRightNode, originalTiltRightNode);
    //  // Run the sequence action indefinitely on rightTiltNode
    //  this.rightTiltNode.runAction(cc.repeatForever(tiltSequenceRightNode));
    //Registerred Mouse Enter event
    // this.smallItemNode.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    // // Register mouse leave event
    // this.smallItemNode.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    // console.log(this.node);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse1Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse1Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse2Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse2Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse3Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse3Leave, this); 
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse4Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse4Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse5Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse5Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse6Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse6Leave, this);
  },
  //     onMouseEnter: function(){
  //         this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").setScale(1.08);
  //     },
  //     onMouse1Enter: function(){
  //       this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").setScale(1.08);
  //   },
  //   onMouse2Enter: function(){
  //     this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").setScale(1.08);
  // },
  // onMouse3Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").setScale(1.08);
  // },
  // onMouse4Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").setScale(1.08);
  // },
  // onMouse5Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").setScale(1.08);
  // },
  // onMouse6Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").setScale(1.08);
  // },
  getGamesByCategoryAll: function getGamesByCategoryAll() {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.allTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryfish: function getGamesByCategoryfish() {
    var gameTabs = [this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.fishTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryfav: function getGamesByCategoryfav() {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.favTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategorySlot: function getGamesByCategorySlot(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.slotTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryKeno: function getGamesByCategoryKeno(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.kenoTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryOther: function getGamesByCategoryOther(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.otherTab.getChildByName('bg').active = true;
  },
  // onMouseLeave: function(){
  //     this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").setScale(this.scaleNormal);
  // },
  // onMouse1Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").setScale(this.scaleNormal);
  // },
  // onMouse2Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").setScale(this.scaleNormal);
  // },
  // onMouse3Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").setScale(this.scaleNormal);
  // },
  // onMouse4Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").setScale(this.scaleNormal);
  // },
  // onMouse5Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").setScale(this.scaleNormal);
  // },
  // onMouse6Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").setScale(this.scaleNormal);
  // },
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
  openProflePopup: function openProflePopup() {
    this.popupNode.active = true;
    this.profileNode.active = true;
  },
  logOutClick: function logOutClick() {
    console.log("clck");
    this.node.active = false;
    this.loginNode.logutClick();
  },
  passwordChangeBtn: function passwordChangeBtn() {
    if (this.oldPassword.string == "" || this.newPassword.string == "" || this.confirmPassword.string == "") {
      ServerCom.errorLable.string = "All fields are mandatory";
      ServerCom.loginErrorNode.active = true;
      setTimeout(function () {
        ServerCom.loginErrorNode.active = false;
      }, 2000);
    } else {
      if (this.newPassword.string != this.confirmPassword.string) {
        ServerCom.errorLable.string = "New Password and confirm password did not match";
        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
      }

      this.passwordNode.active = false;
      this.popupNode.active = false;
    }
  },
  changePassword: function changePassword() {
    this.passwordNode.active = true;
    this.popupNode.active = true;
  },
  closePopupBtn: function closePopupBtn() {
    if (this.passwordNode.active || this.profileNode.active) {
      this.passwordNode.active = false;
      this.profileNode.active = false;
    }

    this.popupNode.active = false;
  },
  saveProfile: function saveProfile() {
    this.profileNode.active = false;
    this.popupNode.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9iYnlcXExvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwibG9naW4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVzZXJJZCIsInR5cGUiLCJMYWJlbCIsImNvaW5zTGFiZWwiLCJjbG91ZEFuaW1Ob2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic21hbGxJdGVtTm9kZSIsInJpZ2h0VGlsdE5vZGUiLCJsZWZ0VGlsdE5vZGUiLCJzcGluV2hlZWxOb2RlIiwiT3V0ZXJBbmltYXRpb24iLCJwYXNzd29yZE5vZGUiLCJwYXNzd29yZENoYW5nZUJ1dHRvbiIsInBvcHVwTm9kZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJjYXRlZ29yeSIsImxlZnR0aWx0QW5nbGUiLCJ0aWx0RHVyYXRpb24iLCJvcmlnaW5hbFJvdGF0aW9uIiwicmlnaHR0aWx0QW5nbGUiLCJ0YXJnZXRYIiwibW92ZUR1cmF0aW9uIiwic2NhbGVVcCIsInNjYWxlTm9ybWFsIiwib25Mb2FkIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsInJ1bkFjdGlvbiIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdhbWUiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImJpbmQiLCJsZWZ0QW5nbGUiLCJzY2FsZVRvIiwibGVmdFRpbHRBbmdsZSIsInNsZWZ0RG93bkFjdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic2NhbGVTZXF1ZW5jZSIsInNlcXVlbmNlIiwicmVwZWF0Rm9yZXZlciIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiYWN0aXZlIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJvcGVuUHJvZmxlUG9wdXAiLCJsb2dPdXRDbGljayIsIm5vZGUiLCJsb2d1dENsaWNrIiwicGFzc3dvcmRDaGFuZ2VCdG4iLCJzdHJpbmciLCJlcnJvckxhYmxlIiwibG9naW5FcnJvck5vZGUiLCJzZXRUaW1lb3V0IiwiY2hhbmdlUGFzc3dvcmQiLCJjbG9zZVBvcHVwQnRuIiwic2F2ZVByb2ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF2Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDWEMsSUFBQUEsTUFBTSxFQUFDO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSixLQURJO0FBS1hDLElBQUFBLFVBQVUsRUFBQztBQUNSLGlCQUFTLElBREQ7QUFFUkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FMQTtBQVNYRSxJQUFBQSxhQUFhLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZFLEtBVEg7QUFhWEMsSUFBQUEsTUFBTSxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMTCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1c7QUFGSixLQWJHO0FBaUJaQyxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBakJGO0FBcUJaSSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZSLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBckJGO0FBeUJaSyxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUyxJQURBO0FBRVRULE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZBLEtBekJEO0FBNkJaTSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZWLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBN0JGO0FBaUNaTyxJQUFBQSxjQUFjLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhYLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDUztBQUZHLEtBakNIO0FBcUNaUSxJQUFBQSxZQUFZLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhaLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZFLEtBckNEO0FBeUNaUyxJQUFBQSxvQkFBb0IsRUFBQztBQUNuQixpQkFBUyxJQURVO0FBRW5CYixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1M7QUFGVyxLQXpDVDtBQTZDWlUsSUFBQUEsU0FBUyxFQUFDO0FBQ1IsaUJBQVMsSUFERDtBQUVSZCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxLQTdDRTtBQWlEWlcsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYZixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQWpERDtBQXFEWmUsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYaEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkUsS0FyREQ7QUF5RFpnQixJQUFBQSxlQUFlLEVBQUU7QUFDZixpQkFBUyxJQURNO0FBRWZqQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGTSxLQXpETDtBQTZEWmlCLElBQUFBLFdBQVcsRUFBQztBQUNWLGlCQUFTLElBREM7QUFFVmxCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBN0RBO0FBaUVaZSxJQUFBQSxjQUFjLEVBQUM7QUFDYixpQkFBUyxJQURJO0FBRWJuQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGSSxLQWpFSDtBQXFFWmdCLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTnBCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZILEtBckVJO0FBeUVaaUIsSUFBQUEsT0FBTyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQckIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTO0FBRkYsS0F6RUc7QUE2RVprQixJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU50QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGSCxLQTdFSTtBQWlGWm1CLElBQUFBLE9BQU8sRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUHZCLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZGLEtBakZHO0FBcUZab0IsSUFBQUEsT0FBTyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQeEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTO0FBRkYsS0FyRkc7QUF5RlpxQixJQUFBQSxRQUFRLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJ6QixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxLQXpGRTtBQTZGWnNCLElBQUFBLFNBQVMsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVDFCLE1BQUFBLElBQUksRUFBRU47QUFGRyxLQTdGQztBQWlHWGlDLElBQUFBLFFBQVEsRUFBRSxJQWpHQztBQWtHWEMsSUFBQUEsYUFBYSxFQUFFLENBQUMsQ0FsR0w7QUFrR1M7QUFDcEJDLElBQUFBLFlBQVksRUFBRSxHQW5HSDtBQW1HUztBQUNwQkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FwR1A7QUFxR1hDLElBQUFBLGNBQWMsRUFBRSxDQXJHTDtBQXNHWEMsSUFBQUEsT0FBTyxFQUFFLENBdEdFO0FBdUdYQyxJQUFBQSxZQUFZLEVBQUUsR0F2R0g7QUF3R1hDLElBQUFBLE9BQU8sRUFBRSxHQXhHRTtBQXdHSTtBQUNoQkMsSUFBQUEsV0FBVyxFQUFFO0FBekdELEdBSFA7QUFnSEw7QUFFQUMsRUFBQUEsTUFsSEssb0JBa0hLO0FBQ04sUUFBRyxDQUFDLEtBQUtULFFBQVQsRUFBa0I7QUFDZCxXQUFLQSxRQUFMLEdBQWdCLEtBQWhCO0FBQ0g7O0FBRUQsUUFBSVUsVUFBVSxHQUFHLEtBQUtsQyxhQUFMLENBQW1CbUMsV0FBbkIsRUFBakI7QUFDQSxRQUFJQyxVQUFVLEdBQUc1QyxFQUFFLENBQUM2QyxNQUFILENBQVUsS0FBS1AsWUFBZixFQUE2QnRDLEVBQUUsQ0FBQzhDLEVBQUgsQ0FBTSxLQUFLVCxPQUFYLEVBQW9CSyxVQUFVLENBQUNLLENBQS9CLENBQTdCLENBQWpCLENBTk0sQ0FRTjs7QUFDQSxTQUFLdkMsYUFBTCxDQUFtQndDLFNBQW5CLENBQTZCSixVQUE3QjtBQUdBLFFBQUlLLE9BQU8sR0FBR0MsQ0FBQyxDQUFDQyxhQUFGLENBQWdCQyxTQUFoQixHQUE0QkYsQ0FBQyxDQUFDRyxTQUFGLENBQVlDLElBQXhDLEdBQThDLEdBQTlDLEdBQW1ELEtBQUt0QixRQUF0RTtBQUVBdUIsSUFBQUEsU0FBUyxDQUFDQyxXQUFWLENBQXNCLEtBQXRCLEVBQTZCUCxPQUE3QixFQUFzQyxVQUFVUSxRQUFWLEVBQW9CO0FBQ3ZEQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQ0FBWixFQUFpREYsUUFBakQ7QUFDRixLQUZxQyxDQUVwQ0csSUFGb0MsQ0FFL0IsSUFGK0IsQ0FBdEM7QUFJQSxRQUFJQyxTQUFTLEdBQUc3RCxFQUFFLENBQUM4RCxPQUFILENBQVcsS0FBSzVCLFlBQWhCLEVBQThCLEtBQUs2QixhQUFuQyxDQUFoQjtBQUNBLFFBQUlDLGVBQWUsR0FBR2hFLEVBQUUsQ0FBQzhELE9BQUgsQ0FBVyxLQUFLRyxpQkFBaEIsRUFBbUMsS0FBS3pCLFdBQXhDLENBQXRCLENBbkJNLENBcUJOOztBQUNBLFFBQUkwQixhQUFhLEdBQUdsRSxFQUFFLENBQUNtRSxRQUFILENBQVlOLFNBQVosRUFBdUJHLGVBQXZCLENBQXBCLENBdEJNLENBd0JOOztBQUNBLFNBQUtsRCxZQUFMLENBQWtCa0MsU0FBbEIsQ0FBNEJoRCxFQUFFLENBQUNvRSxhQUFILENBQWlCRixhQUFqQixDQUE1QixFQXpCTSxDQTBCTDtBQUNEO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUgsR0F0TEk7QUF3TFQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUlHLEVBQUFBLHFCQUFxQixFQUFFLGlDQUFVO0FBQy9CLFFBQU1DLFFBQVEsR0FBRyxDQUFDLEtBQUs1QyxPQUFMLENBQWE2QyxjQUFiLENBQTRCLElBQTVCLENBQUQsRUFBb0MsS0FBSzVDLE1BQUwsQ0FBWTRDLGNBQVosQ0FBMkIsSUFBM0IsQ0FBcEMsRUFBc0UsS0FBSzNDLE9BQUwsQ0FBYTJDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBdEUsRUFBeUcsS0FBSzFDLE9BQUwsQ0FBYTBDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBekcsRUFBNEksS0FBS3pDLFFBQUwsQ0FBY3lDLGNBQWQsQ0FBNkIsSUFBN0IsQ0FBNUksQ0FBakI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxPQUFULENBQWlCLFVBQUFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNDLE1BQUosR0FBYSxLQUFqQjtBQUFBLEtBQXBCO0FBQ0QsU0FBS2pELE1BQUwsQ0FBWThDLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUNHLE1BQWpDLEdBQTBDLElBQTFDLENBSGdDLENBSS9CO0FBQ0QsR0FuTkk7QUFxTkxDLEVBQUFBLHNCQUFzQixFQUFFLGtDQUFVO0FBQ2hDLFFBQU1MLFFBQVEsR0FBRyxDQUFDLEtBQUs3QyxNQUFMLENBQVk4QyxjQUFaLENBQTJCLElBQTNCLENBQUQsRUFBbUMsS0FBSzVDLE1BQUwsQ0FBWTRDLGNBQVosQ0FBMkIsSUFBM0IsQ0FBbkMsRUFBcUUsS0FBSzNDLE9BQUwsQ0FBYTJDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBckUsRUFBd0csS0FBSzFDLE9BQUwsQ0FBYTBDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBeEcsRUFBMkksS0FBS3pDLFFBQUwsQ0FBY3lDLGNBQWQsQ0FBNkIsSUFBN0IsQ0FBM0ksQ0FBakI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxPQUFULENBQWlCLFVBQUFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNDLE1BQUosR0FBYSxLQUFqQjtBQUFBLEtBQXBCO0FBQ0EsU0FBS2hELE9BQUwsQ0FBYTZDLGNBQWIsQ0FBNEIsSUFBNUIsRUFBa0NHLE1BQWxDLEdBQTJDLElBQTNDLENBSGdDLENBSS9CO0FBQ0QsR0ExTkc7QUEyTkpFLEVBQUFBLHFCQUFxQixFQUFFLGlDQUFVO0FBQ2hDLFFBQU1OLFFBQVEsR0FBRyxDQUFDLEtBQUs1QyxPQUFMLENBQWE2QyxjQUFiLENBQTRCLElBQTVCLENBQUQsRUFBb0MsS0FBSzlDLE1BQUwsQ0FBWThDLGNBQVosQ0FBMkIsSUFBM0IsQ0FBcEMsRUFBc0UsS0FBSzNDLE9BQUwsQ0FBYTJDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBdEUsRUFBeUcsS0FBSzFDLE9BQUwsQ0FBYTBDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBekcsRUFBNEksS0FBS3pDLFFBQUwsQ0FBY3lDLGNBQWQsQ0FBNkIsSUFBN0IsQ0FBNUksQ0FBakI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxPQUFULENBQWlCLFVBQUFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNDLE1BQUosR0FBYSxLQUFqQjtBQUFBLEtBQXBCO0FBQ0EsU0FBSy9DLE1BQUwsQ0FBWTRDLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUNHLE1BQWpDLEdBQTBDLElBQTFDLENBSGdDLENBSS9CO0FBQ0QsR0FoT0c7QUFpT0pHLEVBQUFBLHNCQUFzQixFQUFFLGdDQUFTQyxLQUFULEVBQWU7QUFDdEMsUUFBTVIsUUFBUSxHQUFHLENBQUMsS0FBSzVDLE9BQUwsQ0FBYTZDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBRCxFQUFvQyxLQUFLOUMsTUFBTCxDQUFZOEMsY0FBWixDQUEyQixJQUEzQixDQUFwQyxFQUFzRSxLQUFLNUMsTUFBTCxDQUFZNEMsY0FBWixDQUEyQixJQUEzQixDQUF0RSxFQUF3RyxLQUFLMUMsT0FBTCxDQUFhMEMsY0FBYixDQUE0QixJQUE1QixDQUF4RyxFQUEySSxLQUFLekMsUUFBTCxDQUFjeUMsY0FBZCxDQUE2QixJQUE3QixDQUEzSSxDQUFqQjtBQUNBRCxJQUFBQSxRQUFRLENBQUNFLE9BQVQsQ0FBaUIsVUFBQUMsR0FBRztBQUFBLGFBQUlBLEdBQUcsQ0FBQ0MsTUFBSixHQUFhLEtBQWpCO0FBQUEsS0FBcEI7QUFDQSxTQUFLOUMsT0FBTCxDQUFhMkMsY0FBYixDQUE0QixJQUE1QixFQUFrQ0csTUFBbEMsR0FBMkMsSUFBM0MsQ0FIc0MsQ0FJckM7QUFDRCxHQXRPRztBQXVPSkssRUFBQUEsc0JBQXNCLEVBQUUsZ0NBQVNELEtBQVQsRUFBZTtBQUN0QyxRQUFNUixRQUFRLEdBQUcsQ0FBQyxLQUFLNUMsT0FBTCxDQUFhNkMsY0FBYixDQUE0QixJQUE1QixDQUFELEVBQW9DLEtBQUs5QyxNQUFMLENBQVk4QyxjQUFaLENBQTJCLElBQTNCLENBQXBDLEVBQXNFLEtBQUs1QyxNQUFMLENBQVk0QyxjQUFaLENBQTJCLElBQTNCLENBQXRFLEVBQXdHLEtBQUszQyxPQUFMLENBQWEyQyxjQUFiLENBQTRCLElBQTVCLENBQXhHLEVBQTJJLEtBQUt6QyxRQUFMLENBQWN5QyxjQUFkLENBQTZCLElBQTdCLENBQTNJLENBQWpCO0FBQ0FELElBQUFBLFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQixVQUFBQyxHQUFHO0FBQUEsYUFBSUEsR0FBRyxDQUFDQyxNQUFKLEdBQWEsS0FBakI7QUFBQSxLQUFwQjtBQUNBLFNBQUs3QyxPQUFMLENBQWEwQyxjQUFiLENBQTRCLElBQTVCLEVBQWtDRyxNQUFsQyxHQUEyQyxJQUEzQyxDQUhzQyxDQUlyQztBQUNELEdBNU9HO0FBNk9KTSxFQUFBQSx1QkFBdUIsRUFBRSxpQ0FBU0YsS0FBVCxFQUFlO0FBQ3ZDLFFBQU1SLFFBQVEsR0FBRyxDQUFDLEtBQUs1QyxPQUFMLENBQWE2QyxjQUFiLENBQTRCLElBQTVCLENBQUQsRUFBb0MsS0FBSzlDLE1BQUwsQ0FBWThDLGNBQVosQ0FBMkIsSUFBM0IsQ0FBcEMsRUFBc0UsS0FBSzVDLE1BQUwsQ0FBWTRDLGNBQVosQ0FBMkIsSUFBM0IsQ0FBdEUsRUFBd0csS0FBSzNDLE9BQUwsQ0FBYTJDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBeEcsRUFBMkksS0FBSzFDLE9BQUwsQ0FBYTBDLGNBQWIsQ0FBNEIsSUFBNUIsQ0FBM0ksQ0FBakI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxPQUFULENBQWlCLFVBQUFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNDLE1BQUosR0FBYSxLQUFqQjtBQUFBLEtBQXBCO0FBQ0EsU0FBSzVDLFFBQUwsQ0FBY3lDLGNBQWQsQ0FBNkIsSUFBN0IsRUFBbUNHLE1BQW5DLEdBQTRDLElBQTVDO0FBQ0EsR0FqUEc7QUFvUEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUM7QUFDQU8sRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVU7QUFDeEIsUUFBSSxDQUFDQyxRQUFRLENBQUNDLGlCQUFWLElBQStCLENBQUNELFFBQVEsQ0FBQ0Usb0JBQXpDLElBQWlFLENBQUNGLFFBQVEsQ0FBQ0csdUJBQS9FLEVBQ0U7QUFDQTtBQUNBLFVBQUlILFFBQVEsQ0FBQ0ksZUFBVCxDQUF5QkMsaUJBQTdCLEVBQWdEO0FBQzlDTCxRQUFBQSxRQUFRLENBQUNJLGVBQVQsQ0FBeUJDLGlCQUF6QjtBQUNELE9BRkQsTUFFTyxJQUFJTCxRQUFRLENBQUNJLGVBQVQsQ0FBeUJFLG9CQUE3QixFQUFtRDtBQUN4RE4sUUFBQUEsUUFBUSxDQUFDSSxlQUFULENBQXlCRSxvQkFBekI7QUFDRCxPQUZNLE1BRUEsSUFBSU4sUUFBUSxDQUFDSSxlQUFULENBQXlCRyx1QkFBN0IsRUFBc0Q7QUFDM0RQLFFBQUFBLFFBQVEsQ0FBQ0ksZUFBVCxDQUF5QkcsdUJBQXpCLENBQ0VDLE9BQU8sQ0FBQ0Msb0JBRFY7QUFHRDtBQUNGLEtBWkQsTUFZTztBQUNMLFVBQUlULFFBQVEsQ0FBQ1UsZ0JBQWIsRUFBK0I7QUFDN0JWLFFBQUFBLFFBQVEsQ0FBQ1UsZ0JBQVQ7QUFDRCxPQUZELE1BRU8sSUFBSVYsUUFBUSxDQUFDVyxtQkFBYixFQUFrQztBQUN2Q1gsUUFBQUEsUUFBUSxDQUFDVyxtQkFBVDtBQUNELE9BRk0sTUFFQSxJQUFJWCxRQUFRLENBQUNZLHNCQUFiLEVBQXFDO0FBQzFDWixRQUFBQSxRQUFRLENBQUNZLHNCQUFUO0FBQ0Q7QUFDRjtBQUNSLEdBalNJO0FBbVNMQyxFQUFBQSxhQUFhLEVBQUUseUJBQVU7QUFDckIsUUFBRyxLQUFLaEYsYUFBTCxDQUFtQjJELE1BQXRCLEVBQTZCO0FBQ3pCLFdBQUszRCxhQUFMLENBQW1CMkQsTUFBbkIsR0FBNEIsS0FBNUI7QUFDSDtBQUNKLEdBdlNJO0FBeVNMc0IsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVU7QUFDekIsUUFBSUMsWUFBWSxHQUFHakcsRUFBRSxDQUFDa0csUUFBSCxDQUFZLENBQVosRUFBZSxHQUFmLENBQW5CO0FBQ0EsUUFBSUMsY0FBYyxHQUFHbkcsRUFBRSxDQUFDb0UsYUFBSCxDQUFpQjZCLFlBQWpCLENBQXJCO0FBQ0EsU0FBS2pGLGNBQUwsQ0FBb0JnQyxTQUFwQixDQUE4Qm1ELGNBQTlCOztBQUNBLFFBQUcsQ0FBQyxLQUFLcEYsYUFBTCxDQUFtQjJELE1BQXZCLEVBQThCO0FBQzFCLFdBQUszRCxhQUFMLENBQW1CMkQsTUFBbkIsR0FBNEIsSUFBNUI7QUFDSDtBQUNKLEdBaFRJO0FBa1RMMEIsRUFBQUEsZUFBZSxFQUFFLDJCQUFVO0FBQ3pCLFNBQUtqRixTQUFMLENBQWV1RCxNQUFmLEdBQXdCLElBQXhCO0FBQ0EsU0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixJQUExQjtBQUNELEdBclRJO0FBdVRMMkIsRUFBQUEsV0FBVyxFQUFFLHVCQUFVO0FBQ3JCM0MsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBLFNBQUsyQyxJQUFMLENBQVU1QixNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBSzNDLFNBQUwsQ0FBZXdFLFVBQWY7QUFDRCxHQTNUSTtBQTZUTEMsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVU7QUFDM0IsUUFBRyxLQUFLcEYsV0FBTCxDQUFpQnFGLE1BQWpCLElBQTJCLEVBQTNCLElBQWlDLEtBQUtwRixXQUFMLENBQWlCb0YsTUFBakIsSUFBMkIsRUFBNUQsSUFBa0UsS0FBS25GLGVBQUwsQ0FBcUJtRixNQUFyQixJQUErQixFQUFwRyxFQUF1RztBQUNyR2xELE1BQUFBLFNBQVMsQ0FBQ21ELFVBQVYsQ0FBcUJELE1BQXJCLEdBQThCLDBCQUE5QjtBQUNBbEQsTUFBQUEsU0FBUyxDQUFDb0QsY0FBVixDQUF5QmpDLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0VrQyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmckQsUUFBQUEsU0FBUyxDQUFDb0QsY0FBVixDQUF5QmpDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0gsT0FGVyxFQUVULElBRlMsQ0FBVjtBQUdILEtBTkQsTUFNSztBQUNILFVBQUksS0FBS3JELFdBQUwsQ0FBaUJvRixNQUFqQixJQUEyQixLQUFLbkYsZUFBTCxDQUFxQm1GLE1BQXBELEVBQTJEO0FBQ3pEbEQsUUFBQUEsU0FBUyxDQUFDbUQsVUFBVixDQUFxQkQsTUFBckIsR0FBOEIsaURBQTlCO0FBQ0FsRCxRQUFBQSxTQUFTLENBQUNvRCxjQUFWLENBQXlCakMsTUFBekIsR0FBa0MsSUFBbEM7QUFDRWtDLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2ZyRCxVQUFBQSxTQUFTLENBQUNvRCxjQUFWLENBQXlCakMsTUFBekIsR0FBa0MsS0FBbEM7QUFDSCxTQUZXLEVBRVQsSUFGUyxDQUFWO0FBR0g7O0FBQ0QsV0FBS3pELFlBQUwsQ0FBa0J5RCxNQUFsQixHQUEyQixLQUEzQjtBQUNBLFdBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0Q7QUFFRixHQWhWSTtBQWlWTG1DLEVBQUFBLGNBQWMsRUFBRSwwQkFBVTtBQUN4QixTQUFLNUYsWUFBTCxDQUFrQnlELE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsU0FBS3ZELFNBQUwsQ0FBZXVELE1BQWYsR0FBd0IsSUFBeEI7QUFFRCxHQXJWSTtBQXNWTG9DLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixRQUFHLEtBQUs3RixZQUFMLENBQWtCeUQsTUFBbEIsSUFBNEIsS0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFoRCxFQUF1RDtBQUNyRCxXQUFLekQsWUFBTCxDQUFrQnlELE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0EsV0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNEOztBQUNELFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0QsR0E1Vkk7QUE2VkxxQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDckIsU0FBS3hGLFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBRUQ7QUFqV0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmNvbnN0IENvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWVzJyk7XHJcbmNvbnN0IGxvZ2luID0gcmVxdWlyZSgnTG9naW4nKVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgIHVzZXJJZDp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOmNjLkxhYmVsLFxyXG4gICAgIH0sXHJcbiAgICAgY29pbnNMYWJlbDp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICB9LFxyXG4gICAgIGNsb3VkQW5pbU5vZGU6e1xyXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgIH0sXHJcbiAgICAgc3ByaXRlOiB7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgIH0sXHJcbiAgICBzbWFsbEl0ZW1Ob2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgcmlnaHRUaWx0Tm9kZTp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgbGVmdFRpbHROb2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBzcGluV2hlZWxOb2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBPdXRlckFuaW1hdGlvbjp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmROb2RlOntcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZENoYW5nZUJ1dHRvbjp7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgfSxcclxuICAgIHBvcHVwTm9kZTp7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBvbGRQYXNzd29yZDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgfSxcclxuICAgIG5ld1Bhc3N3b3JkOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICB9LFxyXG4gICAgY29uZmlybVBhc3N3b3JkOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICB9LFxyXG4gICAgcHJvZmlsZU5vZGU6e1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgc2F2ZVByb2ZpbGVCdG46e1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgYWxsVGFiOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgZmlzaFRhYjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIGZhdlRhYjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIHNsb3RUYWI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBrZW5vVGFiOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb3RoZXJUYWI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBsb2dpbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogbG9naW4sXHJcbiAgICB9LFxyXG4gICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgIGxlZnR0aWx0QW5nbGU6IC03LCAgLy8gQW5nbGUgdG8gdGlsdCB0aGUgbm9kZSAoaW4gZGVncmVlcylcclxuICAgICB0aWx0RHVyYXRpb246IDAuMiwgIC8vIER1cmF0aW9uIG9mIHRoZSB0aWx0IGFuaW1hdGlvblxyXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXHJcbiAgICAgcmlnaHR0aWx0QW5nbGU6IDcsXHJcbiAgICAgdGFyZ2V0WDogMCwgICBcclxuICAgICBtb3ZlRHVyYXRpb246IDIuMCwgXHJcbiAgICAgc2NhbGVVcDogMC45LCAgLy8gU2NhbGUgZmFjdG9yIHdoZW4gbW91c2UgZW50ZXJzXHJcbiAgICBzY2FsZU5vcm1hbDogMC45LFxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBcImFsbFwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudFBvcyA9IHRoaXMuY2xvdWRBbmltTm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBtb3ZlQWN0aW9uID0gY2MubW92ZVRvKHRoaXMubW92ZUR1cmF0aW9uLCBjYy52Mih0aGlzLnRhcmdldFgsIGN1cnJlbnRQb3MueSkpO1xyXG5cclxuICAgICAgICAvLyBSdW4gdGhlIG1vdmUgYWN0aW9uIG9uIHRoZSBzcHJpdGUgbm9kZVxyXG4gICAgICAgIHRoaXMuY2xvdWRBbmltTm9kZS5ydW5BY3Rpb24obW92ZUFjdGlvbik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmdhbWUgK1wiPVwiKyB0aGlzLmNhdGVnb3J5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIkdFVFwiLCBhZGRyZXNzLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlcmVzcG9uc2VyZXNwb25zZSBpbiBsb2JieVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgbGV0IGxlZnRBbmdsZSA9IGNjLnNjYWxlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdFRpbHRBbmdsZSk7XHJcbiAgICAgICAgbGV0IHNsZWZ0RG93bkFjdGlvbiA9IGNjLnNjYWxlVG8odGhpcy5hbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zY2FsZU5vcm1hbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBzZXF1ZW5jZSBhY3Rpb25cclxuICAgICAgICBsZXQgc2NhbGVTZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGxlZnRBbmdsZSwgc2xlZnREb3duQWN0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZXBlYXQgdGhlIHNlcXVlbmNlIGZvcmV2ZXJcclxuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzY2FsZVNlcXVlbmNlKSk7XHJcbiAgICAgICAgIC8vIFNldCBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcclxuICAgICAgICAvLyAgbGV0IGxlZnRUaWx0ID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdFRpbHRBbmdsZSk7XHJcbiAgICAgICAgLy8gLy8gIGxldCByaWdodFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XHJcbiAgICAgICAgLy8gIGxldCBvcmlnaW5hbFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgbGVmdFRpbHROb2RlXHJcbiAgICAgICAgLy8gIGxldCB0aWx0U2VxdWVuY2UgPSBjYy5zZXF1ZW5jZShsZWZ0VGlsdCwgb3JpZ2luYWxUaWx0KTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gbGVmdFRpbHROb2RlXHJcbiAgICAgICAgLy8gIHRoaXMubGVmdFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKHRpbHRTZXF1ZW5jZSkpO1xyXG4gXHJcbiAgICAgICAgLy8gIC8vIENyZWF0ZSB0aGUgdGlsdCBhY3Rpb25zIGZvciByaWdodFRpbHROb2RlXHJcbiAgICAgICAgLy8gLy8gIGxldCBsZWZ0VGlsdFJpZ2h0Tm9kZSA9IGNjLnJvdGF0ZVRvKHRoaXMudGlsdER1cmF0aW9uLCB0aGlzLmxlZnRUaWx0QW5nbGUpO1xyXG4gICAgICAgIC8vICBsZXQgcmlnaHRUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMucmlnaHRUaWx0QW5nbGUpO1xyXG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XHJcbiBcclxuICAgICAgICAvLyAgLy8gQ3JlYXRlIHRoZSBzZXF1ZW5jZSBhY3Rpb24gZm9yIHJpZ2h0VGlsdE5vZGVcclxuICAgICAgICAvLyAgbGV0IHRpbHRTZXF1ZW5jZVJpZ2h0Tm9kZSA9IGNjLnNlcXVlbmNlKHJpZ2h0VGlsdFJpZ2h0Tm9kZSwgb3JpZ2luYWxUaWx0UmlnaHROb2RlKTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gcmlnaHRUaWx0Tm9kZVxyXG4gICAgICAgIC8vICB0aGlzLnJpZ2h0VGlsdE5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIodGlsdFNlcXVlbmNlUmlnaHROb2RlKSk7XHJcblxyXG4gICAgICAgIC8vUmVnaXN0ZXJyZWQgTW91c2UgRW50ZXIgZXZlbnRcclxuICAgICAgICAvLyB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyAvLyBSZWdpc3RlciBtb3VzZSBsZWF2ZSBldmVudFxyXG4gICAgICAgIC8vIHRoaXMuc21hbGxJdGVtTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlTGVhdmUsIHRoaXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMUVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMUxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMkVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMkxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlM0VudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlM0xlYXZlLCB0aGlzKTsgXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTRFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTRMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTVFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTVMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTZFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTZMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuLy8gICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcclxuLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyAgICAgfSxcclxuLy8gICAgIG9uTW91c2UxRW50ZXI6IGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0xXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyAgIH0sXHJcbi8vICAgb25Nb3VzZTJFbnRlcjogZnVuY3Rpb24oKXtcclxuLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0yXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlM0VudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0zXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNEVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW00XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNUVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW01XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNkVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW02XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG5cclxuICAgIGdldEdhbWVzQnlDYXRlZ29yeUFsbDogZnVuY3Rpb24oKXtcclxuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlmaXNoOiBmdW5jdGlvbigpe1xyXG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcclxuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxyXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcclxuICAgICB9LFxyXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeWZhdjogZnVuY3Rpb24oKXtcclxuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XHJcbiAgICAgfSxcclxuICAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlTbG90OiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xyXG4gICAgIH0sXHJcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5S2VubzogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcclxuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxyXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcclxuICAgICB9LFxyXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeU90aGVyOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XHJcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSk7XHJcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICB9LFxyXG4gICAgIFxyXG4gICAgXHJcbiAgICAvLyBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlMUxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlMkxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlM0xlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNExlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNFwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNUxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNkxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgIC8vIGZvciBmdWxsIFNjcmVlblxyXG4gICAgIHpvb21GdWxsU2NyZWVuQ2xpY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAvLyBjdXJyZW50IHdvcmtpbmcgbWV0aG9kc1xyXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbihcclxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNwaW5Ob2RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuU3BpbldoZWVsTm9kZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcclxuICAgICAgICB2YXIgY29udGludWVSb3RhdGUgPSBjYy5yZXBlYXRGb3JldmVyKHJvdGF0ZUFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5PdXRlckFuaW1hdGlvbi5ydW5BY3Rpb24oY29udGludWVSb3RhdGUpO1xyXG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuUHJvZmxlUG9wdXA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9nT3V0Q2xpY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xja1wiKTtcclxuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgIHRoaXMubG9naW5Ob2RlLmxvZ3V0Q2xpY2soKTtcclxuICAgIH0sICAgXHJcblxyXG4gICAgcGFzc3dvcmRDaGFuZ2VCdG46IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmKHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHwgdGhpcy5uZXdQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fCB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcgPT0gXCJcIil7XHJcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJBbGwgZmllbGRzIGFyZSBtYW5kYXRvcnlcIjtcclxuICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGlmKCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpe1xyXG4gICAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJOZXcgUGFzc3dvcmQgYW5kIGNvbmZpcm0gcGFzc3dvcmQgZGlkIG5vdCBtYXRjaFwiO1xyXG4gICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgIFxyXG4gICAgfSxcclxuICAgIGNoYW5nZVBhc3N3b3JkOiBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBjbG9zZVBvcHVwQnRuOiBmdW5jdGlvbigpe1xyXG4gICAgICBpZih0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgfHwgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUpe1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
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
    },
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
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
  logutClick: function logutClick() {
    if (this.lobbyNode.active) {
      this.lobbyNode.active = false;
    }
  },
  onLoginClick: function onLoginClick() {
    var _this = this;

    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };

    if (this.userName.string == "" || this.password.string == "") {
      this.errorLable.string = "Username or Password fields are empty";
      this.loginErrorNode.active = true;
      setTimeout(function () {
        _this.loginErrorNode.active = false;
      }, 2000);
      return;
    }

    ServerCom.httpRequest("POST", address, data, function (response) {
      if (response.token) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;

        if (cc.sys.isBrowser) {
          document.cookie = "token=" + response.token + "; path=/;";
          document.cookie = "index = " + randomNumber;
        } else {
          cc.sys.localStorage.setItem('token', response.token);
          cc.sys.localStorage.setItem("index", randomNumber);
        } // Cookies.set("index", randomNumber);


        setTimeout(function () {
          this.lobbyNode.active = true;
        }.bind(this), 1000);
      } else {
        console.log("response of user not found on login page", response); // this.errorLable.string = response.error
        // this.loginErrorNode.active = true;
        // setTimeout(() => {
        //     this.loginErrorNode.active = false;
        // }, 2000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbG9naW5cXExvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsImxvZ3V0Q2xpY2siLCJhY3RpdmUiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsInNldFRpbWVvdXQiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwidG9rZW4iLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzeXMiLCJpc0Jyb3dzZXIiLCJkb2N1bWVudCIsImNvb2tpZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJiaW5kIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFG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QUFDSDtBQUVKLEtBeEI0QyxDQXdCM0NZLElBeEIyQyxDQXdCdEMsSUF4QnNDLENBQTdDO0FBMEJIO0FBdEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICB1c2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbWVtYmVyTWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuVG9nZ2xlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2JieU5vZGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JMYWJsZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luRXJyb3JOb2RlOntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZW1lbWJlck1lKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgIGxvZ3V0Q2xpY2soKXtcclxuICAgICAgICBpZih0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9naW5DbGljayAoKXtcclxuICAgICAgICB2YXIgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5sb2dpbjtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWUuc3RyaW5nLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZC5zdHJpbmdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKHRoaXMudXNlck5hbWUuc3RyaW5nID09IFwiXCIgfHwgdGhpcy5wYXNzd29yZC5zdHJpbmcgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMYWJsZS5zdHJpbmcgPSBcIlVzZXJuYW1lIG9yIFBhc3N3b3JkIGZpZWxkcyBhcmUgZW1wdHlcIlxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiUE9TVFwiLCBhZGRyZXNzLCBkYXRhLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgdG9rZW49JHtyZXNwb25zZS50b2tlbn07IHBhdGg9LztgO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBpbmRleCA9ICR7cmFuZG9tTnVtYmVyfWBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmRleFwiLCByYW5kb21OdW1iZXIpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIENvb2tpZXMuc2V0KFwiaW5kZXhcIiwgcmFuZG9tTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9iYnlOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIG9mIHVzZXIgbm90IGZvdW5kIG9uIGxvZ2luIHBhZ2VcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lcnJvckxhYmxlLnN0cmluZyA9IHJlc3BvbnNlLmVycm9yXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9LFxyXG59KTsiXX0=
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

var Cookies = require('js-cookies'); // const axios = require('./axios/dist/axios');
// const axios = require('axios');


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
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
      "default": null,
      type: cc.Node
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
            inst.errorLable.string = errorData.error;
            inst.loginErrorNode.active = true;
            setTimeout(function () {
              inst.loginErrorNode.active = false;
            }, 2000); // callback(errorData);
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
    }; // 
    // xhr.withCredentials = true;


    xhr.open(method, address, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var token = null;

    if (!token && cc.sys.isBrowser) {
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith('token=')) {
          token = cookie.substring('token='.length, cookie.length);
          break;
        }
      }
    } // If token exists, add it to a custom header


    if (token) {
      xhr.setRequestHeader("Cookie", "userToken=" + token);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU2VydmVyQ29tLmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwicm9vdCIsIndpbmRvdyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZyIsInR5cGUiLCJOb2RlIiwicmVjb25uZWN0aW5nIiwidHJhY2tlciIsImVycm9yTGFibGUiLCJMYWJlbCIsImxvZ2luRXJyb3JOb2RlIiwidHJhY2tlckNvdW50IiwidGltZXIiLCJvbkxvYWQiLCJTZXJ2ZXJDb20iLCJjaGVja09yaWVudGF0aW9uIiwidmlldyIsIm9uIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0T3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSIsIk9SSUVOVEFUSU9OX1BPUlRSQUlUIiwiZXJyb3IiLCJjb25zb2xlIiwiY2xlYXJUcmFja2VyIiwiaHR0cFJlcXVlc3QiLCJtZXRob2QiLCJhZGRyZXNzIiwiZGF0YSIsImNhbGxiYWNrIiwidGltZW91dCIsImluc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImFjdGl2ZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIksiLCJpbnRlcm5ldEF2YWlsYWJsZSIsInJlYWR5U3RhdGUiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImVycm9yTXNnIiwiZXJyb3JEYXRhIiwibG9nIiwic3RyaW5nIiwic2V0VGltZW91dCIsImUiLCJvbmVycm9yIiwiZXJyIiwib250aW1lb3V0IiwiZGlzY29ubmVjdFJlcXVlc3RlZEJ5UGxheWVyIiwiZW1pdCIsImNvZGUiLCJFcnJvciIsIlRpbWVPdXRFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwidG9rZW4iLCJzeXMiLCJpc0Jyb3dzZXIiLCJjb29raWVzIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzcGxpdCIsImkiLCJs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TSxNQUFBQSxHQUFHLENBQUN5QyxJQUFKO0FBQ0g7QUFDSixHQXZKSSxDQTBKTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXZLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb29raWVzID0gcmVxdWlyZSgnanMtY29va2llcycpO1xyXG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJy4vYXhpb3MvZGlzdC9heGlvcycpO1xyXG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XHJcblxyXG52YXIgcm9vdCA9IHdpbmRvdztcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxvYWRpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY29ubmVjdGluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJhY2tlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yTGFibGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbkVycm9yTm9kZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyYWNrZXJDb3VudDogMCxcclxuICAgICAgICB0aW1lciA6IDAsXHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlZCBTZXJ2ZXJDb20gR2xvYWJhbHkgc28gdGhhdCB3ZSBjYW4gYWNjZXNzIGl0IGFueXdoZXJlIHdlIHdhbnRcclxuICAgICAgICByb290LlNlcnZlckNvbSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjYW52YXMgcmVzaXplIHRvIGhhbmRsZSBvcmllbnRhdGlvbiBjaGFuZ2VcclxuICAgICAgICBjYy52aWV3Lm9uKCdjYW52YXMtcmVzaXplJywgdGhpcy5jaGVja09yaWVudGF0aW9uLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyBmb2xsb3dpbmcgZnVuY3Rpb24gaXMgdG8gY2hlY2sgdGhlIHdpZHRoIGFuZCBjaGFuZ2UgdGhlIG9yaWVudGF0aW9uKExhbmRzY2FwZS9Qb3RyYWl0KSBmb3IgbW9iaWxlIG9yIGRla3N0b3BcclxuICAgIGNoZWNrT3JpZW50YXRpb24oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHdpblNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgd2lkdGggaXMgZ3JlYXRlciB0aGFuIHRoZSBoZWlnaHQgdG8gZGV0ZXJtaW5lIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIGlmICh3aW5TaXplLndpZHRoID4gd2luU2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIG9yaWVudGF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsZWFyVHJhY2tlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy50cmFja2VyID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBodHRwUG9zdFJlcXVlc3RcclxuICAgICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyAtYWRkcmVzcyBvZiBTZXJ2ZXIgXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcclxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBjYWxsYmFjayAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY3NzIGlzIHRydWUhXHJcbiAgICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtdmFsdWUgaW4gbWlsbGkgc2Vjb25kcywgU3BlY2lmeSByZXF1ZXN0IHRpbWVvdXQgdGltZSEgXHJcbiAgICAgKiBAbWVtYmVyb2YgVXRpbGl0aWVzLlNlcnZlckNvbSNcclxuICAgICAqL1xyXG5cclxuIFxyXG4gICAgaHR0cFJlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIGFkZHJlc3MsIGRhdGEsIGNhbGxiYWNrLCBlcnJvciwgdGltZW91dCkge1xyXG4gICAgICAgIHZhciBpbnN0ID0gdGhpcztcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDEwMDA7XHJcbiAgICAgICAgaWYoIVNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gZXJyb3JEYXRhLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JEYXRhZXJyb3JEYXRhXCIsIGVycm9yRGF0YSwgeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5lcnJvckxhYmxlLnN0cmluZyA9IGVycm9yRGF0YS5lcnJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKGVycm9yRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBlcnJvciByZXNwb25zZTpcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBlcnJvck1zZyA9IFwiVW5rbm93biBlcnJvclwiO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGVycm9yIHJlc3BvbnNlOlwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5kaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgaW5zdC5lbWl0KCdlcnJvcicsIHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IEsuRXJyb3IuVGltZU91dEVycm9yLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVGltZW91dCBcIiArIGFkZHJlc3MsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gXHJcbiAgICAgICAgLy8geGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCBhZGRyZXNzLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRva2VuICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd0b2tlbj0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gY29va2llLnN1YnN0cmluZygndG9rZW49Jy5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIHRva2VuIGV4aXN0cywgYWRkIGl0IHRvIGEgY3VzdG9tIGhlYWRlclxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvb2tpZVwiLCBgdXNlclRva2VuPSR7dG9rZW59YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJHRVRcIikge1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXHJcbiAgICAvLyBXSUxMIHVzZSB0aGUgZm9sbG93aW5nIGNvZGUgbGF0ZXIgdG8gY2hlY2sgaWYgdGhlIHNhbWUgYXBpIGlzIHJlcXVlc3QgdW50aWxsIHdlIGdldHMgaXRzIHJlc3BvbnNlXHJcbiAgICAvLyAvKipcclxuICAgIC8vIHVwZGF0ZVRyYWNrZXI6IGZ1bmN0aW9uICh2YWwsIGtleSwgc2hvd0xvYWRpbmcpIHtcclxuICAgIC8vICAgICB2YXIgaW5jciA9IHZhbCA/ICsxIDogLTE7XHJcbiAgICAvLyAgICAgdGhpcy50cmFja2VyQ291bnQgPSB0aGlzLnRyYWNrZXJDb3VudCArIGluY3I7XHJcbiAgICAvLyAgICAgdmFyIGlzQWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xyXG4gICAgLy8gICAgIGlmKCF0aGlzLmxvYWRpbmcuYWN0aXZlICYmIHNob3dMb2FkaW5nKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7IFxyXG4gICAgLy8gICAgIH1lbHNlIGlmKHRoaXMubG9hZGluZy5hY3RpdmUgJiYgIXNob3dMb2FkaW5nKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy90aGlzLmxvYWRpbmcuYWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xyXG4gICAgLy8gICAgIHRoaXMudHJhY2tlcltrZXldID0gdmFsO1xyXG4gICAgLy8gfSxcclxuXHJcbn0pOyJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29uZmlnXFxHYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJTb3VuZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxNQUFYO0FBRUFELElBQUksQ0FBQ0UsQ0FBTCxHQUFTLEVBQVQ7QUFFQUYsSUFBSSxDQUFDRSxDQUFMLENBQU9DLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDRSxDQUFMLENBQU9FLEtBQVAsR0FBZUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBREM7QUFFbkJDLEVBQUFBLGlCQUFpQixFQUFFO0FBRkEsQ0FBUixDQUFmO0FBTUFSLElBQUksQ0FBQ0UsQ0FBTCxDQUFPTyxFQUFQLEdBQVksS0FBWjtBQUVBVCxJQUFJLENBQUNFLENBQUwsQ0FBT1EsYUFBUCxHQUF1QixJQUF2QjtBQUVBVixJQUFJLENBQUNFLENBQUwsQ0FBT1MsYUFBUCxHQUF1QjtBQUNuQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsMkNBRlEsQ0FFcUM7O0FBRnJDLENBQXZCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVosSUFBSSxDQUFDRSxDQUFMLENBQU9XLFNBQVAsR0FBbUI7QUFDZkMsRUFBQUEsS0FBSyxFQUFFLGtCQURRO0FBRWZDLEVBQUFBLElBQUksRUFBRTtBQUZTLENBQW5CO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWYsSUFBSSxDQUFDRSxDQUFMLENBQU9jLE1BQVAsR0FBZ0IsRUFBaEIsRUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JoQixFQUFBQSxDQUFDLEVBQUVBO0FBRFUsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbmFtZXNwYWNlIENvbmZpZ3NcclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIEdhbWVDb25maWdcclxuICogQG1lbWJlcm9mIENvbmZpZ3NcclxuICovXHJcblxyXG4vKiogXHJcbiAqIEBhbGlhcyB3aW5kb3dcclxuICogQG5hbWUgcm9vdFxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxudmFyIHJvb3QgPSB3aW5kb3c7XHJcblxyXG5yb290LksgPSB7fTtcclxuXHJcbnJvb3QuSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XHJcbi8qKlxyXG4gKiBAZW51bSB7TnVtYmVyfSBSZXByZXNlbnRzIHBvc3NpYmxlIGVycm9ycyBpbiB0aGUgZ2FtZVxyXG4gKiBAbmFtZSBFcnJvclxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxucm9vdC5LLkVycm9yID0gY2MuRW51bSh7XHJcbiAgICBDcmVkZW50aWFsc0Vycm9yOiA0MDEsXHJcbiAgICBTdWNjZXNzRmFsc2VFcnJvcjogNDA0LFxyXG59KTtcclxuXHJcblxyXG5yb290LksuV1MgPSBmYWxzZTtcclxuXHJcbnJvb3QuSy5EZXZlbG9wZXJNb2RlID0gdHJ1ZTtcclxuXHJcbnJvb3QuSy5TZXJ2ZXJBZGRyZXNzID0ge1xyXG4gICAgLy8vLy8vIElQIGFuZCBVUkxTIHVwZGF0ZSBhcyBwZXIgcmVxdWlyZW1lbnRzXHJcbiAgICBpcEFkZHJlc3M6IFwiaHR0cHM6Ly9nYW1lLWNybS1ydHAtYmFja2VuZC5vbnJlbmRlci5jb21cIiwgLy8gT1RMXHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFNlcnZlciBBUElzXHJcbiAqIEBuYW1lIFNlcnZlckFQSVxyXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xyXG4gKi9cclxucm9vdC5LLlNlcnZlckFQSSA9IHtcclxuICAgIGxvZ2luOiBcIi9hcGkvdXNlcnMvbG9naW5cIixcclxuICAgIGdhbWU6IFwiL2FwaS9nYW1lcy9nZXRHYW1lcz9jYXRlZ29yeVwiLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBSZXByZXNlbnRzIHNvdW5kIGVmZmVjdHMgcGxheWVkIG9uIHVzZXIgcmVsYXRlZCBldmVudHNcclxuICogQG5hbWUgU291bmRzXHJcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXHJcbiAqL1xyXG5yb290LksuU291bmRzID0ge1xyXG59O1xyXG5cclxuXHJcblxyXG4vLyAvKipcclxuLy8gICogQGRlc2NyaXB0aW9uIERhdGEgdGhhdCBtYXliZSBzdG9yZWQgb24gYSBzeXN0ZW1cclxuLy8gICogQG5hbWUgU3lzdGVtU3RvcmFnZUtleXNcclxuLy8gICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcclxuLy8gICovXHJcbi8vIHJvb3QuSy5TeXN0ZW1TdG9yYWdlS2V5cyA9IHtcclxuLy8gICAgIHVzZXJJZDogXCJ1c2VySWRcIixcclxuLy8gICAgIHBhc3N3b3JkOiBcInBhc3N3b3JkXCIsXHJcbi8vICAgICByZW1lbWJlck1lUHJlZmVyZW5jZTogXCJyZW1lbWJlck1lUHJlZmVyZW5jZVwiLFxyXG4vLyB9O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEs6IEssXHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__node_modules/js-cookies/index.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var encode = function encode(val) {
  try {
    return encodeURIComponent(val);
  } catch (e) {
    console.error('error encode %o');
  }
  return null;
};

var decode = function decode(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    console.error('error decode %o');
  }
  return null;
};

var handleSkey = function handleSkey(sKey) {
  return encode(sKey).replace(/[\-\.\+\*]/g, '\\$&');
};

var Cookies = {
  getItem: function getItem(sKey) {
    if (!sKey) {
      return null;
    }
    return decode(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + handleSkey(sKey) + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },
  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          if (vEnd === Infinity) {
            sExpires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
          } else {
            sExpires = '; max-age=' + vEnd;
          }
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
        default:
          break;
      }
    }
    document.cookie = [encode(sKey), '=', encode(sValue), sExpires, sDomain ? '; domain=' + sDomain : '', sPath ? '; path=' + sPath : '', bSecure ? '; secure' : ''].join('');
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie = [encode(sKey), '=; expires=Thu, 01 Jan 1970 00:00:00 GMT', sDomain ? '; domain=' + sDomain : '', sPath ? '; path=' + sPath : ''].join('');
    return true;
  },
  hasItem: function hasItem(sKey) {
    if (!sKey) {
      return false;
    }
    return new RegExp('(?:^|;\\s*)' + encode(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
  },
  keys: function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    aKeys = aKeys.map(function (key) {
      return decode(key);
    });
    return aKeys;
  }
};

exports.default = Cookies;

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

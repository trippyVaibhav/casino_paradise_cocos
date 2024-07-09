
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwibG9naW4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVzZXJJZCIsInR5cGUiLCJMYWJlbCIsImNvaW5zTGFiZWwiLCJjbG91ZEFuaW1Ob2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic21hbGxJdGVtTm9kZSIsInJpZ2h0VGlsdE5vZGUiLCJsZWZ0VGlsdE5vZGUiLCJzcGluV2hlZWxOb2RlIiwiT3V0ZXJBbmltYXRpb24iLCJwYXNzd29yZE5vZGUiLCJwYXNzd29yZENoYW5nZUJ1dHRvbiIsInBvcHVwTm9kZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJjYXRlZ29yeSIsImxlZnR0aWx0QW5nbGUiLCJ0aWx0RHVyYXRpb24iLCJvcmlnaW5hbFJvdGF0aW9uIiwicmlnaHR0aWx0QW5nbGUiLCJ0YXJnZXRYIiwibW92ZUR1cmF0aW9uIiwic2NhbGVVcCIsInNjYWxlTm9ybWFsIiwib25Mb2FkIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsInJ1bkFjdGlvbiIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdhbWUiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImJpbmQiLCJsZWZ0QW5nbGUiLCJzY2FsZVRvIiwibGVmdFRpbHRBbmdsZSIsInNsZWZ0RG93bkFjdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic2NhbGVTZXF1ZW5jZSIsInNlcXVlbmNlIiwicmVwZWF0Rm9yZXZlciIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiYWN0aXZlIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJvcGVuUHJvZmxlUG9wdXAiLCJsb2dPdXRDbGljayIsIm5vZGUiLCJsb2d1dENsaWNrIiwicGFzc3dvcmRDaGFuZ2VCdG4iLCJzdHJpbmciLCJlcnJvckxhYmxlIiwibG9naW5FcnJvck5vZGUiLCJzZXRUaW1lb3V0IiwiY2hhbmdlUGFzc3dvcmQiLCJjbG9zZVBvcHVwQnRuIiwic2F2ZVByb2ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF2Qjs7QUFDQSxJQUFN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LElBQTNCO0FBQ0EsU0FBS3ZELFNBQUwsQ0FBZXVELE1BQWYsR0FBd0IsSUFBeEI7QUFFRCxHQXJWSTtBQXNWTG9DLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixRQUFHLEtBQUs3RixZQUFMLENBQWtCeUQsTUFBbEIsSUFBNEIsS0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFoRCxFQUF1RDtBQUNyRCxXQUFLekQsWUFBTCxDQUFrQnlELE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0EsV0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNEOztBQUNELFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0QsR0E1Vkk7QUE2VkxxQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDckIsU0FBS3hGLFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBRUQ7QUFqV0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbmNvbnN0IENvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWVzJyk7XG5jb25zdCBsb2dpbiA9IHJlcXVpcmUoJ0xvZ2luJylcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2xvdWRBbmltTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgfSxcbiAgICAgc3ByaXRlOiB7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG4gICAgc21hbGxJdGVtTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICByaWdodFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgbGVmdFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIE91dGVyQW5pbWF0aW9uOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmROb2RlOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmRDaGFuZ2VCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6Y2MuTm9kZVxuICAgIH0sXG4gICAgcG9wdXBOb2RlOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgfSxcbiAgICBvbGRQYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgfSxcbiAgICBuZXdQYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgfSxcbiAgICBjb25maXJtUGFzc3dvcmQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5MYWJlbFxuICAgIH0sXG4gICAgcHJvZmlsZU5vZGU6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIHNhdmVQcm9maWxlQnRuOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgfSxcbiAgICBhbGxUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgZmlzaFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmYXZUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2xvdFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBrZW5vVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG90aGVyVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxvZ2luTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGxvZ2luLFxuICAgIH0sXG4gICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICBsZWZ0dGlsdEFuZ2xlOiAtNywgIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgIHRpbHREdXJhdGlvbjogMC4yLCAgLy8gRHVyYXRpb24gb2YgdGhlIHRpbHQgYW5pbWF0aW9uXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgIHJpZ2h0dGlsdEFuZ2xlOiA3LFxuICAgICB0YXJnZXRYOiAwLCAgIFxuICAgICBtb3ZlRHVyYXRpb246IDIuMCwgXG4gICAgIHNjYWxlVXA6IDAuOSwgIC8vIFNjYWxlIGZhY3RvciB3aGVuIG1vdXNlIGVudGVyc1xuICAgIHNjYWxlTm9ybWFsOiAwLjksXG4gICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIlxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRQb3MgPSB0aGlzLmNsb3VkQW5pbU5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IG1vdmVBY3Rpb24gPSBjYy5tb3ZlVG8odGhpcy5tb3ZlRHVyYXRpb24sIGNjLnYyKHRoaXMudGFyZ2V0WCwgY3VycmVudFBvcy55KSk7XG5cbiAgICAgICAgLy8gUnVuIHRoZSBtb3ZlIGFjdGlvbiBvbiB0aGUgc3ByaXRlIG5vZGVcbiAgICAgICAgdGhpcy5jbG91ZEFuaW1Ob2RlLnJ1bkFjdGlvbihtb3ZlQWN0aW9uKTtcblxuICAgICAgICBcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2FtZSArXCI9XCIrIHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgIFxuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZXJlc3BvbnNlIGluIGxvYmJ5XCIsIHJlc3BvbnNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbGVmdEFuZ2xlID0gY2Muc2NhbGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgbGV0IHNsZWZ0RG93bkFjdGlvbiA9IGNjLnNjYWxlVG8odGhpcy5hbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvblxuICAgICAgICBsZXQgc2NhbGVTZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGxlZnRBbmdsZSwgc2xlZnREb3duQWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlcGVhdCB0aGUgc2VxdWVuY2UgZm9yZXZlclxuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzY2FsZVNlcXVlbmNlKSk7XG4gICAgICAgICAvLyBTZXQgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAgICAgIC8vICBsZXQgbGVmdFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gLy8gIGxldCByaWdodFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0ID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XG4gXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgbGVmdFRpbHROb2RlXG4gICAgICAgIC8vICBsZXQgdGlsdFNlcXVlbmNlID0gY2Muc2VxdWVuY2UobGVmdFRpbHQsIG9yaWdpbmFsVGlsdCk7XG4gXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gbGVmdFRpbHROb2RlXG4gICAgICAgIC8vICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcih0aWx0U2VxdWVuY2UpKTtcbiBcbiAgICAgICAgLy8gIC8vIENyZWF0ZSB0aGUgdGlsdCBhY3Rpb25zIGZvciByaWdodFRpbHROb2RlXG4gICAgICAgIC8vIC8vICBsZXQgbGVmdFRpbHRSaWdodE5vZGUgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gIGxldCByaWdodFRpbHRSaWdodE5vZGUgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XG4gXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgcmlnaHRUaWx0Tm9kZVxuICAgICAgICAvLyAgbGV0IHRpbHRTZXF1ZW5jZVJpZ2h0Tm9kZSA9IGNjLnNlcXVlbmNlKHJpZ2h0VGlsdFJpZ2h0Tm9kZSwgb3JpZ2luYWxUaWx0UmlnaHROb2RlKTtcbiBcbiAgICAgICAgLy8gIC8vIFJ1biB0aGUgc2VxdWVuY2UgYWN0aW9uIGluZGVmaW5pdGVseSBvbiByaWdodFRpbHROb2RlXG4gICAgICAgIC8vICB0aGlzLnJpZ2h0VGlsdE5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIodGlsdFNlcXVlbmNlUmlnaHROb2RlKSk7XG5cbiAgICAgICAgLy9SZWdpc3RlcnJlZCBNb3VzZSBFbnRlciBldmVudFxuICAgICAgICAvLyB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gLy8gUmVnaXN0ZXIgbW91c2UgbGVhdmUgZXZlbnRcbiAgICAgICAgLy8gdGhpcy5zbWFsbEl0ZW1Ob2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2VMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlTGVhdmUsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTFMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0yXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLm9uTW91c2UyRW50ZXIsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMkxlYXZlLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTNcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTNFbnRlciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0zXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2UzTGVhdmUsIHRoaXMpOyBcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTRFbnRlciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW00XCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2U0TGVhdmUsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlNUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTVMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW02XCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLm9uTW91c2U2RW50ZXIsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlNkxlYXZlLCB0aGlzKTtcbiAgICAgICAgXG4gICAgfSxcblxuLy8gICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcbi8vICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vICAgICB9LFxuLy8gICAgIG9uTW91c2UxRW50ZXI6IGZ1bmN0aW9uKCl7XG4vLyAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vICAgfSxcbi8vICAgb25Nb3VzZTJFbnRlcjogZnVuY3Rpb24oKXtcbi8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlM0VudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNEVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNFwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNUVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNkVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG5cbiAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlBbGw6IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXG4gICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XG4gICAgfSxcblxuICAgIGdldEdhbWVzQnlDYXRlZ29yeWZpc2g6IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSlcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICAgfSxcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2OiBmdW5jdGlvbigpe1xuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XG4gICAgIH0sXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeVNsb3Q6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xuICAgICB9LFxuICAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlLZW5vOiBmdW5jdGlvbihldmVudCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSlcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICAgfSxcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5T3RoZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICB9LFxuICAgICBcbiAgICBcbiAgICAvLyBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlMUxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlMkxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTJcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlM0xlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTNcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNExlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNUxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNkxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcblxuICAgICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgICAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKFxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsb3NlU3Bpbk5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5TcGluV2hlZWxOb2RlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICAgICAgdmFyIGNvbnRpbnVlUm90YXRlID0gY2MucmVwZWF0Rm9yZXZlcihyb3RhdGVBY3Rpb24pO1xuICAgICAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5Qcm9mbGVQb3B1cDogZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIGxvZ091dENsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coXCJjbGNrXCIpO1xuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmxvZ2luTm9kZS5sb2d1dENsaWNrKCk7XG4gICAgfSwgICBcblxuICAgIHBhc3N3b3JkQ2hhbmdlQnRuOiBmdW5jdGlvbigpe1xuICAgICAgaWYodGhpcy5vbGRQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyA9PSBcIlwiIHx8IHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZyA9PSBcIlwiKXtcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJBbGwgZmllbGRzIGFyZSBtYW5kYXRvcnlcIjtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpe1xuICAgICAgICAgIFNlcnZlckNvbS5lcnJvckxhYmxlLnN0cmluZyA9IFwiTmV3IFBhc3N3b3JkIGFuZCBjb25maXJtIHBhc3N3b3JkIGRpZCBub3QgbWF0Y2hcIjtcbiAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICBcbiAgICB9LFxuICAgIGNoYW5nZVBhc3N3b3JkOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICBcbiAgICB9LFxuICAgIGNsb3NlUG9wdXBCdG46IGZ1bmN0aW9uKCl7XG4gICAgICBpZih0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgfHwgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUpe1xuICAgICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICBcbiAgICB9XG59KTtcbiJdfQ==
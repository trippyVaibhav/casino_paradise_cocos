
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9iYnlcXExvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwibG9naW4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVzZXJJZCIsInR5cGUiLCJMYWJlbCIsImNvaW5zTGFiZWwiLCJjbG91ZEFuaW1Ob2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic21hbGxJdGVtTm9kZSIsInJpZ2h0VGlsdE5vZGUiLCJsZWZ0VGlsdE5vZGUiLCJzcGluV2hlZWxOb2RlIiwiT3V0ZXJBbmltYXRpb24iLCJwYXNzd29yZE5vZGUiLCJwYXNzd29yZENoYW5nZUJ1dHRvbiIsInBvcHVwTm9kZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJjYXRlZ29yeSIsImxlZnR0aWx0QW5nbGUiLCJ0aWx0RHVyYXRpb24iLCJvcmlnaW5hbFJvdGF0aW9uIiwicmlnaHR0aWx0QW5nbGUiLCJ0YXJnZXRYIiwibW92ZUR1cmF0aW9uIiwic2NhbGVVcCIsInNjYWxlTm9ybWFsIiwib25Mb2FkIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsInJ1bkFjdGlvbiIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdhbWUiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImJpbmQiLCJsZWZ0QW5nbGUiLCJzY2FsZVRvIiwibGVmdFRpbHRBbmdsZSIsInNsZWZ0RG93bkFjdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic2NhbGVTZXF1ZW5jZSIsInNlcXVlbmNlIiwicmVwZWF0Rm9yZXZlciIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiYWN0aXZlIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJvcGVuUHJvZmxlUG9wdXAiLCJsb2dPdXRDbGljayIsIm5vZGUiLCJsb2d1dENsaWNrIiwicGFzc3dvcmRDaGFuZ2VCdG4iLCJzdHJpbmciLCJlcnJvckxhYmxlIiwibG9naW5FcnJvck5vZGUiLCJzZXRUaW1lb3V0IiwiY2hhbmdlUGFzc3dvcmQiLCJjbG9zZVBvcHVwQnRuIiwic2F2ZVByb2ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF2Qjs7QUFDQSxJ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QTJCLElBQTNCO0FBQ0EsU0FBS3ZELFNBQUwsQ0FBZXVELE1BQWYsR0FBd0IsSUFBeEI7QUFFRCxHQXJWSTtBQXNWTG9DLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixRQUFHLEtBQUs3RixZQUFMLENBQWtCeUQsTUFBbEIsSUFBNEIsS0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFoRCxFQUF1RDtBQUNyRCxXQUFLekQsWUFBTCxDQUFrQnlELE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0EsV0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNEOztBQUNELFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0QsR0E1Vkk7QUE2VkxxQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDckIsU0FBS3hGLFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBRUQ7QUFqV0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmNvbnN0IENvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWVzJyk7XHJcbmNvbnN0IGxvZ2luID0gcmVxdWlyZSgnTG9naW4nKVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgIHVzZXJJZDp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOmNjLkxhYmVsLFxyXG4gICAgIH0sXHJcbiAgICAgY29pbnNMYWJlbDp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICB9LFxyXG4gICAgIGNsb3VkQW5pbU5vZGU6e1xyXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgIH0sXHJcbiAgICAgc3ByaXRlOiB7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgIH0sXHJcbiAgICBzbWFsbEl0ZW1Ob2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgcmlnaHRUaWx0Tm9kZTp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgbGVmdFRpbHROb2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBzcGluV2hlZWxOb2RlOntcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBPdXRlckFuaW1hdGlvbjp7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmROb2RlOntcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZENoYW5nZUJ1dHRvbjp7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgfSxcclxuICAgIHBvcHVwTm9kZTp7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBvbGRQYXNzd29yZDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgfSxcclxuICAgIG5ld1Bhc3N3b3JkOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICB9LFxyXG4gICAgY29uZmlybVBhc3N3b3JkOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICB9LFxyXG4gICAgcHJvZmlsZU5vZGU6e1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgc2F2ZVByb2ZpbGVCdG46e1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgYWxsVGFiOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgZmlzaFRhYjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIGZhdlRhYjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIHNsb3RUYWI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBrZW5vVGFiOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgb3RoZXJUYWI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBsb2dpbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogbG9naW4sXHJcbiAgICB9LFxyXG4gICAgIGNhdGVnb3J5OiBudWxsLFxyXG4gICAgIGxlZnR0aWx0QW5nbGU6IC03LCAgLy8gQW5nbGUgdG8gdGlsdCB0aGUgbm9kZSAoaW4gZGVncmVlcylcclxuICAgICB0aWx0RHVyYXRpb246IDAuMiwgIC8vIER1cmF0aW9uIG9mIHRoZSB0aWx0IGFuaW1hdGlvblxyXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXHJcbiAgICAgcmlnaHR0aWx0QW5nbGU6IDcsXHJcbiAgICAgdGFyZ2V0WDogMCwgICBcclxuICAgICBtb3ZlRHVyYXRpb246IDIuMCwgXHJcbiAgICAgc2NhbGVVcDogMC45LCAgLy8gU2NhbGUgZmFjdG9yIHdoZW4gbW91c2UgZW50ZXJzXHJcbiAgICBzY2FsZU5vcm1hbDogMC45LFxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBcImFsbFwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudFBvcyA9IHRoaXMuY2xvdWRBbmltTm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBtb3ZlQWN0aW9uID0gY2MubW92ZVRvKHRoaXMubW92ZUR1cmF0aW9uLCBjYy52Mih0aGlzLnRhcmdldFgsIGN1cnJlbnRQb3MueSkpO1xyXG5cclxuICAgICAgICAvLyBSdW4gdGhlIG1vdmUgYWN0aW9uIG9uIHRoZSBzcHJpdGUgbm9kZVxyXG4gICAgICAgIHRoaXMuY2xvdWRBbmltTm9kZS5ydW5BY3Rpb24obW92ZUFjdGlvbik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmdhbWUgK1wiPVwiKyB0aGlzLmNhdGVnb3J5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIkdFVFwiLCBhZGRyZXNzLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlcmVzcG9uc2VyZXNwb25zZSBpbiBsb2JieVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgbGV0IGxlZnRBbmdsZSA9IGNjLnNjYWxlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdFRpbHRBbmdsZSk7XHJcbiAgICAgICAgbGV0IHNsZWZ0RG93bkFjdGlvbiA9IGNjLnNjYWxlVG8odGhpcy5hbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zY2FsZU5vcm1hbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBzZXF1ZW5jZSBhY3Rpb25cclxuICAgICAgICBsZXQgc2NhbGVTZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGxlZnRBbmdsZSwgc2xlZnREb3duQWN0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBSZXBlYXQgdGhlIHNlcXVlbmNlIGZvcmV2ZXJcclxuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzY2FsZVNlcXVlbmNlKSk7XHJcbiAgICAgICAgIC8vIFNldCBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcclxuICAgICAgICAvLyAgbGV0IGxlZnRUaWx0ID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdFRpbHRBbmdsZSk7XHJcbiAgICAgICAgLy8gLy8gIGxldCByaWdodFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XHJcbiAgICAgICAgLy8gIGxldCBvcmlnaW5hbFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgbGVmdFRpbHROb2RlXHJcbiAgICAgICAgLy8gIGxldCB0aWx0U2VxdWVuY2UgPSBjYy5zZXF1ZW5jZShsZWZ0VGlsdCwgb3JpZ2luYWxUaWx0KTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gbGVmdFRpbHROb2RlXHJcbiAgICAgICAgLy8gIHRoaXMubGVmdFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKHRpbHRTZXF1ZW5jZSkpO1xyXG4gXHJcbiAgICAgICAgLy8gIC8vIENyZWF0ZSB0aGUgdGlsdCBhY3Rpb25zIGZvciByaWdodFRpbHROb2RlXHJcbiAgICAgICAgLy8gLy8gIGxldCBsZWZ0VGlsdFJpZ2h0Tm9kZSA9IGNjLnJvdGF0ZVRvKHRoaXMudGlsdER1cmF0aW9uLCB0aGlzLmxlZnRUaWx0QW5nbGUpO1xyXG4gICAgICAgIC8vICBsZXQgcmlnaHRUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMucmlnaHRUaWx0QW5nbGUpO1xyXG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XHJcbiBcclxuICAgICAgICAvLyAgLy8gQ3JlYXRlIHRoZSBzZXF1ZW5jZSBhY3Rpb24gZm9yIHJpZ2h0VGlsdE5vZGVcclxuICAgICAgICAvLyAgbGV0IHRpbHRTZXF1ZW5jZVJpZ2h0Tm9kZSA9IGNjLnNlcXVlbmNlKHJpZ2h0VGlsdFJpZ2h0Tm9kZSwgb3JpZ2luYWxUaWx0UmlnaHROb2RlKTtcclxuIFxyXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gcmlnaHRUaWx0Tm9kZVxyXG4gICAgICAgIC8vICB0aGlzLnJpZ2h0VGlsdE5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIodGlsdFNlcXVlbmNlUmlnaHROb2RlKSk7XHJcblxyXG4gICAgICAgIC8vUmVnaXN0ZXJyZWQgTW91c2UgRW50ZXIgZXZlbnRcclxuICAgICAgICAvLyB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyAvLyBSZWdpc3RlciBtb3VzZSBsZWF2ZSBldmVudFxyXG4gICAgICAgIC8vIHRoaXMuc21hbGxJdGVtTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlTGVhdmUsIHRoaXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMUVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMUxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMkVudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMkxlYXZlLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlM0VudGVyLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlM0xlYXZlLCB0aGlzKTsgXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTRFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTRMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTVFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTVMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTZFbnRlciwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTZMZWF2ZSwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuLy8gICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcclxuLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyAgICAgfSxcclxuLy8gICAgIG9uTW91c2UxRW50ZXI6IGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0xXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyAgIH0sXHJcbi8vICAgb25Nb3VzZTJFbnRlcjogZnVuY3Rpb24oKXtcclxuLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0yXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlM0VudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0zXCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNEVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW00XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNUVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW01XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG4vLyBvbk1vdXNlNkVudGVyOiBmdW5jdGlvbigpe1xyXG4vLyAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW02XCIpLnNldFNjYWxlKDEuMDgpO1xyXG4vLyB9LFxyXG5cclxuICAgIGdldEdhbWVzQnlDYXRlZ29yeUFsbDogZnVuY3Rpb24oKXtcclxuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlmaXNoOiBmdW5jdGlvbigpe1xyXG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcclxuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxyXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcclxuICAgICB9LFxyXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeWZhdjogZnVuY3Rpb24oKXtcclxuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XHJcbiAgICAgfSxcclxuICAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlTbG90OiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xyXG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXHJcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xyXG4gICAgIH0sXHJcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5S2VubzogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcclxuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxyXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcclxuICAgICB9LFxyXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeU90aGVyOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XHJcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSk7XHJcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgICB9LFxyXG4gICAgIFxyXG4gICAgXHJcbiAgICAvLyBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlMUxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlMkxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlM0xlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNExlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNFwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNUxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBvbk1vdXNlNkxlYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5zZXRTY2FsZSh0aGlzLnNjYWxlTm9ybWFsKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgIC8vIGZvciBmdWxsIFNjcmVlblxyXG4gICAgIHpvb21GdWxsU2NyZWVuQ2xpY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAvLyBjdXJyZW50IHdvcmtpbmcgbWV0aG9kc1xyXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbihcclxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVNwaW5Ob2RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuU3BpbldoZWVsTm9kZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcclxuICAgICAgICB2YXIgY29udGludWVSb3RhdGUgPSBjYy5yZXBlYXRGb3JldmVyKHJvdGF0ZUFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5PdXRlckFuaW1hdGlvbi5ydW5BY3Rpb24oY29udGludWVSb3RhdGUpO1xyXG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuUHJvZmxlUG9wdXA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9nT3V0Q2xpY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xja1wiKTtcclxuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgIHRoaXMubG9naW5Ob2RlLmxvZ3V0Q2xpY2soKTtcclxuICAgIH0sICAgXHJcblxyXG4gICAgcGFzc3dvcmRDaGFuZ2VCdG46IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmKHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHwgdGhpcy5uZXdQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fCB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcgPT0gXCJcIil7XHJcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJBbGwgZmllbGRzIGFyZSBtYW5kYXRvcnlcIjtcclxuICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGlmKCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpe1xyXG4gICAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJOZXcgUGFzc3dvcmQgYW5kIGNvbmZpcm0gcGFzc3dvcmQgZGlkIG5vdCBtYXRjaFwiO1xyXG4gICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgIFxyXG4gICAgfSxcclxuICAgIGNoYW5nZVBhc3N3b3JkOiBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBjbG9zZVBvcHVwQnRuOiBmdW5jdGlvbigpe1xyXG4gICAgICBpZih0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgfHwgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUpe1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgIH1cclxufSk7XHJcbiJdfQ==
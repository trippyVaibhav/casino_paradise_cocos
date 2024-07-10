"use strict";
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
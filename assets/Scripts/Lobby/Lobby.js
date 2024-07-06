// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
     userId:{
        default: null,
        type:cc.Label,
     },
     coinsLabel:{
        default: null,
        type: cc.Label,
     },
     category: null,
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!this.category){
            this.category = "all"
        }
        var address = K.ServerAddress.ipAddress + K.ServerAPI.game +"="+ this.category;
        
        ServerCom.httpRequest("GET", address, function (response) {
           console.log("responseresponseresponse in lobby", response);
        }.bind(this));
    },
});

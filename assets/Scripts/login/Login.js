
cc.Class({
    extends: cc.Component,

    properties: {

        userName: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        rememberMe: {
            default: null,
            type: cc.Toggle
        },
        lobbyNode:{
            default: null,
            type: cc.Node,
        }
    
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        if(this.rememberMe){
            this.rememberMe.isChecked = false;
        }
    },

    onLoginClick (){
        var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
        var data = {
            username: this.userName.string,
            password: this.password.string
        };
        ServerCom.httpRequest("POST", address, data, function (response) {
            if (response.token) {
                cc.sys.localStorage.setItem("token", response.token);
                const randomNumber = Math.floor(Math.random() * 10) + 1;
                cc.sys.localStorage.setItem("index", randomNumber);   
                setTimeout(function () {
                    this.lobbyNode.active = true;
                }.bind(this), 1000);
            }
            
        }.bind(this));

    },
});
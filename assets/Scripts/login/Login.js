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
        }
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.rememberMe){
            this.rememberMe.isChecked = false;
        }
    },

    onLoginClick (){
        console.log("passowrd", this.password.string);
        console.log("username", this.userName.string);
        console.log('Toggle value is:', this.rememberMe.isChecked);

    },
});

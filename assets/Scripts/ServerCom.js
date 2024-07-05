cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.checkOrientation();
        // Add event listener for canvas resize to handle orientation change
        cc.view.on('canvas-resize', this.checkOrientation, this);
    },
    
    checkOrientation() {
        try {
            let winSize = cc.winSize;
            // Check if the width is greater than the height to determine orientation
            if (winSize.width > winSize.height) {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            } else {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
        } catch (error) {
            console.error("Error checking orientation:", error);
        }
    },
    

    postRequest(data, callBack){
                
    },

});

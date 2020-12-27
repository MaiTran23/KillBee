

cc.Class({
    extends: cc.Component,

    properties:{
        animator: cc.Animation
    },

    Explode: function () {
        var self = this;

        self.node.active = true;
        self.animator.play();
    },

    disable: function () {
        var self = this;

        self.node.active = false;
    }

});

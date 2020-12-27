var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        labelPoint: cc.Label,

    },

    onLoad: function () {
        var self = this;

        self.unregisterEvent();
        self.registerEvent();
    },

    start: function () {
        var self = this;

    },

    registerEvent: function () {
        var self = this;

        window.addEventListener(EventNameConfig.UpdatePoint, self.handleUpdatePoint.bind(self), false);

    },

    onDestroy: function () {
        var self = this;

        self.unregisterEvent();
    },

    unregisterEvent: function () {
        var self = this;

        window.removeEventListener(EventNameConfig.UpdatePoint, self.handleUpdatePoint.bind(self));

    },

    handleUpdatePoint: function (data) {
        var self = this;

        self.labelPoint.string = "Score: " + data.detail.point;
    },

   

});

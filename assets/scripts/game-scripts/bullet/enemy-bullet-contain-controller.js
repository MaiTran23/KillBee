var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: require('player-bullet-contain-controller'),

    properties: {
        player: cc.Node,
    },

    ctor: function () {
        var self = this;

        self.bulletCounting = 0;
    },

    start: function () {
        var self = this;

        self.registerEvent();
        self._super();
    },

    registerEvent: function () {
        var self = this;

        window.addEventListener(EventNameConfig.EnemyShooting, self.handleEnemyShooting.bind(self), false);
    },

    onDestroy: function () {
        var self = this;

        self.unregisterEvent();
    },

    unregisterEvent: function () {
        var self = this;

        window.removeEventListener(EventNameConfig.EnemyShooting, self.handleEnemyShooting.bind(self), false);
    },

    handleEnemyShooting: function (data) {
        var self = this;

        if (self.bulletCounting >= self.arrBulletPool.length) {
            self.bulletCounting = 0;
        }
        var localPosition = self.node.convertToNodeSpaceAR(data.detail.position);
        self.arrBulletPool[self.bulletCounting].node.position = localPosition;
        self.arrBulletPool[self.bulletCounting].node.active = true;
        self.arrBulletPool[self.bulletCounting].Shooting(self.player.position);
        self.bulletCounting++;
    },

});

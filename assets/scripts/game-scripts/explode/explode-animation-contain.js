var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        arrExplodeAnimation: {
            default: [],
            type: require('explode-animation'),
            visible: false,

        },
        explodePrefab: cc.Prefab,
    },

    ctor: function () {
        var self = this;

        self.explodeCounting = 0;
        self.registerEvent();
    },

    start() {
        var self = this;

        self.spawnExplode(30);
    },

    registerEvent: function () {
        var self = this;

        window.addEventListener(EventNameConfig.EnemyGotShotDown, self.explodeAtPos.bind(self), false);
        window.addEventListener(EventNameConfig.PlayerGotShot, self.explodeAtPos.bind(self), false);
    },

    onDestroy: function () {
        var self = this;

        self.unregisterEvent();
    },

    unregisterEvent: function () {
        var self = this;

        window.removeEventListener(EventNameConfig.EnemyGotShotDown, self.explodeAtPos.bind(self), false);
        window.removeEventListener(EventNameConfig.PlayerGotShot, self.explodeAtPos.bind(self), false);
    },

    spawnExplode: function (value) {
        var self = this;

        for (var countBullet = 0; countBullet < value; countBullet++) {
            var newExplode = cc.instantiate(self.explodePrefab);
            newExplode.parent = self.node;
            newExplode.active = false;
            var newExplodeController = newExplode.getComponent('explode-animation')
            self.arrExplodeAnimation.push(newExplodeController);
        }
    },

    explodeAtPos: function(data){
        var self = this;

        if (self.explodeCounting >= self.arrExplodeAnimation.length) {
            self.explodeCounting = 0;
        }
        var localPosition = self.node.convertToNodeSpace(data.detail.position);
        self.arrExplodeAnimation[self.explodeCounting].node.position = localPosition;
        self.arrExplodeAnimation[self.explodeCounting].Explode();
        self.explodeCounting++;
    }

});



cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        arrBulletPool: {
            default: [],
            type: require('player-bullet-controller'),
            visible: false,
        }
    },

    ctor: function () {
        var self = this;

        self.shootingBullet = 0;
    },

    start: function () {
        var self = this;

        self.spawnBullet(40);
    },

    spawnBullet: function (value) {
        var self = this;

        for (var countBullet = 0; countBullet < value; countBullet++) {
            var newBullet = cc.instantiate(self.bulletPrefab);
            newBullet.parent = self.node;
            newBullet.active = false;
            var newBulletController = newBullet.getComponent('player-bullet-controller')
            self.arrBulletPool.push(newBulletController);
        }
    },

    Shot: function (position) {
        var self = this;

        if (self.shootingBullet >= self.arrBulletPool.length) {
            self.shootingBullet = 0;
        }
        var localPosition = self.node.convertToNodeSpace(position);
        self.arrBulletPool[self.shootingBullet].node.position = localPosition;
        self.arrBulletPool[self.shootingBullet].Shot();
        self.shootingBullet++;
    }

});

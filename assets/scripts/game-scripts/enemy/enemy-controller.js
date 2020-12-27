var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        point: 100,

    },

    ctor: function () {
        var self = this;

        self.collider = null;
        self.isBeingShot = false;
    },

    settingEventEnemyGetShot: function () {
        var self = this;

        var position = self.node.parent.convertToWorldSpaceAR(self.node.position);
        self.EnemyGotShotDown = new CustomEvent(EventNameConfig.EnemyGotShotDown, {
            detail: {
                point: self.point,
                position: position,
                enemyID: self.enemyID,
            }
        });
    },

    settingEventEnemyShooting: function () {
        var self = this;

        var position = self.node.parent.convertToWorldSpaceAR(self.node.position);
        self.EnemyShooting = new CustomEvent(EventNameConfig.EnemyShooting, {
            detail: {
                position: position,
                enemyID: self.enemyID,
            }
        });
    },

    start: function () {
        var self = this;

        self.collider = self.node.getComponent(cc.BoxCollider);
    },

    onCollisionEnter: function (other, self) {
        var self = this;

        if (other.name.includes("bullet-player") || other.name.includes("player")) {
            self.onBeingShot();
        }
    },

    onBeingShot: function () {
        var self = this;

        if (!self.isBeingShot) {
            self.settingEventEnemyGetShot();
            window.dispatchEvent(self.EnemyGotShotDown);
            self.collider.enabled = false;
            self.isBeingShot = true;
            self.disable();
        }
    },

    disable: function () {
        var self = this;

        self.node.active = false;
    },

    enable: function () {
        var self = this;

        self.isBeingShot = false;
        self.collider.enabled = true;
        self.node.active = true;
    },

    Shooting: function () {
        var self = this;

        self.settingEventEnemyShooting();
        window.dispatchEvent(self.EnemyShooting);
    },

});

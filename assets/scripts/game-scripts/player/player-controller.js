var MovementConfigInputDown = require('player-movement-config').MovementConfigInputDown;
var MovementConfigInputUp = require('player-movement-config').MovementConfigInputUp;
var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,

    },

    ctor: function () {
        var self = this;

        self.isMovingLeft = false;
        self.isMovingRight = false;
        self.isMovingUp = false;
        self.isMovingDown = false;
        self.GotShot = null;

    },

    start: function () {
        var self = this;

        self.animator = self.node.getComponent(cc.Animation);
        self.collider = self.node.getComponent(cc.BoxCollider);
    },

  

    onDestroy: function () {
        var self = this;


        cc.director.loadScene("main")
    },

    settingEventGotShot: function () {
        var self = this;

        var positionWorldSpace = self.node.parent.convertToWorldSpaceAR(self.node.position);
        self.GotShot = new CustomEvent(EventNameConfig.PlayerGotShot, {
            detail: {
                position: positionWorldSpace,
            }
        });
    },

    onCollisionEnter: function (other, self) {
        var self = this;

        if (other.name.includes("enemy-neutron")) {
            self.gotShot();
        }
    },

    gotShot: function () {
        var self = this;

        self.settingEventGotShot();
        window.dispatchEvent(self.GotShot);

        cc.director.loadScene("main")
    },



    setNormal: function () {
        var self = this;

        self.collider.enabled = true;
    },

    update: function (deltaTime) {
        var self = this;

        if (self.isMovingRight) {
            self.node.x += self.speed * deltaTime;
        }
        if (self.isMovingLeft) {
            self.node.x -= self.speed * deltaTime;
        }
        if (self.isMovingUp) {
            self.node.y += self.speed * deltaTime;
        }
        if (self.isMovingDown) {
            self.node.y -= self.speed * deltaTime;
        }
    },


});

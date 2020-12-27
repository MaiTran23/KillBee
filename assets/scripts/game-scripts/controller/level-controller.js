var PlayerActionConfig = require('player-action-config');
var MovementConfigInputDown = require('player-movement-config').MovementConfigInputDown;
var MovementConfigInputUp = require('player-movement-config').MovementConfigInputUp;
var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        playerBullerContainController: require('player-bullet-contain-controller'),
        playerController: require('player-controller'),

    },


    ctor: function () {
        var self = this;

        self.registerKey();
        self.registerEvent();
        self.point = 0;
        cc.director.getCollisionManager().enabled = true;
    },

    start: function () {
        var self = this;

        self.startLevel();
    },

    registerKey: function () {
        var self = this;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, self.onKeyDown, self);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    },

    unregisterKey: function () {
        var self = this;

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, self.onKeyDown, self);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    },

    onKeyDown: function (event) {
        var self = this;

        MovementConfigInputDown.forEach(keyConfig => {
            if (event.keyCode == keyConfig.inputValue) {
                self.playerController[keyConfig.trueValue] = true;
                self.playerController[keyConfig.falseValue] = false;
            }
        });

        PlayerActionConfig.PlayerActionInputDown.forEach(keyConfig => {
            if (event.keyCode == keyConfig.inputValue) {
                var func = self[keyConfig.functionnName];
                if (typeof func == "function") {
                    func.bind(self)();
                }
            }
        });
    },

    onKeyUp: function (event) {
        var self = this;

        MovementConfigInputUp.forEach(keyConfig => {
            if (event.keyCode == keyConfig.inputValue) {
                self.playerController[keyConfig.falseValue] = false;
            }
        });
    },

    registerEvent: function () {
        var self = this;

        window.addEventListener(EventNameConfig.EnemyGotShotDown, self.handleEnemyGotShotDown.bind(self), false);
        window.addEventListener(EventNameConfig.PlayerGotShot, self.handlePlayerGotShot.bind(self), false);
        window.addEventListener(EventNameConfig.AllEnemyDead, self.handleAllEnemyDead.bind(self), false);

    },

    onDestroy: function () {
        var self = this;

        self.unregisterEvent();
        self.unregisterKey();
    },

    unregisterEvent: function () {
        var self = this;

        window.removeEventListener(EventNameConfig.EnemyGotShotDown, self.handleEnemyGotShotDown.bind(self), false);
        window.removeEventListener(EventNameConfig.PlayerGotShot, self.handlePlayerGotShot.bind(self), false);
        window.removeEventListener(EventNameConfig.AllEnemyDead, self.handleAllEnemyDead.bind(self), false);
 
    },
    

    settingEventUpdatePoint: function () {
        var self = this;

        self.UpdatePoint = new CustomEvent(EventNameConfig.UpdatePoint, {
            detail: {
                point: self.point
            }
        });
    },


    handleEnemyGotShotDown: function (data) {
        var self = this;

        self.point += data.detail.point;
        self.settingEventUpdatePoint();
        window.dispatchEvent(self.UpdatePoint);
    },

    handlePlayerGotShot: function () {


        cc.director.loadScene("main")
    },



    

    handleAllEnemyDead: function () {
        var self = this;

        cc.director.loadScene("main")
    },

 

    shootBullet: function () {
        var self = this;

        var position = self.node.parent.convertToWorldSpaceAR(self.playerController.node.position);
        self.playerBullerContainController.Shot(position);
    },



});

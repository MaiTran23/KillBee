var EventNameConfig = require('event-config').EventNameConfig

cc.Class({
    extends: cc.Component,

    properties: {
        arrEnemyController: {
            type: require('enemy-controller'),
            default: [],
        },
        invervalPerShot: 2,
    },

    reset: function () {
        var self = this;

        self.arrEnemyTemp = self.cloneArray();;
    },

    enemyShootingStart: function () {
        var self = this;

        self.shoot = function () {
            self.enemyShooting();
        }
        self.schedule(self.shoot, self.invervalPerShot);

    },

    start: function () {
        var self = this;

        self.reset();
        self.registerEvent();
        self.enemyShootingStart();
    },

    registerEvent: function () {
        var self = this;

        window.addEventListener(EventNameConfig.EnemyGotShotDown, self.handleEnemyGotShotDown.bind(self), false);

    },

    onDestroy: function () {
        var self = this;

        self.unregisterEvent();
    },

    unregisterEvent: function () {
        var self = this;

        window.removeEventListener(EventNameConfig.EnemyGotShotDown, self.handleEnemyGotShotDown.bind(self), false);
        
    },

    handleEnemyGotShotDown: function (data) {
        var self = this;

        var tempArray = self.cloneArray();

        tempArray.splice(data.detail.enemyID, 1);

        var newArray = self.arrEnemyTemp.filter(element => tempArray.includes(element));
        self.arrEnemyTemp = newArray;
        if (self.arrEnemyTemp.length <= 0) {
            self.setWinLevel();
        };
    },

    cloneArray: function () {
        var self = this;

        var arrCopy = [];
        for (var index = 0; index < self.arrEnemyController.length; index++) {
            arrCopy[index] = self.arrEnemyController[index];
        }
        return arrCopy;
    },

 
    enemyShooting: function () {
        var self = this;

        var index = Math.floor(Math.random() * Math.floor(self.arrEnemyTemp.length));
        self.arrEnemyTemp[index].Shooting();
    }

});

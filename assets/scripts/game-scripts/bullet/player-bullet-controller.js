

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
    },

    ctor: function () {
        var self = this;

        self.isShot = false;
    },

    Shot: function () {
        var self = this;

        self.isShot = true;
        self.node.active = true;
    },

    update: function (deltaTime) {
        var self = this;

        if (self.isShot) {
            self.node.y += self.speed * deltaTime;
        };
    },

    onCollisionEnter: function (other, self) {
        var self = this;

        if (other.name.includes("enemy") && !other.name.includes("neutron") ) {
            self.reset();
        }
    },

    reset: function () {
        var self = this;

        self.node.active = false;
        self.isShot = false;
    }
});

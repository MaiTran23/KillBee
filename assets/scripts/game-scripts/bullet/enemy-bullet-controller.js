

cc.Class({
    extends: require('player-bullet-controller'),

    properties: {
    },

    Shooting: function (position) {
        var self = this;

        self.rotate(position);
    },

    rotate: function (position) {
        var self = this;

        var diff = {
            'x': position.x - self.node.position.x,
            'y': position.y - self.node.position.y
        };
        var angle = Math.atan2(diff.x, diff.y);
        self.node.angle = cc.misc.radiansToDegrees(angle);

    },

    onCollisionEnter: function (other, self) {
        var self = this;

        if (other.name.includes("player") && !other.name.includes("bullet") ) {
            self.reset();
        }
    },

    update: function (deltaTime) {
        var self = this;

        var vX = Math.sin(self.node.angle * Math.PI / 180) * self.speed;
        var vY = Math.cos(self.node.angle * Math.PI / 180) * self.speed;
        self.node.x += vX * deltaTime;
        self.node.y += vY * deltaTime;
    },
});

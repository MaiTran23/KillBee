var MovementConfigInputDown = [
    {
        inputValue: 65,
        trueValue: "isMovingLeft",
        falseValue: "isMovingRight"
    },
    {
        inputValue: 68,
        trueValue: "isMovingRight",
        falseValue: "isMovingLeft"
    },
    {
        inputValue: 87,
        trueValue: "isMovingUp",
        falseValue: "isMovingDown"
    },
    {
        inputValue: 83,
        trueValue: "isMovingDown",
        falseValue: "isMovingUp"
    },
];

var MovementConfigInputUp = [
    {
        inputValue: 65,
        falseValue: "isMovingLeft"
    },
    {
        inputValue: 68,
        falseValue: "isMovingRight"
    },
    {
        inputValue: 87,
        falseValue: "isMovingUp"
    },
    {
        inputValue: 83,
        falseValue: "isMovingDown"
    },
]

module.exports = {
    MovementConfigInputDown: MovementConfigInputDown,
    MovementConfigInputUp: MovementConfigInputUp,
}
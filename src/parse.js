const esprima = require('esprima');
const estraverse = require('estraverse');
const dictionary = require('./dictionary');

module.exports = function (code) {
    const ast = esprima.parse(code, {range: true});
    const matched = [];

    estraverse.traverse(ast, {
        enter: function (node, parent) {
            const index = dictionary.findIndex((element) => element.astNodeType === node.type);
            if (index !== -1) {
                matched.push(node);
            }
            console.log(`entering ${node.type}`);
        }
    });

    return {nodes: matched, dictionary};
};

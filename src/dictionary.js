module.exports = [
    {
        astNodeType: 'Literal',
        type: 'literal',
        description: 'Literals represent values in JavaScript. These are fixed values—not variables—that you literally provide in your script.',
        docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Literals'
    },
    {
        astNodeType: 'VariableDeclaration',
        type: 'variable-declaration,',
        description: 'JavaScript has three kinds of variable declarations',
        docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations'
    },
    {
        astNodeType: 'IfStatement',
        type: 'If Statement',
        description: 'The if statement executes a statement if a specified condition is truthy. If the condition is falsy, another statement can be executed.',
        docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else'
    }
];

/*
Program
FunctionDeclaration
Identifier
BlockStatement
VariableDeclaration
VariableDeclarator
Identifier
Literal
IfStatement
Identifier
BlockStatement
ExpressionStatement
CallExpression
MemberExpression
Identifier
Identifier
Literal
*/

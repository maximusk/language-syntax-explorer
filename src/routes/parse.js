const parseCode = require('../parse');

module.exports = function (req, res) {
    const code = req.body.code;
    const list = parseCode(code);

    res.json(list);
};

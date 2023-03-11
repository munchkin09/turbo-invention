const {getNegativeDataFrom, normalizeNegativeData} = require('../domain/parser');

module.exports = function () {
    return {
        getNegativeDataFrom,
        normalizeNegativeData,
    };
};

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    generateUserToken(id) {
        return jwt.sign({ id }, authConfig.secretUser, {
            expiresIn: 86400,
        });
    },

    generateCuidToken(id) {
        return jwt.sign({ id }, authConfig.secretCuid, {
            expiresIn: 86400,
        });
    }
};

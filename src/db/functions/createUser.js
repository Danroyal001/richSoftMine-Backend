"use strict";

const { default: hashPassword } = require("../../util/hashPassword");
const { default: users } = require("../collections/User");

const createUser = async (properties) => {
    let userExists = await (await users()).findOne({ email: properties.email });

    const response = {};

    if (userExists) {
        response.alreadyExists = true;
        response.user = void 0;
        console.log('user already exists: ', response);
        throw new Error('User already exists');
    }

    if (properties.password) {
        properties.password = await (0, hashPassword.default)(properties.password);
    }
    const insertedUser = await (await (0, User.default)()).insertOne(properties);
    const user = await (await (0, User.default)()).findOne({ _id: insertedUser.insertedId });
    response.alreadyExists = false;
    response.user = user;
    return response;
};
exports.default = createUser;

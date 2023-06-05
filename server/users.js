let users = [];
const { trimStr } = require("./utils");

const findeUser = (user) => {
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);
    return users.find((u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom);
};


const addUsers = (user) => {

    const isExist = findeUser(user)

    !isExist && users.push(user);
    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};

module.exports = { addUsers, findeUser };
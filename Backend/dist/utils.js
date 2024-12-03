"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let randomString = "afvonqrgon23[50`238hrf-9auhnfv1243pf9un";
    let length = randomString.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += randomString[Math.floor(Math.random() * length)];
    }
    return ans;
}

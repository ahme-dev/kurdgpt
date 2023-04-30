"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = void 0;
function getToday() {
    var d = new Date();
    var dateString = "".concat(d.getDate(), "/").concat(d.getMonth() + 1, "/").concat(d.getFullYear());
    return dateString;
}
exports.getToday = getToday;

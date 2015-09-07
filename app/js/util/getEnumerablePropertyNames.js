'use strict';
export default (target) => {
    var result = [];
    for (var key in target) {
        result.push(key);
    }
    return result;
}

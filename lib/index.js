"use strict";
function customLog(stack, options) {
    var projectRoot = options.projectRoot;
    var projectNodeModules = projectRoot + "/node_modules";
    return stack.split("\n")
        .filter(function (x, index) {
        if (index === 0)
            return true;
        if (x.indexOf(projectNodeModules) !== -1)
            return false;
        return true;
    })
        .join("\n");
}
exports.customLog = customLog;
function karmaResult(oldFunction, karma, options) {
    return function () {
        var log = arguments[0].log[0];
        arguments[0].log[0] = customLog(log, options);
        return oldFunction.apply(karma, arguments);
    };
}
exports.karmaResult = karmaResult;
//# sourceMappingURL=index.js.map
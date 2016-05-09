export function customLog(stack: string, options: {[key: string]: any}): string {
    var {projectRoot} = options;
    var projectNodeModules = `${projectRoot}/node_modules`;
    return stack.split("\n")
        .filter((x, index) => {
            if (index === 0) return true;
            if (x.indexOf(projectNodeModules) !== -1) return false;
            return true;
        })
        .join("\n");
}

export function karmaResult(oldFunction: Function, karma: any, options: any) : Function {
    return function(result) {
        var log: string = result.log[0];
        if (typeof log === "string") {
            arguments[0].log[0] = customLog(log, options);
        }
        return oldFunction.apply(karma, arguments);
    }
}
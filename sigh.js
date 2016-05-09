var merge, glob, concat, write, env, pipeline;
var ts;
var ava;

module.exports = function(pipelines) {

    pipelines["build"] = [
        glob({basePath: "src"}, "**/*.ts"),
        ts(),
        write("lib")
    ];

    // TODO: Fix.
    // pipelines["ava"] = [
    //     glob("tests/*.js"),
    //     ava([], {batch: true})
    // ];
};
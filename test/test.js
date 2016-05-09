import test from "ava";
import {customLog, karmaResult} from "..";

test("customLog defined", t => {
    t.is(typeof customLog, "function");
});

test("karmaResult defined", t => {
    t.is(typeof karmaResult, "function");
});

test("main", t => {
    var stack = `        Expected false to be true.
        /project/build/js/components/app/app.spec.js:13:49 <- src/app/components/app/app.spec.ts:6:27
        /project/karma.main.js:57:20
        invoke@/project/node_modules/zone.js/dist/zone.js:323:34
        run@/project/node_modules/zone.js/dist/zone.js:216:50
        /project/node_modules/zone.js/dist/zone.js:571:61
        invokeTask@/project/node_modules/zone.js/dist/zone.js:356:43
        runTask@/project/node_modules/zone.js/dist/zone.js:256:58
        drainMicroTaskQueue@/project/node_modules/zone.js/dist/zone.js:474:43
        invoke@/project/node_modules/zone.js/dist/zone.js:426:41
        /project/node_modules/zone.js/dist/zone.js:93:33
        invokeTask@/project/node_modules/zone.js/dist/zone.js:356:43
        runTask@/project/node_modules/zone.js/dist/zone.js:256:58
        invoke@/project/node_modules/zone.js/dist/zone.js:423:41`;
    var result = customLog(stack, {projectRoot: "/project"});
    t.true(result.indexOf("node_modules") === -1);
    t.true(result.indexOf("app/app.spec.js") !== -1);
    t.true(result.indexOf("app.spec.ts") !== -1);
    t.true(result.indexOf("Expected false to be true") !== -1);
});
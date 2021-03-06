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
    var result = customLog(stack, { projectRoot: "/project" });
    t.true(result.indexOf("node_modules") === -1);
    t.true(result.indexOf("app/app.spec.js") !== -1);
    t.true(result.indexOf("app.spec.ts") !== -1);
    t.true(result.indexOf("Expected false to be true") !== -1);
});

test("exclude", t => {
    var stack = `       Expected 'Hello World!' to equal 'xxxHello World!'.
        @build/js/pipes/pipes/truncate.pipe.spec.ts:20:8 <- build/js/pipes/truncate.pipe.spec.js:15:9
        ZoneDelegate.prototype.invoke@node_modules/zone.js/dist/zone-node.js:290:20
        ProxyZoneSpec.prototype.onInvoke@node_modules/zone.js/dist/proxy.js:106:25
        ZoneDelegate.prototype.invoke@node_modules/zone.js/dist/zone-node.js:289:20
        Zone.prototype.run@node_modules/zone.js/dist/zone-node.js:183:25
        wrapTestInZone/<@node_modules/zone.js/dist/jasmine-patch.js:123:37
        ZoneQueueRunner.prototype.execute@node_modules/zone.js/dist/jasmine-patch.js:151:18
        ZoneDelegate.prototype.invokeTask@node_modules/zone.js/dist/zone-node.js:323:24
        Zone.prototype.runTask@node_modules/zone.js/dist/zone-node.js:223:29
        drainMicroTaskQueue@node_modules/zone.js/dist/zone-node.js:455:26
        ZoneTask/this.invoke@node_modules/zone.js/dist/zone-node.js:395:26`;
    var result = customLog(stack, { exclude: /@node_modules/ });
    t.true(result.indexOf("node_modules") === -1);
});

test("exclude negative test", t => {
    var stack = `       Expected 'Hello World!' to equal 'xxxHello World!'.
        @build/js/pipes/pipes/truncate.pipe.spec.ts:20:8 <- build/js/pipes/truncate.pipe.spec.js:15:9
                ZoneTask/this.invoke@node_modules/zone.js/dist/zone-node.js:395:26`;
    customLog(stack, { exclude: '@node_modules' });
});

test("karmaResult empty log object", t => {
    var newFunc = karmaResult(function (result) {
    }, null, {});
    newFunc({ log: [] });
});
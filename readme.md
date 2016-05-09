karma-custom-log
----------------
Remove external files from stack trace while running karma.
Before:
```
Expected false to be true.
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
```
After:
```
Expected false to be true.
    /project/build/js/components/app/app.spec.js:13:49 <- src/app/components/app/app.spec.ts:6:27
    /project/karma.main.js:57:20
```

### USAGE
```js
import {karmaResult} from "karma-custom-log";
__karma__.result = karmaResult(__karma__.result, __karma__, options);
```

### OPTIONS
* projectRoot - absolute path to root of project (e.g. /project)
"use strict";
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var _1 = require('/');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(_1.AppModule, {
    compilerOptions: {
        providers: [
            { provide: common_1.APP_BASE_HREF, useValue: '/angular2-bs4-navbar' }
        ]
    }
}).catch(function (error) { return console.log("An error occured in bootsrap :", error); });
//# sourceMappingURL=main-io.js.map
var UrlRequestObserver = {

    run: function (settingsObject) {
        if (!settingsObject.req || !settingsObject.properties) {
            throw new Error("request object and properties should be defined");
        }

        var req = settingsObject.req,
            properties = settingsObject.properties,
            callback = settingsObject.callback,
            timeout = settingsObject.timeout

        var timer;
        for (var p in properties) {
            (function (p) {
                var privateFieldName = '_' + p;
                req[privateFieldName] = req[p];

                Object.defineProperty(req, p, {
                    enumerable: false,
                    configurable: false,
                    set: function (val) {
                        console.log(val);
                        req[privateFieldName] = val;

                        var url = getUpdatedQueryString(window.location.search, p, val);
                        window.history.pushState(req, '', url);

                        clearTimeout(timer);

                        timer = setTimeout(function () {
                            callback && callback();
                            timer = null;
                        }, timeout || 200);
                    },
                    get: function () {
                        return req[privateFieldName];
                    }
                });
            }(properties[p]))
        }

        function getUpdatedQueryString(uri, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            return uri.match(re) ? uri.replace(re, '$1' + key + "=" + value + '$2')
                : uri + separator + key + "=" + value;
        }

        window.onpopstate = function () {
            console.log(window.location.search);
            callback && callback();
        }
    }
};
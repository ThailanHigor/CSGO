!(function (e, n) {
    (e.wp = e.wp || {}),
        (e.wp.mediaelement = new (function () {
            var e = {};
            return {
                initialize: function () {
                    "undefined" != typeof _wpmejsSettings && (e = n.extend(!0, {}, _wpmejsSettings)),
                        (e.classPrefix = "mejs-"),
                        (e.success =
                            e.success ||
                            function (e) {
                                var n, t;
                                e.rendererName &&
                                    -1 !== e.rendererName.indexOf("flash") &&
                                    ((n = e.attributes.autoplay && "false" !== e.attributes.autoplay),
                                    (t = e.attributes.loop && "false" !== e.attributes.loop),
                                    n &&
                                        e.addEventListener(
                                            "canplay",
                                            function () {
                                                e.play();
                                            },
                                            !1
                                        ),
                                    t &&
                                        e.addEventListener(
                                            "ended",
                                            function () {
                                                e.play();
                                            },
                                            !1
                                        ));
                            }),
                        (e.customError = function (e, n) {
                            if (-1 !== e.rendererName.indexOf("flash") || -1 !== e.rendererName.indexOf("flv")) return '<a href="' + n.src + '">' + mejsL10n.strings["mejs.download-video"] + "</a>";
                        }),
                        n(".wp-audio-shortcode, .wp-video-shortcode")
                            .not(".mejs-container")
                            .filter(function () {
                                return !n(this).parent().hasClass("mejs-mediaelement");
                            })
                            .mediaelementplayer(e);
                },
            };
        })()),
        n(e.wp.mediaelement.initialize);
})(window, jQuery);
(function ($) {
    $.fn.appear = function (fn, options) {
        var settings = $.extend({ data: undefined, one: true, accX: 0, accY: 0 }, options);
        return this.each(function () {
            var t = $(this);
            t.appeared = false;
            if (!fn) {
                t.trigger("appear", settings.data);
                return;
            }
            var w = $(window);
            var check = function () {
                if (!t.is(":visible")) {
                    t.appeared = false;
                    return;
                }
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;
                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();
                if (y + th + ay >= b && y <= b + wh + ay && x + tw + ax >= a && x <= a + ww + ax) {
                    if (!t.appeared) t.trigger("appear", settings.data);
                } else {
                    t.appeared = false;
                }
            };
            var modifiedFn = function () {
                t.appeared = true;
                if (settings.one) {
                    w.unbind("scroll", check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }
                fn.apply(this, arguments);
            };
            if (settings.one) t.one("appear", settings.data, modifiedFn);
            else t.bind("appear", settings.data, modifiedFn);
            w.scroll(check);
            $.fn.appear.checks.push(check);
            check();
        });
    };
    $.extend($.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function () {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) $.fn.appear.checks[length]();
        },
        run: function () {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        },
    });
    $.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function () {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            };
        }
    });
})(jQuery);
(window.Modernizr = (function (a, b, c) {
    function C(a) {
        j.cssText = a;
    }
    function D(a, b) {
        return C(n.join(a + ";") + (b || ""));
    }
    function E(a, b) {
        return typeof a === b;
    }
    function F(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function G(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
        }
        return !1;
    }
    function H(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f;
        }
        return !1;
    }
    function I(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
        return E(b, "string") || E(b, "undefined") ? G(e, b) : ((e = (a + " " + q.join(d + " ") + d).split(" ")), H(e, b, c));
    }
    function J() {
        (e.input = (function (c) {
            for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u;
        })("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))),
            (e.inputtypes = (function (a) {
                for (var d = 0, e, f, h, i = a.length; d < i; d++)
                    k.setAttribute("type", (f = a[d])),
                        (e = k.type !== "text"),
                        e &&
                            ((k.value = l),
                            (k.style.cssText = "position:absolute;visibility:hidden;"),
                            /^range$/.test(f) && k.style.WebkitAppearance !== c
                                ? (g.appendChild(k), (h = b.defaultView), (e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0), g.removeChild(k))
                                : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? (e = k.checkValidity && k.checkValidity() === !1) : (e = k.value != l))),
                        (t[a[d]] = !!e);
                return t;
            })("search tel url email datetime date month week time datetime-local number range color".split(" ")));
    }
    var d = "2.8.3",
        e = {},
        f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k = b.createElement("input"),
        l = ":)",
        m = {}.toString,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms",
        p = o.split(" "),
        q = o.toLowerCase().split(" "),
        r = { svg: "http://www.w3.org/2000/svg" },
        s = {},
        t = {},
        u = {},
        v = [],
        w = v.slice,
        x,
        y = function (a, c, d, e) {
            var f,
                i,
                j,
                k,
                l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10)) while (d--) (j = b.createElement("div")), (j.id = e ? e[d] : h + (d + 1)), l.appendChild(j);
            return (
                (f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join("")),
                (l.id = h),
                ((m ? l : n).innerHTML += f),
                n.appendChild(l),
                m || ((n.style.background = ""), (n.style.overflow = "hidden"), (k = g.style.overflow), (g.style.overflow = "hidden"), g.appendChild(n)),
                (i = c(l, a)),
                m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), (g.style.overflow = k)),
                !!i
            );
        },
        z = (function () {
            function d(d, e) {
                (e = e || b.createElement(a[d] || "div")), (d = "on" + d);
                var f = d in e;
                return (
                    f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), (f = E(e[d], "function")), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), (e = null), f
                );
            }
            var a = { select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img" };
            return d;
        })(),
        A = {}.hasOwnProperty,
        B;
    !E(A, "undefined") && !E(A.call, "undefined")
        ? (B = function (a, b) {
              return A.call(a, b);
          })
        : (B = function (a, b) {
              return b in a && E(a.constructor.prototype[b], "undefined");
          }),
        Function.prototype.bind ||
            (Function.prototype.bind = function (b) {
                var c = this;
                if (typeof c != "function") throw new TypeError();
                var d = w.call(arguments, 1),
                    e = function () {
                        if (this instanceof e) {
                            var a = function () {};
                            a.prototype = c.prototype;
                            var f = new a(),
                                g = c.apply(f, d.concat(w.call(arguments)));
                            return Object(g) === g ? g : f;
                        }
                        return c.apply(b, d.concat(w.call(arguments)));
                    };
                return e;
            }),
        (s.flexbox = function () {
            return I("flexWrap");
        }),
        (s.flexboxlegacy = function () {
            return I("boxDirection");
        }),
        (s.canvas = function () {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d");
        }),
        (s.canvastext = function () {
            return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function");
        }),
        (s.touch = function () {
            var c;
            return (
                "ontouchstart" in a || (a.DocumentTouch && b instanceof DocumentTouch)
                    ? (c = !0)
                    : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
                          c = a.offsetTop === 9;
                      }),
                c
            );
        }),
        (s.hashchange = function () {
            return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
        }),
        (s.history = function () {
            return !!a.history && !!history.pushState;
        }),
        (s.draganddrop = function () {
            var a = b.createElement("div");
            return "draggable" in a || ("ondragstart" in a && "ondrop" in a);
        }),
        (s.rgba = function () {
            return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba");
        }),
        (s.hsla = function () {
            return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla");
        }),
        (s.multiplebgs = function () {
            return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background);
        }),
        (s.backgroundsize = function () {
            return I("backgroundSize");
        }),
        (s.borderimage = function () {
            return I("borderImage");
        }),
        (s.borderradius = function () {
            return I("borderRadius");
        }),
        (s.boxshadow = function () {
            return I("boxShadow");
        }),
        (s.textshadow = function () {
            return b.createElement("div").style.textShadow === "";
        }),
        (s.opacity = function () {
            return D("opacity:.55"), /^0.55$/.test(j.opacity);
        }),
        (s.cssanimations = function () {
            return I("animationName");
        }),
        (s.csscolumns = function () {
            return I("columnCount");
        }),
        (s.cssgradients = function () {
            var a = "background-image:",
                b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                c = "linear-gradient(left top,#9f9, white);";
            return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient");
        }),
        (s.cssreflections = function () {
            return I("boxReflect");
        }),
        (s.csstransforms = function () {
            return !!I("transform");
        }),
        (s.csstransforms3d = function () {
            var a = !!I("perspective");
            return (
                a &&
                    "webkitPerspective" in g.style &&
                    y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) {
                        a = b.offsetLeft === 9 && b.offsetHeight === 3;
                    }),
                a
            );
        }),
        (s.csstransitions = function () {
            return I("transition");
        }),
        (s.fontface = function () {
            var a;
            return (
                y('@font-face {font-family:"font";src:url("https:///")}', function (c, d) {
                    var e = b.getElementById("smodernizr"),
                        f = e.sheet || e.styleSheet,
                        g = f ? (f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "") : "";
                    a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0;
                }),
                a
            );
        }),
        (s.generatedcontent = function () {
            var a;
            return (
                y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function (b) {
                    a = b.offsetHeight >= 3;
                }),
                a
            );
        }),
        (s.video = function () {
            var a = b.createElement("video"),
                c = !1;
            try {
                if ((c = !!a.canPlayType))
                    (c = new Boolean(c)),
                        (c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, "")),
                        (c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, "")),
                        (c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
            } catch (d) {}
            return c;
        }),
        (s.audio = function () {
            var a = b.createElement("audio"),
                c = !1;
            try {
                if ((c = !!a.canPlayType))
                    (c = new Boolean(c)),
                        (c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "")),
                        (c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, "")),
                        (c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "")),
                        (c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""));
            } catch (d) {}
            return c;
        }),
        (s.svg = function () {
            return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect;
        }),
        (s.inlinesvg = function () {
            var a = b.createElement("div");
            return (a.innerHTML = "<svg/>"), (a.firstChild && a.firstChild.namespaceURI) == r.svg;
        }),
        (s.svgclippaths = function () {
            return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")));
        });
    for (var K in s) B(s, K) && ((x = K.toLowerCase()), (e[x] = s[K]()), v.push((e[x] ? "" : "no-") + x));
    return (
        e.input || J(),
        (e.addTest = function (a, b) {
            if (typeof a == "object") for (var d in a) B(a, d) && e.addTest(d, a[d]);
            else {
                a = a.toLowerCase();
                if (e[a] !== c) return e;
                (b = typeof b == "function" ? b() : b), typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), (e[a] = b);
            }
            return e;
        }),
        C(""),
        (i = k = null),
        (function (a, b) {
            function l(a, b) {
                var c = a.createElement("p"),
                    d = a.getElementsByTagName("head")[0] || a.documentElement;
                return (c.innerHTML = "x<style>" + b + "</style>"), d.insertBefore(c.lastChild, d.firstChild);
            }
            function m() {
                var a = s.elements;
                return typeof a == "string" ? a.split(" ") : a;
            }
            function n(a) {
                var b = j[a[h]];
                return b || ((b = {}), i++, (a[h] = i), (j[i] = b)), b;
            }
            function o(a, c, d) {
                c || (c = b);
                if (k) return c.createElement(a);
                d || (d = n(c));
                var g;
                return d.cache[a] ? (g = d.cache[a].cloneNode()) : f.test(a) ? (g = (d.cache[a] = d.createElem(a)).cloneNode()) : (g = d.createElem(a)), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g;
            }
            function p(a, c) {
                a || (a = b);
                if (k) return a.createDocumentFragment();
                c = c || n(a);
                var d = c.frag.cloneNode(),
                    e = 0,
                    f = m(),
                    g = f.length;
                for (; e < g; e++) d.createElement(f[e]);
                return d;
            }
            function q(a, b) {
                b.cache || ((b.cache = {}), (b.createElem = a.createElement), (b.createFrag = a.createDocumentFragment), (b.frag = b.createFrag())),
                    (a.createElement = function (c) {
                        return s.shivMethods ? o(c, a, b) : b.createElem(c);
                    }),
                    (a.createDocumentFragment = Function(
                        "h,f",
                        "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                            m()
                                .join()
                                .replace(/[\w\-]+/g, function (a) {
                                    return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
                                }) +
                            ");return n}"
                    )(s, b.frag));
            }
            function r(a) {
                a || (a = b);
                var c = n(a);
                return (
                    s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
                );
            }
            var c = "3.7.0",
                d = a.html5 || {},
                e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                g,
                h = "_html5shiv",
                i = 0,
                j = {},
                k;
            (function () {
                try {
                    var a = b.createElement("a");
                    (a.innerHTML = "<xyz></xyz>"),
                        (g = "hidden" in a),
                        (k =
                            a.childNodes.length == 1 ||
                            (function () {
                                b.createElement("a");
                                var a = b.createDocumentFragment();
                                return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined";
                            })());
                } catch (c) {
                    (g = !0), (k = !0);
                }
            })();
            var s = {
                elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: c,
                shivCSS: d.shivCSS !== !1,
                supportsUnknownElements: k,
                shivMethods: d.shivMethods !== !1,
                type: "default",
                shivDocument: r,
                createElement: o,
                createDocumentFragment: p,
            };
            (a.html5 = s), r(b);
        })(this, b),
        (e._version = d),
        (e._prefixes = n),
        (e._domPrefixes = q),
        (e._cssomPrefixes = p),
        (e.hasEvent = z),
        (e.testProp = function (a) {
            return G([a]);
        }),
        (e.testAllProps = I),
        (e.testStyles = y),
        (g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : "")),
        e
    );
})(this, this.document)),
    (function (a, b, c) {
        function d(a) {
            return "[object Function]" == o.call(a);
        }
        function e(a) {
            return "string" == typeof a;
        }
        function f() {}
        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
        }
        function h() {
            var a = p.shift();
            (q = 1),
                a
                    ? a.t
                        ? m(function () {
                              ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
                          }, 0)
                        : (a(), h())
                    : (q = 0);
        }
        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && ((u.r = o = 1), !q && h(), (l.onload = l.onreadystatechange = null), b)) {
                    "img" != a &&
                        m(function () {
                            t.removeChild(l);
                        }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = { t: d, s: c, e: f, a: i, x: j };
            1 === y[c] && ((r = 1), (y[c] = [])),
                "object" == a ? (l.data = c) : ((l.src = c), (l.type = a)),
                (l.width = l.height = "0"),
                (l.onerror = l.onload = l.onreadystatechange = function () {
                    k.call(this, r);
                }),
                p.splice(e, 0, u),
                "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
        }
        function j(a, b, c, d, f) {
            return (q = 0), (b = b || "j"), e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this;
        }
        function k() {
            var a = B;
            return (a.loader = { load: j, i: 0 }), a;
        }
        var l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w =
                Array.isArray ||
                function (a) {
                    return "[object Array]" == o.call(a);
                },
            x = [],
            y = {},
            z = {
                timeout: function (a, b) {
                    return b.length && (a.timeout = b[0]), a;
                },
            },
            A,
            B;
        (B = function (a) {
            function b(a) {
                var a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = { url: c, origUrl: c, prefixes: a },
                    e,
                    f,
                    g;
                for (f = 0; f < d; f++) (g = a[f].split("=")), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; f < b; f++) c = x[f](c);
                return c;
            }
            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(),
                    i.bypass ||
                        (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("https://overworld.qodeinteractive.com/").pop().split("?")[0]]),
                        i.instead
                            ? i.instead(a, e, f, g, h)
                            : (y[i.url] ? (i.noexec = !0) : (y[i.url] = 1),
                              f.load(i.url, i.forceCSS || (!i.forceJS && "css" == i.url.split(".").pop().split("?").shift()) ? "c" : c, i.noexec, i.attrs, i.timeout),
                              (d(e) || d(j)) &&
                                  f.load(function () {
                                      k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), (y[i.url] = 2);
                                  })));
            }
            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a))
                            c ||
                                (j = function () {
                                    var a = [].slice.call(arguments);
                                    k.apply(this, a), l();
                                }),
                                g(a, j, b, 0, h);
                        else if (Object(a) === a)
                            for (n in ((m = (function () {
                                var b = 0,
                                    c;
                                for (c in a) a.hasOwnProperty(c) && b++;
                                return b;
                            })()),
                            a))
                                a.hasOwnProperty(n) &&
                                    (!c &&
                                        !--m &&
                                        (d(j)
                                            ? (j = function () {
                                                  var a = [].slice.call(arguments);
                                                  k.apply(this, a), l();
                                              })
                                            : (j[n] = (function (a) {
                                                  return function () {
                                                      var b = [].slice.call(arguments);
                                                      a && a.apply(this, b), l();
                                                  };
                                              })(k[n]))),
                                    g(a[n], j, b, n, h));
                    } else !c && l();
                }
                var h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f,
                    m,
                    n;
                c(h ? a.yep : a.nope, !!i), i && c(i);
            }
            var i,
                j,
                l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a)) for (i = 0; i < a.length; i++) (j = a[i]), e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l);
        }),
            (B.addPrefix = function (a, b) {
                z[a] = b;
            }),
            (B.addFilter = function (a) {
                x.push(a);
            }),
            (B.errorTimeout = 1e4),
            null == b.readyState &&
                b.addEventListener &&
                ((b.readyState = "loading"),
                b.addEventListener(
                    "DOMContentLoaded",
                    (A = function () {
                        b.removeEventListener("DOMContentLoaded", A, 0), (b.readyState = "complete");
                    }),
                    0
                )),
            (a.yepnope = k()),
            (a.yepnope.executeStack = h),
            (a.yepnope.injectJs = function (a, c, d, e, i, j) {
                var k = b.createElement("script"),
                    l,
                    o,
                    e = e || B.errorTimeout;
                k.src = a;
                for (o in d) k.setAttribute(o, d[o]);
                (c = j ? h : c || f),
                    (k.onreadystatechange = k.onload = function () {
                        !l && g(k.readyState) && ((l = 1), c(), (k.onload = k.onreadystatechange = null));
                    }),
                    m(function () {
                        l || ((l = 1), c(1));
                    }, e),
                    i ? k.onload() : n.parentNode.insertBefore(k, n);
            }),
            (a.yepnope.injectCss = function (a, c, d, e, g, i) {
                var e = b.createElement("link"),
                    j,
                    c = i ? h : c || f;
                (e.href = a), (e.rel = "stylesheet"), (e.type = "text/css");
                for (j in d) e.setAttribute(j, d[j]);
                g || (n.parentNode.insertBefore(e, n), m(c, 0));
            });
    })(this, document),
    (Modernizr.load = function () {
        yepnope.apply(window, [].slice.call(arguments, 0));
    });
!(function (a) {
    a.fn.hoverIntent = function (e, t, n) {
        var o,
            r,
            v,
            i,
            u = { interval: 100, sensitivity: 6, timeout: 0 };
        u = "object" == typeof e ? a.extend(u, e) : a.isFunction(t) ? a.extend(u, { over: e, out: t, selector: n }) : a.extend(u, { over: e, out: e, selector: t });
        function s(e) {
            (o = e.pageX), (r = e.pageY);
        }
        function h(e) {
            var t = a.extend({}, e),
                n = this;
            n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)),
                "mouseenter" === e.type
                    ? ((v = t.pageX),
                      (i = t.pageY),
                      a(n).on("mousemove.hoverIntent", s),
                      n.hoverIntent_s ||
                          (n.hoverIntent_t = setTimeout(function () {
                              I(t, n);
                          }, u.interval)))
                    : (a(n).off("mousemove.hoverIntent", s),
                      n.hoverIntent_s &&
                          (n.hoverIntent_t = setTimeout(function () {
                              !(function (e, t) {
                                  (t.hoverIntent_t = clearTimeout(t.hoverIntent_t)), (t.hoverIntent_s = !1), u.out.apply(t, [e]);
                              })(t, n);
                          }, u.timeout)));
        }
        var I = function (e, t) {
            if (((t.hoverIntent_t = clearTimeout(t.hoverIntent_t)), Math.sqrt((v - o) * (v - o) + (i - r) * (i - r)) < u.sensitivity)) return a(t).off("mousemove.hoverIntent", s), (t.hoverIntent_s = !0), u.over.apply(t, [e]);
            (v = o),
                (i = r),
                (t.hoverIntent_t = setTimeout(function () {
                    I(e, t);
                }, u.interval));
        };
        return this.on({ "mouseenter.hoverIntent": h, "mouseleave.hoverIntent": h }, u.selector);
    };
})(jQuery);
!(function (a, b, c, d) {
    function e(b, c) {
        (this.settings = null),
            (this.options = a.extend({}, e.Defaults, c)),
            (this.$element = a(b)),
            (this._handlers = {}),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._widths = []),
            (this._invalidated = {}),
            (this._pipe = []),
            (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
            (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
            a.each(
                ["onResize", "onThrottledResize"],
                a.proxy(function (b, c) {
                    this._handlers[c] = a.proxy(this[c], this);
                }, this)
            ),
            a.each(
                e.Plugins,
                a.proxy(function (a, b) {
                    this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
                }, this)
            ),
            a.each(
                e.Workers,
                a.proxy(function (b, c) {
                    this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    (e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
    }),
        (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (e.Type = { Event: "event", State: "state" }),
        (e.Plugins = {}),
        (e.Workers = [
            {
                filter: ["width", "settings"],
                run: function () {
                    this._width = this.$element.width();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current = this._items && this._items[this.relative(this._current)];
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    this.$stage.children(".cloned").remove();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b = this.settings.margin || "",
                        c = !this.settings.autoWidth,
                        d = this.settings.rtl,
                        e = { width: "auto", "margin-left": d ? b : "", "margin-right": d ? "" : b };
                    !c && this.$stage.children().css(e), (a.css = e);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                        c = null,
                        d = this._items.length,
                        e = !this.settings.autoWidth,
                        f = [];
                    for (a.items = { merge: !1, width: b }; d--; )
                        (c = this._mergers[d]), (c = (this.settings.mergeFit && Math.min(c, this.settings.items)) || c), (a.items.merge = c > 1 || a.items.merge), (f[d] = e ? b * c : this._items[d].width());
                    this._widths = f;
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var b = [],
                        c = this._items,
                        d = this.settings,
                        e = Math.max(2 * d.items, 4),
                        f = 2 * Math.ceil(c.length / 2),
                        g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
                        h = "",
                        i = "";
                    for (g /= 2; g > 0; ) b.push(this.normalize(b.length / 2, !0)), (h += c[b[b.length - 1]][0].outerHTML), b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), (i = c[b[b.length - 1]][0].outerHTML + i), (g -= 1);
                    (this._clones = b), a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b; )
                        (d = f[c - 1] || 0), (e = this._widths[this.relative(c)] + this.settings.margin), f.push(d + e * a);
                    this._coordinates = f;
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var a = this.settings.stagePadding,
                        b = this._coordinates,
                        c = { width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a, "padding-left": a || "", "padding-right": a || "" };
                    this.$stage.css(c);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b = this._coordinates.length,
                        c = !this.settings.autoWidth,
                        d = this.$stage.children();
                    if (c && a.items.merge) for (; b--; ) (a.css.width = this._widths[this.relative(b)]), d.eq(b).css(a.css);
                    else c && ((a.css.width = a.items.width), d.css(a.css));
                },
            },
            {
                filter: ["items"],
                run: function () {
                    this._coordinates.length < 1 && this.$stage.removeAttr("style");
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    (a.current = a.current ? this.$stage.children().index(a.current) : 0), (a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current))), this.reset(a.current);
                },
            },
            {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current));
                },
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var a,
                        b,
                        c,
                        d,
                        e = this.settings.rtl ? 1 : -1,
                        f = 2 * this.settings.stagePadding,
                        g = this.coordinates(this.current()) + f,
                        h = g + this.width() * e,
                        i = [];
                    for (c = 0, d = this._coordinates.length; c < d; c++)
                        (a = this._coordinates[c - 1] || 0), (b = Math.abs(this._coordinates[c]) + f * e), ((this.op(a, "<=", g) && this.op(a, ">", h)) || (this.op(b, "<", g) && this.op(b, ">", h))) && i.push(c);
                    this.$stage.children(".active").removeClass("active"),
                        this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
                        this.$stage.children(".center").removeClass("center"),
                        this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
                },
            },
        ]),
        (e.prototype.initializeStage = function () {
            (this.$stage = this.$element.find("." + this.settings.stageClass)),
                this.$stage.length ||
                    (this.$element.addClass(this.options.loadingClass),
                    (this.$stage = a("<" + this.settings.stageElement + ">", { class: this.settings.stageClass }).wrap(a("<div/>", { class: this.settings.stageOuterClass }))),
                    this.$element.append(this.$stage.parent()));
        }),
        (e.prototype.initializeItems = function () {
            var b = this.$element.find(".owl-item");
            if (b.length)
                return (
                    (this._items = b.get().map(function (b) {
                        return a(b);
                    })),
                    (this._mergers = this._items.map(function () {
                        return 1;
                    })),
                    void this.refresh()
                );
            this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
        }),
        (e.prototype.initialize = function () {
            if ((this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading"))) {
                var a, b, c;
                (a = this.$element.find("img")), (b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d), (c = this.$element.children(b).width()), a.length && c <= 0 && this.preloadAutoWidthImages(a);
            }
            this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
        }),
        (e.prototype.isVisible = function () {
            return !this.settings.checkVisibility || this.$element.is(":visible");
        }),
        (e.prototype.setup = function () {
            var b = this.viewport(),
                c = this.options.responsive,
                d = -1,
                e = null;
            c
                ? (a.each(c, function (a) {
                      a <= b && a > d && (d = Number(a));
                  }),
                  (e = a.extend({}, this.options, c[d])),
                  "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
                  delete e.responsive,
                  e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d)))
                : (e = a.extend({}, this.options)),
                this.trigger("change", { property: { name: "settings", value: e } }),
                (this._breakpoint = d),
                (this.settings = e),
                this.invalidate("settings"),
                this.trigger("changed", { property: { name: "settings", value: this.settings } });
        }),
        (e.prototype.optionsLogic = function () {
            this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (e.prototype.prepare = function (b) {
            var c = this.trigger("prepare", { content: b });
            return (
                c.data ||
                    (c.data = a("<" + this.settings.itemElement + "/>")
                        .addClass(this.options.itemClass)
                        .append(b)),
                this.trigger("prepared", { content: c.data }),
                c.data
            );
        }),
        (e.prototype.update = function () {
            for (
                var b = 0,
                    c = this._pipe.length,
                    d = a.proxy(function (a) {
                        return this[a];
                    }, this._invalidated),
                    e = {};
                b < c;

            )
                (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
            (this._invalidated = {}), !this.is("valid") && this.enter("valid");
        }),
        (e.prototype.width = function (a) {
            switch ((a = a || e.Width.Default)) {
                case e.Width.Inner:
                case e.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin;
            }
        }),
        (e.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed");
        }),
        (e.prototype.onThrottledResize = function () {
            b.clearTimeout(this.resizeTimer), (this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
        }),
        (e.prototype.onResize = function () {
            return (
                !!this._items.length &&
                this._width !== this.$element.width() &&
                !!this.isVisible() &&
                (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
            );
        }),
        (e.prototype.registerEventHandlers = function () {
            a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
                !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag &&
                    (this.$element.addClass(this.options.dragClass),
                    this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
                    this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                        return !1;
                    })),
                this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)));
        }),
        (e.prototype.onDragStart = function (b) {
            var d = null;
            3 !== b.which &&
                (a.support.transform
                    ? ((d = this.$stage
                          .css("transform")
                          .replace(/.*\(|\)| /g, "")
                          .split(",")),
                      (d = { x: d[16 === d.length ? 12 : 4], y: d[16 === d.length ? 13 : 5] }))
                    : ((d = this.$stage.position()), (d = { x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left, y: d.top })),
                this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")),
                this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
                this.speed(0),
                (this._drag.time = new Date().getTime()),
                (this._drag.target = a(b.target)),
                (this._drag.stage.start = d),
                (this._drag.stage.current = d),
                (this._drag.pointer = this.pointer(b)),
                a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
                a(c).one(
                    "mousemove.owl.core touchmove.owl.core",
                    a.proxy(function (b) {
                        var d = this.difference(this._drag.pointer, this.pointer(b));
                        a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                    }, this)
                ));
        }),
        (e.prototype.onDragMove = function (a) {
            var b = null,
                c = null,
                d = null,
                e = this.difference(this._drag.pointer, this.pointer(a)),
                f = this.difference(this._drag.stage.start, e);
            this.is("dragging") &&
                (a.preventDefault(),
                this.settings.loop
                    ? ((b = this.coordinates(this.minimum())), (c = this.coordinates(this.maximum() + 1) - b), (f.x = ((((f.x - b) % c) + c) % c) + b))
                    : ((b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                      (c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                      (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
                      (f.x = Math.max(Math.min(f.x, b + d), c + d))),
                (this._drag.stage.current = f),
                this.animate(f.x));
        }),
        (e.prototype.onDragEnd = function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b)),
                e = this._drag.stage.current,
                f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
            a(c).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
                    (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
                    this.invalidate("position"),
                    this.update(),
                    (this._drag.direction = f),
                    (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
                        this._drag.target.one("click.owl.core", function () {
                            return !1;
                        })),
                this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
        }),
        (e.prototype.closest = function (b, c) {
            var e = -1,
                f = 30,
                g = this.width(),
                h = this.coordinates();
            return (
                this.settings.freeDrag ||
                    a.each(
                        h,
                        a.proxy(function (a, i) {
                            return (
                                "left" === c && b > i - f && b < i + f
                                    ? (e = a)
                                    : "right" === c && b > i - g - f && b < i - g + f
                                    ? (e = a + 1)
                                    : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
                                -1 === e
                            );
                        }, this)
                    ),
                this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? (e = b = this.minimum()) : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
                e
            );
        }),
        (e.prototype.animate = function (b) {
            var c = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
                c && (this.enter("animating"), this.trigger("translate")),
                a.support.transform3d && a.support.transition
                    ? this.$stage.css({ transform: "translate3d(" + b + "px,0px,0px)", transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "") })
                    : c
                    ? this.$stage.animate({ left: b + "px" }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this))
                    : this.$stage.css({ left: b + "px" });
        }),
        (e.prototype.is = function (a) {
            return this._states.current[a] && this._states.current[a] > 0;
        }),
        (e.prototype.current = function (a) {
            if (a === d) return this._current;
            if (0 === this._items.length) return d;
            if (((a = this.normalize(a)), this._current !== a)) {
                var b = this.trigger("change", { property: { name: "position", value: a } });
                b.data !== d && (a = this.normalize(b.data)), (this._current = a), this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
            }
            return this._current;
        }),
        (e.prototype.invalidate = function (b) {
            return (
                "string" === a.type(b) && ((this._invalidated[b] = !0), this.is("valid") && this.leave("valid")),
                a.map(this._invalidated, function (a, b) {
                    return b;
                })
            );
        }),
        (e.prototype.reset = function (a) {
            (a = this.normalize(a)) !== d && ((this._speed = 0), (this._current = a), this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
        }),
        (e.prototype.normalize = function (a, b) {
            var c = this._items.length,
                e = b ? 0 : this._clones.length;
            return !this.isNumeric(a) || c < 1 ? (a = d) : (a < 0 || a >= c + e) && (a = ((((a - e / 2) % c) + c) % c) + e / 2), a;
        }),
        (e.prototype.relative = function (a) {
            return (a -= this._clones.length / 2), this.normalize(a, !0);
        }),
        (e.prototype.maximum = function (a) {
            var b,
                c,
                d,
                e = this.settings,
                f = this._coordinates.length;
            if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
            else if (e.autoWidth || e.merge) {
                if ((b = this._items.length)) for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d); );
                f = b + 1;
            } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
            return a && (f -= this._clones.length / 2), Math.max(f, 0);
        }),
        (e.prototype.minimum = function (a) {
            return a ? 0 : this._clones.length / 2;
        }),
        (e.prototype.items = function (a) {
            return a === d ? this._items.slice() : ((a = this.normalize(a, !0)), this._items[a]);
        }),
        (e.prototype.mergers = function (a) {
            return a === d ? this._mergers.slice() : ((a = this.normalize(a, !0)), this._mergers[a]);
        }),
        (e.prototype.clones = function (b) {
            var c = this._clones.length / 2,
                e = c + this._items.length,
                f = function (a) {
                    return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
                };
            return b === d
                ? a.map(this._clones, function (a, b) {
                      return f(b);
                  })
                : a.map(this._clones, function (a, c) {
                      return a === b ? f(c) : null;
                  });
        }),
        (e.prototype.speed = function (a) {
            return a !== d && (this._speed = a), this._speed;
        }),
        (e.prototype.coordinates = function (b) {
            var c,
                e = 1,
                f = b - 1;
            return b === d
                ? a.map(
                      this._coordinates,
                      a.proxy(function (a, b) {
                          return this.coordinates(b);
                      }, this)
                  )
                : (this.settings.center ? (this.settings.rtl && ((e = -1), (f = b + 1)), (c = this._coordinates[b]), (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e)) : (c = this._coordinates[f] || 0), (c = Math.ceil(c)));
        }),
        (e.prototype.duration = function (a, b, c) {
            return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
        }),
        (e.prototype.to = function (a, b) {
            var c = this.current(),
                d = null,
                e = a - this.relative(c),
                f = (e > 0) - (e < 0),
                g = this._items.length,
                h = this.minimum(),
                i = this.maximum();
            this.settings.loop
                ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), (a = c + e), (d = ((((a - h) % g) + g) % g) + h) !== a && d - e <= i && d - e > 0 && ((c = d - e), (a = d), this.reset(c)))
                : this.settings.rewind
                ? ((i += 1), (a = ((a % i) + i) % i))
                : (a = Math.max(h, Math.min(i, a))),
                this.speed(this.duration(c, a, b)),
                this.current(a),
                this.isVisible() && this.update();
        }),
        (e.prototype.next = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) + 1, a);
        }),
        (e.prototype.prev = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) - 1, a);
        }),
        (e.prototype.onTransitionEnd = function (a) {
            if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
            this.leave("animating"), this.trigger("translated");
        }),
        (e.prototype.viewport = function () {
            var d;
            return (
                this.options.responsiveBaseElement !== b
                    ? (d = a(this.options.responsiveBaseElement).width())
                    : b.innerWidth
                    ? (d = b.innerWidth)
                    : c.documentElement && c.documentElement.clientWidth
                    ? (d = c.documentElement.clientWidth)
                    : console.warn("Can not detect viewport width."),
                d
            );
        }),
        (e.prototype.replace = function (b) {
            this.$stage.empty(),
                (this._items = []),
                b && (b = b instanceof jQuery ? b : a(b)),
                this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
                b
                    .filter(function () {
                        return 1 === this.nodeType;
                    })
                    .each(
                        a.proxy(function (a, b) {
                            (b = this.prepare(b)), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                        }, this)
                    ),
                this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items");
        }),
        (e.prototype.add = function (b, c) {
            var e = this.relative(this._current);
            (c = c === d ? this._items.length : this.normalize(c, !0)),
                (b = b instanceof jQuery ? b : a(b)),
                this.trigger("add", { content: b, position: c }),
                (b = this.prepare(b)),
                0 === this._items.length || c === this._items.length
                    ? (0 === this._items.length && this.$stage.append(b),
                      0 !== this._items.length && this._items[c - 1].after(b),
                      this._items.push(b),
                      this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                    : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[e] && this.reset(this._items[e].index()),
                this.invalidate("items"),
                this.trigger("added", { content: b, position: c });
        }),
        (e.prototype.remove = function (a) {
            (a = this.normalize(a, !0)) !== d &&
                (this.trigger("remove", { content: this._items[a], position: a }),
                this._items[a].remove(),
                this._items.splice(a, 1),
                this._mergers.splice(a, 1),
                this.invalidate("items"),
                this.trigger("removed", { content: null, position: a }));
        }),
        (e.prototype.preloadAutoWidthImages = function (b) {
            b.each(
                a.proxy(function (b, c) {
                    this.enter("pre-loading"),
                        (c = a(c)),
                        a(new Image())
                            .one(
                                "load",
                                a.proxy(function (a) {
                                    c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                                }, this)
                            )
                            .attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"));
                }, this)
            );
        }),
        (e.prototype.destroy = function () {
            this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
            for (var d in this._plugins) this._plugins[d].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element
                    .removeClass(this.options.refreshClass)
                    .removeClass(this.options.loadingClass)
                    .removeClass(this.options.loadedClass)
                    .removeClass(this.options.rtlClass)
                    .removeClass(this.options.dragClass)
                    .removeClass(this.options.grabClass)
                    .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                    .removeData("owl.carousel");
        }),
        (e.prototype.op = function (a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
                case "<":
                    return d ? a > c : a < c;
                case ">":
                    return d ? a < c : a > c;
                case ">=":
                    return d ? a <= c : a >= c;
                case "<=":
                    return d ? a >= c : a <= c;
            }
        }),
        (e.prototype.on = function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
        }),
        (e.prototype.off = function (a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
        }),
        (e.prototype.trigger = function (b, c, d, f, g) {
            var h = { item: { count: this._items.length, index: this.current() } },
                i = a.camelCase(
                    a
                        .grep(["on", b, d], function (a) {
                            return a;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({ relatedTarget: this }, h, c));
            return (
                this._supress[b] ||
                    (a.each(this._plugins, function (a, b) {
                        b.onTrigger && b.onTrigger(j);
                    }),
                    this.register({ type: e.Type.Event, name: b }),
                    this.$element.trigger(j),
                    this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
                j
            );
        }),
        (e.prototype.enter = function (b) {
            a.each(
                [b].concat(this._states.tags[b] || []),
                a.proxy(function (a, b) {
                    this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++;
                }, this)
            );
        }),
        (e.prototype.leave = function (b) {
            a.each(
                [b].concat(this._states.tags[b] || []),
                a.proxy(function (a, b) {
                    this._states.current[b]--;
                }, this)
            );
        }),
        (e.prototype.register = function (b) {
            if (b.type === e.Type.Event) {
                if ((a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl)) {
                    var c = a.event.special[b.name]._default;
                    (a.event.special[b.name]._default = function (a) {
                        return !c || !c.apply || (a.namespace && -1 !== a.namespace.indexOf("owl")) ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments);
                    }),
                        (a.event.special[b.name].owl = !0);
                }
            } else
                b.type === e.Type.State &&
                    (this._states.tags[b.name] ? (this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags)) : (this._states.tags[b.name] = b.tags),
                    (this._states.tags[b.name] = a.grep(
                        this._states.tags[b.name],
                        a.proxy(function (c, d) {
                            return a.inArray(c, this._states.tags[b.name]) === d;
                        }, this)
                    )));
        }),
        (e.prototype.suppress = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    this._supress[b] = !0;
                }, this)
            );
        }),
        (e.prototype.release = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    delete this._supress[b];
                }, this)
            );
        }),
        (e.prototype.pointer = function (a) {
            var c = { x: null, y: null };
            return (
                (a = a.originalEvent || a || b.event),
                (a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a),
                a.pageX ? ((c.x = a.pageX), (c.y = a.pageY)) : ((c.x = a.clientX), (c.y = a.clientY)),
                c
            );
        }),
        (e.prototype.isNumeric = function (a) {
            return !isNaN(parseFloat(a));
        }),
        (e.prototype.difference = function (a, b) {
            return { x: a.x - b.x, y: a.y - b.y };
        }),
        (a.fn.owlCarousel = function (b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var d = a(this),
                    f = d.data("owl.carousel");
                f ||
                    ((f = new e(this, "object" == typeof b && b)),
                    d.data("owl.carousel", f),
                    a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                        f.register({ type: e.Type.Event, name: c }),
                            f.$element.on(
                                c + ".owl.carousel.core",
                                a.proxy(function (a) {
                                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]));
                                }, f)
                            );
                    })),
                    "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
            });
        }),
        (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (e.prototype.watch = function () {
                this._interval || ((this._visible = this._core.isVisible()), (this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (e.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (e.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this._interval);
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && ((b.property && "position" == b.property.name) || "initialized" == b.type)) {
                            var c = this._core.settings,
                                e = (c.center && Math.ceil(c.items / 2)) || c.items,
                                f = (c.center && -1 * e) || 0,
                                g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                                h = this._core.clones().length,
                                i = a.proxy(function (a, b) {
                                    this.load(b);
                                }, this);
                            for (c.lazyLoadEager > 0 && ((e += c.lazyLoadEager), c.loop && ((g -= c.lazyLoadEager), e++)); f++ < e; ) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++;
                        }
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
            (e.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c),
                    e = d && d.find(".owl-lazy");
                !e ||
                    a.inArray(d.get(0), this._loaded) > -1 ||
                    (e.each(
                        a.proxy(function (c, d) {
                            var e,
                                f = a(d),
                                g = (b.devicePixelRatio > 1 && f.attr("data-src-retina")) || f.attr("data-src") || f.attr("data-srcset");
                            this._core.trigger("load", { element: f, url: g }, "lazy"),
                                f.is("img")
                                    ? f
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  f.css("opacity", 1), this._core.trigger("loaded", { element: f, url: g }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", g)
                                    : f.is("source")
                                    ? f
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  this._core.trigger("loaded", { element: f, url: g }, "lazy");
                                              }, this)
                                          )
                                          .attr("srcset", g)
                                    : ((e = new Image()),
                                      (e.onload = a.proxy(function () {
                                          f.css({ "background-image": 'url("' + g + '")', opacity: "1" }), this._core.trigger("loaded", { element: f, url: g }, "lazy");
                                      }, this)),
                                      (e.src = g));
                        }, this)
                    ),
                    this._loaded.push(d.get(0)));
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (c) {
            (this._core = c),
                (this._previousHeight = null),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var d = this;
            a(b).on("load", function () {
                d._core.settings.autoHeight && d.update();
            }),
                a(b).resize(function () {
                    d._core.settings.autoHeight &&
                        (null != d._intervalId && clearTimeout(d._intervalId),
                        (d._intervalId = setTimeout(function () {
                            d.update();
                        }, 250)));
                });
        };
        (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (e.prototype.update = function () {
                var b = this._core._current,
                    c = b + this._core.settings.items,
                    d = this._core.settings.lazyLoad,
                    e = this._core.$stage.children().toArray().slice(b, c),
                    f = [],
                    g = 0;
                a.each(e, function (b, c) {
                    f.push(a(c).height());
                }),
                    (g = Math.max.apply(null, f)),
                    g <= 1 && d && this._previousHeight && (g = this._previousHeight),
                    (this._previousHeight = g),
                    this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass);
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" === a.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find(".owl-video");
                            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
                        }
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    a.proxy(function (a) {
                        this.play(a);
                    }, this)
                );
        };
        (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (e.prototype.fetch = function (a, b) {
                var c = (function () {
                        return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
                    })(),
                    d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
                    e = a.attr("data-width") || this._core.settings.videoWidth,
                    f = a.attr("data-height") || this._core.settings.videoHeight,
                    g = a.attr("href");
                if (!g) throw new Error("Missing video URL.");
                if (
                    ((d = g.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    )),
                    d[3].indexOf("youtu") > -1)
                )
                    c = "youtube";
                else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
                else {
                    if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                    c = "vzaar";
                }
                (d = d[6]), (this._videos[g] = { type: c, id: d, width: e, height: f }), b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
            }),
            (e.prototype.thumbnail = function (b, c) {
                var d,
                    e,
                    f,
                    g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
                    h = b.find("img"),
                    i = "src",
                    j = "",
                    k = this._core.settings,
                    l = function (c) {
                        (e = '<div class="owl-video-play-icon"></div>'),
                            (d = k.lazyLoad ? a("<div/>", { class: "owl-video-tn " + j, srcType: c }) : a("<div/>", { class: "owl-video-tn", style: "opacity:1;background-image:url(" + c + ")" })),
                            b.after(d),
                            b.after(e);
                    };
                if ((b.wrap(a("<div/>", { class: "owl-video-wrapper", style: g })), this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")), h.length)) return l(h.attr(i)), h.remove(), !1;
                "youtube" === c.type
                    ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
                    : "vimeo" === c.type
                    ? a.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (a) {
                              (f = a[0].thumbnail_large), l(f);
                          },
                      })
                    : "vzaar" === c.type &&
                      a.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + c.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (a) {
                              (f = a.framegrab_url), l(f);
                          },
                      });
            }),
            (e.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (e.prototype.play = function (b) {
                var c,
                    d = a(b.target),
                    e = d.closest("." + this._core.settings.itemClass),
                    f = this._videos[e.attr("data-video")],
                    g = f.width || "100%",
                    h = f.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (e = this._core.items(this._core.relative(e.index()))),
                    this._core.reset(e.index()),
                    (c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')),
                    c.attr("height", h),
                    c.attr("width", g),
                    "youtube" === f.type
                        ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id)
                        : "vimeo" === f.type
                        ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1")
                        : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
                    a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
                    (this._playing = e.addClass("owl-video-playing")));
            }),
            (e.prototype.isInFullScreen = function () {
                var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
                return b && a(b).parent().hasClass("owl-video-frame");
            }),
            (e.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Video = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this.core = b),
                (this.core.options = a.extend({}, e.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = d),
                (this.next = d),
                (this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && ((this.previous = this.core.current()), (this.next = a.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                        a.namespace && (this.swapping = "translated" == a.type);
                    }, this),
                    "translate.owl.carousel": a.proxy(function (a) {
                        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (e.Defaults = { animateOut: !1, animateIn: !1 }),
            (e.prototype.swap = function () {
                if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                    this.core.speed(0);
                    var b,
                        c = a.proxy(this.clear, this),
                        d = this.core.$stage.children().eq(this.previous),
                        e = this.core.$stage.children().eq(this.next),
                        f = this.core.settings.animateIn,
                        g = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (g &&
                            ((b = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            d
                                .one(a.support.animation.end, c)
                                .css({ left: b + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(g)),
                        f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f));
                }
            }),
            (e.prototype.clear = function (b) {
                a(b.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "settings" === a.property.name ? (this._core.settings.autoplay ? this.play() : this.stop()) : a.namespace && "position" === a.property.name && this._paused && (this._time = 0);
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        a.namespace && this.play(b, c);
                    }, this),
                    "stop.owl.autoplay": a.proxy(function (a) {
                        a.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = a.extend({}, e.Defaults, this._core.options));
        };
        (e.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
            (e.prototype._next = function (d) {
                (this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read())),
                    this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed);
            }),
            (e.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (e.prototype.play = function (c, d) {
                var e;
                this._core.is("rotating") || this._core.enter("rotating"),
                    (c = c || this._core.settings.autoplayTimeout),
                    (e = Math.min(this._time % (this._timeout || c), c)),
                    this._paused ? ((this._time = this.read()), (this._paused = !1)) : b.clearTimeout(this._call),
                    (this._time += (this.read() % c) - e),
                    (this._timeout = c),
                    (this._call = b.setTimeout(a.proxy(this._next, this, d), c - e));
            }),
            (e.prototype.stop = function () {
                this._core.is("rotating") && ((this._time = 0), (this._paused = !0), b.clearTimeout(this._call), this._core.leave("rotating"));
            }),
            (e.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && ((this._time = this.read()), (this._paused = !0), b.clearTimeout(this._call));
            }),
            (e.prototype.destroy = function () {
                var a, b;
                this.stop();
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        "use strict";
        var e = function (b) {
            (this._core = b),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
                (this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1);
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "position" == a.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (e.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (e.prototype.initialize = function () {
                var b,
                    c = this._core.settings;
                (this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                    (this._controls.$previous = a("<" + c.navElement + ">")
                        .addClass(c.navClass[0])
                        .html(c.navText[0])
                        .prependTo(this._controls.$relative)
                        .on(
                            "click",
                            a.proxy(function (a) {
                                this.prev(c.navSpeed);
                            }, this)
                        )),
                    (this._controls.$next = a("<" + c.navElement + ">")
                        .addClass(c.navClass[1])
                        .html(c.navText[1])
                        .appendTo(this._controls.$relative)
                        .on(
                            "click",
                            a.proxy(function (a) {
                                this.next(c.navSpeed);
                            }, this)
                        )),
                    c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
                    (this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled")),
                    this._controls.$absolute.on(
                        "click",
                        "button",
                        a.proxy(function (b) {
                            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
                            b.preventDefault(), this.to(d, c.dotsSpeed);
                        }, this)
                    );
                for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
            }),
            (e.prototype.destroy = function () {
                var a, b, c, d, e;
                e = this._core.settings;
                for (a in this._handlers) this.$element.off(a, this._handlers[a]);
                for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
                for (d in this.overides) this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null);
            }),
            (e.prototype.update = function () {
                var a,
                    b,
                    c,
                    d = this._core.clones().length / 2,
                    e = d + this._core.items().length,
                    f = this._core.maximum(!0),
                    g = this._core.settings,
                    h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
                if (("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy))
                    for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                        if (b >= h || 0 === b) {
                            if ((this._pages.push({ start: Math.min(f, a - d), end: a - d + h - 1 }), Math.min(f, a - d) === f)) break;
                            (b = 0), ++c;
                        }
                        b += this._core.mergers(this._core.relative(a));
                    }
            }),
            (e.prototype.draw = function () {
                var b,
                    c = this._core.settings,
                    d = this._core.items().length <= c.items,
                    e = this._core.relative(this._core.current()),
                    f = c.loop || c.rewind;
                this._controls.$relative.toggleClass("disabled", !c.nav || d),
                    c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !c.dots || d),
                    c.dots &&
                        ((b = this._pages.length - this._controls.$absolute.children().length),
                        c.dotsData && 0 !== b
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : b > 0
                            ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0]))
                            : b < 0 && this._controls.$absolute.children().slice(b).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (e.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = { index: a.inArray(this.current(), this._pages), count: this._pages.length, size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items) };
            }),
            (e.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a
                    .grep(
                        this._pages,
                        a.proxy(function (a, c) {
                            return a.start <= b && a.end >= b;
                        }, this)
                    )
                    .pop();
            }),
            (e.prototype.getPosition = function (b) {
                var c,
                    d,
                    e = this._core.settings;
                return (
                    "page" == e.slideBy
                        ? ((c = a.inArray(this.current(), this._pages)), (d = this._pages.length), b ? ++c : --c, (c = this._pages[((c % d) + d) % d].start))
                        : ((c = this._core.relative(this._core.current())), (d = this._core.items().length), b ? (c += e.slideBy) : (c -= e.slideBy)),
                    c
                );
            }),
            (e.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
            }),
            (e.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
            }),
            (e.prototype.to = function (b, c, d) {
                var e;
                !d && this._pages.length ? ((e = this._pages.length), a.proxy(this._overrides.to, this._core)(this._pages[((b % e) + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        "use strict";
        var e = function (c) {
            (this._core = c),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (c) {
                        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!c) return;
                            this._hashes[c] = b.content;
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (c) {
                        if (c.namespace && "position" === c.property.name) {
                            var d = this._core.items(this._core.relative(this._core.current())),
                                e = a
                                    .map(this._hashes, function (a, b) {
                                        return a === d ? b : null;
                                    })
                                    .join();
                            if (!e || b.location.hash.slice(1) === e) return;
                            b.location.hash = e;
                        }
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                a(b).on(
                    "hashchange.owl.navigation",
                    a.proxy(function (a) {
                        var c = b.location.hash.substring(1),
                            e = this._core.$stage.children(),
                            f = this._hashes[c] && e.index(this._hashes[c]);
                        f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0);
                    }, this)
                );
        };
        (e.Defaults = { URLhashListener: !1 }),
            (e.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        function e(b, c) {
            var e = !1,
                f = b.charAt(0).toUpperCase() + b.slice(1);
            return (
                a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
                    if (g[b] !== d) return (e = !c || b), !1;
                }),
                e
            );
        }
        function f(a) {
            return e(a, !0);
        }
        var g = a("<support>").get(0).style,
            h = "Webkit Moz O ms".split(" "),
            i = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            j = {
                csstransforms: function () {
                    return !!e("transform");
                },
                csstransforms3d: function () {
                    return !!e("perspective");
                },
                csstransitions: function () {
                    return !!e("transition");
                },
                cssanimations: function () {
                    return !!e("animation");
                },
            };
        j.csstransitions() && ((a.support.transition = new String(f("transition"))), (a.support.transition.end = i.transition.end[a.support.transition])),
            j.cssanimations() && ((a.support.animation = new String(f("animation"))), (a.support.animation.end = i.animation.end[a.support.animation])),
            j.csstransforms() && ((a.support.transform = new String(f("transform"))), (a.support.transform3d = j.csstransforms3d()));
    })(window.Zepto || window.jQuery, window, document);
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/ !(function () {
    "use strict";
    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        (this.key = "waypoint-" + e),
            (this.options = t.Adapter.extend({}, t.defaults, o)),
            (this.element = this.options.element),
            (this.adapter = new t.Adapter(this.element)),
            (this.callback = o.handler),
            (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
            (this.enabled = this.options.enabled),
            (this.triggerPoint = null),
            (this.group = t.Group.findOrCreate({ name: this.options.group, axis: this.axis })),
            (this.context = t.Context.findOrCreateByElement(this.options.context)),
            t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
            this.group.add(this),
            this.context.add(this),
            (i[this.key] = this),
            (e += 1);
    }
    var e = 0,
        i = {};
    (t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t);
    }),
        (t.prototype.trigger = function (t) {
            this.enabled && this.callback && this.callback.apply(this, t);
        }),
        (t.prototype.destroy = function () {
            this.context.remove(this), this.group.remove(this), delete i[this.key];
        }),
        (t.prototype.disable = function () {
            return (this.enabled = !1), this;
        }),
        (t.prototype.enable = function () {
            return this.context.refresh(), (this.enabled = !0), this;
        }),
        (t.prototype.next = function () {
            return this.group.next(this);
        }),
        (t.prototype.previous = function () {
            return this.group.previous(this);
        }),
        (t.invokeAll = function (t) {
            var e = [];
            for (var o in i) e.push(i[o]);
            for (var n = 0, r = e.length; r > n; n++) e[n][t]();
        }),
        (t.destroyAll = function () {
            t.invokeAll("destroy");
        }),
        (t.disableAll = function () {
            t.invokeAll("disable");
        }),
        (t.enableAll = function () {
            t.Context.refreshAll();
            for (var e in i) i[e].enabled = !0;
            return this;
        }),
        (t.refreshAll = function () {
            t.Context.refreshAll();
        }),
        (t.viewportHeight = function () {
            return window.innerHeight || document.documentElement.clientHeight;
        }),
        (t.viewportWidth = function () {
            return document.documentElement.clientWidth;
        }),
        (t.adapters = []),
        (t.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }),
        (t.offsetAliases = {
            "bottom-in-view": function () {
                return this.context.innerHeight() - this.adapter.outerHeight();
            },
            "right-in-view": function () {
                return this.context.innerWidth() - this.adapter.outerWidth();
            },
        }),
        (window.Waypoint = t);
})(),
    (function () {
        "use strict";
        function t(t) {
            window.setTimeout(t, 1e3 / 60);
        }
        function e(t) {
            (this.element = t),
                (this.Adapter = n.Adapter),
                (this.adapter = new this.Adapter(t)),
                (this.key = "waypoint-context-" + i),
                (this.didScroll = !1),
                (this.didResize = !1),
                (this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }),
                (this.waypoints = { vertical: {}, horizontal: {} }),
                (t.waypointContextKey = this.key),
                (o[t.waypointContextKey] = this),
                (i += 1),
                n.windowContext || ((n.windowContext = !0), (n.windowContext = new e(window))),
                this.createThrottledScrollHandler(),
                this.createThrottledResizeHandler();
        }
        var i = 0,
            o = {},
            n = window.Waypoint,
            r = window.onload;
        (e.prototype.add = function (t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            (this.waypoints[e][t.key] = t), this.refresh();
        }),
            (e.prototype.checkEmpty = function () {
                var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                    e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                    i = this.element == this.element.window;
                t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
            }),
            (e.prototype.createThrottledResizeHandler = function () {
                function t() {
                    e.handleResize(), (e.didResize = !1);
                }
                var e = this;
                this.adapter.on("resize.waypoints", function () {
                    e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.createThrottledScrollHandler = function () {
                function t() {
                    e.handleScroll(), (e.didScroll = !1);
                }
                var e = this;
                this.adapter.on("scroll.waypoints", function () {
                    (!e.didScroll || n.isTouch) && ((e.didScroll = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.handleResize = function () {
                n.Context.refreshAll();
            }),
            (e.prototype.handleScroll = function () {
                var t = {},
                    e = {
                        horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" },
                        vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" },
                    };
                for (var i in e) {
                    var o = e[i],
                        n = o.newScroll > o.oldScroll,
                        r = n ? o.forward : o.backward;
                    for (var s in this.waypoints[i]) {
                        var a = this.waypoints[i][s];
                        if (null !== a.triggerPoint) {
                            var l = o.oldScroll < a.triggerPoint,
                                h = o.newScroll >= a.triggerPoint,
                                p = l && h,
                                u = !l && !h;
                            (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
                        }
                    }
                }
                for (var c in t) t[c].flushTriggers();
                this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
            }),
            (e.prototype.innerHeight = function () {
                return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
            }),
            (e.prototype.remove = function (t) {
                delete this.waypoints[t.axis][t.key], this.checkEmpty();
            }),
            (e.prototype.innerWidth = function () {
                return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
            }),
            (e.prototype.destroy = function () {
                var t = [];
                for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
                for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
            }),
            (e.prototype.refresh = function () {
                var t,
                    e = this.element == this.element.window,
                    i = e ? void 0 : this.adapter.offset(),
                    o = {};
                this.handleScroll(),
                    (t = {
                        horizontal: { contextOffset: e ? 0 : i.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" },
                        vertical: { contextOffset: e ? 0 : i.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" },
                    });
                for (var r in t) {
                    var s = t[r];
                    for (var a in this.waypoints[r]) {
                        var l,
                            h,
                            p,
                            u,
                            c,
                            d = this.waypoints[r][a],
                            f = d.options.offset,
                            w = d.triggerPoint,
                            y = 0,
                            g = null == w;
                        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]),
                            "function" == typeof f ? (f = f.apply(d)) : "string" == typeof f && ((f = parseFloat(f)), d.options.offset.indexOf("%") > -1 && (f = Math.ceil((s.contextDimension * f) / 100))),
                            (l = s.contextScroll - s.contextOffset),
                            (d.triggerPoint = Math.floor(y + l - f)),
                            (h = w < s.oldScroll),
                            (p = d.triggerPoint >= s.oldScroll),
                            (u = h && p),
                            (c = !h && !p),
                            !g && u
                                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                                : !g && c
                                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                                : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
                    }
                }
                return (
                    n.requestAnimationFrame(function () {
                        for (var t in o) o[t].flushTriggers();
                    }),
                    this
                );
            }),
            (e.findOrCreateByElement = function (t) {
                return e.findByElement(t) || new e(t);
            }),
            (e.refreshAll = function () {
                for (var t in o) o[t].refresh();
            }),
            (e.findByElement = function (t) {
                return o[t.waypointContextKey];
            }),
            (window.onload = function () {
                r && r(), e.refreshAll();
            }),
            (n.requestAnimationFrame = function (e) {
                var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
                i.call(window, e);
            }),
            (n.Context = e);
    })(),
    (function () {
        "use strict";
        function t(t, e) {
            return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
            return e.triggerPoint - t.triggerPoint;
        }
        function i(t) {
            (this.name = t.name), (this.axis = t.axis), (this.id = this.name + "-" + this.axis), (this.waypoints = []), this.clearTriggerQueues(), (o[this.axis][this.name] = this);
        }
        var o = { vertical: {}, horizontal: {} },
            n = window.Waypoint;
        (i.prototype.add = function (t) {
            this.waypoints.push(t);
        }),
            (i.prototype.clearTriggerQueues = function () {
                this.triggerQueues = { up: [], down: [], left: [], right: [] };
            }),
            (i.prototype.flushTriggers = function () {
                for (var i in this.triggerQueues) {
                    var o = this.triggerQueues[i],
                        n = "up" === i || "left" === i;
                    o.sort(n ? e : t);
                    for (var r = 0, s = o.length; s > r; r += 1) {
                        var a = o[r];
                        (a.options.continuous || r === o.length - 1) && a.trigger([i]);
                    }
                }
                this.clearTriggerQueues();
            }),
            (i.prototype.next = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints),
                    o = i === this.waypoints.length - 1;
                return o ? null : this.waypoints[i + 1];
            }),
            (i.prototype.previous = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints);
                return i ? this.waypoints[i - 1] : null;
            }),
            (i.prototype.queueTrigger = function (t, e) {
                this.triggerQueues[e].push(t);
            }),
            (i.prototype.remove = function (t) {
                var e = n.Adapter.inArray(t, this.waypoints);
                e > -1 && this.waypoints.splice(e, 1);
            }),
            (i.prototype.first = function () {
                return this.waypoints[0];
            }),
            (i.prototype.last = function () {
                return this.waypoints[this.waypoints.length - 1];
            }),
            (i.findOrCreate = function (t) {
                return o[t.axis][t.name] || new i(t);
            }),
            (n.Group = i);
    })(),
    (function () {
        "use strict";
        function t(t) {
            this.$element = e(t);
        }
        var e = window.jQuery,
            i = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
            t.prototype[i] = function () {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[i].apply(this.$element, t);
            };
        }),
            e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
                t[o] = e[o];
            }),
            i.adapters.push({ name: "jquery", Adapter: t }),
            (i.Adapter = t);
    })(),
    (function () {
        "use strict";
        function t(t) {
            return function () {
                var i = [],
                    o = arguments[0];
                return (
                    t.isFunction(arguments[0]) && ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
                    this.each(function () {
                        var n = t.extend({}, o, { element: this });
                        "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n));
                    }),
                    i
                );
            };
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
    })();
/*!fluidvids.js v2.4.1 | (c) 2014 @toddmotto | https://github.com/toddmotto/fluidvids*/ !(function (e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? (module.exports = t) : (e.fluidvids = t());
})(this, function () {
    "use strict";
    function e(e) {
        return new RegExp("^(https?:)?//(?:" + d.players.join("|") + ").*$", "i").test(e);
    }
    function t(e, t) {
        return (parseInt(e, 10) / parseInt(t, 10)) * 100 + "%";
    }
    function i(i) {
        if ((e(i.src) || e(i.data)) && !i.getAttribute("data-fluidvids")) {
            var n = document.createElement("div");
            i.parentNode.insertBefore(n, i),
                (i.className += (i.className ? " " : "") + "fluidvids-item"),
                i.setAttribute("data-fluidvids", "loaded"),
                (n.className += "fluidvids"),
                (n.style.paddingTop = t(i.height, i.width)),
                n.appendChild(i);
        }
    }
    function n() {
        var e = document.createElement("div");
        (e.innerHTML = "<p>x</p><style>" + o + "</style>"), r.appendChild(e.childNodes[1]);
    }
    var d = { selector: ["iframe", "object"], players: ["www.youtube.com", "player.vimeo.com"] },
        o = [".fluidvids {", "width: 100%; max-width: 100%; position: relative;", "}", ".fluidvids-item {", "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;", "}"].join(""),
        r = document.head || document.getElementsByTagName("head")[0];
    return (
        (d.render = function () {
            for (var e = document.querySelectorAll(d.selector.join()), t = e.length; t--; ) i(e[t]);
        }),
        (d.init = function (e) {
            for (var t in e) d[t] = e[t];
            d.render(), n();
        }),
        d
    );
});
/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */ !(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : (t.PerfectScrollbar = e());
})(this, function () {
    "use strict";
    function t(t) {
        return getComputedStyle(t);
    }
    function e(t, e) {
        for (var i in e) {
            var r = e[i];
            "number" == typeof r && (r += "px"), (t.style[i] = r);
        }
        return t;
    }
    function i(t) {
        var e = document.createElement("div");
        return (e.className = t), e;
    }
    function r(t, e) {
        if (!v) throw new Error("No element matching method supported");
        return v.call(t, e);
    }
    function l(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
    }
    function n(t, e) {
        return Array.prototype.filter.call(t.children, function (t) {
            return r(t, e);
        });
    }
    function o(t, e) {
        var i = t.element.classList,
            r = m.state.scrolling(e);
        i.contains(r) ? clearTimeout(Y[e]) : i.add(r);
    }
    function s(t, e) {
        Y[e] = setTimeout(function () {
            return t.isAlive && t.element.classList.remove(m.state.scrolling(e));
        }, t.settings.scrollingThreshold);
    }
    function a(t, e) {
        o(t, e), s(t, e);
    }
    function c(t) {
        if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0), e;
    }
    function h(t, e, i, r, l) {
        var n = i[0],
            o = i[1],
            s = i[2],
            h = i[3],
            u = i[4],
            d = i[5];
        void 0 === r && (r = !0), void 0 === l && (l = !1);
        var f = t.element;
        (t.reach[h] = null),
            f[s] < 1 && (t.reach[h] = "start"),
            f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"),
            e && (f.dispatchEvent(c("ps-scroll-" + h)), e < 0 ? f.dispatchEvent(c("ps-scroll-" + u)) : e > 0 && f.dispatchEvent(c("ps-scroll-" + d)), r && a(t, h)),
            t.reach[h] && (e || l) && f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]));
    }
    function u(t) {
        return parseInt(t, 10) || 0;
    }
    function d(t) {
        return r(t, "input,[contenteditable]") || r(t, "select,[contenteditable]") || r(t, "textarea,[contenteditable]") || r(t, "button,[contenteditable]");
    }
    function f(e) {
        var i = t(e);
        return u(i.width) + u(i.paddingLeft) + u(i.paddingRight) + u(i.borderLeftWidth) + u(i.borderRightWidth);
    }
    function p(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e;
    }
    function b(t, i) {
        var r = { width: i.railXWidth },
            l = Math.floor(t.scrollTop);
        i.isRtl ? (r.left = i.negativeScrollAdjustment + t.scrollLeft + i.containerWidth - i.contentWidth) : (r.left = t.scrollLeft),
            i.isScrollbarXUsingBottom ? (r.bottom = i.scrollbarXBottom - l) : (r.top = i.scrollbarXTop + l),
            e(i.scrollbarXRail, r);
        var n = { top: l, height: i.railYHeight };
        i.isScrollbarYUsingRight
            ? i.isRtl
                ? (n.right = i.contentWidth - (i.negativeScrollAdjustment + t.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth)
                : (n.right = i.scrollbarYRight - t.scrollLeft)
            : i.isRtl
            ? (n.left = i.negativeScrollAdjustment + t.scrollLeft + 2 * i.containerWidth - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth)
            : (n.left = i.scrollbarYLeft + t.scrollLeft),
            e(i.scrollbarYRail, n),
            e(i.scrollbarX, { left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth }),
            e(i.scrollbarY, { top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth });
    }
    function g(t, e) {
        function i(e) {
            (b[d] = g + Y * (e[a] - v)), o(t, f), R(t), e.stopPropagation(), e.preventDefault();
        }
        function r() {
            s(t, f), t[p].classList.remove(m.state.clicking), t.event.unbind(t.ownerDocument, "mousemove", i);
        }
        var l = e[0],
            n = e[1],
            a = e[2],
            c = e[3],
            h = e[4],
            u = e[5],
            d = e[6],
            f = e[7],
            p = e[8],
            b = t.element,
            g = null,
            v = null,
            Y = null;
        t.event.bind(t[h], "mousedown", function (e) {
            (g = b[d]),
                (v = e[a]),
                (Y = (t[n] - t[l]) / (t[c] - t[u])),
                t.event.bind(t.ownerDocument, "mousemove", i),
                t.event.once(t.ownerDocument, "mouseup", r),
                t[p].classList.add(m.state.clicking),
                e.stopPropagation(),
                e.preventDefault();
        });
    }
    var v = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector),
        m = {
            main: "ps",
            element: {
                thumb: function (t) {
                    return "ps__thumb-" + t;
                },
                rail: function (t) {
                    return "ps__rail-" + t;
                },
                consuming: "ps__child--consume",
            },
            state: {
                focus: "ps--focus",
                clicking: "ps--clicking",
                active: function (t) {
                    return "ps--active-" + t;
                },
                scrolling: function (t) {
                    return "ps--scrolling-" + t;
                },
            },
        },
        Y = { x: null, y: null },
        X = function (t) {
            (this.element = t), (this.handlers = {});
        },
        w = { isEmpty: { configurable: !0 } };
    (X.prototype.bind = function (t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, !1);
    }),
        (X.prototype.unbind = function (t, e) {
            var i = this;
            this.handlers[t] = this.handlers[t].filter(function (r) {
                return !(!e || r === e) || (i.element.removeEventListener(t, r, !1), !1);
            });
        }),
        (X.prototype.unbindAll = function () {
            var t = this;
            for (var e in t.handlers) t.unbind(e);
        }),
        (w.isEmpty.get = function () {
            var t = this;
            return Object.keys(this.handlers).every(function (e) {
                return 0 === t.handlers[e].length;
            });
        }),
        Object.defineProperties(X.prototype, w);
    var y = function () {
        this.eventElements = [];
    };
    (y.prototype.eventElement = function (t) {
        var e = this.eventElements.filter(function (e) {
            return e.element === t;
        })[0];
        return e || ((e = new X(t)), this.eventElements.push(e)), e;
    }),
        (y.prototype.bind = function (t, e, i) {
            this.eventElement(t).bind(e, i);
        }),
        (y.prototype.unbind = function (t, e, i) {
            var r = this.eventElement(t);
            r.unbind(e, i), r.isEmpty && this.eventElements.splice(this.eventElements.indexOf(r), 1);
        }),
        (y.prototype.unbindAll = function () {
            this.eventElements.forEach(function (t) {
                return t.unbindAll();
            }),
                (this.eventElements = []);
        }),
        (y.prototype.once = function (t, e, i) {
            var r = this.eventElement(t),
                l = function (t) {
                    r.unbind(e, l), i(t);
                };
            r.bind(e, l);
        });
    var W = function (t, e, i, r, l) {
            void 0 === r && (r = !0), void 0 === l && (l = !1);
            var n;
            if ("top" === e) n = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
            else {
                if ("left" !== e) throw new Error("A proper axis should be provided");
                n = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
            }
            h(t, i, n, r, l);
        },
        L = {
            isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch)),
            supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
            isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent),
        },
        R = function (t) {
            var e = t.element,
                i = Math.floor(e.scrollTop);
            (t.containerWidth = e.clientWidth),
                (t.containerHeight = e.clientHeight),
                (t.contentWidth = e.scrollWidth),
                (t.contentHeight = e.scrollHeight),
                e.contains(t.scrollbarXRail) ||
                    (n(e, m.element.rail("x")).forEach(function (t) {
                        return l(t);
                    }),
                    e.appendChild(t.scrollbarXRail)),
                e.contains(t.scrollbarYRail) ||
                    (n(e, m.element.rail("y")).forEach(function (t) {
                        return l(t);
                    }),
                    e.appendChild(t.scrollbarYRail)),
                !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth
                    ? ((t.scrollbarXActive = !0),
                      (t.railXWidth = t.containerWidth - t.railXMarginWidth),
                      (t.railXRatio = t.containerWidth / t.railXWidth),
                      (t.scrollbarXWidth = p(t, u((t.railXWidth * t.containerWidth) / t.contentWidth))),
                      (t.scrollbarXLeft = u(((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth)) / (t.contentWidth - t.containerWidth))))
                    : (t.scrollbarXActive = !1),
                !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight
                    ? ((t.scrollbarYActive = !0),
                      (t.railYHeight = t.containerHeight - t.railYMarginHeight),
                      (t.railYRatio = t.containerHeight / t.railYHeight),
                      (t.scrollbarYHeight = p(t, u((t.railYHeight * t.containerHeight) / t.contentHeight))),
                      (t.scrollbarYTop = u((i * (t.railYHeight - t.scrollbarYHeight)) / (t.contentHeight - t.containerHeight))))
                    : (t.scrollbarYActive = !1),
                t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
                t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
                b(e, t),
                t.scrollbarXActive ? e.classList.add(m.state.active("x")) : (e.classList.remove(m.state.active("x")), (t.scrollbarXWidth = 0), (t.scrollbarXLeft = 0), (e.scrollLeft = 0)),
                t.scrollbarYActive ? e.classList.add(m.state.active("y")) : (e.classList.remove(m.state.active("y")), (t.scrollbarYHeight = 0), (t.scrollbarYTop = 0), (e.scrollTop = 0));
        },
        T = {
            "click-rail": function (t) {
                t.event.bind(t.scrollbarY, "mousedown", function (t) {
                    return t.stopPropagation();
                }),
                    t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
                        var i = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1;
                        (t.element.scrollTop += i * t.containerHeight), R(t), e.stopPropagation();
                    }),
                    t.event.bind(t.scrollbarX, "mousedown", function (t) {
                        return t.stopPropagation();
                    }),
                    t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
                        var i = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1;
                        (t.element.scrollLeft += i * t.containerWidth), R(t), e.stopPropagation();
                    });
            },
            "drag-thumb": function (t) {
                g(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]),
                    g(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"]);
            },
            keyboard: function (t) {
                function e(e, r) {
                    var l = Math.floor(i.scrollTop);
                    if (0 === e) {
                        if (!t.scrollbarYActive) return !1;
                        if ((0 === l && r > 0) || (l >= t.contentHeight - t.containerHeight && r < 0)) return !t.settings.wheelPropagation;
                    }
                    var n = i.scrollLeft;
                    if (0 === r) {
                        if (!t.scrollbarXActive) return !1;
                        if ((0 === n && e < 0) || (n >= t.contentWidth - t.containerWidth && e > 0)) return !t.settings.wheelPropagation;
                    }
                    return !0;
                }
                var i = t.element,
                    l = function () {
                        return r(i, ":hover");
                    },
                    n = function () {
                        return r(t.scrollbarX, ":focus") || r(t.scrollbarY, ":focus");
                    };
                t.event.bind(t.ownerDocument, "keydown", function (r) {
                    if (!((r.isDefaultPrevented && r.isDefaultPrevented()) || r.defaultPrevented) && (l() || n())) {
                        var o = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                        if (o) {
                            if ("IFRAME" === o.tagName) o = o.contentDocument.activeElement;
                            else for (; o.shadowRoot; ) o = o.shadowRoot.activeElement;
                            if (d(o)) return;
                        }
                        var s = 0,
                            a = 0;
                        switch (r.which) {
                            case 37:
                                s = r.metaKey ? -t.contentWidth : r.altKey ? -t.containerWidth : -30;
                                break;
                            case 38:
                                a = r.metaKey ? t.contentHeight : r.altKey ? t.containerHeight : 30;
                                break;
                            case 39:
                                s = r.metaKey ? t.contentWidth : r.altKey ? t.containerWidth : 30;
                                break;
                            case 40:
                                a = r.metaKey ? -t.contentHeight : r.altKey ? -t.containerHeight : -30;
                                break;
                            case 32:
                                a = r.shiftKey ? t.containerHeight : -t.containerHeight;
                                break;
                            case 33:
                                a = t.containerHeight;
                                break;
                            case 34:
                                a = -t.containerHeight;
                                break;
                            case 36:
                                a = t.contentHeight;
                                break;
                            case 35:
                                a = -t.contentHeight;
                                break;
                            default:
                                return;
                        }
                        (t.settings.suppressScrollX && 0 !== s) || (t.settings.suppressScrollY && 0 !== a) || ((i.scrollTop -= a), (i.scrollLeft += s), R(t), e(s, a) && r.preventDefault());
                    }
                });
            },
            wheel: function (e) {
                function i(t, i) {
                    var r = Math.floor(o.scrollTop),
                        l = 0 === o.scrollTop,
                        n = r + o.offsetHeight === o.scrollHeight,
                        s = 0 === o.scrollLeft,
                        a = o.scrollLeft + o.offsetWidth === o.scrollWidth;
                    return !(Math.abs(i) > Math.abs(t) ? l || n : s || a) || !e.settings.wheelPropagation;
                }
                function r(t) {
                    var e = t.deltaX,
                        i = -1 * t.deltaY;
                    return (
                        (void 0 !== e && void 0 !== i) || ((e = (-1 * t.wheelDeltaX) / 6), (i = t.wheelDeltaY / 6)),
                        t.deltaMode && 1 === t.deltaMode && ((e *= 10), (i *= 10)),
                        e !== e && i !== i && ((e = 0), (i = t.wheelDelta)),
                        t.shiftKey ? [-i, -e] : [e, i]
                    );
                }
                function l(e, i, r) {
                    if (!L.isWebKit && o.querySelector("select:focus")) return !0;
                    if (!o.contains(e)) return !1;
                    for (var l = e; l && l !== o; ) {
                        if (l.classList.contains(m.element.consuming)) return !0;
                        var n = t(l);
                        if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                            var s = l.scrollHeight - l.clientHeight;
                            if (s > 0 && !((0 === l.scrollTop && r > 0) || (l.scrollTop === s && r < 0))) return !0;
                            var a = l.scrollWidth - l.clientWidth;
                            if (a > 0 && !((0 === l.scrollLeft && i < 0) || (l.scrollLeft === a && i > 0))) return !0;
                        }
                        l = l.parentNode;
                    }
                    return !1;
                }
                function n(t) {
                    var n = r(t),
                        s = n[0],
                        a = n[1];
                    if (!l(t.target, s, a)) {
                        var c = !1;
                        e.settings.useBothWheelAxes
                            ? e.scrollbarYActive && !e.scrollbarXActive
                                ? (a ? (o.scrollTop -= a * e.settings.wheelSpeed) : (o.scrollTop += s * e.settings.wheelSpeed), (c = !0))
                                : e.scrollbarXActive && !e.scrollbarYActive && (s ? (o.scrollLeft += s * e.settings.wheelSpeed) : (o.scrollLeft -= a * e.settings.wheelSpeed), (c = !0))
                            : ((o.scrollTop -= a * e.settings.wheelSpeed), (o.scrollLeft += s * e.settings.wheelSpeed)),
                            R(e),
                            (c = c || i(s, a)) && !t.ctrlKey && (t.stopPropagation(), t.preventDefault());
                    }
                }
                var o = e.element;
                void 0 !== window.onwheel ? e.event.bind(o, "wheel", n) : void 0 !== window.onmousewheel && e.event.bind(o, "mousewheel", n);
            },
            touch: function (e) {
                function i(t, i) {
                    var r = Math.floor(h.scrollTop),
                        l = h.scrollLeft,
                        n = Math.abs(t),
                        o = Math.abs(i);
                    if (o > n) {
                        if ((i < 0 && r === e.contentHeight - e.containerHeight) || (i > 0 && 0 === r)) return 0 === window.scrollY && i > 0 && L.isChrome;
                    } else if (n > o && ((t < 0 && l === e.contentWidth - e.containerWidth) || (t > 0 && 0 === l))) return !0;
                    return !0;
                }
                function r(t, i) {
                    (h.scrollTop -= i), (h.scrollLeft -= t), R(e);
                }
                function l(t) {
                    return t.targetTouches ? t.targetTouches[0] : t;
                }
                function n(t) {
                    return !(
                        (t.pointerType && "pen" === t.pointerType && 0 === t.buttons) ||
                        ((!t.targetTouches || 1 !== t.targetTouches.length) && (!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
                    );
                }
                function o(t) {
                    if (n(t)) {
                        var e = l(t);
                        (u.pageX = e.pageX), (u.pageY = e.pageY), (d = new Date().getTime()), null !== p && clearInterval(p);
                    }
                }
                function s(e, i, r) {
                    if (!h.contains(e)) return !1;
                    for (var l = e; l && l !== h; ) {
                        if (l.classList.contains(m.element.consuming)) return !0;
                        var n = t(l);
                        if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                            var o = l.scrollHeight - l.clientHeight;
                            if (o > 0 && !((0 === l.scrollTop && r > 0) || (l.scrollTop === o && r < 0))) return !0;
                            var s = l.scrollLeft - l.clientWidth;
                            if (s > 0 && !((0 === l.scrollLeft && i < 0) || (l.scrollLeft === s && i > 0))) return !0;
                        }
                        l = l.parentNode;
                    }
                    return !1;
                }
                function a(t) {
                    if (n(t)) {
                        var e = l(t),
                            o = { pageX: e.pageX, pageY: e.pageY },
                            a = o.pageX - u.pageX,
                            c = o.pageY - u.pageY;
                        if (s(t.target, a, c)) return;
                        r(a, c), (u = o);
                        var h = new Date().getTime(),
                            p = h - d;
                        p > 0 && ((f.x = a / p), (f.y = c / p), (d = h)), i(a, c) && t.preventDefault();
                    }
                }
                function c() {
                    e.settings.swipeEasing &&
                        (clearInterval(p),
                        (p = setInterval(function () {
                            e.isInitialized ? clearInterval(p) : f.x || f.y ? (Math.abs(f.x) < 0.01 && Math.abs(f.y) < 0.01 ? clearInterval(p) : (r(30 * f.x, 30 * f.y), (f.x *= 0.8), (f.y *= 0.8))) : clearInterval(p);
                        }, 10)));
                }
                if (L.supportsTouch || L.supportsIePointer) {
                    var h = e.element,
                        u = {},
                        d = 0,
                        f = {},
                        p = null;
                    L.supportsTouch
                        ? (e.event.bind(h, "touchstart", o), e.event.bind(h, "touchmove", a), e.event.bind(h, "touchend", c))
                        : L.supportsIePointer &&
                          (window.PointerEvent
                              ? (e.event.bind(h, "pointerdown", o), e.event.bind(h, "pointermove", a), e.event.bind(h, "pointerup", c))
                              : window.MSPointerEvent && (e.event.bind(h, "MSPointerDown", o), e.event.bind(h, "MSPointerMove", a), e.event.bind(h, "MSPointerUp", c)));
                }
            },
        },
        H = function (r, l) {
            var n = this;
            if ((void 0 === l && (l = {}), "string" == typeof r && (r = document.querySelector(r)), !r || !r.nodeName)) throw new Error("no element is specified to initialize PerfectScrollbar");
            (this.element = r),
                r.classList.add(m.main),
                (this.settings = {
                    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
                    maxScrollbarLength: null,
                    minScrollbarLength: null,
                    scrollingThreshold: 1e3,
                    scrollXMarginOffset: 0,
                    scrollYMarginOffset: 0,
                    suppressScrollX: !1,
                    suppressScrollY: !1,
                    swipeEasing: !0,
                    useBothWheelAxes: !1,
                    wheelPropagation: !0,
                    wheelSpeed: 1,
                });
            for (var o in l) n.settings[o] = l[o];
            (this.containerWidth = null), (this.containerHeight = null), (this.contentWidth = null), (this.contentHeight = null);
            var s = function () {
                    return r.classList.add(m.state.focus);
                },
                a = function () {
                    return r.classList.remove(m.state.focus);
                };
            (this.isRtl = "rtl" === t(r).direction),
                (this.isNegativeScroll = (function () {
                    var t = r.scrollLeft,
                        e = null;
                    return (r.scrollLeft = -1), (e = r.scrollLeft < 0), (r.scrollLeft = t), e;
                })()),
                (this.negativeScrollAdjustment = this.isNegativeScroll ? r.scrollWidth - r.clientWidth : 0),
                (this.event = new y()),
                (this.ownerDocument = r.ownerDocument || document),
                (this.scrollbarXRail = i(m.element.rail("x"))),
                r.appendChild(this.scrollbarXRail),
                (this.scrollbarX = i(m.element.thumb("x"))),
                this.scrollbarXRail.appendChild(this.scrollbarX),
                this.scrollbarX.setAttribute("tabindex", 0),
                this.event.bind(this.scrollbarX, "focus", s),
                this.event.bind(this.scrollbarX, "blur", a),
                (this.scrollbarXActive = null),
                (this.scrollbarXWidth = null),
                (this.scrollbarXLeft = null);
            var c = t(this.scrollbarXRail);
            (this.scrollbarXBottom = parseInt(c.bottom, 10)),
                isNaN(this.scrollbarXBottom) ? ((this.isScrollbarXUsingBottom = !1), (this.scrollbarXTop = u(c.top))) : (this.isScrollbarXUsingBottom = !0),
                (this.railBorderXWidth = u(c.borderLeftWidth) + u(c.borderRightWidth)),
                e(this.scrollbarXRail, { display: "block" }),
                (this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight)),
                e(this.scrollbarXRail, { display: "" }),
                (this.railXWidth = null),
                (this.railXRatio = null),
                (this.scrollbarYRail = i(m.element.rail("y"))),
                r.appendChild(this.scrollbarYRail),
                (this.scrollbarY = i(m.element.thumb("y"))),
                this.scrollbarYRail.appendChild(this.scrollbarY),
                this.scrollbarY.setAttribute("tabindex", 0),
                this.event.bind(this.scrollbarY, "focus", s),
                this.event.bind(this.scrollbarY, "blur", a),
                (this.scrollbarYActive = null),
                (this.scrollbarYHeight = null),
                (this.scrollbarYTop = null);
            var h = t(this.scrollbarYRail);
            (this.scrollbarYRight = parseInt(h.right, 10)),
                isNaN(this.scrollbarYRight) ? ((this.isScrollbarYUsingRight = !1), (this.scrollbarYLeft = u(h.left))) : (this.isScrollbarYUsingRight = !0),
                (this.scrollbarYOuterWidth = this.isRtl ? f(this.scrollbarY) : null),
                (this.railBorderYWidth = u(h.borderTopWidth) + u(h.borderBottomWidth)),
                e(this.scrollbarYRail, { display: "block" }),
                (this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom)),
                e(this.scrollbarYRail, { display: "" }),
                (this.railYHeight = null),
                (this.railYRatio = null),
                (this.reach = {
                    x: r.scrollLeft <= 0 ? "start" : r.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
                    y: r.scrollTop <= 0 ? "start" : r.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null,
                }),
                (this.isAlive = !0),
                this.settings.handlers.forEach(function (t) {
                    return T[t](n);
                }),
                (this.lastScrollTop = Math.floor(r.scrollTop)),
                (this.lastScrollLeft = r.scrollLeft),
                this.event.bind(this.element, "scroll", function (t) {
                    return n.onScroll(t);
                }),
                R(this);
        };
    return (
        (H.prototype.update = function () {
            this.isAlive &&
                ((this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0),
                e(this.scrollbarXRail, { display: "block" }),
                e(this.scrollbarYRail, { display: "block" }),
                (this.railXMarginWidth = u(t(this.scrollbarXRail).marginLeft) + u(t(this.scrollbarXRail).marginRight)),
                (this.railYMarginHeight = u(t(this.scrollbarYRail).marginTop) + u(t(this.scrollbarYRail).marginBottom)),
                e(this.scrollbarXRail, { display: "none" }),
                e(this.scrollbarYRail, { display: "none" }),
                R(this),
                W(this, "top", 0, !1, !0),
                W(this, "left", 0, !1, !0),
                e(this.scrollbarXRail, { display: "" }),
                e(this.scrollbarYRail, { display: "" }));
        }),
        (H.prototype.onScroll = function (t) {
            this.isAlive &&
                (R(this),
                W(this, "top", this.element.scrollTop - this.lastScrollTop),
                W(this, "left", this.element.scrollLeft - this.lastScrollLeft),
                (this.lastScrollTop = Math.floor(this.element.scrollTop)),
                (this.lastScrollLeft = this.element.scrollLeft));
        }),
        (H.prototype.destroy = function () {
            this.isAlive &&
                (this.event.unbindAll(),
                l(this.scrollbarX),
                l(this.scrollbarY),
                l(this.scrollbarXRail),
                l(this.scrollbarYRail),
                this.removePsClasses(),
                (this.element = null),
                (this.scrollbarX = null),
                (this.scrollbarY = null),
                (this.scrollbarXRail = null),
                (this.scrollbarYRail = null),
                (this.isAlive = !1));
        }),
        (H.prototype.removePsClasses = function () {
            this.element.className = this.element.className
                .split(" ")
                .filter(function (t) {
                    return !t.match(/^ps([-_].+|)$/);
                })
                .join(" ");
        }),
        H
    );
});
/*!
 * VERSION: 1.9.0
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/ var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var a = (_gsScope.document || {}).documentElement,
        b = _gsScope,
        c = function (c, d) {
            var e = "x" === d ? "Width" : "Height",
                f = "scroll" + e,
                g = "client" + e,
                h = document.body;
            return c === b || c === a || c === h ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g]) : c[f] - c["offset" + e];
        },
        d = function (a) {
            return "string" == typeof a && (a = TweenLite.selector(a)), a.length && a !== b && a[0] && a[0].style && !a.nodeType && (a = a[0]), a === b || (a.nodeType && a.style) ? a : null;
        },
        e = function (c, d) {
            var e = "scroll" + ("x" === d ? "Left" : "Top");
            return (
                c === b && (null != c.pageXOffset ? (e = "page" + d.toUpperCase() + "Offset") : (c = null != a[e] ? a : document.body)),
                function () {
                    return c[e];
                }
            );
        },
        f = function (c, f) {
            var g = d(c).getBoundingClientRect(),
                h = !f || f === b || f === document.body,
                i = (h ? a : f).getBoundingClientRect(),
                j = { x: g.left - i.left, y: g.top - i.top };
            return !h && f && ((j.x += e(f, "x")()), (j.y += e(f, "y")())), j;
        },
        g = function (a, b, d) {
            var e = typeof a;
            return isNaN(a) ? ("number" === e || ("string" === e && "=" === a.charAt(1)) ? a : "max" === a ? c(b, d) : Math.min(c(b, d), f(a, b)[d])) : parseFloat(a);
        },
        h = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            global: !0,
            version: "1.9.0",
            init: function (a, c, d) {
                return (
                    (this._wdw = a === b),
                    (this._target = a),
                    (this._tween = d),
                    "object" != typeof c ? ((c = { y: c }), "string" == typeof c.y && "max" !== c.y && "=" !== c.y.charAt(1) && (c.x = c.y)) : c.nodeType && (c = { y: c, x: c }),
                    (this.vars = c),
                    (this._autoKill = c.autoKill !== !1),
                    (this.getX = e(a, "x")),
                    (this.getY = e(a, "y")),
                    (this.x = this.xPrev = this.getX()),
                    (this.y = this.yPrev = this.getY()),
                    null != c.x ? (this._addTween(this, "x", this.x, g(c.x, a, "x") - (c.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : (this.skipX = !0),
                    null != c.y ? (this._addTween(this, "y", this.y, g(c.y, a, "y") - (c.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : (this.skipY = !0),
                    !0
                );
            },
            set: function (a) {
                this._super.setRatio.call(this, a);
                var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    f = e - this.yPrev,
                    g = d - this.xPrev,
                    i = h.autoKillThreshold;
                this.x < 0 && (this.x = 0),
                    this.y < 0 && (this.y = 0),
                    this._autoKill &&
                        (!this.skipX && (g > i || -i > g) && d < c(this._target, "x") && (this.skipX = !0),
                        !this.skipY && (f > i || -i > f) && e < c(this._target, "y") && (this.skipY = !0),
                        this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
                    this._wdw ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
                    (this.xPrev = this.x),
                    (this.yPrev = this.y);
            },
        }),
        i = h.prototype;
    (h.max = c),
        (h.getOffset = f),
        (h.buildGetter = e),
        (h.autoKillThreshold = 7),
        (i._kill = function (a) {
            return a.scrollTo_x && (this.skipX = !0), a.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, a);
        });
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (a) {
        "use strict";
        var b = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[a];
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.min.html"), (module.exports = b())) : "function" == typeof define && define.amd && define(["TweenLite"], b);
    })("ScrollToPlugin");
(function ($) {
    "use strict";
    var $window = $(window);
    var windowHeight = $window.height();
    $window.resize(function () {
        windowHeight = $window.height();
    });
    $.fn.parallax = function (xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        $this.each(function () {
            firstTop = $this.offset().top;
        });
        if (outerHeight) {
            getHeight = function (jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function (jqo) {
                return jqo.height();
            };
        }
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;
        function update() {
            var pos = $window.scrollTop();
            $this.each(function () {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                $this.css("backgroundPosition", xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind("scroll", update).resize(update);
        update();
    };
})(jQuery);
/*!waitForImages jQuery Plugin 2018-02-13*/ !(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a(require("jquery"))) : a(jQuery);
})(function (a) {
    var b = "waitForImages",
        c = (function (a) {
            return a.srcset && a.sizes;
        })(new Image());
    (a.waitForImages = { hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"], hasImageAttributes: ["srcset"] }),
        (a.expr.pseudos["has-src"] = function (b) {
            return a(b).is('img[src][src!=""]');
        }),
        (a.expr.pseudos.uncached = function (b) {
            return !!a(b).is(":has-src") && !b.complete;
        }),
        (a.fn.waitForImages = function () {
            var d,
                e,
                f,
                g = 0,
                h = 0,
                i = a.Deferred(),
                j = this,
                k = [],
                l = a.waitForImages.hasImageProperties || [],
                m = a.waitForImages.hasImageAttributes || [],
                n = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            if (
                (a.isPlainObject(arguments[0])
                    ? ((f = arguments[0].waitForAll), (e = arguments[0].each), (d = arguments[0].finished))
                    : 1 === arguments.length && "boolean" === a.type(arguments[0])
                    ? (f = arguments[0])
                    : ((d = arguments[0]), (e = arguments[1]), (f = arguments[2])),
                (d = d || a.noop),
                (e = e || a.noop),
                (f = !!f),
                !a.isFunction(d) || !a.isFunction(e))
            )
                throw new TypeError("An invalid callback was supplied.");
            return (
                this.each(function () {
                    var b = a(this);
                    f
                        ? b
                              .find("*")
                              .addBack()
                              .each(function () {
                                  var b = a(this);
                                  b.is("img:has-src") && !b.is("[srcset]") && k.push({ src: b.attr("src"), element: b[0] }),
                                      a.each(l, function (a, c) {
                                          var d,
                                              e = b.css(c);
                                          if (!e) return !0;
                                          for (; (d = n.exec(e)); ) k.push({ src: d[2], element: b[0] });
                                      }),
                                      a.each(m, function (a, c) {
                                          var d = b.attr(c);
                                          return !d || void k.push({ src: b.attr("src"), srcset: b.attr("srcset"), element: b[0] });
                                      });
                              })
                        : b.find("img:has-src").each(function () {
                              k.push({ src: this.src, element: this });
                          });
                }),
                (g = k.length),
                (h = 0),
                0 === g && (d.call(j), i.resolveWith(j)),
                a.each(k, function (f, k) {
                    var l = new Image(),
                        m = "load." + b + " error." + b;
                    a(l).one(m, function b(c) {
                        var f = [h, g, "load" == c.type];
                        if ((h++, e.apply(k.element, f), i.notifyWith(k.element, f), a(this).off(m, b), h == g)) return d.call(j[0]), i.resolveWith(j[0]), !1;
                    }),
                        c && k.srcset && ((l.srcset = k.srcset), (l.sizes = k.sizes)),
                        (l.src = k.src);
                }),
                i.promise()
            );
        });
});
!(function (t) {
    function e() {
        var t = location.href;
        return (hashtag = -1 !== t.indexOf("#prettyPhoto") && decodeURI(t.substring(t.indexOf("#prettyPhoto") + 1, t.length))), hashtag && (hashtag = hashtag.replace(/<|>/g, "")), hashtag;
    }
    function i(t, e) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var i = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(e);
        return null === i ? "" : i[1];
    }
    (t.prettyPhoto = { version: "4.0.0" }),
        (t.fn.prettyPhoto = function (p) {
            p = jQuery.extend(
                {
                    hook: "rel",
                    animation_speed: "fast",
                    ajaxcallback: function () {},
                    slideshow: 5e3,
                    autoplay_slideshow: !1,
                    opacity: 0.8,
                    show_title: !0,
                    allow_resize: !0,
                    allow_expand: !0,
                    default_width: 500,
                    default_height: 344,
                    counter_separator_label: "/",
                    theme: "pp_default",
                    horizontal_padding: 20,
                    hideflash: !1,
                    wmode: "opaque",
                    autoplay: !0,
                    modal: !1,
                    deeplinking: !0,
                    overlay_gallery: !0,
                    overlay_gallery_max: 30,
                    keyboard_shortcuts: !0,
                    changepicturecallback: function () {},
                    callback: function () {},
                    ie6_fallback: !0,
                    markup:
                        '<div class="pp_pic_holder"> \t\t\t\t\t\t<div class="ppt">&nbsp;</div> \t\t\t\t\t\t<div class="pp_top"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_content_container"> \t\t\t\t\t\t\t<div class="pp_left"> \t\t\t\t\t\t\t<div class="pp_right"> \t\t\t\t\t\t\t\t<div class="pp_content"> \t\t\t\t\t\t\t\t\t<div class="pp_loaderIcon"></div> \t\t\t\t\t\t\t\t\t<div class="pp_fade"> \t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_expand" title="Expand the image">Expand</a> \t\t\t\t\t\t\t\t\t\t<div class="pp_hoverContainer"> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_next" href="#">next</a> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_previous" href="#">previous</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t<div id="pp_full_res"></div> \t\t\t\t\t\t\t\t\t\t<div class="pp_details"> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_nav"> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t\t\t\t\t<p class="currentTextHolder">0/0</p> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t<p class="pp_description"></p> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_social">{pp_social}</div> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_close" href="#">Close</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_bottom"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t\t<div class="pp_overlay"></div>',
                    gallery_markup:
                        '<div class="pp_gallery"> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t<div> \t\t\t\t\t\t\t\t\t<ul> \t\t\t\t\t\t\t\t\t\t{gallery} \t\t\t\t\t\t\t\t\t</ul> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t</div>',
                    image_markup: '<img id="fullResImage" src="{path}" />',
                    flash_markup:
                        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
                    quicktime_markup:
                        '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
                    iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" allowfullscreen="true"></iframe>',
                    inline_markup: '<div class="pp_inline">{content}</div>',
                    custom_markup: "",
                    social_tools:
                        '<div class="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="../../platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>',
                },
                p
            );
            var o,
                a,
                s,
                n,
                l,
                r,
                d,
                h = this,
                c = !1,
                _ = t(window).height(),
                g = t(window).width();
            function m() {
                t(".pp_loaderIcon").hide(),
                    (projectedTop = scroll_pos.scrollTop + (_ / 2 - o.containerHeight / 2)),
                    projectedTop < 0 && (projectedTop = 0),
                    $ppt.fadeTo(settings.animation_speed, 1),
                    $pp_pic_holder.find(".pp_content").animate({ height: o.contentHeight, width: o.contentWidth }, settings.animation_speed),
                    $pp_pic_holder.animate({ top: projectedTop, left: g / 2 - o.containerWidth / 2 < 0 ? 0 : g / 2 - o.containerWidth / 2, width: o.containerWidth }, settings.animation_speed, function () {
                        $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(o.height).width(o.width),
                            $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed),
                            isSet && "image" === y(pp_images[set_position]) ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(),
                            settings.allow_expand && (o.resized ? t("a.pp_expand,a.pp_contract").show() : t("a.pp_expand").hide()),
                            !settings.autoplay_slideshow || d || a || t.prettyPhoto.startSlideshow(),
                            settings.changepicturecallback(),
                            (a = !0);
                    }),
                    isSet && settings.overlay_gallery && "image" === y(pp_images[set_position])
                        ? ((itemWidth = 57),
                          (navWidth = "facebook" === settings.theme || "pp_default" === settings.theme ? 50 : 30),
                          (itemsPerPage = Math.floor((o.containerWidth - 100 - navWidth) / itemWidth)),
                          (itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length),
                          (totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1),
                          0 === totalPage ? ((navWidth = 0), $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(),
                          (galleryWidth = itemsPerPage * itemWidth),
                          (fullGalleryWidth = pp_images.length * itemWidth),
                          $pp_gallery
                              .css("margin-left", -(galleryWidth / 2 + navWidth / 2))
                              .find("div:first")
                              .width(galleryWidth + 5)
                              .find("ul")
                              .width(fullGalleryWidth)
                              .find("li.selected")
                              .removeClass("selected"),
                          (goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage),
                          t.prettyPhoto.changeGalleryPage(goToPage),
                          $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected"))
                        : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave"),
                    p.ajaxcallback();
            }
            function u(e) {
                $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"),
                    $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
                        t(".pp_loaderIcon").show(), e();
                    });
            }
            function f(t, e) {
                if (((resized = !1), v(t, e), (imageWidth = t), (imageHeight = e), (r > g || l > _) && doresize && settings.allow_resize && !c)) {
                    for (resized = !0, fitting = !1; !fitting; )
                        r > g ? ((imageWidth = g - 200), (imageHeight = (e / t) * imageWidth)) : l > _ ? ((imageHeight = _ - 200), (imageWidth = (t / e) * imageHeight)) : (fitting = !0), (l = imageHeight), (r = imageWidth);
                    (r > g || l > _) && f(r, l), v(imageWidth, imageHeight);
                }
                return {
                    width: Math.floor(imageWidth),
                    height: Math.floor(imageHeight),
                    containerHeight: Math.floor(l),
                    containerWidth: Math.floor(r) + 2 * settings.horizontal_padding,
                    contentHeight: Math.floor(s),
                    contentWidth: Math.floor(n),
                    resized: resized,
                };
            }
            function v(e, i) {
                (e = parseFloat(e)),
                    (i = parseFloat(i)),
                    ($pp_details = $pp_pic_holder.find(".pp_details")),
                    $pp_details.width(e),
                    (detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"))),
                    ($pp_details = $pp_details.clone().addClass(settings.theme).width(e).appendTo(t("body")).css({ position: "absolute", top: -1e4 })),
                    (detailsHeight += $pp_details.height()),
                    (detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight),
                    $pp_details.remove(),
                    ($pp_title = $pp_pic_holder.find(".ppt")),
                    $pp_title.width(e),
                    (titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"))),
                    ($pp_title = $pp_title.clone().appendTo(t("body")).css({ position: "absolute", top: -1e4 })),
                    (titleHeight += $pp_title.height()),
                    $pp_title.remove(),
                    (s = i + detailsHeight),
                    (n = e),
                    (l = s + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height()),
                    (r = e);
            }
            function y(t) {
                return t.match(/youtube\.com\/watch/i) || t.match(/youtu\.be/i)
                    ? "youtube"
                    : t.match(/vimeo\.com/i)
                    ? "vimeo"
                    : t.match(/\b.mov\b/i)
                    ? "quicktime"
                    : t.match(/\b.swf\b/i)
                    ? "flash"
                    : t.match(/\biframe=true\b/i)
                    ? "iframe"
                    : t.match(/\bajax=true\b/i)
                    ? "ajax"
                    : t.match(/\bcustom=true\b/i)
                    ? "custom"
                    : "#" === t.substr(0, 1)
                    ? "inline"
                    : t.match(/\b.mp4\b/i)
                    ? "html5"
                    : "image";
            }
            function w() {
                if (doresize && "undefined" != typeof $pp_pic_holder) {
                    if (
                        ((scroll_pos = b()),
                        (contentHeight = $pp_pic_holder.height()),
                        (contentwidth = $pp_pic_holder.width()),
                        (projectedTop = _ / 2 + scroll_pos.scrollTop - contentHeight / 2),
                        projectedTop < 0 && (projectedTop = 0),
                        contentHeight > _)
                    )
                        return;
                    $pp_pic_holder.css({ top: projectedTop, left: g / 2 + scroll_pos.scrollLeft - contentwidth / 2 });
                }
            }
            function b() {
                return self.pageYOffset
                    ? { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset }
                    : document.documentElement && document.documentElement.scrollTop
                    ? { scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft }
                    : document.body
                    ? { scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft }
                    : void 0;
            }
            function k(e) {
                if (
                    (settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))),
                    (settings.markup = settings.markup.replace("{pp_social}", "")),
                    t("body").append(settings.markup),
                    ($pp_pic_holder = t(".pp_pic_holder")),
                    ($ppt = t(".ppt")),
                    ($pp_overlay = t("div.pp_overlay")),
                    isSet && settings.overlay_gallery)
                ) {
                    (currentGalleryPage = 0), (toInject = "");
                    for (var i = 0; i < pp_images.length; i++)
                        pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi) ? ((classname = ""), (img_src = pp_images[i])) : ((classname = "default"), (img_src = "")),
                            (toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>");
                    (toInject = settings.gallery_markup.replace(/{gallery}/g, toInject)),
                        $pp_pic_holder.find("#pp_full_res").after(toInject),
                        ($pp_gallery = t(".pp_pic_holder .pp_gallery")),
                        ($pp_gallery_li = $pp_gallery.find("li")),
                        $pp_gallery.find(".pp_arrow_next").on("click", function () {
                            return t.prettyPhoto.changeGalleryPage("next"), t.prettyPhoto.stopSlideshow(), !1;
                        }),
                        $pp_gallery.find(".pp_arrow_previous").on("click", function () {
                            return t.prettyPhoto.changeGalleryPage("previous"), t.prettyPhoto.stopSlideshow(), !1;
                        }),
                        $pp_pic_holder.find(".pp_content").hover(
                            function () {
                                $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn();
                            },
                            function () {
                                $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut();
                            }
                        ),
                        (itemWidth = 57),
                        $pp_gallery_li.each(function (e) {
                            t(this)
                                .find("a")
                                .on("click", function () {
                                    return t.prettyPhoto.changePage(e), t.prettyPhoto.stopSlideshow(), !1;
                                });
                        });
                }
                settings.slideshow &&
                    ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'),
                    $pp_pic_holder.find(".pp_nav .pp_play").on("click", function () {
                        return t.prettyPhoto.startSlideshow(), !1;
                    })),
                    $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme),
                    $pp_overlay.css({ opacity: 0, height: t(document).height(), width: t(window).width() }).bind("click", function () {
                        settings.modal || t.prettyPhoto.close();
                    }),
                    t("a.pp_close").bind("click", function () {
                        return t.prettyPhoto.close(), !1;
                    }),
                    settings.allow_expand &&
                        t("a.pp_expand").bind("click", function (e) {
                            var i = t(this);
                            return (
                                i.hasClass("pp_expand") ? (i.removeClass("pp_expand").addClass("pp_contract"), (doresize = !1)) : (i.removeClass("pp_contract").addClass("pp_expand"), (doresize = !0)),
                                u(function () {
                                    t.prettyPhoto.open();
                                }),
                                !1
                            );
                        }),
                    $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
                        return t.prettyPhoto.changePage("previous"), t.prettyPhoto.stopSlideshow(), !1;
                    }),
                    $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
                        return t.prettyPhoto.changePage("next"), t.prettyPhoto.stopSlideshow(), !1;
                    }),
                    w();
            }
            return (
                (doresize = !0),
                (scroll_pos = b()),
                t(window)
                    .unbind("resize.prettyphoto")
                    .bind("resize.prettyphoto", function () {
                        w(), (_ = t(window).height()), (g = t(window).width()), "undefined" != typeof $pp_overlay && $pp_overlay.height(t(document).height()).width(g);
                    }),
                p.keyboard_shortcuts &&
                    t(document)
                        .unbind("keydown.prettyphoto")
                        .bind("keydown.prettyphoto", function (e) {
                            if ("undefined" != typeof $pp_pic_holder && $pp_pic_holder.is(":visible"))
                                switch (e.keyCode) {
                                    case 37:
                                        t.prettyPhoto.changePage("previous"), e.preventDefault();
                                        break;
                                    case 39:
                                        t.prettyPhoto.changePage("next"), e.preventDefault();
                                        break;
                                    case 27:
                                        settings.modal || t.prettyPhoto.close(), e.preventDefault();
                                }
                        }),
                (t.prettyPhoto.initialize = function () {
                    (settings = p), "pp_default" === settings.theme && (settings.horizontal_padding = 16);
                    var e = t(this);
                    return (
                        (theRel = e.attr(settings.hook)),
                        (galleryRegExp = /\[(?:.*)\]/),
                        (isSet = !!galleryRegExp.exec(theRel)),
                        (pp_images = isSet
                            ? jQuery.map(h, function (e, i) {
                                  if (-1 !== t(e).attr(settings.hook).indexOf(theRel)) return t(e).attr("href");
                              })
                            : t.makeArray(e.attr("href"))),
                        (pp_titles = isSet
                            ? jQuery.map(h, function (e, i) {
                                  if (-1 !== t(e).attr(settings.hook).indexOf(theRel)) return t(e).find("img").attr("alt") ? t(e).find("img").attr("alt") : "";
                              })
                            : t.makeArray(e.find("img").attr("alt"))),
                        (pp_descriptions = isSet
                            ? jQuery.map(h, function (e, i) {
                                  if (-1 !== t(e).attr(settings.hook).indexOf(theRel)) return t(e).attr("title") ? t(e).attr("title") : "";
                              })
                            : t.makeArray(e.attr("title"))),
                        pp_images.length > settings.overlay_gallery_max && (settings.overlay_gallery = !1),
                        (set_position = jQuery.inArray(e.attr("href"), pp_images)),
                        (rel_index = isSet ? set_position : t("a[" + settings.hook + "^='" + theRel + "']").index(t(this))),
                        k(this),
                        settings.allow_resize &&
                            t(window).bind("scroll.prettyphoto", function () {
                                w();
                            }),
                        t.prettyPhoto.open(),
                        !1
                    );
                }),
                (t.prettyPhoto.open = function (e) {
                    return (
                        "undefined" == typeof settings &&
                            ((settings = p),
                            (pp_images = t.makeArray(arguments[0])),
                            (pp_titles = arguments[1] ? t.makeArray(arguments[1]) : t.makeArray("")),
                            (pp_descriptions = arguments[2] ? t.makeArray(arguments[2]) : t.makeArray("")),
                            (isSet = pp_images.length > 1),
                            (set_position = arguments[3] ? arguments[3] : 0),
                            k(e.target)),
                        settings.hideflash && t("object,embed,video,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"),
                        t(pp_images).size() > 1 ? t(".pp_nav").show() : t(".pp_nav").hide(),
                        t(".pp_loaderIcon").show(),
                        settings.deeplinking &&
                            (function () {
                                if ("undefined" == typeof theRel) return;
                                location.hash = theRel + "/" + rel_index + "/";
                            })(),
                        settings.social_tools && ((facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))), $pp_pic_holder.find(".pp_social").html(facebook_like_link)),
                        $pp_pic_holder.removeClass("pp_pic_have_only_one"),
                        1 === pp_images.length && $pp_pic_holder.addClass("pp_pic_have_only_one"),
                        $ppt.is(":hidden") && $ppt.css("opacity", 0).show(),
                        $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity),
                        $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + t(pp_images).size()),
                        void 0 !== pp_descriptions[set_position] && "" !== pp_descriptions[set_position]
                            ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))
                            : $pp_pic_holder.find(".pp_description").hide(),
                        (movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString()),
                        (movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString()),
                        (c = !1),
                        -1 !== movie_height.indexOf("%") && ((movie_height = parseFloat((t(window).height() * parseFloat(movie_height)) / 100 - 150)), (c = !0)),
                        -1 !== movie_width.indexOf("%") && ((movie_width = parseFloat((t(window).width() * parseFloat(movie_width)) / 100 - 150)), (c = !0)),
                        $pp_pic_holder.fadeIn(function () {
                            switch (
                                (settings.show_title && "" !== pp_titles[set_position] && void 0 !== pp_titles[set_position] ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html("&nbsp;"),
                                (imgPreloader = ""),
                                (skipInjection = !1),
                                y(pp_images[set_position]))
                            ) {
                                case "image":
                                    (imgPreloader = new Image()),
                                        (nextImage = new Image()),
                                        isSet && set_position < t(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]),
                                        (prevImage = new Image()),
                                        isSet && pp_images[set_position - 1] && (prevImage.src = pp_images[set_position - 1]),
                                        ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position])),
                                        (imgPreloader.onload = function () {
                                            (o = f(imgPreloader.width, imgPreloader.height)), m();
                                        }),
                                        (imgPreloader.onerror = function () {
                                            alert("Image cannot be loaded. Make sure the path is correct and image exist."), t.prettyPhoto.close();
                                        }),
                                        (imgPreloader.src = pp_images[set_position]);
                                    break;
                                case "youtube":
                                    (o = f(movie_width, movie_height)),
                                        (movie_id = i("v", pp_images[set_position])),
                                        "" === movie_id &&
                                            ((movie_id = pp_images[set_position].split("youtu.be/")),
                                            (movie_id = movie_id[1]),
                                            movie_id.indexOf("?") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))),
                                            movie_id.indexOf("&") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("&")))),
                                        (movie = "https://www.youtube.com/embed/" + movie_id),
                                        i("rel", pp_images[set_position]) ? (movie += "?rel=" + i("rel", pp_images[set_position])) : (movie += "?rel=1"),
                                        settings.autoplay && (movie += "&autoplay=1"),
                                        (toInject = settings.iframe_markup
                                            .replace(/{width}/g, o.width)
                                            .replace(/{height}/g, o.height)
                                            .replace(/{wmode}/g, settings.wmode)
                                            .replace(/{path}/g, movie));
                                    break;
                                case "vimeo":
                                    (o = f(movie_width, movie_height)), (movie_id = pp_images[set_position]);
                                    var e = movie_id.match(/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/);
                                    (movie = "https://player.vimeo.com/video/" + e[3] + "?title=0&amp;byline=0&amp;portrait=0"),
                                        settings.autoplay && (movie += "&autoplay=1;"),
                                        (vimeo_width = o.width + "/embed/?moog_width=" + o.width),
                                        (toInject = settings.iframe_markup
                                            .replace(/{width}/g, vimeo_width)
                                            .replace(/{height}/g, o.height)
                                            .replace(/{path}/g, movie));
                                    break;
                                case "quicktime":
                                    ((o = f(movie_width, movie_height)).height += 15),
                                        (o.contentHeight += 15),
                                        (o.containerHeight += 15),
                                        (toInject = settings.quicktime_markup
                                            .replace(/{width}/g, o.width)
                                            .replace(/{height}/g, o.height)
                                            .replace(/{wmode}/g, settings.wmode)
                                            .replace(/{path}/g, pp_images[set_position])
                                            .replace(/{autoplay}/g, settings.autoplay));
                                    break;
                                case "flash":
                                    (o = f(movie_width, movie_height)),
                                        (flash_vars = pp_images[set_position]),
                                        (flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length)),
                                        (filename = pp_images[set_position]),
                                        (filename = filename.substring(0, filename.indexOf("?"))),
                                        (toInject = settings.flash_markup
                                            .replace(/{width}/g, o.width)
                                            .replace(/{height}/g, o.height)
                                            .replace(/{wmode}/g, settings.wmode)
                                            .replace(/{path}/g, filename + "?" + flash_vars));
                                    break;
                                case "iframe":
                                    (o = f(movie_width, movie_height)),
                                        (frame_url = pp_images[set_position]),
                                        (frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1)),
                                        (toInject = settings.iframe_markup
                                            .replace(/{width}/g, o.width)
                                            .replace(/{height}/g, o.height)
                                            .replace(/{path}/g, frame_url));
                                    break;
                                case "html5":
                                    (o = f(movie_width, movie_height)), (toInject = '<video preload="auto" autoplay controls><source type="video/mp4" src="' + pp_images[set_position] + '"></video>');
                                    break;
                                case "ajax":
                                    (doresize = !1),
                                        (o = f(movie_width, movie_height)),
                                        (doresize = !0),
                                        (skipInjection = !0),
                                        t.get(pp_images[set_position], function (t) {
                                            (toInject = settings.inline_markup.replace(/{content}/g, t)), ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject), m();
                                        });
                                    break;
                                case "custom":
                                    (o = f(movie_width, movie_height)), (toInject = settings.custom_markup);
                                    break;
                                case "inline":
                                    (myClone = t(pp_images[set_position])
                                        .clone()
                                        .append('<br clear="all" />')
                                        .css({ width: settings.default_width })
                                        .wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>')
                                        .appendTo(t("body"))
                                        .show()),
                                        (doresize = !1),
                                        (o = f(t(myClone).width(), t(myClone).height())),
                                        (doresize = !0),
                                        t(myClone).remove(),
                                        (toInject = settings.inline_markup.replace(/{content}/g, t(pp_images[set_position]).html()));
                            }
                            imgPreloader || skipInjection || (($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject), m());
                        }),
                        !1
                    );
                }),
                (t.prettyPhoto.changePage = function (e) {
                    (currentGalleryPage = 0),
                        "previous" === e ? (set_position--, set_position < 0 && (set_position = t(pp_images).size() - 1)) : "next" === e ? (set_position++, set_position > t(pp_images).size() - 1 && (set_position = 0)) : (set_position = e),
                        (rel_index = set_position),
                        doresize || (doresize = !0),
                        settings.allow_expand && t(".pp_contract").removeClass("pp_contract").addClass("pp_expand"),
                        u(function () {
                            t.prettyPhoto.open();
                        });
                }),
                (t.prettyPhoto.changeGalleryPage = function (t) {
                    "next" === t
                        ? (currentGalleryPage++, currentGalleryPage > totalPage && (currentGalleryPage = 0))
                        : "previous" === t
                        ? (currentGalleryPage--, currentGalleryPage < 0 && (currentGalleryPage = totalPage))
                        : (currentGalleryPage = t),
                        (slide_speed = "next" === t || "previous" === t ? settings.animation_speed : 0),
                        (slide_to = currentGalleryPage * (itemsPerPage * itemWidth)),
                        $pp_gallery.find("ul").animate({ left: -slide_to }, slide_speed);
                }),
                (t.prettyPhoto.startSlideshow = function () {
                    void 0 === d
                        ? ($pp_pic_holder
                              .find(".pp_play")
                              .unbind("click")
                              .removeClass("pp_play")
                              .addClass("pp_pause")
                              .on("click", function () {
                                  return t.prettyPhoto.stopSlideshow(), !1;
                              }),
                          (d = setInterval(t.prettyPhoto.startSlideshow, settings.slideshow)))
                        : t.prettyPhoto.changePage("next");
                }),
                (t.prettyPhoto.stopSlideshow = function () {
                    $pp_pic_holder
                        .find(".pp_pause")
                        .unbind("click")
                        .removeClass("pp_pause")
                        .addClass("pp_play")
                        .on("click", function () {
                            return t.prettyPhoto.startSlideshow(), !1;
                        }),
                        clearInterval(d),
                        (d = void 0);
                }),
                (t.prettyPhoto.close = function () {
                    $pp_overlay.is(":animated") ||
                        (t.prettyPhoto.stopSlideshow(),
                        $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"),
                        t("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
                            t(this).remove();
                        }),
                        $pp_overlay.fadeOut(settings.animation_speed, function () {
                            settings.hideflash && t("object,embed,video,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"),
                                t(this).remove(),
                                t(window).unbind("scroll.prettyphoto"),
                                -1 !== location.href.indexOf("#prettyPhoto") && (location.hash = "prettyPhoto"),
                                settings.callback(),
                                (doresize = !0),
                                (a = !1),
                                delete settings;
                        }));
                }),
                !pp_alreadyInitialized &&
                    e() &&
                    ((pp_alreadyInitialized = !0),
                    (hashIndex = e()),
                    (hashRel = hashIndex),
                    (hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1)),
                    (hashRel = hashRel.substring(0, hashRel.indexOf("/"))),
                    setTimeout(function () {
                        t("a[" + p.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click");
                    }, 50)),
                this.unbind("click.prettyphoto").bind("click.prettyphoto", t.prettyPhoto.initialize)
            );
        });
})(jQuery);
var pp_alreadyInitialized = !1;
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
    },
    easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a;
    },
    easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a;
    },
    easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return (h / 2) * f * f + a;
        }
        return (-h / 2) * (--f * (f - 2) - 1) + a;
    },
    easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a;
    },
    easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a;
    },
    easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return (h / 2) * f * f * f + a;
        }
        return (h / 2) * ((f -= 2) * f * f + 2) + a;
    },
    easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a;
    },
    easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a;
    },
    easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return (h / 2) * f * f * f * f + a;
        }
        return (-h / 2) * ((f -= 2) * f * f * f - 2) + a;
    },
    easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a;
    },
    easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
    },
    easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return (h / 2) * f * f * f * f * f + a;
        }
        return (h / 2) * ((f -= 2) * f * f * f * f + 2) + a;
    },
    easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos((f / g) * (Math.PI / 2)) + h + a;
    },
    easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin((f / g) * (Math.PI / 2)) + a;
    },
    easeInOutSine: function (e, f, a, h, g) {
        return (-h / 2) * (Math.cos((Math.PI * f) / g) - 1) + a;
    },
    easeInExpo: function (e, f, a, h, g) {
        return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
    },
    easeOutExpo: function (e, f, a, h, g) {
        return f == g ? a + h : h * (-Math.pow(2, (-10 * f) / g) + 1) + a;
    },
    easeInOutExpo: function (e, f, a, h, g) {
        if (f == 0) {
            return a;
        }
        if (f == g) {
            return a + h;
        }
        if ((f /= g / 2) < 1) {
            return (h / 2) * Math.pow(2, 10 * (f - 1)) + a;
        }
        return (h / 2) * (-Math.pow(2, -10 * --f) + 2) + a;
    },
    easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
    },
    easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
    },
    easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return (-h / 2) * (Math.sqrt(1 - f * f) - 1) + a;
        }
        return (h / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
    },
    easeInElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k) == 1) {
            return e + l;
        }
        if (!j) {
            j = k * 0.3;
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = (j / (2 * Math.PI)) * Math.asin(l / g);
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j)) + e;
    },
    easeOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k) == 1) {
            return e + l;
        }
        if (!j) {
            j = k * 0.3;
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = (j / (2 * Math.PI)) * Math.asin(l / g);
        }
        return g * Math.pow(2, -10 * h) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) + l + e;
    },
    easeInOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k / 2) == 2) {
            return e + l;
        }
        if (!j) {
            j = k * (0.3 * 1.5);
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = (j / (2 * Math.PI)) * Math.asin(l / g);
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j)) + e;
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) * 0.5 + l + e;
    },
    easeInBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a;
    },
    easeOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
    },
    easeInOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        if ((f /= h / 2) < 1) {
            return (i / 2) * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
        }
        return (i / 2) * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
    },
    easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
    },
    easeOutBounce: function (e, f, a, h, g) {
        if ((f /= g) < 1 / 2.75) {
            return h * (7.5625 * f * f) + a;
        } else {
            if (f < 2 / 2.75) {
                return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
            } else {
                if (f < 2.5 / 2.75) {
                    return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
                } else {
                    return h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a;
                }
            }
        }
    },
    easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
    },
});
/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2019 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */ /*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */ !(function (t, e) {
    "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
              return e(t, i);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = e(t, require("jquery")))
        : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
    "use strict";
    function i(i, s, a) {
        function u(t, e, o) {
            var n,
                s = "$()." + i + '("' + e + '")';
            return (
                t.each(function (t, u) {
                    var h = a.data(u, i);
                    if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                    var d = h[e];
                    if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                    var l = d.apply(h, o);
                    n = void 0 === n ? l : n;
                }),
                void 0 !== n ? n : t
            );
        }
        function h(t, e) {
            t.each(function (t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n));
            });
        }
        (a = a || e || t.jQuery),
            a &&
                (s.prototype.option ||
                    (s.prototype.option = function (t) {
                        a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
                    }),
                (a.fn[i] = function (t) {
                    if ("string" == typeof t) {
                        var e = n.call(arguments, 1);
                        return u(this, t, e);
                    }
                    return h(this, t), this;
                }),
                o(a));
    }
    function o(t) {
        !t || (t && t.bridget) || (t.bridget = i);
    }
    var n = Array.prototype.slice,
        s = t.console,
        r =
            "undefined" == typeof s
                ? function () {}
                : function (t) {
                      s.error(t);
                  };
    return o(e || t.jQuery), i;
}),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        o = (i[t] = i[t] || []);
                    return o.indexOf(e) == -1 && o.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {}),
                        o = (i[t] = i[t] || {});
                    return (o[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var o = i.indexOf(e);
                    return o != -1 && i.splice(o, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    (i = i.slice(0)), (e = e || []);
                    for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                        var s = i[n],
                            r = o && o[s];
                        r && (this.off(t, s), delete o[s]), s.apply(this, e);
                    }
                    return this;
                }
            }),
            (e.allOff = function () {
                delete this._events, delete this._onceEvents;
            }),
            t
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("get-size/get-size", [], function () {
                  return e();
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : (t.getSize = e());
    })(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t),
                i = t.indexOf("%") == -1 && !isNaN(e);
            return i && e;
        }
        function e() {}
        function i() {
            for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < h; e++) {
                var i = u[e];
                t[i] = 0;
            }
            return t;
        }
        function o(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e;
        }
        function n() {
            if (!d) {
                d = !0;
                var e = document.createElement("div");
                (e.style.width = "200px"), (e.style.padding = "1px 2px 3px 4px"), (e.style.borderStyle = "solid"), (e.style.borderWidth = "1px 2px 3px 4px"), (e.style.boxSizing = "border-box");
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var n = o(e);
                (s.isBoxSizeOuter = r = 200 == t(n.width)), i.removeChild(e);
            }
        }
        function s(e) {
            if ((n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType)) {
                var s = o(e);
                if ("none" == s.display) return i();
                var a = {};
                (a.width = e.offsetWidth), (a.height = e.offsetHeight);
                for (var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0; l < h; l++) {
                    var f = u[l],
                        c = s[f],
                        m = parseFloat(c);
                    a[f] = isNaN(m) ? 0 : m;
                }
                var p = a.paddingLeft + a.paddingRight,
                    y = a.paddingTop + a.paddingBottom,
                    g = a.marginLeft + a.marginRight,
                    v = a.marginTop + a.marginBottom,
                    _ = a.borderLeftWidth + a.borderRightWidth,
                    I = a.borderTopWidth + a.borderBottomWidth,
                    z = d && r,
                    x = t(s.width);
                x !== !1 && (a.width = x + (z ? 0 : p + _));
                var S = t(s.height);
                return S !== !1 && (a.height = S + (z ? 0 : y + I)), (a.innerWidth = a.width - (p + _)), (a.innerHeight = a.height - (y + I)), (a.outerWidth = a.width + g), (a.outerHeight = a.height + v), a;
            }
        }
        var r,
            a =
                "undefined" == typeof console
                    ? e
                    : function (t) {
                          console.error(t);
                      },
            u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            h = u.length,
            d = !1;
        return s;
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.matchesSelector = e());
    })(window, function () {
        "use strict";
        var t = (function () {
            var t = window.Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var o = e[i],
                    n = o + "MatchesSelector";
                if (t[n]) return n;
            }
        })();
        return function (e, i) {
            return e[t](i);
        };
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("desandro-matches-selector")))
            : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
        var i = {};
        (i.extend = function (t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }),
            (i.modulo = function (t, e) {
                return ((t % e) + e) % e;
            }),
            (i.makeArray = function (t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if (t && "object" == typeof t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e;
            }),
            (i.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                i != -1 && t.splice(i, 1);
            }),
            (i.getParent = function (t, i) {
                for (; t.parentNode && t != document.body; ) if (((t = t.parentNode), e(t, i))) return t;
            }),
            (i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.filterFindElements = function (t, o) {
                t = i.makeArray(t);
                var n = [];
                return (
                    t.forEach(function (t) {
                        if (t instanceof HTMLElement) {
                            if (!o) return void n.push(t);
                            e(t, o) && n.push(t);
                            for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s]);
                        }
                    }),
                    n
                );
            }),
            (i.debounceMethod = function (t, e, i) {
                var o = t.prototype[e],
                    n = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[n];
                    t && clearTimeout(t);
                    var e = arguments,
                        s = this;
                    this[n] = setTimeout(function () {
                        o.apply(s, e), delete s[n];
                    }, i || 100);
                };
            }),
            (i.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
            }),
            (i.toDashed = function (t) {
                return t
                    .replace(/(.)([A-Z])/g, function (t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            });
        var o = t.console;
        return (
            (i.htmlInit = function (e, n) {
                i.docReady(function () {
                    var s = i.toDashed(n),
                        r = "data-" + s,
                        a = document.querySelectorAll("[" + r + "]"),
                        u = document.querySelectorAll(".js-" + s),
                        h = i.makeArray(a).concat(i.makeArray(u)),
                        d = r + "-options",
                        l = t.jQuery;
                    h.forEach(function (t) {
                        var i,
                            s = t.getAttribute(r) || t.getAttribute(d);
                        try {
                            i = s && JSON.parse(s);
                        } catch (a) {
                            return void (o && o.error("Error parsing " + r + " on " + t.className + ": " + a));
                        }
                        var u = new e(t, i);
                        l && l.data(t, n, u);
                    });
                });
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("ev-emitter"), require("get-size")))
            : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
    })(window, function (t, e) {
        "use strict";
        function i(t) {
            for (var e in t) return !1;
            return (e = null), !0;
        }
        function o(t, e) {
            t && ((this.element = t), (this.layout = e), (this.position = { x: 0, y: 0 }), this._create());
        }
        function n(t) {
            return t.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase();
            });
        }
        var s = document.documentElement.style,
            r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
            a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
            u = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r],
            h = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" },
            d = (o.prototype = Object.create(t.prototype));
        (d.constructor = o),
            (d._create = function () {
                (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: "absolute" });
            }),
            (d.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (d.getSize = function () {
                this.size = e(this.element);
            }),
            (d.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = h[i] || i;
                    e[o] = t[i];
                }
            }),
            (d.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    o = t[e ? "left" : "right"],
                    n = t[i ? "top" : "bottom"],
                    s = this.layout.size,
                    r = o.indexOf("%") != -1 ? (parseFloat(o) / 100) * s.width : parseInt(o, 10),
                    a = n.indexOf("%") != -1 ? (parseFloat(n) / 100) * s.height : parseInt(n, 10);
                (r = isNaN(r) ? 0 : r), (a = isNaN(a) ? 0 : a), (r -= e ? s.paddingLeft : s.paddingRight), (a -= i ? s.paddingTop : s.paddingBottom), (this.position.x = r), (this.position.y = a);
            }),
            (d.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    o = this.layout._getOption("originTop"),
                    n = i ? "paddingLeft" : "paddingRight",
                    s = i ? "left" : "right",
                    r = i ? "right" : "left",
                    a = this.position.x + t[n];
                (e[s] = this.getXValue(a)), (e[r] = "");
                var u = o ? "paddingTop" : "paddingBottom",
                    h = o ? "top" : "bottom",
                    d = o ? "bottom" : "top",
                    l = this.position.y + t[u];
                (e[h] = this.getYValue(l)), (e[d] = ""), this.css(e), this.emitEvent("layout", [this]);
            }),
            (d.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? (t / this.layout.size.width) * 100 + "%" : t + "px";
            }),
            (d.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? (t / this.layout.size.height) * 100 + "%" : t + "px";
            }),
            (d._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    o = this.position.y,
                    n = parseInt(t, 10),
                    s = parseInt(e, 10),
                    r = n === this.position.x && s === this.position.y;
                if ((this.setPosition(t, e), r && !this.isTransitioning)) return void this.layoutPosition();
                var a = t - i,
                    u = e - o,
                    h = {};
                (h.transform = this.getTranslate(a, u)), this.transition({ to: h, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
            }),
            (d.getTranslate = function (t, e) {
                var i = this.layout._getOption("originLeft"),
                    o = this.layout._getOption("originTop");
                return (t = i ? t : -t), (e = o ? e : -e), "translate3d(" + t + "px, " + e + "px, 0)";
            }),
            (d.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (d.moveTo = d._transitionTo),
            (d.setPosition = function (t, e) {
                (this.position.x = parseInt(t, 10)), (this.position.y = parseInt(e, 10));
            }),
            (d._nonTransition = function (t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
            }),
            (d.transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var o = this.element.offsetHeight;
                    o = null;
                }
                this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0);
            });
        var l = "opacity," + n(a);
        (d.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                (t = "number" == typeof t ? t + "ms" : t), this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(u, this, !1);
            }
        }),
            (d.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (d.onotransitionend = function (t) {
                this.ontransitionend(t);
            });
        var f = { "-webkit-transform": "transform" };
        (d.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn,
                    o = f[t.propertyName] || t.propertyName;
                if ((delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && ((this.element.style[t.propertyName] = ""), delete e.clean[o]), o in e.onEnd)) {
                    var n = e.onEnd[o];
                    n.call(this), delete e.onEnd[o];
                }
                this.emitEvent("transitionEnd", [this]);
            }
        }),
            (d.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), (this.isTransitioning = !1);
            }),
            (d._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            });
        var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
        return (
            (d.removeTransitionStyles = function () {
                this.css(c);
            }),
            (d.stagger = function (t) {
                (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
            }),
            (d.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
            }),
            (d.remove = function () {
                return r && parseFloat(this.layout.options.transitionDuration)
                    ? (this.once("transitionEnd", function () {
                          this.removeElem();
                      }),
                      void this.hide())
                    : void this.removeElem();
            }),
            (d.reveal = function () {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("visibleStyle");
                (e[i] = this.onRevealTransitionEnd), this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (d.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal");
            }),
            (d.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i;
            }),
            (d.hide = function () {
                (this.isHidden = !0), this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                (e[i] = this.onHideTransitionEnd), this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (d.onHideTransitionEnd = function () {
                this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
            }),
            (d.destroy = function () {
                this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
            }),
            o
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, o, n, s) {
                  return e(t, i, o, n, s);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")))
            : (t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item));
    })(window, function (t, e, i, o, n) {
        "use strict";
        function s(t, e) {
            var i = o.getQueryElement(t);
            if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            (this.element = i), h && (this.$element = h(this.element)), (this.options = o.extend({}, this.constructor.defaults)), this.option(e);
            var n = ++l;
            (this.element.outlayerGUID = n), (f[n] = this), this._create();
            var s = this._getOption("initLayout");
            s && this.layout();
        }
        function r(t) {
            function e() {
                t.apply(this, arguments);
            }
            return (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), e;
        }
        function a(t) {
            if ("number" == typeof t) return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                o = e && e[2];
            if (!i.length) return 0;
            i = parseFloat(i);
            var n = m[o] || 1;
            return i * n;
        }
        var u = t.console,
            h = t.jQuery,
            d = function () {},
            l = 0,
            f = {};
        (s.namespace = "outlayer"),
            (s.Item = n),
            (s.defaults = {
                containerStyle: { position: "relative" },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            });
        var c = s.prototype;
        o.extend(c, e.prototype),
            (c.option = function (t) {
                o.extend(this.options, t);
            }),
            (c._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
            }),
            (s.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer",
            }),
            (c._create = function () {
                this.reloadItems(), (this.stamps = []), this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
                var t = this._getOption("resize");
                t && this.bindResize();
            }),
            (c.reloadItems = function () {
                this.items = this._itemize(this.element.children);
            }),
            (c._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
                    var s = e[n],
                        r = new i(s, this);
                    o.push(r);
                }
                return o;
            }),
            (c._filterFindItemElements = function (t) {
                return o.filterFindElements(t, this.options.itemSelector);
            }),
            (c.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element;
                });
            }),
            (c.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), (this._isLayoutInited = !0);
            }),
            (c._init = c.layout),
            (c._resetLayout = function () {
                this.getSize();
            }),
            (c.getSize = function () {
                this.size = i(this.element);
            }),
            (c._getMeasurement = function (t, e) {
                var o,
                    n = this.options[t];
                n ? ("string" == typeof n ? (o = this.element.querySelector(n)) : n instanceof HTMLElement && (o = n), (this[t] = o ? i(o)[e] : n)) : (this[t] = 0);
            }),
            (c.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout();
            }),
            (c._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored;
                });
            }),
            (c._layoutItems = function (t, e) {
                if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
                    var i = [];
                    t.forEach(function (t) {
                        var o = this._getItemLayoutPosition(t);
                        (o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
                    }, this),
                        this._processLayoutQueue(i);
                }
            }),
            (c._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (c._processLayoutQueue = function (t) {
                this.updateStagger(),
                    t.forEach(function (t, e) {
                        this._positionItem(t.item, t.x, t.y, t.isInstant, e);
                    }, this);
            }),
            (c.updateStagger = function () {
                var t = this.options.stagger;
                return null === t || void 0 === t ? void (this.stagger = 0) : ((this.stagger = a(t)), this.stagger);
            }),
            (c._positionItem = function (t, e, i, o, n) {
                o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
            }),
            (c._postLayout = function () {
                this.resizeContainer();
            }),
            (c.resizeContainer = function () {
                var t = this._getOption("resizeContainer");
                if (t) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
                }
            }),
            (c._getContainerSize = d),
            (c._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (c._emitCompleteOnItems = function (t, e) {
                function i() {
                    n.dispatchEvent(t + "Complete", null, [e]);
                }
                function o() {
                    r++, r == s && i();
                }
                var n = this,
                    s = e.length;
                if (!e || !s) return void i();
                var r = 0;
                e.forEach(function (e) {
                    e.once(t, o);
                });
            }),
            (c.dispatchEvent = function (t, e, i) {
                var o = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, o), h))
                    if (((this.$element = this.$element || h(this.element)), e)) {
                        var n = h.Event(e);
                        (n.type = t), this.$element.trigger(n, i);
                    } else this.$element.trigger(t, i);
            }),
            (c.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (c.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (c.stamp = function (t) {
                (t = this._find(t)), t && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
            }),
            (c.unstamp = function (t) {
                (t = this._find(t)),
                    t &&
                        t.forEach(function (t) {
                            o.removeFrom(this.stamps, t), this.unignore(t);
                        }, this);
            }),
            (c._find = function (t) {
                if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), (t = o.makeArray(t));
            }),
            (c._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
            }),
            (c._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (c._manageStamp = d),
            (c._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    o = this._boundingRect,
                    n = i(t),
                    s = { left: e.left - o.left - n.marginLeft, top: e.top - o.top - n.marginTop, right: o.right - e.right - n.marginRight, bottom: o.bottom - e.bottom - n.marginBottom };
                return s;
            }),
            (c.handleEvent = o.handleEvent),
            (c.bindResize = function () {
                t.addEventListener("resize", this), (this.isResizeBound = !0);
            }),
            (c.unbindResize = function () {
                t.removeEventListener("resize", this), (this.isResizeBound = !1);
            }),
            (c.onresize = function () {
                this.resize();
            }),
            o.debounceMethod(s, "onresize", 100),
            (c.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }),
            (c.needsResizeLayout = function () {
                var t = i(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth;
            }),
            (c.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }),
            (c.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (c.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
                }
            }),
            (c.reveal = function (t) {
                if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.reveal();
                    });
                }
            }),
            (c.hide = function (t) {
                if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.hide();
                    });
                }
            }),
            (c.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e);
            }),
            (c.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e);
            }),
            (c.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i;
                }
            }),
            (c.getItems = function (t) {
                t = o.makeArray(t);
                var e = [];
                return (
                    t.forEach(function (t) {
                        var i = this.getItem(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (c.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e &&
                        e.length &&
                        e.forEach(function (t) {
                            t.remove(), o.removeFrom(this.items, t);
                        }, this);
            }),
            (c.destroy = function () {
                var t = this.element.style;
                (t.height = ""),
                    (t.position = ""),
                    (t.width = ""),
                    this.items.forEach(function (t) {
                        t.destroy();
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace);
            }),
            (s.data = function (t) {
                t = o.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && f[e];
            }),
            (s.create = function (t, e) {
                var i = r(s);
                return (
                    (i.defaults = o.extend({}, s.defaults)),
                    o.extend(i.defaults, e),
                    (i.compatOptions = o.extend({}, s.compatOptions)),
                    (i.namespace = t),
                    (i.data = s.data),
                    (i.Item = r(n)),
                    o.htmlInit(i, t),
                    h && h.bridget && h.bridget(t, i),
                    i
                );
            });
        var m = { ms: 1, s: 1e3 };
        return (s.Item = n), s;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
    })(window, function (t) {
        "use strict";
        function e() {
            t.Item.apply(this, arguments);
        }
        var i = (e.prototype = Object.create(t.Item.prototype)),
            o = i._create;
        (i._create = function () {
            (this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
        }),
            (i.updateSortData = function () {
                if (!this.isIgnored) {
                    (this.sortData.id = this.id), (this.sortData["original-order"] = this.id), (this.sortData.random = Math.random());
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this);
                    }
                }
            });
        var n = i.destroy;
        return (
            (i.destroy = function () {
                n.apply(this, arguments), this.css({ display: "" });
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("get-size"), require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
    })(window, function (t, e) {
        "use strict";
        function i(t) {
            (this.isotope = t), t && ((this.options = t.options[this.namespace]), (this.element = t.element), (this.items = t.filteredItems), (this.size = t.size));
        }
        var o = i.prototype,
            n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
        return (
            n.forEach(function (t) {
                o[t] = function () {
                    return e.prototype[t].apply(this.isotope, arguments);
                };
            }),
            (o.needsVerticalResizeLayout = function () {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                return i && e.innerHeight != this.isotope.size.innerHeight;
            }),
            (o._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments);
            }),
            (o.getColumnWidth = function () {
                this.getSegmentSize("column", "Width");
            }),
            (o.getRowHeight = function () {
                this.getSegmentSize("row", "Height");
            }),
            (o.getSegmentSize = function (t, e) {
                var i = t + e,
                    o = "outer" + e;
                if ((this._getMeasurement(i, o), !this[i])) {
                    var n = this.getFirstItemSize();
                    this[i] = (n && n[o]) || this.isotope.size["inner" + e];
                }
            }),
            (o.getFirstItemSize = function () {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element);
            }),
            (o.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments);
            }),
            (o.getSize = function () {
                this.isotope.getSize(), (this.size = this.isotope.size);
            }),
            (i.modes = {}),
            (i.create = function (t, e) {
                function n() {
                    i.apply(this, arguments);
                }
                return (n.prototype = Object.create(o)), (n.prototype.constructor = n), e && (n.options = e), (n.prototype.namespace = t), (i.modes[t] = n), n;
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer"), require("get-size")))
            : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, e) {
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var o = i.prototype;
        return (
            (o._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), (this.colYs = []);
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                (this.maxY = 0), (this.horizontalColIndex = 0);
            }),
            (o.measureColumns = function () {
                if ((this.getContainerWidth(), !this.columnWidth)) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
                }
                var o = (this.columnWidth += this.gutter),
                    n = this.containerWidth + this.gutter,
                    s = n / o,
                    r = o - (n % o),
                    a = r && r < 1 ? "round" : "floor";
                (s = Math[a](s)), (this.cols = Math.max(s, 1));
            }),
            (o.getContainerWidth = function () {
                var t = this._getOption("fitWidth"),
                    i = t ? this.element.parentNode : this.element,
                    o = e(i);
                this.containerWidth = o && o.innerWidth;
            }),
            (o._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = e && e < 1 ? "round" : "ceil",
                    o = Math[i](t.size.outerWidth / this.columnWidth);
                o = Math.min(o, this.cols);
                for (
                    var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = { x: this.columnWidth * s.col, y: s.y }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col;
                    h < u;
                    h++
                )
                    this.colYs[h] = a;
                return r;
            }),
            (o._getTopColPosition = function (t) {
                var e = this._getTopColGroup(t),
                    i = Math.min.apply(Math, e);
                return { col: e.indexOf(i), y: i };
            }),
            (o._getTopColGroup = function (t) {
                if (t < 2) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
                return e;
            }),
            (o._getColGroupY = function (t, e) {
                if (e < 2) return this.colYs[t];
                var i = this.colYs.slice(t, t + e);
                return Math.max.apply(Math, i);
            }),
            (o._getHorizontalColPosition = function (t, e) {
                var i = this.horizontalColIndex % this.cols,
                    o = t > 1 && i + t > this.cols;
                i = o ? 0 : i;
                var n = e.size.outerWidth && e.size.outerHeight;
                return (this.horizontalColIndex = n ? i + t : this.horizontalColIndex), { col: i, y: this._getColGroupY(i, t) };
            }),
            (o._manageStamp = function (t) {
                var i = e(t),
                    o = this._getElementOffset(t),
                    n = this._getOption("originLeft"),
                    s = n ? o.left : o.right,
                    r = s + i.outerWidth,
                    a = Math.floor(s / this.columnWidth);
                a = Math.max(0, a);
                var u = Math.floor(r / this.columnWidth);
                (u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
                for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
            }),
            (o._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = { height: this.maxY };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
            }),
            (o._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
                return (this.cols - t) * this.columnWidth - this.gutter;
            }),
            (o.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("../layout-mode"), require("masonry-layout")))
            : e(t.Isotope.LayoutMode, t.Masonry);
    })(window, function (t, e) {
        "use strict";
        var i = t.create("masonry"),
            o = i.prototype,
            n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
        for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
        var r = o.measureColumns;
        o.measureColumns = function () {
            (this.items = this.isotope.filteredItems), r.call(this);
        };
        var a = o._getOption;
        return (
            (o._getOption = function (t) {
                return "fitWidth" == t ? (void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth) : a.apply(this.isotope, arguments);
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? (module.exports = e(require("../layout-mode"))) : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("fitRows"),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                (this.x = 0), (this.y = 0), (this.maxY = 0), this._getMeasurement("gutter", "outerWidth");
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
                var o = { x: this.x, y: this.y };
                return (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)), (this.x += e), o;
            }),
            (i._getContainerSize = function () {
                return { height: this.maxY };
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("../layout-mode")))
            : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("vertical", { horizontalAlignment: 0 }),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                this.y = 0;
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return (this.y += t.size.outerHeight), { x: e, y: i };
            }),
            (i._getContainerSize = function () {
                return { height: this.y };
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define([
                  "outlayer/outlayer",
                  "get-size/get-size",
                  "desandro-matches-selector/matches-selector",
                  "fizzy-ui-utils/utils",
                  "isotope-layout/js/item",
                  "isotope-layout/js/layout-mode",
                  "isotope-layout/js/layout-modes/masonry",
                  "isotope-layout/js/layout-modes/fit-rows",
                  "isotope-layout/js/layout-modes/vertical",
              ], function (i, o, n, s, r, a) {
                  return e(t, i, o, n, s, r, a);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("outlayer"),
                  require("get-size"),
                  require("desandro-matches-selector"),
                  require("fizzy-ui-utils"),
                  require("isotope-layout/js/item"),
                  require("isotope-layout/js/layout-mode"),
                  require("isotope-layout/js/layout-modes/masonry"),
                  require("isotope-layout/js/layout-modes/fit-rows"),
                  require("isotope-layout/js/layout-modes/vertical")
              ))
            : (t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode));
    })(window, function (t, e, i, o, n, s, r) {
        function a(t, e) {
            return function (i, o) {
                for (var n = 0; n < t.length; n++) {
                    var s = t[n],
                        r = i.sortData[s],
                        a = o.sortData[s];
                    if (r > a || r < a) {
                        var u = void 0 !== e[s] ? e[s] : e,
                            h = u ? 1 : -1;
                        return (r > a ? 1 : -1) * h;
                    }
                }
                return 0;
            };
        }
        var u = t.jQuery,
            h = String.prototype.trim
                ? function (t) {
                      return t.trim();
                  }
                : function (t) {
                      return t.replace(/^\s+|\s+$/g, "");
                  },
            d = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
        (d.Item = s), (d.LayoutMode = r);
        var l = d.prototype;
        (l._create = function () {
            (this.itemGUID = 0), (this._sorters = {}), this._getSorters(), e.prototype._create.call(this), (this.modes = {}), (this.filteredItems = this.items), (this.sortHistory = ["original-order"]);
            for (var t in r.modes) this._initLayoutMode(t);
        }),
            (l.reloadItems = function () {
                (this.itemGUID = 0), e.prototype.reloadItems.call(this);
            }),
            (l._itemize = function () {
                for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.id = this.itemGUID++;
                }
                return this._updateItemsSortData(t), t;
            }),
            (l._initLayoutMode = function (t) {
                var e = r.modes[t],
                    i = this.options[t] || {};
                (this.options[t] = e.options ? n.extend(e.options, i) : i), (this.modes[t] = new e(this));
            }),
            (l.layout = function () {
                return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout();
            }),
            (l._layout = function () {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), (this._isLayoutInited = !0);
            }),
            (l.arrange = function (t) {
                this.option(t), this._getIsInstant();
                var e = this._filter(this.items);
                (this.filteredItems = e.matches), this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout();
            }),
            (l._init = l.arrange),
            (l._hideReveal = function (t) {
                this.reveal(t.needReveal), this.hide(t.needHide);
            }),
            (l._getIsInstant = function () {
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                return (this._isInstant = e), e;
            }),
            (l._bindArrangeComplete = function () {
                function t() {
                    e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
                }
                var e,
                    i,
                    o,
                    n = this;
                this.once("layoutComplete", function () {
                    (e = !0), t();
                }),
                    this.once("hideComplete", function () {
                        (i = !0), t();
                    }),
                    this.once("revealComplete", function () {
                        (o = !0), t();
                    });
            }),
            (l._filter = function (t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
                    var a = t[r];
                    if (!a.isIgnored) {
                        var u = s(a);
                        u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
                    }
                }
                return { matches: i, needReveal: o, needHide: n };
            }),
            (l._getFilterTest = function (t) {
                return u && this.options.isJQueryFiltering
                    ? function (e) {
                          return u(e.element).is(t);
                      }
                    : "function" == typeof t
                    ? function (e) {
                          return t(e.element);
                      }
                    : function (e) {
                          return o(e.element, t);
                      };
            }),
            (l.updateSortData = function (t) {
                var e;
                t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items), this._getSorters(), this._updateItemsSortData(e);
            }),
            (l._getSorters = function () {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = f(i);
                }
            }),
            (l._updateItemsSortData = function (t) {
                for (var e = t && t.length, i = 0; e && i < e; i++) {
                    var o = t[i];
                    o.updateSortData();
                }
            });
        var f = (function () {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = h(t).split(" "),
                    o = i[0],
                    n = o.match(/^\[(.+)\]$/),
                    s = n && n[1],
                    r = e(s, o),
                    a = d.sortDataParsers[i[1]];
                return (t = a
                    ? function (t) {
                          return t && a(r(t));
                      }
                    : function (t) {
                          return t && r(t);
                      });
            }
            function e(t, e) {
                return t
                    ? function (e) {
                          return e.getAttribute(t);
                      }
                    : function (t) {
                          var i = t.querySelector(e);
                          return i && i.textContent;
                      };
            }
            return t;
        })();
        (d.sortDataParsers = {
            parseInt: function (t) {
                return parseInt(t, 10);
            },
            parseFloat: function (t) {
                return parseFloat(t);
            },
        }),
            (l._sort = function () {
                if (this.options.sortBy) {
                    var t = n.makeArray(this.options.sortBy);
                    this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
                    var e = a(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(e);
                }
            }),
            (l._getIsSameSortBy = function (t) {
                for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
                return !0;
            }),
            (l._mode = function () {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw new Error("No layout mode: " + t);
                return (e.options = this.options[t]), e;
            }),
            (l._resetLayout = function () {
                e.prototype._resetLayout.call(this), this._mode()._resetLayout();
            }),
            (l._getItemLayoutPosition = function (t) {
                return this._mode()._getItemLayoutPosition(t);
            }),
            (l._manageStamp = function (t) {
                this._mode()._manageStamp(t);
            }),
            (l._getContainerSize = function () {
                return this._mode()._getContainerSize();
            }),
            (l.needsResizeLayout = function () {
                return this._mode().needsResizeLayout();
            }),
            (l.appended = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i);
                }
            }),
            (l.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), (this.filteredItems = i.concat(this.filteredItems)), (this.items = e.concat(this.items));
                }
            }),
            (l._filterRevealAdded = function (t) {
                var e = this._filter(t);
                return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches;
            }),
            (l.insert = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i,
                        o,
                        n = e.length;
                    for (i = 0; i < n; i++) (o = e[i]), this.element.appendChild(o.element);
                    var s = this._filter(e).matches;
                    for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
                    this.reveal(s);
                }
            });
        var c = l.remove;
        return (
            (l.remove = function (t) {
                t = n.makeArray(t);
                var e = this.getItems(t);
                c.call(this, t);
                for (var i = e && e.length, o = 0; i && o < i; o++) {
                    var s = e[o];
                    n.removeFrom(this.filteredItems, s);
                }
            }),
            (l.shuffle = function () {
                for (var t = 0; t < this.items.length; t++) {
                    var e = this.items[t];
                    e.sortData.random = Math.random();
                }
                (this.options.sortBy = "random"), this._sort(), this._layout();
            }),
            (l._noTransition = function (t, e) {
                var i = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var o = t.apply(this, e);
                return (this.options.transitionDuration = i), o;
            }),
            (l.getFilteredItemElements = function () {
                return this.filteredItems.map(function (t) {
                    return t.element;
                });
            }),
            d
        );
    });
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = e || self).Swiper = t());
})(this, function () {
    "use strict";
    var e =
            "undefined" == typeof document
                ? {
                      body: {},
                      addEventListener: function () {},
                      removeEventListener: function () {},
                      activeElement: { blur: function () {}, nodeName: "" },
                      querySelector: function () {
                          return null;
                      },
                      querySelectorAll: function () {
                          return [];
                      },
                      getElementById: function () {
                          return null;
                      },
                      createEvent: function () {
                          return { initEvent: function () {} };
                      },
                      createElement: function () {
                          return {
                              children: [],
                              childNodes: [],
                              style: {},
                              setAttribute: function () {},
                              getElementsByTagName: function () {
                                  return [];
                              },
                          };
                      },
                      location: { hash: "" },
                  }
                : document,
        t =
            "undefined" == typeof window
                ? {
                      document: e,
                      navigator: { userAgent: "" },
                      location: {},
                      history: {},
                      CustomEvent: function () {
                          return this;
                      },
                      addEventListener: function () {},
                      removeEventListener: function () {},
                      getComputedStyle: function () {
                          return {
                              getPropertyValue: function () {
                                  return "";
                              },
                          };
                      },
                      Image: function () {},
                      Date: function () {},
                      screen: {},
                      setTimeout: function () {},
                      clearTimeout: function () {},
                  }
                : window,
        i = function (e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return (this.length = e.length), this;
        };
    function s(s, a) {
        var r = [],
            n = 0;
        if (s && !a && s instanceof i) return s;
        if (s)
            if ("string" == typeof s) {
                var o,
                    l,
                    d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                    var h = "div";
                    for (
                        0 === d.indexOf("<li") && (h = "ul"),
                            0 === d.indexOf("<tr") && (h = "tbody"),
                            (0 !== d.indexOf("<td") && 0 !== d.indexOf("<th")) || (h = "tr"),
                            0 === d.indexOf("<tbody") && (h = "table"),
                            0 === d.indexOf("<option") && (h = "select"),
                            (l = e.createElement(h)).innerHTML = d,
                            n = 0;
                        n < l.childNodes.length;
                        n += 1
                    )
                        r.push(l.childNodes[n]);
                } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n]);
            } else if (s.nodeType || s === t || s === e) r.push(s);
            else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) r.push(s[n]);
        return new i(r);
    }
    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
    }
    (s.fn = i.prototype), (s.Class = i), (s.Dom7 = i);
    var r = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this;
        },
        removeClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this;
        },
        hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e);
        },
        toggleClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this;
        },
        attr: function (e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length) this[s].setAttribute(e, t);
                else for (var a in e) (this[s][a] = e[a]), this[s].setAttribute(a, e[a]);
            return this;
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
        },
        data: function (e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), (i.dom7ElementDataStorage[e] = t);
                return this;
            }
            if ((i = this[0])) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0;
            }
        },
        transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                (i.webkitTransform = e), (i.transform = e);
            }
            return this;
        },
        transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                (i.webkitTransitionDuration = e), (i.transitionDuration = e);
            }
            return this;
        },
        on: function () {
            for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
            var a = t[0],
                r = t[1],
                n = t[2],
                o = t[3];
            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if ((i.indexOf(e) < 0 && i.unshift(e), s(t).is(r))) n.apply(t, i);
                    else for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i);
                }
            }
            function d(e) {
                var t = (e && e.target && e.target.dom7EventData) || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
            }
            "function" == typeof t[1] && ((a = (e = t)[0]), (n = e[1]), (o = e[2]), (r = void 0)), o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (h = 0; h < p.length; h += 1) {
                        var v = p[h];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({ listener: n, proxyListener: l }), u.addEventListener(v, l, o);
                    }
                else
                    for (h = 0; h < p.length; h += 1) {
                        var f = p[h];
                        u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({ listener: n, proxyListener: d }), u.addEventListener(f, d, o);
                    }
            }
            return this;
        },
        off: function () {
            for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
            var s = t[0],
                a = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && ((s = (e = t)[0]), (r = e[1]), (n = e[2]), (a = void 0)), n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) {
                    var p = this[h],
                        c = void 0;
                    if ((!a && p.dom7Listeners ? (c = p.dom7Listeners[d]) : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length))
                        for (var u = c.length - 1; u >= 0; u -= 1) {
                            var v = c[u];
                            r && v.listener === r
                                ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                                : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r
                                ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                                : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1));
                        }
                }
            return this;
        },
        trigger: function () {
            for (var i = [], s = arguments.length; s--; ) i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], l = 0; l < this.length; l += 1) {
                    var d = this[l],
                        h = void 0;
                    try {
                        h = new t.CustomEvent(o, { detail: r, bubbles: !0, cancelable: !0 });
                    } catch (t) {
                        (h = e.createEvent("Event")).initEvent(o, !0, !0), (h.detail = r);
                    }
                    (d.dom7EventData = i.filter(function (e, t) {
                        return t > 0;
                    })),
                        d.dispatchEvent(h),
                        (d.dom7EventData = []),
                        delete d.dom7EventData;
                }
            return this;
        },
        transitionEnd: function (e) {
            var t,
                i = ["webkitTransitionEnd", "transitionend"],
                s = this;
            function a(r) {
                if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a);
            }
            if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
            return this;
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        },
        offset: function () {
            if (this.length > 0) {
                var i = this[0],
                    s = i.getBoundingClientRect(),
                    a = e.body,
                    r = i.clientTop || a.clientTop || 0,
                    n = i.clientLeft || a.clientLeft || 0,
                    o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return { top: s.top + o - r, left: s.left + l - n };
            }
            return null;
        },
        css: function (e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1) for (var a in e) this[s].style[a] = e[a];
                    return this;
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
                return this;
            }
            return this;
        },
        each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this;
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
        },
        is: function (a) {
            var r,
                n,
                o = this[0];
            if (!o || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (o.matches) return o.matches(a);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector) return o.msMatchesSelector(a);
                for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1;
            }
            if (a === e) return o === e;
            if (a === t) return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1;
            }
            return !1;
        },
        index: function () {
            var e,
                t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                return e;
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            var t,
                s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? ((t = s + e) < 0 ? [] : [this[t]]) : [this[e]]);
        },
        append: function () {
            for (var t, s = [], a = arguments.length; a--; ) s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) {
                        var o = e.createElement("div");
                        for (o.innerHTML = t; o.firstChild; ) this[n].appendChild(o.firstChild);
                    } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
                    else this[n].appendChild(t);
            }
            return this;
        },
        prepend: function (t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]);
                } else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]);
                else this[s].insertBefore(t, this[s].childNodes[0]);
            return this;
        },
        next: function (e) {
            return this.length > 0
                ? e
                    ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e)
                        ? new i([this[0].nextElementSibling])
                        : new i([])
                    : this[0].nextElementSibling
                    ? new i([this[0].nextElementSibling])
                    : new i([])
                : new i([]);
        },
        nextAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling; ) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
            }
            return new i(t);
        },
        prev: function (e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? (t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([])) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([]);
            }
            return new i([]);
        },
        prevAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling; ) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
            }
            return new i(t);
        },
        parent: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t));
        },
        parents: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].parentNode; r; ) e ? s(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
            return s(a(t));
        },
        closest: function (e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
            for (var t = [], s = 0; s < this.length; s += 1) for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
            return new i(t);
        },
        children: function (e) {
            for (var t = [], r = 0; r < this.length; r += 1) for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t));
        },
        filter: function (e) {
            for (var t = [], s = 0; s < this.length; s += 1) e.call(this[s], s, this[s]) && t.push(this[s]);
            return new i(t);
        },
        remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
        },
        add: function () {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var r = s(e[i]);
                for (a = 0; a < r.length; a += 1) (this[this.length] = r[a]), (this.length += 1);
            }
            return this;
        },
        styles: function () {
            return this[0] ? t.getComputedStyle(this[0], null) : {};
        },
    };
    Object.keys(r).forEach(function (e) {
        s.fn[e] = s.fn[e] || r[e];
    });
    var n = {
            deleteProps: function (e) {
                var t = e;
                Object.keys(t).forEach(function (e) {
                    try {
                        t[e] = null;
                    } catch (e) {}
                    try {
                        delete t[e];
                    } catch (e) {}
                });
            },
            nextTick: function (e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t);
            },
            now: function () {
                return Date.now();
            },
            getTranslate: function (e, i) {
                var s, a, r;
                void 0 === i && (i = "x");
                var n = t.getComputedStyle(e, null);
                return (
                    t.WebKitCSSMatrix
                        ? ((a = n.transform || n.webkitTransform).split(",").length > 6 &&
                              (a = a
                                  .split(", ")
                                  .map(function (e) {
                                      return e.replace(",", ".");
                                  })
                                  .join(", ")),
                          (r = new t.WebKitCSSMatrix("none" === a ? "" : a)))
                        : (s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(",")),
                    "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])),
                    "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])),
                    a || 0
                );
            },
            parseUrlQuery: function (e) {
                var i,
                    s,
                    a,
                    r,
                    n = {},
                    o = e || t.location.href;
                if ("string" == typeof o && o.length)
                    for (
                        r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                            return "" !== e;
                        })).length,
                            i = 0;
                        i < r;
                        i += 1
                    )
                        (a = s[i].replace(/#\S+/g, "").split("=")), (n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
                return n;
            },
            isObject: function (e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object;
            },
            extend: function () {
                for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                    var a = e[s];
                    if (null != a)
                        for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
                            var d = r[o],
                                h = Object.getOwnPropertyDescriptor(a, d);
                            void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? ((i[d] = {}), n.extend(i[d], a[d])) : (i[d] = a[d]));
                        }
                }
                return i;
            },
        },
        o = {
            touch: (t.Modernizr && !0 === t.Modernizr.touch) || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || (t.DocumentTouch && e instanceof t.DocumentTouch)),
            pointerEvents: !!t.PointerEvent && "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0,
            observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
            passiveListener: (function () {
                var e = !1;
                try {
                    var i = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0;
                        },
                    });
                    t.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return e;
            })(),
            gestures: "ongesturestart" in t,
        },
        l = function (e) {
            void 0 === e && (e = {});
            var t = this;
            (t.params = e),
                (t.eventsListeners = {}),
                t.params &&
                    t.params.on &&
                    Object.keys(t.params.on).forEach(function (e) {
                        t.on(e, t.params.on[e]);
                    });
        },
        d = { components: { configurable: !0 } };
    (l.prototype.on = function (e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;
        var a = i ? "unshift" : "push";
        return (
            e.split(" ").forEach(function (e) {
                s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t);
            }),
            s
        );
    }),
        (l.prototype.once = function (e, t, i) {
            var s = this;
            if ("function" != typeof t) return s;
            function a() {
                for (var i = [], r = arguments.length; r--; ) i[r] = arguments[r];
                t.apply(s, i), s.off(e, a), a.f7proxy && delete a.f7proxy;
            }
            return (a.f7proxy = t), s.on(e, a, i);
        }),
        (l.prototype.off = function (e, t) {
            var i = this;
            return i.eventsListeners
                ? (e.split(" ").forEach(function (e) {
                      void 0 === t
                          ? (i.eventsListeners[e] = [])
                          : i.eventsListeners[e] &&
                            i.eventsListeners[e].length &&
                            i.eventsListeners[e].forEach(function (s, a) {
                                (s === t || (s.f7proxy && s.f7proxy === t)) && i.eventsListeners[e].splice(a, 1);
                            });
                  }),
                  i)
                : i;
        }),
        (l.prototype.emit = function () {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            var i,
                s,
                a,
                r = this;
            if (!r.eventsListeners) return r;
            "string" == typeof e[0] || Array.isArray(e[0]) ? ((i = e[0]), (s = e.slice(1, e.length)), (a = r)) : ((i = e[0].events), (s = e[0].data), (a = e[0].context || r));
            var n = Array.isArray(i) ? i : i.split(" ");
            return (
                n.forEach(function (e) {
                    if (r.eventsListeners && r.eventsListeners[e]) {
                        var t = [];
                        r.eventsListeners[e].forEach(function (e) {
                            t.push(e);
                        }),
                            t.forEach(function (e) {
                                e.apply(a, s);
                            });
                    }
                }),
                r
            );
        }),
        (l.prototype.useModulesParams = function (e) {
            var t = this;
            t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var s = t.modules[i];
                    s.params && n.extend(e, s.params);
                });
        }),
        (l.prototype.useModules = function (e) {
            void 0 === e && (e = {});
            var t = this;
            t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var s = t.modules[i],
                        a = e[i] || {};
                    s.instance &&
                        Object.keys(s.instance).forEach(function (e) {
                            var i = s.instance[e];
                            t[e] = "function" == typeof i ? i.bind(t) : i;
                        }),
                        s.on &&
                            t.on &&
                            Object.keys(s.on).forEach(function (e) {
                                t.on(e, s.on[e]);
                            }),
                        s.create && s.create.bind(t)(a);
                });
        }),
        (d.components.set = function (e) {
            this.use && this.use(e);
        }),
        (l.installModule = function (e) {
            for (var t = [], i = arguments.length - 1; i-- > 0; ) t[i] = arguments[i + 1];
            var s = this;
            s.prototype.modules || (s.prototype.modules = {});
            var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
            return (
                (s.prototype.modules[a] = e),
                e.proto &&
                    Object.keys(e.proto).forEach(function (t) {
                        s.prototype[t] = e.proto[t];
                    }),
                e.static &&
                    Object.keys(e.static).forEach(function (t) {
                        s[t] = e.static[t];
                    }),
                e.install && e.install.apply(s, t),
                s
            );
        }),
        (l.use = function (e) {
            for (var t = [], i = arguments.length - 1; i-- > 0; ) t[i] = arguments[i + 1];
            var s = this;
            return Array.isArray(e)
                ? (e.forEach(function (e) {
                      return s.installModule(e);
                  }),
                  s)
                : s.installModule.apply(s, [e].concat(t));
        }),
        Object.defineProperties(l, d);
    var h = {
        updateSize: function () {
            var e,
                t,
                i = this.$el;
            (e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth),
                (t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight),
                (0 === e && this.isHorizontal()) ||
                    (0 === t && this.isVertical()) ||
                    ((e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10)),
                    (t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10)),
                    n.extend(this, { width: e, height: t, size: this.isHorizontal() ? e : t }));
        },
        updateSlides: function () {
            var e = this.params,
                i = this.$wrapperEl,
                s = this.size,
                a = this.rtlTranslate,
                r = this.wrongRTL,
                o = this.virtual && e.virtual.enabled,
                l = o ? this.virtual.slides.length : this.slides.length,
                d = i.children("." + this.params.slideClass),
                h = o ? this.virtual.slides.length : d.length,
                p = [],
                c = [],
                u = [];
            function v(t) {
                return !e.cssMode || t !== d.length - 1;
            }
            var f = e.slidesOffsetBefore;
            "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
            var m = e.slidesOffsetAfter;
            "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
            var g = this.snapGrid.length,
                b = this.snapGrid.length,
                w = e.spaceBetween,
                y = -f,
                x = 0,
                T = 0;
            if (void 0 !== s) {
                var E, C;
                "string" == typeof w && w.indexOf("%") >= 0 && (w = (parseFloat(w.replace("%", "")) / 100) * s),
                    (this.virtualSize = -w),
                    a ? d.css({ marginLeft: "", marginTop: "" }) : d.css({ marginRight: "", marginBottom: "" }),
                    e.slidesPerColumn > 1 &&
                        ((E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn),
                        "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
                for (var S, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
                    C = 0;
                    var $ = d.eq(k);
                    if (e.slidesPerColumn > 1) {
                        var L = void 0,
                            I = void 0,
                            D = void 0;
                        if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                            var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)),
                                A = k - e.slidesPerColumn * e.slidesPerGroup * O,
                                G = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
                            (L = (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) + (D * E) / M), $.css({ "-webkit-box-ordinal-group": L, "-moz-box-ordinal-group": L, "-ms-flex-order": L, "-webkit-order": L, order: L });
                        } else "column" === e.slidesPerColumnFill ? ((D = k - (I = Math.floor(k / M)) * M), (I > z || (I === z && D === M - 1)) && (D += 1) >= M && ((D = 0), (I += 1))) : (I = k - (D = Math.floor(k / P)) * P);
                        $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px");
                    }
                    if ("none" !== $.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var B = t.getComputedStyle($[0], null),
                                H = $[0].style.transform,
                                N = $[0].style.webkitTransform;
                            if ((H && ($[0].style.transform = "none"), N && ($[0].style.webkitTransform = "none"), e.roundLengths)) C = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
                            else if (this.isHorizontal()) {
                                var X = parseFloat(B.getPropertyValue("width")),
                                    V = parseFloat(B.getPropertyValue("padding-left")),
                                    Y = parseFloat(B.getPropertyValue("padding-right")),
                                    F = parseFloat(B.getPropertyValue("margin-left")),
                                    W = parseFloat(B.getPropertyValue("margin-right")),
                                    R = B.getPropertyValue("box-sizing");
                                C = R && "border-box" === R ? X + F + W : X + V + Y + F + W;
                            } else {
                                var q = parseFloat(B.getPropertyValue("height")),
                                    j = parseFloat(B.getPropertyValue("padding-top")),
                                    K = parseFloat(B.getPropertyValue("padding-bottom")),
                                    U = parseFloat(B.getPropertyValue("margin-top")),
                                    _ = parseFloat(B.getPropertyValue("margin-bottom")),
                                    Z = B.getPropertyValue("box-sizing");
                                C = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _;
                            }
                            H && ($[0].style.transform = H), N && ($[0].style.webkitTransform = N), e.roundLengths && (C = Math.floor(C));
                        } else (C = (s - (e.slidesPerView - 1) * w) / e.slidesPerView), e.roundLengths && (C = Math.floor(C)), d[k] && (this.isHorizontal() ? (d[k].style.width = C + "px") : (d[k].style.height = C + "px"));
                        d[k] && (d[k].swiperSlideSize = C),
                            u.push(C),
                            e.centeredSlides
                                ? ((y = y + C / 2 + x / 2 + w),
                                  0 === x && 0 !== k && (y = y - s / 2 - w),
                                  0 === k && (y = y - s / 2 - w),
                                  Math.abs(y) < 0.001 && (y = 0),
                                  e.roundLengths && (y = Math.floor(y)),
                                  T % e.slidesPerGroup == 0 && p.push(y),
                                  c.push(y))
                                : (e.roundLengths && (y = Math.floor(y)), T % e.slidesPerGroup == 0 && p.push(y), c.push(y), (y = y + C + w)),
                            (this.virtualSize += C + w),
                            (x = C),
                            (T += 1);
                    }
                }
                if (
                    ((this.virtualSize = Math.max(this.virtualSize, s) + m),
                    a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({ width: this.virtualSize + e.spaceBetween + "px" }),
                    e.setWrapperSize && (this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" })),
                    e.slidesPerColumn > 1 &&
                        ((this.virtualSize = (C + e.spaceBetween) * E),
                        (this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween),
                        this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" }),
                        e.centeredSlides))
                ) {
                    S = [];
                    for (var Q = 0; Q < p.length; Q += 1) {
                        var J = p[Q];
                        e.roundLengths && (J = Math.floor(J)), p[Q] < this.virtualSize + p[0] && S.push(J);
                    }
                    p = S;
                }
                if (!e.centeredSlides) {
                    S = [];
                    for (var ee = 0; ee < p.length; ee += 1) {
                        var te = p[ee];
                        e.roundLengths && (te = Math.floor(te)), p[ee] <= this.virtualSize - s && S.push(te);
                    }
                    (p = S), Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s);
                }
                if (
                    (0 === p.length && (p = [0]),
                    0 !== e.spaceBetween && (this.isHorizontal() ? (a ? d.filter(v).css({ marginLeft: w + "px" }) : d.filter(v).css({ marginRight: w + "px" })) : d.filter(v).css({ marginBottom: w + "px" })),
                    e.centeredSlides && e.centeredSlidesBounds)
                ) {
                    var ie = 0;
                    u.forEach(function (t) {
                        ie += t + (e.spaceBetween ? e.spaceBetween : 0);
                    });
                    var se = (ie -= e.spaceBetween) - s;
                    p = p.map(function (e) {
                        return e < 0 ? -f : e > se ? se + m : e;
                    });
                }
                if (e.centerInsufficientSlides) {
                    var ae = 0;
                    if (
                        (u.forEach(function (t) {
                            ae += t + (e.spaceBetween ? e.spaceBetween : 0);
                        }),
                        (ae -= e.spaceBetween) < s)
                    ) {
                        var re = (s - ae) / 2;
                        p.forEach(function (e, t) {
                            p[t] = e - re;
                        }),
                            c.forEach(function (e, t) {
                                c[t] = e + re;
                            });
                    }
                }
                n.extend(this, { slides: d, snapGrid: p, slidesGrid: c, slidesSizesGrid: u }),
                    h !== l && this.emit("slidesLengthChange"),
                    p.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")),
                    c.length !== b && this.emit("slidesGridLengthChange"),
                    (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset();
            }
        },
        updateAutoHeight: function (e) {
            var t,
                i = [],
                s = 0;
            if (("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1))
                for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                    var a = this.activeIndex + t;
                    if (a > this.slides.length) break;
                    i.push(this.slides.eq(a)[0]);
                }
            else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s;
                }
            s && this.$wrapperEl.css("height", s + "px");
        },
        updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = (this && this.translate) || 0);
            var t = this.params,
                i = this.slides,
                a = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var r = -e;
                a && (r = e), i.removeClass(t.slideVisibleClass), (this.visibleSlidesIndexes = []), (this.visibleSlides = []);
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset),
                            h = d + this.slidesSizesGrid[n];
                        ((d >= 0 && d < this.size - 1) || (h > 1 && h <= this.size) || (d <= 0 && h >= this.size)) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass));
                    }
                    o.progress = a ? -l : l;
                }
                this.visibleSlides = s(this.visibleSlides);
            }
        },
        updateProgress: function (e) {
            if (void 0 === e) {
                var t = this.rtlTranslate ? -1 : 1;
                e = (this && this.translate && this.translate * t) || 0;
            }
            var i = this.params,
                s = this.maxTranslate() - this.minTranslate(),
                a = this.progress,
                r = this.isBeginning,
                o = this.isEnd,
                l = r,
                d = o;
            0 === s ? ((a = 0), (r = !0), (o = !0)) : ((r = (a = (e - this.minTranslate()) / s) <= 0), (o = a >= 1)),
                n.extend(this, { progress: a, isBeginning: r, isEnd: o }),
                (i.watchSlidesProgress || i.watchSlidesVisibility) && this.updateSlidesProgress(e),
                r && !l && this.emit("reachBeginning toEdge"),
                o && !d && this.emit("reachEnd toEdge"),
                ((l && !r) || (d && !o)) && this.emit("fromEdge"),
                this.emit("progress", a);
        },
        updateSlidesClasses: function () {
            var e,
                t = this.slides,
                i = this.params,
                s = this.$wrapperEl,
                a = this.activeIndex,
                r = this.realIndex,
                n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
                (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass),
                i.loop &&
                    (e.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e
                .nextAll("." + i.slideClass)
                .eq(0)
                .addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e
                .prevAll("." + i.slideClass)
                .eq(0)
                .addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
                i.loop &&
                    (o.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
                    l.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass));
        },
        updateActiveIndex: function (e) {
            var t,
                i = this.rtlTranslate ? this.translate : -this.translate,
                s = this.slidesGrid,
                a = this.snapGrid,
                r = this.params,
                o = this.activeIndex,
                l = this.realIndex,
                d = this.snapIndex,
                h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? (i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? (h = p) : i >= s[p] && i < s[p + 1] && (h = p + 1)) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
            }
            if (((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== o)) {
                var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                n.extend(this, { snapIndex: t, realIndex: c, previousIndex: o, activeIndex: h }),
                    this.emit("activeIndexChange"),
                    this.emit("snapIndexChange"),
                    l !== c && this.emit("realIndexChange"),
                    (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange");
            } else t !== d && ((this.snapIndex = t), this.emit("snapIndexChange"));
        },
        updateClickedSlide: function (e) {
            var t = this.params,
                i = s(e.target).closest("." + t.slideClass)[0],
                a = !1;
            if (i) for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
            if (!i || !a) return (this.clickedSlide = void 0), void (this.clickedIndex = void 0);
            (this.clickedSlide = i),
                this.virtual && this.params.virtual.enabled ? (this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10)) : (this.clickedIndex = s(i).index()),
                t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide();
        },
    };
    var p = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                i = this.rtlTranslate,
                s = this.translate,
                a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -s : s;
            if (t.cssMode) return s;
            var r = n.getTranslate(a[0], e);
            return i && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
            var i = this.rtlTranslate,
                s = this.params,
                a = this.$wrapperEl,
                r = this.wrapperEl,
                n = this.progress,
                o = 0,
                l = 0;
            this.isHorizontal() ? (o = i ? -e : e) : (l = e),
                s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
                s.cssMode ? (r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l) : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
                (this.previousTranslate = this.translate),
                (this.translate = this.isHorizontal() ? o : l);
            var d = this.maxTranslate() - this.minTranslate();
            (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t);
        },
        minTranslate: function () {
            return -this.snapGrid[0];
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, i, s, a) {
            var r;
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
            var n = this,
                o = n.params,
                l = n.wrapperEl;
            if (n.animating && o.preventInteractionOnTransition) return !1;
            var d,
                h = n.minTranslate(),
                p = n.maxTranslate();
            if (((d = s && e > h ? h : s && e < p ? p : e), n.updateProgress(d), o.cssMode)) {
                var c = n.isHorizontal();
                return 0 === t ? (l[c ? "scrollLeft" : "scrollTop"] = -d) : l.scrollTo ? l.scrollTo((((r = {})[c ? "left" : "top"] = -d), (r.behavior = "smooth"), r)) : (l[c ? "scrollLeft" : "scrollTop"] = -d), !0;
            }
            return (
                0 === t
                    ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd")))
                    : (n.setTransition(t),
                      n.setTranslate(d),
                      i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")),
                      n.animating ||
                          ((n.animating = !0),
                          n.onTranslateToWrapperTransitionEnd ||
                              (n.onTranslateToWrapperTransitionEnd = function (e) {
                                  n &&
                                      !n.destroyed &&
                                      e.target === this &&
                                      (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                                      n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd),
                                      (n.onTranslateToWrapperTransitionEnd = null),
                                      delete n.onTranslateToWrapperTransitionEnd,
                                      i && n.emit("transitionEnd"));
                              }),
                          n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                          n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))),
                !0
            );
        },
    };
    var c = {
        setTransition: function (e, t) {
            this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.params,
                a = this.previousIndex;
            if (!s.cssMode) {
                s.autoHeight && this.updateAutoHeight();
                var r = t;
                if ((r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a)) {
                    if ("reset" === r) return void this.emit("slideResetTransitionStart");
                    this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart");
                }
            }
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.previousIndex,
                a = this.params;
            if (((this.animating = !1), !a.cssMode)) {
                this.setTransition(0);
                var r = t;
                if ((r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s)) {
                    if ("reset" === r) return void this.emit("slideResetTransitionEnd");
                    this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd");
                }
            }
        },
    };
    var u = {
        slideTo: function (e, t, i, s) {
            var a;
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var r = this,
                n = e;
            n < 0 && (n = 0);
            var o = r.params,
                l = r.snapGrid,
                d = r.slidesGrid,
                h = r.previousIndex,
                p = r.activeIndex,
                c = r.rtlTranslate,
                u = r.wrapperEl;
            if (r.animating && o.preventInteractionOnTransition) return !1;
            var v = Math.floor(n / o.slidesPerGroup);
            v >= l.length && (v = l.length - 1), (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
            var f,
                m = -l[v];
            if ((r.updateProgress(m), o.normalizeSlideIndex)) for (var g = 0; g < d.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * d[g]) && (n = g);
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && m < r.translate && m < r.minTranslate()) return !1;
                if (!r.allowSlidePrev && m > r.translate && m > r.maxTranslate() && (p || 0) !== n) return !1;
            }
            if (((f = n > p ? "next" : n < p ? "prev" : "reset"), (c && -m === r.translate) || (!c && m === r.translate)))
                return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(m), "reset" !== f && (r.transitionStart(i, f), r.transitionEnd(i, f)), !1;
            if (o.cssMode) {
                var b = r.isHorizontal();
                return 0 === t ? (u[b ? "scrollLeft" : "scrollTop"] = -m) : u.scrollTo ? u.scrollTo((((a = {})[b ? "left" : "top"] = -m), (a.behavior = "smooth"), a)) : (u[b ? "scrollLeft" : "scrollTop"] = -m), !0;
            }
            return (
                0 === t
                    ? (r.setTransition(0), r.setTranslate(m), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, f), r.transitionEnd(i, f))
                    : (r.setTransition(t),
                      r.setTranslate(m),
                      r.updateActiveIndex(n),
                      r.updateSlidesClasses(),
                      r.emit("beforeTransitionStart", t, s),
                      r.transitionStart(i, f),
                      r.animating ||
                          ((r.animating = !0),
                          r.onSlideToWrapperTransitionEnd ||
                              (r.onSlideToWrapperTransitionEnd = function (e) {
                                  r &&
                                      !r.destroyed &&
                                      e.target === this &&
                                      (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                                      r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                                      (r.onSlideToWrapperTransitionEnd = null),
                                      delete r.onSlideToWrapperTransitionEnd,
                                      r.transitionEnd(i, f));
                              }),
                          r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                          r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))),
                !0
            );
        },
        slideToLoop: function (e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s);
        },
        slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating;
            return s.loop ? !a && (this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft), this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i);
        },
        slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating,
                r = this.snapGrid,
                n = this.slidesGrid,
                o = this.rtlTranslate;
            if (s.loop) {
                if (a) return !1;
                this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft);
            }
            function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            var d,
                h = l(o ? this.translate : -this.translate),
                p = r.map(function (e) {
                    return l(e);
                }),
                c =
                    (n.map(function (e) {
                        return l(e);
                    }),
                    r[p.indexOf(h)],
                    r[p.indexOf(h) - 1]);
            return (
                void 0 === c &&
                    s.cssMode &&
                    r.forEach(function (e) {
                        !c && h >= e && (c = e);
                    }),
                void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1),
                this.slideTo(d, e, t, i)
            );
        },
        slideReset: function (e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
        },
        slideToClosest: function (e, t, i, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = 0.5);
            var a = this.activeIndex,
                r = Math.floor(a / this.params.slidesPerGroup),
                n = this.rtlTranslate ? this.translate : -this.translate;
            if (n >= this.snapGrid[r]) {
                var o = this.snapGrid[r];
                n - o > (this.snapGrid[r + 1] - o) * s && (a += this.params.slidesPerGroup);
            } else {
                var l = this.snapGrid[r - 1];
                n - l <= (this.snapGrid[r] - l) * s && (a -= this.params.slidesPerGroup);
            }
            return (a = Math.max(a, 0)), (a = Math.min(a, this.snapGrid.length - 1)), this.slideTo(a, e, t, i);
        },
        slideToClickedSlide: function () {
            var e,
                t = this,
                i = t.params,
                a = t.$wrapperEl,
                r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                o = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                (e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
                    i.centeredSlides
                        ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2
                            ? (t.loopFix(),
                              (o = a
                                  .children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")")
                                  .eq(0)
                                  .index()),
                              n.nextTick(function () {
                                  t.slideTo(o);
                              }))
                            : t.slideTo(o)
                        : o > t.slides.length - r
                        ? (t.loopFix(),
                          (o = a
                              .children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")")
                              .eq(0)
                              .index()),
                          n.nextTick(function () {
                              t.slideTo(o);
                          }))
                        : t.slideTo(o);
            } else t.slideTo(o);
        },
    };
    var v = {
        loopCreate: function () {
            var t = this,
                i = t.params,
                a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - (r.length % i.slidesPerGroup);
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l);
                    }
                    r = a.children("." + i.slideClass);
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length),
                (t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10))),
                (t.loopedSlides += i.loopAdditionalSlides),
                t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = [],
                h = [];
            r.each(function (e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e);
            });
            for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
            var e,
                t = this.activeIndex,
                i = this.slides,
                s = this.loopedSlides,
                a = this.allowSlidePrev,
                r = this.allowSlideNext,
                n = this.snapGrid,
                o = this.rtlTranslate;
            (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
            var l = -n[t] - this.getTranslate();
            if (t < s) (e = i.length - 3 * s + t), (e += s), this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);
            else if (t >= i.length - s) {
                (e = -i.length + t + s), (e += s), this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);
            }
            (this.allowSlidePrev = a), (this.allowSlideNext = r);
        },
        loopDestroy: function () {
            var e = this.$wrapperEl,
                t = this.params,
                i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index");
        },
    };
    var f = {
        setGrabCursor: function (e) {
            if (!(o.touch || !this.params.simulateTouch || (this.params.watchOverflow && this.isLocked) || this.params.cssMode)) {
                var t = this.el;
                (t.style.cursor = "move"), (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"), (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"), (t.style.cursor = e ? "grabbing" : "grab");
            }
        },
        unsetGrabCursor: function () {
            o.touch || (this.params.watchOverflow && this.isLocked) || this.params.cssMode || (this.el.style.cursor = "");
        },
    };
    var m,
        g,
        b,
        w,
        y,
        x,
        T,
        E,
        C,
        S,
        M,
        P,
        z,
        k,
        $,
        L = {
            appendSlide: function (e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if ((i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)) for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
                else t.append(e);
                i.loop && this.loopCreate(), (i.observer && o.observer) || this.update();
            },
            prependSlide: function (e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && this.loopDestroy();
                var a = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
                    a = s + e.length;
                } else i.prepend(e);
                t.loop && this.loopCreate(), (t.observer && o.observer) || this.update(), this.slideTo(a, 0, !1);
            },
            addSlide: function (e, t) {
                var i = this.$wrapperEl,
                    s = this.params,
                    a = this.activeIndex;
                s.loop && ((a -= this.loopedSlides), this.loopDestroy(), (this.slides = i.children("." + s.slideClass)));
                var r = this.slides.length;
                if (e <= 0) this.prependSlide(t);
                else if (e >= r) this.appendSlide(t);
                else {
                    for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
                        var h = this.slides.eq(d);
                        h.remove(), l.unshift(h);
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var p = 0; p < t.length; p += 1) t[p] && i.append(t[p]);
                        n = a > e ? a + t.length : a;
                    } else i.append(t);
                    for (var c = 0; c < l.length; c += 1) i.append(l[c]);
                    s.loop && this.loopCreate(), (s.observer && o.observer) || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1);
                }
            },
            removeSlide: function (e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && ((s -= this.loopedSlides), this.loopDestroy(), (this.slides = i.children("." + t.slideClass)));
                var a,
                    r = s;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) (a = e[n]), this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
                    r = Math.max(r, 0);
                } else (a = e), this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), (r = Math.max(r, 0));
                t.loop && this.loopCreate(), (t.observer && o.observer) || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1);
            },
            removeAllSlides: function () {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e);
            },
        },
        I =
            ((m = t.navigator.platform),
            (g = t.navigator.userAgent),
            (b = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                edge: !1,
                ie: !1,
                firefox: !1,
                macos: !1,
                windows: !1,
                cordova: !(!t.cordova && !t.phonegap),
                phonegap: !(!t.cordova && !t.phonegap),
                electron: !1,
            }),
            (w = t.screen.width),
            (y = t.screen.height),
            (x = g.match(/(Android);?[\s\/]+([\d.]+)?/)),
            (T = g.match(/(iPad).*OS\s([\d_]+)/)),
            (E = g.match(/(iPod)(.*OS\s([\d_]+))?/)),
            (C = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/)),
            (S = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0),
            (M = g.indexOf("Edge/") >= 0),
            (P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0),
            (z = "Win32" === m),
            (k = g.toLowerCase().indexOf("electron") >= 0),
            ($ = "MacIntel" === m),
            !T && $ && o.touch && ((1024 === w && 1366 === y) || (834 === w && 1194 === y) || (834 === w && 1112 === y) || (768 === w && 1024 === y)) && ((T = g.match(/(Version)\/([\d.]+)/)), ($ = !1)),
            (b.ie = S),
            (b.edge = M),
            (b.firefox = P),
            x && !z && ((b.os = "android"), (b.osVersion = x[2]), (b.android = !0), (b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0)),
            (T || C || E) && ((b.os = "ios"), (b.ios = !0)),
            C && !E && ((b.osVersion = C[2].replace(/_/g, ".")), (b.iphone = !0)),
            T && ((b.osVersion = T[2].replace(/_/g, ".")), (b.ipad = !0)),
            E && ((b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null), (b.ipod = !0)),
            b.ios && b.osVersion && g.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]),
            (b.webView = !(!(C || T || E) || (!g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone)) || (t.matchMedia && t.matchMedia("(display-mode: standalone)").matches)),
            (b.webview = b.webView),
            (b.standalone = b.webView),
            (b.desktop = !(b.ios || b.android) || k),
            b.desktop && ((b.electron = k), (b.macos = $), (b.windows = z), b.macos && (b.os = "macos"), b.windows && (b.os = "windows")),
            (b.pixelRatio = t.devicePixelRatio || 1),
            b);
    function D(i) {
        var a = this.touchEventsData,
            r = this.params,
            o = this.touches;
        if (!this.animating || !r.preventInteractionOnTransition) {
            var l = i;
            l.originalEvent && (l = l.originalEvent);
            var d = s(l.target);
            if (
                ("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) &&
                ((a.isTouchEvent = "touchstart" === l.type), (a.isTouchEvent || !("which" in l) || 3 !== l.which) && !((!a.isTouchEvent && "button" in l && l.button > 0) || (a.isTouched && a.isMoved)))
            )
                if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0;
                else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
                    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX), (o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
                    var h = o.currentX,
                        p = o.currentY,
                        c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
                        u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                    if (!c || !(h <= u || h >= t.screen.width - u)) {
                        if (
                            (n.extend(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
                            (o.startX = h),
                            (o.startY = p),
                            (a.touchStartTime = n.now()),
                            (this.allowClick = !0),
                            this.updateSize(),
                            (this.swipeDirection = void 0),
                            r.threshold > 0 && (a.allowThresholdMove = !1),
                            "touchstart" !== l.type)
                        ) {
                            var v = !0;
                            d.is(a.formElements) && (v = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
                            var f = v && this.allowTouchMove && r.touchStartPreventDefault;
                            (r.touchStartForcePreventDefault || f) && l.preventDefault();
                        }
                        this.emit("touchStart", l);
                    }
                }
        }
    }
    function O(t) {
        var i = this.touchEventsData,
            a = this.params,
            r = this.touches,
            o = this.rtlTranslate,
            l = t;
        if ((l.originalEvent && (l = l.originalEvent), i.isTouched)) {
            if (!i.isTouchEvent || "mousemove" !== l.type) {
                var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
                    h = "touchmove" === l.type ? d.pageX : l.pageX,
                    p = "touchmove" === l.type ? d.pageY : l.pageY;
                if (l.preventedByNestedSwiper) return (r.startX = h), void (r.startY = p);
                if (!this.allowTouchMove) return (this.allowClick = !1), void (i.isTouched && (n.extend(r, { startX: h, startY: p, currentX: h, currentY: p }), (i.touchStartTime = n.now())));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                    if (this.isVertical()) {
                        if ((p < r.startY && this.translate <= this.maxTranslate()) || (p > r.startY && this.translate >= this.minTranslate())) return (i.isTouched = !1), void (i.isMoved = !1);
                    } else if ((h < r.startX && this.translate <= this.maxTranslate()) || (h > r.startX && this.translate >= this.minTranslate())) return;
                if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements)) return (i.isMoved = !0), void (this.allowClick = !1);
                if ((i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1))) {
                    (r.currentX = h), (r.currentY = p);
                    var c = r.currentX - r.startX,
                        u = r.currentY - r.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling)
                            (this.isHorizontal() && r.currentY === r.startY) || (this.isVertical() && r.currentX === r.startX)
                                ? (i.isScrolling = !1)
                                : c * c + u * u >= 25 && ((v = (180 * Math.atan2(Math.abs(u), Math.abs(c))) / Math.PI), (i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle));
                        if ((i.isScrolling && this.emit("touchMoveOpposite", l), void 0 === i.startMoving && ((r.currentX === r.startX && r.currentY === r.startY) || (i.startMoving = !0)), i.isScrolling)) i.isTouched = !1;
                        else if (i.startMoving) {
                            (this.allowClick = !1),
                                a.cssMode || l.preventDefault(),
                                a.touchMoveStopPropagation && !a.nested && l.stopPropagation(),
                                i.isMoved ||
                                    (a.loop && this.loopFix(),
                                    (i.startTranslate = this.getTranslate()),
                                    this.setTransition(0),
                                    this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                    (i.allowMomentumBounce = !1),
                                    !a.grabCursor || (!0 !== this.allowSlideNext && !0 !== this.allowSlidePrev) || this.setGrabCursor(!0),
                                    this.emit("sliderFirstMove", l)),
                                this.emit("sliderMove", l),
                                (i.isMoved = !0);
                            var f = this.isHorizontal() ? c : u;
                            (r.diff = f), (f *= a.touchRatio), o && (f = -f), (this.swipeDirection = f > 0 ? "prev" : "next"), (i.currentTranslate = f + i.startTranslate);
                            var m = !0,
                                g = a.resistanceRatio;
                            if (
                                (a.touchReleaseOnEdges && (g = 0),
                                f > 0 && i.currentTranslate > this.minTranslate()
                                    ? ((m = !1), a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g)))
                                    : f < 0 && i.currentTranslate < this.maxTranslate() && ((m = !1), a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))),
                                m && (l.preventedByNestedSwiper = !0),
                                !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                                !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                                a.threshold > 0)
                            ) {
                                if (!(Math.abs(f) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove)
                                    return (
                                        (i.allowThresholdMove = !0),
                                        (r.startX = r.currentX),
                                        (r.startY = r.currentY),
                                        (i.currentTranslate = i.startTranslate),
                                        void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                                    );
                            }
                            a.followFinger &&
                                !a.cssMode &&
                                ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()),
                                a.freeMode &&
                                    (0 === i.velocities.length && i.velocities.push({ position: r[this.isHorizontal() ? "startX" : "startY"], time: i.touchStartTime }),
                                    i.velocities.push({ position: r[this.isHorizontal() ? "currentX" : "currentY"], time: n.now() })),
                                this.updateProgress(i.currentTranslate),
                                this.setTranslate(i.currentTranslate));
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l);
    }
    function A(e) {
        var t = this,
            i = t.touchEventsData,
            s = t.params,
            a = t.touches,
            r = t.rtlTranslate,
            o = t.$wrapperEl,
            l = t.slidesGrid,
            d = t.snapGrid,
            h = e;
        if ((h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), (i.allowTouchCallbacks = !1), !i.isTouched))
            return i.isMoved && s.grabCursor && t.setGrabCursor(!1), (i.isMoved = !1), void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p,
            c = n.now(),
            u = c - i.touchStartTime;
        if (
            (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)),
            (i.lastClickTime = n.now()),
            n.nextTick(function () {
                t.destroyed || (t.allowClick = !0);
            }),
            !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
        )
            return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
        if (((i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1), (p = s.followFinger ? (r ? t.translate : -t.translate) : -i.currentTranslate), !s.cssMode))
            if (s.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                if (s.freeModeMomentum) {
                    if (i.velocities.length > 1) {
                        var v = i.velocities.pop(),
                            f = i.velocities.pop(),
                            m = v.position - f.position,
                            g = v.time - f.time;
                        (t.velocity = m / g), (t.velocity /= 2), Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || n.now() - v.time > 300) && (t.velocity = 0);
                    } else t.velocity = 0;
                    (t.velocity *= s.freeModeMomentumVelocityRatio), (i.velocities.length = 0);
                    var b = 1e3 * s.freeModeMomentumRatio,
                        w = t.velocity * b,
                        y = t.translate + w;
                    r && (y = -y);
                    var x,
                        T,
                        E = !1,
                        C = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                    if (y < t.maxTranslate())
                        s.freeModeMomentumBounce ? (y + t.maxTranslate() < -C && (y = t.maxTranslate() - C), (x = t.maxTranslate()), (E = !0), (i.allowMomentumBounce = !0)) : (y = t.maxTranslate()), s.loop && s.centeredSlides && (T = !0);
                    else if (y > t.minTranslate())
                        s.freeModeMomentumBounce ? (y - t.minTranslate() > C && (y = t.minTranslate() + C), (x = t.minTranslate()), (E = !0), (i.allowMomentumBounce = !0)) : (y = t.minTranslate()), s.loop && s.centeredSlides && (T = !0);
                    else if (s.freeModeSticky) {
                        for (var S, M = 0; M < d.length; M += 1)
                            if (d[M] > -y) {
                                S = M;
                                break;
                            }
                        y = -(y = Math.abs(d[S] - y) < Math.abs(d[S - 1] - y) || "next" === t.swipeDirection ? d[S] : d[S - 1]);
                    }
                    if (
                        (T &&
                            t.once("transitionEnd", function () {
                                t.loopFix();
                            }),
                        0 !== t.velocity)
                    ) {
                        if (((b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity)), s.freeModeSticky)) {
                            var P = Math.abs((r ? -y : y) - t.translate),
                                z = t.slidesSizesGrid[t.activeIndex];
                            b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed;
                        }
                    } else if (s.freeModeSticky) return void t.slideToClosest();
                    s.freeModeMomentumBounce && E
                        ? (t.updateProgress(x),
                          t.setTransition(b),
                          t.setTranslate(y),
                          t.transitionStart(!0, t.swipeDirection),
                          (t.animating = !0),
                          o.transitionEnd(function () {
                              t &&
                                  !t.destroyed &&
                                  i.allowMomentumBounce &&
                                  (t.emit("momentumBounce"),
                                  t.setTransition(s.speed),
                                  t.setTranslate(x),
                                  o.transitionEnd(function () {
                                      t && !t.destroyed && t.transitionEnd();
                                  }));
                          }))
                        : t.velocity
                        ? (t.updateProgress(y),
                          t.setTransition(b),
                          t.setTranslate(y),
                          t.transitionStart(!0, t.swipeDirection),
                          t.animating ||
                              ((t.animating = !0),
                              o.transitionEnd(function () {
                                  t && !t.destroyed && t.transitionEnd();
                              })))
                        : t.updateProgress(y),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses();
                } else if (s.freeModeSticky) return void t.slideToClosest();
                (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
            } else {
                for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < l.length; L += s.slidesPerGroup)
                    void 0 !== l[L + s.slidesPerGroup] ? p >= l[L] && p < l[L + s.slidesPerGroup] && ((k = L), ($ = l[L + s.slidesPerGroup] - l[L])) : p >= l[L] && ((k = L), ($ = l[l.length - 1] - l[l.length - 2]));
                var I = (p - l[k]) / $;
                if (u > s.longSwipesMs) {
                    if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (I >= s.longSwipesRatio ? t.slideTo(k + s.slidesPerGroup) : t.slideTo(k)), "prev" === t.swipeDirection && (I > 1 - s.longSwipesRatio ? t.slideTo(k + s.slidesPerGroup) : t.slideTo(k));
                } else {
                    if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl)
                        ? h.target === t.navigation.nextEl
                            ? t.slideTo(k + s.slidesPerGroup)
                            : t.slideTo(k)
                        : ("next" === t.swipeDirection && t.slideTo(k + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(k));
                }
            }
    }
    function G() {
        var e = this.params,
            t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext,
                s = this.allowSlidePrev,
                a = this.snapGrid;
            (this.allowSlideNext = !0),
                (this.allowSlidePrev = !0),
                this.updateSize(),
                this.updateSlides(),
                this.updateSlidesClasses(),
                ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0),
                this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(),
                (this.allowSlidePrev = s),
                (this.allowSlideNext = i),
                this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow();
        }
    }
    function B(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
    }
    function H() {
        var e = this.wrapperEl;
        (this.previousTranslate = this.translate), (this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop), -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
        var t = this.maxTranslate() - this.minTranslate();
        (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1);
    }
    var N = !1;
    function X() {}
    var V = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: 0.02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
        },
        Y = {
            update: h,
            translate: p,
            transition: c,
            slide: u,
            loop: v,
            grabCursor: f,
            manipulation: L,
            events: {
                attachEvents: function () {
                    var t = this.params,
                        i = this.touchEvents,
                        s = this.el,
                        a = this.wrapperEl;
                    (this.onTouchStart = D.bind(this)), (this.onTouchMove = O.bind(this)), (this.onTouchEnd = A.bind(this)), t.cssMode && (this.onScroll = H.bind(this)), (this.onClick = B.bind(this));
                    var r = !!t.nested;
                    if (!o.touch && o.pointerEvents) s.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, r), e.addEventListener(i.end, this.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                            s.addEventListener(i.start, this.onTouchStart, n),
                                s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? { passive: !1, capture: r } : r),
                                s.addEventListener(i.end, this.onTouchEnd, n),
                                i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n),
                                N || (e.addEventListener("touchstart", X), (N = !0));
                        }
                        ((t.simulateTouch && !I.ios && !I.android) || (t.simulateTouch && !o.touch && I.ios)) &&
                            (s.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, r), e.addEventListener("mouseup", this.onTouchEnd, !1));
                    }
                    (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0),
                        t.cssMode && a.addEventListener("scroll", this.onScroll),
                        this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0);
                },
                detachEvents: function () {
                    var t = this.params,
                        i = this.touchEvents,
                        s = this.el,
                        a = this.wrapperEl,
                        r = !!t.nested;
                    if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                            s.removeEventListener(i.start, this.onTouchStart, n),
                                s.removeEventListener(i.move, this.onTouchMove, r),
                                s.removeEventListener(i.end, this.onTouchEnd, n),
                                i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n);
                        }
                        ((t.simulateTouch && !I.ios && !I.android) || (t.simulateTouch && !o.touch && I.ios)) &&
                            (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1));
                    }
                    (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0),
                        t.cssMode && a.removeEventListener("scroll", this.onScroll),
                        this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G);
                },
            },
            breakpoints: {
                setBreakpoint: function () {
                    var e = this.activeIndex,
                        t = this.initialized,
                        i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = this.params,
                        a = this.$el,
                        r = s.breakpoints;
                    if (r && (!r || 0 !== Object.keys(r).length)) {
                        var o = this.getBreakpoint(r);
                        if (o && this.currentBreakpoint !== o) {
                            var l = o in r ? r[o] : void 0;
                            l &&
                                ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerColumn"].forEach(function (e) {
                                    var t = l[e];
                                    void 0 !== t && (l[e] = "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t) ? ("slidesPerView" === e ? parseFloat(t) : parseInt(t, 10)) : "auto");
                                });
                            var d = l || this.originalParams,
                                h = s.slidesPerColumn > 1,
                                p = d.slidesPerColumn > 1;
                            h && !p
                                ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column")
                                : !h && p && (a.addClass(s.containerModifierClass + "multirow"), "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
                            var c = d.direction && d.direction !== s.direction,
                                u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
                            c && t && this.changeDirection(),
                                n.extend(this.params, d),
                                n.extend(this, { allowTouchMove: this.params.allowTouchMove, allowSlideNext: this.params.allowSlideNext, allowSlidePrev: this.params.allowSlidePrev }),
                                (this.currentBreakpoint = o),
                                u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)),
                                this.emit("breakpoint", d);
                        }
                    }
                },
                getBreakpoint: function (e) {
                    if (e) {
                        var i = !1,
                            s = [];
                        Object.keys(e).forEach(function (e) {
                            s.push(e);
                        }),
                            s.sort(function (e, t) {
                                return parseInt(e, 10) - parseInt(t, 10);
                            });
                        for (var a = 0; a < s.length; a += 1) {
                            var r = s[a];
                            r <= t.innerWidth && (i = r);
                        }
                        return i || "max";
                    }
                },
            },
            checkOverflow: {
                checkOverflow: function () {
                    var e = this.params,
                        t = this.isLocked,
                        i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                    e.slidesOffsetBefore && e.slidesOffsetAfter && i ? (this.isLocked = i <= this.size) : (this.isLocked = 1 === this.snapGrid.length),
                        (this.allowSlideNext = !this.isLocked),
                        (this.allowSlidePrev = !this.isLocked),
                        t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"),
                        t && t !== this.isLocked && ((this.isEnd = !1), this.navigation.update());
                },
            },
            classes: {
                addClasses: function () {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        s = this.$el,
                        a = [];
                    a.push("initialized"),
                        a.push(t.direction),
                        t.freeMode && a.push("free-mode"),
                        t.autoHeight && a.push("autoheight"),
                        i && a.push("rtl"),
                        t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")),
                        I.android && a.push("android"),
                        I.ios && a.push("ios"),
                        t.cssMode && a.push("css-mode"),
                        a.forEach(function (i) {
                            e.push(t.containerModifierClass + i);
                        }),
                        s.addClass(e.join(" "));
                },
                removeClasses: function () {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "));
                },
            },
            images: {
                loadImage: function (e, i, s, a, r, n) {
                    var o;
                    function l() {
                        n && n();
                    }
                    e.complete && r ? l() : i ? (((o = new t.Image()).onload = l), (o.onerror = l), a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l();
                },
                preloadImages: function () {
                    var e = this;
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t);
                    }
                },
            },
        },
        F = {},
        W = (function (e) {
            function t() {
                for (var i, a, r, l = [], d = arguments.length; d--; ) l[d] = arguments[d];
                1 === l.length && l[0].constructor && l[0].constructor === Object ? (r = l[0]) : ((a = (i = l)[0]), (r = i[1])),
                    r || (r = {}),
                    (r = n.extend({}, r)),
                    a && !r.el && (r.el = a),
                    e.call(this, r),
                    Object.keys(Y).forEach(function (e) {
                        Object.keys(Y[e]).forEach(function (i) {
                            t.prototype[i] || (t.prototype[i] = Y[e][i]);
                        });
                    });
                var h = this;
                void 0 === h.modules && (h.modules = {}),
                    Object.keys(h.modules).forEach(function (e) {
                        var t = h.modules[e];
                        if (t.params) {
                            var i = Object.keys(t.params)[0],
                                s = t.params[i];
                            if ("object" != typeof s || null === s) return;
                            if (!(i in r && "enabled" in s)) return;
                            !0 === r[i] && (r[i] = { enabled: !0 }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = { enabled: !1 });
                        }
                    });
                var p = n.extend({}, V);
                h.useModulesParams(p), (h.params = n.extend({}, p, F, r)), (h.originalParams = n.extend({}, h.params)), (h.passedParams = n.extend({}, r)), (h.$ = s);
                var c = s(h.params.el);
                if ((a = c[0])) {
                    if (c.length > 1) {
                        var u = [];
                        return (
                            c.each(function (e, i) {
                                var s = n.extend({}, r, { el: i });
                                u.push(new t(s));
                            }),
                            u
                        );
                    }
                    var v, f, m;
                    return (
                        (a.swiper = h),
                        c.data("swiper", h),
                        a && a.shadowRoot && a.shadowRoot.querySelector
                            ? ((v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function (e) {
                                  return c.children(e);
                              })
                            : (v = c.children("." + h.params.wrapperClass)),
                        n.extend(h, {
                            $el: c,
                            el: a,
                            $wrapperEl: v,
                            wrapperEl: v[0],
                            classNames: [],
                            slides: s(),
                            slidesGrid: [],
                            snapGrid: [],
                            slidesSizesGrid: [],
                            isHorizontal: function () {
                                return "horizontal" === h.params.direction;
                            },
                            isVertical: function () {
                                return "vertical" === h.params.direction;
                            },
                            rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
                            rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
                            wrongRTL: "-webkit-box" === v.css("display"),
                            activeIndex: 0,
                            realIndex: 0,
                            isBeginning: !0,
                            isEnd: !1,
                            translate: 0,
                            previousTranslate: 0,
                            progress: 0,
                            velocity: 0,
                            animating: !1,
                            allowSlideNext: h.params.allowSlideNext,
                            allowSlidePrev: h.params.allowSlidePrev,
                            touchEvents:
                                ((f = ["touchstart", "touchmove", "touchend", "touchcancel"]),
                                (m = ["mousedown", "mousemove", "mouseup"]),
                                o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]),
                                (h.touchEventsTouch = { start: f[0], move: f[1], end: f[2], cancel: f[3] }),
                                (h.touchEventsDesktop = { start: m[0], move: m[1], end: m[2] }),
                                o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                            touchEventsData: {
                                isTouched: void 0,
                                isMoved: void 0,
                                allowTouchCallbacks: void 0,
                                touchStartTime: void 0,
                                isScrolling: void 0,
                                currentTranslate: void 0,
                                startTranslate: void 0,
                                allowThresholdMove: void 0,
                                formElements: "input, select, option, textarea, button, video",
                                lastClickTime: n.now(),
                                clickTimeout: void 0,
                                velocities: [],
                                allowMomentumBounce: void 0,
                                isTouchEvent: void 0,
                                startMoving: void 0,
                            },
                            allowClick: !0,
                            allowTouchMove: h.params.allowTouchMove,
                            touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                            imagesToLoad: [],
                            imagesLoaded: 0,
                        }),
                        h.useModules(),
                        h.params.init && h.init(),
                        h
                    );
                }
            }
            e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)), (t.prototype.constructor = t);
            var i = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } };
            return (
                (t.prototype.slidesPerViewDynamic = function () {
                    var e = this.params,
                        t = this.slides,
                        i = this.slidesGrid,
                        s = this.size,
                        a = this.activeIndex,
                        r = 1;
                    if (e.centeredSlides) {
                        for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && ((r += 1), (o += t[l].swiperSlideSize) > s && (n = !0));
                        for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && ((r += 1), (o += t[d].swiperSlideSize) > s && (n = !0));
                    } else for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
                    return r;
                }),
                (t.prototype.update = function () {
                    var e = this;
                    if (e && !e.destroyed) {
                        var t = e.snapGrid,
                            i = e.params;
                        i.breakpoints && e.setBreakpoint(),
                            e.updateSize(),
                            e.updateSlides(),
                            e.updateProgress(),
                            e.updateSlidesClasses(),
                            e.params.freeMode
                                ? (s(), e.params.autoHeight && e.updateAutoHeight())
                                : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(),
                            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                            e.emit("update");
                    }
                    function s() {
                        var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
                    }
                }),
                (t.prototype.changeDirection = function (e, t) {
                    void 0 === t && (t = !0);
                    var i = this.params.direction;
                    return (
                        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
                        e === i || ("horizontal" !== e && "vertical" !== e)
                            ? this
                            : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e),
                              (this.params.direction = e),
                              this.slides.each(function (t, i) {
                                  "vertical" === e ? (i.style.width = "") : (i.style.height = "");
                              }),
                              this.emit("changeDirection"),
                              t && this.update(),
                              this)
                    );
                }),
                (t.prototype.init = function () {
                    this.initialized ||
                        (this.emit("beforeInit"),
                        this.params.breakpoints && this.setBreakpoint(),
                        this.addClasses(),
                        this.params.loop && this.loopCreate(),
                        this.updateSize(),
                        this.updateSlides(),
                        this.params.watchOverflow && this.checkOverflow(),
                        this.params.grabCursor && this.setGrabCursor(),
                        this.params.preloadImages && this.preloadImages(),
                        this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit),
                        this.attachEvents(),
                        (this.initialized = !0),
                        this.emit("init"));
                }),
                (t.prototype.destroy = function (e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        a = i.$el,
                        r = i.$wrapperEl,
                        o = i.slides;
                    return void 0 === i.params || i.destroyed
                        ? null
                        : (i.emit("beforeDestroy"),
                          (i.initialized = !1),
                          i.detachEvents(),
                          s.loop && i.loopDestroy(),
                          t &&
                              (i.removeClasses(),
                              a.removeAttr("style"),
                              r.removeAttr("style"),
                              o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
                          i.emit("destroy"),
                          Object.keys(i.eventsListeners).forEach(function (e) {
                              i.off(e);
                          }),
                          !1 !== e && ((i.$el[0].swiper = null), i.$el.data("swiper", null), n.deleteProps(i)),
                          (i.destroyed = !0),
                          null);
                }),
                (t.extendDefaults = function (e) {
                    n.extend(F, e);
                }),
                (i.extendedDefaults.get = function () {
                    return F;
                }),
                (i.defaults.get = function () {
                    return V;
                }),
                (i.Class.get = function () {
                    return e;
                }),
                (i.$.get = function () {
                    return s;
                }),
                Object.defineProperties(t, i),
                t
            );
        })(l),
        R = { name: "device", proto: { device: I }, static: { device: I } },
        q = { name: "support", proto: { support: o }, static: { support: o } },
        j = {
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: (function () {
                var e = t.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
            })(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
        },
        K = { name: "browser", proto: { browser: j }, static: { browser: j } },
        U = {
            name: "resize",
            create: function () {
                var e = this;
                n.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange");
                        },
                    },
                });
            },
            on: {
                init: function () {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler);
                },
                destroy: function () {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
                },
            },
        },
        _ = {
            func: t.MutationObserver || t.WebkitMutationObserver,
            attach: function (e, i) {
                void 0 === i && (i = {});
                var s = this,
                    a = new (0, _.func)(function (e) {
                        if (1 !== e.length) {
                            var i = function () {
                                s.emit("observerUpdate", e[0]);
                            };
                            t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0);
                        } else s.emit("observerUpdate", e[0]);
                    });
                a.observe(e, { attributes: void 0 === i.attributes || i.attributes, childList: void 0 === i.childList || i.childList, characterData: void 0 === i.characterData || i.characterData }), s.observer.observers.push(a);
            },
            init: function () {
                if (o.observer && this.params.observer) {
                    if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], { childList: this.params.observeSlideChildren }), this.observer.attach(this.$wrapperEl[0], { attributes: !1 });
                }
            },
            destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect();
                }),
                    (this.observer.observers = []);
            },
        },
        Z = {
            name: "observer",
            params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
            create: function () {
                n.extend(this, { observer: { init: _.init.bind(this), attach: _.attach.bind(this), destroy: _.destroy.bind(this), observers: [] } });
            },
            on: {
                init: function () {
                    this.observer.init();
                },
                destroy: function () {
                    this.observer.destroy();
                },
            },
        },
        Q = {
            update: function (e) {
                var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    a = i.slidesPerGroup,
                    r = i.centeredSlides,
                    o = t.params.virtual,
                    l = o.addSlidesBefore,
                    d = o.addSlidesAfter,
                    h = t.virtual,
                    p = h.from,
                    c = h.to,
                    u = h.slides,
                    v = h.slidesGrid,
                    f = h.renderSlide,
                    m = h.offset;
                t.updateActiveIndex();
                var g,
                    b,
                    w,
                    y = t.activeIndex || 0;
                (g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"), r ? ((b = Math.floor(s / 2) + a + l), (w = Math.floor(s / 2) + a + d)) : ((b = s + (a - 1) + l), (w = a + d));
                var x = Math.max((y || 0) - w, 0),
                    T = Math.min((y || 0) + b, u.length - 1),
                    E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);
                function C() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load();
                }
                if ((n.extend(t.virtual, { from: x, to: T, offset: E, slidesGrid: t.slidesGrid }), p === x && c === T && !e)) return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal)
                    return (
                        t.params.virtual.renderExternal.call(t, {
                            offset: E,
                            from: x,
                            to: T,
                            slides: (function () {
                                for (var e = [], t = x; t <= T; t += 1) e.push(u[t]);
                                return e;
                            })(),
                        }),
                        void C()
                    );
                var S = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else for (var P = p; P <= c; P += 1) (P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
                for (var z = 0; z < u.length; z += 1) z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z), z < p && S.push(z)));
                M.forEach(function (e) {
                    t.$wrapperEl.append(f(u[e], e));
                }),
                    S.sort(function (e, t) {
                        return t - e;
                    }).forEach(function (e) {
                        t.$wrapperEl.prepend(f(u[e], e));
                    }),
                    t.$wrapperEl.children(".swiper-slide").css(g, E + "px"),
                    C();
            },
            renderSlide: function (e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a;
            },
            appendSlide: function (e) {
                if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0);
            },
            prependSlide: function (e) {
                var t = this.activeIndex,
                    i = t + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var a = 0; a < e.length; a += 1) e[a] && this.virtual.slides.unshift(e[a]);
                    (i = t + e.length), (s = e.length);
                } else this.virtual.slides.unshift(e);
                if (this.params.virtual.cache) {
                    var r = this.virtual.cache,
                        n = {};
                    Object.keys(r).forEach(function (e) {
                        var t = r[e],
                            i = t.attr("data-swiper-slide-index");
                        i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), (n[parseInt(e, 10) + s] = t);
                    }),
                        (this.virtual.cache = n);
                }
                this.virtual.update(!0), this.slideTo(i, 0);
            },
            removeSlide: function (e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e)) for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), (t = Math.max(t, 0));
                    else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), (t = Math.max(t, 0));
                    this.virtual.update(!0), this.slideTo(t, 0);
                }
            },
            removeAllSlides: function () {
                (this.virtual.slides = []), this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0);
            },
        },
        J = {
            name: "virtual",
            params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, addSlidesBefore: 0, addSlidesAfter: 0 } },
            create: function () {
                n.extend(this, {
                    virtual: {
                        update: Q.update.bind(this),
                        appendSlide: Q.appendSlide.bind(this),
                        prependSlide: Q.prependSlide.bind(this),
                        removeSlide: Q.removeSlide.bind(this),
                        removeAllSlides: Q.removeAllSlides.bind(this),
                        renderSlide: Q.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {},
                    },
                });
            },
            on: {
                beforeInit: function () {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = { watchSlidesProgress: !0 };
                        n.extend(this.params, e), n.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update();
                    }
                },
                setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update();
                },
            },
        },
        ee = {
            handle: function (i) {
                var s = this.rtlTranslate,
                    a = i;
                a.originalEvent && (a = a.originalEvent);
                var r = a.keyCode || a.charCode;
                if (!this.allowSlideNext && ((this.isHorizontal() && 39 === r) || (this.isVertical() && 40 === r) || 34 === r)) return !1;
                if (!this.allowSlidePrev && ((this.isHorizontal() && 37 === r) || (this.isVertical() && 38 === r) || 33 === r)) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || (e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase())))) {
                    if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
                        var n = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = t.innerWidth,
                            l = t.innerHeight,
                            d = this.$el.offset();
                        s && (d.left -= this.$el[0].scrollLeft);
                        for (
                            var h = [
                                    [d.left, d.top],
                                    [d.left + this.width, d.top],
                                    [d.left, d.top + this.height],
                                    [d.left + this.width, d.top + this.height],
                                ],
                                p = 0;
                            p < h.length;
                            p += 1
                        ) {
                            var c = h[p];
                            c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
                        }
                        if (!n) return;
                    }
                    this.isHorizontal()
                        ? ((33 !== r && 34 !== r && 37 !== r && 39 !== r) || (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
                          (((34 !== r && 39 !== r) || s) && ((33 !== r && 37 !== r) || !s)) || this.slideNext(),
                          (((33 !== r && 37 !== r) || s) && ((34 !== r && 39 !== r) || !s)) || this.slidePrev())
                        : ((33 !== r && 34 !== r && 38 !== r && 40 !== r) || (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)), (34 !== r && 40 !== r) || this.slideNext(), (33 !== r && 38 !== r) || this.slidePrev()),
                        this.emit("keyPress", r);
                }
            },
            enable: function () {
                this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), (this.keyboard.enabled = !0));
            },
            disable: function () {
                this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), (this.keyboard.enabled = !1));
            },
        },
        te = {
            name: "keyboard",
            params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
            create: function () {
                n.extend(this, { keyboard: { enabled: !1, enable: ee.enable.bind(this), disable: ee.disable.bind(this), handle: ee.handle.bind(this) } });
            },
            on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable();
                },
                destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable();
                },
            },
        };
    var ie = {
            lastScrollTime: n.now(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function () {
                return t.navigator.userAgent.indexOf("firefox") > -1
                    ? "DOMMouseScroll"
                    : (function () {
                          var t = "onwheel" in e;
                          if (!t) {
                              var i = e.createElement("div");
                              i.setAttribute("onwheel", "return;"), (t = "function" == typeof i.onwheel);
                          }
                          return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t;
                      })()
                    ? "wheel"
                    : "mousewheel";
            },
            normalize: function (e) {
                var t = 0,
                    i = 0,
                    s = 0,
                    a = 0;
                return (
                    "detail" in e && (i = e.detail),
                    "wheelDelta" in e && (i = -e.wheelDelta / 120),
                    "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
                    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                    "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
                    (s = 10 * t),
                    (a = 10 * i),
                    "deltaY" in e && (a = e.deltaY),
                    "deltaX" in e && (s = e.deltaX),
                    e.shiftKey && !s && ((s = a), (a = 0)),
                    (s || a) && e.deltaMode && (1 === e.deltaMode ? ((s *= 40), (a *= 40)) : ((s *= 800), (a *= 800))),
                    s && !t && (t = s < 1 ? -1 : 1),
                    a && !i && (i = a < 1 ? -1 : 1),
                    { spinX: t, spinY: i, pixelX: s, pixelY: a }
                );
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0;
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1;
            },
            handle: function (e) {
                var i = e,
                    s = this,
                    a = s.params.mousewheel;
                if ((s.params.cssMode && i.preventDefault(), !s.mouseEntered && !a.releaseOnEdges)) return !0;
                i.originalEvent && (i = i.originalEvent);
                var r = 0,
                    o = s.rtlTranslate ? -1 : 1,
                    l = ie.normalize(i);
                if (a.forceToAxis)
                    if (s.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                        r = l.pixelX * o;
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                        r = l.pixelY;
                    }
                else r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
                if (0 === r) return !0;
                if ((a.invert && (r = -r), s.params.freeMode)) {
                    var d = { time: n.now(), delta: Math.abs(r), direction: Math.sign(r) },
                        h = s.mousewheel.lastEventBeforeSnap,
                        p = h && d.time < h.time + 500 && d.delta <= h.delta && d.direction === h.direction;
                    if (!p) {
                        (s.mousewheel.lastEventBeforeSnap = void 0), s.params.loop && s.loopFix();
                        var c = s.getTranslate() + r * a.sensitivity,
                            u = s.isBeginning,
                            v = s.isEnd;
                        if (
                            (c >= s.minTranslate() && (c = s.minTranslate()),
                            c <= s.maxTranslate() && (c = s.maxTranslate()),
                            s.setTransition(0),
                            s.setTranslate(c),
                            s.updateProgress(),
                            s.updateActiveIndex(),
                            s.updateSlidesClasses(),
                            ((!u && s.isBeginning) || (!v && s.isEnd)) && s.updateSlidesClasses(),
                            s.params.freeModeSticky)
                        ) {
                            clearTimeout(s.mousewheel.timeout), (s.mousewheel.timeout = void 0);
                            var f = s.mousewheel.recentWheelEvents;
                            f.length >= 15 && f.shift();
                            var m = f.length ? f[f.length - 1] : void 0,
                                g = f[0];
                            if ((f.push(d), m && (d.delta > m.delta || d.direction !== m.direction))) f.splice(0);
                            else if (f.length >= 15 && d.time - g.time < 500 && g.delta - d.delta >= 1 && d.delta <= 6) {
                                var b = r > 0 ? 0.8 : 0.2;
                                (s.mousewheel.lastEventBeforeSnap = d),
                                    f.splice(0),
                                    (s.mousewheel.timeout = n.nextTick(function () {
                                        s.slideToClosest(s.params.speed, !0, void 0, b);
                                    }, 0));
                            }
                            s.mousewheel.timeout ||
                                (s.mousewheel.timeout = n.nextTick(function () {
                                    (s.mousewheel.lastEventBeforeSnap = d), f.splice(0), s.slideToClosest(s.params.speed, !0, void 0, 0.5);
                                }, 500));
                        }
                        if ((p || s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(), c === s.minTranslate() || c === s.maxTranslate())) return !0;
                    }
                } else {
                    if (n.now() - s.mousewheel.lastScrollTime > 60)
                        if (r < 0)
                            if ((s.isEnd && !s.params.loop) || s.animating) {
                                if (a.releaseOnEdges) return !0;
                            } else s.slideNext(), s.emit("scroll", i);
                        else if ((s.isBeginning && !s.params.loop) || s.animating) {
                            if (a.releaseOnEdges) return !0;
                        } else s.slidePrev(), s.emit("scroll", i);
                    s.mousewheel.lastScrollTime = new t.Date().getTime();
                }
                return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
            },
            enable: function () {
                var e = ie.event();
                if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (this.mousewheel.enabled) return !1;
                var t = this.$el;
                return (
                    "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)),
                    t.on("mouseenter", this.mousewheel.handleMouseEnter),
                    t.on("mouseleave", this.mousewheel.handleMouseLeave),
                    t.on(e, this.mousewheel.handle),
                    (this.mousewheel.enabled = !0),
                    !0
                );
            },
            disable: function () {
                var e = ie.event();
                if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (!this.mousewheel.enabled) return !1;
                var t = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), (this.mousewheel.enabled = !1), !0;
            },
        },
        se = {
            update: function () {
                var e = this.params.navigation;
                if (!this.params.loop) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)),
                        i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass));
                }
            },
            onPrevClick: function (e) {
                e.preventDefault(), (this.isBeginning && !this.params.loop) || this.slidePrev();
            },
            onNextClick: function (e) {
                e.preventDefault(), (this.isEnd && !this.params.loop) || this.slideNext();
            },
            init: function () {
                var e,
                    t,
                    i = this.params.navigation;
                (i.nextEl || i.prevEl) &&
                    (i.nextEl && ((e = s(i.nextEl)), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))),
                    i.prevEl && ((t = s(i.prevEl)), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))),
                    e && e.length > 0 && e.on("click", this.navigation.onNextClick),
                    t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
                    n.extend(this.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] }));
            },
            destroy: function () {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)),
                    i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass));
            },
        },
        ae = {
            update: function () {
                var e = this.rtl,
                    t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var i,
                        a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        r = this.pagination.$el,
                        n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (
                        (this.params.loop
                            ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides),
                              i > n - 1 && (i -= n),
                              i < 0 && "bullets" !== this.params.paginationType && (i = n + i))
                            : (i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0),
                        "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0)
                    ) {
                        var o,
                            l,
                            d,
                            h = this.pagination.bullets;
                        if (
                            (t.dynamicBullets &&
                                ((this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                                r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"),
                                t.dynamicMainBullets > 1 &&
                                    void 0 !== this.previousIndex &&
                                    ((this.pagination.dynamicBulletIndex += i - this.previousIndex),
                                    this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1
                                        ? (this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1)
                                        : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)),
                                (o = i - this.pagination.dynamicBulletIndex),
                                (d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2)),
                            h.removeClass(
                                t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"
                            ),
                            r.length > 1)
                        )
                            h.each(function (e, a) {
                                var r = s(a),
                                    n = r.index();
                                n === i && r.addClass(t.bulletActiveClass),
                                    t.dynamicBullets &&
                                        (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"),
                                        n === o &&
                                            r
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev")
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev-prev"),
                                        n === l &&
                                            r
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next")
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next-next"));
                            });
                        else {
                            var p = h.eq(i),
                                c = p.index();
                            if ((p.addClass(t.bulletActiveClass), t.dynamicBullets)) {
                                for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1) h.eq(f).addClass(t.bulletActiveClass + "-main");
                                if (this.params.loop)
                                    if (c >= h.length - t.dynamicMainBullets) {
                                        for (var m = t.dynamicMainBullets; m >= 0; m -= 1) h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
                                        h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev");
                                    } else
                                        u
                                            .prev()
                                            .addClass(t.bulletActiveClass + "-prev")
                                            .prev()
                                            .addClass(t.bulletActiveClass + "-prev-prev"),
                                            v
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next")
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next-next");
                                else
                                    u
                                        .prev()
                                        .addClass(t.bulletActiveClass + "-prev")
                                        .prev()
                                        .addClass(t.bulletActiveClass + "-prev-prev"),
                                        v
                                            .next()
                                            .addClass(t.bulletActiveClass + "-next")
                                            .next()
                                            .addClass(t.bulletActiveClass + "-next-next");
                            }
                        }
                        if (t.dynamicBullets) {
                            var g = Math.min(h.length, t.dynamicMainBullets + 4),
                                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                                w = e ? "right" : "left";
                            h.css(this.isHorizontal() ? w : "top", b + "px");
                        }
                    }
                    if (("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type)) {
                        var y;
                        y = t.progressbarOpposite ? (this.isHorizontal() ? "vertical" : "horizontal") : this.isHorizontal() ? "horizontal" : "vertical";
                        var x = (i + 1) / n,
                            T = 1,
                            E = 1;
                        "horizontal" === y ? (T = x) : (E = x),
                            r
                                .find("." + t.progressbarFillClass)
                                .transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")")
                                .transition(this.params.speed);
                    }
                    "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]),
                        r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass);
                }
            },
            render: function () {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el,
                        s = "";
                    if ("bullets" === e.type) {
                        for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)
                            e.renderBullet ? (s += e.renderBullet.call(this, r, e.bulletClass)) : (s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">");
                        i.html(s), (this.pagination.bullets = i.find("." + e.bulletClass));
                    }
                    "fraction" === e.type && ((s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>'), i.html(s)),
                        "progressbar" === e.type && ((s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>'), i.html(s)),
                        "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0]);
                }
            },
            init: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var i = s(t.el);
                    0 !== i.length &&
                        (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)),
                        "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
                        i.addClass(t.modifierClass + t.type),
                        "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), (e.pagination.dynamicBulletIndex = 0), t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                        "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass),
                        t.clickable &&
                            i.on("click", "." + t.bulletClass, function (t) {
                                t.preventDefault();
                                var i = s(this).index() * e.params.slidesPerGroup;
                                e.params.loop && (i += e.loopedSlides), e.slideTo(i);
                            }),
                        n.extend(e.pagination, { $el: i, el: i[0] }));
                }
            },
            destroy: function () {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.pagination.$el;
                    t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass);
                }
            },
        },
        re = {
            setTranslate: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.rtlTranslate,
                        i = this.progress,
                        s = e.dragSize,
                        a = e.trackSize,
                        r = e.$dragEl,
                        n = e.$el,
                        o = this.params.scrollbar,
                        l = s,
                        d = (a - s) * i;
                    t ? ((d = -d) > 0 ? ((l = s - d), (d = 0)) : -d + s > a && (l = a + d)) : d < 0 ? ((l = s + d), (d = 0)) : d + s > a && (l = a - d),
                        this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), (r[0].style.width = l + "px")) : (r.transform("translate3d(0px, " + d + "px, 0)"), (r[0].style.height = l + "px")),
                        o.hide &&
                            (clearTimeout(this.scrollbar.timeout),
                            (n[0].style.opacity = 1),
                            (this.scrollbar.timeout = setTimeout(function () {
                                (n[0].style.opacity = 0), n.transition(400);
                            }, 1e3)));
                }
            },
            setTransition: function (e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
            },
            updateSize: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = e.$dragEl,
                        i = e.$el;
                    (t[0].style.width = ""), (t[0].style.height = "");
                    var s,
                        a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        r = this.size / this.virtualSize,
                        o = r * (a / this.size);
                    (s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10)),
                        this.isHorizontal() ? (t[0].style.width = s + "px") : (t[0].style.height = s + "px"),
                        (i[0].style.display = r >= 1 ? "none" : ""),
                        this.params.scrollbar.hide && (i[0].style.opacity = 0),
                        n.extend(e, { trackSize: a, divider: r, moveDivider: o, dragSize: s }),
                        e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass);
                }
            },
            getPointerPosition: function (e) {
                return this.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX) : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY;
            },
            setDragPosition: function (e) {
                var t,
                    i = this.scrollbar,
                    s = this.rtlTranslate,
                    a = i.$el,
                    r = i.dragSize,
                    n = i.trackSize,
                    o = i.dragStartPos;
                (t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r)), (t = Math.max(Math.min(t, 1), 0)), s && (t = 1 - t);
                var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses();
            },
            onDragStart: function (e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el,
                    r = i.$dragEl;
                (this.scrollbar.isTouched = !0),
                    (this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null),
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.transition(100),
                    r.transition(100),
                    i.setDragPosition(e),
                    clearTimeout(this.scrollbar.dragTimeout),
                    a.transition(0),
                    t.hide && a.css("opacity", 1),
                    this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"),
                    this.emit("scrollbarDragStart", e);
            },
            onDragMove: function (e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    a = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
            },
            onDragEnd: function (e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el;
                this.scrollbar.isTouched &&
                    ((this.scrollbar.isTouched = !1),
                    this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
                    t.hide &&
                        (clearTimeout(this.scrollbar.dragTimeout),
                        (this.scrollbar.dragTimeout = n.nextTick(function () {
                            a.css("opacity", 0), a.transition(400);
                        }, 1e3))),
                    this.emit("scrollbarDragEnd", e),
                    t.snapOnRelease && this.slideToClosest());
            },
            enableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!o.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 },
                        l = !(!o.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 };
                    o.touch
                        ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, l))
                        : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, l));
                }
            },
            disableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!o.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 },
                        l = !(!o.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 };
                    o.touch
                        ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, l))
                        : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, l));
                }
            },
            init: function () {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.$el,
                        i = this.params.scrollbar,
                        a = s(i.el);
                    this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                    var r = a.find("." + this.params.scrollbar.dragClass);
                    0 === r.length && ((r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>')), a.append(r)), n.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }), i.draggable && e.enableDraggable();
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable();
            },
        },
        ne = {
            setTransform: function (e, t) {
                var i = this.rtl,
                    a = s(e),
                    r = i ? -1 : 1,
                    n = a.attr("data-swiper-parallax") || "0",
                    o = a.attr("data-swiper-parallax-x"),
                    l = a.attr("data-swiper-parallax-y"),
                    d = a.attr("data-swiper-parallax-scale"),
                    h = a.attr("data-swiper-parallax-opacity");
                if (
                    (o || l ? ((o = o || "0"), (l = l || "0")) : this.isHorizontal() ? ((o = n), (l = "0")) : ((l = n), (o = "0")),
                    (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px"),
                    (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
                    null != h)
                ) {
                    var p = h - (h - 1) * (1 - Math.abs(t));
                    a[0].style.opacity = p;
                }
                if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)");
                else {
                    var c = d - (d - 1) * (1 - Math.abs(t));
                    a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")");
                }
            },
            setTranslate: function () {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    a = e.progress,
                    r = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
                    e.parallax.setTransform(i, a);
                }),
                    i.each(function (t, i) {
                        var n = i.progress;
                        e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)),
                            (n = Math.min(Math.max(n, -1), 1)),
                            s(i)
                                .find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]")
                                .each(function (t, i) {
                                    e.parallax.setTransform(i, n);
                                });
                    });
            },
            setTransition: function (e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
                    var a = s(i),
                        r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (r = 0), a.transition(r);
                });
            },
        },
        oe = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    a = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
            },
            onGestureStart: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    a = i.gesture;
                if (((i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1), !o.gestures)) {
                    if ("touchstart" !== e.type || ("touchstart" === e.type && e.targetTouches.length < 2)) return;
                    (i.fakeGestureTouched = !0), (a.scaleStart = oe.getDistanceBetweenTouches(e));
                }
                (a.$slideEl && a.$slideEl.length) ||
                ((a.$slideEl = s(e.target).closest(".swiper-slide")),
                0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)),
                (a.$imageEl = a.$slideEl.find("img, svg, canvas")),
                (a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass)),
                (a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
                0 !== a.$imageWrapEl.length)
                    ? (a.$imageEl.transition(0), (this.zoom.isScaling = !0))
                    : (a.$imageEl = void 0);
            },
            onGestureChange: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!o.gestures) {
                    if ("touchmove" !== e.type || ("touchmove" === e.type && e.targetTouches.length < 2)) return;
                    (i.fakeGestureMoved = !0), (s.scaleMove = oe.getDistanceBetweenTouches(e));
                }
                s.$imageEl &&
                    0 !== s.$imageEl.length &&
                    (o.gestures ? (i.scale = e.scale * i.currentScale) : (i.scale = (s.scaleMove / s.scaleStart) * i.currentScale),
                    i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
                    i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
                    s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
            },
            onGestureEnd: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!o.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || ("touchend" === e.type && e.changedTouches.length < 2 && !I.android)) return;
                    (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
                }
                s.$imageEl &&
                    0 !== s.$imageEl.length &&
                    ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio)),
                    s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"),
                    (i.currentScale = i.scale),
                    (i.isScaling = !1),
                    1 === i.scale && (s.$slideEl = void 0));
            },
            onTouchStart: function (e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    (s.isTouched ||
                        (I.android && e.preventDefault(),
                        (s.isTouched = !0),
                        (s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                        (s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
            },
            onTouchMove: function (e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image,
                    a = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && ((this.allowClick = !1), s.isTouched && i.$slideEl)) {
                    s.isMoved ||
                        ((s.width = i.$imageEl[0].offsetWidth),
                        (s.height = i.$imageEl[0].offsetHeight),
                        (s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0),
                        (s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0),
                        (i.slideWidth = i.$slideEl[0].offsetWidth),
                        (i.slideHeight = i.$slideEl[0].offsetHeight),
                        i.$imageWrapEl.transition(0),
                        this.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
                    var r = s.width * t.scale,
                        o = s.height * t.scale;
                    if (!(r < i.slideWidth && o < i.slideHeight)) {
                        if (
                            ((s.minX = Math.min(i.slideWidth / 2 - r / 2, 0)),
                            (s.maxX = -s.minX),
                            (s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
                            (s.maxY = -s.minY),
                            (s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                            (s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                            !s.isMoved && !t.isScaling)
                        ) {
                            if (this.isHorizontal() && ((Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x) || (Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)))
                                return void (s.isTouched = !1);
                            if (!this.isHorizontal() && ((Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y) || (Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)))
                                return void (s.isTouched = !1);
                        }
                        e.preventDefault(),
                            e.stopPropagation(),
                            (s.isMoved = !0),
                            (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
                            (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
                            s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
                            s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
                            s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
                            s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
                            a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
                            a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
                            a.prevTime || (a.prevTime = Date.now()),
                            (a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2),
                            (a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2),
                            Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                            Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                            (a.prevPositionX = s.touchesCurrent.x),
                            (a.prevPositionY = s.touchesCurrent.y),
                            (a.prevTime = Date.now()),
                            i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)");
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return (i.isTouched = !1), void (i.isMoved = !1);
                    (i.isTouched = !1), (i.isMoved = !1);
                    var a = 300,
                        r = 300,
                        n = s.x * a,
                        o = i.currentX + n,
                        l = s.y * r,
                        d = i.currentY + l;
                    0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                    var h = Math.max(a, r);
                    (i.currentX = o), (i.currentY = d);
                    var p = i.width * e.scale,
                        c = i.height * e.scale;
                    (i.minX = Math.min(t.slideWidth / 2 - p / 2, 0)),
                        (i.maxX = -i.minX),
                        (i.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
                        (i.maxY = -i.minY),
                        (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
                        (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
                        t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)");
                }
            },
            onTransitionEnd: function () {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl &&
                    this.previousIndex !== this.activeIndex &&
                    (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), (e.scale = 1), (e.currentScale = 1), (t.$slideEl = void 0), (t.$imageEl = void 0), (t.$imageWrapEl = void 0));
            },
            toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e);
            },
            in: function (e) {
                var t,
                    i,
                    a,
                    r,
                    n,
                    o,
                    l,
                    d,
                    h,
                    p,
                    c,
                    u,
                    v,
                    f,
                    m,
                    g,
                    b = this.zoom,
                    w = this.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || ((y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex)), (y.$imageEl = y.$slideEl.find("img, svg, canvas")), (y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass))),
                y.$imageEl && 0 !== y.$imageEl.length) &&
                    (y.$slideEl.addClass("" + w.zoomedSlideClass),
                    void 0 === x.touchesStart.x && e
                        ? ((t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX), (i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
                        : ((t = x.touchesStart.x), (i = x.touchesStart.y)),
                    (b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
                    (b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
                    e
                        ? ((m = y.$slideEl[0].offsetWidth),
                          (g = y.$slideEl[0].offsetHeight),
                          (a = y.$slideEl.offset().left + m / 2 - t),
                          (r = y.$slideEl.offset().top + g / 2 - i),
                          (l = y.$imageEl[0].offsetWidth),
                          (d = y.$imageEl[0].offsetHeight),
                          (h = l * b.scale),
                          (p = d * b.scale),
                          (v = -(c = Math.min(m / 2 - h / 2, 0))),
                          (f = -(u = Math.min(g / 2 - p / 2, 0))),
                          (n = a * b.scale) < c && (n = c),
                          n > v && (n = v),
                          (o = r * b.scale) < u && (o = u),
                          o > f && (o = f))
                        : ((n = 0), (o = 0)),
                    y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"),
                    y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"));
            },
            out: function () {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || ((i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex)), (i.$imageEl = i.$slideEl.find("img, svg, canvas")), (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
                    i.$imageEl &&
                        0 !== i.$imageEl.length &&
                        ((e.scale = 1),
                        (e.currentScale = 1),
                        i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                        i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                        i.$slideEl.removeClass("" + t.zoomedSlideClass),
                        (i.$slideEl = void 0));
            },
            enable: function () {
                var e = this.zoom;
                if (!e.enabled) {
                    e.enabled = !0;
                    var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 },
                        i = !o.passiveListener || { passive: !1, capture: !0 };
                    o.gestures
                        ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t))
                        : "touchstart" === this.touchEvents.start &&
                          (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i),
                          this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t),
                          this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)),
                        this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i);
                }
            },
            disable: function () {
                var e = this.zoom;
                if (e.enabled) {
                    this.zoom.enabled = !1;
                    var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 },
                        i = !o.passiveListener || { passive: !1, capture: !0 };
                    o.gestures
                        ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t))
                        : "touchstart" === this.touchEvents.start &&
                          (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i),
                          this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t),
                          this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)),
                        this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i);
                }
            },
        },
        le = {
            loadInSlide: function (e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    a = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                    !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])),
                        0 !== n.length &&
                            n.each(function (e, n) {
                                var o = s(n);
                                o.addClass(a.loadingClass);
                                var l = o.attr("data-background"),
                                    d = o.attr("data-src"),
                                    h = o.attr("data-srcset"),
                                    p = o.attr("data-sizes");
                                i.loadImage(o[0], d || l, h, p, !1, function () {
                                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                                        if (
                                            (l
                                                ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background"))
                                                : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))),
                                            o.addClass(a.loadedClass).removeClass(a.loadingClass),
                                            r.find("." + a.preloaderClass).remove(),
                                            i.params.loop && t)
                                        ) {
                                            var e = r.attr("data-swiper-slide-index");
                                            if (r.hasClass(i.params.slideDuplicateClass)) {
                                                var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                                i.lazy.loadInSlide(s.index(), !1);
                                            } else {
                                                var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                                i.lazy.loadInSlide(n.index(), !1);
                                            }
                                        }
                                        i.emit("lazyImageReady", r[0], o[0]);
                                    }
                                }),
                                    i.emit("lazyImageLoad", r[0], o[0]);
                            });
                }
            },
            load: function () {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    a = e.slides,
                    r = e.activeIndex,
                    n = e.virtual && i.virtual.enabled,
                    o = i.lazy,
                    l = i.slidesPerView;
                function d(e) {
                    if (n) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
                    } else if (a[e]) return !0;
                    return !1;
                }
                function h(e) {
                    return n ? s(e).attr("data-swiper-slide-index") : s(e).index();
                }
                if (("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility))
                    t.children("." + i.slideVisibleClass).each(function (t, i) {
                        var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                        e.lazy.loadInSlide(a);
                    });
                else if (l > 1) for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(r);
                if (o.loadPrevNext)
                    if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
                        for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m);
                        for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g);
                    } else {
                        var b = t.children("." + i.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(h(b));
                        var w = t.children("." + i.slidePrevClass);
                        w.length > 0 && e.lazy.loadInSlide(h(w));
                    }
            },
        },
        de = {
            LinearSpline: function (e, t) {
                var i,
                    s,
                    a,
                    r,
                    n,
                    o = function (e, t) {
                        for (s = -1, i = e.length; i - s > 1; ) e[(a = (i + s) >> 1)] <= t ? (s = a) : (i = a);
                        return i;
                    };
                return (
                    (this.x = e),
                    (this.y = t),
                    (this.lastIndex = e.length - 1),
                    (this.interpolate = function (e) {
                        return e ? ((n = o(this.x, e)), (r = n - 1), ((e - this.x[r]) * (this.y[n] - this.y[r])) / (this.x[n] - this.x[r]) + this.y[r]) : 0;
                    }),
                    this
                );
            },
            getInterpolateFunction: function (e) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid, e.slidesGrid) : new de.LinearSpline(this.snapGrid, e.snapGrid));
            },
            setTranslate: function (e, t) {
                var i,
                    s,
                    a = this,
                    r = a.controller.control;
                function n(e) {
                    var t = a.rtlTranslate ? -a.translate : a.translate;
                    "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), (s = -a.controller.spline.interpolate(-t))),
                        (s && "container" !== a.params.controller.by) || ((i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate())), (s = (t - a.minTranslate()) * i + e.minTranslate())),
                        a.params.controller.inverse && (s = e.maxTranslate() - s),
                        e.updateProgress(s),
                        e.setTranslate(s, a),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses();
                }
                if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof W && n(r[o]);
                else r instanceof W && t !== r && n(r);
            },
            setTransition: function (e, t) {
                var i,
                    s = this,
                    a = s.controller.control;
                function r(t) {
                    t.setTransition(e, s),
                        0 !== e &&
                            (t.transitionStart(),
                            t.params.autoHeight &&
                                n.nextTick(function () {
                                    t.updateAutoHeight();
                                }),
                            t.$wrapperEl.transitionEnd(function () {
                                a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd());
                            }));
                }
                if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof W && r(a[i]);
                else a instanceof W && t !== a && r(a);
            },
        },
        he = {
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e;
            },
            addElRole: function (e, t) {
                return e.attr("role", t), e;
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t), e;
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0), e;
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1), e;
            },
            onEnterKey: function (e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                    var i = s(e.target);
                    this.navigation &&
                        this.navigation.$nextEl &&
                        i.is(this.navigation.$nextEl) &&
                        ((this.isEnd && !this.params.loop) || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)),
                        this.navigation &&
                            this.navigation.$prevEl &&
                            i.is(this.navigation.$prevEl) &&
                            ((this.isBeginning && !this.params.loop) || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)),
                        this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click();
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e));
            },
            updateNavigation: function () {
                if (!this.params.loop) {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
                }
            },
            updatePagination: function () {
                var e = this,
                    t = e.params.a11y;
                e.pagination &&
                    e.params.pagination.clickable &&
                    e.pagination.bullets &&
                    e.pagination.bullets.length &&
                    e.pagination.bullets.each(function (i, a) {
                        var r = s(a);
                        e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1));
                    });
            },
            init: function () {
                this.$el.append(this.a11y.liveRegion);
                var e,
                    t,
                    i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
                    this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
                    e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)),
                    t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)),
                    this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
            },
            destroy: function () {
                var e, t;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(),
                    this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
                    this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
                    e && e.off("keydown", this.a11y.onEnterKey),
                    t && t.off("keydown", this.a11y.onEnterKey),
                    this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
            },
        },
        pe = {
            init: function () {
                if (this.params.history) {
                    if (!t.history || !t.history.pushState) return (this.params.history.enabled = !1), void (this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    (e.initialized = !0),
                        (e.paths = pe.getPathValues()),
                        (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState));
                }
            },
            destroy: function () {
                this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState);
            },
            setHistoryPopState: function () {
                (this.history.paths = pe.getPathValues()), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
            },
            getPathValues: function () {
                var e = t.location.pathname
                        .slice(1)
                        .split("https://overworld.qodeinteractive.com/")
                        .filter(function (e) {
                            return "" !== e;
                        }),
                    i = e.length;
                return { key: e[i - 2], value: e[i - 1] };
            },
            setHistory: function (e, i) {
                if (this.history.initialized && this.params.history.enabled) {
                    var s = this.slides.eq(i),
                        a = pe.slugify(s.attr("data-history"));
                    t.location.pathname.includes(e) || (a = e + "/" + a);
                    var r = t.history.state;
                    (r && r.value === a) || (this.params.history.replaceState ? t.history.replaceState({ value: a }, null, a) : t.history.pushState({ value: a }, null, a));
                }
            },
            slugify: function (e) {
                return e
                    .toString()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "")
                    .replace(/--+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "");
            },
            scrollToSlide: function (e, t, i) {
                if (t)
                    for (var s = 0, a = this.slides.length; s < a; s += 1) {
                        var r = this.slides.eq(s);
                        if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                            var n = r.index();
                            this.slideTo(n, e, i);
                        }
                    }
                else this.slideTo(0, e, i);
            },
        },
        ce = {
            onHashCange: function () {
                var t = e.location.hash.replace("#", "");
                if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                    var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === i) return;
                    this.slideTo(i);
                }
            },
            setHash: function () {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                    if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                    else {
                        var i = this.slides.eq(this.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        e.location.hash = s || "";
                    }
            },
            init: function () {
                if (!(!this.params.hashNavigation.enabled || (this.params.history && this.params.history.enabled))) {
                    this.hashNavigation.initialized = !0;
                    var i = e.location.hash.replace("#", "");
                    if (i)
                        for (var a = 0, r = this.slides.length; a < r; a += 1) {
                            var n = this.slides.eq(a);
                            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                                var o = n.index();
                                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
                            }
                        }
                    this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange);
                }
            },
            destroy: function () {
                this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange);
            },
        },
        ue = {
            run: function () {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                    clearTimeout(e.autoplay.timeout),
                    (e.autoplay.timeout = n.nextTick(function () {
                        e.params.autoplay.reverseDirection
                            ? e.params.loop
                                ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                                : e.isBeginning
                                ? e.params.autoplay.stopOnLastSlide
                                    ? e.autoplay.stop()
                                    : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay"))
                                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                            : e.params.loop
                            ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                            : e.isEnd
                            ? e.params.autoplay.stopOnLastSlide
                                ? e.autoplay.stop()
                                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
                            : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")),
                            e.params.cssMode && e.autoplay.running && e.autoplay.run();
                    }, i));
            },
            start: function () {
                return void 0 === this.autoplay.timeout && !this.autoplay.running && ((this.autoplay.running = !0), this.emit("autoplayStart"), this.autoplay.run(), !0);
            },
            stop: function () {
                return (
                    !!this.autoplay.running &&
                    void 0 !== this.autoplay.timeout &&
                    (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), (this.autoplay.timeout = void 0)), (this.autoplay.running = !1), this.emit("autoplayStop"), !0)
                );
            },
            pause: function (e) {
                this.autoplay.running &&
                    (this.autoplay.paused ||
                        (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
                        (this.autoplay.paused = !0),
                        0 !== e && this.params.autoplay.waitForTransition
                            ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd))
                            : ((this.autoplay.paused = !1), this.autoplay.run())));
            },
        },
        ve = {
            setTranslate: function () {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var a = 0;
                    this.isHorizontal() || ((a = s), (s = 0));
                    var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({ opacity: r }).transform("translate3d(" + s + "px, " + a + "px, 0px)");
                }
            },
            setTransition: function (e) {
                var t = this,
                    i = t.slides,
                    s = t.$wrapperEl;
                if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
                    var a = !1;
                    i.transitionEnd(function () {
                        if (!a && t && !t.destroyed) {
                            (a = !0), (t.animating = !1);
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i]);
                        }
                    });
                }
            },
        },
        fe = {
            setTranslate: function () {
                var e,
                    t = this.$el,
                    i = this.$wrapperEl,
                    a = this.slides,
                    r = this.width,
                    n = this.height,
                    o = this.rtlTranslate,
                    l = this.size,
                    d = this.params.cubeEffect,
                    h = this.isHorizontal(),
                    p = this.virtual && this.params.virtual.enabled,
                    c = 0;
                d.shadow &&
                    (h
                        ? (0 === (e = i.find(".swiper-cube-shadow")).length && ((e = s('<div class="swiper-cube-shadow"></div>')), i.append(e)), e.css({ height: r + "px" }))
                        : 0 === (e = t.find(".swiper-cube-shadow")).length && ((e = s('<div class="swiper-cube-shadow"></div>')), t.append(e)));
                for (var u = 0; u < a.length; u += 1) {
                    var v = a.eq(u),
                        f = u;
                    p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && ((m = -m), (g = Math.floor(-m / 360)));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? ((w = 4 * -g * l), (x = 0)) : (f - 1) % 4 == 0 ? ((w = 0), (x = 4 * -g * l)) : (f - 2) % 4 == 0 ? ((w = l + 4 * g * l), (x = l)) : (f - 3) % 4 == 0 && ((w = -l), (x = 3 * l + 4 * l * g)),
                        o && (w = -w),
                        h || ((y = w), (w = 0));
                    var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if ((b <= 1 && b > -1 && ((c = 90 * f + 90 * b), o && (c = 90 * -f - 90 * b)), v.transform(T), d.slideShadows)) {
                        var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            C = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && ((E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>')), v.append(E)),
                            0 === C.length && ((C = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>')), v.append(C)),
                            E.length && (E[0].style.opacity = Math.max(-b, 0)),
                            C.length && (C[0].style.opacity = Math.max(b, 0));
                    }
                }
                if (
                    (i.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }),
                    d.shadow)
                )
                    if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var S = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                            M = 1.5 - (Math.sin((2 * S * Math.PI) / 360) / 2 + Math.cos((2 * S * Math.PI) / 360) / 2),
                            P = d.shadowScale,
                            z = d.shadowScale / M,
                            k = d.shadowOffset;
                        e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)");
                    }
                var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)");
            },
            setTransition: function (e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                    this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
            },
        },
        me = {
            setTranslate: function () {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var a = e.eq(i),
                        r = a[0].progress;
                    this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -a[0].swiperSlideOffset,
                        d = 0;
                    if ((this.isHorizontal() ? t && (n = -n) : ((d = l), (l = 0), (o = -n), (n = 0)), (a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length), this.params.flipEffect.slideShadows)) {
                        var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                            p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                        0 === h.length && ((h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>')), a.append(h)),
                            0 === p.length && ((p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>')), a.append(p)),
                            h.length && (h[0].style.opacity = Math.max(-r, 0)),
                            p.length && (p[0].style.opacity = Math.max(r, 0));
                    }
                    a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
                }
            },
            setTransition: function (e) {
                var t = this,
                    i = t.slides,
                    s = t.activeIndex,
                    a = t.$wrapperEl;
                if ((i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e)) {
                    var r = !1;
                    i.eq(s).transitionEnd(function () {
                        if (!r && t && !t.destroyed) {
                            (r = !0), (t.animating = !1);
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i]);
                        }
                    });
                }
            },
        },
        ge = {
            setTranslate: function () {
                for (
                    var e = this.width,
                        t = this.height,
                        i = this.slides,
                        a = this.$wrapperEl,
                        r = this.slidesSizesGrid,
                        n = this.params.coverflowEffect,
                        l = this.isHorizontal(),
                        d = this.translate,
                        h = l ? e / 2 - d : t / 2 - d,
                        p = l ? n.rotate : -n.rotate,
                        c = n.depth,
                        u = 0,
                        v = i.length;
                    u < v;
                    u += 1
                ) {
                    var f = i.eq(u),
                        m = r[u],
                        g = ((h - f[0].swiperSlideOffset - m / 2) / m) * n.modifier,
                        b = l ? p * g : 0,
                        w = l ? 0 : p * g,
                        y = -c * Math.abs(g),
                        x = l ? 0 : n.stretch * g,
                        T = l ? n.stretch * g : 0;
                    Math.abs(T) < 0.001 && (T = 0), Math.abs(x) < 0.001 && (x = 0), Math.abs(y) < 0.001 && (y = 0), Math.abs(b) < 0.001 && (b = 0), Math.abs(w) < 0.001 && (w = 0);
                    var E = "translate3d(" + T + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                    if ((f.transform(E), (f[0].style.zIndex = 1 - Math.abs(Math.round(g))), n.slideShadows)) {
                        var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            S = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === C.length && ((C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>')), f.append(C)),
                            0 === S.length && ((S = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>')), f.append(S)),
                            C.length && (C[0].style.opacity = g > 0 ? g : 0),
                            S.length && (S[0].style.opacity = -g > 0 ? -g : 0);
                    }
                }
                (o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%");
            },
            setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
            },
        },
        be = {
            init: function () {
                var e = this.params.thumbs,
                    t = this.constructor;
                e.swiper instanceof t
                    ? ((this.thumbs.swiper = e.swiper),
                      n.extend(this.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                      n.extend(this.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 }))
                    : n.isObject(e.swiper) && ((this.thumbs.swiper = new t(n.extend({}, e.swiper, { watchSlidesVisibility: !0, watchSlidesProgress: !0, slideToClickedSlide: !1 }))), (this.thumbs.swiperCreated = !0)),
                    this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),
                    this.thumbs.swiper.on("tap", this.thumbs.onThumbClick);
            },
            onThumbClick: function () {
                var e = this.thumbs.swiper;
                if (e) {
                    var t = e.clickedIndex,
                        i = e.clickedSlide;
                    if (!((i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass)) || null == t)) {
                        var a;
                        if (((a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t), this.params.loop)) {
                            var r = this.activeIndex;
                            this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft), (r = this.activeIndex));
                            var n = this.slides
                                    .eq(r)
                                    .prevAll('[data-swiper-slide-index="' + a + '"]')
                                    .eq(0)
                                    .index(),
                                o = this.slides
                                    .eq(r)
                                    .nextAll('[data-swiper-slide-index="' + a + '"]')
                                    .eq(0)
                                    .index();
                            a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n;
                        }
                        this.slideTo(a);
                    }
                }
            },
            update: function (e) {
                var t = this.thumbs.swiper;
                if (t) {
                    var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                    if (this.realIndex !== t.realIndex) {
                        var s,
                            a = t.activeIndex;
                        if (t.params.loop) {
                            t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), (t._clientLeft = t.$wrapperEl[0].clientLeft), (a = t.activeIndex));
                            var r = t.slides
                                    .eq(a)
                                    .prevAll('[data-swiper-slide-index="' + this.realIndex + '"]')
                                    .eq(0)
                                    .index(),
                                n = t.slides
                                    .eq(a)
                                    .nextAll('[data-swiper-slide-index="' + this.realIndex + '"]')
                                    .eq(0)
                                    .index();
                            s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r;
                        } else s = this.realIndex;
                        t.visibleSlidesIndexes &&
                            t.visibleSlidesIndexes.indexOf(s) < 0 &&
                            (t.params.centeredSlides ? (s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1) : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0));
                    }
                    var o = 1,
                        l = this.params.thumbs.slideThumbActiveClass;
                    if ((this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), t.slides.removeClass(l), t.params.loop || (t.params.virtual && t.params.virtual.enabled)))
                        for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l);
                    else for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l);
                }
            },
        },
        we = [
            R,
            q,
            K,
            U,
            Z,
            J,
            te,
            {
                name: "mousewheel",
                params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } },
                create: function () {
                    n.extend(this, {
                        mousewheel: {
                            enabled: !1,
                            enable: ie.enable.bind(this),
                            disable: ie.disable.bind(this),
                            handle: ie.handle.bind(this),
                            handleMouseEnter: ie.handleMouseEnter.bind(this),
                            handleMouseLeave: ie.handleMouseLeave.bind(this),
                            lastScrollTime: n.now(),
                            lastEventBeforeSnap: void 0,
                            recentWheelEvents: [],
                        },
                    });
                },
                on: {
                    init: function () {
                        !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable();
                    },
                    destroy: function () {
                        this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable();
                    },
                },
            },
            {
                name: "navigation",
                params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } },
                create: function () {
                    n.extend(this, { navigation: { init: se.init.bind(this), update: se.update.bind(this), destroy: se.destroy.bind(this), onNextClick: se.onNextClick.bind(this), onPrevClick: se.onPrevClick.bind(this) } });
                },
                on: {
                    init: function () {
                        this.navigation.init(), this.navigation.update();
                    },
                    toEdge: function () {
                        this.navigation.update();
                    },
                    fromEdge: function () {
                        this.navigation.update();
                    },
                    destroy: function () {
                        this.navigation.destroy();
                    },
                    click: function (e) {
                        var t,
                            i = this.navigation,
                            a = i.$nextEl,
                            r = i.$prevEl;
                        !this.params.navigation.hideOnClick ||
                            s(e.target).is(r) ||
                            s(e.target).is(a) ||
                            (a ? (t = a.hasClass(this.params.navigation.hiddenClass)) : r && (t = r.hasClass(this.params.navigation.hiddenClass)),
                            !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this),
                            a && a.toggleClass(this.params.navigation.hiddenClass),
                            r && r.toggleClass(this.params.navigation.hiddenClass));
                    },
                },
            },
            {
                name: "pagination",
                params: {
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: function (e) {
                            return e;
                        },
                        formatFractionTotal: function (e) {
                            return e;
                        },
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        modifierClass: "swiper-pagination-",
                        currentClass: "swiper-pagination-current",
                        totalClass: "swiper-pagination-total",
                        hiddenClass: "swiper-pagination-hidden",
                        progressbarFillClass: "swiper-pagination-progressbar-fill",
                        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                        clickableClass: "swiper-pagination-clickable",
                        lockClass: "swiper-pagination-lock",
                    },
                },
                create: function () {
                    n.extend(this, { pagination: { init: ae.init.bind(this), render: ae.render.bind(this), update: ae.update.bind(this), destroy: ae.destroy.bind(this), dynamicBulletIndex: 0 } });
                },
                on: {
                    init: function () {
                        this.pagination.init(), this.pagination.render(), this.pagination.update();
                    },
                    activeIndexChange: function () {
                        this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update();
                    },
                    snapIndexChange: function () {
                        this.params.loop || this.pagination.update();
                    },
                    slidesLengthChange: function () {
                        this.params.loop && (this.pagination.render(), this.pagination.update());
                    },
                    snapGridLengthChange: function () {
                        this.params.loop || (this.pagination.render(), this.pagination.update());
                    },
                    destroy: function () {
                        this.pagination.destroy();
                    },
                    click: function (e) {
                        this.params.pagination.el &&
                            this.params.pagination.hideOnClick &&
                            this.pagination.$el.length > 0 &&
                            !s(e.target).hasClass(this.params.pagination.bulletClass) &&
                            (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this),
                            this.pagination.$el.toggleClass(this.params.pagination.hiddenClass));
                    },
                },
            },
            {
                name: "scrollbar",
                params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } },
                create: function () {
                    n.extend(this, {
                        scrollbar: {
                            init: re.init.bind(this),
                            destroy: re.destroy.bind(this),
                            updateSize: re.updateSize.bind(this),
                            setTranslate: re.setTranslate.bind(this),
                            setTransition: re.setTransition.bind(this),
                            enableDraggable: re.enableDraggable.bind(this),
                            disableDraggable: re.disableDraggable.bind(this),
                            setDragPosition: re.setDragPosition.bind(this),
                            getPointerPosition: re.getPointerPosition.bind(this),
                            onDragStart: re.onDragStart.bind(this),
                            onDragMove: re.onDragMove.bind(this),
                            onDragEnd: re.onDragEnd.bind(this),
                            isTouched: !1,
                            timeout: null,
                            dragTimeout: null,
                        },
                    });
                },
                on: {
                    init: function () {
                        this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
                    },
                    update: function () {
                        this.scrollbar.updateSize();
                    },
                    resize: function () {
                        this.scrollbar.updateSize();
                    },
                    observerUpdate: function () {
                        this.scrollbar.updateSize();
                    },
                    setTranslate: function () {
                        this.scrollbar.setTranslate();
                    },
                    setTransition: function (e) {
                        this.scrollbar.setTransition(e);
                    },
                    destroy: function () {
                        this.scrollbar.destroy();
                    },
                },
            },
            {
                name: "parallax",
                params: { parallax: { enabled: !1 } },
                create: function () {
                    n.extend(this, { parallax: { setTransform: ne.setTransform.bind(this), setTranslate: ne.setTranslate.bind(this), setTransition: ne.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        this.params.parallax.enabled && ((this.params.watchSlidesProgress = !0), (this.originalParams.watchSlidesProgress = !0));
                    },
                    init: function () {
                        this.params.parallax.enabled && this.parallax.setTranslate();
                    },
                    setTranslate: function () {
                        this.params.parallax.enabled && this.parallax.setTranslate();
                    },
                    setTransition: function (e) {
                        this.params.parallax.enabled && this.parallax.setTransition(e);
                    },
                },
            },
            {
                name: "zoom",
                params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } },
                create: function () {
                    var e = this,
                        t = {
                            enabled: !1,
                            scale: 1,
                            currentScale: 1,
                            isScaling: !1,
                            gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 },
                            image: {
                                isTouched: void 0,
                                isMoved: void 0,
                                currentX: void 0,
                                currentY: void 0,
                                minX: void 0,
                                minY: void 0,
                                maxX: void 0,
                                maxY: void 0,
                                width: void 0,
                                height: void 0,
                                startX: void 0,
                                startY: void 0,
                                touchesStart: {},
                                touchesCurrent: {},
                            },
                            velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 },
                        };
                    "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
                        t[i] = oe[i].bind(e);
                    }),
                        n.extend(e, { zoom: t });
                    var i = 1;
                    Object.defineProperty(e.zoom, "scale", {
                        get: function () {
                            return i;
                        },
                        set: function (t) {
                            if (i !== t) {
                                var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                    a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                                e.emit("zoomChange", t, s, a);
                            }
                            i = t;
                        },
                    });
                },
                on: {
                    init: function () {
                        this.params.zoom.enabled && this.zoom.enable();
                    },
                    destroy: function () {
                        this.zoom.disable();
                    },
                    touchStart: function (e) {
                        this.zoom.enabled && this.zoom.onTouchStart(e);
                    },
                    touchEnd: function (e) {
                        this.zoom.enabled && this.zoom.onTouchEnd(e);
                    },
                    doubleTap: function (e) {
                        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
                    },
                    transitionEnd: function () {
                        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
                    },
                    slideChange: function () {
                        this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd();
                    },
                },
            },
            {
                name: "lazy",
                params: {
                    lazy: {
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader",
                    },
                },
                create: function () {
                    n.extend(this, { lazy: { initialImageLoaded: !1, load: le.load.bind(this), loadInSlide: le.loadInSlide.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
                    },
                    init: function () {
                        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
                    },
                    scroll: function () {
                        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
                    },
                    resize: function () {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    scrollbarDragMove: function () {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    transitionStart: function () {
                        this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || (!this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded)) && this.lazy.load();
                    },
                    transitionEnd: function () {
                        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
                    },
                    slideChange: function () {
                        this.params.lazy.enabled && this.params.cssMode && this.lazy.load();
                    },
                },
            },
            {
                name: "controller",
                params: { controller: { control: void 0, inverse: !1, by: "slide" } },
                create: function () {
                    n.extend(this, {
                        controller: { control: this.params.controller.control, getInterpolateFunction: de.getInterpolateFunction.bind(this), setTranslate: de.setTranslate.bind(this), setTransition: de.setTransition.bind(this) },
                    });
                },
                on: {
                    update: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    resize: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    observerUpdate: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    setTranslate: function (e, t) {
                        this.controller.control && this.controller.setTranslate(e, t);
                    },
                    setTransition: function (e, t) {
                        this.controller.control && this.controller.setTransition(e, t);
                    },
                },
            },
            {
                name: "a11y",
                params: {
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                    },
                },
                create: function () {
                    var e = this;
                    n.extend(e, { a11y: { liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }),
                        Object.keys(he).forEach(function (t) {
                            e.a11y[t] = he[t].bind(e);
                        });
                },
                on: {
                    init: function () {
                        this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
                    },
                    toEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    fromEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    paginationUpdate: function () {
                        this.params.a11y.enabled && this.a11y.updatePagination();
                    },
                    destroy: function () {
                        this.params.a11y.enabled && this.a11y.destroy();
                    },
                },
            },
            {
                name: "history",
                params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
                create: function () {
                    n.extend(this, {
                        history: { init: pe.init.bind(this), setHistory: pe.setHistory.bind(this), setHistoryPopState: pe.setHistoryPopState.bind(this), scrollToSlide: pe.scrollToSlide.bind(this), destroy: pe.destroy.bind(this) },
                    });
                },
                on: {
                    init: function () {
                        this.params.history.enabled && this.history.init();
                    },
                    destroy: function () {
                        this.params.history.enabled && this.history.destroy();
                    },
                    transitionEnd: function () {
                        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
                    },
                    slideChange: function () {
                        this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex);
                    },
                },
            },
            {
                name: "hash-navigation",
                params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } },
                create: function () {
                    n.extend(this, { hashNavigation: { initialized: !1, init: ce.init.bind(this), destroy: ce.destroy.bind(this), setHash: ce.setHash.bind(this), onHashCange: ce.onHashCange.bind(this) } });
                },
                on: {
                    init: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.init();
                    },
                    destroy: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.destroy();
                    },
                    transitionEnd: function () {
                        this.hashNavigation.initialized && this.hashNavigation.setHash();
                    },
                    slideChange: function () {
                        this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash();
                    },
                },
            },
            {
                name: "autoplay",
                params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } },
                create: function () {
                    var e = this;
                    n.extend(e, {
                        autoplay: {
                            running: !1,
                            paused: !1,
                            run: ue.run.bind(e),
                            start: ue.start.bind(e),
                            stop: ue.stop.bind(e),
                            pause: ue.pause.bind(e),
                            onVisibilityChange: function () {
                                "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), (e.autoplay.paused = !1));
                            },
                            onTransitionEnd: function (t) {
                                e &&
                                    !e.destroyed &&
                                    e.$wrapperEl &&
                                    t.target === this &&
                                    (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd),
                                    e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd),
                                    (e.autoplay.paused = !1),
                                    e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
                            },
                        },
                    });
                },
                on: {
                    init: function () {
                        this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange));
                    },
                    beforeTransitionStart: function (e, t) {
                        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
                    },
                    sliderFirstMove: function () {
                        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
                    },
                    touchEnd: function () {
                        this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run();
                    },
                    destroy: function () {
                        this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange);
                    },
                },
            },
            {
                name: "effect-fade",
                params: { fadeEffect: { crossFade: !1 } },
                create: function () {
                    n.extend(this, { fadeEffect: { setTranslate: ve.setTranslate.bind(this), setTransition: ve.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("fade" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "fade");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                            n.extend(this.params, e), n.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "fade" === this.params.effect && this.fadeEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "fade" === this.params.effect && this.fadeEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-cube",
                params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } },
                create: function () {
                    n.extend(this, { cubeEffect: { setTranslate: fe.setTranslate.bind(this), setTransition: fe.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("cube" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 };
                            n.extend(this.params, e), n.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "cube" === this.params.effect && this.cubeEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "cube" === this.params.effect && this.cubeEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-flip",
                params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
                create: function () {
                    n.extend(this, { flipEffect: { setTranslate: me.setTranslate.bind(this), setTransition: me.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("flip" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                            n.extend(this.params, e), n.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "flip" === this.params.effect && this.flipEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "flip" === this.params.effect && this.flipEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-coverflow",
                params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } },
                create: function () {
                    n.extend(this, { coverflowEffect: { setTranslate: ge.setTranslate.bind(this), setTransition: ge.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        "coverflow" === this.params.effect &&
                            (this.classNames.push(this.params.containerModifierClass + "coverflow"),
                            this.classNames.push(this.params.containerModifierClass + "3d"),
                            (this.params.watchSlidesProgress = !0),
                            (this.originalParams.watchSlidesProgress = !0));
                    },
                    setTranslate: function () {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
                    },
                },
            },
            {
                name: "thumbs",
                params: { thumbs: { swiper: null, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-container-thumbs" } },
                create: function () {
                    n.extend(this, { thumbs: { swiper: null, init: be.init.bind(this), update: be.update.bind(this), onThumbClick: be.onThumbClick.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        var e = this.params.thumbs;
                        e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
                    },
                    slideChange: function () {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    update: function () {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    resize: function () {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    observerUpdate: function () {
                        this.thumbs.swiper && this.thumbs.update();
                    },
                    setTransition: function (e) {
                        var t = this.thumbs.swiper;
                        t && t.setTransition(e);
                    },
                    beforeDestroy: function () {
                        var e = this.thumbs.swiper;
                        e && this.thumbs.swiperCreated && e && e.destroy();
                    },
                },
            },
        ];
    return void 0 === W.use && ((W.use = W.Class.use), (W.installModule = W.Class.installModule)), W.use(we), W;
});
!(function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? (module.exports = i(require("jquery"))) : i(jQuery);
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    ((e = (function () {
        var e = 0;
        return function (t, o) {
            var s,
                n = this;
            (n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                i.extend(n, n.initials),
                (n.activeBreakpoint = null),
                (n.animType = null),
                (n.animProp = null),
                (n.breakpoints = []),
                (n.breakpointSettings = []),
                (n.cssTransitions = !1),
                (n.focussed = !1),
                (n.interrupted = !1),
                (n.hidden = "hidden"),
                (n.paused = !0),
                (n.positionProp = null),
                (n.respondTo = null),
                (n.rowCount = 1),
                (n.shouldClick = !0),
                (n.$slider = i(t)),
                (n.$slidesCache = null),
                (n.transformType = null),
                (n.transitionType = null),
                (n.visibilityChange = "visibilitychange"),
                (n.windowWidth = 0),
                (n.windowTimer = null),
                (s = i(t).data("slick") || {}),
                (n.options = i.extend({}, n.defaults, o, s)),
                (n.currentSlide = n.options.initialSlide),
                (n.originalSettings = n.options),
                void 0 !== document.mozHidden ? ((n.hidden = "mozHidden"), (n.visibilityChange = "mozvisibilitychange")) : void 0 !== document.webkitHidden && ((n.hidden = "webkitHidden"), (n.visibilityChange = "webkitvisibilitychange")),
                (n.autoPlay = i.proxy(n.autoPlay, n)),
                (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
                (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
                (n.changeSlide = i.proxy(n.changeSlide, n)),
                (n.clickHandler = i.proxy(n.clickHandler, n)),
                (n.selectHandler = i.proxy(n.selectHandler, n)),
                (n.setPosition = i.proxy(n.setPosition, n)),
                (n.swipeHandler = i.proxy(n.swipeHandler, n)),
                (n.dragHandler = i.proxy(n.dragHandler, n)),
                (n.keyHandler = i.proxy(n.keyHandler, n)),
                (n.instanceUid = e++),
                (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                n.registerBreakpoints(),
                n.init(!0);
        };
    })()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
    }),
        (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
            var s = this;
            if ("boolean" == typeof t) (o = t), (t = null);
            else if (t < 0 || t >= s.slideCount) return !1;
            s.unload(),
                "number" == typeof t
                    ? 0 === t && 0 === s.$slides.length
                        ? i(e).appendTo(s.$slideTrack)
                        : o
                        ? i(e).insertBefore(s.$slides.eq(t))
                        : i(e).insertAfter(s.$slides.eq(t))
                    : !0 === o
                    ? i(e).prependTo(s.$slideTrack)
                    : i(e).appendTo(s.$slideTrack),
                (s.$slides = s.$slideTrack.children(this.options.slide)),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function (e, t) {
                    i(t).attr("data-slick-index", e);
                }),
                (s.$slidesCache = s.$slides),
                s.reinit();
        }),
        (e.prototype.animateHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({ height: e }, i.options.speed);
            }
        }),
        (e.prototype.animateSlide = function (e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                !1 === s.transformsEnabled
                    ? !1 === s.options.vertical
                        ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t)
                        : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t)
                    : !1 === s.cssTransitions
                    ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                      i({ animStart: s.currentLeft }).animate(
                          { animStart: e },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)), !1 === s.options.vertical ? ((o[s.animType] = "translate(" + i + "px, 0px)"), s.$slideTrack.css(o)) : ((o[s.animType] = "translate(0px," + i + "px)"), s.$slideTrack.css(o));
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (e = Math.ceil(e)),
                      !1 === s.options.vertical ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)") : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t &&
                "object" == typeof t &&
                t.each(function () {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                });
        }),
        (e.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            !1 === e.options.fade ? (t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed));
        }),
        (e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (!1 === i.options.infinite &&
                    (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? (i.direction = 0) : 0 === i.direction && ((e = i.currentSlide - i.options.slidesToScroll), i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows &&
                ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
                (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
                e.slideCount > e.options.slidesToShow
                    ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                      e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                      !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                    : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
            var e,
                t,
                o = this;
            if (!0 === o.options.dots) {
                for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                (o.$dots = t.appendTo(o.options.appendDots)), o.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (e.prototype.buildOut = function () {
            var e = this;
            (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.$slides.each(function (e, t) {
                    i(t)
                        .attr("data-slick-index", e)
                        .data("originalStyling", i(t).attr("style") || "");
                }),
                e.$slider.addClass("slick-slider"),
                (e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                e.$slideTrack.css("opacity", 0),
                (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) || (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                !0 === e.options.draggable && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
            var i,
                e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            if (((o = document.createDocumentFragment()), (n = l.$slider.children()), l.options.rows > 1)) {
                for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c));
                        }
                        d.appendChild(a);
                    }
                    o.appendChild(d);
                }
                l.$slider.empty().append(o),
                    l.$slider
                        .children()
                        .children()
                        .children()
                        .css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" });
            }
        }),
        (e.prototype.checkResponsive = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if (("window" === r.respondTo ? (n = a) : "slider" === r.respondTo ? (n = d) : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive)) {
                s = null;
                for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s
                    ? null !== r.activeBreakpoint
                        ? (s !== r.activeBreakpoint || t) &&
                          ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                        : ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s] ? r.unslick(s) : ((r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s])), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)),
                          (l = s))
                    : null !== r.activeBreakpoint && ((r.activeBreakpoint = null), (r.options = r.originalSettings), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), (l = s)),
                    e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
            }
        }),
        (e.prototype.changeSlide = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = i(e.currentTarget);
            switch ((l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), (n = r.slideCount % r.options.slidesToScroll != 0), (o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), e.data.message)) {
                case "previous":
                    (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 === o ? r.options.slidesToScroll : o), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (e.prototype.checkNavigable = function (i) {
            var e, t;
            if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1])) i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
            return i;
        }),
        (e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots &&
                null !== e.$dots &&
                (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                    !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
        }),
        (e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
            var i,
                e = this;
            e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            i(this).attr("style", i(this).data("originalStyling"));
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
            var e = this,
                t = {};
            (t[e.transitionType] = ""), !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
            var e = this;
            null !== i && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit());
        }),
        (e.prototype.focusHandler = function () {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
                t.stopImmediatePropagation();
                var o = i(this);
                setTimeout(function () {
                    e.options.pauseOnFocus && ((e.focussed = o.is(":focus")), e.autoPlay());
                }, 0);
            });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            return this.currentSlide;
        }),
        (e.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else if (!0 === i.options.centerMode) o = i.slideCount;
            else if (i.options.asNavFor) for (; e < i.slideCount; ) ++o, (e = t + i.options.slidesToScroll), (t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
            var e,
                t,
                o,
                s,
                n = this,
                r = 0;
            return (
                (n.slideOffset = 0),
                (t = n.$slides.first().outerHeight(!0)),
                !0 === n.options.infinite
                    ? (n.slideCount > n.options.slidesToShow &&
                          ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                          (s = -1),
                          !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? (s = -1.5) : 1 === n.options.slidesToShow && (s = -2)),
                          (r = t * n.options.slidesToShow * s)),
                      n.slideCount % n.options.slidesToScroll != 0 &&
                          i + n.options.slidesToScroll > n.slideCount &&
                          n.slideCount > n.options.slidesToShow &&
                          (i > n.slideCount
                              ? ((n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1), (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                              : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
                    : i + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth), (r = (i + n.options.slidesToShow - n.slideCount) * t)),
                n.slideCount <= n.options.slidesToShow && ((n.slideOffset = 0), (r = 0)),
                !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
                    ? (n.slideOffset = (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 - (n.slideWidth * n.slideCount) / 2)
                    : !0 === n.options.centerMode && !0 === n.options.infinite
                    ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                    : !0 === n.options.centerMode && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                (e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r),
                !0 === n.options.variableWidth &&
                    ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow)),
                    (e = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                    !0 === n.options.centerMode &&
                        ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1)),
                        (e = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                        (e += (n.$list.width() - o.outerWidth()) / 2))),
                e
            );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
            return this.options[i];
        }),
        (e.prototype.getNavigableIndexes = function () {
            var i,
                e = this,
                t = 0,
                o = 0,
                s = [];
            for (!1 === e.options.infinite ? (i = e.slideCount) : ((t = -1 * e.options.slidesToScroll), (o = -1 * e.options.slidesToScroll), (i = 2 * e.slideCount)); t < i; )
                s.push(t), (t = o + e.options.slidesToScroll), (o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
            return s;
        }),
        (e.prototype.getSlick = function () {
            return this;
        }),
        (e.prototype.getSlideCount = function () {
            var e,
                t,
                o = this;
            return (
                (t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0),
                !0 === o.options.swipeToSlide
                    ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                          if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return (e = n), !1;
                      }),
                      Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
                    : o.options.slidesToScroll
            );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
            this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
        }),
        (e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") ||
                (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount;
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                null !== e.$dots &&
                    (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                        var s = o.indexOf(t);
                        i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s });
                    }),
                    e.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (s) {
                            var n = o[s];
                            i(this).attr({ role: "presentation" }),
                                i(this)
                                    .find("button")
                                    .first()
                                    .attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" });
                        })
                        .eq(e.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
            e.activateADA();
        }),
        (e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide),
                !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
                i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && !0 === e.options.accessibility
                    ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } })
                    : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
        }),
        (e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                        r = document.createElement("img");
                    (r.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                }),
                                n.$slider.trigger("lazyLoaded", [n, e, t]);
                        });
                    }),
                        (r.onerror = function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
                        }),
                        (r.src = t);
                });
            }
            var t,
                o,
                s,
                n = this;
            if (
                (!0 === n.options.centerMode
                    ? !0 === n.options.infinite
                        ? (s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2)
                        : ((o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1))), (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
                    : ((o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide), (s = Math.ceil(o + n.options.slidesToShow)), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
                (t = n.$slider.find(".slick-slide").slice(o, s)),
                "anticipated" === n.options.lazyLoad)
            )
                for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), (t = (t = t.add(d.eq(r))).add(d.eq(l))), r--, l++;
            e(t),
                n.slideCount <= n.options.slidesToShow
                    ? e(n.$slider.find(".slick-slide"))
                    : n.currentSlide >= n.slideCount - n.options.slidesToShow
                    ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
                    : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
        }),
        (e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext = function () {
            this.changeSlide({ data: { message: "next" } });
        }),
        (e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause = function () {
            var i = this;
            i.autoPlayClear(), (i.paused = !0);
        }),
        (e.prototype.play = e.prototype.slickPlay = function () {
            var i = this;
            i.autoPlay(), (i.options.autoplay = !0), (i.paused = !1), (i.focussed = !1), (i.interrupted = !1);
        }),
        (e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked ||
                (t.$slider.trigger("afterChange", [t, e]),
                (t.animating = !1),
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                (t.swipeLeft = null),
                t.options.autoplay && t.autoPlay(),
                !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
        }),
        (e.prototype.prev = e.prototype.slickPrev = function () {
            this.changeSlide({ data: { message: "previous" } });
        }),
        (e.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t,
                o,
                s,
                n,
                r,
                l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length
                ? ((t = d.first()),
                  (o = t.attr("data-lazy")),
                  (s = t.attr("data-srcset")),
                  (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
                  ((r = document.createElement("img")).onload = function () {
                      s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                          t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                          !0 === l.options.adaptiveHeight && l.setPosition(),
                          l.$slider.trigger("lazyLoaded", [l, t, o]),
                          l.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      e < 3
                          ? setTimeout(function () {
                                l.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad());
                  }),
                  (r.src = o))
                : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                i.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                e || s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
            var e,
                t,
                o,
                s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                        for (t = n[e].breakpoint; o >= 0; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (e.prototype.reinit = function () {
            var e = this;
            (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                (e.paused = !e.options.autoplay),
                e.autoPlay(),
                e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth &&
                (clearTimeout(e.windowDelay),
                (e.windowDelay = window.setTimeout(function () {
                    (e.windowWidth = i(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                }, 50)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
            var o = this;
            if (((i = "boolean" == typeof i ? (!0 === (e = i) ? 0 : o.slideCount - 1) : !0 === e ? --i : i), o.slideCount < 1 || i < 0 || i > o.slideCount - 1)) return !1;
            o.unload(),
                !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
                (o.$slides = o.$slideTrack.children(this.options.slide)),
                o.$slideTrack.children(this.options.slide).detach(),
                o.$slideTrack.append(o.$slides),
                (o.$slidesCache = o.$slides),
                o.reinit();
        }),
        (e.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                !1 === o.transformsEnabled
                    ? o.$slideTrack.css(s)
                    : ((s = {}), !1 === o.cssTransitions ? ((s[o.animType] = "translate(" + e + ", " + t + ")"), o.$slideTrack.css(s)) : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"), o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical
                ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                !1 === i.options.vertical && !1 === i.options.variableWidth
                    ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length)))
                    : !0 === i.options.variableWidth
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
            var e,
                t = this;
            t.$slides.each(function (o, s) {
                (e = t.slideWidth * o * -1),
                    !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 });
            }),
                t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e);
            }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption = function () {
            var e,
                t,
                o,
                s,
                n,
                r = this,
                l = !1;
            if (
                ("object" === i.type(arguments[0])
                    ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
                    : "string" === i.type(arguments[0]) &&
                      ((o = arguments[0]), (s = arguments[1]), (l = arguments[2]), "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? (n = "responsive") : void 0 !== arguments[1] && (n = "single")),
                "single" === n)
            )
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e) {
                    r.options[i] = e;
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0; ) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t]);
                    }
            l && (r.unload(), r.reinit());
        }),
        (e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
                "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition) || (!0 === i.options.useCSS && (i.cssTransitions = !0)),
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform && ((i.animType = "OTransform"), (i.transformType = "-o-transform"), (i.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.MozTransform && ((i.animType = "MozTransform"), (i.transformType = "-moz-transform"), (i.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"), (i.transformType = "-webkit-transform"), (i.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.msTransform && ((i.animType = "msTransform"), (i.transformType = "-ms-transform"), (i.transitionType = "msTransition"), void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform && !1 !== i.animType && ((i.animType = "transform"), (i.transformType = "transform"), (i.transitionType = "transition")),
                (i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType);
        }),
        (e.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s,
                n = this;
            if (((t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode)) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                (e = Math.floor(n.options.slidesToShow / 2)),
                    !0 === n.options.infinite &&
                        (i >= e && i <= n.slideCount - 1 - e
                            ? n.$slides
                                  .slice(i - e + r, i + e + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + i),
                              t
                                  .slice(o - e + 1 + r, o + e + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center");
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow
                    ? n.$slides
                          .slice(i, i + n.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= n.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = n.slideCount % n.options.slidesToShow),
                      (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
                      n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow
                          ? t
                                .slice(o - (n.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad) || n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
            var e,
                t,
                o,
                s = this;
            if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((t = null), s.slideCount > s.options.slidesToShow))) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)
                    (t = e - 1),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    (t = e),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        i(this).attr("id", "");
                    });
            }
        }),
        (e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
            var t = this,
                o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l,
                d = null,
                a = this;
            if (((e = e || !1), !((!0 === a.animating && !0 === a.options.waitForAnimate) || (!0 === a.options.fade && a.currentSlide === i))))
                if (
                    (!1 === e && a.asNavFor(i),
                    (o = i),
                    (d = a.getLeft(o)),
                    (r = a.getLeft(a.currentSlide)),
                    (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
                    !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else {
                    if (
                        (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        (s =
                            o < 0
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                                    : a.slideCount + o
                                : o >= a.slideCount
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? 0
                                    : o - a.slideCount
                                : o),
                        (a.animating = !0),
                        a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                        (n = a.currentSlide),
                        (a.currentSlide = s),
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                        a.updateDots(),
                        a.updateArrows(),
                        !0 === a.options.fade)
                    )
                        return (
                            !0 !== t
                                ? (a.fadeSlideOut(n),
                                  a.fadeSlide(s, function () {
                                      a.postSlide(s);
                                  }))
                                : a.postSlide(s),
                            void a.animateHeight()
                        );
                    !0 !== t
                        ? a.animateSlide(d, function () {
                              a.postSlide(s);
                          })
                        : a.postSlide(s);
                }
        }),
        (e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()),
                !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
            var i,
                e,
                t,
                o,
                s = this;
            return (
                (i = s.touchObject.startX - s.touchObject.curX),
                (e = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(e, i)),
                (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o <= 360 && o >= 315
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o >= 135 && o <= 225
                    ? !1 === s.options.rtl
                        ? "right"
                        : "left"
                    : !0 === s.options.verticalSwiping
                    ? o >= 35 && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (e.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling)) return (o.scrolling = !1), !1;
            if (((o.interrupted = !1), (o.shouldClick = !(o.touchObject.swipeLength > 10)), void 0 === o.touchObject.curX)) return !1;
            if ((!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount()), (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount()), (o.currentDirection = 1);
                }
                "vertical" != t && (o.slideHandler(e), (o.touchObject = {}), o.$slider.trigger("swipe", [o, t]));
            } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
            var e = this;
            if (!(!1 === e.options.swipe || ("ontouchend" in document && !1 === e.options.swipe) || (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))))
                switch (
                    ((e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1),
                    (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                    !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (e.prototype.swipeMove = function (i) {
            var e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            return (
                (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
                !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                    ((e = l.getLeft(l.currentSlide)),
                    (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
                    (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
                    (l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)))),
                    (r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)))),
                    !l.options.verticalSwiping && !l.swiping && r > 4
                        ? ((l.scrolling = !0), !1)
                        : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
                          (t = l.swipeDirection()),
                          void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && ((l.swiping = !0), i.preventDefault()),
                          (s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                          !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                          (o = l.touchObject.swipeLength),
                          (l.touchObject.edgeHit = !1),
                          !1 === l.options.infinite &&
                              ((0 === l.currentSlide && "right" === t) || (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                              ((o = l.touchObject.swipeLength * l.options.edgeFriction), (l.touchObject.edgeHit = !0)),
                          !1 === l.options.vertical ? (l.swipeLeft = e + o * s) : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
                          !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
                          !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? ((l.swipeLeft = null), !1) : void l.setCSS(l.swipeLeft))))
            );
        }),
        (e.prototype.swipeStart = function (i) {
            var e,
                t = this;
            if (((t.interrupted = !0), 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)) return (t.touchObject = {}), !1;
            void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
                (t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX),
                (t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY),
                (t.dragging = !0);
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var i = this;
            null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit());
        }),
        (e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
        }),
        (e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    !i.options.infinite &&
                    (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === i.currentSlide
                        ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode
                        ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - 1 &&
                          !0 === i.options.centerMode &&
                          (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
            var i,
                t,
                o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++) if (("object" == typeof s || void 0 === s ? (o[i].slick = new e(o[i], s)) : (t = o[i].slick[s].apply(o[i].slick, n)), void 0 !== t)) return t;
            return o;
        });
});
/*!
 * Packery layout mode PACKAGED v2.0.1
 * sub-classes Packery
 */ !(function (a, b) {
    "function" == typeof define && define.amd ? define("packery/js/rect", b) : "object" == typeof module && module.exports ? (module.exports = b()) : ((a.Packery = a.Packery || {}), (a.Packery.Rect = b()));
})(window, function () {
    function a(b) {
        for (var c in a.defaults) this[c] = a.defaults[c];
        for (c in b) this[c] = b[c];
    }
    a.defaults = { x: 0, y: 0, width: 0, height: 0 };
    var b = a.prototype;
    return (
        (b.contains = function (a) {
            var b = a.width || 0,
                c = a.height || 0;
            return this.x <= a.x && this.y <= a.y && this.x + this.width >= a.x + b && this.y + this.height >= a.y + c;
        }),
        (b.overlaps = function (a) {
            var b = this.x + this.width,
                c = this.y + this.height,
                d = a.x + a.width,
                e = a.y + a.height;
            return this.x < d && b > a.x && this.y < e && c > a.y;
        }),
        (b.getMaximalFreeRects = function (b) {
            if (!this.overlaps(b)) return !1;
            var c,
                d = [],
                e = this.x + this.width,
                f = this.y + this.height,
                g = b.x + b.width,
                h = b.y + b.height;
            return (
                this.y < b.y && ((c = new a({ x: this.x, y: this.y, width: this.width, height: b.y - this.y })), d.push(c)),
                e > g && ((c = new a({ x: g, y: this.y, width: e - g, height: this.height })), d.push(c)),
                f > h && ((c = new a({ x: this.x, y: h, width: this.width, height: f - h })), d.push(c)),
                this.x < b.x && ((c = new a({ x: this.x, y: this.y, width: b.x - this.x, height: this.height })), d.push(c)),
                d
            );
        }),
        (b.canFit = function (a) {
            return this.width >= a.width && this.height >= a.height;
        }),
        a
    );
}),
    (function (a, b) {
        if ("function" == typeof define && define.amd) define("packery/js/packer", ["./rect"], b);
        else if ("object" == typeof module && module.exports) module.exports = b(require("./rect"));
        else {
            var c = (a.Packery = a.Packery || {});
            c.Packer = b(c.Rect);
        }
    })(window, function (a) {
        function b(a, b, c) {
            (this.width = a || 0), (this.height = b || 0), (this.sortDirection = c || "downwardLeftToRight"), this.reset();
        }
        var c = b.prototype;
        (c.reset = function () {
            this.spaces = [];
            var b = new a({ x: 0, y: 0, width: this.width, height: this.height });
            this.spaces.push(b), (this.sorter = d[this.sortDirection] || d.downwardLeftToRight);
        }),
            (c.pack = function (a) {
                for (var b = 0; b < this.spaces.length; b++) {
                    var c = this.spaces[b];
                    if (c.canFit(a)) {
                        this.placeInSpace(a, c);
                        break;
                    }
                }
            }),
            (c.columnPack = function (a) {
                for (var b = 0; b < this.spaces.length; b++) {
                    var c = this.spaces[b],
                        d = c.x <= a.x && c.x + c.width >= a.x + a.width && c.height >= a.height - 0.01;
                    if (d) {
                        (a.y = c.y), this.placed(a);
                        break;
                    }
                }
            }),
            (c.rowPack = function (a) {
                for (var b = 0; b < this.spaces.length; b++) {
                    var c = this.spaces[b],
                        d = c.y <= a.y && c.y + c.height >= a.y + a.height && c.width >= a.width - 0.01;
                    if (d) {
                        (a.x = c.x), this.placed(a);
                        break;
                    }
                }
            }),
            (c.placeInSpace = function (a, b) {
                (a.x = b.x), (a.y = b.y), this.placed(a);
            }),
            (c.placed = function (a) {
                for (var b = [], c = 0; c < this.spaces.length; c++) {
                    var d = this.spaces[c],
                        e = d.getMaximalFreeRects(a);
                    e ? b.push.apply(b, e) : b.push(d);
                }
                (this.spaces = b), this.mergeSortSpaces();
            }),
            (c.mergeSortSpaces = function () {
                b.mergeRects(this.spaces), this.spaces.sort(this.sorter);
            }),
            (c.addSpace = function (a) {
                this.spaces.push(a), this.mergeSortSpaces();
            }),
            (b.mergeRects = function (a) {
                var b = 0,
                    c = a[b];
                a: for (; c; ) {
                    for (var d = 0, e = a[b + d]; e; ) {
                        if (e == c) d++;
                        else {
                            if (e.contains(c)) {
                                a.splice(b, 1), (c = a[b]);
                                continue a;
                            }
                            c.contains(e) ? a.splice(b + d, 1) : d++;
                        }
                        e = a[b + d];
                    }
                    b++, (c = a[b]);
                }
                return a;
            });
        var d = {
            downwardLeftToRight: function (a, b) {
                return a.y - b.y || a.x - b.x;
            },
            rightwardTopToBottom: function (a, b) {
                return a.x - b.x || a.y - b.y;
            },
        };
        return b;
    }),
    (function (a, b) {
        "function" == typeof define && define.amd
            ? define("packery/js/item", ["outlayer/outlayer", "./rect"], b)
            : "object" == typeof module && module.exports
            ? (module.exports = b(require("outlayer"), require("./rect")))
            : (a.Packery.Item = b(a.Outlayer, a.Packery.Rect));
    })(window, function (a, b) {
        var c = document.documentElement.style,
            d = "string" == typeof c.transform ? "transform" : "WebkitTransform",
            e = function () {
                a.Item.apply(this, arguments);
            },
            f = (e.prototype = Object.create(a.Item.prototype)),
            g = f._create;
        f._create = function () {
            g.call(this), (this.rect = new b());
        };
        var h = f.moveTo;
        return (
            (f.moveTo = function (a, b) {
                var c = Math.abs(this.position.x - a),
                    d = Math.abs(this.position.y - b),
                    e = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > c && 1 > d;
                return e ? void this.goTo(a, b) : void h.apply(this, arguments);
            }),
            (f.enablePlacing = function () {
                this.removeTransitionStyles(), this.isTransitioning && d && (this.element.style[d] = "none"), (this.isTransitioning = !1), this.getSize(), this.layout._setRectSize(this.element, this.rect), (this.isPlacing = !0);
            }),
            (f.disablePlacing = function () {
                this.isPlacing = !1;
            }),
            (f.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this]);
            }),
            (f.showDropPlaceholder = function () {
                var a = this.dropPlaceholder;
                a || ((a = this.dropPlaceholder = document.createElement("div")), (a.className = "packery-drop-placeholder"), (a.style.position = "absolute")),
                    (a.style.width = this.size.width + "px"),
                    (a.style.height = this.size.height + "px"),
                    this.positionDropPlaceholder(),
                    this.layout.element.appendChild(a);
            }),
            (f.positionDropPlaceholder = function () {
                this.dropPlaceholder.style[d] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)";
            }),
            (f.hideDropPlaceholder = function () {
                this.layout.element.removeChild(this.dropPlaceholder);
            }),
            e
        );
    }),
    (function (a, b) {
        "function" == typeof define && define.amd
            ? define("packery/js/packery", ["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], b)
            : "object" == typeof module && module.exports
            ? (module.exports = b(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")))
            : (a.Packery = b(a.getSize, a.Outlayer, a.Packery.Rect, a.Packery.Packer, a.Packery.Item));
    })(window, function (a, b, c, d, e) {
        function f(a, b) {
            return a.position.y - b.position.y || a.position.x - b.position.x;
        }
        function g(a, b) {
            return a.position.x - b.position.x || a.position.y - b.position.y;
        }
        function h(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y;
            return Math.sqrt(c * c + d * d);
        }
        c.prototype.canFit = function (a) {
            return this.width >= a.width - 1 && this.height >= a.height - 1;
        };
        var i = b.create("packery");
        i.Item = e;
        var j = i.prototype;
        (j._create = function () {
            b.prototype._create.call(this), (this.packer = new d()), (this.shiftPacker = new d()), (this.isEnabled = !0), (this.dragItemCount = 0);
            var a = this;
            (this.handleDraggabilly = {
                dragStart: function () {
                    a.itemDragStart(this.element);
                },
                dragMove: function () {
                    a.itemDragMove(this.element, this.position.x, this.position.y);
                },
                dragEnd: function () {
                    a.itemDragEnd(this.element);
                },
            }),
                (this.handleUIDraggable = {
                    start: function (b, c) {
                        c && a.itemDragStart(b.currentTarget);
                    },
                    drag: function (b, c) {
                        c && a.itemDragMove(b.currentTarget, c.position.left, c.position.top);
                    },
                    stop: function (b, c) {
                        c && a.itemDragEnd(b.currentTarget);
                    },
                });
        }),
            (j._resetLayout = function () {
                this.getSize(), this._getMeasurements();
                var a, b, c;
                this._getOption("horizontal") ? ((a = 1 / 0), (b = this.size.innerHeight + this.gutter), (c = "rightwardTopToBottom")) : ((a = this.size.innerWidth + this.gutter), (b = 1 / 0), (c = "downwardLeftToRight")),
                    (this.packer.width = this.shiftPacker.width = a),
                    (this.packer.height = this.shiftPacker.height = b),
                    (this.packer.sortDirection = this.shiftPacker.sortDirection = c),
                    this.packer.reset(),
                    (this.maxY = 0),
                    (this.maxX = 0);
            }),
            (j._getMeasurements = function () {
                this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width");
            }),
            (j._getItemLayoutPosition = function (a) {
                if ((this._setRectSize(a.element, a.rect), this.isShifting || this.dragItemCount > 0)) {
                    var b = this._getPackMethod();
                    this.packer[b](a.rect);
                } else this.packer.pack(a.rect);
                return this._setMaxXY(a.rect), a.rect;
            }),
            (j.shiftLayout = function () {
                (this.isShifting = !0), this.layout(), delete this.isShifting;
            }),
            (j._getPackMethod = function () {
                return this._getOption("horizontal") ? "rowPack" : "columnPack";
            }),
            (j._setMaxXY = function (a) {
                (this.maxX = Math.max(a.x + a.width, this.maxX)), (this.maxY = Math.max(a.y + a.height, this.maxY));
            }),
            (j._setRectSize = function (b, c) {
                var d = a(b),
                    e = d.outerWidth,
                    f = d.outerHeight;
                (e || f) && ((e = this._applyGridGutter(e, this.columnWidth)), (f = this._applyGridGutter(f, this.rowHeight))), (c.width = Math.min(e, this.packer.width)), (c.height = Math.min(f, this.packer.height));
            }),
            (j._applyGridGutter = function (a, b) {
                if (!b) return a + this.gutter;
                b += this.gutter;
                var c = a % b,
                    d = c && 1 > c ? "round" : "ceil";
                return (a = Math[d](a / b) * b);
            }),
            (j._getContainerSize = function () {
                return this._getOption("horizontal") ? { width: this.maxX - this.gutter } : { height: this.maxY - this.gutter };
            }),
            (j._manageStamp = function (a) {
                var b,
                    d = this.getItem(a);
                if (d && d.isPlacing) b = d.rect;
                else {
                    var e = this._getElementOffset(a);
                    b = new c({ x: this._getOption("originLeft") ? e.left : e.right, y: this._getOption("originTop") ? e.top : e.bottom });
                }
                this._setRectSize(a, b), this.packer.placed(b), this._setMaxXY(b);
            }),
            (j.sortItemsByPosition = function () {
                var a = this._getOption("horizontal") ? g : f;
                this.items.sort(a);
            }),
            (j.fit = function (a, b, c) {
                var d = this.getItem(a);
                d &&
                    (this.stamp(d.element),
                    d.enablePlacing(),
                    this.updateShiftTargets(d),
                    (b = void 0 === b ? d.rect.x : b),
                    (c = void 0 === c ? d.rect.y : c),
                    this.shift(d, b, c),
                    this._bindFitEvents(d),
                    d.moveTo(d.rect.x, d.rect.y),
                    this.shiftLayout(),
                    this.unstamp(d.element),
                    this.sortItemsByPosition(),
                    d.disablePlacing());
            }),
            (j._bindFitEvents = function (a) {
                function b() {
                    d++, 2 == d && c.dispatchEvent("fitComplete", null, [a]);
                }
                var c = this,
                    d = 0;
                a.once("layout", b), this.once("layoutComplete", b);
            }),
            (j.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout());
            }),
            (j.needsResizeLayout = function () {
                var b = a(this.element),
                    c = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
                return b[c] != this.size[c];
            }),
            (j.resizeShiftPercentLayout = function () {
                var b = this._getItemsForLayout(this.items),
                    c = this._getOption("horizontal"),
                    d = c ? "y" : "x",
                    e = c ? "height" : "width",
                    f = c ? "rowHeight" : "columnWidth",
                    g = c ? "innerHeight" : "innerWidth",
                    h = this[f];
                if ((h = h && h + this.gutter)) {
                    this._getMeasurements();
                    var i = this[f] + this.gutter;
                    b.forEach(function (a) {
                        var b = Math.round(a.rect[d] / h);
                        a.rect[d] = b * i;
                    });
                } else {
                    var j = a(this.element)[g] + this.gutter,
                        k = this.packer[e];
                    b.forEach(function (a) {
                        a.rect[d] = (a.rect[d] / k) * j;
                    });
                }
                this.shiftLayout();
            }),
            (j.itemDragStart = function (a) {
                if (this.isEnabled) {
                    this.stamp(a);
                    var b = this.getItem(a);
                    b && (b.enablePlacing(), b.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(b));
                }
            }),
            (j.updateShiftTargets = function (a) {
                this.shiftPacker.reset(), this._getBoundingRect();
                var b = this._getOption("originLeft"),
                    d = this._getOption("originTop");
                this.stamps.forEach(function (a) {
                    var e = this.getItem(a);
                    if (!e || !e.isPlacing) {
                        var f = this._getElementOffset(a),
                            g = new c({ x: b ? f.left : f.right, y: d ? f.top : f.bottom });
                        this._setRectSize(a, g), this.shiftPacker.placed(g);
                    }
                }, this);
                var e = this._getOption("horizontal"),
                    f = e ? "rowHeight" : "columnWidth",
                    g = e ? "height" : "width";
                (this.shiftTargetKeys = []), (this.shiftTargets = []);
                var h,
                    i = this[f];
                if ((i = i && i + this.gutter)) {
                    var j = Math.ceil(a.rect[g] / i),
                        k = Math.floor((this.shiftPacker[g] + this.gutter) / i);
                    h = (k - j) * i;
                    for (var l = 0; k > l; l++) this._addShiftTarget(l * i, 0, h);
                } else (h = this.shiftPacker[g] + this.gutter - a.rect[g]), this._addShiftTarget(0, 0, h);
                var m = this._getItemsForLayout(this.items),
                    n = this._getPackMethod();
                m.forEach(function (a) {
                    var b = a.rect;
                    this._setRectSize(a.element, b), this.shiftPacker[n](b), this._addShiftTarget(b.x, b.y, h);
                    var c = e ? b.x + b.width : b.x,
                        d = e ? b.y : b.y + b.height;
                    if ((this._addShiftTarget(c, d, h), i))
                        for (var f = Math.round(b[g] / i), j = 1; f > j; j++) {
                            var k = e ? c : b.x + i * j,
                                l = e ? b.y + i * j : d;
                            this._addShiftTarget(k, l, h);
                        }
                }, this);
            }),
            (j._addShiftTarget = function (a, b, c) {
                var d = this._getOption("horizontal") ? b : a;
                if (!(0 !== d && d > c)) {
                    var e = a + "," + b,
                        f = -1 != this.shiftTargetKeys.indexOf(e);
                    f || (this.shiftTargetKeys.push(e), this.shiftTargets.push({ x: a, y: b }));
                }
            }),
            (j.shift = function (a, b, c) {
                var d,
                    e = 1 / 0,
                    f = { x: b, y: c };
                this.shiftTargets.forEach(function (a) {
                    var b = h(a, f);
                    e > b && ((d = a), (e = b));
                }),
                    (a.rect.x = d.x),
                    (a.rect.y = d.y);
            });
        var k = 120;
        (j.itemDragMove = function (a, b, c) {
            function d() {
                f.shift(e, b, c), e.positionDropPlaceholder(), f.layout();
            }
            var e = this.isEnabled && this.getItem(a);
            if (e) {
                (b -= this.size.paddingLeft), (c -= this.size.paddingTop);
                var f = this,
                    g = new Date();
                this._itemDragTime && g - this._itemDragTime < k ? (clearTimeout(this.dragTimeout), (this.dragTimeout = setTimeout(d, k))) : (d(), (this._itemDragTime = g));
            }
        }),
            (j.itemDragEnd = function (a) {
                function b() {
                    d++, 2 == d && (c.element.classList.remove("is-positioning-post-drag"), c.hideDropPlaceholder(), e.dispatchEvent("dragItemPositioned", null, [c]));
                }
                var c = this.isEnabled && this.getItem(a);
                if (c) {
                    clearTimeout(this.dragTimeout), c.element.classList.add("is-positioning-post-drag");
                    var d = 0,
                        e = this;
                    c.once("layout", b),
                        this.once("layoutComplete", b),
                        c.moveTo(c.rect.x, c.rect.y),
                        this.layout(),
                        (this.dragItemCount = Math.max(0, this.dragItemCount - 1)),
                        this.sortItemsByPosition(),
                        c.disablePlacing(),
                        this.unstamp(c.element);
                }
            }),
            (j.bindDraggabillyEvents = function (a) {
                this._bindDraggabillyEvents(a, "on");
            }),
            (j.unbindDraggabillyEvents = function (a) {
                this._bindDraggabillyEvents(a, "off");
            }),
            (j._bindDraggabillyEvents = function (a, b) {
                var c = this.handleDraggabilly;
                a[b]("dragStart", c.dragStart), a[b]("dragMove", c.dragMove), a[b]("dragEnd", c.dragEnd);
            }),
            (j.bindUIDraggableEvents = function (a) {
                this._bindUIDraggableEvents(a, "on");
            }),
            (j.unbindUIDraggableEvents = function (a) {
                this._bindUIDraggableEvents(a, "off");
            }),
            (j._bindUIDraggableEvents = function (a, b) {
                var c = this.handleUIDraggable;
                a[b]("dragstart", c.start)[b]("drag", c.drag)[b]("dragstop", c.stop);
            });
        var l = j.destroy;
        return (
            (j.destroy = function () {
                l.apply(this, arguments), (this.isEnabled = !1);
            }),
            (i.Rect = c),
            (i.Packer = d),
            i
        );
    }),
    (function (a, b) {
        "function" == typeof define && define.amd
            ? define(["isotope-layout/js/layout-mode", "packery/js/packery"], b)
            : "object" == typeof module && module.exports
            ? (module.exports = b(require("isotope-layout/js/layout-mode"), require("packery")))
            : b(a.Isotope.LayoutMode, a.Packery);
    })(window, function (a, b) {
        var c = a.create("packery"),
            d = c.prototype,
            e = { _getElementOffset: !0, _getMeasurement: !0 };
        for (var f in b.prototype) e[f] || (d[f] = b.prototype[f]);
        var g = d._resetLayout;
        d._resetLayout = function () {
            (this.packer = this.packer || new b.Packer()), (this.shiftPacker = this.shiftPacker || new b.Packer()), g.apply(this, arguments);
        };
        var h = d._getItemLayoutPosition;
        d._getItemLayoutPosition = function (a) {
            return (a.rect = a.rect || new b.Rect()), h.call(this, a);
        };
        var i = d.needsResizeLayout;
        d.needsResizeLayout = function () {
            return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : i.call(this);
        };
        var j = d._getOption;
        return (
            (d._getOption = function (a) {
                return "horizontal" == a ? (void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal) : j.apply(this.isotope, arguments);
            }),
            c
        );
    });
/*!Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md*/ !(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
})(function (a) {
    var b = (function () {
            if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
            var b;
            return (
                (function () {
                    if (!b || !b.requirejs) {
                        b ? (c = b) : (b = {});
                        var a, c, d;
                        !(function (b) {
                            function e(a, b) {
                                return u.call(a, b);
                            }
                            function f(a, b) {
                                var c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    n = b && b.split("https://overworld.qodeinteractive.com/"),
                                    o = s.map,
                                    p = (o && o["*"]) || {};
                                if (a && "." === a.charAt(0))
                                    if (b) {
                                        for (
                                            a = a.split("https://overworld.qodeinteractive.com/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.slice(0, n.length - 1).concat(a), k = 0;
                                            k < a.length;
                                            k += 1
                                        )
                                            if (((m = a[k]), "." === m)) a.splice(k, 1), (k -= 1);
                                            else if (".." === m) {
                                                if (1 === k && (".." === a[2] || ".." === a[0])) break;
                                                k > 0 && (a.splice(k - 1, 2), (k -= 2));
                                            }
                                        a = a.join("https://overworld.qodeinteractive.com/");
                                    } else 0 === a.indexOf("index.html") && (a = a.substring(2));
                                if ((n || p) && o) {
                                    for (c = a.split("https://overworld.qodeinteractive.com/"), k = c.length; k > 0; k -= 1) {
                                        if (((d = c.slice(0, k).join("https://overworld.qodeinteractive.com/")), n))
                                            for (l = n.length; l > 0; l -= 1)
                                                if (((e = o[n.slice(0, l).join("https://overworld.qodeinteractive.com/")]), e && (e = e[d]))) {
                                                    (f = e), (h = k);
                                                    break;
                                                }
                                        if (f) break;
                                        !i && p && p[d] && ((i = p[d]), (j = k));
                                    }
                                    !f && i && ((f = i), (h = j)), f && (c.splice(0, h, f), (a = c.join("https://overworld.qodeinteractive.com/")));
                                }
                                return a;
                            }
                            function g(a, c) {
                                return function () {
                                    var d = v.call(arguments, 0);
                                    return "string" != typeof d[0] && 1 === d.length && d.push(null), n.apply(b, d.concat([a, c]));
                                };
                            }
                            function h(a) {
                                return function (b) {
                                    return f(b, a);
                                };
                            }
                            function i(a) {
                                return function (b) {
                                    q[a] = b;
                                };
                            }
                            function j(a) {
                                if (e(r, a)) {
                                    var c = r[a];
                                    delete r[a], (t[a] = !0), m.apply(b, c);
                                }
                                if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
                                return q[a];
                            }
                            function k(a) {
                                var b,
                                    c = a ? a.indexOf("!") : -1;
                                return c > -1 && ((b = a.substring(0, c)), (a = a.substring(c + 1, a.length))), [b, a];
                            }
                            function l(a) {
                                return function () {
                                    return (s && s.config && s.config[a]) || {};
                                };
                            }
                            var m,
                                n,
                                o,
                                p,
                                q = {},
                                r = {},
                                s = {},
                                t = {},
                                u = Object.prototype.hasOwnProperty,
                                v = [].slice,
                                w = /\.js$/;
                            (o = function (a, b) {
                                var c,
                                    d = k(a),
                                    e = d[0];
                                return (
                                    (a = d[1]),
                                    e && ((e = f(e, b)), (c = j(e))),
                                    e ? (a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b)) : ((a = f(a, b)), (d = k(a)), (e = d[0]), (a = d[1]), e && (c = j(e))),
                                    { f: e ? e + "!" + a : a, n: a, pr: e, p: c }
                                );
                            }),
                                (p = {
                                    require: function (a) {
                                        return g(a);
                                    },
                                    exports: function (a) {
                                        var b = q[a];
                                        return "undefined" != typeof b ? b : (q[a] = {});
                                    },
                                    module: function (a) {
                                        return { id: a, uri: "", exports: q[a], config: l(a) };
                                    },
                                }),
                                (m = function (a, c, d, f) {
                                    var h,
                                        k,
                                        l,
                                        m,
                                        n,
                                        s,
                                        u = [],
                                        v = typeof d;
                                    if (((f = f || a), "undefined" === v || "function" === v)) {
                                        for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1)
                                            if (((m = o(c[n], f)), (k = m.f), "require" === k)) u[n] = p.require(a);
                                            else if ("exports" === k) (u[n] = p.exports(a)), (s = !0);
                                            else if ("module" === k) h = u[n] = p.module(a);
                                            else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
                                            else {
                                                if (!m.p) throw new Error(a + " missing " + k);
                                                m.p.load(m.n, g(f, !0), i(k), {}), (u[n] = q[k]);
                                            }
                                        (l = d ? d.apply(q[a], u) : void 0), a && (h && h.exports !== b && h.exports !== q[a] ? (q[a] = h.exports) : (l === b && s) || (q[a] = l));
                                    } else a && (q[a] = d);
                                }),
                                (a = c = n = function (a, c, d, e, f) {
                                    if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f);
                                    if (!a.splice) {
                                        if (((s = a), s.deps && n(s.deps, s.callback), !c)) return;
                                        c.splice ? ((a = c), (c = d), (d = null)) : (a = b);
                                    }
                                    return (
                                        (c = c || function () {}),
                                        "function" == typeof d && ((d = e), (e = f)),
                                        e
                                            ? m(b, a, c, d)
                                            : setTimeout(function () {
                                                  m(b, a, c, d);
                                              }, 4),
                                        n
                                    );
                                }),
                                (n.config = function (a) {
                                    return n(a);
                                }),
                                (a._defined = q),
                                (d = function (a, b, c) {
                                    if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");
                                    b.splice || ((c = b), (b = [])), e(q, a) || e(r, a) || (r[a] = [a, b, c]);
                                }),
                                (d.amd = { jQuery: !0 });
                        })(),
                            (b.requirejs = a),
                            (b.require = c),
                            (b.define = d);
                    }
                })(),
                b.define("almond", function () {}),
                b.define("jquery", [], function () {
                    var b = a || $;
                    return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b;
                }),
                b.define("select2/utils", ["jquery"], function (a) {
                    function b(a) {
                        var b = a.prototype,
                            c = [];
                        for (var d in b) {
                            var e = b[d];
                            "function" == typeof e && "constructor" !== d && c.push(d);
                        }
                        return c;
                    }
                    var c = {};
                    (c.Extend = function (a, b) {
                        function c() {
                            this.constructor = a;
                        }
                        var d = {}.hasOwnProperty;
                        for (var e in b) d.call(b, e) && (a[e] = b[e]);
                        return (c.prototype = b.prototype), (a.prototype = new c()), (a.__super__ = b.prototype), a;
                    }),
                        (c.Decorate = function (a, c) {
                            function d() {
                                var b = Array.prototype.unshift,
                                    d = c.prototype.constructor.length,
                                    e = a.prototype.constructor;
                                d > 0 && (b.call(arguments, a.prototype.constructor), (e = c.prototype.constructor)), e.apply(this, arguments);
                            }
                            function e() {
                                this.constructor = d;
                            }
                            var f = b(c),
                                g = b(a);
                            (c.displayName = a.displayName), (d.prototype = new e());
                            for (var h = 0; h < g.length; h++) {
                                var i = g[h];
                                d.prototype[i] = a.prototype[i];
                            }
                            for (
                                var j = function (a) {
                                        var b = function () {};
                                        (a in d.prototype) && (b = d.prototype[a]);
                                        var e = c.prototype[a];
                                        return function () {
                                            var a = Array.prototype.unshift;
                                            return a.call(arguments, b), e.apply(this, arguments);
                                        };
                                    },
                                    k = 0;
                                k < f.length;
                                k++
                            ) {
                                var l = f[k];
                                d.prototype[l] = j(l);
                            }
                            return d;
                        });
                    var d = function () {
                        this.listeners = {};
                    };
                    return (
                        (d.prototype.on = function (a, b) {
                            (this.listeners = this.listeners || {}), a in this.listeners ? this.listeners[a].push(b) : (this.listeners[a] = [b]);
                        }),
                        (d.prototype.trigger = function (a) {
                            var b = Array.prototype.slice,
                                c = b.call(arguments, 1);
                            (this.listeners = this.listeners || {}),
                                null == c && (c = []),
                                0 === c.length && c.push({}),
                                (c[0]._type = a),
                                a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)),
                                "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
                        }),
                        (d.prototype.invoke = function (a, b) {
                            for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b);
                        }),
                        (c.Observable = d),
                        (c.generateChars = function (a) {
                            for (var b = "", c = 0; a > c; c++) {
                                var d = Math.floor(36 * Math.random());
                                b += d.toString(36);
                            }
                            return b;
                        }),
                        (c.bind = function (a, b) {
                            return function () {
                                a.apply(b, arguments);
                            };
                        }),
                        (c._convertData = function (a) {
                            for (var b in a) {
                                var c = b.split("-"),
                                    d = a;
                                if (1 !== c.length) {
                                    for (var e = 0; e < c.length; e++) {
                                        var f = c[e];
                                        (f = f.substring(0, 1).toLowerCase() + f.substring(1)), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), (d = d[f]);
                                    }
                                    delete a[b];
                                }
                            }
                            return a;
                        }),
                        (c.hasScroll = function (b, c) {
                            var d = a(c),
                                e = c.style.overflowX,
                                f = c.style.overflowY;
                            return e !== f || ("hidden" !== f && "visible" !== f) ? ("scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth) : !1;
                        }),
                        (c.escapeMarkup = function (a) {
                            var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                            return "string" != typeof a
                                ? a
                                : String(a).replace(/[&<>"'\/\\]/g, function (a) {
                                      return b[a];
                                  });
                        }),
                        (c.appendMany = function (b, c) {
                            if ("1.7" === a.fn.jquery.substr(0, 3)) {
                                var d = a();
                                a.map(c, function (a) {
                                    d = d.add(a);
                                }),
                                    (c = d);
                            }
                            b.append(c);
                        }),
                        c
                    );
                }),
                b.define("select2/results", ["jquery", "./utils"], function (a, b) {
                    function c(a, b, d) {
                        (this.$element = a), (this.data = d), (this.options = b), c.__super__.constructor.call(this);
                    }
                    return (
                        b.Extend(c, b.Observable),
                        (c.prototype.render = function () {
                            var b = a('<ul class="select2-results__options" role="tree"></ul>');
                            return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), (this.$results = b), b;
                        }),
                        (c.prototype.clear = function () {
                            this.$results.empty();
                        }),
                        (c.prototype.displayMessage = function (b) {
                            var c = this.options.get("escapeMarkup");
                            this.clear(), this.hideLoading();
                            var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                                e = this.options.get("translations").get(b.message);
                            d.append(c(e(b.args))), (d[0].className += " select2-results__message"), this.$results.append(d);
                        }),
                        (c.prototype.hideMessages = function () {
                            this.$results.find(".select2-results__message").remove();
                        }),
                        (c.prototype.append = function (a) {
                            this.hideLoading();
                            var b = [];
                            if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }));
                            a.results = this.sort(a.results);
                            for (var c = 0; c < a.results.length; c++) {
                                var d = a.results[c],
                                    e = this.option(d);
                                b.push(e);
                            }
                            this.$results.append(b);
                        }),
                        (c.prototype.position = function (a, b) {
                            var c = b.find(".select2-results");
                            c.append(a);
                        }),
                        (c.prototype.sort = function (a) {
                            var b = this.options.get("sorter");
                            return b(a);
                        }),
                        (c.prototype.highlightFirstItem = function () {
                            var a = this.$results.find(".select2-results__option[aria-selected]"),
                                b = a.filter("[aria-selected=true]");
                            b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible();
                        }),
                        (c.prototype.setClasses = function () {
                            var b = this;
                            this.data.current(function (c) {
                                var d = a.map(c, function (a) {
                                        return a.id.toString();
                                    }),
                                    e = b.$results.find(".select2-results__option[aria-selected]");
                                e.each(function () {
                                    var b = a(this),
                                        c = a.data(this, "data"),
                                        e = "" + c.id;
                                    (null != c.element && c.element.selected) || (null == c.element && a.inArray(e, d) > -1) ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false");
                                });
                            });
                        }),
                        (c.prototype.showLoading = function (a) {
                            this.hideLoading();
                            var b = this.options.get("translations").get("searching"),
                                c = { disabled: !0, loading: !0, text: b(a) },
                                d = this.option(c);
                            (d.className += " loading-results"), this.$results.prepend(d);
                        }),
                        (c.prototype.hideLoading = function () {
                            this.$results.find(".loading-results").remove();
                        }),
                        (c.prototype.option = function (b) {
                            var c = document.createElement("li");
                            c.className = "select2-results__option";
                            var d = { role: "treeitem", "aria-selected": "false" };
                            b.disabled && (delete d["aria-selected"], (d["aria-disabled"] = "true")),
                                null == b.id && delete d["aria-selected"],
                                null != b._resultId && (c.id = b._resultId),
                                b.title && (c.title = b.title),
                                b.children && ((d.role = "group"), (d["aria-label"] = b.text), delete d["aria-selected"]);
                            for (var e in d) {
                                var f = d[e];
                                c.setAttribute(e, f);
                            }
                            if (b.children) {
                                var g = a(c),
                                    h = document.createElement("strong");
                                h.className = "select2-results__group";
                                a(h);
                                this.template(b, h);
                                for (var i = [], j = 0; j < b.children.length; j++) {
                                    var k = b.children[j],
                                        l = this.option(k);
                                    i.push(l);
                                }
                                var m = a("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                                m.append(i), g.append(h), g.append(m);
                            } else this.template(b, c);
                            return a.data(c, "data", b), c;
                        }),
                        (c.prototype.bind = function (b, c) {
                            var d = this,
                                e = b.id + "-results";
                            this.$results.attr("id", e),
                                b.on("results:all", function (a) {
                                    d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                }),
                                b.on("results:append", function (a) {
                                    d.append(a.data), b.isOpen() && d.setClasses();
                                }),
                                b.on("query", function (a) {
                                    d.hideMessages(), d.showLoading(a);
                                }),
                                b.on("select", function () {
                                    b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                }),
                                b.on("unselect", function () {
                                    b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                }),
                                b.on("open", function () {
                                    d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible();
                                }),
                                b.on("close", function () {
                                    d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant");
                                }),
                                b.on("results:toggle", function () {
                                    var a = d.getHighlightedResults();
                                    0 !== a.length && a.trigger("mouseup");
                                }),
                                b.on("results:select", function () {
                                    var a = d.getHighlightedResults();
                                    if (0 !== a.length) {
                                        var b = a.data("data");
                                        "true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b });
                                    }
                                }),
                                b.on("results:previous", function () {
                                    var a = d.getHighlightedResults(),
                                        b = d.$results.find("[aria-selected]"),
                                        c = b.index(a);
                                    if (0 !== c) {
                                        var e = c - 1;
                                        0 === a.length && (e = 0);
                                        var f = b.eq(e);
                                        f.trigger("mouseenter");
                                        var g = d.$results.offset().top,
                                            h = f.offset().top,
                                            i = d.$results.scrollTop() + (h - g);
                                        0 === e ? d.$results.scrollTop(0) : 0 > h - g && d.$results.scrollTop(i);
                                    }
                                }),
                                b.on("results:next", function () {
                                    var a = d.getHighlightedResults(),
                                        b = d.$results.find("[aria-selected]"),
                                        c = b.index(a),
                                        e = c + 1;
                                    if (!(e >= b.length)) {
                                        var f = b.eq(e);
                                        f.trigger("mouseenter");
                                        var g = d.$results.offset().top + d.$results.outerHeight(!1),
                                            h = f.offset().top + f.outerHeight(!1),
                                            i = d.$results.scrollTop() + h - g;
                                        0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i);
                                    }
                                }),
                                b.on("results:focus", function (a) {
                                    a.element.addClass("select2-results__option--highlighted");
                                }),
                                b.on("results:message", function (a) {
                                    d.displayMessage(a);
                                }),
                                a.fn.mousewheel &&
                                    this.$results.on("mousewheel", function (a) {
                                        var b = d.$results.scrollTop(),
                                            c = d.$results.get(0).scrollHeight - b + a.deltaY,
                                            e = a.deltaY > 0 && b - a.deltaY <= 0,
                                            f = a.deltaY < 0 && c <= d.$results.height();
                                        e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation());
                                    }),
                                this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) {
                                    var c = a(this),
                                        e = c.data("data");
                                    return "true" === c.attr("aria-selected")
                                        ? void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {}))
                                        : void d.trigger("select", { originalEvent: b, data: e });
                                }),
                                this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) {
                                    var c = a(this).data("data");
                                    d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) });
                                });
                        }),
                        (c.prototype.getHighlightedResults = function () {
                            var a = this.$results.find(".select2-results__option--highlighted");
                            return a;
                        }),
                        (c.prototype.destroy = function () {
                            this.$results.remove();
                        }),
                        (c.prototype.ensureHighlightVisible = function () {
                            var a = this.getHighlightedResults();
                            if (0 !== a.length) {
                                var b = this.$results.find("[aria-selected]"),
                                    c = b.index(a),
                                    d = this.$results.offset().top,
                                    e = a.offset().top,
                                    f = this.$results.scrollTop() + (e - d),
                                    g = e - d;
                                (f -= 2 * a.outerHeight(!1)), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f);
                            }
                        }),
                        (c.prototype.template = function (b, c) {
                            var d = this.options.get("templateResult"),
                                e = this.options.get("escapeMarkup"),
                                f = d(b, c);
                            null == f ? (c.style.display = "none") : "string" == typeof f ? (c.innerHTML = e(f)) : a(c).append(f);
                        }),
                        c
                    );
                }),
                b.define("select2/keys", [], function () {
                    var a = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
                    return a;
                }),
                b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
                    function d(a, b) {
                        (this.$element = a), (this.options = b), d.__super__.constructor.call(this);
                    }
                    return (
                        b.Extend(d, b.Observable),
                        (d.prototype.render = function () {
                            var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                            return (
                                (this._tabindex = 0),
                                null != this.$element.data("old-tabindex") ? (this._tabindex = this.$element.data("old-tabindex")) : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")),
                                b.attr("title", this.$element.attr("title")),
                                b.attr("tabindex", this._tabindex),
                                (this.$selection = b),
                                b
                            );
                        }),
                        (d.prototype.bind = function (a, b) {
                            var d = this,
                                e = (a.id + "-container", a.id + "-results");
                            (this.container = a),
                                this.$selection.on("focus", function (a) {
                                    d.trigger("focus", a);
                                }),
                                this.$selection.on("blur", function (a) {
                                    d._handleBlur(a);
                                }),
                                this.$selection.on("keydown", function (a) {
                                    d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
                                }),
                                a.on("results:focus", function (a) {
                                    d.$selection.attr("aria-activedescendant", a.data._resultId);
                                }),
                                a.on("selection:update", function (a) {
                                    d.update(a.data);
                                }),
                                a.on("open", function () {
                                    d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a);
                                }),
                                a.on("close", function () {
                                    d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a);
                                }),
                                a.on("enable", function () {
                                    d.$selection.attr("tabindex", d._tabindex);
                                }),
                                a.on("disable", function () {
                                    d.$selection.attr("tabindex", "-1");
                                });
                        }),
                        (d.prototype._handleBlur = function (b) {
                            var c = this;
                            window.setTimeout(function () {
                                document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b);
                            }, 1);
                        }),
                        (d.prototype._attachCloseHandler = function (b) {
                            a(document.body).on("mousedown.select2." + b.id, function (b) {
                                var c = a(b.target),
                                    d = c.closest(".select2"),
                                    e = a(".select2.select2-container--open");
                                e.each(function () {
                                    var b = a(this);
                                    if (this != d[0]) {
                                        var c = b.data("element");
                                        c.select2("close");
                                    }
                                });
                            });
                        }),
                        (d.prototype._detachCloseHandler = function (b) {
                            a(document.body).off("mousedown.select2." + b.id);
                        }),
                        (d.prototype.position = function (a, b) {
                            var c = b.find(".selection");
                            c.append(a);
                        }),
                        (d.prototype.destroy = function () {
                            this._detachCloseHandler(this.container);
                        }),
                        (d.prototype.update = function (a) {
                            throw new Error("The `update` method must be defined in child classes.");
                        }),
                        d
                    );
                }),
                b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) {
                    function e() {
                        e.__super__.constructor.apply(this, arguments);
                    }
                    return (
                        c.Extend(e, b),
                        (e.prototype.render = function () {
                            var a = e.__super__.render.call(this);
                            return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
                        }),
                        (e.prototype.bind = function (a, b) {
                            var c = this;
                            e.__super__.bind.apply(this, arguments);
                            var d = a.id + "-container";
                            this.$selection.find(".select2-selection__rendered").attr("id", d),
                                this.$selection.attr("aria-labelledby", d),
                                this.$selection.on("mousedown", function (a) {
                                    1 === a.which && c.trigger("toggle", { originalEvent: a });
                                }),
                                this.$selection.on("focus", function (a) {}),
                                this.$selection.on("blur", function (a) {}),
                                a.on("focus", function (b) {
                                    a.isOpen() || c.$selection.focus();
                                }),
                                a.on("selection:update", function (a) {
                                    c.update(a.data);
                                });
                        }),
                        (e.prototype.clear = function () {
                            this.$selection.find(".select2-selection__rendered").empty();
                        }),
                        (e.prototype.display = function (a, b) {
                            var c = this.options.get("templateSelection"),
                                d = this.options.get("escapeMarkup");
                            return d(c(a, b));
                        }),
                        (e.prototype.selectionContainer = function () {
                            return a("<span></span>");
                        }),
                        (e.prototype.update = function (a) {
                            if (0 === a.length) return void this.clear();
                            var b = a[0],
                                c = this.$selection.find(".select2-selection__rendered"),
                                d = this.display(b, c);
                            c.empty().append(d), c.prop("title", b.title || b.text);
                        }),
                        e
                    );
                }),
                b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
                    function d(a, b) {
                        d.__super__.constructor.apply(this, arguments);
                    }
                    return (
                        c.Extend(d, b),
                        (d.prototype.render = function () {
                            var a = d.__super__.render.call(this);
                            return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
                        }),
                        (d.prototype.bind = function (b, c) {
                            var e = this;
                            d.__super__.bind.apply(this, arguments),
                                this.$selection.on("click", function (a) {
                                    e.trigger("toggle", { originalEvent: a });
                                }),
                                this.$selection.on("click", ".select2-selection__choice__remove", function (b) {
                                    if (!e.options.get("disabled")) {
                                        var c = a(this),
                                            d = c.parent(),
                                            f = d.data("data");
                                        e.trigger("unselect", { originalEvent: b, data: f });
                                    }
                                });
                        }),
                        (d.prototype.clear = function () {
                            this.$selection.find(".select2-selection__rendered").empty();
                        }),
                        (d.prototype.display = function (a, b) {
                            var c = this.options.get("templateSelection"),
                                d = this.options.get("escapeMarkup");
                            return d(c(a, b));
                        }),
                        (d.prototype.selectionContainer = function () {
                            var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                            return b;
                        }),
                        (d.prototype.update = function (a) {
                            if ((this.clear(), 0 !== a.length)) {
                                for (var b = [], d = 0; d < a.length; d++) {
                                    var e = a[d],
                                        f = this.selectionContainer(),
                                        g = this.display(e, f);
                                    f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f);
                                }
                                var h = this.$selection.find(".select2-selection__rendered");
                                c.appendMany(h, b);
                            }
                        }),
                        d
                    );
                }),
                b.define("select2/selection/placeholder", ["../utils"], function (a) {
                    function b(a, b, c) {
                        (this.placeholder = this.normalizePlaceholder(c.get("placeholder"))), a.call(this, b, c);
                    }
                    return (
                        (b.prototype.normalizePlaceholder = function (a, b) {
                            return "string" == typeof b && (b = { id: "", text: b }), b;
                        }),
                        (b.prototype.createPlaceholder = function (a, b) {
                            var c = this.selectionContainer();
                            return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
                        }),
                        (b.prototype.update = function (a, b) {
                            var c = 1 == b.length && b[0].id != this.placeholder.id,
                                d = b.length > 1;
                            if (d || c) return a.call(this, b);
                            this.clear();
                            var e = this.createPlaceholder(this.placeholder);
                            this.$selection.find(".select2-selection__rendered").append(e);
                        }),
                        b
                    );
                }),
                b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) {
                    function c() {}
                    return (
                        (c.prototype.bind = function (a, b, c) {
                            var d = this;
                            a.call(this, b, c),
                                null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                                this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
                                    d._handleClear(a);
                                }),
                                b.on("keypress", function (a) {
                                    d._handleKeyboardClear(a, b);
                                });
                        }),
                        (c.prototype._handleClear = function (a, b) {
                            if (!this.options.get("disabled")) {
                                var c = this.$selection.find(".select2-selection__clear");
                                if (0 !== c.length) {
                                    b.stopPropagation();
                                    for (var d = c.data("data"), e = 0; e < d.length; e++) {
                                        var f = { data: d[e] };
                                        if ((this.trigger("unselect", f), f.prevented)) return;
                                    }
                                    this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
                                }
                            }
                        }),
                        (c.prototype._handleKeyboardClear = function (a, c, d) {
                            d.isOpen() || ((c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c));
                        }),
                        (c.prototype.update = function (b, c) {
                            if ((b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length))) {
                                var d = a('<span class="select2-selection__clear">&times;</span>');
                                d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d);
                            }
                        }),
                        c
                    );
                }),
                b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
                    function d(a, b, c) {
                        a.call(this, b, c);
                    }
                    return (
                        (d.prototype.render = function (b) {
                            var c = a(
                                '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                            );
                            (this.$searchContainer = c), (this.$search = c.find("input"));
                            var d = b.call(this);
                            return this._transferTabIndex(), d;
                        }),
                        (d.prototype.bind = function (a, b, d) {
                            var e = this;
                            a.call(this, b, d),
                                b.on("open", function () {
                                    e.$search.trigger("focus");
                                }),
                                b.on("close", function () {
                                    e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus");
                                }),
                                b.on("enable", function () {
                                    e.$search.prop("disabled", !1), e._transferTabIndex();
                                }),
                                b.on("disable", function () {
                                    e.$search.prop("disabled", !0);
                                }),
                                b.on("focus", function (a) {
                                    e.$search.trigger("focus");
                                }),
                                b.on("results:focus", function (a) {
                                    e.$search.attr("aria-activedescendant", a.id);
                                }),
                                this.$selection.on("focusin", ".select2-search--inline", function (a) {
                                    e.trigger("focus", a);
                                }),
                                this.$selection.on("focusout", ".select2-search--inline", function (a) {
                                    e._handleBlur(a);
                                }),
                                this.$selection.on("keydown", ".select2-search--inline", function (a) {
                                    a.stopPropagation(), e.trigger("keypress", a), (e._keyUpPrevented = a.isDefaultPrevented());
                                    var b = a.which;
                                    if (b === c.BACKSPACE && "" === e.$search.val()) {
                                        var d = e.$searchContainer.prev(".select2-selection__choice");
                                        if (d.length > 0) {
                                            var f = d.data("data");
                                            e.searchRemoveChoice(f), a.preventDefault();
                                        }
                                    }
                                });
                            var f = document.documentMode,
                                g = f && 11 >= f;
                            this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) {
                                return g ? void e.$selection.off("input.search input.searchcheck") : void e.$selection.off("keyup.search");
                            }),
                                this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) {
                                    if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck");
                                    var b = a.which;
                                    b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && e.handleSearch(a);
                                });
                        }),
                        (d.prototype._transferTabIndex = function (a) {
                            this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
                        }),
                        (d.prototype.createPlaceholder = function (a, b) {
                            this.$search.attr("placeholder", b.text);
                        }),
                        (d.prototype.update = function (a, b) {
                            var c = this.$search[0] == document.activeElement;
                            this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus();
                        }),
                        (d.prototype.handleSearch = function () {
                            if ((this.resizeSearch(), !this._keyUpPrevented)) {
                                var a = this.$search.val();
                                this.trigger("query", { term: a });
                            }
                            this._keyUpPrevented = !1;
                        }),
                        (d.prototype.searchRemoveChoice = function (a, b) {
                            this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch();
                        }),
                        (d.prototype.resizeSearch = function () {
                            this.$search.css("width", "25px");
                            var a = "";
                            if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();
                            else {
                                var b = this.$search.val().length + 1;
                                a = 0.75 * b + "em";
                            }
                            this.$search.css("width", a);
                        }),
                        d
                    );
                }),
                b.define("select2/selection/eventRelay", ["jquery"], function (a) {
                    function b() {}
                    return (
                        (b.prototype.bind = function (b, c, d) {
                            var e = this,
                                f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                                g = ["opening", "closing", "selecting", "unselecting"];
                            b.call(this, c, d),
                                c.on("*", function (b, c) {
                                    if (-1 !== a.inArray(b, f)) {
                                        c = c || {};
                                        var d = a.Event("select2:" + b, { params: c });
                                        e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
                                    }
                                });
                        }),
                        b
                    );
                }),
                b.define("select2/translation", ["jquery", "require"], function (a, b) {
                    function c(a) {
                        this.dict = a || {};
                    }
                    return (
                        (c.prototype.all = function () {
                            return this.dict;
                        }),
                        (c.prototype.get = function (a) {
                            return this.dict[a];
                        }),
                        (c.prototype.extend = function (b) {
                            this.dict = a.extend({}, b.all(), this.dict);
                        }),
                        (c._cache = {}),
                        (c.loadPath = function (a) {
                            if (!(a in c._cache)) {
                                var d = b(a);
                                c._cache[a] = d;
                            }
                            return new c(c._cache[a]);
                        }),
                        c
                    );
                }),
                b.define("select2/diacritics", [], function () {
                    var a = {
                        "Ⓐ": "A",
                        Ａ: "A",
                        À: "A",
                        Á: "A",
                        Â: "A",
                        Ầ: "A",
                        Ấ: "A",
                        Ẫ: "A",
                        Ẩ: "A",
                        Ã: "A",
                        Ā: "A",
                        Ă: "A",
                        Ằ: "A",
                        Ắ: "A",
                        Ẵ: "A",
                        Ẳ: "A",
                        Ȧ: "A",
                        Ǡ: "A",
                        Ä: "A",
                        Ǟ: "A",
                        Ả: "A",
                        Å: "A",
                        Ǻ: "A",
                        Ǎ: "A",
                        Ȁ: "A",
                        Ȃ: "A",
                        Ạ: "A",
                        Ậ: "A",
                        Ặ: "A",
                        Ḁ: "A",
                        Ą: "A",
                        Ⱥ: "A",
                        Ɐ: "A",
                        Ꜳ: "AA",
                        Æ: "AE",
                        Ǽ: "AE",
                        Ǣ: "AE",
                        Ꜵ: "AO",
                        Ꜷ: "AU",
                        Ꜹ: "AV",
                        Ꜻ: "AV",
                        Ꜽ: "AY",
                        "Ⓑ": "B",
                        Ｂ: "B",
                        Ḃ: "B",
                        Ḅ: "B",
                        Ḇ: "B",
                        Ƀ: "B",
                        Ƃ: "B",
                        Ɓ: "B",
                        "Ⓒ": "C",
                        Ｃ: "C",
                        Ć: "C",
                        Ĉ: "C",
                        Ċ: "C",
                        Č: "C",
                        Ç: "C",
                        Ḉ: "C",
                        Ƈ: "C",
                        Ȼ: "C",
                        Ꜿ: "C",
                        "Ⓓ": "D",
                        Ｄ: "D",
                        Ḋ: "D",
                        Ď: "D",
                        Ḍ: "D",
                        Ḑ: "D",
                        Ḓ: "D",
                        Ḏ: "D",
                        Đ: "D",
                        Ƌ: "D",
                        Ɗ: "D",
                        Ɖ: "D",
                        Ꝺ: "D",
                        Ǳ: "DZ",
                        Ǆ: "DZ",
                        ǲ: "Dz",
                        ǅ: "Dz",
                        "Ⓔ": "E",
                        Ｅ: "E",
                        È: "E",
                        É: "E",
                        Ê: "E",
                        Ề: "E",
                        Ế: "E",
                        Ễ: "E",
                        Ể: "E",
                        Ẽ: "E",
                        Ē: "E",
                        Ḕ: "E",
                        Ḗ: "E",
                        Ĕ: "E",
                        Ė: "E",
                        Ë: "E",
                        Ẻ: "E",
                        Ě: "E",
                        Ȅ: "E",
                        Ȇ: "E",
                        Ẹ: "E",
                        Ệ: "E",
                        Ȩ: "E",
                        Ḝ: "E",
                        Ę: "E",
                        Ḙ: "E",
                        Ḛ: "E",
                        Ɛ: "E",
                        Ǝ: "E",
                        "Ⓕ": "F",
                        Ｆ: "F",
                        Ḟ: "F",
                        Ƒ: "F",
                        Ꝼ: "F",
                        "Ⓖ": "G",
                        Ｇ: "G",
                        Ǵ: "G",
                        Ĝ: "G",
                        Ḡ: "G",
                        Ğ: "G",
                        Ġ: "G",
                        Ǧ: "G",
                        Ģ: "G",
                        Ǥ: "G",
                        Ɠ: "G",
                        Ꞡ: "G",
                        Ᵹ: "G",
                        Ꝿ: "G",
                        "Ⓗ": "H",
                        Ｈ: "H",
                        Ĥ: "H",
                        Ḣ: "H",
                        Ḧ: "H",
                        Ȟ: "H",
                        Ḥ: "H",
                        Ḩ: "H",
                        Ḫ: "H",
                        Ħ: "H",
                        Ⱨ: "H",
                        Ⱶ: "H",
                        Ɥ: "H",
                        "Ⓘ": "I",
                        Ｉ: "I",
                        Ì: "I",
                        Í: "I",
                        Î: "I",
                        Ĩ: "I",
                        Ī: "I",
                        Ĭ: "I",
                        İ: "I",
                        Ï: "I",
                        Ḯ: "I",
                        Ỉ: "I",
                        Ǐ: "I",
                        Ȉ: "I",
                        Ȋ: "I",
                        Ị: "I",
                        Į: "I",
                        Ḭ: "I",
                        Ɨ: "I",
                        "Ⓙ": "J",
                        Ｊ: "J",
                        Ĵ: "J",
                        Ɉ: "J",
                        "Ⓚ": "K",
                        Ｋ: "K",
                        Ḱ: "K",
                        Ǩ: "K",
                        Ḳ: "K",
                        Ķ: "K",
                        Ḵ: "K",
                        Ƙ: "K",
                        Ⱪ: "K",
                        Ꝁ: "K",
                        Ꝃ: "K",
                        Ꝅ: "K",
                        Ꞣ: "K",
                        "Ⓛ": "L",
                        Ｌ: "L",
                        Ŀ: "L",
                        Ĺ: "L",
                        Ľ: "L",
                        Ḷ: "L",
                        Ḹ: "L",
                        Ļ: "L",
                        Ḽ: "L",
                        Ḻ: "L",
                        Ł: "L",
                        Ƚ: "L",
                        Ɫ: "L",
                        Ⱡ: "L",
                        Ꝉ: "L",
                        Ꝇ: "L",
                        Ꞁ: "L",
                        Ǉ: "LJ",
                        ǈ: "Lj",
                        "Ⓜ": "M",
                        Ｍ: "M",
                        Ḿ: "M",
                        Ṁ: "M",
                        Ṃ: "M",
                        Ɱ: "M",
                        Ɯ: "M",
                        "Ⓝ": "N",
                        Ｎ: "N",
                        Ǹ: "N",
                        Ń: "N",
                        Ñ: "N",
                        Ṅ: "N",
                        Ň: "N",
                        Ṇ: "N",
                        Ņ: "N",
                        Ṋ: "N",
                        Ṉ: "N",
                        Ƞ: "N",
                        Ɲ: "N",
                        Ꞑ: "N",
                        Ꞥ: "N",
                        Ǌ: "NJ",
                        ǋ: "Nj",
                        "Ⓞ": "O",
                        Ｏ: "O",
                        Ò: "O",
                        Ó: "O",
                        Ô: "O",
                        Ồ: "O",
                        Ố: "O",
                        Ỗ: "O",
                        Ổ: "O",
                        Õ: "O",
                        Ṍ: "O",
                        Ȭ: "O",
                        Ṏ: "O",
                        Ō: "O",
                        Ṑ: "O",
                        Ṓ: "O",
                        Ŏ: "O",
                        Ȯ: "O",
                        Ȱ: "O",
                        Ö: "O",
                        Ȫ: "O",
                        Ỏ: "O",
                        Ő: "O",
                        Ǒ: "O",
                        Ȍ: "O",
                        Ȏ: "O",
                        Ơ: "O",
                        Ờ: "O",
                        Ớ: "O",
                        Ỡ: "O",
                        Ở: "O",
                        Ợ: "O",
                        Ọ: "O",
                        Ộ: "O",
                        Ǫ: "O",
                        Ǭ: "O",
                        Ø: "O",
                        Ǿ: "O",
                        Ɔ: "O",
                        Ɵ: "O",
                        Ꝋ: "O",
                        Ꝍ: "O",
                        Ƣ: "OI",
                        Ꝏ: "OO",
                        Ȣ: "OU",
                        "Ⓟ": "P",
                        Ｐ: "P",
                        Ṕ: "P",
                        Ṗ: "P",
                        Ƥ: "P",
                        Ᵽ: "P",
                        Ꝑ: "P",
                        Ꝓ: "P",
                        Ꝕ: "P",
                        "Ⓠ": "Q",
                        Ｑ: "Q",
                        Ꝗ: "Q",
                        Ꝙ: "Q",
                        Ɋ: "Q",
                        "Ⓡ": "R",
                        Ｒ: "R",
                        Ŕ: "R",
                        Ṙ: "R",
                        Ř: "R",
                        Ȑ: "R",
                        Ȓ: "R",
                        Ṛ: "R",
                        Ṝ: "R",
                        Ŗ: "R",
                        Ṟ: "R",
                        Ɍ: "R",
                        Ɽ: "R",
                        Ꝛ: "R",
                        Ꞧ: "R",
                        Ꞃ: "R",
                        "Ⓢ": "S",
                        Ｓ: "S",
                        ẞ: "S",
                        Ś: "S",
                        Ṥ: "S",
                        Ŝ: "S",
                        Ṡ: "S",
                        Š: "S",
                        Ṧ: "S",
                        Ṣ: "S",
                        Ṩ: "S",
                        Ș: "S",
                        Ş: "S",
                        Ȿ: "S",
                        Ꞩ: "S",
                        Ꞅ: "S",
                        "Ⓣ": "T",
                        Ｔ: "T",
                        Ṫ: "T",
                        Ť: "T",
                        Ṭ: "T",
                        Ț: "T",
                        Ţ: "T",
                        Ṱ: "T",
                        Ṯ: "T",
                        Ŧ: "T",
                        Ƭ: "T",
                        Ʈ: "T",
                        Ⱦ: "T",
                        Ꞇ: "T",
                        Ꜩ: "TZ",
                        "Ⓤ": "U",
                        Ｕ: "U",
                        Ù: "U",
                        Ú: "U",
                        Û: "U",
                        Ũ: "U",
                        Ṹ: "U",
                        Ū: "U",
                        Ṻ: "U",
                        Ŭ: "U",
                        Ü: "U",
                        Ǜ: "U",
                        Ǘ: "U",
                        Ǖ: "U",
                        Ǚ: "U",
                        Ủ: "U",
                        Ů: "U",
                        Ű: "U",
                        Ǔ: "U",
                        Ȕ: "U",
                        Ȗ: "U",
                        Ư: "U",
                        Ừ: "U",
                        Ứ: "U",
                        Ữ: "U",
                        Ử: "U",
                        Ự: "U",
                        Ụ: "U",
                        Ṳ: "U",
                        Ų: "U",
                        Ṷ: "U",
                        Ṵ: "U",
                        Ʉ: "U",
                        "Ⓥ": "V",
                        Ｖ: "V",
                        Ṽ: "V",
                        Ṿ: "V",
                        Ʋ: "V",
                        Ꝟ: "V",
                        Ʌ: "V",
                        Ꝡ: "VY",
                        "Ⓦ": "W",
                        Ｗ: "W",
                        Ẁ: "W",
                        Ẃ: "W",
                        Ŵ: "W",
                        Ẇ: "W",
                        Ẅ: "W",
                        Ẉ: "W",
                        Ⱳ: "W",
                        "Ⓧ": "X",
                        Ｘ: "X",
                        Ẋ: "X",
                        Ẍ: "X",
                        "Ⓨ": "Y",
                        Ｙ: "Y",
                        Ỳ: "Y",
                        Ý: "Y",
                        Ŷ: "Y",
                        Ỹ: "Y",
                        Ȳ: "Y",
                        Ẏ: "Y",
                        Ÿ: "Y",
                        Ỷ: "Y",
                        Ỵ: "Y",
                        Ƴ: "Y",
                        Ɏ: "Y",
                        Ỿ: "Y",
                        "Ⓩ": "Z",
                        Ｚ: "Z",
                        Ź: "Z",
                        Ẑ: "Z",
                        Ż: "Z",
                        Ž: "Z",
                        Ẓ: "Z",
                        Ẕ: "Z",
                        Ƶ: "Z",
                        Ȥ: "Z",
                        Ɀ: "Z",
                        Ⱬ: "Z",
                        Ꝣ: "Z",
                        "ⓐ": "a",
                        ａ: "a",
                        ẚ: "a",
                        à: "a",
                        á: "a",
                        â: "a",
                        ầ: "a",
                        ấ: "a",
                        ẫ: "a",
                        ẩ: "a",
                        ã: "a",
                        ā: "a",
                        ă: "a",
                        ằ: "a",
                        ắ: "a",
                        ẵ: "a",
                        ẳ: "a",
                        ȧ: "a",
                        ǡ: "a",
                        ä: "a",
                        ǟ: "a",
                        ả: "a",
                        å: "a",
                        ǻ: "a",
                        ǎ: "a",
                        ȁ: "a",
                        ȃ: "a",
                        ạ: "a",
                        ậ: "a",
                        ặ: "a",
                        ḁ: "a",
                        ą: "a",
                        ⱥ: "a",
                        ɐ: "a",
                        ꜳ: "aa",
                        æ: "ae",
                        ǽ: "ae",
                        ǣ: "ae",
                        ꜵ: "ao",
                        ꜷ: "au",
                        ꜹ: "av",
                        ꜻ: "av",
                        ꜽ: "ay",
                        "ⓑ": "b",
                        ｂ: "b",
                        ḃ: "b",
                        ḅ: "b",
                        ḇ: "b",
                        ƀ: "b",
                        ƃ: "b",
                        ɓ: "b",
                        "ⓒ": "c",
                        ｃ: "c",
                        ć: "c",
                        ĉ: "c",
                        ċ: "c",
                        č: "c",
                        ç: "c",
                        ḉ: "c",
                        ƈ: "c",
                        ȼ: "c",
                        ꜿ: "c",
                        ↄ: "c",
                        "ⓓ": "d",
                        ｄ: "d",
                        ḋ: "d",
                        ď: "d",
                        ḍ: "d",
                        ḑ: "d",
                        ḓ: "d",
                        ḏ: "d",
                        đ: "d",
                        ƌ: "d",
                        ɖ: "d",
                        ɗ: "d",
                        ꝺ: "d",
                        ǳ: "dz",
                        ǆ: "dz",
                        "ⓔ": "e",
                        ｅ: "e",
                        è: "e",
                        é: "e",
                        ê: "e",
                        ề: "e",
                        ế: "e",
                        ễ: "e",
                        ể: "e",
                        ẽ: "e",
                        ē: "e",
                        ḕ: "e",
                        ḗ: "e",
                        ĕ: "e",
                        ė: "e",
                        ë: "e",
                        ẻ: "e",
                        ě: "e",
                        ȅ: "e",
                        ȇ: "e",
                        ẹ: "e",
                        ệ: "e",
                        ȩ: "e",
                        ḝ: "e",
                        ę: "e",
                        ḙ: "e",
                        ḛ: "e",
                        ɇ: "e",
                        ɛ: "e",
                        ǝ: "e",
                        "ⓕ": "f",
                        ｆ: "f",
                        ḟ: "f",
                        ƒ: "f",
                        ꝼ: "f",
                        "ⓖ": "g",
                        ｇ: "g",
                        ǵ: "g",
                        ĝ: "g",
                        ḡ: "g",
                        ğ: "g",
                        ġ: "g",
                        ǧ: "g",
                        ģ: "g",
                        ǥ: "g",
                        ɠ: "g",
                        ꞡ: "g",
                        ᵹ: "g",
                        ꝿ: "g",
                        "ⓗ": "h",
                        ｈ: "h",
                        ĥ: "h",
                        ḣ: "h",
                        ḧ: "h",
                        ȟ: "h",
                        ḥ: "h",
                        ḩ: "h",
                        ḫ: "h",
                        ẖ: "h",
                        ħ: "h",
                        ⱨ: "h",
                        ⱶ: "h",
                        ɥ: "h",
                        ƕ: "hv",
                        "ⓘ": "i",
                        ｉ: "i",
                        ì: "i",
                        í: "i",
                        î: "i",
                        ĩ: "i",
                        ī: "i",
                        ĭ: "i",
                        ï: "i",
                        ḯ: "i",
                        ỉ: "i",
                        ǐ: "i",
                        ȉ: "i",
                        ȋ: "i",
                        ị: "i",
                        į: "i",
                        ḭ: "i",
                        ɨ: "i",
                        ı: "i",
                        "ⓙ": "j",
                        ｊ: "j",
                        ĵ: "j",
                        ǰ: "j",
                        ɉ: "j",
                        "ⓚ": "k",
                        ｋ: "k",
                        ḱ: "k",
                        ǩ: "k",
                        ḳ: "k",
                        ķ: "k",
                        ḵ: "k",
                        ƙ: "k",
                        ⱪ: "k",
                        ꝁ: "k",
                        ꝃ: "k",
                        ꝅ: "k",
                        ꞣ: "k",
                        "ⓛ": "l",
                        ｌ: "l",
                        ŀ: "l",
                        ĺ: "l",
                        ľ: "l",
                        ḷ: "l",
                        ḹ: "l",
                        ļ: "l",
                        ḽ: "l",
                        ḻ: "l",
                        ſ: "l",
                        ł: "l",
                        ƚ: "l",
                        ɫ: "l",
                        ⱡ: "l",
                        ꝉ: "l",
                        ꞁ: "l",
                        ꝇ: "l",
                        ǉ: "lj",
                        "ⓜ": "m",
                        ｍ: "m",
                        ḿ: "m",
                        ṁ: "m",
                        ṃ: "m",
                        ɱ: "m",
                        ɯ: "m",
                        "ⓝ": "n",
                        ｎ: "n",
                        ǹ: "n",
                        ń: "n",
                        ñ: "n",
                        ṅ: "n",
                        ň: "n",
                        ṇ: "n",
                        ņ: "n",
                        ṋ: "n",
                        ṉ: "n",
                        ƞ: "n",
                        ɲ: "n",
                        ŉ: "n",
                        ꞑ: "n",
                        ꞥ: "n",
                        ǌ: "nj",
                        "ⓞ": "o",
                        ｏ: "o",
                        ò: "o",
                        ó: "o",
                        ô: "o",
                        ồ: "o",
                        ố: "o",
                        ỗ: "o",
                        ổ: "o",
                        õ: "o",
                        ṍ: "o",
                        ȭ: "o",
                        ṏ: "o",
                        ō: "o",
                        ṑ: "o",
                        ṓ: "o",
                        ŏ: "o",
                        ȯ: "o",
                        ȱ: "o",
                        ö: "o",
                        ȫ: "o",
                        ỏ: "o",
                        ő: "o",
                        ǒ: "o",
                        ȍ: "o",
                        ȏ: "o",
                        ơ: "o",
                        ờ: "o",
                        ớ: "o",
                        ỡ: "o",
                        ở: "o",
                        ợ: "o",
                        ọ: "o",
                        ộ: "o",
                        ǫ: "o",
                        ǭ: "o",
                        ø: "o",
                        ǿ: "o",
                        ɔ: "o",
                        ꝋ: "o",
                        ꝍ: "o",
                        ɵ: "o",
                        ƣ: "oi",
                        ȣ: "ou",
                        ꝏ: "oo",
                        "ⓟ": "p",
                        ｐ: "p",
                        ṕ: "p",
                        ṗ: "p",
                        ƥ: "p",
                        ᵽ: "p",
                        ꝑ: "p",
                        ꝓ: "p",
                        ꝕ: "p",
                        "ⓠ": "q",
                        ｑ: "q",
                        ɋ: "q",
                        ꝗ: "q",
                        ꝙ: "q",
                        "ⓡ": "r",
                        ｒ: "r",
                        ŕ: "r",
                        ṙ: "r",
                        ř: "r",
                        ȑ: "r",
                        ȓ: "r",
                        ṛ: "r",
                        ṝ: "r",
                        ŗ: "r",
                        ṟ: "r",
                        ɍ: "r",
                        ɽ: "r",
                        ꝛ: "r",
                        ꞧ: "r",
                        ꞃ: "r",
                        "ⓢ": "s",
                        ｓ: "s",
                        ß: "s",
                        ś: "s",
                        ṥ: "s",
                        ŝ: "s",
                        ṡ: "s",
                        š: "s",
                        ṧ: "s",
                        ṣ: "s",
                        ṩ: "s",
                        ș: "s",
                        ş: "s",
                        ȿ: "s",
                        ꞩ: "s",
                        ꞅ: "s",
                        ẛ: "s",
                        "ⓣ": "t",
                        ｔ: "t",
                        ṫ: "t",
                        ẗ: "t",
                        ť: "t",
                        ṭ: "t",
                        ț: "t",
                        ţ: "t",
                        ṱ: "t",
                        ṯ: "t",
                        ŧ: "t",
                        ƭ: "t",
                        ʈ: "t",
                        ⱦ: "t",
                        ꞇ: "t",
                        ꜩ: "tz",
                        "ⓤ": "u",
                        ｕ: "u",
                        ù: "u",
                        ú: "u",
                        û: "u",
                        ũ: "u",
                        ṹ: "u",
                        ū: "u",
                        ṻ: "u",
                        ŭ: "u",
                        ü: "u",
                        ǜ: "u",
                        ǘ: "u",
                        ǖ: "u",
                        ǚ: "u",
                        ủ: "u",
                        ů: "u",
                        ű: "u",
                        ǔ: "u",
                        ȕ: "u",
                        ȗ: "u",
                        ư: "u",
                        ừ: "u",
                        ứ: "u",
                        ữ: "u",
                        ử: "u",
                        ự: "u",
                        ụ: "u",
                        ṳ: "u",
                        ų: "u",
                        ṷ: "u",
                        ṵ: "u",
                        ʉ: "u",
                        "ⓥ": "v",
                        ｖ: "v",
                        ṽ: "v",
                        ṿ: "v",
                        ʋ: "v",
                        ꝟ: "v",
                        ʌ: "v",
                        ꝡ: "vy",
                        "ⓦ": "w",
                        ｗ: "w",
                        ẁ: "w",
                        ẃ: "w",
                        ŵ: "w",
                        ẇ: "w",
                        ẅ: "w",
                        ẘ: "w",
                        ẉ: "w",
                        ⱳ: "w",
                        "ⓧ": "x",
                        ｘ: "x",
                        ẋ: "x",
                        ẍ: "x",
                        "ⓨ": "y",
                        ｙ: "y",
                        ỳ: "y",
                        ý: "y",
                        ŷ: "y",
                        ỹ: "y",
                        ȳ: "y",
                        ẏ: "y",
                        ÿ: "y",
                        ỷ: "y",
                        ẙ: "y",
                        ỵ: "y",
                        ƴ: "y",
                        ɏ: "y",
                        ỿ: "y",
                        "ⓩ": "z",
                        ｚ: "z",
                        ź: "z",
                        ẑ: "z",
                        ż: "z",
                        ž: "z",
                        ẓ: "z",
                        ẕ: "z",
                        ƶ: "z",
                        ȥ: "z",
                        ɀ: "z",
                        ⱬ: "z",
                        ꝣ: "z",
                        Ά: "Α",
                        Έ: "Ε",
                        Ή: "Η",
                        Ί: "Ι",
                        Ϊ: "Ι",
                        Ό: "Ο",
                        Ύ: "Υ",
                        Ϋ: "Υ",
                        Ώ: "Ω",
                        ά: "α",
                        έ: "ε",
                        ή: "η",
                        ί: "ι",
                        ϊ: "ι",
                        ΐ: "ι",
                        ό: "ο",
                        ύ: "υ",
                        ϋ: "υ",
                        ΰ: "υ",
                        ω: "ω",
                        ς: "σ",
                    };
                    return a;
                }),
                b.define("select2/data/base", ["../utils"], function (a) {
                    function b(a, c) {
                        b.__super__.constructor.call(this);
                    }
                    return (
                        a.Extend(b, a.Observable),
                        (b.prototype.current = function (a) {
                            throw new Error("The `current` method must be defined in child classes.");
                        }),
                        (b.prototype.query = function (a, b) {
                            throw new Error("The `query` method must be defined in child classes.");
                        }),
                        (b.prototype.bind = function (a, b) {}),
                        (b.prototype.destroy = function () {}),
                        (b.prototype.generateResultId = function (b, c) {
                            var d = b.id + "-result-";
                            return (d += a.generateChars(4)), (d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4));
                        }),
                        b
                    );
                }),
                b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
                    function d(a, b) {
                        (this.$element = a), (this.options = b), d.__super__.constructor.call(this);
                    }
                    return (
                        b.Extend(d, a),
                        (d.prototype.current = function (a) {
                            var b = [],
                                d = this;
                            this.$element.find(":selected").each(function () {
                                var a = c(this),
                                    e = d.item(a);
                                b.push(e);
                            }),
                                a(b);
                        }),
                        (d.prototype.select = function (a) {
                            var b = this;
                            if (((a.selected = !0), c(a.element).is("option"))) return (a.element.selected = !0), void this.$element.trigger("change");
                            if (this.$element.prop("multiple"))
                                this.current(function (d) {
                                    var e = [];
                                    (a = [a]), a.push.apply(a, d);
                                    for (var f = 0; f < a.length; f++) {
                                        var g = a[f].id;
                                        -1 === c.inArray(g, e) && e.push(g);
                                    }
                                    b.$element.val(e), b.$element.trigger("change");
                                });
                            else {
                                var d = a.id;
                                this.$element.val(d), this.$element.trigger("change");
                            }
                        }),
                        (d.prototype.unselect = function (a) {
                            var b = this;
                            if (this.$element.prop("multiple"))
                                return (
                                    (a.selected = !1),
                                    c(a.element).is("option")
                                        ? ((a.element.selected = !1), void this.$element.trigger("change"))
                                        : void this.current(function (d) {
                                              for (var e = [], f = 0; f < d.length; f++) {
                                                  var g = d[f].id;
                                                  g !== a.id && -1 === c.inArray(g, e) && e.push(g);
                                              }
                                              b.$element.val(e), b.$element.trigger("change");
                                          })
                                );
                        }),
                        (d.prototype.bind = function (a, b) {
                            var c = this;
                            (this.container = a),
                                a.on("select", function (a) {
                                    c.select(a.data);
                                }),
                                a.on("unselect", function (a) {
                                    c.unselect(a.data);
                                });
                        }),
                        (d.prototype.destroy = function () {
                            this.$element.find("*").each(function () {
                                c.removeData(this, "data");
                            });
                        }),
                        (d.prototype.query = function (a, b) {
                            var d = [],
                                e = this,
                                f = this.$element.children();
                            f.each(function () {
                                var b = c(this);
                                if (b.is("option") || b.is("optgroup")) {
                                    var f = e.item(b),
                                        g = e.matches(a, f);
                                    null !== g && d.push(g);
                                }
                            }),
                                b({ results: d });
                        }),
                        (d.prototype.addOptions = function (a) {
                            b.appendMany(this.$element, a);
                        }),
                        (d.prototype.option = function (a) {
                            var b;
                            a.children ? ((b = document.createElement("optgroup")), (b.label = a.text)) : ((b = document.createElement("option")), void 0 !== b.textContent ? (b.textContent = a.text) : (b.innerText = a.text)),
                                a.id && (b.value = a.id),
                                a.disabled && (b.disabled = !0),
                                a.selected && (b.selected = !0),
                                a.title && (b.title = a.title);
                            var d = c(b),
                                e = this._normalizeItem(a);
                            return (e.element = b), c.data(b, "data", e), d;
                        }),
                        (d.prototype.item = function (a) {
                            var b = {};
                            if (((b = c.data(a[0], "data")), null != b)) return b;
                            if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") };
                            else if (a.is("optgroup")) {
                                b = { text: a.prop("label"), children: [], title: a.prop("title") };
                                for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
                                    var g = c(d[f]),
                                        h = this.item(g);
                                    e.push(h);
                                }
                                b.children = e;
                            }
                            return (b = this._normalizeItem(b)), (b.element = a[0]), c.data(a[0], "data", b), b;
                        }),
                        (d.prototype._normalizeItem = function (a) {
                            c.isPlainObject(a) || (a = { id: a, text: a }), (a = c.extend({}, { text: "" }, a));
                            var b = { selected: !1, disabled: !1 };
                            return (
                                null != a.id && (a.id = a.id.toString()),
                                null != a.text && (a.text = a.text.toString()),
                                null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)),
                                c.extend({}, b, a)
                            );
                        }),
                        (d.prototype.matches = function (a, b) {
                            var c = this.options.get("matcher");
                            return c(a, b);
                        }),
                        d
                    );
                }),
                b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
                    function d(a, b) {
                        var c = b.get("data") || [];
                        d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
                    }
                    return (
                        b.Extend(d, a),
                        (d.prototype.select = function (a) {
                            var b = this.$element.find("option").filter(function (b, c) {
                                return c.value == a.id.toString();
                            });
                            0 === b.length && ((b = this.option(a)), this.addOptions(b)), d.__super__.select.call(this, a);
                        }),
                        (d.prototype.convertToOptions = function (a) {
                            function d(a) {
                                return function () {
                                    return c(this).val() == a.id;
                                };
                            }
                            for (
                                var e = this,
                                    f = this.$element.find("option"),
                                    g = f
                                        .map(function () {
                                            return e.item(c(this)).id;
                                        })
                                        .get(),
                                    h = [],
                                    i = 0;
                                i < a.length;
                                i++
                            ) {
                                var j = this._normalizeItem(a[i]);
                                if (c.inArray(j.id, g) >= 0) {
                                    var k = f.filter(d(j)),
                                        l = this.item(k),
                                        m = c.extend(!0, {}, j, l),
                                        n = this.option(m);
                                    k.replaceWith(n);
                                } else {
                                    var o = this.option(j);
                                    if (j.children) {
                                        var p = this.convertToOptions(j.children);
                                        b.appendMany(o, p);
                                    }
                                    h.push(o);
                                }
                            }
                            return h;
                        }),
                        d
                    );
                }),
                b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
                    function d(a, b) {
                        (this.ajaxOptions = this._applyDefaults(b.get("ajax"))), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b);
                    }
                    return (
                        b.Extend(d, a),
                        (d.prototype._applyDefaults = function (a) {
                            var b = {
                                data: function (a) {
                                    return c.extend({}, a, { q: a.term });
                                },
                                transport: function (a, b, d) {
                                    var e = c.ajax(a);
                                    return e.then(b), e.fail(d), e;
                                },
                            };
                            return c.extend({}, b, a, !0);
                        }),
                        (d.prototype.processResults = function (a) {
                            return a;
                        }),
                        (d.prototype.query = function (a, b) {
                            function d() {
                                var d = f.transport(
                                    f,
                                    function (d) {
                                        var f = e.processResults(d, a);
                                        e.options.get("debug") &&
                                            window.console &&
                                            console.error &&
                                            ((f && f.results && c.isArray(f.results)) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),
                                            b(f);
                                    },
                                    function () {
                                        (d.status && "0" === d.status) || e.trigger("results:message", { message: "errorLoading" });
                                    }
                                );
                                e._request = d;
                            }
                            var e = this;
                            null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), (this._request = null));
                            var f = c.extend({ type: "GET" }, this.ajaxOptions);
                            "function" == typeof f.url && (f.url = f.url.call(this.$element, a)),
                                "function" == typeof f.data && (f.data = f.data.call(this.$element, a)),
                                this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), (this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay))) : d();
                        }),
                        d
                    );
                }),
                b.define("select2/data/tags", ["jquery"], function (a) {
                    function b(b, c, d) {
                        var e = d.get("tags"),
                            f = d.get("createTag");
                        void 0 !== f && (this.createTag = f);
                        var g = d.get("insertTag");
                        if ((void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)))
                            for (var h = 0; h < e.length; h++) {
                                var i = e[h],
                                    j = this._normalizeItem(i),
                                    k = this.option(j);
                                this.$element.append(k);
                            }
                    }
                    return (
                        (b.prototype.query = function (a, b, c) {
                            function d(a, f) {
                                for (var g = a.results, h = 0; h < g.length; h++) {
                                    var i = g[h],
                                        j = null != i.children && !d({ results: i.children }, !0),
                                        k = i.text === b.term;
                                    if (k || j) return f ? !1 : ((a.data = g), void c(a));
                                }
                                if (f) return !0;
                                var l = e.createTag(b);
                                if (null != l) {
                                    var m = e.option(l);
                                    m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l);
                                }
                                (a.results = g), c(a);
                            }
                            var e = this;
                            return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d);
                        }),
                        (b.prototype.createTag = function (b, c) {
                            var d = a.trim(c.term);
                            return "" === d ? null : { id: d, text: d };
                        }),
                        (b.prototype.insertTag = function (a, b, c) {
                            b.unshift(c);
                        }),
                        (b.prototype._removeOldTags = function (b) {
                            var c = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                            c.each(function () {
                                this.selected || a(this).remove();
                            });
                        }),
                        b
                    );
                }),
                b.define("select2/data/tokenizer", ["jquery"], function (a) {
                    function b(a, b, c) {
                        var d = c.get("tokenizer");
                        void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
                    }
                    return (
                        (b.prototype.bind = function (a, b, c) {
                            a.call(this, b, c), (this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field"));
                        }),
                        (b.prototype.query = function (b, c, d) {
                            function e(b) {
                                var c = g._normalizeItem(b),
                                    d = g.$element.find("option").filter(function () {
                                        return a(this).val() === c.id;
                                    });
                                if (!d.length) {
                                    var e = g.option(c);
                                    e.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([e]);
                                }
                                f(c);
                            }
                            function f(a) {
                                g.trigger("select", { data: a });
                            }
                            var g = this;
                            c.term = c.term || "";
                            var h = this.tokenizer(c, this.options, e);
                            h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), (c.term = h.term)), b.call(this, c, d);
                        }),
                        (b.prototype.tokenizer = function (b, c, d, e) {
                            for (
                                var f = d.get("tokenSeparators") || [],
                                    g = c.term,
                                    h = 0,
                                    i =
                                        this.createTag ||
                                        function (a) {
                                            return { id: a.term, text: a.term };
                                        };
                                h < g.length;

                            ) {
                                var j = g[h];
                                if (-1 !== a.inArray(j, f)) {
                                    var k = g.substr(0, h),
                                        l = a.extend({}, c, { term: k }),
                                        m = i(l);
                                    null != m ? (e(m), (g = g.substr(h + 1) || ""), (h = 0)) : h++;
                                } else h++;
                            }
                            return { term: g };
                        }),
                        b
                    );
                }),
                b.define("select2/data/minimumInputLength", [], function () {
                    function a(a, b, c) {
                        (this.minimumInputLength = c.get("minimumInputLength")), a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            return (
                                (b.term = b.term || ""),
                                b.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } }) : void a.call(this, b, c)
                            );
                        }),
                        a
                    );
                }),
                b.define("select2/data/maximumInputLength", [], function () {
                    function a(a, b, c) {
                        (this.maximumInputLength = c.get("maximumInputLength")), a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            return (
                                (b.term = b.term || ""),
                                this.maximumInputLength > 0 && b.term.length > this.maximumInputLength
                                    ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } })
                                    : void a.call(this, b, c)
                            );
                        }),
                        a
                    );
                }),
                b.define("select2/data/maximumSelectionLength", [], function () {
                    function a(a, b, c) {
                        (this.maximumSelectionLength = c.get("maximumSelectionLength")), a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            var d = this;
                            this.current(function (e) {
                                var f = null != e ? e.length : 0;
                                return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } }) : void a.call(d, b, c);
                            });
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
                    function c(a, b) {
                        (this.$element = a), (this.options = b), c.__super__.constructor.call(this);
                    }
                    return (
                        b.Extend(c, b.Observable),
                        (c.prototype.render = function () {
                            var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                            return b.attr("dir", this.options.get("dir")), (this.$dropdown = b), b;
                        }),
                        (c.prototype.bind = function () {}),
                        (c.prototype.position = function (a, b) {}),
                        (c.prototype.destroy = function () {
                            this.$dropdown.remove();
                        }),
                        c
                    );
                }),
                b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) {
                    function c() {}
                    return (
                        (c.prototype.render = function (b) {
                            var c = b.call(this),
                                d = a(
                                    '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>'
                                );
                            return (this.$searchContainer = d), (this.$search = d.find("input")), c.prepend(d), c;
                        }),
                        (c.prototype.bind = function (b, c, d) {
                            var e = this;
                            b.call(this, c, d),
                                this.$search.on("keydown", function (a) {
                                    e.trigger("keypress", a), (e._keyUpPrevented = a.isDefaultPrevented());
                                }),
                                this.$search.on("input", function (b) {
                                    a(this).off("keyup");
                                }),
                                this.$search.on("keyup input", function (a) {
                                    e.handleSearch(a);
                                }),
                                c.on("open", function () {
                                    e.$search.attr("tabindex", 0),
                                        e.$search.focus(),
                                        window.setTimeout(function () {
                                            e.$search.focus();
                                        }, 0);
                                }),
                                c.on("close", function () {
                                    e.$search.attr("tabindex", -1), e.$search.val("");
                                }),
                                c.on("focus", function () {
                                    c.isOpen() && e.$search.focus();
                                }),
                                c.on("results:all", function (a) {
                                    if (null == a.query.term || "" === a.query.term) {
                                        var b = e.showSearch(a);
                                        b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
                                    }
                                });
                        }),
                        (c.prototype.handleSearch = function (a) {
                            if (!this._keyUpPrevented) {
                                var b = this.$search.val();
                                this.trigger("query", { term: b });
                            }
                            this._keyUpPrevented = !1;
                        }),
                        (c.prototype.showSearch = function (a, b) {
                            return !0;
                        }),
                        c
                    );
                }),
                b.define("select2/dropdown/hidePlaceholder", [], function () {
                    function a(a, b, c, d) {
                        (this.placeholder = this.normalizePlaceholder(c.get("placeholder"))), a.call(this, b, c, d);
                    }
                    return (
                        (a.prototype.append = function (a, b) {
                            (b.results = this.removePlaceholder(b.results)), a.call(this, b);
                        }),
                        (a.prototype.normalizePlaceholder = function (a, b) {
                            return "string" == typeof b && (b = { id: "", text: b }), b;
                        }),
                        (a.prototype.removePlaceholder = function (a, b) {
                            for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                                var e = b[d];
                                this.placeholder.id === e.id && c.splice(d, 1);
                            }
                            return c;
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
                    function b(a, b, c, d) {
                        (this.lastParams = {}), a.call(this, b, c, d), (this.$loadingMore = this.createLoadingMore()), (this.loading = !1);
                    }
                    return (
                        (b.prototype.append = function (a, b) {
                            this.$loadingMore.remove(), (this.loading = !1), a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
                        }),
                        (b.prototype.bind = function (b, c, d) {
                            var e = this;
                            b.call(this, c, d),
                                c.on("query", function (a) {
                                    (e.lastParams = a), (e.loading = !0);
                                }),
                                c.on("query:append", function (a) {
                                    (e.lastParams = a), (e.loading = !0);
                                }),
                                this.$results.on("scroll", function () {
                                    var b = a.contains(document.documentElement, e.$loadingMore[0]);
                                    if (!e.loading && b) {
                                        var c = e.$results.offset().top + e.$results.outerHeight(!1),
                                            d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1);
                                        c + 50 >= d && e.loadMore();
                                    }
                                });
                        }),
                        (b.prototype.loadMore = function () {
                            this.loading = !0;
                            var b = a.extend({}, { page: 1 }, this.lastParams);
                            b.page++, this.trigger("query:append", b);
                        }),
                        (b.prototype.showLoadingMore = function (a, b) {
                            return b.pagination && b.pagination.more;
                        }),
                        (b.prototype.createLoadingMore = function () {
                            var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                                c = this.options.get("translations").get("loadingMore");
                            return b.html(c(this.lastParams)), b;
                        }),
                        b
                    );
                }),
                b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
                    function c(b, c, d) {
                        (this.$dropdownParent = d.get("dropdownParent") || a(document.body)), b.call(this, c, d);
                    }
                    return (
                        (c.prototype.bind = function (a, b, c) {
                            var d = this,
                                e = !1;
                            a.call(this, b, c),
                                b.on("open", function () {
                                    d._showDropdown(),
                                        d._attachPositioningHandler(b),
                                        e ||
                                            ((e = !0),
                                            b.on("results:all", function () {
                                                d._positionDropdown(), d._resizeDropdown();
                                            }),
                                            b.on("results:append", function () {
                                                d._positionDropdown(), d._resizeDropdown();
                                            }));
                                }),
                                b.on("close", function () {
                                    d._hideDropdown(), d._detachPositioningHandler(b);
                                }),
                                this.$dropdownContainer.on("mousedown", function (a) {
                                    a.stopPropagation();
                                });
                        }),
                        (c.prototype.destroy = function (a) {
                            a.call(this), this.$dropdownContainer.remove();
                        }),
                        (c.prototype.position = function (a, b, c) {
                            b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), (this.$container = c);
                        }),
                        (c.prototype.render = function (b) {
                            var c = a("<span></span>"),
                                d = b.call(this);
                            return c.append(d), (this.$dropdownContainer = c), c;
                        }),
                        (c.prototype._hideDropdown = function (a) {
                            this.$dropdownContainer.detach();
                        }),
                        (c.prototype._attachPositioningHandler = function (c, d) {
                            var e = this,
                                f = "scroll.select2." + d.id,
                                g = "resize.select2." + d.id,
                                h = "orientationchange.select2." + d.id,
                                i = this.$container.parents().filter(b.hasScroll);
                            i.each(function () {
                                a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() });
                            }),
                                i.on(f, function (b) {
                                    var c = a(this).data("select2-scroll-position");
                                    a(this).scrollTop(c.y);
                                }),
                                a(window).on(f + " " + g + " " + h, function (a) {
                                    e._positionDropdown(), e._resizeDropdown();
                                });
                        }),
                        (c.prototype._detachPositioningHandler = function (c, d) {
                            var e = "scroll.select2." + d.id,
                                f = "resize.select2." + d.id,
                                g = "orientationchange.select2." + d.id,
                                h = this.$container.parents().filter(b.hasScroll);
                            h.off(e), a(window).off(e + " " + f + " " + g);
                        }),
                        (c.prototype._positionDropdown = function () {
                            var b = a(window),
                                c = this.$dropdown.hasClass("select2-dropdown--above"),
                                d = this.$dropdown.hasClass("select2-dropdown--below"),
                                e = null,
                                f = this.$container.offset();
                            f.bottom = f.top + this.$container.outerHeight(!1);
                            var g = { height: this.$container.outerHeight(!1) };
                            (g.top = f.top), (g.bottom = f.top + g.height);
                            var h = { height: this.$dropdown.outerHeight(!1) },
                                i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() },
                                j = i.top < f.top - h.height,
                                k = i.bottom > f.bottom + h.height,
                                l = { left: f.left, top: g.bottom },
                                m = this.$dropdownParent;
                            "static" === m.css("position") && (m = m.offsetParent());
                            var n = m.offset();
                            (l.top -= n.top),
                                (l.left -= n.left),
                                c || d || (e = "below"),
                                k || !j || c ? !j && k && c && (e = "below") : (e = "above"),
                                ("above" == e || (c && "below" !== e)) && (l.top = g.top - n.top - h.height),
                                null != e &&
                                    (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e),
                                    this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)),
                                this.$dropdownContainer.css(l);
                        }),
                        (c.prototype._resizeDropdown = function () {
                            var a = { width: this.$container.outerWidth(!1) + "px" };
                            this.options.get("dropdownAutoWidth") && ((a.minWidth = a.width), (a.position = "relative"), (a.width = "auto")), this.$dropdown.css(a);
                        }),
                        (c.prototype._showDropdown = function (a) {
                            this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
                        }),
                        c
                    );
                }),
                b.define("select2/dropdown/minimumResultsForSearch", [], function () {
                    function a(b) {
                        for (var c = 0, d = 0; d < b.length; d++) {
                            var e = b[d];
                            e.children ? (c += a(e.children)) : c++;
                        }
                        return c;
                    }
                    function b(a, b, c, d) {
                        (this.minimumResultsForSearch = c.get("minimumResultsForSearch")), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
                    }
                    return (
                        (b.prototype.showSearch = function (b, c) {
                            return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c);
                        }),
                        b
                    );
                }),
                b.define("select2/dropdown/selectOnClose", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            var d = this;
                            a.call(this, b, c),
                                b.on("close", function (a) {
                                    d._handleSelectOnClose(a);
                                });
                        }),
                        (a.prototype._handleSelectOnClose = function (a, b) {
                            if (b && null != b.originalSelect2Event) {
                                var c = b.originalSelect2Event;
                                if ("select" === c._type || "unselect" === c._type) return;
                            }
                            var d = this.getHighlightedResults();
                            if (!(d.length < 1)) {
                                var e = d.data("data");
                                (null != e.element && e.element.selected) || (null == e.element && e.selected) || this.trigger("select", { data: e });
                            }
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/closeOnSelect", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            var d = this;
                            a.call(this, b, c),
                                b.on("select", function (a) {
                                    d._selectTriggered(a);
                                }),
                                b.on("unselect", function (a) {
                                    d._selectTriggered(a);
                                });
                        }),
                        (a.prototype._selectTriggered = function (a, b) {
                            var c = b.originalEvent;
                            (c && c.ctrlKey) || this.trigger("close", { originalEvent: c, originalSelect2Event: b });
                        }),
                        a
                    );
                }),
                b.define("select2/i18n/en", [], function () {
                    return {
                        errorLoading: function () {
                            return "The results could not be loaded.";
                        },
                        inputTooLong: function (a) {
                            var b = a.input.length - a.maximum,
                                c = "Please delete " + b + " character";
                            return 1 != b && (c += "s"), c;
                        },
                        inputTooShort: function (a) {
                            var b = a.minimum - a.input.length,
                                c = "Please enter " + b + " or more characters";
                            return c;
                        },
                        loadingMore: function () {
                            return "Loading more results…";
                        },
                        maximumSelected: function (a) {
                            var b = "You can only select " + a.maximum + " item";
                            return 1 != a.maximum && (b += "s"), b;
                        },
                        noResults: function () {
                            return "No results found";
                        },
                        searching: function () {
                            return "Searching…";
                        },
                    };
                }),
                b.define(
                    "select2/defaults",
                    [
                        "jquery",
                        "require",
                        "./results",
                        "./selection/single",
                        "./selection/multiple",
                        "./selection/placeholder",
                        "./selection/allowClear",
                        "./selection/search",
                        "./selection/eventRelay",
                        "./utils",
                        "./translation",
                        "./diacritics",
                        "./data/select",
                        "./data/array",
                        "./data/ajax",
                        "./data/tags",
                        "./data/tokenizer",
                        "./data/minimumInputLength",
                        "./data/maximumInputLength",
                        "./data/maximumSelectionLength",
                        "./dropdown",
                        "./dropdown/search",
                        "./dropdown/hidePlaceholder",
                        "./dropdown/infiniteScroll",
                        "./dropdown/attachBody",
                        "./dropdown/minimumResultsForSearch",
                        "./dropdown/selectOnClose",
                        "./dropdown/closeOnSelect",
                        "./i18n/en",
                    ],
                    function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
                        function D() {
                            this.reset();
                        }
                        (D.prototype.apply = function (l) {
                            if (((l = a.extend(!0, {}, this.defaults, l)), null == l.dataAdapter)) {
                                if (
                                    (null != l.ajax ? (l.dataAdapter = o) : null != l.data ? (l.dataAdapter = n) : (l.dataAdapter = m),
                                    l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)),
                                    l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)),
                                    l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)),
                                    l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)),
                                    (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)),
                                    null != l.query)
                                ) {
                                    var C = b(l.amdBase + "compat/query");
                                    l.dataAdapter = j.Decorate(l.dataAdapter, C);
                                }
                                if (null != l.initSelection) {
                                    var D = b(l.amdBase + "compat/initSelection");
                                    l.dataAdapter = j.Decorate(l.dataAdapter, D);
                                }
                            }
                            if (
                                (null == l.resultsAdapter &&
                                    ((l.resultsAdapter = c),
                                    null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)),
                                    null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)),
                                    l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))),
                                null == l.dropdownAdapter)
                            ) {
                                if (l.multiple) l.dropdownAdapter = u;
                                else {
                                    var E = j.Decorate(u, v);
                                    l.dropdownAdapter = E;
                                }
                                if (
                                    (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)),
                                    l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)),
                                    null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass)
                                ) {
                                    var F = b(l.amdBase + "compat/dropdownCss");
                                    l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
                                }
                                l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
                            }
                            if (null == l.selectionAdapter) {
                                if (
                                    (l.multiple ? (l.selectionAdapter = e) : (l.selectionAdapter = d),
                                    null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)),
                                    l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)),
                                    l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)),
                                    null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass)
                                ) {
                                    var G = b(l.amdBase + "compat/containerCss");
                                    l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
                                }
                                l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
                            }
                            if ("string" == typeof l.language)
                                if (l.language.indexOf("-") > 0) {
                                    var H = l.language.split("-"),
                                        I = H[0];
                                    l.language = [l.language, I];
                                } else l.language = [l.language];
                            if (a.isArray(l.language)) {
                                var J = new k();
                                l.language.push("en");
                                for (var K = l.language, L = 0; L < K.length; L++) {
                                    var M = K[L],
                                        N = {};
                                    try {
                                        N = k.loadPath(M);
                                    } catch (O) {
                                        try {
                                            (M = this.defaults.amdLanguageBase + M), (N = k.loadPath(M));
                                        } catch (P) {
                                            l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                                            continue;
                                        }
                                    }
                                    J.extend(N);
                                }
                                l.translations = J;
                            } else {
                                var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
                                    R = new k(l.language);
                                R.extend(Q), (l.translations = R);
                            }
                            return l;
                        }),
                            (D.prototype.reset = function () {
                                function b(a) {
                                    function b(a) {
                                        return l[a] || a;
                                    }
                                    return a.replace(/[^\u0000-\u007E]/g, b);
                                }
                                function c(d, e) {
                                    if ("" === a.trim(d.term)) return e;
                                    if (e.children && e.children.length > 0) {
                                        for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
                                            var h = e.children[g],
                                                i = c(d, h);
                                            null == i && f.children.splice(g, 1);
                                        }
                                        return f.children.length > 0 ? f : c(d, f);
                                    }
                                    var j = b(e.text).toUpperCase(),
                                        k = b(d.term).toUpperCase();
                                    return j.indexOf(k) > -1 ? e : null;
                                }
                                this.defaults = {
                                    amdBase: "./",
                                    amdLanguageBase: "./i18n/",
                                    closeOnSelect: !0,
                                    debug: !1,
                                    dropdownAutoWidth: !1,
                                    escapeMarkup: j.escapeMarkup,
                                    language: C,
                                    matcher: c,
                                    minimumInputLength: 0,
                                    maximumInputLength: 0,
                                    maximumSelectionLength: 0,
                                    minimumResultsForSearch: 0,
                                    selectOnClose: !1,
                                    sorter: function (a) {
                                        return a;
                                    },
                                    templateResult: function (a) {
                                        return a.text;
                                    },
                                    templateSelection: function (a) {
                                        return a.text;
                                    },
                                    theme: "default",
                                    width: "resolve",
                                };
                            }),
                            (D.prototype.set = function (b, c) {
                                var d = a.camelCase(b),
                                    e = {};
                                e[d] = c;
                                var f = j._convertData(e);
                                a.extend(this.defaults, f);
                            });
                        var E = new D();
                        return E;
                    }
                ),
                b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
                    function e(b, e) {
                        if (((this.options = b), null != e && this.fromElement(e), (this.options = c.apply(this.options)), e && e.is("input"))) {
                            var f = a(this.get("amdBase") + "compat/inputData");
                            this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
                        }
                    }
                    return (
                        (e.prototype.fromElement = function (a) {
                            var c = ["select2"];
                            null == this.options.multiple && (this.options.multiple = a.prop("multiple")),
                                null == this.options.disabled && (this.options.disabled = a.prop("disabled")),
                                null == this.options.language && (a.prop("lang") ? (this.options.language = a.prop("lang").toLowerCase()) : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))),
                                null == this.options.dir && (a.prop("dir") ? (this.options.dir = a.prop("dir")) : a.closest("[dir]").prop("dir") ? (this.options.dir = a.closest("[dir]").prop("dir")) : (this.options.dir = "ltr")),
                                a.prop("disabled", this.options.disabled),
                                a.prop("multiple", this.options.multiple),
                                a.data("select2Tags") &&
                                    (this.options.debug &&
                                        window.console &&
                                        console.warn &&
                                        console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                                    a.data("data", a.data("select2Tags")),
                                    a.data("tags", !0)),
                                a.data("ajaxUrl") &&
                                    (this.options.debug &&
                                        window.console &&
                                        console.warn &&
                                        console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                                    a.attr("ajax--url", a.data("ajaxUrl")),
                                    a.data("ajax--url", a.data("ajaxUrl")));
                            var e = {};
                            e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();
                            var f = b.extend(!0, {}, e);
                            f = d._convertData(f);
                            for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : (this.options[g] = f[g]));
                            return this;
                        }),
                        (e.prototype.get = function (a) {
                            return this.options[a];
                        }),
                        (e.prototype.set = function (a, b) {
                            this.options[a] = b;
                        }),
                        e
                    );
                }),
                b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
                    var e = function (a, c) {
                        null != a.data("select2") && a.data("select2").destroy(), (this.$element = a), (this.id = this._generateId(a)), (c = c || {}), (this.options = new b(c, a)), e.__super__.constructor.call(this);
                        var d = a.attr("tabindex") || 0;
                        a.data("old-tabindex", d), a.attr("tabindex", "-1");
                        var f = this.options.get("dataAdapter");
                        this.dataAdapter = new f(a, this.options);
                        var g = this.render();
                        this._placeContainer(g);
                        var h = this.options.get("selectionAdapter");
                        (this.selection = new h(a, this.options)), (this.$selection = this.selection.render()), this.selection.position(this.$selection, g);
                        var i = this.options.get("dropdownAdapter");
                        (this.dropdown = new i(a, this.options)), (this.$dropdown = this.dropdown.render()), this.dropdown.position(this.$dropdown, g);
                        var j = this.options.get("resultsAdapter");
                        (this.results = new j(a, this.options, this.dataAdapter)), (this.$results = this.results.render()), this.results.position(this.$results, this.$dropdown);
                        var k = this;
                        this._bindAdapters(),
                            this._registerDomEvents(),
                            this._registerDataEvents(),
                            this._registerSelectionEvents(),
                            this._registerDropdownEvents(),
                            this._registerResultsEvents(),
                            this._registerEvents(),
                            this.dataAdapter.current(function (a) {
                                k.trigger("selection:update", { data: a });
                            }),
                            a.addClass("select2-hidden-accessible"),
                            a.attr("aria-hidden", "true"),
                            this._syncAttributes(),
                            a.data("select2", this);
                    };
                    return (
                        c.Extend(e, c.Observable),
                        (e.prototype._generateId = function (a) {
                            var b = "";
                            return (b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4)), (b = b.replace(/(:|\.|\[|\]|,)/g, "")), (b = "select2-" + b);
                        }),
                        (e.prototype._placeContainer = function (a) {
                            a.insertAfter(this.$element);
                            var b = this._resolveWidth(this.$element, this.options.get("width"));
                            null != b && a.css("width", b);
                        }),
                        (e.prototype._resolveWidth = function (a, b) {
                            var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                            if ("resolve" == b) {
                                var d = this._resolveWidth(a, "style");
                                return null != d ? d : this._resolveWidth(a, "element");
                            }
                            if ("element" == b) {
                                var e = a.outerWidth(!1);
                                return 0 >= e ? "auto" : e + "px";
                            }
                            if ("style" == b) {
                                var f = a.attr("style");
                                if ("string" != typeof f) return null;
                                for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) {
                                    var j = g[h].replace(/\s/g, ""),
                                        k = j.match(c);
                                    if (null !== k && k.length >= 1) return k[1];
                                }
                                return null;
                            }
                            return b;
                        }),
                        (e.prototype._bindAdapters = function () {
                            this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
                        }),
                        (e.prototype._registerDomEvents = function () {
                            var b = this;
                            this.$element.on("change.select2", function () {
                                b.dataAdapter.current(function (a) {
                                    b.trigger("selection:update", { data: a });
                                });
                            }),
                                this.$element.on("focus.select2", function (a) {
                                    b.trigger("focus", a);
                                }),
                                (this._syncA = c.bind(this._syncAttributes, this)),
                                (this._syncS = c.bind(this._syncSubtree, this)),
                                this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                            var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                            null != d
                                ? ((this._observer = new d(function (c) {
                                      a.each(c, b._syncA), a.each(c, b._syncS);
                                  })),
                                  this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 }))
                                : this.$element[0].addEventListener &&
                                  (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1));
                        }),
                        (e.prototype._registerDataEvents = function () {
                            var a = this;
                            this.dataAdapter.on("*", function (b, c) {
                                a.trigger(b, c);
                            });
                        }),
                        (e.prototype._registerSelectionEvents = function () {
                            var b = this,
                                c = ["toggle", "focus"];
                            this.selection.on("toggle", function () {
                                b.toggleDropdown();
                            }),
                                this.selection.on("focus", function (a) {
                                    b.focus(a);
                                }),
                                this.selection.on("*", function (d, e) {
                                    -1 === a.inArray(d, c) && b.trigger(d, e);
                                });
                        }),
                        (e.prototype._registerDropdownEvents = function () {
                            var a = this;
                            this.dropdown.on("*", function (b, c) {
                                a.trigger(b, c);
                            });
                        }),
                        (e.prototype._registerResultsEvents = function () {
                            var a = this;
                            this.results.on("*", function (b, c) {
                                a.trigger(b, c);
                            });
                        }),
                        (e.prototype._registerEvents = function () {
                            var a = this;
                            this.on("open", function () {
                                a.$container.addClass("select2-container--open");
                            }),
                                this.on("close", function () {
                                    a.$container.removeClass("select2-container--open");
                                }),
                                this.on("enable", function () {
                                    a.$container.removeClass("select2-container--disabled");
                                }),
                                this.on("disable", function () {
                                    a.$container.addClass("select2-container--disabled");
                                }),
                                this.on("blur", function () {
                                    a.$container.removeClass("select2-container--focus");
                                }),
                                this.on("query", function (b) {
                                    a.isOpen() || a.trigger("open", {}),
                                        this.dataAdapter.query(b, function (c) {
                                            a.trigger("results:all", { data: c, query: b });
                                        });
                                }),
                                this.on("query:append", function (b) {
                                    this.dataAdapter.query(b, function (c) {
                                        a.trigger("results:append", { data: c, query: b });
                                    });
                                }),
                                this.on("keypress", function (b) {
                                    var c = b.which;
                                    a.isOpen()
                                        ? c === d.ESC || c === d.TAB || (c === d.UP && b.altKey)
                                            ? (a.close(), b.preventDefault())
                                            : c === d.ENTER
                                            ? (a.trigger("results:select", {}), b.preventDefault())
                                            : c === d.SPACE && b.ctrlKey
                                            ? (a.trigger("results:toggle", {}), b.preventDefault())
                                            : c === d.UP
                                            ? (a.trigger("results:previous", {}), b.preventDefault())
                                            : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault())
                                        : (c === d.ENTER || c === d.SPACE || (c === d.DOWN && b.altKey)) && (a.open(), b.preventDefault());
                                });
                        }),
                        (e.prototype._syncAttributes = function () {
                            this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
                        }),
                        (e.prototype._syncSubtree = function (a, b) {
                            var c = !1,
                                d = this;
                            if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
                                if (b)
                                    if (b.addedNodes && b.addedNodes.length > 0)
                                        for (var e = 0; e < b.addedNodes.length; e++) {
                                            var f = b.addedNodes[e];
                                            f.selected && (c = !0);
                                        }
                                    else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                                else c = !0;
                                c &&
                                    this.dataAdapter.current(function (a) {
                                        d.trigger("selection:update", { data: a });
                                    });
                            }
                        }),
                        (e.prototype.trigger = function (a, b) {
                            var c = e.__super__.trigger,
                                d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                            if ((void 0 === b && (b = {}), a in d)) {
                                var f = d[a],
                                    g = { prevented: !1, name: a, args: b };
                                if ((c.call(this, f, g), g.prevented)) return void (b.prevented = !0);
                            }
                            c.call(this, a, b);
                        }),
                        (e.prototype.toggleDropdown = function () {
                            this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
                        }),
                        (e.prototype.open = function () {
                            this.isOpen() || this.trigger("query", {});
                        }),
                        (e.prototype.close = function () {
                            this.isOpen() && this.trigger("close", {});
                        }),
                        (e.prototype.isOpen = function () {
                            return this.$container.hasClass("select2-container--open");
                        }),
                        (e.prototype.hasFocus = function () {
                            return this.$container.hasClass("select2-container--focus");
                        }),
                        (e.prototype.focus = function (a) {
                            this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
                        }),
                        (e.prototype.enable = function (a) {
                            this.options.get("debug") &&
                                window.console &&
                                console.warn &&
                                console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),
                                (null == a || 0 === a.length) && (a = [!0]);
                            var b = !a[0];
                            this.$element.prop("disabled", b);
                        }),
                        (e.prototype.data = function () {
                            this.options.get("debug") &&
                                arguments.length > 0 &&
                                window.console &&
                                console.warn &&
                                console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                            var a = [];
                            return (
                                this.dataAdapter.current(function (b) {
                                    a = b;
                                }),
                                a
                            );
                        }),
                        (e.prototype.val = function (b) {
                            if (
                                (this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                                null == b || 0 === b.length)
                            )
                                return this.$element.val();
                            var c = b[0];
                            a.isArray(c) &&
                                (c = a.map(c, function (a) {
                                    return a.toString();
                                })),
                                this.$element.val(c).trigger("change");
                        }),
                        (e.prototype.destroy = function () {
                            this.$container.remove(),
                                this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA),
                                null != this._observer
                                    ? (this._observer.disconnect(), (this._observer = null))
                                    : this.$element[0].removeEventListener &&
                                      (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1),
                                      this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1),
                                      this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)),
                                (this._syncA = null),
                                (this._syncS = null),
                                this.$element.off(".select2"),
                                this.$element.attr("tabindex", this.$element.data("old-tabindex")),
                                this.$element.removeClass("select2-hidden-accessible"),
                                this.$element.attr("aria-hidden", "false"),
                                this.$element.removeData("select2"),
                                this.dataAdapter.destroy(),
                                this.selection.destroy(),
                                this.dropdown.destroy(),
                                this.results.destroy(),
                                (this.dataAdapter = null),
                                (this.selection = null),
                                (this.dropdown = null),
                                (this.results = null);
                        }),
                        (e.prototype.render = function () {
                            var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                            return b.attr("dir", this.options.get("dir")), (this.$container = b), this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b;
                        }),
                        e
                    );
                }),
                b.define("select2/compat/utils", ["jquery"], function (a) {
                    function b(b, c, d) {
                        var e,
                            f,
                            g = [];
                        (e = a.trim(b.attr("class"))),
                            e &&
                                ((e = "" + e),
                                a(e.split(/\s+/)).each(function () {
                                    0 === this.indexOf("select2-") && g.push(this);
                                })),
                            (e = a.trim(c.attr("class"))),
                            e &&
                                ((e = "" + e),
                                a(e.split(/\s+/)).each(function () {
                                    0 !== this.indexOf("select2-") && ((f = d(this)), null != f && g.push(f));
                                })),
                            b.attr("class", g.join(" "));
                    }
                    return { syncCssClasses: b };
                }),
                b.define("select2/compat/containerCss", ["jquery", "./utils"], function (a, b) {
                    function c(a) {
                        return null;
                    }
                    function d() {}
                    return (
                        (d.prototype.render = function (d) {
                            var e = d.call(this),
                                f = this.options.get("containerCssClass") || "";
                            a.isFunction(f) && (f = f(this.$element));
                            var g = this.options.get("adaptContainerCssClass");
                            if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                                f = f.replace(":all:", "");
                                var h = g;
                                g = function (a) {
                                    var b = h(a);
                                    return null != b ? b + " " + a : a;
                                };
                            }
                            var i = this.options.get("containerCss") || {};
                            return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e;
                        }),
                        d
                    );
                }),
                b.define("select2/compat/dropdownCss", ["jquery", "./utils"], function (a, b) {
                    function c(a) {
                        return null;
                    }
                    function d() {}
                    return (
                        (d.prototype.render = function (d) {
                            var e = d.call(this),
                                f = this.options.get("dropdownCssClass") || "";
                            a.isFunction(f) && (f = f(this.$element));
                            var g = this.options.get("adaptDropdownCssClass");
                            if (((g = g || c), -1 !== f.indexOf(":all:"))) {
                                f = f.replace(":all:", "");
                                var h = g;
                                g = function (a) {
                                    var b = h(a);
                                    return null != b ? b + " " + a : a;
                                };
                            }
                            var i = this.options.get("dropdownCss") || {};
                            return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e;
                        }),
                        d
                    );
                }),
                b.define("select2/compat/initSelection", ["jquery"], function (a) {
                    function b(a, b, c) {
                        c.get("debug") &&
                            window.console &&
                            console.warn &&
                            console.warn(
                                "Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"
                            ),
                            (this.initSelection = c.get("initSelection")),
                            (this._isInitialized = !1),
                            a.call(this, b, c);
                    }
                    return (
                        (b.prototype.current = function (b, c) {
                            var d = this;
                            return this._isInitialized
                                ? void b.call(this, c)
                                : void this.initSelection.call(null, this.$element, function (b) {
                                      (d._isInitialized = !0), a.isArray(b) || (b = [b]), c(b);
                                  });
                        }),
                        b
                    );
                }),
                b.define("select2/compat/inputData", ["jquery"], function (a) {
                    function b(a, b, c) {
                        (this._currentData = []),
                            (this._valueSeparator = c.get("valueSeparator") || ","),
                            "hidden" === b.prop("type") &&
                                c.get("debug") &&
                                console &&
                                console.warn &&
                                console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."),
                            a.call(this, b, c);
                    }
                    return (
                        (b.prototype.current = function (b, c) {
                            function d(b, c) {
                                var e = [];
                                return b.selected || -1 !== a.inArray(b.id, c) ? ((b.selected = !0), e.push(b)) : (b.selected = !1), b.children && e.push.apply(e, d(b.children, c)), e;
                            }
                            for (var e = [], f = 0; f < this._currentData.length; f++) {
                                var g = this._currentData[f];
                                e.push.apply(e, d(g, this.$element.val().split(this._valueSeparator)));
                            }
                            c(e);
                        }),
                        (b.prototype.select = function (b, c) {
                            if (this.options.get("multiple")) {
                                var d = this.$element.val();
                                (d += this._valueSeparator + c.id), this.$element.val(d), this.$element.trigger("change");
                            } else
                                this.current(function (b) {
                                    a.map(b, function (a) {
                                        a.selected = !1;
                                    });
                                }),
                                    this.$element.val(c.id),
                                    this.$element.trigger("change");
                        }),
                        (b.prototype.unselect = function (a, b) {
                            var c = this;
                            (b.selected = !1),
                                this.current(function (a) {
                                    for (var d = [], e = 0; e < a.length; e++) {
                                        var f = a[e];
                                        b.id != f.id && d.push(f.id);
                                    }
                                    c.$element.val(d.join(c._valueSeparator)), c.$element.trigger("change");
                                });
                        }),
                        (b.prototype.query = function (a, b, c) {
                            for (var d = [], e = 0; e < this._currentData.length; e++) {
                                var f = this._currentData[e],
                                    g = this.matches(b, f);
                                null !== g && d.push(g);
                            }
                            c({ results: d });
                        }),
                        (b.prototype.addOptions = function (b, c) {
                            var d = a.map(c, function (b) {
                                return a.data(b[0], "data");
                            });
                            this._currentData.push.apply(this._currentData, d);
                        }),
                        b
                    );
                }),
                b.define("select2/compat/matcher", ["jquery"], function (a) {
                    function b(b) {
                        function c(c, d) {
                            var e = a.extend(!0, {}, d);
                            if (null == c.term || "" === a.trim(c.term)) return e;
                            if (d.children) {
                                for (var f = d.children.length - 1; f >= 0; f--) {
                                    var g = d.children[f],
                                        h = b(c.term, g.text, g);
                                    h || e.children.splice(f, 1);
                                }
                                if (e.children.length > 0) return e;
                            }
                            return b(c.term, d.text, d) ? e : null;
                        }
                        return c;
                    }
                    return b;
                }),
                b.define("select2/compat/query", [], function () {
                    function a(a, b, c) {
                        c.get("debug") &&
                            window.console &&
                            console.warn &&
                            console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."),
                            a.call(this, b, c);
                    }
                    return (
                        (a.prototype.query = function (a, b, c) {
                            b.callback = c;
                            var d = this.options.get("query");
                            d.call(null, b);
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/attachContainer", [], function () {
                    function a(a, b, c) {
                        a.call(this, b, c);
                    }
                    return (
                        (a.prototype.position = function (a, b, c) {
                            var d = c.find(".dropdown-wrapper");
                            d.append(b), b.addClass("select2-dropdown--below"), c.addClass("select2-container--below");
                        }),
                        a
                    );
                }),
                b.define("select2/dropdown/stopPropagation", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            a.call(this, b, c);
                            var d = [
                                "blur",
                                "change",
                                "click",
                                "dblclick",
                                "focus",
                                "focusin",
                                "focusout",
                                "input",
                                "keydown",
                                "keyup",
                                "keypress",
                                "mousedown",
                                "mouseenter",
                                "mouseleave",
                                "mousemove",
                                "mouseover",
                                "mouseup",
                                "search",
                                "touchend",
                                "touchstart",
                            ];
                            this.$dropdown.on(d.join(" "), function (a) {
                                a.stopPropagation();
                            });
                        }),
                        a
                    );
                }),
                b.define("select2/selection/stopPropagation", [], function () {
                    function a() {}
                    return (
                        (a.prototype.bind = function (a, b, c) {
                            a.call(this, b, c);
                            var d = [
                                "blur",
                                "change",
                                "click",
                                "dblclick",
                                "focus",
                                "focusin",
                                "focusout",
                                "input",
                                "keydown",
                                "keyup",
                                "keypress",
                                "mousedown",
                                "mouseenter",
                                "mouseleave",
                                "mousemove",
                                "mouseover",
                                "mouseup",
                                "search",
                                "touchend",
                                "touchstart",
                            ];
                            this.$selection.on(d.join(" "), function (a) {
                                a.stopPropagation();
                            });
                        }),
                        a
                    );
                }),
                (function (c) {
                    "function" == typeof b.define && b.define.amd ? b.define("jquery-mousewheel", ["jquery"], c) : "object" == typeof exports ? (module.exports = c) : c(a);
                })(function (a) {
                    function b(b) {
                        var g = b || window.event,
                            h = i.call(arguments, 1),
                            j = 0,
                            l = 0,
                            m = 0,
                            n = 0,
                            o = 0,
                            p = 0;
                        if (
                            ((b = a.event.fix(g)),
                            (b.type = "mousewheel"),
                            "detail" in g && (m = -1 * g.detail),
                            "wheelDelta" in g && (m = g.wheelDelta),
                            "wheelDeltaY" in g && (m = g.wheelDeltaY),
                            "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                            "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
                            (j = 0 === m ? l : m),
                            "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
                            "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
                            0 !== m || 0 !== l)
                        ) {
                            if (1 === g.deltaMode) {
                                var q = a.data(this, "mousewheel-line-height");
                                (j *= q), (m *= q), (l *= q);
                            } else if (2 === g.deltaMode) {
                                var r = a.data(this, "mousewheel-page-height");
                                (j *= r), (m *= r), (l *= r);
                            }
                            if (
                                ((n = Math.max(Math.abs(m), Math.abs(l))),
                                (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                                (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                                (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                                (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                                k.settings.normalizeOffset && this.getBoundingClientRect)
                            ) {
                                var s = this.getBoundingClientRect();
                                (o = b.clientX - s.left), (p = b.clientY - s.top);
                            }
                            return (
                                (b.deltaX = l),
                                (b.deltaY = m),
                                (b.deltaFactor = f),
                                (b.offsetX = o),
                                (b.offsetY = p),
                                (b.deltaMode = 0),
                                h.unshift(b, j, l, m),
                                e && clearTimeout(e),
                                (e = setTimeout(c, 200)),
                                (a.event.dispatch || a.event.handle).apply(this, h)
                            );
                        }
                    }
                    function c() {
                        f = null;
                    }
                    function d(a, b) {
                        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0;
                    }
                    var e,
                        f,
                        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                        i = Array.prototype.slice;
                    if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
                    var k = (a.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function () {
                            if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
                            else this.onmousewheel = b;
                            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
                        },
                        teardown: function () {
                            if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
                            else this.onmousewheel = null;
                            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
                        },
                        getLineHeight: function (b) {
                            var c = a(b),
                                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
                        },
                        getPageHeight: function (b) {
                            return a(b).height();
                        },
                        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
                    });
                    a.fn.extend({
                        mousewheel: function (a) {
                            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
                        },
                        unmousewheel: function (a) {
                            return this.unbind("mousewheel", a);
                        },
                    });
                }),
                b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) {
                    if (null == a.fn.select2) {
                        var e = ["open", "close", "destroy"];
                        a.fn.select2 = function (b) {
                            if (((b = b || {}), "object" == typeof b))
                                return (
                                    this.each(function () {
                                        var d = a.extend(!0, {}, b);
                                        new c(a(this), d);
                                    }),
                                    this
                                );
                            if ("string" == typeof b) {
                                var d,
                                    f = Array.prototype.slice.call(arguments, 1);
                                return (
                                    this.each(function () {
                                        var c = a(this).data("select2");
                                        null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), (d = c[b].apply(c, f));
                                    }),
                                    a.inArray(b, e) > -1 ? this : d
                                );
                            }
                            throw new Error("Invalid arguments for Select2: " + b);
                        };
                    }
                    return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
                }),
                { define: b.define, require: b.require }
            );
        })(),
        c = b.require("jquery.select2");
    return (a.fn.select2.amd = b), c;
});

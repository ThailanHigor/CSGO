!(function (e) {
    "use strict";
    function t() {
        (edgtf.scroll = e(window).scrollTop()),
            (function () {
                var e = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
                    t = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
                    a = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"),
                    o = window.navigator.userAgent.indexOf("MSIE ");
                e && edgtf.body.addClass("edgtf-chrome");
                t && edgtf.body.addClass("edgtf-safari");
                a && edgtf.body.addClass("edgtf-firefox");
                (0 < o || navigator.userAgent.match(/Trident.*rv\:11\./)) && edgtf.body.addClass("edgtf-ms-explorer");
                /Edge\/\d./i.test(navigator.userAgent) && edgtf.body.addClass("edgtf-edge");
            })(),
            edgtf.body.hasClass("edgtf-dark-header") && (edgtf.defaultHeaderStyle = "edgtf-dark-header"),
            edgtf.body.hasClass("edgtf-light-header") && (edgtf.defaultHeaderStyle = "edgtf-light-header");
    }
    function a() {}
    function o() {
        (edgtf.windowWidth = e(window).width()), (edgtf.windowHeight = e(window).height());
    }
    function n() {
        edgtf.scroll = e(window).scrollTop();
    }
    switch (
        ((window.edgtf = {}),
        (edgtf.modules = {}),
        (edgtf.scroll = 0),
        (edgtf.window = e(window)),
        (edgtf.document = e(document)),
        (edgtf.windowWidth = e(window).width()),
        (edgtf.windowHeight = e(window).height()),
        (edgtf.body = e("body")),
        (edgtf.html = e("html, body")),
        (edgtf.htmlEl = e("html")),
        (edgtf.menuDropdownHeightSet = !1),
        (edgtf.defaultHeaderStyle = ""),
        (edgtf.minVideoWidth = 1500),
        (edgtf.videoWidthOriginal = 1280),
        (edgtf.videoHeightOriginal = 720),
        (edgtf.videoRatio = 1.61),
        (edgtf.edgtfOnDocumentReady = t),
        (edgtf.edgtfOnWindowLoad = a),
        (edgtf.edgtfOnWindowResize = o),
        (edgtf.edgtfOnWindowScroll = n),
        e(document).ready(t),
        e(window).load(a),
        e(window).resize(o),
        e(window).scroll(n),
        !0)
    ) {
        case edgtf.body.hasClass("edgtf-grid-1300"):
            edgtf.boxedLayoutWidth = 1350;
            break;
        case edgtf.body.hasClass("edgtf-grid-1200"):
            edgtf.boxedLayoutWidth = 1250;
            break;
        case edgtf.body.hasClass("edgtf-grid-1000"):
            edgtf.boxedLayoutWidth = 1050;
            break;
        case edgtf.body.hasClass("edgtf-grid-800"):
            edgtf.boxedLayoutWidth = 850;
            break;
        default:
            edgtf.boxedLayoutWidth = 1150;
    }
    (edgtf.gridWidth = function () {
        var e = 1100;
        switch (!0) {
            case edgtf.body.hasClass("edgtf-grid-1300") && 1400 < edgtf.windowWidth:
                e = 1300;
                break;
            case edgtf.body.hasClass("edgtf-grid-1200") && 1300 < edgtf.windowWidth:
            case edgtf.body.hasClass("edgtf-grid-1000") && 1200 < edgtf.windowWidth:
                e = 1200;
                break;
            case edgtf.body.hasClass("edgtf-grid-800") && 1024 < edgtf.windowWidth:
                e = 800;
        }
        return e;
    }),
        (edgtf.transitionEnd = (function () {
            var e = document.createElement("transitionDetector"),
                t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", transition: "transitionend" };
            for (var a in t) if (void 0 !== e.style[a]) return t[a];
        })()),
        (edgtf.animationEnd = (function () {
            var e = document.createElement("animationDetector"),
                t = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "animationend", WebkitAnimation: "webkitAnimationEnd" };
            for (var a in t) if (void 0 !== e.style[a]) return t[a];
        })());
})(jQuery),
    (function (H) {
        "use strict";
        var e = {};
        function t() {
            var e, t, a, o, n, d, i, s;
            u().init(),
                -1 < navigator.appVersion.toLowerCase().indexOf("mac") && edgtf.body.hasClass("edgtf-smooth-scroll") && edgtf.body.removeClass("edgtf-smooth-scroll"),
                r().init(),
                H("#edgtf-back-to-top").on("click", function (e) {
                    e.preventDefault(), edgtf.html.animate({ scrollTop: 0 }, edgtf.window.scrollTop() / 3, "easeInOutExpo");
                }),
                edgtf.window.scroll(function () {
                    var e = H(this).scrollTop(),
                        t = H(this).height();
                    l((0 < e ? e + t / 2 : 1) < 1e3 ? "off" : "on");
                }),
                f(),
                z(),
                W(),
                m(),
                (e = H(".edgtf-preload-background")).length &&
                    e.each(function () {
                        var e = H(this);
                        if ("" !== e.css("background-image") && "none" !== e.css("background-image")) {
                            var t = e.attr("style");
                            if ((t = (t = t.match(/url\(["']?([^'")]+)['"]?\)/)) ? t[1] : "")) {
                                var a = new Image();
                                (a.src = t),
                                    H(a).load(function () {
                                        e.removeClass("edgtf-preload-background");
                                    });
                            }
                        } else
                            H(window).load(function () {
                                e.removeClass("edgtf-preload-background");
                            });
                    }),
                g(),
                (t = H(".edgtf-search-post-type")).length &&
                    t.each(function () {
                        var e = H(this),
                            t = e.find(".edgtf-post-type-search-field"),
                            o = e.siblings(".edgtf-post-type-search-results"),
                            n = e.find(".edgtf-search-loading"),
                            d = e.find(".edgtf-search-icon");
                        n.addClass("edgtf-hidden");
                        var i,
                            s = e.data("post-type");
                        t.on("keyup paste", function () {
                            var a = H(this);
                            a.attr("autocomplete", "off"),
                                n.removeClass("edgtf-hidden"),
                                d.addClass("edgtf-hidden"),
                                clearTimeout(i),
                                (i = setTimeout(function () {
                                    var e = a.val();
                                    if (e.length < 3) o.html(""), o.fadeOut(), n.addClass("edgtf-hidden"), d.removeClass("edgtf-hidden");
                                    else {
                                        var t = { action: "overworld_edge_search_post_types", term: e, postType: s, search_post_types_nonce: H('input[name="edgtf_search_post_types_nonce"]').val() };
                                        H.ajax({
                                            type: "POST",
                                            data: t,
                                            url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                                            success: function (e) {
                                                var t = JSON.parse(e);
                                                "success" === t.status && (n.addClass("edgtf-hidden"), d.removeClass("edgtf-hidden"), o.html(t.data.html), o.fadeIn());
                                            },
                                            error: function (e, t, a) {
                                                console.log("Status: " + t), console.log("Error: " + a), n.addClass("edgtf-hidden"), d.removeClass("edgtf-hidden"), o.fadeOut();
                                            },
                                        });
                                    }
                                }, 500));
                        }),
                            t.on("focusout", function () {
                                n.addClass("edgtf-hidden"), d.removeClass("edgtf-hidden"), o.fadeOut();
                            });
                    }),
                (a = H(".edgtf-dashboard-form")).length &&
                    a.each(function () {
                        var e = H(this),
                            n = e.find("button.edgtf-dashboard-form-button"),
                            d = n.data("updating-text"),
                            i = n.data("updated-text"),
                            s = e.data("action");
                        e.on("submit", function (e) {
                            e.preventDefault();
                            var a = n.html(),
                                t = H(this).find(".edgtf-dashboard-gallery-upload-hidden"),
                                l = [];
                            n.html(d);
                            var f = new FormData();
                            t.each(function () {
                                var e,
                                    t = H(this),
                                    a = t.attr("name"),
                                    o = t.attr("id"),
                                    n = t[0].files;
                                if (-1 < a.indexOf("[")) {
                                    e = a.substring(0, a.indexOf("[")) + "_edgtf_regarray_";
                                    var d = o.indexOf("["),
                                        i = o.indexOf("]"),
                                        s = o.substring(d + 1, i);
                                    l.push(e), (e = e + s + "_");
                                } else e = a + "_edgtf_reg_";
                                0 === n.length && f.append(e, new File([""], "edgtf-dummy-file.txt", { type: "text/plain" }));
                                for (var r = 0; r < n.length; r++) {
                                    1 === n[r].name.match(/\./g).length && -1 !== H.inArray(n[r].type, ["image/png", "image/jpg", "image/jpeg", "application/pdf"]) && f.append(e + r, n[r]);
                                }
                            }),
                                f.append("action", s);
                            var o = H(this).serialize();
                            return (
                                f.append("data", o),
                                H.ajax({
                                    type: "POST",
                                    data: f,
                                    contentType: !1,
                                    processData: !1,
                                    url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                                    success: function (e) {
                                        var t;
                                        (t = JSON.parse(e)), edgtf.modules.socialLogin.edgtfRenderAjaxResponseMessage(t), "success" === t.status ? (n.html(i), (window.location = t.redirect)) : n.html(a);
                                    },
                                }),
                                !1
                            );
                        });
                    }),
                c(),
                (function () {
                    if (edgtf.body.hasClass("edgtf-smooth-page-transitions")) {
                        if (edgtf.body.hasClass("edgtf-smooth-page-transitions-preloader")) {
                            var o = H("body > .edgtf-smooth-transition-loader.edgtf-mimic-ajax"),
                                e = H("#edgtf-main-rev-holder"),
                                t = function (t, e, a) {
                                    (t = t || 600),
                                        (e = e || 0),
                                        (a = a || "easeOutSine"),
                                        o.delay(e).fadeOut(t, a),
                                        H(window).on("bind", "pageshow", function (e) {
                                            e.originalEvent.persisted && o.fadeOut(t, a);
                                        });
                                };
                            e.length
                                ? e.find(".rev_slider").on("revolution.slide.onloaded", function () {
                                      t();
                                  })
                                : H(window).on("load", function () {
                                      t();
                                  });
                        }
                        if (
                            (window.addEventListener("pageshow", function (e) {
                                (e.persisted || (void 0 !== window.performance && 2 === window.performance.navigation.type)) && H(".edgtf-wrapper-inner").show();
                            }),
                            edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout"))
                        )
                            H("a").on("click", function (e) {
                                var t = H(this);
                                ((t.parents(".edgtf-shopping-cart-dropdown").length || t.parent(".product-remove").length) && t.hasClass("remove")) ||
                                    (1 === e.which &&
                                        0 <= t.attr("href").indexOf(window.location.host) &&
                                        void 0 === t.data("rel") &&
                                        void 0 === t.attr("rel") &&
                                        !t.hasClass("lightbox-active") &&
                                        (void 0 === t.attr("target") || "_self" === t.attr("target")) &&
                                        t.attr("href").split("#")[0] !== window.location.href.split("#")[0] &&
                                        (e.preventDefault(),
                                        H(".edgtf-wrapper-inner").fadeOut(600, "easeOutSine", function () {
                                            window.location = t.attr("href");
                                        })));
                            });
                    }
                })(),
                (o = H(".edgtf-match-list-holder")).length &&
                    o.each(function () {
                        var e = H(this),
                            t = e.find(".edgtf-match");
                        e.appear(
                            function () {
                                t.each(function (e) {
                                    var t = H(this);
                                    setTimeout(function () {
                                        t.addClass("edgtf-appear");
                                    }, 300 * e);
                                });
                            },
                            { accX: 0, accY: -200 }
                        );
                    }),
                (n = H(".edgtf-text-decorated-title")).length &&
                    n.each(function () {
                        var e = H(this);
                        e.appear(
                            function () {
                                e.addClass("edgtf-appear");
                            },
                            { accX: 0, accY: 0 }
                        );
                    }),
                (d = H(".edgtf-blog-list-holder")).length &&
                    d.each(function () {
                        var e = H(this),
                            t = e.find(".edgtf-bl-item");
                        t.css({ opacity: 0, transform: "translateY(70px)" }),
                            e.appear(
                                function () {
                                    t.each(function (e) {
                                        var t = H(this);
                                        setTimeout(function () {
                                            t.css({ opacity: 1, transform: "translateY(0)", transition: ".5s cubic-bezier(0.25, 0.03, 0, 1.02)" });
                                        }, 100 * e);
                                    });
                                },
                                { accX: 0, accY: 0 }
                            );
                    }),
                edgtf.body.hasClass("edgtf-custom-cursor-enabled") &&
                    !edgtf.htmlEl.hasClass("touch") &&
                    (edgtf.body.append("<div class='edgtf-custom-cursor edgtf-custom-cursor-1'></div><div class='edgtf-custom-cursor edgtf-custom-cursor-2'></div>"),
                    setTimeout(function () {
                        var e = H(".edgtf-custom-cursor"),
                            o = H(".edgtf-custom-cursor-1"),
                            n = H(".edgtf-custom-cursor-2");
                        H(document).on("mousemove", function (e) {
                            var t = e.clientX,
                                a = e.clientY;
                            o.css({ transform: "matrix(1, 0, 0, 1, " + t + ", " + a + ")" }),
                                setTimeout(function () {
                                    n.css({ transform: "matrix(1, 0, 0, 1, " + t + ", " + a + ")" });
                                }, 12);
                        });
                        var t = "a, .add_to_cart_button, .single_add_to_cart_button, .button.wc-forward, .edgtf-btn";
                        H(document)
                            .on("mouseenter", t, function () {
                                e.addClass("edgtf-custom-cursor-link");
                            })
                            .on("mouseleave", t, function () {
                                e.removeClass("edgtf-custom-cursor-link");
                            });
                        var a = ".owl-stage-outer, .swiper-wrapper";
                        H(document)
                            .on("mouseenter", a, function () {
                                e.addClass("edgtf-custom-cursor-drag");
                            })
                            .on("mouseleave", a, function () {
                                e.removeClass("edgtf-custom-cursor-drag");
                            });
                    }, 50)),
                (i = H(".edgtf-cf7-custom-form, .edgtf-cf7-newsletter")).length &&
                    i.each(function () {
                        var e = H(this),
                            t = e.find(".edgtf-custom-text-area"),
                            a = e.find(".edgtf-custom-text-input");
                        t.length &&
                            t
                                .find("textarea")
                                .on("focus", function () {
                                    t.addClass("edgtf-custom-cf-focus");
                                })
                                .on("blur", function () {
                                    t.removeClass("edgtf-custom-cf-focus");
                                });
                        a.length &&
                            a
                                .find("input")
                                .on("focus", function () {
                                    H(this).closest(".edgtf-custom-text-input").addClass("edgtf-custom-cf-focus");
                                })
                                .on("blur", function () {
                                    H(this).closest(".edgtf-custom-text-input").removeClass("edgtf-custom-cf-focus");
                                });
                    }),
                (s = H(".edgtf-image-behavior-custom-link")).length &&
                    s.each(function () {
                        var e = H(this);
                        e.appear(
                            function () {
                                e.css({ opacity: 1, transform: "translateY(0)" });
                            },
                            { accX: 0, accY: 0 }
                        );
                    });
        }
        function a() {
            A(), h().init();
        }
        function o() {
            c(), z();
        }
        function n(e) {
            i(e);
        }
        function d(e) {
            for (var t = [37, 38, 39, 40], a = t.length; a--; ) if (e.keyCode === t[a]) return void i(e);
        }
        function i(e) {
            (e = e || window.event).preventDefault && e.preventDefault(), (e.returnValue = !1);
        }
        ((edgtf.modules.common = e).edgtfFluidVideo = W),
            (e.edgtfEnableScroll = function () {
                window.removeEventListener && window.removeEventListener("wheel", n, { passive: !1 });
                window.onmousewheel = document.onmousewheel = document.onkeydown = null;
            }),
            (e.edgtfDisableScroll = function () {
                window.addEventListener && window.addEventListener("wheel", n, { passive: !1 });
                document.onkeydown = d;
            }),
            (e.edgtfOwlSlider = m),
            (e.edgtfInitParallax = A),
            (e.edgtfInitSelfHostedVideoPlayer = f),
            (e.edgtfSelfHostedVideoSize = z),
            (e.edgtfPrettyPhoto = g),
            (e.edgtfStickySidebarWidget = h),
            (e.getLoadMoreData = function (e) {
                var t = e.data(),
                    a = {};
                for (var o in t) t.hasOwnProperty(o) && void 0 !== t[o] && !1 !== t[o] && (a[o] = t[o]);
                return a;
            }),
            (e.setLoadMoreAjaxData = function (e, t) {
                var a = { action: t };
                for (var o in e) e.hasOwnProperty(o) && void 0 !== e[o] && !1 !== e[o] && (a[o] = e[o]);
                return a;
            }),
            (e.setFixedImageProportionSize = s),
            (e.edgtfInitPerfectScrollbar = function () {
                var a = { wheelSpeed: 0.6, suppressScrollX: !0 };
                return {
                    init: function (e) {
                        var t;
                        e.length &&
                            ((t = new PerfectScrollbar(e.selector, a)),
                            H(window).resize(function () {
                                t.update();
                            }));
                    },
                };
            }),
            (e.edgtfOnDocumentReady = t),
            (e.edgtfOnWindowLoad = a),
            (e.edgtfOnWindowResize = o),
            H(document).ready(t),
            H(window).load(a),
            H(window).resize(o);
        var r = function () {
            function i(t) {
                H(".edgtf-main-menu, .edgtf-mobile-nav, .edgtf-fullscreen-menu, .edgtf-vertical-menu").each(function () {
                    var e = H(this);
                    t.parents(e).length && (e.find(".edgtf-active-item").removeClass("edgtf-active-item"), t.parent().addClass("edgtf-active-item"), e.find("a").removeClass("current"), t.addClass("current"));
                });
            }
            var o = function (e) {
                    var t,
                        a = H(".edgtf-main-menu a, .edgtf-mobile-nav a, .edgtf-fullscreen-menu a, .edgtf-vertical-menu a"),
                        o = e,
                        n = "" !== o ? H('[data-edgtf-anchor="' + o + '"]') : "";
                    if ("" !== o && 0 < n.length) {
                        var d = n.offset().top;
                        return (
                            (t = d - s(d) - edgtfGlobalVars.vars.edgtfAddForAdminBar),
                            a.length &&
                                a.each(function () {
                                    var e = H(this);
                                    -1 < e.attr("href").indexOf(o) && i(e);
                                }),
                            edgtf.html.stop().animate({ scrollTop: Math.round(t) }, 1e3, function () {
                                history.pushState && history.pushState(null, "", "#" + o);
                            }),
                            !1
                        );
                    }
                },
                s = function (e) {
                    "edgtf-sticky-header-on-scroll-down-up" === edgtf.modules.stickyHeader.behaviour && (edgtf.modules.stickyHeader.isStickyVisible = e > edgtf.modules.header.stickyAppearAmount),
                        "edgtf-sticky-header-on-scroll-up" === edgtf.modules.stickyHeader.behaviour && e > edgtf.scroll && (edgtf.modules.stickyHeader.isStickyVisible = !1);
                    var t = edgtf.modules.stickyHeader.isStickyVisible ? edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight : edgtfPerPageVars.vars.edgtfHeaderTransparencyHeight;
                    return edgtf.windowWidth < 1025 && (t = 0), t;
                };
            return {
                init: function () {
                    var t, e, a;
                    H("[data-edgtf-anchor]").length &&
                        (edgtf.document.on("click", ".edgtf-main-menu a, .edgtf-fullscreen-menu a, a.edgtf-btn, .edgtf-anchor, .edgtf-mobile-nav a, .edgtf-vertical-menu a", function () {
                            var e,
                                t = H(this),
                                a = t.prop("hash").split("#")[1],
                                o = "" !== a ? H('[data-edgtf-anchor="' + a + '"]') : "";
                            if ("" !== a && 0 < o.length) {
                                var n = o.offset().top;
                                return (
                                    (e = n - s(n) - edgtfGlobalVars.vars.edgtfAddForAdminBar),
                                    i(t),
                                    edgtf.html.stop().animate({ scrollTop: Math.round(e) }, 1e3, function () {
                                        history.pushState && history.pushState(null, "", "#" + a);
                                    }),
                                    !1
                                );
                            }
                        }),
                        (e = H("[data-edgtf-anchor]")),
                        "/" !== (a = window.location.href.split("#")[0]).substr(-1) && (a += "/"),
                        e.waypoint(
                            function (e) {
                                "down" === e && ((t = 0 < H(this.element).length ? H(this.element).data("edgtf-anchor") : H(this).data("edgtf-anchor")), i(H("a[href='" + a + "#" + t + "']")));
                            },
                            { offset: "50%" }
                        ),
                        e.waypoint(
                            function (e) {
                                "up" === e && ((t = 0 < H(this.element).length ? H(this.element).data("edgtf-anchor") : H(this).data("edgtf-anchor")), i(H("a[href='" + a + "#" + t + "']")));
                            },
                            {
                                offset: function () {
                                    return -(H(this.element).outerHeight() - 150);
                                },
                            }
                        ),
                        H(window).load(function () {
                            var e;
                            "" !== (e = window.location.hash.split("#")[1]) && 0 < H('[data-edgtf-anchor="' + e + '"]').length && o(e);
                        }));
                },
            };
        };
        function l(e) {
            var t = H("#edgtf-back-to-top");
            t.removeClass("off on"), "on" === e ? t.addClass("on") : t.addClass("off");
        }
        function f() {
            var e = H(".edgtf-self-hosted-video");
            e.length && e.mediaelementplayer({ audioWidth: "100%" });
        }
        function z() {
            var e = H(".edgtf-self-hosted-video-holder .edgtf-video-wrap");
            e.length &&
                e.each(function () {
                    var e = H(this),
                        t = e.closest(".edgtf-self-hosted-video-holder").outerWidth(),
                        a = t / edgtf.videoRatio;
                    navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (e.parent().width(t), e.parent().height(a)),
                        e.width(t),
                        e.height(a),
                        e.find("video, .mejs-overlay, .mejs-poster").width(t),
                        e.find("video, .mejs-overlay, .mejs-poster").height(a);
                });
        }
        function W() {
            fluidvids.init({ selector: ["iframe"], players: ["www.youtube.com", "player.vimeo.com"] });
        }
        function g() {
            var e =
                '<div class="pp_pic_holder">                         <div class="ppt">&nbsp;</div>                         <div class="pp_top">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                         <div class="pp_content_container">                             <div class="pp_left">                             <div class="pp_right">                                 <div class="pp_content">                                     <div class="pp_loaderIcon"></div>                                     <div class="pp_fade">                                         <a href="#" class="pp_expand" title="' +
                edgtfGlobalVars.vars.ppExpand +
                '">' +
                edgtfGlobalVars.vars.ppExpand +
                '</a>                                         <div class="pp_hoverContainer">                                             <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a>                                             <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a>                                         </div>                                         <div id="pp_full_res"></div>                                         <div class="pp_details">                                             <div class="pp_nav">                                                 <a href="#" class="pp_arrow_previous">' +
                edgtfGlobalVars.vars.ppPrev +
                '</a>                                                 <p class="currentTextHolder">0/0</p>                                                 <a href="#" class="pp_arrow_next">' +
                edgtfGlobalVars.vars.ppNext +
                '</a>                                             </div>                                             <p class="pp_description"></p>                                             {pp_social}                                             <a class="pp_close" href="#">' +
                edgtfGlobalVars.vars.ppClose +
                '</a>                                         </div>                                     </div>                                 </div>                             </div>                             </div>                         </div>                         <div class="pp_bottom">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                     </div>                     <div class="pp_overlay"></div>';
            H("a[data-rel^='prettyPhoto']").prettyPhoto({
                hook: "data-rel",
                animation_speed: "normal",
                slideshow: !1,
                autoplay_slideshow: !1,
                opacity: 0.8,
                show_title: !0,
                allow_resize: !0,
                horizontal_padding: 0,
                default_width: 960,
                default_height: 540,
                counter_separator_label: "/",
                theme: "pp_default",
                hideflash: !1,
                wmode: "opaque",
                autoplay: !0,
                modal: !1,
                overlay_gallery: !1,
                keyboard_shortcuts: !0,
                deeplinking: !1,
                custom_markup: "",
                social_tools: !1,
                markup: e,
            });
        }
        function c() {
            var e = H(".edgtf-grid-masonry-list");
            e.length &&
                e.each(function () {
                    var e = H(this),
                        t = e.find(".edgtf-masonry-list-wrapper"),
                        a = e.find(".edgtf-masonry-grid-sizer").width();
                    t.waitForImages(function () {
                        t.isotope({ layoutMode: "packery", itemSelector: ".edgtf-item-space", percentPosition: !0, masonry: { columnWidth: ".edgtf-masonry-grid-sizer", gutter: ".edgtf-masonry-grid-gutter" } }),
                            (e.find(".edgtf-fixed-masonry-item").length || e.hasClass("edgtf-fixed-masonry-items")) && s(t, t.find(".edgtf-item-space"), a, !0),
                            setTimeout(function () {
                                A();
                            }, 600),
                            t.isotope("layout").css("opacity", 1);
                    });
                });
        }
        function s(e, t, a, o) {
            if (e.hasClass("edgtf-masonry-images-fixed") || !0 === o) {
                var n = parseInt(t.css("paddingLeft"), 10),
                    d = a - 2 * n,
                    i = e.find(".edgtf-masonry-size-small"),
                    s = e.find(".edgtf-masonry-size-large-width"),
                    r = e.find(".edgtf-masonry-size-large-height"),
                    l = e.find(".edgtf-masonry-size-large-width-height");
                i.css("height", d), r.css("height", Math.round(2 * (d + n))), 680 < edgtf.windowWidth ? (s.css("height", d), l.css("height", Math.round(2 * (d + n)))) : (s.css("height", Math.round(d / 2)), l.css("height", d));
            }
        }
        var u = function () {
            var e = H(".edgtf-icon-has-hover");
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            !(function (e) {
                                if (void 0 !== e.data("hover-color")) {
                                    var t = function (e) {
                                            e.data.icon.css("color", e.data.color);
                                        },
                                        a = e.data("hover-color"),
                                        o = e.css("color");
                                    "" !== a && (e.on("mouseenter", { icon: e, color: a }, t), e.on("mouseleave", { icon: e, color: o }, t));
                                }
                            })(H(this));
                        });
                },
            };
        };
        function A() {
            var e = H(".edgtf-parallax-row-holder");
            e.length &&
                e.each(function () {
                    var e = H(this),
                        t = e.data("parallax-bg-image"),
                        a = 0.4 * e.data("parallax-bg-speed"),
                        o = 0;
                    void 0 !== e.data("parallax-bg-height") && !1 !== e.data("parallax-bg-height") && (o = parseInt(e.data("parallax-bg-height"))),
                        e.css({ "background-image": "url(" + t + ")" }),
                        0 < o && e.css({ "min-height": o + "px", height: o + "px" }),
                        e.parallax("50%", a);
                });
        }
        function h() {
            var e = H(".edgtf-widget-sticky-sidebar"),
                t = H(".edgtf-page-header"),
                c = t.length ? t.outerHeight() : 0,
                i = 0,
                s = 0,
                r = 0,
                l = 0,
                u = [];
            function a() {
                u.length &&
                    H.each(u, function (e) {
                        u[e].object;
                        var t = u[e].offset,
                            a = u[e].position,
                            o = u[e].height,
                            n = u[e].width,
                            d = u[e].sidebarHolder,
                            i = u[e].sidebarHolderHeight;
                        if (edgtf.body.hasClass("edgtf-fixed-on-scroll")) {
                            var s = H(".edgtf-fixed-wrapper.fixed");
                            s.length && (c = s.outerHeight() + edgtfGlobalVars.vars.edgtfAddForAdminBar);
                        } else edgtf.body.hasClass("edgtf-no-behavior") && (c = edgtfGlobalVars.vars.edgtfAddForAdminBar);
                        if (1024 < edgtf.windowWidth && d.length) {
                            var r = -(a - c),
                                l = o - a - 40,
                                f = i + t - c - a - edgtfGlobalVars.vars.edgtfTopBarHeight;
                            if (edgtf.scroll >= t - c && o < i)
                                if (
                                    (d.hasClass("edgtf-sticky-sidebar-appeared")
                                        ? d.css({ top: r + "px" })
                                        : d
                                              .addClass("edgtf-sticky-sidebar-appeared")
                                              .css({ position: "fixed", top: r + "px", width: n, "margin-top": "-10px" })
                                              .animate({ "margin-top": "0" }, 200),
                                    edgtf.scroll + l >= f)
                                ) {
                                    var g = i - l + r - c;
                                    d.css({ position: "absolute", top: g + "px" });
                                } else d.hasClass("edgtf-sticky-sidebar-appeared") && d.css({ position: "fixed", top: r + "px" });
                            else d.removeClass("edgtf-sticky-sidebar-appeared").css({ position: "relative", top: "0", width: "auto" });
                        } else d.removeClass("edgtf-sticky-sidebar-appeared").css({ position: "relative", top: "0", width: "auto" });
                    });
            }
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            var e = H(this),
                                t = e.parents("aside.edgtf-sidebar"),
                                a = e.parents(".wpb_widgetised_column"),
                                o = "",
                                n = 0;
                            if (((i = e.offset().top), (s = e.position().top), (l = r = 0), t.length)) {
                                (r = t.outerHeight()), (l = t.outerWidth()), (n = (o = t).parent().parent().outerHeight());
                                var d = t.parent().parent().find(".edgtf-blog-holder");
                                d.length && (n -= parseInt(d.css("marginBottom")));
                            } else a.length && ((r = a.outerHeight()), (l = a.outerWidth()), (n = (o = a).parents(".vc_row").outerHeight()));
                            u.push({ object: e, offset: i, position: s, height: r, width: l, sidebarHolder: o, sidebarHolderHeight: n });
                        }),
                        a(),
                        H(window).scroll(function () {
                            a();
                        });
                },
                reInit: a,
            };
        }
        function m() {
            var e = H(".edgtf-owl-slider");
            e.length &&
                e.each(function () {
                    var a,
                        t = H(this),
                        e = H(this),
                        o = t.children().length,
                        n = 1,
                        d = !0,
                        i = !0,
                        s = !0,
                        r = 5e3,
                        l = 600,
                        f = 0,
                        g = 0,
                        c = 0,
                        u = 0,
                        h = !1,
                        m = !1,
                        p = !1,
                        v = !1,
                        b = !1,
                        y = !0,
                        w = !1,
                        C = !1,
                        k = !!t.hasClass("edgtf-list-is-slider"),
                        x = k ? t.parent() : t;
                    if ((void 0 === t.data("number-of-items") || !1 === t.data("number-of-items") || k || (n = t.data("number-of-items")), void 0 !== x.data("number-of-columns") && !1 !== x.data("number-of-columns") && k))
                        switch (x.data("number-of-columns")) {
                            case "one":
                                n = 1;
                                break;
                            case "two":
                                n = 2;
                                break;
                            case "three":
                                n = 3;
                                break;
                            case "four":
                                n = 4;
                                break;
                            case "five":
                                n = 5;
                                break;
                            case "six":
                                n = 6;
                                break;
                            default:
                                n = 4;
                        }
                    if (
                        ("no" === x.data("enable-loop") && (d = !1),
                        "no" === x.data("enable-autoplay") && (i = !1),
                        "no" === x.data("enable-autoplay-hover-pause") && (s = !1),
                        void 0 !== x.data("slider-speed") && !1 !== x.data("slider-speed") && (r = x.data("slider-speed")),
                        void 0 !== x.data("slider-speed-animation") && !1 !== x.data("slider-speed-animation") && (l = x.data("slider-speed-animation")),
                        t.parent().hasClass("edgtf-huge-space")
                            ? (f = 60)
                            : t.parent().hasClass("edgtf-large-space")
                            ? (f = 50)
                            : t.parent().hasClass("edgtf-medium-space")
                            ? (f = 40)
                            : t.parent().hasClass("edgtf-normal-space")
                            ? (f = 30)
                            : t.parent().hasClass("edgtf-small-space")
                            ? (f = 20)
                            : t.parent().hasClass("edgtf-tiny-space") && (f = 10),
                        "yes" === x.data("slider-padding") && ((h = !0), (u = parseInt(0.28 * t.outerWidth())), (f = 50)),
                        "yes" === x.data("slider-custom-padding") && ((h = !0), void (u = 0) !== x.data("slider-custom-padding-value")))
                    ) {
                        var _ = parseFloat(x.data("slider-custom-padding-value"));
                        (isNaN(_) || _ < 0 || 1 < _) && (_ = 0), (u = parseInt(t.outerWidth() * _, 10));
                    }
                    void 0 !== x.data("slider-margin") && !1 !== x.data("slider-margin") && (f = "no" === x.data("slider-margin") ? 0 : x.data("slider-margin")),
                        "yes" === x.data("enable-center") && (m = !0),
                        "yes" === x.data("enable-auto-width") && (p = !0),
                        void 0 !== x.data("slider-animate-in") && !1 !== x.data("slider-animate-in") && (v = x.data("slider-animate-in")),
                        void 0 !== x.data("slider-animate-out") && !1 !== x.data("slider-animate-out") && (b = x.data("slider-animate-out")),
                        "no" === x.data("enable-navigation") && (y = !1),
                        "yes" === x.data("enable-pagination") && (w = !0),
                        "yes" === x.data("enable-thumbnail") && (C = !0),
                        C && !w && ((w = !0), e.addClass("edgtf-slider-hide-pagination")),
                        y && w && t.addClass("edgtf-slider-has-both-nav"),
                        o <= 1 && (w = y = i = d = !1);
                    var S = 2,
                        I = 3,
                        O = n,
                        D = n;
                    if (
                        (n < 3 && (I = S = n),
                        4 < n && (O = 4),
                        5 < n && (D = 5),
                        (h || 30 < f) && ((g = 20), (c = 30)),
                        0 < f && f <= 30 && (c = g = f),
                        t.waitForImages(function () {
                            e = t.owlCarousel({
                                items: n,
                                loop: d,
                                autoplay: i,
                                autoplayHoverPause: s,
                                autoplayTimeout: r,
                                smartSpeed: l,
                                margin: f,
                                stagePadding: u,
                                center: m,
                                autoWidth: p,
                                animateIn: v,
                                animateOut: b,
                                dots: w,
                                nav: y,
                                navText: ['<span class="edgtf-prev-icon ' + edgtfGlobalVars.vars.sliderNavPrevArrow + '"></span>', '<span class="edgtf-next-icon ' + edgtfGlobalVars.vars.sliderNavNextArrow + '"></span>'],
                                responsive: { 0: { items: 1, margin: g, stagePadding: 0, center: m, autoWidth: !1 }, 681: { items: S, margin: c }, 769: { items: I, margin: c }, 1025: { items: O }, 1281: { items: D }, 1367: { items: n } },
                                onInitialize: function () {
                                    t.css("visibility", "visible"),
                                        A(),
                                        (t.find("iframe").length || t.find("video").length) &&
                                            setTimeout(function () {
                                                z(), W();
                                            }, 500),
                                        C && a.find(".edgtf-slider-thumbnail-item:first-child").addClass("active");
                                },
                                onRefreshed: function () {
                                    if (!0 === p) {
                                        var e = parseInt(t.find(".owl-stage").css("width"));
                                        t.find(".owl-stage").css("width", e + 1 + "px");
                                    }
                                },
                                onTranslate: function (e) {
                                    if (C) {
                                        var t = e.page.index + 1;
                                        a.find(".edgtf-slider-thumbnail-item.active").removeClass("active"), a.find(".edgtf-slider-thumbnail-item:nth-child(" + t + ")").addClass("active");
                                    }
                                },
                                onDrag: function (e) {
                                    edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && 0 < e.isTrigger && t.addClass("edgtf-slider-is-moving");
                                },
                                onDragged: function () {
                                    edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") &&
                                        t.hasClass("edgtf-slider-is-moving") &&
                                        setTimeout(function () {
                                            t.removeClass("edgtf-slider-is-moving");
                                        }, 500);
                                },
                            });
                        }),
                        C)
                    ) {
                        a = t.parent().find(".edgtf-slider-thumbnail");
                        var T = "";
                        switch (parseInt(a.data("thumbnail-count")) % 6) {
                            case 2:
                                T = "two";
                                break;
                            case 3:
                                T = "three";
                                break;
                            case 4:
                                T = "four";
                                break;
                            case 5:
                                T = "five";
                                break;
                            case 0:
                            default:
                                T = "six";
                        }
                        "" !== T && a.addClass("edgtf-slider-columns-" + T),
                            a.find(".edgtf-slider-thumbnail-item").on("click", function () {
                                H(this).siblings(".active").removeClass("active"), H(this).addClass("active"), e.trigger("to.owl.carousel", [H(this).index(), l]);
                            });
                    }
                });
        }
    })(jQuery),
    (function (f) {
        "use strict";
        var e = {};
        function t() {
            var t;
            g(),
                ((t = f(".edgtf-blog-holder.edgtf-blog-single .edgtf-blog-single-navigation")),
                {
                    init: function () {
                        var e;
                        t.length &&
                            ((e = t),
                            f(window).on("scroll load", function () {
                                0 < f(window).scrollTop() ? e.addClass("edgtf-appeared") : e.removeClass("edgtf-appeared");
                            }));
                    },
                }).init();
        }
        function a() {
            n().init();
        }
        function o() {
            n().scroll();
        }
        function g() {
            var e = f("audio.edgtf-blog-audio");
            e.length && e.mediaelementplayer({ audioWidth: "100%" });
        }
        function n() {
            function a(e) {
                var t = e.outerHeight() + e.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar;
                !e.hasClass("edgtf-blog-pagination-infinite-scroll-started") && edgtf.scroll + edgtf.windowHeight > t && o(e);
            }
            var e = f(".edgtf-blog-holder"),
                o = function (a) {
                    var o,
                        e,
                        n = a.children(".edgtf-blog-holder-inner");
                    void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (e = a.data("max-num-pages")), a.hasClass("edgtf-blog-pagination-infinite-scroll") && a.addClass("edgtf-blog-pagination-infinite-scroll-started");
                    var t = edgtf.modules.common.getLoadMoreData(a),
                        d = a.find(".edgtf-blog-pag-loading");
                    o = t.nextPage;
                    var i = a.find('input[name*="edgtf_blog_load_more_nonce_"]');
                    if (((t.blog_load_more_id = i.attr("name").substring(i.attr("name").length - 4, i.attr("name").length)), (t.blog_load_more_nonce = i.val()), o <= e)) {
                        d.addClass("edgtf-showing");
                        var s = edgtf.modules.common.setLoadMoreAjaxData(t, "overworld_edge_blog_load_more");
                        f.ajax({
                            type: "POST",
                            data: s,
                            url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                            success: function (e) {
                                o++, a.data("next-page", o);
                                var t = f.parseJSON(e).html;
                                a.waitForImages(function () {
                                    a.hasClass("edgtf-grid-masonry-list") ? (r(n, d, t), edgtf.modules.common.setFixedImageProportionSize(a, a.find("article"), n.find(".edgtf-masonry-grid-sizer").width())) : l(n, d, t),
                                        setTimeout(function () {
                                            g(),
                                                edgtf.modules.common.edgtfOwlSlider(),
                                                edgtf.modules.common.edgtfFluidVideo(),
                                                edgtf.modules.common.edgtfInitSelfHostedVideoPlayer(),
                                                edgtf.modules.common.edgtfSelfHostedVideoSize(),
                                                "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit(),
                                                f(document.body).trigger("blog_list_load_more_trigger");
                                        }, 400);
                                }),
                                    a.hasClass("edgtf-blog-pagination-infinite-scroll-started") && a.removeClass("edgtf-blog-pagination-infinite-scroll-started");
                            },
                        });
                    }
                    o === e && a.find(".edgtf-blog-pag-load-more").hide();
                },
                r = function (e, t, a) {
                    e.append(a).isotope("reloadItems").isotope({ sortBy: "original-order" }),
                        t.removeClass("edgtf-showing"),
                        setTimeout(function () {
                            e.isotope("layout");
                        }, 600);
                },
                l = function (e, t, a) {
                    t.removeClass("edgtf-showing"), e.append(a);
                };
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            var t,
                                e = f(this);
                            e.hasClass("edgtf-blog-pagination-load-more") &&
                                (t = e).find(".edgtf-blog-pag-load-more a").on("click", function (e) {
                                    e.preventDefault(), e.stopPropagation(), o(t);
                                }),
                                e.hasClass("edgtf-blog-pagination-infinite-scroll") && a(e);
                        });
                },
                scroll: function () {
                    e.length &&
                        e.each(function () {
                            var e = f(this);
                            e.hasClass("edgtf-blog-pagination-infinite-scroll") && a(e);
                        });
                },
            };
        }
        ((edgtf.modules.blog = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowLoad = a), (e.edgtfOnWindowScroll = o), f(document).ready(t), f(window).load(a), f(window).scroll(o);
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                if (n("body:not(.error404) .edgtf-footer-uncover").length && !edgtf.htmlEl.hasClass("touch")) {
                    var e = n("footer"),
                        t = e.outerHeight(),
                        a = n(".edgtf-content"),
                        o = function () {
                            a.css("margin-bottom", t), e.css("height", t);
                        };
                    o(),
                        n(window).resize(function () {
                            (t = e.find(".edgtf-footer-inner").outerHeight()), o();
                        });
                }
            })();
        }
        ((edgtf.modules.footer = e).edgtfOnWindowLoad = t), n(window).load(t);
    })(jQuery),
    (function (r) {
        "use strict";
        var e = {};
        function t() {
            o(),
                setTimeout(function () {
                    r(".edgtf-drop-down > ul > li").each(function () {
                        var i = r(this);
                        i.find(".second").length &&
                            i.waitForImages(function () {
                                var e = i.find(".second"),
                                    t = edgtf.menuDropdownHeightSet ? 0 : e.outerHeight();
                                if (i.hasClass("wide")) {
                                    var a = 0,
                                        o = e.find("> .inner > ul > li");
                                    o.each(function () {
                                        var e = r(this).outerHeight();
                                        a < e && (a = e);
                                    }),
                                        o.css("height", "").height(a),
                                        edgtf.menuDropdownHeightSet || (t = e.outerHeight());
                                }
                                if ((edgtf.menuDropdownHeightSet || e.height(0), navigator.userAgent.match(/(iPod|iPhone|iPad)/)))
                                    i.on("touchstart mouseenter", function () {
                                        e.css({ height: t, overflow: "visible", visibility: "visible", opacity: "1" });
                                    }).on("mouseleave", function () {
                                        e.css({ height: "0px", overflow: "hidden", visibility: "hidden", opacity: "0" });
                                    });
                                else if (edgtf.body.hasClass("edgtf-dropdown-animate-height")) {
                                    var n = {
                                        interval: 0,
                                        over: function () {
                                            setTimeout(function () {
                                                e.addClass("edgtf-drop-down-start").css({ visibility: "visible", height: "0", opacity: "1" }),
                                                    e.stop().animate({ height: t }, 400, "easeInOutQuint", function () {
                                                        e.css("overflow", "visible");
                                                    });
                                            }, 100);
                                        },
                                        timeout: 100,
                                        out: function () {
                                            e.stop().animate({ height: "0", opacity: 0 }, 100, function () {
                                                e.css({ overflow: "hidden", visibility: "hidden" });
                                            }),
                                                e.removeClass("edgtf-drop-down-start");
                                        },
                                    };
                                    i.hoverIntent(n);
                                } else {
                                    var d = {
                                        interval: 0,
                                        over: function () {
                                            setTimeout(function () {
                                                e.addClass("edgtf-drop-down-start").stop().css({ height: t });
                                            }, 150);
                                        },
                                        timeout: 150,
                                        out: function () {
                                            e.stop().css({ height: "0" }).removeClass("edgtf-drop-down-start");
                                        },
                                    };
                                    i.hoverIntent(d);
                                }
                            });
                    }),
                        r(".edgtf-drop-down ul li.wide ul li a").on("click", function (e) {
                            if (1 === e.which) {
                                var t = r(this);
                                setTimeout(function () {
                                    t.mouseleave();
                                }, 500);
                            }
                        }),
                        (edgtf.menuDropdownHeightSet = !0);
                }, 100);
        }
        function a() {
            n();
        }
        function o() {
            var e = r(".edgtf-drop-down > ul > li.narrow.menu-item-has-children");
            e.length &&
                e.each(function (e) {
                    var t,
                        a = r(this),
                        o = a.offset().left,
                        n = a.find(".second"),
                        d = n.find(".inner ul"),
                        i = d.outerWidth(),
                        s = edgtf.windowWidth - o;
                    edgtf.body.hasClass("edgtf-boxed") && (s = edgtf.boxedLayoutWidth - (o - (edgtf.windowWidth - edgtf.boxedLayoutWidth) / 2)),
                        0 < a.find("li.sub").length && (t = s - i),
                        n.removeClass("right"),
                        d.removeClass("right"),
                        (s < i || t < i) && (n.addClass("right"), d.addClass("right"));
                });
        }
        function n() {
            var e = r(".edgtf-drop-down > ul > li.wide");
            e.length &&
                e.each(function (e) {
                    var t = r(this).find(".second");
                    if (t.length && !t.hasClass("left_position") && !t.hasClass("right_position")) {
                        t.css("left", 0);
                        var a = t.offset().left;
                        if (edgtf.body.hasClass("edgtf-boxed")) {
                            var o = r(".edgtf-boxed .edgtf-wrapper .edgtf-wrapper-inner").outerWidth();
                            (a -= (edgtf.windowWidth - o) / 2), t.css({ left: -a, width: o });
                        } else edgtf.body.hasClass("edgtf-wide-dropdown-menu-in-grid") ? t.css({ left: -a + (edgtf.windowWidth - edgtf.gridWidth()) / 2, width: edgtf.gridWidth() }) : t.css({ left: -a, width: edgtf.windowWidth });
                    }
                });
        }
        ((edgtf.modules.header = e).edgtfSetDropDownMenuPosition = o), (e.edgtfSetDropDownWideMenuPosition = n), (e.edgtfOnDocumentReady = t), (e.edgtfOnWindowLoad = a), r(document).ready(t), r(window).load(a);
    })(jQuery),
    (function (f) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                var o,
                    n = f(".edgtf-wrapper"),
                    d = f(".edgtf-side-menu"),
                    i = f("a.edgtf-side-menu-button-opener"),
                    s = !1,
                    r = !1,
                    l = !1;
                edgtf.body.hasClass("edgtf-side-menu-slide-from-right")
                    ? (f(".edgtf-cover").remove(), (o = "edgtf-right-side-menu-opened"), n.prepend('<div class="edgtf-cover"/>'), (s = !0))
                    : edgtf.body.hasClass("edgtf-side-menu-slide-with-content")
                    ? ((o = "edgtf-side-menu-open"), (r = !0))
                    : edgtf.body.hasClass("edgtf-side-area-uncovered-from-content") && ((o = "edgtf-right-side-menu-opened"), (l = !0));
                f("a.edgtf-side-menu-button-opener, a.edgtf-close-side-menu").on("click", function (e) {
                    if (
                        (e.preventDefault(),
                        n.one("wheel", function () {
                            i.hasClass("opened") && (edgtf.modules.common.edgtfEnableScroll(), i.removeClass("opened"), edgtf.body.removeClass("edgtf-side-menu-open"));
                        }),
                        i.hasClass("opened"))
                    ) {
                        if ((edgtf.modules.common.edgtfEnableScroll(), i.removeClass("opened"), edgtf.body.removeClass(o), l))
                            var t = setTimeout(function () {
                                d.css({ visibility: "hidden" }), clearTimeout(t);
                            }, 400);
                    } else {
                        edgtf.modules.common.edgtfDisableScroll(),
                            i.addClass("opened"),
                            edgtf.body.addClass(o),
                            s &&
                                f(".edgtf-wrapper .edgtf-cover").on("click", function () {
                                    edgtf.modules.common.edgtfEnableScroll(), edgtf.body.removeClass("edgtf-right-side-menu-opened"), i.removeClass("opened");
                                }),
                            l && d.css({ visibility: "visible" });
                        var a = f(window).scrollTop();
                        f(window).scroll(function () {
                            if (400 < Math.abs(edgtf.scroll - a) && (edgtf.modules.common.edgtfEnableScroll(), edgtf.body.removeClass(o), i.removeClass("opened"), l))
                                var e = setTimeout(function () {
                                    d.css({ visibility: "hidden" }), clearTimeout(e);
                                }, 400);
                        });
                    }
                    r &&
                        (e.stopPropagation(),
                        n.on("click", function () {
                            e.preventDefault(), edgtf.modules.common.edgtfEnableScroll(), i.removeClass("opened"), edgtf.body.removeClass("edgtf-side-menu-open");
                        }));
                }),
                    d.length && edgtf.modules.common.edgtfInitPerfectScrollbar().init(d);
            })();
        }
        ((edgtf.modules.sidearea = e).edgtfOnDocumentReady = t), f(document).ready(t);
    })(jQuery),
    (function (s) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                var e = s(".edgtf-subscribe-popup-holder"),
                    t = s(".edgtf-sp-close");
                if (e.length) {
                    var a = e.find(".edgtf-sp-prevent"),
                        o = "no";
                    if (a.length) {
                        var n = e.hasClass("edgtf-sp-prevent-cookies"),
                            d = a.find(".edgtf-sp-prevent-input"),
                            i = d.data("value");
                        n ? ((o = localStorage.getItem("disabledPopup")), sessionStorage.removeItem("disabledPopup")) : ((o = sessionStorage.getItem("disabledPopup")), localStorage.removeItem("disabledPopup")),
                            a.children().on("click", function (e) {
                                "yes" !== i ? ((i = "yes"), d.addClass("edgtf-sp-prevent-clicked").data("value", "yes")) : ((i = "no"), d.removeClass("edgtf-sp-prevent-clicked").data("value", "no")),
                                    "yes" === i
                                        ? n
                                            ? localStorage.setItem("disabledPopup", "yes")
                                            : sessionStorage.setItem("disabledPopup", "yes")
                                        : n
                                        ? localStorage.setItem("disabledPopup", "no")
                                        : sessionStorage.setItem("disabledPopup", "no");
                            });
                    }
                    "yes" !== o &&
                        (edgtf.body.hasClass("edgtf-sp-opened") ? (edgtf.body.removeClass("edgtf-sp-opened"), edgtf.modules.common.edgtfEnableScroll()) : (edgtf.body.addClass("edgtf-sp-opened"), edgtf.modules.common.edgtfDisableScroll()),
                        t.on("click", function (e) {
                            e.preventDefault(), edgtf.body.removeClass("edgtf-sp-opened"), edgtf.modules.common.edgtfEnableScroll();
                        }),
                        s(document).keyup(function (e) {
                            27 === e.keyCode && (edgtf.body.removeClass("edgtf-sp-opened"), edgtf.modules.common.edgtfEnableScroll());
                        }));
                }
            })();
        }
        ((edgtf.modules.subscribePopup = e).edgtfOnWindowLoad = t), s(window).load(t);
    })(jQuery),
    (function (s) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                var e = s(".edgtf-title-holder.edgtf-bg-parallax");
                if (0 < e.length && 1024 < edgtf.windowWidth) {
                    var t = e.hasClass("edgtf-bg-parallax-zoom-out"),
                        a = parseInt(e.data("height")),
                        o = parseInt(e.data("background-width")),
                        n = (a / 1e4) * 7,
                        d = -edgtf.scroll * n,
                        i = edgtfGlobalVars.vars.edgtfAddForAdminBar;
                    e.css({ "background-position": "center " + (d + i) + "px" }),
                        t && e.css({ "background-size": o - edgtf.scroll + "px auto" }),
                        s(window).scroll(function () {
                            (d = -edgtf.scroll * n), e.css({ "background-position": "center " + (d + i) + "px" }), t && e.css({ "background-size": o - edgtf.scroll + "px auto" });
                        });
                }
            })();
        }
        ((edgtf.modules.title = e).edgtfOnDocumentReady = t), s(document).ready(t);
    })(jQuery),
    (function (r) {
        "use strict";
        var e = {};
        function t() {
            var e;
            r(document).on("click", ".edgtf-quantity-minus, .edgtf-quantity-plus", function (e) {
                e.stopPropagation();
                var t,
                    a = r(this),
                    o = a.siblings(".edgtf-quantity-input"),
                    n = parseFloat(o.data("step")),
                    d = parseFloat(o.data("max")),
                    i = !1,
                    s = parseFloat(o.val());
                a.hasClass("edgtf-quantity-minus") && (i = !0), i ? (1 <= (t = s - n) ? o.val(t) : o.val(0)) : ((t = s + n), void 0 === d ? o.val(t) : d <= t ? o.val(d) : o.val(t)), o.trigger("change");
            }),
                (function () {
                    var e = r(".woocommerce-ordering .orderby");
                    e.length && e.select2({ minimumResultsForSearch: 1 / 0 });
                    var t = r(".edgtf-woocommerce-page .edgtf-content .variations td.value select");
                    t.length && t.select2();
                    var a = r("#calc_shipping_country");
                    a.length && a.select2();
                    var o = r(".cart-collaterals .shipping select#calc_shipping_state");
                    o.length && o.select2();
                    var n = r(".widget.widget_archive select, .widget.widget_categories select, .widget.widget_text select");
                    n.length && "function" == typeof n.select2 && n.select2();
                })(),
                (e = r(".edgtf-woo-single-page.edgtf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image")).length &&
                    (e.children("a").attr("data-rel", "prettyPhoto[woo_single_pretty_photo]"), "function" == typeof edgtf.modules.common.edgtfPrettyPhoto && edgtf.modules.common.edgtfPrettyPhoto());
        }
        ((edgtf.modules.woocommerce = e).edgtfOnDocumentReady = t), r(document).ready(t);
    })(jQuery),
    (function (h) {
        "use strict";
        var e = {};
        function t() {
            o().init();
        }
        function a() {
            o().scroll();
        }
        function o() {
            function n(e) {
                var t = e.outerHeight() + e.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar;
                !e.hasClass("edgtf-bl-pag-infinite-scroll-started") && edgtf.scroll + edgtf.windowHeight > t && d(e);
            }
            var e = h(".edgtf-blog-list-holder"),
                d = function (a, e) {
                    var o,
                        n,
                        d = a.find(".edgtf-blog-list");
                    void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (n = a.data("max-num-pages")),
                        a.hasClass("edgtf-bl-pag-standard-shortcodes") && a.data("next-page", e),
                        a.hasClass("edgtf-bl-pag-infinite-scroll") && a.addClass("edgtf-bl-pag-infinite-scroll-started");
                    var t = edgtf.modules.common.getLoadMoreData(a),
                        i = a.find(".edgtf-blog-pag-loading");
                    o = t.nextPage;
                    var s = a.find('input[name*="edgtf_blog_load_more_nonce_"]');
                    if (((t.blog_load_more_id = s.attr("name").substring(s.attr("name").length - 4, s.attr("name").length)), (t.blog_load_more_nonce = s.val()), o <= n)) {
                        a.hasClass("edgtf-bl-pag-standard-shortcodes") ? (i.addClass("edgtf-showing edgtf-standard-pag-trigger"), a.addClass("edgtf-bl-pag-standard-shortcodes-animate")) : i.addClass("edgtf-showing");
                        var r = edgtf.modules.common.setLoadMoreAjaxData(t, "overworld_edge_blog_shortcode_load_more");
                        h.ajax({
                            type: "POST",
                            data: r,
                            url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                            success: function (e) {
                                a.hasClass("edgtf-bl-pag-standard-shortcodes") || o++, a.data("next-page", o);
                                var t = h.parseJSON(e).html;
                                a.hasClass("edgtf-bl-pag-standard-shortcodes")
                                    ? (l(a, n, o),
                                      a.waitForImages(function () {
                                          a.hasClass("edgtf-bl-masonry") ? f(a, d, i, t) : (g(a, d, i, t), "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit());
                                      }))
                                    : a.waitForImages(function () {
                                          a.hasClass("edgtf-bl-masonry") ? c(d, i, t) : (u(d, i, t), "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit());
                                      }),
                                    a.hasClass("edgtf-bl-pag-infinite-scroll-started") && a.removeClass("edgtf-bl-pag-infinite-scroll-started");
                            },
                        });
                    }
                    o === n && a.find(".edgtf-blog-pag-load-more").hide();
                },
                l = function (e, t, a) {
                    var o = e.find(".edgtf-bl-standard-pagination"),
                        n = o.find("li.edgtf-pag-number"),
                        d = o.find("li.edgtf-pag-prev a"),
                        i = o.find("li.edgtf-pag-next a");
                    n.removeClass("edgtf-pag-active"),
                        n.eq(a - 1).addClass("edgtf-pag-active"),
                        d.data("paged", a - 1),
                        i.data("paged", a + 1),
                        1 < a ? d.css({ opacity: "1" }) : d.css({ opacity: "0" }),
                        a === t ? i.css({ opacity: "0" }) : i.css({ opacity: "1" });
                },
                f = function (e, t, a, o) {
                    var n = "";
                    t.children('[class*="-grid-sizer"]').length && (n += t.children('[class*="-grid-sizer"]')[0].outerHTML),
                        t.children('[class*="-grid-gutter"]').length && (n += t.children('[class*="-grid-gutter"]')[0].outerHTML),
                        t
                            .html(n + o)
                            .isotope("reloadItems")
                            .isotope({ sortBy: "original-order" }),
                        a.removeClass("edgtf-showing edgtf-standard-pag-trigger"),
                        e.removeClass("edgtf-bl-pag-standard-shortcodes-animate"),
                        setTimeout(function () {
                            t.isotope("layout"), "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit();
                        }, 600);
                },
                g = function (e, t, a, o) {
                    a.removeClass("edgtf-showing edgtf-standard-pag-trigger"), e.removeClass("edgtf-bl-pag-standard-shortcodes-animate"), t.html(o);
                },
                c = function (e, t, a) {
                    e.append(a).isotope("reloadItems").isotope({ sortBy: "original-order" }),
                        t.removeClass("edgtf-showing"),
                        setTimeout(function () {
                            e.isotope("layout"), "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit();
                        }, 600);
                },
                u = function (e, t, a) {
                    t.removeClass("edgtf-showing"), e.append(a);
                };
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            var o,
                                e,
                                t,
                                a = h(this);
                            a.hasClass("edgtf-bl-pag-standard-shortcodes") &&
                                (e = (o = a).find(".edgtf-bl-standard-pagination li")).length &&
                                e.each(function () {
                                    var t = h(this).children("a"),
                                        a = 1;
                                    t.on("click", function (e) {
                                        e.preventDefault(), e.stopPropagation(), void 0 !== t.data("paged") && !1 !== t.data("paged") && (a = t.data("paged")), d(o, a);
                                    });
                                }),
                                a.hasClass("edgtf-bl-pag-load-more") &&
                                    (t = a).find(".edgtf-blog-pag-load-more a").on("click", function (e) {
                                        e.preventDefault(), e.stopPropagation(), d(t);
                                    }),
                                a.hasClass("edgtf-bl-pag-infinite-scroll") && n(a);
                        });
                },
                scroll: function () {
                    e.length &&
                        e.each(function () {
                            var e = h(this);
                            e.hasClass("edgtf-bl-pag-infinite-scroll") && n(e);
                        });
                },
            };
        }
        ((edgtf.modules.blogListSC = e).edgtfOnWindowLoad = t), (e.edgtfOnWindowScroll = a), h(window).load(t), h(window).scroll(a);
    })(jQuery),
    (function (e) {
        "use strict";
        var t = {};
        function a() {
            n();
        }
        function o() {
            n();
        }
        function n() {
            if (edgtf.body.hasClass("edgtf-header-divided")) {
                var t = e(".edgtf-menu-area, .edgtf-sticky-header"),
                    a = t.width(),
                    o = parseInt(t.find(".edgtf-vertical-align-containers").css("paddingLeft"), 10),
                    n = e(".edgtf-main-menu > ul > li > a"),
                    d = 0,
                    i = t.find(".edgtf-logo-wrapper .edgtf-normal-logo"),
                    s = 0;
                t.waitForImages(function () {
                    t.find(".edgtf-grid").length && (a = t.find(".edgtf-grid").outerWidth()), n.length && (d = parseInt(n.css("paddingLeft"), 10)), i.length && (s = i.width() / 2);
                    var e = Math.round(a / 2 - d - s - o);
                    t.find(".edgtf-position-left").width(e),
                        t.find(".edgtf-position-right").width(e),
                        t.css("opacity", 1),
                        "function" == typeof edgtf.modules.header.edgtfSetDropDownMenuPosition && edgtf.modules.header.edgtfSetDropDownMenuPosition(),
                        "function" == typeof edgtf.modules.header.edgtfSetDropDownWideMenuPosition && edgtf.modules.header.edgtfSetDropDownWideMenuPosition();
                });
            }
        }
        ((edgtf.modules.headerDivided = t).edgtfOnDocumentReady = a), (t.edgtfOnWindowResize = o), e(document).ready(a), e(window).resize(o);
    })(jQuery),
    (function (g) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                var t = g("a.edgtf-fullscreen-menu-opener"),
                    e = g(".edgtf-fullscreen-menu-outer");
                if (t.length) {
                    var a,
                        o = g(".edgtf-fullscreen-menu-holder-outer"),
                        n = !1,
                        d = !1,
                        i = g(".edgtf-fullscreen-above-menu-widget-holder"),
                        s = g(".edgtf-fullscreen-below-menu-widget-holder"),
                        r = g(".edgtf-fullscreen-menu-holder-outer nav > ul > li > a"),
                        l = g(".edgtf-fullscreen-menu > ul li.has_sub > a"),
                        f = g(".edgtf-fullscreen-menu ul li:not(.has_sub) a");
                    edgtf.modules.common.edgtfInitPerfectScrollbar().init(o),
                        g(window).resize(function () {
                            o.height(edgtf.windowHeight);
                        }),
                        edgtf.body.hasClass("edgtf-fade-push-text-right") ? ((a = "edgtf-push-nav-right"), (n = !0)) : edgtf.body.hasClass("edgtf-fade-push-text-top") && ((a = "edgtf-push-text-top"), (d = !0)),
                        (n || d) &&
                            (i.length && i.children().css({ "-webkit-animation-delay": "0ms", "-moz-animation-delay": "0ms", "animation-delay": "0ms" }),
                            r.each(function (e) {
                                g(this).css({ "-webkit-animation-delay": 70 * (e + 1) + "ms", "-moz-animation-delay": 70 * (e + 1) + "ms", "animation-delay": 70 * (e + 1) + "ms" });
                            }),
                            s.length && s.children().css({ "-webkit-animation-delay": 70 * (r.length + 1) + "ms", "-moz-animation-delay": 70 * (r.length + 1) + "ms", "animation-delay": 70 * (r.length + 1) + "ms" })),
                        t.on("click", function (e) {
                            e.preventDefault(),
                                t.hasClass("edgtf-fm-opened")
                                    ? (t.removeClass("edgtf-fm-opened"),
                                      edgtf.body.removeClass("edgtf-fullscreen-menu-opened edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"),
                                      edgtf.body.addClass(a),
                                      edgtf.modules.common.edgtfEnableScroll(),
                                      g("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200))
                                    : (t.addClass("edgtf-fm-opened"),
                                      edgtf.body.removeClass("edgtf-fullscreen-fade-out").addClass("edgtf-fullscreen-menu-opened edgtf-fullscreen-fade-in"),
                                      edgtf.body.removeClass(a),
                                      edgtf.modules.common.edgtfDisableScroll(),
                                      g(document).keyup(function (e) {
                                          27 === e.keyCode &&
                                              (t.removeClass("edgtf-fm-opened"),
                                              edgtf.body.removeClass("edgtf-fullscreen-menu-opened edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"),
                                              edgtf.body.addClass(a),
                                              edgtf.modules.common.edgtfEnableScroll(),
                                              g("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200));
                                      }));
                        }),
                        e.on("click", function (e) {
                            e.preventDefault(),
                                t.removeClass("edgtf-fm-opened"),
                                edgtf.body.removeClass("edgtf-fullscreen-menu-opened edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"),
                                edgtf.body.addClass(a),
                                edgtf.modules.common.edgtfEnableScroll(),
                                g("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200);
                        }),
                        l.on("tap click", function (e) {
                            e.preventDefault();
                            var t = g(this).parent(),
                                a = t.siblings(".menu-item-has-children");
                            if (t.hasClass("has_sub")) {
                                var o = t.find("> ul.sub_menu");
                                o.is(":visible")
                                    ? (o.slideUp(450, "easeInOutQuint"), t.removeClass("open_sub"))
                                    : (t.addClass("open_sub"),
                                      0 === a.length
                                          ? o.slideDown(400, "easeInOutQuint")
                                          : (t.closest("li.menu-item").siblings().find(".menu-item").removeClass("open_sub"),
                                            t
                                                .siblings()
                                                .removeClass("open_sub")
                                                .find(".sub_menu")
                                                .slideUp(400, "easeInOutQuint", function () {
                                                    o.slideDown(400, "easeInOutQuint");
                                                })));
                            }
                            return !1;
                        }),
                        f.on("click", function (e) {
                            if ("http://#" === g(this).attr("href") || "#" === g(this).attr("href")) return !1;
                            1 === e.which &&
                                (t.removeClass("edgtf-fm-opened"),
                                edgtf.body.removeClass("edgtf-fullscreen-menu-opened"),
                                edgtf.body.removeClass("edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"),
                                edgtf.body.addClass(a),
                                g("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200),
                                edgtf.modules.common.edgtfEnableScroll());
                        });
                }
            })();
        }
        ((edgtf.modules.headerMinimal = e).edgtfOnDocumentReady = t), g(document).ready(t);
    })(jQuery),
    (function (i) {
        "use strict";
        var e = {};
        function t() {
            a().init();
        }
        ((edgtf.modules.headerVertical = e).edgtfOnDocumentReady = t), i(document).ready(t);
        var a = function () {
            function t() {
                a.hasClass("edgtf-with-scroll") && edgtf.modules.common.edgtfInitPerfectScrollbar().init(a);
            }
            var a = i(".edgtf-vertical-menu-area");
            return {
                init: function () {
                    var o, n, d, e;
                    a.length &&
                        ((e = a.find(".edgtf-vertical-menu")).hasClass("edgtf-vertical-dropdown-below")
                            ? (d = e.find("ul li.menu-item-has-children")).each(function () {
                                  var t = i(this).find(" > .second, > ul"),
                                      a = this,
                                      o = i(this).find("> a"),
                                      n = "fast";
                                  o.on("click tap", function (e) {
                                      e.preventDefault(),
                                          e.stopPropagation(),
                                          t.is(":visible")
                                              ? (i(a).removeClass("open"), t.slideUp(n))
                                              : (o.parent().parent().children().hasClass("open") && o.parent().parent().parent().hasClass("edgtf-vertical-menu")
                                                    ? (i(this).parent().parent().children().removeClass("open"), i(this).parent().parent().children().find(" > .second").slideUp(n))
                                                    : (i(this).parents("li").hasClass("open") || (d.removeClass("open"), d.find(" > .second, > ul").slideUp(n)),
                                                      i(this).parent().parent().children().hasClass("open") &&
                                                          (i(this).parent().parent().children().removeClass("open"), i(this).parent().parent().children().find(" > .second, > ul").slideUp(n))),
                                                i(a).addClass("open"),
                                                t.slideDown("slow"));
                                  });
                              })
                            : e.hasClass("edgtf-vertical-dropdown-side") &&
                              ((o = e.find("ul li.menu-item-has-children")),
                              (n = o.find(" > .second > .inner > ul, > ul")),
                              o.each(function () {
                                  var t = i(this).find(" > .second > .inner > ul, > ul"),
                                      a = this;
                                  Modernizr.touch
                                      ? i(this)
                                            .find("> a")
                                            .on("click tap", function (e) {
                                                e.preventDefault(),
                                                    e.stopPropagation(),
                                                    t.hasClass("edgtf-float-open")
                                                        ? (t.removeClass("edgtf-float-open"), i(a).removeClass("open"))
                                                        : (i(this).parents("li").hasClass("open") || (o.removeClass("open"), n.removeClass("edgtf-float-open")), t.addClass("edgtf-float-open"), i(a).addClass("open"));
                                            })
                                      : i(this).hoverIntent({
                                            over: function () {
                                                t.addClass("edgtf-float-open"), i(a).addClass("open");
                                            },
                                            out: function () {
                                                t.removeClass("edgtf-float-open"), i(a).removeClass("open");
                                            },
                                            timeout: 100,
                                        });
                              })),
                        t());
                },
            };
        };
    })(jQuery),
    (function (s) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                var t = s(".edgtf-mobile-header .edgtf-mobile-menu-opener"),
                    i = s(".edgtf-mobile-header .edgtf-mobile-nav"),
                    e = s(".edgtf-mobile-nav .mobile_arrow, .edgtf-mobile-nav h6, .edgtf-mobile-nav a.edgtf-mobile-no-link");
                t.length &&
                    i.length &&
                    t.on("tap click", function (e) {
                        e.stopPropagation(),
                            e.preventDefault(),
                            i.is(":visible") ? (i.slideUp(450, "easeInOutQuint"), t.removeClass("edgtf-mobile-menu-opened")) : (i.slideDown(450, "easeInOutQuint"), t.addClass("edgtf-mobile-menu-opened"));
                    });
                e.length &&
                    e.each(function () {
                        var n = s(this),
                            d = i.outerHeight();
                        n.on("tap click", function (e) {
                            var t = n.parent("li"),
                                a = t.siblings(".menu-item-has-children");
                            if (t.hasClass("has_sub")) {
                                var o = t.find("> ul.sub_menu");
                                o.is(":visible")
                                    ? (o.slideUp(450, "easeInOutQuint"), t.removeClass("edgtf-opened"), i.stop().animate({ height: d }, 300))
                                    : (t.addClass("edgtf-opened"),
                                      0 === a.length
                                          ? t.find(".sub_menu").slideUp(400, "easeInOutQuint", function () {
                                                o.slideDown(400, "easeInOutQuint"), i.stop().animate({ height: d + 50 }, 300);
                                            })
                                          : t
                                                .siblings()
                                                .removeClass("edgtf-opened")
                                                .find(".sub_menu")
                                                .slideUp(400, "easeInOutQuint", function () {
                                                    o.slideDown(400, "easeInOutQuint"), i.stop().animate({ height: d + 50 }, 300);
                                                }));
                            }
                        });
                    });
                s(".edgtf-mobile-nav a, .edgtf-mobile-logo-wrapper a").on("click tap", function (e) {
                    "http://#" !== s(this).attr("href") && "#" !== s(this).attr("href") && (i.slideUp(450, "easeInOutQuint"), t.removeClass("edgtf-mobile-menu-opened"));
                });
            })(),
                o(),
                (function () {
                    var t = s(".edgtf-mobile-header"),
                        a = t.find(".edgtf-mobile-menu-opener"),
                        e = t.length ? t.outerHeight() : 0;
                    edgtf.body.hasClass("edgtf-content-is-behind-header") && 0 < e && edgtf.windowWidth <= 1024 && s(".edgtf-content").css("marginTop", -e);
                    if (edgtf.body.hasClass("edgtf-sticky-up-mobile-header")) {
                        var o,
                            n = s("#wpadminbar"),
                            d = s(document).scrollTop();
                        (o = e + edgtfGlobalVars.vars.edgtfAddForAdminBar),
                            s(window).scroll(function () {
                                var e = s(document).scrollTop();
                                o < e ? t.addClass("edgtf-animate-mobile-header") : t.removeClass("edgtf-animate-mobile-header"),
                                    (d < e && o < e && !a.hasClass("edgtf-mobile-menu-opened")) || e < o
                                        ? (t.removeClass("mobile-header-appear"), t.css("margin-bottom", 0), n.length && t.find(".edgtf-mobile-header-inner").css("top", 0))
                                        : (t.addClass("mobile-header-appear"), t.css("margin-bottom", o)),
                                    (d = s(document).scrollTop());
                            });
                    }
                })();
        }
        function a() {
            o();
        }
        function o() {
            if (edgtf.windowWidth <= 1024) {
                var e = s(".edgtf-mobile-header"),
                    t = e.length ? e.height() : 0,
                    a = e.find(".edgtf-mobile-nav"),
                    o = a.outerHeight(),
                    n = edgtf.windowHeight - 100,
                    d = n < t + o ? n - t : o;
                a.length && (a.height(d), edgtf.modules.common.edgtfInitPerfectScrollbar().init(a));
            }
        }
        ((edgtf.modules.mobileHeader = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowResize = a), s(document).ready(t), s(window).resize(a);
    })(jQuery),
    (function (g) {
        "use strict";
        var e = {};
        function t() {
            1024 < edgtf.windowWidth &&
                (function () {
                    var t,
                        e,
                        a = g(".edgtf-page-header"),
                        o = g(".edgtf-sticky-header"),
                        n = g(".edgtf-fixed-wrapper"),
                        d = n.children(".edgtf-menu-area").outerHeight(),
                        i = g(".edgtf-slider"),
                        s = i.length ? i.outerHeight() : 0,
                        r = n.length ? n.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar : 0;
                    switch (!0) {
                        case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-up"):
                            edgtf.modules.stickyHeader.behaviour = "edgtf-sticky-header-on-scroll-up";
                            var l = g(document).scrollTop();
                            (t =
                                parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) +
                                parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) +
                                parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) +
                                parseInt(edgtfGlobalVars.vars.edgtfStickyHeaderHeight)),
                                (e = function () {
                                    var e = g(document).scrollTop();
                                    (l < e && t < e) || e < t
                                        ? ((edgtf.modules.stickyHeader.isStickyVisible = !1),
                                          o.removeClass("header-appear").find(".edgtf-main-menu .second").removeClass("edgtf-drop-down-start"),
                                          edgtf.body.removeClass("edgtf-sticky-header-appear"))
                                        : ((edgtf.modules.stickyHeader.isStickyVisible = !0), o.addClass("header-appear"), edgtf.body.addClass("edgtf-sticky-header-appear")),
                                        (l = g(document).scrollTop());
                                })(),
                                g(window).scroll(function () {
                                    e();
                                });
                            break;
                        case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-down-up"):
                            (edgtf.modules.stickyHeader.behaviour = "edgtf-sticky-header-on-scroll-down-up"),
                                0 !== edgtfPerPageVars.vars.edgtfStickyScrollAmount
                                    ? (edgtf.modules.stickyHeader.stickyAppearAmount = parseInt(edgtfPerPageVars.vars.edgtfStickyScrollAmount))
                                    : (edgtf.modules.stickyHeader.stickyAppearAmount =
                                          parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) + parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) + parseInt(s)),
                                (e = function () {
                                    edgtf.scroll < edgtf.modules.stickyHeader.stickyAppearAmount
                                        ? ((edgtf.modules.stickyHeader.isStickyVisible = !1),
                                          o.removeClass("header-appear").find(".edgtf-main-menu .second").removeClass("edgtf-drop-down-start"),
                                          edgtf.body.removeClass("edgtf-sticky-header-appear"))
                                        : ((edgtf.modules.stickyHeader.isStickyVisible = !0), o.addClass("header-appear"), edgtf.body.addClass("edgtf-sticky-header-appear"));
                                })(),
                                g(window).scroll(function () {
                                    e();
                                });
                            break;
                        case edgtf.body.hasClass("edgtf-fixed-on-scroll"):
                            edgtf.modules.stickyHeader.behaviour = "edgtf-fixed-on-scroll";
                            var f = function () {
                                edgtf.scroll <= r
                                    ? (n.removeClass("fixed"), edgtf.body.removeClass("edgtf-fixed-header-appear"), a.css("margin-bottom", "0"))
                                    : (n.addClass("fixed"), edgtf.body.addClass("edgtf-fixed-header-appear"), a.css("margin-bottom", d + "px"));
                            };
                            f(),
                                g(window).scroll(function () {
                                    f();
                                });
                    }
                })();
        }
        ((edgtf.modules.stickyHeader = e).isStickyVisible = !1), (e.stickyAppearAmount = 0), (e.behaviour = ""), (e.edgtfOnDocumentReady = t), g(document).ready(t);
    })(jQuery),
    (function (d) {
        "use strict";
        var e = {};
        function t() {
            !(function () {
                if (edgtf.body.hasClass("edgtf-fullscreen-search")) {
                    var e = d("a.edgtf-search-opener");
                    if (0 < e.length) {
                        var a = d(".edgtf-fullscreen-search-holder"),
                            t = d(".edgtf-search-close");
                        e.on("click", function (e) {
                            e.preventDefault(),
                                a.hasClass("edgtf-animate")
                                    ? (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-out"),
                                      edgtf.body.removeClass("edgtf-search-fade-in"),
                                      a.removeClass("edgtf-animate"),
                                      setTimeout(function () {
                                          a.find(".edgtf-search-field").val(""), a.find(".edgtf-search-field").blur();
                                      }, 300),
                                      edgtf.modules.common.edgtfEnableScroll())
                                    : (edgtf.body.addClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                                      edgtf.body.removeClass("edgtf-search-fade-out"),
                                      a.addClass("edgtf-animate"),
                                      setTimeout(function () {
                                          a.find(".edgtf-search-field").focus();
                                      }, 900),
                                      edgtf.modules.common.edgtfDisableScroll()),
                                t.on("click", function (e) {
                                    e.preventDefault(),
                                        edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                                        edgtf.body.addClass("edgtf-search-fade-out"),
                                        a.removeClass("edgtf-animate"),
                                        setTimeout(function () {
                                            a.find(".edgtf-search-field").val(""), a.find(".edgtf-search-field").blur();
                                        }, 300),
                                        edgtf.modules.common.edgtfEnableScroll();
                                }),
                                d(document).mouseup(function (e) {
                                    var t = d(".edgtf-form-holder-inner");
                                    t.is(e.target) ||
                                        0 !== t.has(e.target).length ||
                                        (e.preventDefault(),
                                        edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                                        edgtf.body.addClass("edgtf-search-fade-out"),
                                        a.removeClass("edgtf-animate"),
                                        setTimeout(function () {
                                            a.find(".edgtf-search-field").val(""), a.find(".edgtf-search-field").blur();
                                        }, 300),
                                        edgtf.modules.common.edgtfEnableScroll());
                                }),
                                d(document).keyup(function (e) {
                                    27 === e.keyCode &&
                                        (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                                        edgtf.body.addClass("edgtf-search-fade-out"),
                                        a.removeClass("edgtf-animate"),
                                        setTimeout(function () {
                                            a.find(".edgtf-search-field").val(""), a.find(".edgtf-search-field").blur();
                                        }, 300),
                                        edgtf.modules.common.edgtfEnableScroll());
                                });
                        });
                        var o = d(".edgtf-fullscreen-search-holder .edgtf-search-field"),
                            n = d(".edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line");
                        o.focus(function () {
                            n.css("width", "100%");
                        }),
                            o.blur(function () {
                                n.css("width", "0");
                            });
                    }
                }
            })();
        }
        ((edgtf.modules.searchFullscreen = e).edgtfOnDocumentReady = t), d(document).ready(t);
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            n(document.body).on("blog_list_load_more_trigger", function () {
                o();
            });
        }
        function a() {
            o();
        }
        function o() {
            var e = n(".edgtf-blog-holder.edgtf-blog-masonry-gallery");
            e.length &&
                e.each(function () {
                    var e = n(this),
                        t = e.find("article"),
                        a = e.find(".edgtf-blog-pagination-holder"),
                        o = 0;
                    t.each(function () {
                        var e = n(this);
                        setTimeout(function () {
                            e.appear(
                                function () {
                                    7 === ++o && (o = 0),
                                        setTimeout(function () {
                                            e.addClass("edgtf-appeared");
                                        }, 100 * o);
                                },
                                { accX: 0, accY: 100 }
                            );
                        }, 150);
                    }),
                        a.appear(
                            function () {
                                a.addClass("edgtf-appeared");
                            },
                            { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                        );
                });
        }
        ((edgtf.modules.blogMasonryGallery = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowLoad = a), n(document).ready(t), n(window).load(a);
    })(jQuery),
    (function (d) {
        "use strict";
        function e() {
            d(document).on("click", ".edgtf-like", function () {
                var t = d(this),
                    e = t.attr("id"),
                    a = t.data("post-id"),
                    o = "";
                if (t.hasClass("liked")) return !1;
                void 0 !== t.data("type") && (o = t.data("type"));
                var n = { action: "overworld_core_action_like", likes_id: e, type: o, like_nonce: d("#edgtf_like_nonce_" + a).val() };
                d.post(edgtfGlobalVars.vars.edgtfAjaxUrl, n, function (e) {
                    t.html(e).addClass("liked").attr("title", "You already like this!");
                });
                return !1;
            });
        }
        d(document).ready(e);
    })(jQuery),
    (function (d) {
        "use strict";
        var e = {};
        function t() {
            function n(e, t) {
                for (var a = 0; a < e.length; a++) {
                    var o = e[a];
                    a < t ? d(o).addClass("active") : d(o).removeClass("active");
                }
            }
            d(".edgtf-comment-form-rating").each(function () {
                var e = d(this),
                    t = e.find(".edgtf-rating"),
                    a = t.val(),
                    o = e.find(".edgtf-star-rating");
                n(o, a),
                    o.on("click", function () {
                        t.val(d(this).data("value")).trigger("change");
                    }),
                    t.change(function () {
                        (a = t.val()), n(o, a);
                    });
            });
        }
        ((edgtf.modules.rating = e).edgtfOnDocumentReady = t), d(document).ready(t);
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            o().init();
        }
        function a() {
            o().init();
        }
        ((edgtf.modules.player = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowResize = a), n(document).ready(t), n(window).resize(a);
        var o = function () {
            return {
                init: function () {
                    var e,
                        t,
                        a,
                        o = n(".edgtf-player-single-info-top");
                    o.length && ((t = (e = o).find(".edgtf-player-single-info-top-inner")), (a = n(".edgtf-player-info-main")), e.length && t.height(e.outerHeight() - a.outerHeight() / 2));
                },
            };
        };
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            o().init();
        }
        function a() {
            o().init();
        }
        ((edgtf.modules.team = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowResize = a), n(document).ready(t), n(window).resize(a);
        var o = function () {
            return {
                init: function () {
                    var e,
                        t,
                        a,
                        o = n(".edgtf-team-single-info-top");
                    o.length && ((t = (e = o).find(".edgtf-team-single-info-top-inner")), (a = n(".edgtf-team-info-main")), e.length && t.height(e.outerHeight() - a.outerHeight() / 2));
                },
            };
        };
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            o().init();
        }
        function a() {
            o().init();
        }
        ((edgtf.modules.tournament = e).edgtfOnDocumentReady = t), (e.edgtfOnWindowResize = a), n(document).ready(t), n(window).resize(a);
        var o = function () {
            return {
                init: function () {
                    var e,
                        t,
                        a,
                        o = n(".edgtf-tournament-single-info-top");
                    o.length && ((t = (e = o).find(".edgtf-tournament-single-info-top-inner")), (a = n(".edgtf-tournament-info-main")), e.length && t.height(e.outerHeight() - a.outerHeight() / 2));
                },
            };
        };
    })(jQuery),
    (function (d) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = d(".edgtf-accordion-holder");
            e.length &&
                e.each(function () {
                    var e = d(this);
                    if ((e.hasClass("edgtf-accordion") && e.accordion({ animate: "swing", collapsible: !0, active: 0, icons: "", heightStyle: "content" }), e.hasClass("edgtf-ac-boxed") && 1024 < edgtf.windowWidth)) {
                        var t = e.outerHeight();
                        e.css("min-height", t + 2 + "px");
                    }
                    if (e.hasClass("edgtf-toggle")) {
                        var a = d(this),
                            o = a.find(".edgtf-accordion-title"),
                            n = o.next();
                        a.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"),
                            o.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"),
                            n.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),
                            o.each(function () {
                                var e = d(this);
                                e.on("hover", function () {
                                    e.toggleClass("ui-state-hover");
                                }),
                                    e.on("click", function () {
                                        e.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"), e.next().toggleClass("ui-accordion-content-active").slideToggle(400);
                                    });
                            });
                    }
                });
        }
        ((edgtf.modules.accordions = e).edgtfInitAccordions = a), (e.edgtfOnDocumentReady = t), d(document).ready(t);
    })(jQuery),
    (function (n) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var a,
                o,
                e = n(
                    ".edgtf-grow-in, .edgtf-fade-in-down, .edgtf-element-from-fade, .edgtf-element-from-left, .edgtf-element-from-right, .edgtf-element-from-top, .edgtf-element-from-bottom, .edgtf-flip-in, .edgtf-x-rotate, .edgtf-z-rotate, .edgtf-y-translate, .edgtf-fade-in, .edgtf-fade-in-left-x-rotate"
                );
            e.length &&
                e.each(function () {
                    var t = n(this);
                    t.appear(
                        function () {
                            if (((a = t.data("animation")), (o = parseInt(t.data("animation-delay"))), void 0 !== a && "" !== a)) {
                                var e = a + "-on";
                                setTimeout(function () {
                                    t.addClass(e);
                                }, o);
                            }
                        },
                        { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                    );
                });
        }
        ((edgtf.modules.animationHolder = e).edgtfInitAnimationHolder = a), (e.edgtfOnDocumentReady = t), n(document).ready(t);
    })(jQuery),
    (function (a) {
        "use strict";
        var e = {};
        function t() {
            o().init();
        }
        ((edgtf.modules.button = e).edgtfButton = o), (e.edgtfOnDocumentReady = t), a(document).ready(t);
        var o = function () {
            var t = a(".edgtf-btn");
            return {
                init: function () {
                    var e;
                    a(".edgtf-btn-solid, .edgtf-btn-outline").addClass("edgtf-btn-stripe"),
                        (e = a(".add_to_cart_button, .single_add_to_cart_button, .button.wc-forward")).addClass("edgtf-btn-stripe"),
                        e.append('<div class="edgtf-btn-bg-holder"></div>'),
                        t.length &&
                            t.each(function () {
                                !(function (e) {
                                    if (e.hasClass("edgtf-btn-stripe") && (e.append('<div class="edgtf-btn-bg-holder"></div>'), void 0 !== e.data("hover-bg-color"))) {
                                        var t = e.data("hover-bg-color");
                                        e.find(".edgtf-btn-bg-holder").css("background-color", t);
                                    }
                                })(a(this)),
                                    (function (e) {
                                        if (void 0 !== e.data("hover-color")) {
                                            var t = function (e) {
                                                    e.data.button.css("color", e.data.color);
                                                },
                                                a = e.css("color"),
                                                o = e.data("hover-color");
                                            e.on("mouseenter", { button: e, color: o }, t), e.on("mouseleave", { button: e, color: a }, t);
                                        }
                                    })(a(this)),
                                    (function (e) {
                                        if (void 0 !== e.data("hover-bg-color") && !e.hasClass("edgtf-btn-stripe")) {
                                            var t = function (e) {
                                                    e.data.button.css("background-color", e.data.color);
                                                },
                                                a = e.css("background-color"),
                                                o = e.data("hover-bg-color");
                                            e.on("mouseenter", { button: e, color: o }, t), e.on("mouseleave", { button: e, color: a }, t);
                                        }
                                    })(a(this)),
                                    (function (e) {
                                        if (void 0 !== e.data("hover-border-color")) {
                                            var t = function (e) {
                                                    e.data.button.css("border-color", e.data.color);
                                                },
                                                a = e.css("borderTopColor"),
                                                o = e.data("hover-border-color");
                                            e.on("mouseenter", { button: e, color: o }, t), e.on("mouseleave", { button: e, color: a }, t);
                                        }
                                    })(a(this)),
                                    (function (e) {
                                        if (void 0 !== e.data("hover-fill-color")) {
                                            var t = function (e) {
                                                    e.data.button.attr("fill", e.data.color);
                                                },
                                                a = e.find("svg > path").attr("fill"),
                                                o = e.data("hover-fill-color");
                                            e.on("mouseenter", { button: e.find("svg > path"), color: o }, t), e.on("mouseleave", { button: e.find("svg > path"), color: a }, t);
                                        }
                                    })(a(this)),
                                    (function (e) {
                                        if (void 0 !== e.data("hover-stroke-color")) {
                                            var t = function (e) {
                                                    e.data.button.attr("stroke", e.data.color);
                                                },
                                                a = e.find("svg > path").attr("stroke"),
                                                o = e.data("hover-stroke-color");
                                            e.on("mouseenter", { button: e.find("svg > path"), color: o }, t), e.on("mouseleave", { button: e.find("svg > path"), color: a }, t);
                                        }
                                    })(a(this));
                            });
                },
            };
        };
    })(jQuery),
    (function (p) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var n,
                d,
                i,
                s,
                r,
                l,
                f,
                g,
                c,
                u,
                h,
                e = p(".edgtf-countdown"),
                m = new Date().getMonth();
            e.length &&
                e.each(function () {
                    var e,
                        t,
                        a = p(this).attr("id"),
                        o = p("#" + a);
                    (n = o.data("year")),
                        (d = o.data("month")),
                        (i = o.data("day")),
                        (s = o.data("hour")),
                        (r = o.data("minute")),
                        (l = o.data("timezone")),
                        (f = o.data("month-label")),
                        (g = o.data("day-label")),
                        (c = o.data("hour-label")),
                        (u = o.data("minute-label")),
                        (h = o.data("second-label")),
                        (e = o.data("digit-size")),
                        (t = o.data("label-size")),
                        m !== d && --d,
                        o.countdown({
                            until: new Date(n, d, i, s, r, 44),
                            labels: ["", f, "", g, c, u, h],
                            format: "ODHMS",
                            timezone: l,
                            padZeroes: !0,
                            onTick: function () {
                                o.find(".countdown-amount").css({ "font-size": e + "px", "line-height": e + "px" }), o.find(".countdown-period").css({ "font-size": t + "px" });
                            },
                        });
                });
        }
        ((edgtf.modules.countdown = e).edgtfInitCountdown = a), (e.edgtfOnDocumentReady = t), p(document).ready(t);
    })(jQuery),
    (function (o) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = o(".edgtf-counter-holder");
            e.length &&
                e.each(function () {
                    var t = o(this),
                        a = t.find(".edgtf-counter");
                    t.appear(
                        function () {
                            if ((t.css("opacity", "1"), a.hasClass("edgtf-zero-counter"))) {
                                var e = parseFloat(a.text());
                                a.countTo({ from: 0, to: e, speed: 1500, refreshInterval: 100 });
                            } else a.absoluteCounter({ speed: 2e3, fadeInDelay: 1e3 });
                        },
                        { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                    );
                });
        }
        ((edgtf.modules.counter = e).edgtfInitCounter = a), (e.edgtfOnDocumentReady = t), o(document).ready(t);
    })(jQuery),
    (function (r) {
        "use strict";
        var e = {};
        function t() {
            o();
        }
        function a() {
            n();
        }
        function o() {
            var e = r(".edgtf-custom-font-holder");
            e.length &&
                e.each(function () {
                    var e = r(this),
                        t = "",
                        a = "",
                        o = "",
                        n = "",
                        d = "",
                        i = "",
                        s = "";
                    void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
                        void 0 !== e.data("font-size-1366") && !1 !== e.data("font-size-1366") && (a += "font-size: " + e.data("font-size-1366") + " !important;"),
                        void 0 !== e.data("font-size-1024") && !1 !== e.data("font-size-1024") && (o += "font-size: " + e.data("font-size-1024") + " !important;"),
                        void 0 !== e.data("font-size-768") && !1 !== e.data("font-size-768") && (n += "font-size: " + e.data("font-size-768") + " !important;"),
                        void 0 !== e.data("font-size-680") && !1 !== e.data("font-size-680") && (d += "font-size: " + e.data("font-size-680") + " !important;"),
                        void 0 !== e.data("line-height-1366") && !1 !== e.data("line-height-1366") && (a += "line-height: " + e.data("line-height-1366") + " !important;"),
                        void 0 !== e.data("line-height-1024") && !1 !== e.data("line-height-1024") && (o += "line-height: " + e.data("line-height-1024") + " !important;"),
                        void 0 !== e.data("line-height-768") && !1 !== e.data("line-height-768") && (n += "line-height: " + e.data("line-height-768") + " !important;"),
                        void 0 !== e.data("line-height-680") && !1 !== e.data("line-height-680") && (d += "line-height: " + e.data("line-height-680") + " !important;"),
                        (a.length || o.length || n.length || d.length) &&
                            (a.length && (s += "@media only screen and (max-width: 1366px) {.edgtf-custom-font-holder." + t + " { " + a + " } }"),
                            o.length && (s += "@media only screen and (max-width: 1024px) {.edgtf-custom-font-holder." + t + " { " + o + " } }"),
                            n.length && (s += "@media only screen and (max-width: 768px) {.edgtf-custom-font-holder." + t + " { " + n + " } }"),
                            d.length && (s += "@media only screen and (max-width: 680px) {.edgtf-custom-font-holder." + t + " { " + d + " } }")),
                        s.length && (i = '<style type="text/css">' + s + "</style>"),
                        i.length && r("head").append(i);
                });
        }
        function n() {
            var e = r(".edgtf-cf-typed");
            e.length &&
                e.each(function () {
                    var e = r(this),
                        t = e.parent(".edgtf-cf-typed-wrap").parent(".edgtf-custom-font-holder"),
                        a = [],
                        o = e.find(".edgtf-cf-typed-1").text(),
                        n = e.find(".edgtf-cf-typed-2").text(),
                        d = e.find(".edgtf-cf-typed-3").text(),
                        i = e.find(".edgtf-cf-typed-4").text();
                    o.length && a.push(o),
                        n.length && a.push(n),
                        d.length && a.push(d),
                        i.length && a.push(i),
                        t.appear(
                            function () {
                                e.typed({ strings: a, typeSpeed: 90, backDelay: 700, loop: !0, contentType: "text", loopCount: !1, cursorChar: "_" });
                            },
                            { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                        );
                });
        }
        ((edgtf.modules.customFont = e).edgtfCustomFontResize = o), (e.edgtfCustomFontTypeOut = n), (e.edgtfOnDocumentReady = t), (e.edgtfOnWindowLoad = a), r(document).ready(t), r(window).load(a);
    })(jQuery),
    (function (l) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = l(".swiper-container.edgtf-dual-image-carousel");
            e.length &&
                e.each(function () {
                    var t = l(this),
                        a = l(this).find(".swiper-navigation"),
                        o = 38,
                        d = 1,
                        i = a.find(".edgtf-swiper-button-prev .edgtf-text"),
                        s = a.find(".edgtf-swiper-button-next .edgtf-text"),
                        e = t.find(".swiper-slide"),
                        n = t.data("foreground-slides-position");
                    edgtf.windowWidth <= 1024 && (o = 18),
                        edgtf.windowWidth <= 480 && (o = 30),
                        void 0 !== t.data("number-of-items") && !1 !== t.data("number-of-items") && (d = t.data("number-of-items")),
                        e.each(function () {
                            "" !== n && l(this).find(".edgtf-slide-foreground-image-holder").css("margin-top", n);
                        });
                    function r(e) {
                        var t,
                            a,
                            o = e - 1,
                            n = e + 1;
                        o <= 0 && (o = d), d < n && (n = 1), (t = o), (a = n), i.attr("data-prev-num", t), s.attr("data-next-num", a);
                    }
                    new Swiper(t, {
                        loop: !0,
                        parallax: !0,
                        speed: 1e3,
                        mousewheelControl: !1,
                        slidesPerView: "auto",
                        centeredSlides: !0,
                        spaceBetween: 215,
                        autoplay: !0,
                        navigation: { nextEl: ".edgtf-swiper-button-next", prevEl: ".edgtf-swiper-button-prev" },
                        on: {
                            init: function () {
                                t.addClass("edgtf-dual-image-carousel-loaded");
                            },
                            transitionStart: function () {
                                var e = t.find(".swiper-slide-active .edgtf-slide-background-image").height() + o;
                                a.css("top", e + "px"), r(this.realIndex + 1);
                            },
                        },
                        breakpoints: {
                            0: { spaceBetween: 20 },
                            480: { spaceBetween: 40 },
                            680: { spaceBetween: 60 },
                            768: { spaceBetween: 80 },
                            1024: { spaceBetween: 100 },
                            1200: { spaceBetween: 120 },
                            1280: { spaceBetween: 140 },
                            1366: { spaceBetween: 160 },
                            1440: { spaceBetween: 180 },
                            1920: { spaceBetween: 215 },
                        },
                    });
                    l(this).waitForImages(function () {
                        var e = l(this).find(".edgtf-slide-background-image").height() + o;
                        a.css("top", e + "px");
                    });
                });
        }
        ((edgtf.modules.dualImageCarousel = e).edgtfDualImageCarousel = a), (e.edgtfOnDocumentReady = t), l(document).ready(t);
    })(jQuery),
    (function (l) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = l(".edgtf-elements-holder");
            e.length &&
                e.each(function () {
                    var e = l(this).children(".edgtf-eh-item"),
                        t = "",
                        r = "";
                    e.each(function () {
                        var e = l(this),
                            t = "",
                            a = "",
                            o = "",
                            n = "",
                            d = "",
                            i = "";
                        if (
                            (void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
                            void 0 !== e.data("1400-1600") && !1 !== e.data("1400-1600") && (a = e.data("1400-1600")),
                            void 0 !== e.data("1025-1399") && !1 !== e.data("1025-1399") && (o = e.data("1025-1399")),
                            void 0 !== e.data("769-1024") && !1 !== e.data("769-1024") && (n = e.data("769-1024")),
                            void 0 !== e.data("681-768") && !1 !== e.data("681-768") && (d = e.data("681-768")),
                            void 0 !== e.data("680") && !1 !== e.data("680") && (i = e.data("680")),
                            (a.length || o.length || n.length || d.length || i.length || "".length) &&
                                (a.length && (r += "@media only screen and (min-width: 1400px) and (max-width: 1600px) {.edgtf-eh-item-content." + t + " { padding: " + a + " !important; } }"),
                                o.length && (r += "@media only screen and (min-width: 1025px) and (max-width: 1399px) {.edgtf-eh-item-content." + t + " { padding: " + o + " !important; } }"),
                                n.length && (r += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.edgtf-eh-item-content." + t + " { padding: " + n + " !important; } }"),
                                d.length && (r += "@media only screen and (min-width: 681px) and (max-width: 768px) {.edgtf-eh-item-content." + t + " { padding: " + d + " !important; } }"),
                                i.length && (r += "@media only screen and (max-width: 680px) {.edgtf-eh-item-content." + t + " { padding: " + i + " !important; } }")),
                            "function" == typeof edgtf.modules.common.edgtfOwlSlider)
                        ) {
                            var s = e.find(".edgtf-owl-slider");
                            s.length &&
                                setTimeout(function () {
                                    s.trigger("refresh.owl.carousel");
                                }, 100);
                        }
                    }),
                        r.length && (t = '<style type="text/css">' + r + "</style>"),
                        t.length && l("head").append(t);
                });
        }
        ((edgtf.modules.elementsHolder = e).edgtfInitElementsHolderResponsiveStyle = a), (e.edgtfOnDocumentReady = t), l(document).ready(t);
    })(jQuery),
    (function (m) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = m(".edgtf-google-map");
            e.length &&
                e.each(function () {
                    var e,
                        t,
                        a,
                        o,
                        n,
                        d,
                        i,
                        s,
                        r,
                        l,
                        f = m(this),
                        g = !1,
                        c = "";
                    if (void 0 !== f.data("snazzy-map-style") && "yes" === f.data("snazzy-map-style")) {
                        g = !0;
                        var u = f.parent().find(".edgtf-snazzy-map"),
                            h = u.val();
                        u.length && h.length && (c = JSON.parse(h.replace(/`{`/g, "[").replace(/`}`/g, "]").replace(/``/g, '"').replace(/`/g, "")));
                    }
                    void 0 !== f.data("custom-map-style") && (e = f.data("custom-map-style")),
                        void 0 !== f.data("color-overlay") && !1 !== f.data("color-overlay") && (t = f.data("color-overlay")),
                        void 0 !== f.data("saturation") && !1 !== f.data("saturation") && (a = f.data("saturation")),
                        void 0 !== f.data("lightness") && !1 !== f.data("lightness") && (o = f.data("lightness")),
                        void 0 !== f.data("zoom") && !1 !== f.data("zoom") && (n = f.data("zoom")),
                        void 0 !== f.data("pin") && !1 !== f.data("pin") && (d = f.data("pin")),
                        void 0 !== f.data("height") && !1 !== f.data("height") && (i = f.data("height")),
                        void 0 !== f.data("unique-id") && !1 !== f.data("unique-id") && (s = f.data("unique-id")),
                        void 0 !== f.data("scroll-wheel") && (r = f.data("scroll-wheel")),
                        void 0 !== f.data("addresses") && !1 !== f.data("addresses") && (l = f.data("addresses")),
                        (function (e, t, a, o, n, d, i, s, r, l, f, g, c, u) {
                            if ("object" != typeof google) return;
                            var h,
                                m = [];
                            m = e && t.length ? t : [{ stylers: [{ hue: o }, { saturation: n }, { lightness: d }, { gamma: 1 }] }];
                            h = e || "yes" === a ? "edgtf-style" : google.maps.MapTypeId.ROADMAP;
                            i = "yes" === i;
                            var p = new google.maps.StyledMapType(m, { name: "Google Map" });
                            c = new google.maps.Geocoder();
                            var v = new google.maps.LatLng(-34.397, 150.644);
                            isNaN(l) || (l += "px");
                            var b,
                                y = {
                                    zoom: s,
                                    scrollwheel: i,
                                    center: v,
                                    zoomControl: !0,
                                    zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.RIGHT_CENTER },
                                    scaleControl: !1,
                                    scaleControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
                                    streetViewControl: !1,
                                    streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
                                    panControl: !1,
                                    panControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
                                    mapTypeControl: !1,
                                    mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, "edgtf-style"], style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: google.maps.ControlPosition.LEFT_CENTER },
                                    mapTypeId: h,
                                };
                            for ((g = new google.maps.Map(document.getElementById(r), y)).mapTypes.set("edgtf-style", p), b = 0; b < u.length; ++b) w(u[b], f, g, c);
                            document.getElementById(r).style.height = l;
                        })(g, c, e, t, a, o, r, n, "edgtf-map-" + s, i, d, "map_" + s, "geocoder_" + s, l);
                });
        }
        function w(o, n, d, e) {
            if ("" !== o) {
                var t = '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' + o + "</p></div></div>",
                    i = new google.maps.InfoWindow({ content: t });
                e.geocode({ address: o }, function (e, t) {
                    if (t === google.maps.GeocoderStatus.OK) {
                        d.setCenter(e[0].geometry.location);
                        var a = new google.maps.Marker({ map: d, position: e[0].geometry.location, icon: n, title: o.store_title });
                        google.maps.event.addListener(a, "click", function () {
                            i.open(d, a);
                        }),
                            google.maps.event.addDomListener(window, "resize", function () {
                                d.setCenter(e[0].geometry.location);
                            });
                    }
                });
            }
        }
        ((edgtf.modules.googleMap = e).edgtfShowGoogleMap = a), (e.edgtfOnDocumentReady = t), m(document).ready(t);
    })(jQuery),
    (function (t) {
        "use strict";
        var e = {};
        function a() {
            o().init();
        }
        ((edgtf.modules.icon = e).edgtfIcon = o), (e.edgtfOnDocumentReady = a), t(document).ready(a);
        var o = function () {
            var e = t(".edgtf-icon-shortcode");
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            var e;
                            (e = t(this)).hasClass("edgtf-icon-animation") &&
                                e.appear(
                                    function () {
                                        e.parent(".edgtf-icon-animation-holder").addClass("edgtf-icon-animation-show");
                                    },
                                    { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                                ),
                                (function (e) {
                                    if (void 0 !== e.data("hover-color")) {
                                        var t = function (e) {
                                                e.data.icon.css("color", e.data.color);
                                            },
                                            a = e.find(".edgtf-icon-element"),
                                            o = e.data("hover-color"),
                                            n = a.css("color");
                                        "" !== o && (e.on("mouseenter", { icon: a, color: o }, t), e.on("mouseleave", { icon: a, color: n }, t));
                                    }
                                })(t(this)),
                                (function (e) {
                                    if (void 0 !== e.data("hover-background-color")) {
                                        var t = function (e) {
                                                e.data.icon.css("background-color", e.data.color);
                                            },
                                            a = e.data("hover-background-color"),
                                            o = e.css("background-color");
                                        "" !== a && (e.on("mouseenter", { icon: e, color: a }, t), e.on("mouseleave", { icon: e, color: o }, t));
                                    }
                                })(t(this)),
                                (function (e) {
                                    if (void 0 !== e.data("hover-border-color")) {
                                        var t = function (e) {
                                                e.data.icon.css("border-color", e.data.color);
                                            },
                                            a = e.data("hover-border-color"),
                                            o = e.css("borderTopColor");
                                        "" !== a && (e.on("mouseenter", { icon: e, color: a }, t), e.on("mouseleave", { icon: e, color: o }, t));
                                    }
                                })(t(this));
                        });
                },
            };
        };
    })(jQuery),
    (function (t) {
        "use strict";
        var e = {};
        function a() {
            o().init();
        }
        ((edgtf.modules.iconListItem = e).edgtfInitIconList = o), (e.edgtfOnDocumentReady = a), t(document).ready(a);
        var o = function () {
            var e = t(".edgtf-animate-list");
            return {
                init: function () {
                    e.length &&
                        e.each(function () {
                            var e;
                            (e = t(this)),
                                setTimeout(function () {
                                    e.appear(
                                        function () {
                                            e.addClass("edgtf-appeared");
                                        },
                                        { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                                    );
                                }, 30);
                        });
                },
            };
        };
    })(jQuery),
    (function (g) {
        "use strict";
        var e = {};
        function t() {
            setTimeout(function () {
                a();
            }, 100);
        }
        function a() {
            if (1024 < edgtf.windowWidth) {
                var e = g(".edgtf-image-showcase");
                e.length &&
                    e.each(function () {
                        var e,
                            t = g(this),
                            a = t.find(".edgtf-is-slider .owl-stage"),
                            o = t.find(".edgtf-is-info");
                        if (t.hasClass("edgtf-is-full-height")) {
                            var n = t.find(".edgtf-is-image"),
                                d = t.offset().top,
                                i = g(".edgtf-page-footer"),
                                s = i.length ? i.outerHeight() : 0,
                                r = g(".edgtf-content-bottom"),
                                l = r.length ? r.outerHeight() : 0,
                                f = edgtf.windowHeight - d - s - l;
                            n.css("height", f);
                        }
                        (e = a.length ? a.height() : 0), o.length && 0 < e && t.height(e);
                    });
            }
        }
        ((edgtf.modules.imageShowcase = e).edgtfInitImageShowcase = a), (e.edgtfOnWindowLoad = t), g(window).load(t);
    })(jQuery),
    (function (t) {
        "use strict";
        var e = {};
        function a() {
            o();
        }
        function o() {
            var e = t(".edgtf-pie-chart-holder");
            e.length &&
                e.each(function () {
                    var a = t(this),
                        o = a.children(".edgtf-pc-percentage"),
                        n = "#6b54b6",
                        d = "#ffffff",
                        i = 176;
                    void 0 !== o.data("size") && "" !== o.data("size") && (i = o.data("size")),
                        void 0 !== o.data("bar-color") && "" !== o.data("bar-color") && (n = o.data("bar-color")),
                        void 0 !== o.data("track-color") && "" !== o.data("track-color") && (d = o.data("track-color")),
                        o.appear(
                            function () {
                                var e, t;
                                (e = o.find(".edgtf-pc-percent")),
                                    (t = parseFloat(e.text())),
                                    e.countTo({ from: 0, to: t, speed: 1500, refreshInterval: 50 }),
                                    a.css("opacity", "1"),
                                    o.easyPieChart({ barColor: n, trackColor: d, scaleColor: !1, lineCap: "butt", lineWidth: 3, animate: 1500, size: i });
                            },
                            { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                        );
                });
        }
        ((edgtf.modules.pieChart = e).edgtfInitPieChart = o), (e.edgtfOnDocumentReady = a), t(document).ready(a);
    })(jQuery),
    (function (t) {
        "use strict";
        var e = {};
        function a() {
            o();
        }
        function o() {
            var e = t(".edgtf-process-holder");
            e.length &&
                e.each(function () {
                    var e = t(this);
                    e.appear(
                        function () {
                            e.addClass("edgtf-process-appeared");
                        },
                        { accX: 0, accY: edgtfGlobalVars.vars.edgtfElementAppearAmount }
                    );
                });
        }
        ((edgtf.modules.process = e).edgtfInitProcess = o), (e.edgtfOnDocumentReady = a), t(document).ready(a);
    })(jQuery),
    (function (i) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = i(".edgtf-progress-bar");
            e.length &&
                e.each(function () {
                    var a = i(this),
                        o = a.find(".edgtf-pb-content"),
                        n = a.find(".edgtf-pb-percent"),
                        d = o.data("percentage");
                    a.appear(function () {
                        var e, t;
                        (e = n),
                            (t = parseFloat(d)),
                            e.length &&
                                e.each(function () {
                                    var e = i(this);
                                    e.css("opacity", "1"), e.countTo({ from: 0, to: t, speed: 2e3, refreshInterval: 50 });
                                }),
                            o.css("width", "0%").animate({ width: d + "%" }, 2e3),
                            a.hasClass("edgtf-pb-percent-floating") && n.css("left", "0%").animate({ left: d + "%" }, 2e3);
                    });
                });
        }
        ((edgtf.modules.progressBar = e).edgtfInitProgressBars = a), (e.edgtfOnDocumentReady = t), i(document).ready(t);
    })(jQuery),
    (function (d) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = d(".edgtf-tabs");
            e.length &&
                e.each(function () {
                    var e = d(this);
                    e.children(".edgtf-tab-container").each(function (e) {
                        e += 1;
                        var t = d(this),
                            a = t.attr("id"),
                            o = t.parent().find(".edgtf-tabs-nav li:nth-child(" + e + ") a"),
                            n = o.attr("href");
                        -1 < (a = "#" + a).indexOf(n) && o.attr("href", a);
                    }),
                        e.tabs(),
                        d(".edgtf-tabs a.edgtf-external-link").unbind("click");
                });
        }
        ((edgtf.modules.tabs = e).edgtfInitTabs = a), (e.edgtfOnDocumentReady = t), d(document).ready(t);
    })(jQuery),
    (function (f) {
        "use strict";
        var e = {};
        function t() {
            a();
        }
        function a() {
            var e = f(".edgtf-testimonials-holder.edgtf-testimonials-carousel");
            e.length &&
                e.each(function () {
                    var e = f(this),
                        t = e.find(".edgtf-testimonials-main"),
                        n = e.children(".edgtf-testimonial-image-nav"),
                        a = !0,
                        o = !0,
                        d = 5e3,
                        i = 600,
                        s = !1;
                    if (
                        ("no" === t.data("enable-loop") && (a = !1),
                        "no" === t.data("enable-autoplay") && (o = !1),
                        void 0 !== t.data("slider-speed") && !1 !== t.data("slider-speed") && (d = t.data("slider-speed")),
                        void 0 !== t.data("slider-speed-animation") && !1 !== t.data("slider-speed-animation") && (i = t.data("slider-speed-animation")),
                        edgtf.windowWidth < 680 && (s = !0),
                        t.length && n.length)
                    ) {
                        var r = t.owlCarousel({
                                items: 1,
                                loop: a,
                                autoplay: o,
                                autoplayTimeout: d,
                                smartSpeed: i,
                                autoplayHoverPause: !1,
                                dots: !1,
                                nav: !1,
                                mouseDrag: !1,
                                touchDrag: s,
                                onInitialize: function () {
                                    t.css("visibility", "visible");
                                },
                            }),
                            l = n.owlCarousel({
                                loop: a,
                                autoplay: o,
                                autoplayTimeout: d,
                                smartSpeed: i,
                                autoplayHoverPause: !1,
                                center: !0,
                                dots: !1,
                                nav: !1,
                                mouseDrag: !1,
                                touchDrag: !1,
                                responsive: { 1025: { items: 5 }, 0: { items: 3 } },
                                onInitialize: function () {
                                    n.css("visibility", "visible"), e.css("opacity", "1");
                                },
                            });
                        n.find(".owl-item").on("click touchpress", function (e) {
                            e.preventDefault();
                            var t = f(this).index(),
                                a = n.find(".owl-item.cloned").length,
                                o = 0 <= t - a / 2 ? t - a / 2 : t;
                            l.trigger("to.owl.carousel", o), r.trigger("to.owl.carousel", o);
                        });
                    }
                });
        }
        ((edgtf.modules.testimonialsCarousel = e).edgtfInitTestimonials = a), (e.edgtfOnWindowLoad = t), f(window).load(t);
    })(jQuery),
    (function (u) {
        "use strict";
        var e = {};
        function t() {
            var e;
            (e = u(".edgtf-testimonials-image-pagination-inner")).length &&
                e.each(function () {
                    var t = u(this),
                        e = t.children().length,
                        a = !0,
                        o = !0,
                        n = 3500,
                        d = 500,
                        i = !1,
                        s = !1,
                        r = !1,
                        l = !0,
                        f = !1,
                        g = t;
                    if (
                        ("no" === g.data("enable-loop") && (a = !1),
                        void 0 !== g.data("slider-speed") && !1 !== g.data("slider-speed") && (n = g.data("slider-speed")),
                        void 0 !== g.data("slider-speed-animation") && !1 !== g.data("slider-speed-animation") && (d = g.data("slider-speed-animation")),
                        "yes" === g.data("enable-auto-width") && (i = !0),
                        void 0 !== g.data("slider-animate-in") && !1 !== g.data("slider-animate-in") && (s = g.data("slider-animate-in")),
                        void 0 !== g.data("slider-animate-out") && !1 !== g.data("slider-animate-out") && (r = g.data("slider-animate-out")),
                        "no" === g.data("enable-navigation") && (l = !1),
                        "yes" === g.data("enable-pagination") && (f = !0),
                        l && f && t.addClass("edgtf-slider-has-both-nav"),
                        f)
                    ) {
                        var c = "#edgtf-testimonial-pagination";
                        u(".edgtf-tsp-item").on("click", function () {
                            t.trigger("to.owl.carousel", [u(this).index(), 300]);
                        });
                    }
                    e <= 1 && (f = l = o = a = !1),
                        t.waitForImages(function () {
                            u(this).owlCarousel({
                                items: 1,
                                loop: a,
                                autoplay: o,
                                autoplayHoverPause: !1,
                                autoplayTimeout: n,
                                smartSpeed: d,
                                margin: 0,
                                stagePadding: 0,
                                center: !1,
                                autoWidth: i,
                                animateIn: s,
                                animateOut: r,
                                dots: f,
                                dotsContainer: c,
                                nav: l,
                                drag: !0,
                                callbacks: !0,
                                navText: ['<span class="edgtf-prev-icon ion-chevron-left"></span>', '<span class="edgtf-next-icon ion-chevron-right"></span>'],
                                onInitialize: function () {
                                    t.css("visibility", "visible");
                                },
                                onDrag: function (e) {
                                    edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && 0 < e.isTrigger && t.addClass("edgtf-slider-is-moving");
                                },
                                onDragged: function () {
                                    edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") &&
                                        t.hasClass("edgtf-slider-is-moving") &&
                                        setTimeout(function () {
                                            t.removeClass("edgtf-slider-is-moving");
                                        }, 500);
                                },
                            });
                        });
                });
        }
        ((edgtf.modules.testimonialsImagePagination = e).edgtfOnDocumentReady = t), u(document).ready(t);
    })(jQuery);
!(function (d, l) {
    "use strict";
    var e = !1,
        o = !1;
    if (l.querySelector) if (d.addEventListener) e = !0;
    if (((d.wp = d.wp || {}), !d.wp.receiveEmbedMessage))
        if (
            ((d.wp.receiveEmbedMessage = function (e) {
                var t = e.data;
                if (t)
                    if (t.secret || t.message || t.value)
                        if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                            var r,
                                a,
                                i,
                                s,
                                n,
                                o = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'),
                                c = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]');
                            for (r = 0; r < c.length; r++) c[r].style.display = "none";
                            for (r = 0; r < o.length; r++)
                                if (((a = o[r]), e.source === a.contentWindow)) {
                                    if ((a.removeAttribute("style"), "height" === t.message)) {
                                        if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                                        else if (~~i < 200) i = 200;
                                        a.height = i;
                                    }
                                    if ("link" === t.message)
                                        if (((s = l.createElement("a")), (n = l.createElement("a")), (s.href = a.getAttribute("src")), (n.href = t.value), n.host === s.host)) if (l.activeElement === a) d.top.location.href = t.value;
                                }
                        }
            }),
            e)
        )
            d.addEventListener("message", d.wp.receiveEmbedMessage, !1), l.addEventListener("DOMContentLoaded", t, !1), d.addEventListener("load", t, !1);
    function t() {
        if (!o) {
            o = !0;
            var e,
                t,
                r,
                a,
                i = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                s = !!navigator.userAgent.match(/Trident.*rv:11\./),
                n = l.querySelectorAll("iframe.wp-embedded-content");
            for (t = 0; t < n.length; t++) {
                if (!(r = n[t]).getAttribute("data-secret")) (a = Math.random().toString(36).substr(2, 10)), (r.src += "#?secret=" + a), r.setAttribute("data-secret", a);
                if (i || s) (e = r.cloneNode(!0)).removeAttribute("security"), r.parentNode.replaceChild(e, r);
            }
        }
    }
})(window, document);
/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2019 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */ (document.documentElement.className += " js_active "),
    (document.documentElement.className += "ontouchstart" in document.documentElement ? " vc_mobile " : " vc_desktop "),
    (function () {
        for (var prefix = ["-webkit-", "-moz-", "-ms-", "-o-", ""], i = 0; i < prefix.length; i++) prefix[i] + "transform" in document.documentElement.style && (document.documentElement.className += " vc_transform ");
    })(),
    (function ($) {
        "function" != typeof window.vc_js &&
            (window.vc_js = function () {
                "use strict";
                vc_toggleBehaviour(),
                    vc_tabsBehaviour(),
                    vc_accordionBehaviour(),
                    vc_teaserGrid(),
                    vc_carouselBehaviour(),
                    vc_slidersBehaviour(),
                    vc_prettyPhoto(),
                    vc_pinterest(),
                    vc_progress_bar(),
                    vc_plugin_flexslider(),
                    vc_gridBehaviour(),
                    vc_rowBehaviour(),
                    vc_prepareHoverBox(),
                    vc_googleMapsPointer(),
                    vc_ttaActivation(),
                    jQuery(document).trigger("vc_js"),
                    window.setTimeout(vc_waypoints, 500);
            }),
            "function" != typeof window.vc_plugin_flexslider &&
                (window.vc_plugin_flexslider = function ($parent) {
                    ($parent ? $parent.find(".wpb_flexslider") : jQuery(".wpb_flexslider")).each(function () {
                        var this_element = jQuery(this),
                            sliderTimeout = 1e3 * parseInt(this_element.attr("data-interval"), 10),
                            sliderFx = this_element.attr("data-flex_fx"),
                            slideshow = !0;
                        0 === sliderTimeout && (slideshow = !1), this_element.is(":visible") && this_element.flexslider({ animation: sliderFx, slideshow: slideshow, slideshowSpeed: sliderTimeout, sliderSpeed: 800, smoothHeight: !0 });
                    });
                }),
            "function" != typeof window.vc_googleplus &&
                (window.vc_googleplus = function () {
                    0 < jQuery(".wpb_googleplus").length &&
                        (function () {
                            var po = document.createElement("script");
                            (po.type = "text/javascript"), (po.async = !0), (po.src = "https://apis.google.com/js/plusone.js");
                            var s = document.getElementsByTagName("script")[0];
                            s.parentNode.insertBefore(po, s);
                        })();
                }),
            "function" != typeof window.vc_pinterest &&
                (window.vc_pinterest = function () {
                    0 < jQuery(".wpb_pinterest").length &&
                        (function () {
                            var po = document.createElement("script");
                            (po.type = "text/javascript"), (po.async = !0), (po.src = "https://assets.pinterest.com/js/pinit.js");
                            var s = document.getElementsByTagName("script")[0];
                            s.parentNode.insertBefore(po, s);
                        })();
                }),
            "function" != typeof window.vc_progress_bar &&
                (window.vc_progress_bar = function () {
                    void 0 !== jQuery.fn.vcwaypoint &&
                        jQuery(".vc_progress_bar").each(function () {
                            var $el = jQuery(this);
                            $el.vcwaypoint(
                                function () {
                                    $el.find(".vc_single_bar").each(function (index) {
                                        var bar = jQuery(this).find(".vc_bar"),
                                            val = bar.data("percentage-value");
                                        setTimeout(function () {
                                            bar.css({ width: val + "%" });
                                        }, 200 * index);
                                    });
                                },
                                { offset: "85%" }
                            );
                        });
                }),
            "function" != typeof window.vc_waypoints &&
                (window.vc_waypoints = function () {
                    void 0 !== jQuery.fn.vcwaypoint &&
                        jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
                            var $el = jQuery(this);
                            $el.vcwaypoint(
                                function () {
                                    $el.addClass("wpb_start_animation animated");
                                },
                                { offset: "85%" }
                            );
                        });
                }),
            "function" != typeof window.vc_toggleBehaviour &&
                (window.vc_toggleBehaviour = function ($el) {
                    function event(e) {
                        e && e.preventDefault && e.preventDefault();
                        var element = jQuery(this).closest(".vc_toggle"),
                            content = element.find(".vc_toggle_content");
                        element.hasClass("vc_toggle_active")
                            ? content.slideUp({
                                  duration: 300,
                                  complete: function () {
                                      element.removeClass("vc_toggle_active");
                                  },
                              })
                            : content.slideDown({
                                  duration: 300,
                                  complete: function () {
                                      element.addClass("vc_toggle_active");
                                  },
                              });
                    }
                    $el ? ($el.hasClass("vc_toggle_title") ? $el.unbind("click").on("click", event) : $el.find(".vc_toggle_title").off("click").on("click", event)) : jQuery(".vc_toggle_title").off("click").on("click", event);
                }),
            "function" != typeof window.vc_tabsBehaviour &&
                (window.vc_tabsBehaviour = function ($tab) {
                    if (jQuery.ui) {
                        var $call = $tab || jQuery(".wpb_tabs, .wpb_tour"),
                            ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split(".") : "1.10",
                            old_version = 1 === parseInt(ver[0], 10) && parseInt(ver[1], 10) < 9;
                        $call.each(function (index) {
                            var $tabs,
                                interval = jQuery(this).attr("data-interval"),
                                tabs_array = [];
                            if (
                                (($tabs = jQuery(this)
                                    .find(".wpb_tour_tabs_wrapper")
                                    .tabs({
                                        show: function (event, ui) {
                                            wpb_prepare_tab_content(event, ui);
                                        },
                                        activate: function (event, ui) {
                                            wpb_prepare_tab_content(event, ui);
                                        },
                                    })),
                                interval && 0 < interval)
                            )
                                try {
                                    $tabs.tabs("rotate", 1e3 * interval);
                                } catch (err) {
                                    window.console && window.console.warn && console.warn("tabs behaviours error", err);
                                }
                            jQuery(this)
                                .find(".wpb_tab")
                                .each(function () {
                                    tabs_array.push(this.id);
                                }),
                                jQuery(this)
                                    .find(".wpb_tabs_nav li")
                                    .on("click", function (e) {
                                        return e && e.preventDefault && e.preventDefault(), old_version ? $tabs.tabs("select", jQuery("a", this).attr("href")) : $tabs.tabs("option", "active", jQuery(this).index()), !1;
                                    }),
                                jQuery(this)
                                    .find(".wpb_prev_slide a, .wpb_next_slide a")
                                    .on("click", function (e) {
                                        var index, length;
                                        e && e.preventDefault && e.preventDefault(),
                                            old_version
                                                ? ((index = $tabs.tabs("option", "selected")),
                                                  jQuery(this).parent().hasClass("wpb_next_slide") ? index++ : index--,
                                                  index < 0 ? (index = $tabs.tabs("length") - 1) : index >= $tabs.tabs("length") && (index = 0),
                                                  $tabs.tabs("select", index))
                                                : ((index = $tabs.tabs("option", "active")),
                                                  (length = $tabs.find(".wpb_tab").length),
                                                  (index = jQuery(this).parent().hasClass("wpb_next_slide") ? (length <= index + 1 ? 0 : index + 1) : index - 1 < 0 ? length - 1 : index - 1),
                                                  $tabs.tabs("option", "active", index));
                                    });
                        });
                    }
                }),
            "function" != typeof window.vc_accordionBehaviour &&
                (window.vc_accordionBehaviour = function () {
                    jQuery(".wpb_accordion").each(function (index) {
                        var $tabs,
                            active_tab,
                            collapsible,
                            $this = jQuery(this);
                        $this.attr("data-interval"),
                            (collapsible = !1 === (active_tab = !isNaN(jQuery(this).data("active-tab")) && 0 < parseInt($this.data("active-tab"), 10) && parseInt($this.data("active-tab"), 10) - 1) || "yes" === $this.data("collapsible")),
                            ($tabs = $this.find(".wpb_accordion_wrapper").accordion({
                                header: "> div > h3",
                                autoHeight: !1,
                                heightStyle: "content",
                                active: active_tab,
                                collapsible: collapsible,
                                navigation: !0,
                                activate: vc_accordionActivate,
                                change: function (event, ui) {
                                    void 0 !== jQuery.fn.isotope && ui.newContent.find(".isotope").isotope("layout"), vc_carouselBehaviour(ui.newPanel);
                                },
                            })),
                            !0 === $this.data("vcDisableKeydown") && ($tabs.data("uiAccordion")._keydown = function () {});
                    });
                }),
            "function" != typeof window.vc_teaserGrid &&
                (window.vc_teaserGrid = function () {
                    var layout_modes = { fitrows: "fitRows", masonry: "masonry" };
                    jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function () {
                        var $container = jQuery(this),
                            $thumbs = $container.find(".wpb_thumbnails"),
                            layout_mode = $thumbs.attr("data-layout-mode");
                        $thumbs.isotope({ itemSelector: ".isotope-item", layoutMode: void 0 === layout_modes[layout_mode] ? "fitRows" : layout_modes[layout_mode] }),
                            $container
                                .find(".categories_filter a")
                                .data("isotope", $thumbs)
                                .on("click", function (e) {
                                    e && e.preventDefault && e.preventDefault();
                                    var $thumbs = jQuery(this).data("isotope");
                                    jQuery(this).parent().parent().find(".active").removeClass("active"), jQuery(this).parent().addClass("active"), $thumbs.isotope({ filter: jQuery(this).attr("data-filter") });
                                }),
                            jQuery(window).bind("load resize", function () {
                                $thumbs.isotope("layout");
                            });
                    });
                }),
            "function" != typeof window.vc_carouselBehaviour &&
                (window.vc_carouselBehaviour = function ($parent) {
                    ($parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel")).each(function () {
                        var $this = jQuery(this);
                        if (!0 !== $this.data("carousel_enabled") && $this.is(":visible")) {
                            $this.data("carousel_enabled", !0);
                            getColumnsCount(jQuery(this));
                            jQuery(this).hasClass("columns_count_1") && 900;
                            var carousel_li = jQuery(this).find(".wpb_thumbnails-fluid li");
                            carousel_li.css({ "margin-right": carousel_li.css("margin-left"), "margin-left": 0 });
                            var fluid_ul = jQuery(this).find("ul.wpb_thumbnails-fluid");
                            fluid_ul.width(fluid_ul.width() + 300),
                                jQuery(window).on("resize", function () {
                                    screen_size != (screen_size = getSizeName()) &&
                                        window.setTimeout(function () {
                                            location.reload();
                                        }, 20);
                                });
                        }
                    });
                }),
            "function" != typeof window.vc_slidersBehaviour &&
                (window.vc_slidersBehaviour = function () {
                    jQuery(".wpb_gallery_slides").each(function (index) {
                        var $imagesGrid,
                            this_element = jQuery(this);
                        if (this_element.hasClass("wpb_slider_nivo")) {
                            var sliderTimeout = 1e3 * this_element.attr("data-interval");
                            0 === sliderTimeout && (sliderTimeout = 9999999999),
                                this_element.find(".nivoSlider").nivoSlider({
                                    effect: "boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse",
                                    slices: 15,
                                    boxCols: 8,
                                    boxRows: 4,
                                    animSpeed: 800,
                                    pauseTime: sliderTimeout,
                                    startSlide: 0,
                                    directionNav: !0,
                                    directionNavHide: !0,
                                    controlNav: !0,
                                    keyboardNav: !1,
                                    pauseOnHover: !0,
                                    manualAdvance: !1,
                                    prevText: "Prev",
                                    nextText: "Next",
                                });
                        } else
                            this_element.hasClass("wpb_image_grid") &&
                                (jQuery.fn.imagesLoaded
                                    ? ($imagesGrid = this_element.find(".wpb_image_grid_ul").imagesLoaded(function () {
                                          $imagesGrid.isotope({ itemSelector: ".isotope-item", layoutMode: "fitRows" });
                                      }))
                                    : this_element.find(".wpb_image_grid_ul").isotope({ itemSelector: ".isotope-item", layoutMode: "fitRows" }));
                    });
                }),
            "function" != typeof window.vc_prettyPhoto &&
                (window.vc_prettyPhoto = function () {
                    try {
                        jQuery &&
                            jQuery.fn &&
                            jQuery.fn.prettyPhoto &&
                            jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
                                animationSpeed: "normal",
                                hook: "data-rel",
                                padding: 15,
                                opacity: 0.7,
                                showTitle: !0,
                                allowresize: !0,
                                counter_separator_label: "/",
                                hideflash: !1,
                                deeplinking: !1,
                                modal: !1,
                                callback: function () {
                                    -1 < location.href.indexOf("#!prettyPhoto") && (location.hash = "");
                                },
                                social_tools: "",
                            });
                    } catch (err) {
                        window.console && window.console.warn && window.console.warn("vc_prettyPhoto initialize error", err);
                    }
                }),
            "function" != typeof window.vc_google_fonts &&
                (window.vc_google_fonts = function () {
                    return window.console && window.console.warn && window.console.warn("function vc_google_fonts is deprecated, no need to use it"), !1;
                }),
            (window.vcParallaxSkroll = !1),
            "function" != typeof window.vc_rowBehaviour &&
                (window.vc_rowBehaviour = function () {
                    var vcSkrollrOptions,
                        callSkrollInit,
                        $ = window.jQuery;
                    function fullWidthRow() {
                        var $elements = $('[data-vc-full-width="true"]');
                        $.each($elements, function (key, item) {
                            var $el = $(this);
                            $el.addClass("vc_hidden");
                            var $el_full = $el.next(".vc_row-full-width");
                            if (($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length)) {
                                var padding,
                                    paddingRight,
                                    el_margin_left = parseInt($el.css("margin-left"), 10),
                                    el_margin_right = parseInt($el.css("margin-right"), 10),
                                    offset = 0 - $el_full.offset().left - el_margin_left,
                                    width = $(window).width();
                                if (
                                    ("rtl" === $el.css("direction") && ((offset -= $el_full.width()), (offset += width), (offset += el_margin_left), (offset += el_margin_right)),
                                    $el.css({ position: "relative", left: offset, "box-sizing": "border-box", width: width }),
                                    !$el.data("vcStretchContent"))
                                )
                                    "rtl" === $el.css("direction")
                                        ? ((padding = offset) < 0 && (padding = 0), (paddingRight = offset) < 0 && (paddingRight = 0))
                                        : ((padding = -1 * offset) < 0 && (padding = 0), (paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right) < 0 && (paddingRight = 0)),
                                        $el.css({ "padding-left": padding + "px", "padding-right": paddingRight + "px" });
                                $el.attr("data-vc-full-width-init", "true"),
                                    $el.removeClass("vc_hidden"),
                                    $(document).trigger("vc-full-width-row-single", { el: $el, offset: offset, marginLeft: el_margin_left, marginRight: el_margin_right, elFull: $el_full, width: width });
                            }
                        }),
                            $(document).trigger("vc-full-width-row", $elements);
                    }
                    function fullHeightRow() {
                        var windowHeight,
                            offsetTop,
                            fullHeight,
                            $element = $(".vc_row-o-full-height:first");
                        $element.length && ((windowHeight = $(window).height()), (offsetTop = $element.offset().top) < windowHeight && ((fullHeight = 100 - offsetTop / (windowHeight / 100)), $element.css("min-height", fullHeight + "vh")));
                        $(document).trigger("vc-full-height-row", $element);
                    }
                    $(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour", fullWidthRow).on("resize.vcRowBehaviour", fullHeightRow),
                        fullWidthRow(),
                        fullHeightRow(),
                        (0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./)) &&
                            $(".vc_row-o-full-height").each(function () {
                                "flex" === $(this).css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>');
                            }),
                        vc_initVideoBackgrounds(),
                        (callSkrollInit = !1),
                        window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(),
                        $(".vc_parallax-inner").remove(),
                        $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"),
                        $("[data-vc-parallax]").each(function () {
                            var skrollrSize, skrollrStart, $parallaxElement, parallaxImage, youtubeId;
                            (callSkrollInit = !0),
                                "on" === $(this).data("vcParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"),
                                (skrollrSize = 100 * $(this).data("vcParallax")),
                                ($parallaxElement = $("<div />").addClass("vc_parallax-inner").appendTo($(this))).height(skrollrSize + "%"),
                                (parallaxImage = $(this).data("vcParallaxImage")),
                                (youtubeId = vcExtractYoutubeId(parallaxImage))
                                    ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId)
                                    : void 0 !== parallaxImage && $parallaxElement.css("background-image", "url(" + parallaxImage + ")"),
                                (skrollrStart = -(skrollrSize - 100)),
                                $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: 0%;");
                        }),
                        callSkrollInit &&
                            window.skrollr &&
                            ((vcSkrollrOptions = {
                                forceHeight: !1,
                                smoothScrolling: !1,
                                mobileCheck: function () {
                                    return !1;
                                },
                            }),
                            (window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions)),
                            window.vcParallaxSkroll);
                }),
            "function" != typeof window.vc_gridBehaviour &&
                (window.vc_gridBehaviour = function () {
                    jQuery.fn.vcGrid && jQuery("[data-vc-grid]").vcGrid();
                }),
            "function" != typeof window.getColumnsCount &&
                (window.getColumnsCount = function (el) {
                    for (var find = !1, i = 1; !1 === find; ) {
                        if (el.hasClass("columns_count_" + i)) return (find = !0), i;
                        i++;
                    }
                });
        var screen_size = getSizeName();
        function getSizeName() {
            var screen_w = jQuery(window).width();
            return 1170 < screen_w ? "desktop_wide" : 960 < screen_w && screen_w < 1169 ? "desktop" : 768 < screen_w && screen_w < 959 ? "tablet" : 300 < screen_w && screen_w < 767 ? "mobile" : screen_w < 300 ? "mobile_portrait" : "";
        }
        "function" != typeof window.wpb_prepare_tab_content &&
            (window.wpb_prepare_tab_content = function (event, ui) {
                var $ui_panel,
                    $google_maps,
                    panel = ui.panel || ui.newPanel,
                    $pie_charts = panel.find(".vc_pie_chart:not(.vc_ready)"),
                    $round_charts = panel.find(".vc_round-chart"),
                    $line_charts = panel.find(".vc_line-chart"),
                    $carousel = panel.find('[data-ride="vc_carousel"]');
                if (
                    (vc_carouselBehaviour(),
                    vc_plugin_flexslider(panel),
                    ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length &&
                        ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
                            var grid = jQuery(this).data("vcGrid");
                            grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
                        }),
                    panel.find(".vc_masonry_media_grid, .vc_masonry_grid").length &&
                        panel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
                            var grid = jQuery(this).data("vcGrid");
                            grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
                        }),
                    $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(),
                    $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({ reload: !1 }),
                    $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({ reload: !1 }),
                    $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"),
                    ($ui_panel = panel.find(".isotope, .wpb_image_grid_ul")),
                    ($google_maps = panel.find(".wpb_gmaps_widget")),
                    0 < $ui_panel.length && $ui_panel.isotope("layout"),
                    $google_maps.length && !$google_maps.is(".map_ready"))
                ) {
                    var $frame = $google_maps.find("iframe");
                    $frame.attr("src", $frame.attr("src")), $google_maps.addClass("map_ready");
                }
                panel.parents(".isotope").length &&
                    panel.parents(".isotope").each(function () {
                        jQuery(this).isotope("layout");
                    });
            }),
            "function" != typeof window.vc_ttaActivation &&
                (window.vc_ttaActivation = function () {
                    jQuery("[data-vc-accordion]").on("show.vc.accordion", function (e) {
                        var $ = window.jQuery,
                            ui = {};
                        (ui.newPanel = $(this).data("vc.accordion").getTarget()), window.wpb_prepare_tab_content(e, ui);
                    });
                }),
            "function" != typeof window.vc_accordionActivate &&
                (window.vc_accordionActivate = function (event, ui) {
                    if (ui.newPanel.length && ui.newHeader.length) {
                        var $pie_charts = ui.newPanel.find(".vc_pie_chart:not(.vc_ready)"),
                            $round_charts = ui.newPanel.find(".vc_round-chart"),
                            $line_charts = ui.newPanel.find(".vc_line-chart"),
                            $carousel = ui.newPanel.find('[data-ride="vc_carousel"]');
                        void 0 !== jQuery.fn.isotope && ui.newPanel.find(".isotope, .wpb_image_grid_ul").isotope("layout"),
                            ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length &&
                                ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
                                    var grid = jQuery(this).data("vcGrid");
                                    grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
                                }),
                            vc_carouselBehaviour(ui.newPanel),
                            vc_plugin_flexslider(ui.newPanel),
                            $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(),
                            $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({ reload: !1 }),
                            $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({ reload: !1 }),
                            $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"),
                            ui.newPanel.parents(".isotope").length &&
                                ui.newPanel.parents(".isotope").each(function () {
                                    jQuery(this).isotope("layout");
                                });
                    }
                }),
            "function" != typeof window.initVideoBackgrounds &&
                (window.initVideoBackgrounds = function () {
                    return window.console && window.console.warn && window.console.warn("this function is deprecated use vc_initVideoBackgrounds"), vc_initVideoBackgrounds();
                }),
            "function" != typeof window.vc_initVideoBackgrounds &&
                (window.vc_initVideoBackgrounds = function () {
                    jQuery("[data-vc-video-bg]").each(function () {
                        var youtubeUrl,
                            youtubeId,
                            $element = jQuery(this);
                        $element.data("vcVideoBg")
                            ? ((youtubeUrl = $element.data("vcVideoBg")),
                              (youtubeId = vcExtractYoutubeId(youtubeUrl)) && ($element.find(".vc_video-bg").remove(), insertYoutubeVideoAsBackground($element, youtubeId)),
                              jQuery(window).on("grid:items:added", function (event, $grid) {
                                  $element.has($grid).length && vcResizeVideoBackground($element);
                              }))
                            : $element.find(".vc_video-bg").remove();
                    });
                }),
            "function" != typeof window.insertYoutubeVideoAsBackground &&
                (window.insertYoutubeVideoAsBackground = function ($element, youtubeId, counter) {
                    if ("undefined" == typeof YT || void 0 === YT.Player)
                        return 100 < (counter = void 0 === counter ? 0 : counter)
                            ? void console.warn("Too many attempts to load YouTube api")
                            : void setTimeout(function () {
                                  insertYoutubeVideoAsBackground($element, youtubeId, counter++);
                              }, 100);
                    var $container = $element.prepend('<div class="vc_video-bg vc_hidden-xs"><div class="inner"></div></div>').find(".inner");
                    new YT.Player($container[0], {
                        width: "100%",
                        height: "100%",
                        videoId: youtubeId,
                        playerVars: { playlist: youtubeId, iv_load_policy: 3, enablejsapi: 1, disablekb: 1, autoplay: 1, controls: 0, showinfo: 0, rel: 0, loop: 1, wmode: "transparent" },
                        events: {
                            onReady: function (event) {
                                event.target.mute().setLoop(!0);
                            },
                        },
                    }),
                        vcResizeVideoBackground($element),
                        jQuery(window).bind("resize", function () {
                            vcResizeVideoBackground($element);
                        });
                }),
            "function" != typeof window.vcResizeVideoBackground &&
                (window.vcResizeVideoBackground = function ($element) {
                    var iframeW,
                        iframeH,
                        marginLeft,
                        marginTop,
                        containerW = $element.innerWidth(),
                        containerH = $element.innerHeight();
                    containerW / containerH < 16 / 9
                        ? ((iframeW = containerH * (16 / 9)), (iframeH = containerH), (marginLeft = -Math.round((iframeW - containerW) / 2) + "px"), (marginTop = -Math.round((iframeH - containerH) / 2) + "px"))
                        : ((iframeH = (iframeW = containerW) * (9 / 16)), (marginTop = -Math.round((iframeH - containerH) / 2) + "px"), (marginLeft = -Math.round((iframeW - containerW) / 2) + "px")),
                        (iframeW += "px"),
                        (iframeH += "px"),
                        $element.find(".vc_video-bg iframe").css({ maxWidth: "1000%", marginLeft: marginLeft, marginTop: marginTop, width: iframeW, height: iframeH });
                }),
            "function" != typeof window.vcExtractYoutubeId &&
                (window.vcExtractYoutubeId = function (url) {
                    if (void 0 === url) return !1;
                    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    return null !== id && id[1];
                }),
            "function" != typeof window.vc_googleMapsPointer &&
                (window.vc_googleMapsPointer = function () {
                    var $ = window.jQuery,
                        $wpbGmapsWidget = $(".wpb_gmaps_widget");
                    $wpbGmapsWidget.on("click", function () {
                        $("iframe", this).css("pointer-events", "auto");
                    }),
                        $wpbGmapsWidget.on("mouseleave", function () {
                            $("iframe", this).css("pointer-events", "none");
                        }),
                        $(".wpb_gmaps_widget iframe").css("pointer-events", "none");
                }),
            "function" != typeof window.vc_setHoverBoxPerspective &&
                (window.vc_setHoverBoxPerspective = function (hoverBox) {
                    hoverBox.each(function () {
                        var $this = jQuery(this),
                            perspective = 4 * $this.width() + "px";
                        $this.css("perspective", perspective);
                    });
                }),
            "function" != typeof window.vc_setHoverBoxHeight &&
                (window.vc_setHoverBoxHeight = function (hoverBox) {
                    hoverBox.each(function () {
                        var $this = jQuery(this),
                            hoverBoxInner = $this.find(".vc-hoverbox-inner");
                        hoverBoxInner.css("min-height", 0);
                        var frontHeight = $this.find(".vc-hoverbox-front-inner").outerHeight(),
                            backHeight = $this.find(".vc-hoverbox-back-inner").outerHeight(),
                            hoverBoxHeight = backHeight < frontHeight ? frontHeight : backHeight;
                        hoverBoxHeight < 250 && (hoverBoxHeight = 250), hoverBoxInner.css("min-height", hoverBoxHeight + "px");
                    });
                }),
            "function" != typeof window.vc_prepareHoverBox &&
                (window.vc_prepareHoverBox = function () {
                    var hoverBox = jQuery(".vc-hoverbox");
                    vc_setHoverBoxHeight(hoverBox), vc_setHoverBoxPerspective(hoverBox);
                }),
            jQuery(document).ready(window.vc_prepareHoverBox),
            jQuery(window).resize(window.vc_prepareHoverBox),
            jQuery(document).ready(function ($) {
                window.vc_js();
            });
    })(window.jQuery);
/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */ !(function (e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], e) : e(jQuery);
})(function (d) {
    return d.widget("ui.accordion", {
        version: "1.11.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" },
            activate: null,
            beforeActivate: null,
        },
        hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" },
        showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" },
        _create: function () {
            var e = this.options;
            (this.prevShow = this.prevHide = d()),
                this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"),
                e.collapsible || (!1 !== e.active && null != e.active) || (e.active = 0),
                this._processPanels(),
                e.active < 0 && (e.active += this.headers.length),
                this._refresh();
        },
        _getCreateEventData: function () {
            return { header: this.active, panel: this.active.length ? this.active.next() : d() };
        },
        _createIcons: function () {
            var e = this.options.icons;
            e &&
                (d("<span>")
                    .addClass("ui-accordion-header-icon ui-icon " + e.header)
                    .prependTo(this.headers),
                this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),
                this.headers.addClass("ui-accordion-icons"));
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();
        },
        _destroy: function () {
            var e;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
                this.headers
                    .removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top")
                    .removeAttr("role")
                    .removeAttr("aria-expanded")
                    .removeAttr("aria-selected")
                    .removeAttr("aria-controls")
                    .removeAttr("tabIndex")
                    .removeUniqueId(),
                this._destroyIcons(),
                (e = this.headers
                    .next()
                    .removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled")
                    .css("display", "")
                    .removeAttr("role")
                    .removeAttr("aria-hidden")
                    .removeAttr("aria-labelledby")
                    .removeUniqueId()),
                "content" !== this.options.heightStyle && e.css("height", "");
        },
        _setOption: function (e, t) {
            "active" !== e
                ? ("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)),
                  this._super(e, t),
                  "collapsible" !== e || t || !1 !== this.options.active || this._activate(0),
                  "icons" === e && (this._destroyIcons(), t && this._createIcons()),
                  "disabled" === e && (this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)))
                : this._activate(t);
        },
        _keydown: function (e) {
            if (!e.altKey && !e.ctrlKey) {
                var t = d.ui.keyCode,
                    i = this.headers.length,
                    a = this.headers.index(e.target),
                    s = !1;
                switch (e.keyCode) {
                    case t.RIGHT:
                    case t.DOWN:
                        s = this.headers[(a + 1) % i];
                        break;
                    case t.LEFT:
                    case t.UP:
                        s = this.headers[(a - 1 + i) % i];
                        break;
                    case t.SPACE:
                    case t.ENTER:
                        this._eventHandler(e);
                        break;
                    case t.HOME:
                        s = this.headers[0];
                        break;
                    case t.END:
                        s = this.headers[i - 1];
                }
                s && (d(e.target).attr("tabIndex", -1), d(s).attr("tabIndex", 0), s.focus(), e.preventDefault());
            }
        },
        _panelKeyDown: function (e) {
            e.keyCode === d.ui.keyCode.UP && e.ctrlKey && d(e.currentTarget).prev().focus();
        },
        refresh: function () {
            var e = this.options;
            this._processPanels(),
                (!1 === e.active && !0 === e.collapsible) || !this.headers.length
                    ? ((e.active = !1), (this.active = d()))
                    : !1 === e.active
                    ? this._activate(0)
                    : this.active.length && !d.contains(this.element[0], this.active[0])
                    ? this.headers.length === this.headers.find(".ui-state-disabled").length
                        ? ((e.active = !1), (this.active = d()))
                        : this._activate(Math.max(0, e.active - 1))
                    : (e.active = this.headers.index(this.active)),
                this._destroyIcons(),
                this._refresh();
        },
        _processPanels: function () {
            var e = this.headers,
                t = this.panels;
            (this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all")),
                (this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()),
                t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)));
        },
        _refresh: function () {
            var i,
                e = this.options,
                t = e.heightStyle,
                a = this.element.parent();
            (this.active = this._findActive(e.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all")),
                this.active.next().addClass("ui-accordion-content-active").show(),
                this.headers
                    .attr("role", "tab")
                    .each(function () {
                        var e = d(this),
                            t = e.uniqueId().attr("id"),
                            i = e.next(),
                            a = i.uniqueId().attr("id");
                        e.attr("aria-controls", a), i.attr("aria-labelledby", t);
                    })
                    .next()
                    .attr("role", "tabpanel"),
                this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(),
                this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0),
                this._createIcons(),
                this._setupEvents(e.event),
                "fill" === t
                    ? ((i = a.height()),
                      this.element.siblings(":visible").each(function () {
                          var e = d(this),
                              t = e.css("position");
                          "absolute" !== t && "fixed" !== t && (i -= e.outerHeight(!0));
                      }),
                      this.headers.each(function () {
                          i -= d(this).outerHeight(!0);
                      }),
                      this.headers
                          .next()
                          .each(function () {
                              d(this).height(Math.max(0, i - d(this).innerHeight() + d(this).height()));
                          })
                          .css("overflow", "auto"))
                    : "auto" === t &&
                      ((i = 0),
                      this.headers
                          .next()
                          .each(function () {
                              i = Math.max(i, d(this).css("height", "").height());
                          })
                          .height(i));
        },
        _activate: function (e) {
            var t = this._findActive(e)[0];
            t !== this.active[0] && ((t = t || this.active[0]), this._eventHandler({ target: t, currentTarget: t, preventDefault: d.noop }));
        },
        _findActive: function (e) {
            return "number" == typeof e ? this.headers.eq(e) : d();
        },
        _setupEvents: function (e) {
            var i = { keydown: "_keydown" };
            e &&
                d.each(e.split(" "), function (e, t) {
                    i[t] = "_eventHandler";
                }),
                this._off(this.headers.add(this.headers.next())),
                this._on(this.headers, i),
                this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
                this._hoverable(this.headers),
                this._focusable(this.headers);
        },
        _eventHandler: function (e) {
            var t = this.options,
                i = this.active,
                a = d(e.currentTarget),
                s = a[0] === i[0],
                n = s && t.collapsible,
                r = n ? d() : a.next(),
                o = i.next(),
                h = { oldHeader: i, oldPanel: o, newHeader: n ? d() : a, newPanel: r };
            e.preventDefault(),
                (s && !t.collapsible) ||
                    !1 === this._trigger("beforeActivate", e, h) ||
                    ((t.active = !n && this.headers.index(a)),
                    (this.active = s ? d() : a),
                    this._toggle(h),
                    i.removeClass("ui-accordion-header-active ui-state-active"),
                    t.icons && i.children(".ui-accordion-header-icon").removeClass(t.icons.activeHeader).addClass(t.icons.header),
                    s ||
                        (a.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),
                        t.icons && a.children(".ui-accordion-header-icon").removeClass(t.icons.header).addClass(t.icons.activeHeader),
                        a.next().addClass("ui-accordion-content-active")));
        },
        _toggle: function (e) {
            var t = e.newPanel,
                i = this.prevShow.length ? this.prevShow : e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0),
                (this.prevShow = t),
                (this.prevHide = i),
                this.options.animate ? this._animate(t, i, e) : (i.hide(), t.show(), this._toggleComplete(e)),
                i.attr({ "aria-hidden": "true" }),
                i.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
                t.length && i.length
                    ? i.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
                    : t.length &&
                      this.headers
                          .filter(function () {
                              return 0 === parseInt(d(this).attr("tabIndex"), 10);
                          })
                          .attr("tabIndex", -1),
                t.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
        },
        _animate: function (e, i, t) {
            function a() {
                o._toggleComplete(t);
            }
            var s,
                n,
                r,
                o = this,
                h = 0,
                d = e.css("box-sizing"),
                c = e.length && (!i.length || e.index() < i.index()),
                l = this.options.animate || {},
                u = (c && l.down) || l;
            return (
                "number" == typeof u && (r = u),
                "string" == typeof u && (n = u),
                (n = n || u.easing || l.easing),
                (r = r || u.duration || l.duration),
                i.length
                    ? e.length
                        ? ((s = e.show().outerHeight()),
                          i.animate(this.hideProps, {
                              duration: r,
                              easing: n,
                              step: function (e, t) {
                                  t.now = Math.round(e);
                              },
                          }),
                          void e.hide().animate(this.showProps, {
                              duration: r,
                              easing: n,
                              complete: a,
                              step: function (e, t) {
                                  (t.now = Math.round(e)), "height" !== t.prop ? "content-box" === d && (h += t.now) : "content" !== o.options.heightStyle && ((t.now = Math.round(s - i.outerHeight() - h)), (h = 0));
                              },
                          }))
                        : i.animate(this.hideProps, r, n, a)
                    : e.animate(this.showProps, r, n, a)
            );
        },
        _toggleComplete: function (e) {
            var t = e.oldPanel;
            t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e);
        },
    });
});

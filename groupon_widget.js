/**
 * Twitter - http://www.twitter.com
 * Copyright (C) 2009 Twitter
 * Author: Dustin Diaz (dustin@twitter.com)
 *
 * V 2.0.1 Twitter search/profile/faves/list widget
 * http://twitter.com/widgets
 */
GRPN = window.GRPN || {};
API_PROXY_HOST = "http://grouponwidgetapi.dev/api.php";
GROUPON_WIDGET_HOST = "http://grouponwidget.dev/";

if (!Array.forEach) {
    Array.prototype.forEach = function (D, E) {
        var C = E || window;
        for (var B = 0, A = this.length; B < A; ++B) {
            D.call(C, this[B], B, this)
        }
    };
    Array.prototype.filter = function (E, F) {
        var D = F || window;
        var A = [];
        for (var C = 0, B = this.length; C < B; ++C) {
            if (!E.call(D, this[C], C, this)) {
                continue
            }
            A.push(this[C])
        }
        return A
    };
    Array.prototype.indexOf = function (B, C) {
        var C = C || 0;
        for (var A = 0; A < this.length; ++A) {
            if (this[A] === B) {
                return A
            }
        }
        return -1
    }
} 
String.prototype.template = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );

};

(function () {
    if (GRPN && GRPN.Widget) {
        return
    }

    function GrouponWidget(B, D, C) {
        this.el = B;
        this.prop = D;
        this.from = C.from;
        this.to = C.to;
        this.time = C.time;
        this.callback = C.callback;
    }
    GrouponWidget.canTransition = function () {
        var B = document.createElement("twitter");
        B.style.cssText = "-webkit-transition: all .5s linear;";
        return !!B.style.webkitTransitionProperty
    } ();
    
    GRPN.Widget = function (B) {
        this.init(B)
    };
    (function () {
        var M = {};
        var Y = {};
        var W = function (a) {
            var Z = Y[a];
            if (!Z) {
                Z = new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)");
                Y[a] = Z
            }
            return Z
        };
        var isIE = function () {
            var agent = navigator.userAgent;
            return {
                ie: agent.match(/MSIE\s([^;]*)/)
            }
        } ();
        
        var C = function (e, j, f, g) {
            var j = j || "*";
            var f = f || document;
            var a = [],
                Z = f.getElementsByTagName(j),
                h = W(e);
            for (var b = 0, d = Z.length; b < d; ++b) {
                if (h.test(Z[b].className)) {
                    a[a.length] = Z[b];
                    if (g) {
                        g.call(Z[b], Z[b])
                    }
                }
            }
            return a
        };
        
        //getElementById
        var G = function (Z) {
            if (typeof Z == "string") {
                return document.getElementById(Z)
            }
            return Z
        };
        
        var Q = function (Z) {
            return Z.replace(/^\s+|\s+$/g, "")
        };
        var P = function () {
            var Z = self.innerHeight;
            var a = document.compatMode;
            if ((a || X.ie)) {
                Z = (a == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight
            }
            return Z
        };
        var V = function (b, Z) {
            var a = b.target || b.srcElement;
            return Z(a)
        };
        var getParentIfTextNode = function (a) {
            try {
                if (a && 3 == a.nodeType) {
                    return a.parentNode
                } else {
                    return a
                }
            } catch(Z) {}
        };
        var O = function (a) {
            var Z = a.relatedTarget;
            if (!Z) {
                if (a.type == "mouseout") {
                    Z = a.toElement
                } else {
                    if (a.type == "mouseover") {
                        Z = a.fromElement
                    }
                }
            }
            return N(Z)
        };
        var prepend = function (a, Z) {
            Z.parentNode.insertBefore(a, Z.nextSibling)
        };
        var remove = function (a) {
            try {
                a.parentNode.removeChild(a)
            } catch(Z) {}
        };
        var getFirstChild = function (Z) {
            return Z.firstChild
        };
        var B = function (b) {
            var a = O(b);
            while (a && a != this) {
                try {
                    a = a.parentNode
                } catch(Z) {
                    a = this
                }
            }
            if (a != this) {
                return true
            }
            return false
        };
        var getStyle = function () {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                return function (a, d) {
                    var c = null;
                    var b = document.defaultView.getComputedStyle(a, "");
                    if (b) {
                        c = b[d]
                    }
                    var Z = a.style[d] || c;
                    return Z
                }
            } else {
                if (document.documentElement.currentStyle && isIE.ie) {
                    return function (Z, b) {
                        var a = Z.currentStyle ? Z.currentStyle[b] : null;
                        return (Z.style[b] || a)
                    }
                }
            }
        } ();
        var className = {
            has: function (Z, a) {
                return new RegExp("(^|\\s)" + a + "(\\s|$)").test(G(Z).className)
            },
            add: function (Z, a) {
                if (!this.has(Z, a)) {
                    G(Z).className = Q(G(Z).className) + " " + a
                }
            },
            remove: function (Z, a) {
                if (this.has(Z, a)) {
                    G(Z).className = G(Z).className.replace(new RegExp("(^|\\s)" + a + "(\\s|$)", "g"), "")
                }
            }
        };
        
        var Extend = function(obj, target) {
          for (property in obj) {
              target[property] = obj[property];
            }
            return target;
          };
        
        var Event = {
            add: function (b, a, Z) {
                if (b.addEventListener) {
                    b.addEventListener(a, Z, false)
                } else {
                    b.attachEvent("on" + a, function () {
                        Z.call(b, window.event)
                    })
                }
            },
            remove: function (b, a, Z) {
                if (b.removeEventListener) {
                    b.removeEventListener(a, Z, false)
                } else {
                    b.detachEvent("on" + a, Z)
                }
            }
        };
        var is = {
            bool: function (Z) {
                return typeof Z === "boolean"
            },
            def: function (Z) {
                return ! (typeof Z === "undefined")
            },
            number: function (Z) {
                return typeof Z === "number" && isFinite(Z)
            },
            string: function (Z) {
                return typeof Z === "string"
            },
            fn: function (Z) {
                return typeof Z === "function"
            },
            array: function (Z) {
                if (Z) {
                    return is.number(Z.length) && is.fn(Z.splice)
                }
                return false
            }
        };
        var dateToWords = function (f) {
            var h = new Date();
            var d = new Date(f);
            if (X.ie) {
                d = Date.parse(f.replace(/( \+)/, " UTC$1"))
            }
            var g = h - d;
            var a = 1000,
                b = a * 60,
                c = b * 60,
                e = c * 24,
                Z = e * 7;
            if (isNaN(g) || g < 0) {
                return ""
            }
            if (g < a * 7) {
                return "right now"
            }
            if (g < b) {
                return Math.floor(g / a) + " seconds ago"
            }
            if (g < b * 2) {
                return "about 1 minute ago"
            }
            if (g < c) {
                return Math.floor(g / b) + " minutes ago"
            }
            if (g < c * 2) {
                return "about 1 hour ago"
            }
            if (g < e) {
                return Math.floor(g / c) + " hours ago"
            }
            if (g > e && g < e * 2) {
                return "yesterday"
            }
            if (g < e * 365) {
                return Math.floor(g / e) + " days ago"
            } else {
                return "over a year ago"
            }
        };
        
        function L(a, b, Z) {
            this.job = a;
            this.decayFn = b;
            this.interval = Z;
            this.decayRate = 1;
            this.decayMultiplier = 1.25;
            this.maxDecayTime = 3 * 60 * 1000
        }
        L.prototype = {
            start: function () {
                this.stop().run();
                return this
            },
            stop: function () {
                if (this.worker) {
                    window.clearTimeout(this.worker)
                }
                return this
            },
            run: function () {
                var Z = this;
                this.job(function () {
                    Z.decayRate = Z.decayFn() ? Math.max(1, Z.decayRate / Z.decayMultiplier) : Z.decayRate * Z.decayMultiplier;
                    var a = Z.interval * Z.decayRate;
                    a = (a >= Z.maxDecayTime) ? Z.maxDecayTime : a;
                    a = Math.floor(a);
                    Z.worker = window.setTimeout(function () {
                        Z.run.call(Z)
                    },
                    a)
                })
            },
            destroy: function () {
                this.stop();
                this.decayRate = 1;
                return this
            }
        };

        M.loadStyleSheet = function (b, a) {
            if (!GRPN.Widget.loadingStyleSheet) {
                GRPN.Widget.loadingStyleSheet = true;
                var Z = document.createElement("link");
                Z.href = b;
                console.log(a);
                Z.rel = "stylesheet";
                Z.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(Z);
                var c = setInterval(function () {
                    var d = getStyle(a, "position");
                    if (d == "relative") {
                        clearInterval(c);
                        GRPN.Widget.hasLoadedStyleSheet = true
                    }
                },
                50)
            }
        };
        (function () {
            var Z = false;
            M.css = function (c) {
                var b = document.createElement("style");
                b.type = "text/css";
                if (isIE.ie) {
                    b.styleSheet.cssText = c
                } else {
                    var d = document.createDocumentFragment();
                    d.appendChild(document.createTextNode(c));
                    b.appendChild(d)
                }

                function a() {
                    document.getElementsByTagName("head")[0].appendChild(b)
                }
                if (!isIE.ie || Z) {
                    a()
                } else {
                    window.attachEvent("onload", function () {
                        Z = true;
                        a()
                    })
                }
            }
        })();
        GRPN.Widget.isLoaded = false;
        GRPN.Widget.loadingStyleSheet = false;
        GRPN.Widget.hasLoadedStyleSheet = false;
        GRPN.Widget.WIDGET_NUMBER = 0;
        
        GRPN.Widget.jsonP = function (a, b) {
            var Z = document.createElement("script");
            Z.type = "text/javascript";
            Z.src = a;
            document.getElementsByTagName("head")[0].appendChild(Z);
            b(Z);
            return Z
        };
        GRPN.Widget.prototype = function () {
            return {
                init: function (options) {
                    var self = this;
                    this.city = options.city;
                    
                    this._widgetNumber = ++GRPN.Widget.WIDGET_NUMBER;
                    GRPN.Widget["receiveCallback_" + this._widgetNumber] = function (response) {
                        self.deal = response.deals[0].deal;
                        self._formatDollars(self.deal, ["discount_amount", "price", "value"]);
                        self._addReferralCodeToLinks(self.deal);
                        self.status = response.status
                        self.renderHTML();
                    };
                    this._cb = "GRPN.Widget.receiveCallback_" + this._widgetNumber;
                    this.opts = options;
                    this._isRunning = false;
                    this._hasOfficiallyStarted = false;
                    this._rendered = false;
                    this.timesRequested = 0;
                    this.runOnce = false;
                    this.jsonMaxRequestTimeOut = 19000;
                    this.id = options.id || "groupon_widget";
                    this._setUrl();
                    this.deal = {};
                    this.theme = Extend(options.theme || {}, this._getDefaultTheme());
                    if (!options.id) {
                        var roundedClass = this.theme.rounded ? 'rounded' : '';
                        document.write('<div id="groupon_widget" class="' + roundedClass + '">')
                        
                    }
                    this.widgetEl = G(this.id);
                    if (options.id) {
                        className.add(this.widgetEl, "GRPN-widget")
                    }
                    M.loadStyleSheet(GROUPON_WIDGET_HOST + "widget.css", this.widgetEl)
                    console.log(this.id);
                    this._ready = is.fn(options.ready) ? options.ready : function () {};
                    return this
                },
                setDimensions: function (f, g) {
                    //maybe nothing to do here, but might need later
                    return this
                },
                
                setBase: function (f) {
                    this._base = f;
                    return this
                },
                setUser: function (g, f) {
                    //hmmm..
                    return this
                },
                setTitle: function (f) {
                    this.title = f;
                    this.widgetEl.getElementsByTagName("h3")[0].innerHTML = this.title;
                    return this
                },
                _setUrl: function () {
                    var self = this;
                    self.url = API_PROXY_HOST + "?call=deals&city=" + this.city + "&callback=" + this._cb;
                    return this
                },
                setTheme: function (k, f) {
                    var i = this;
                    var g = " !important";
                    console.log(this.theme);
                    var h = "#groupon_widget #get_it {background: " + this.theme.buttons.get_it_btn.background + ";}";
                    h += "#groupon_widget h1 {color:" + this.theme.header.color + ";}";
                    h += "#groupon_widget #price_tag {background: " + this.theme.buttons.price_tag.background  + "} ";
                    h += "#groupon_widget #groupon_box {background:" + this.theme.deal.background + "; color: " + this.theme.deal.color + ";}";
                    h += "#groupon_widget a {color: " + this.theme.deal.link_color + "}";
                    h += "#groupon_widget { background: " + this.theme.shell.background + "; color: " + this.theme.shell.color + ";}";
                    h += "#groupon_widget #price_tag_wrap #triangle{border-right-color:" + this.theme.buttons.price_tag.background + "}";
                    h += "#groupon_widget #price_tag_wrap #price_tag{background: " + this.theme.buttons.price_tag.background + "}";
                    if (isIE.ie) {
                        h += "#groupon_widget #get_it {background: " + this.theme.buttons.get_it_btn.background + "}";
                    }
                    M.css(h);
                    return this
                },
                byClass: function (i, f, g) {
                    var h = C(i, f, G(this.id));
                    return (g) ? h : h[0]
                },
                
                
                
                render: function() {
                  this._loadDeal();
                },
                
                renderHTML: function () {
                    var self = this;
                    if (!GRPN.Widget.hasLoadedStyleSheet) {
                        window.setTimeout(function () {
                            self.renderHTML.call(self)
                        },
                        50);
                        return this
                    }
                    
                    this.setTheme(this.theme);
                    this.widgetEl.innerHTML = this._getWidgetHtml();
                    
                    this._rendered = true;
                    this._ready();
                    return this
                },
                removeEvents: function () {},
                _formatDollars: function(obj, vals) {
                  vals.forEach(function(val){
                    console.log(val);
                    obj[val] = ["$", parseInt(obj[val].replace("USD", "")).toString()].join("");
                    console.log(obj[val]);
                  })
                },
                _addReferralCodeToLinks: function(deal){
                  deal.buy_url = "http://groupon.com/deals/" + this.deal.id + "/confirmation?utm_source=" + this.opts.referral_code;
                },
                
                _getDefaultTheme: function () {
                    return {
                        header: {
                          color: "#fff"
                        },
                        shell: {
                            background: "#7fb93c",
                            color: "#000"
                        },
                        rounded: true,
                        deal: {
                          background: "#fff",
                          link_color: "#0981b3"
                        },
                        buttons: {
                          get_it_btn: {
                            background: "#7fb93c"
                          },
                          price_tag: {
                            background: "#67d6f2" 
                          }
                          
                        }
                    }
                },
                _getWidgetHtml: function () {
                    var self = this;
                    console.log(self.deal);
                    function containerClass() {
                      return "container_class";
                    }  
                      
                    function header() {
                      console.log("this");
                      console.log(self.city);
                       return "<h1>Daily Deal in <span style='text-transform: capitalize;'>" + self.city +"</span></h1>";
                    }
                    
                    function body() {
                      var roundedClass = self.theme.rounded ? 'rounded' : '';
                      var html = '<div id="groupon_box" class=" ' + roundedClass + '">';
                      html += '<h2><a href="{division_url}">{title}</a></h2>';
                      html += '<div id="left"><div id="price_tag_wrap"><div id="triangle"></div>';
                      html += '<div id="price_tag">{price}</div></div><table id="breakdown">';
                      html += '<tr><th>value</th><th>discount</th><th>save</th></tr>';
                      html += '<tr><td class="bold">{value}</td><td class="bold">{discount_percent}%</td><td class="bold">{discount_amount}</td></tr>';
                      html += '</table>';
                      html += '<table id="number_bought" class="bold"><tr><td id="number">{quantity_sold}</td></tr>';
                      html += '<tr><td>bought</td></tr></table>';
                      //html += '<table><tr colspan="4"><td>time left to buy</td></tr></table>';
                      html += '</div><div id="right"><p id="deal_image"><img src="{large_image_url}" /></p><div id="get_it" class="get_it_rounded">';
                      html += '<a href="{buy_url}">GET IT!</a></div></div></div>';
                      return html;
                    }
                    
                    function footer() {
                      var html = '<div id="footer">';
                      html += '<a class="rounded" href="">Get this widget, get money!</a>';
                      html += '</div></div>';
                      return html;
                    }
                    
                    var widgetHTML = (header() + body() + footer()).template(self.deal);
                    return widgetHTML;
                },
                
                _loadDeal: function() {
                  var self = this;
                  GRPN.Widget.jsonP(self.url, function (response) {
                      this.scriptElement = response;
                  })
                },
                
                clear: function () {
                    var g = this.byClass("GRPN-tweet", "div", true);
                    var f = this.byClass("GRPN-new-results", "div", true);
                    g = g.concat(f);
                    g.forEach(function (h) {
                        T(h)
                    });
                    return this
                },
               
                destroy: function () {
                    this.stop();
                    this.clear();
                    this._hasOfficiallyStarted = false;
                    this._isRunning = false;
                    if (this.jsonRequestRunning) {
                      clearTimeout(this.jsonRequestTimer);
                      className.add(this.spinner, "GRPN-inactive")
                    }
                    className.remove(this.widgetEl, "GRPN-scroll");
                    this.removeEvents();
                    return this
                }
            }
        } ()
    })()
})();
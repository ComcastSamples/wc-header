(function () {
  'use strict';

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
  (function (scope) {
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

    var workingDefaultPrevented = function () {
      var e = document.createEvent('Event');
      e.initEvent('foo', true, true);
      e.preventDefault();
      return e.defaultPrevented;
    }();

    if (!workingDefaultPrevented) {
      var origPreventDefault = Event.prototype.preventDefault;

      Event.prototype.preventDefault = function () {
        if (!this.cancelable) {
          return;
        }

        origPreventDefault.call(this);
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          },
          configurable: true
        });
      };
    }

    var isIE = /Trident/.test(navigator.userAgent); // CustomEvent constructor shim

    if (!window.CustomEvent || isIE && typeof window.CustomEvent !== 'function') {
      window.CustomEvent = function (inType, params) {
        params = params || {};
        var e = document.createEvent('CustomEvent');
        e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
        return e;
      };

      window.CustomEvent.prototype = window.Event.prototype;
    } // Event constructor shim


    if (!window.Event || isIE && typeof window.Event !== 'function') {
      var origEvent = window.Event;

      window.Event = function (inType, params) {
        params = params || {};
        var e = document.createEvent('Event');
        e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
        return e;
      };

      if (origEvent) {
        for (var i in origEvent) {
          window.Event[i] = origEvent[i];
        }
      }

      window.Event.prototype = origEvent.prototype;
    }

    if (!window.MouseEvent || isIE && typeof window.MouseEvent !== 'function') {
      var origMouseEvent = window.MouseEvent;

      window.MouseEvent = function (inType, params) {
        params = params || {};
        var e = document.createEvent('MouseEvent');
        e.initMouseEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.view || window, params.detail, params.screenX, params.screenY, params.clientX, params.clientY, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.button, params.relatedTarget);
        return e;
      };

      if (origMouseEvent) {
        for (var i in origMouseEvent) {
          window.MouseEvent[i] = origMouseEvent[i];
        }
      }

      window.MouseEvent.prototype = origMouseEvent.prototype;
    } // ES6 stuff


    if (!Array.from) {
      Array.from = function (object) {
        return [].slice.call(object);
      };
    }

    if (!Object.assign) {
      var assign = function (target, source) {
        var n$ = Object.getOwnPropertyNames(source);

        for (var i = 0, p; i < n$.length; i++) {
          p = n$[i];
          target[p] = source[p];
        }
      };

      Object.assign = function (target, sources) {
        var args = [].slice.call(arguments, 1);

        for (var i = 0, s; i < args.length; i++) {
          s = args[i];

          if (s) {
            assign(target, s);
          }
        }

        return target;
      };
    }
  })(window.WebComponents);

  (function () {

    var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function g(b) {
      var a = aa.has(b);
      b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);
      return !a && b;
    }

    function l(b) {
      var a = b.isConnected;
      if (void 0 !== a) return a;

      for (; b && !(b.__CE_isImportDocument || b instanceof Document);) b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);

      return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
    }

    function p(b, a) {
      for (; a && a !== b && !a.nextSibling;) a = a.parentNode;

      return a && a !== b ? a.nextSibling : null;
    }

    function q(b, a, d) {
      d = void 0 === d ? new Set() : d;

      for (var c = b; c;) {
        if (c.nodeType === Node.ELEMENT_NODE) {
          var e = c;
          a(e);
          var f = e.localName;

          if ("link" === f && "import" === e.getAttribute("rel")) {
            c = e.import;
            if (c instanceof Node && !d.has(c)) for (d.add(c), c = c.firstChild; c; c = c.nextSibling) q(c, a, d);
            c = p(b, e);
            continue;
          } else if ("template" === f) {
            c = p(b, e);
            continue;
          }

          if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) q(e, a, d);
        }

        c = c.firstChild ? c.firstChild : p(b, c);
      }
    }

    function t(b, a, d) {
      b[a] = d;
    }

    function u() {
      this.a = new Map();
      this.f = new Map();
      this.c = [];
      this.b = !1;
    }

    function ba(b, a, d) {
      b.a.set(a, d);
      b.f.set(d.constructorFunction, d);
    }

    function v(b, a) {
      b.b = !0;
      b.c.push(a);
    }

    function w(b, a) {
      b.b && q(a, function (a) {
        return x(b, a);
      });
    }

    function x(b, a) {
      if (b.b && !a.__CE_patched) {
        a.__CE_patched = !0;

        for (var d = 0; d < b.c.length; d++) b.c[d](a);
      }
    }

    function y(b, a) {
      var d = [];
      q(a, function (a) {
        return d.push(a);
      });

      for (a = 0; a < d.length; a++) {
        var c = d[a];
        1 === c.__CE_state ? b.connectedCallback(c) : z(b, c);
      }
    }

    function A(b, a) {
      var d = [];
      q(a, function (a) {
        return d.push(a);
      });

      for (a = 0; a < d.length; a++) {
        var c = d[a];
        1 === c.__CE_state && b.disconnectedCallback(c);
      }
    }

    function B(b, a, d) {
      d = void 0 === d ? {} : d;

      var c = d.u || new Set(),
          e = d.h || function (a) {
        return z(b, a);
      },
          f = [];

      q(a, function (a) {
        if ("link" === a.localName && "import" === a.getAttribute("rel")) {
          var d = a.import;
          d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);
          d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : a.addEventListener("load", function () {
            var d = a.import;

            if (!d.__CE_documentLoadHandled) {
              d.__CE_documentLoadHandled = !0;
              var f = new Set(c);
              f.delete(d);
              B(b, d, {
                u: f,
                h: e
              });
            }
          });
        } else f.push(a);
      }, c);
      if (b.b) for (a = 0; a < f.length; a++) x(b, f[a]);

      for (a = 0; a < f.length; a++) e(f[a]);
    }

    function z(b, a) {
      if (void 0 === a.__CE_state) {
        var d = a.ownerDocument;
        if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry) if (d = b.a.get(a.localName)) {
          d.constructionStack.push(a);
          var c = d.constructorFunction;

          try {
            try {
              if (new c() !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (m) {
            throw a.__CE_state = 2, m;
          }

          a.__CE_state = 1;
          a.__CE_definition = d;
          if (d.attributeChangedCallback) for (d = d.observedAttributes, c = 0; c < d.length; c++) {
            var e = d[c],
                f = a.getAttribute(e);
            null !== f && b.attributeChangedCallback(a, e, null, f, null);
          }
          l(a) && b.connectedCallback(a);
        }
      }
    }

    u.prototype.connectedCallback = function (b) {
      var a = b.__CE_definition;
      a.connectedCallback && a.connectedCallback.call(b);
    };

    u.prototype.disconnectedCallback = function (b) {
      var a = b.__CE_definition;
      a.disconnectedCallback && a.disconnectedCallback.call(b);
    };

    u.prototype.attributeChangedCallback = function (b, a, d, c, e) {
      var f = b.__CE_definition;
      f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, d, c, e);
    };

    function C(b) {
      var a = document;
      this.c = b;
      this.a = a;
      this.b = void 0;
      B(this.c, this.a);
      "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, {
        childList: !0,
        subtree: !0
      }));
    }

    function D(b) {
      b.b && b.b.disconnect();
    }

    C.prototype.f = function (b) {
      var a = this.a.readyState;
      "interactive" !== a && "complete" !== a || D(this);

      for (a = 0; a < b.length; a++) for (var d = b[a].addedNodes, c = 0; c < d.length; c++) B(this.c, d[c]);
    };

    function ca() {
      var b = this;
      this.b = this.a = void 0;
      this.c = new Promise(function (a) {
        b.b = a;
        b.a && a(b.a);
      });
    }

    function E(b) {
      if (b.a) throw Error("Already resolved.");
      b.a = void 0;
      b.b && b.b(void 0);
    }

    function F(b) {
      this.c = !1;
      this.a = b;
      this.j = new Map();

      this.f = function (a) {
        return a();
      };

      this.b = !1;
      this.i = [];
      this.o = new C(b);
    }

    F.prototype.l = function (b, a) {
      var d = this;
      if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
      if (!g(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
      if (this.a.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");
      if (this.c) throw Error("A custom element is already being defined.");
      this.c = !0;

      try {
        var c = function (a) {
          var b = e[a];
          if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
          return b;
        },
            e = a.prototype;

        if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
        var f = c("connectedCallback");
        var m = c("disconnectedCallback");
        var k = c("adoptedCallback");
        var h = c("attributeChangedCallback");
        var n = a.observedAttributes || [];
      } catch (r) {
        return;
      } finally {
        this.c = !1;
      }

      a = {
        localName: b,
        constructorFunction: a,
        connectedCallback: f,
        disconnectedCallback: m,
        adoptedCallback: k,
        attributeChangedCallback: h,
        observedAttributes: n,
        constructionStack: []
      };
      ba(this.a, b, a);
      this.i.push(a);
      this.b || (this.b = !0, this.f(function () {
        return da(d);
      }));
    };

    F.prototype.h = function (b) {
      B(this.a, b);
    };

    function da(b) {
      if (!1 !== b.b) {
        b.b = !1;

        for (var a = b.i, d = [], c = new Map(), e = 0; e < a.length; e++) c.set(a[e].localName, []);

        B(b.a, document, {
          h: function (a) {
            if (void 0 === a.__CE_state) {
              var e = a.localName,
                  f = c.get(e);
              f ? f.push(a) : b.a.a.get(e) && d.push(a);
            }
          }
        });

        for (e = 0; e < d.length; e++) z(b.a, d[e]);

        for (; 0 < a.length;) {
          var f = a.shift();
          e = f.localName;
          f = c.get(f.localName);

          for (var m = 0; m < f.length; m++) z(b.a, f[m]);

          (e = b.j.get(e)) && E(e);
        }
      }
    }

    F.prototype.get = function (b) {
      if (b = this.a.a.get(b)) return b.constructorFunction;
    };

    F.prototype.m = function (b) {
      if (!g(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));
      var a = this.j.get(b);
      if (a) return a.c;
      a = new ca();
      this.j.set(b, a);
      this.a.a.get(b) && !this.i.some(function (a) {
        return a.localName === b;
      }) && E(a);
      return a.c;
    };

    F.prototype.s = function (b) {
      D(this.o);
      var a = this.f;

      this.f = function (d) {
        return b(function () {
          return a(d);
        });
      };
    };

    window.CustomElementRegistry = F;
    F.prototype.define = F.prototype.l;
    F.prototype.upgrade = F.prototype.h;
    F.prototype.get = F.prototype.get;
    F.prototype.whenDefined = F.prototype.m;
    F.prototype.polyfillWrapFlushCallback = F.prototype.s;
    var G = window.Document.prototype.createElement,
        H = window.Document.prototype.createElementNS,
        ea = window.Document.prototype.importNode,
        fa = window.Document.prototype.prepend,
        ha = window.Document.prototype.append,
        ia = window.DocumentFragment.prototype.prepend,
        ja = window.DocumentFragment.prototype.append,
        I = window.Node.prototype.cloneNode,
        J = window.Node.prototype.appendChild,
        K = window.Node.prototype.insertBefore,
        L = window.Node.prototype.removeChild,
        M = window.Node.prototype.replaceChild,
        N = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        O = window.Element.prototype.attachShadow,
        P = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        Q = window.Element.prototype.getAttribute,
        R = window.Element.prototype.setAttribute,
        S = window.Element.prototype.removeAttribute,
        T = window.Element.prototype.getAttributeNS,
        U = window.Element.prototype.setAttributeNS,
        ka = window.Element.prototype.removeAttributeNS,
        la = window.Element.prototype.insertAdjacentElement,
        ma = window.Element.prototype.insertAdjacentHTML,
        na = window.Element.prototype.prepend,
        oa = window.Element.prototype.append,
        V = window.Element.prototype.before,
        pa = window.Element.prototype.after,
        qa = window.Element.prototype.replaceWith,
        ra = window.Element.prototype.remove,
        sa = window.HTMLElement,
        W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        ta = window.HTMLElement.prototype.insertAdjacentElement,
        ua = window.HTMLElement.prototype.insertAdjacentHTML;
    var va = new function () {}();

    function wa() {
      var b = X;

      window.HTMLElement = function () {
        function a() {
          var a = this.constructor,
              c = b.f.get(a);
          if (!c) throw Error("The custom element being constructed was not registered with `customElements`.");
          var e = c.constructionStack;
          if (0 === e.length) return e = G.call(document, c.localName), Object.setPrototypeOf(e, a.prototype), e.__CE_state = 1, e.__CE_definition = c, x(b, e), e;
          c = e.length - 1;
          var f = e[c];
          if (f === va) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
          e[c] = va;
          Object.setPrototypeOf(f, a.prototype);
          x(b, f);
          return f;
        }

        a.prototype = sa.prototype;
        Object.defineProperty(a.prototype, "constructor", {
          writable: !0,
          configurable: !0,
          enumerable: !1,
          value: a
        });
        return a;
      }();
    }

    function Y(b, a, d) {
      function c(a) {
        return function (d) {
          for (var e = [], c = 0; c < arguments.length; ++c) e[c] = arguments[c];

          c = [];

          for (var f = [], n = 0; n < e.length; n++) {
            var r = e[n];
            r instanceof Element && l(r) && f.push(r);
            if (r instanceof DocumentFragment) for (r = r.firstChild; r; r = r.nextSibling) c.push(r);else c.push(r);
          }

          a.apply(this, e);

          for (e = 0; e < f.length; e++) A(b, f[e]);

          if (l(this)) for (e = 0; e < c.length; e++) f = c[e], f instanceof Element && y(b, f);
        };
      }

      void 0 !== d.g && (a.prepend = c(d.g));
      void 0 !== d.append && (a.append = c(d.append));
    }

    function xa() {
      var b = X;
      t(Document.prototype, "createElement", function (a) {
        if (this.__CE_hasRegistry) {
          var d = b.a.get(a);
          if (d) return new d.constructorFunction();
        }

        a = G.call(this, a);
        x(b, a);
        return a;
      });
      t(Document.prototype, "importNode", function (a, d) {
        a = ea.call(this, a, !!d);
        this.__CE_hasRegistry ? B(b, a) : w(b, a);
        return a;
      });
      t(Document.prototype, "createElementNS", function (a, d) {
        if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
          var c = b.a.get(d);
          if (c) return new c.constructorFunction();
        }

        a = H.call(this, a, d);
        x(b, a);
        return a;
      });
      Y(b, Document.prototype, {
        g: fa,
        append: ha
      });
    }

    function ya() {
      function b(b, c) {
        Object.defineProperty(b, "textContent", {
          enumerable: c.enumerable,
          configurable: !0,
          get: c.get,
          set: function (b) {
            if (this.nodeType === Node.TEXT_NODE) c.set.call(this, b);else {
              var d = void 0;

              if (this.firstChild) {
                var e = this.childNodes,
                    k = e.length;

                if (0 < k && l(this)) {
                  d = Array(k);

                  for (var h = 0; h < k; h++) d[h] = e[h];
                }
              }

              c.set.call(this, b);
              if (d) for (b = 0; b < d.length; b++) A(a, d[b]);
            }
          }
        });
      }

      var a = X;
      t(Node.prototype, "insertBefore", function (b, c) {
        if (b instanceof DocumentFragment) {
          var e = Array.prototype.slice.apply(b.childNodes);
          b = K.call(this, b, c);
          if (l(this)) for (c = 0; c < e.length; c++) y(a, e[c]);
          return b;
        }

        e = l(b);
        c = K.call(this, b, c);
        e && A(a, b);
        l(this) && y(a, b);
        return c;
      });
      t(Node.prototype, "appendChild", function (b) {
        if (b instanceof DocumentFragment) {
          var c = Array.prototype.slice.apply(b.childNodes);
          b = J.call(this, b);
          if (l(this)) for (var e = 0; e < c.length; e++) y(a, c[e]);
          return b;
        }

        c = l(b);
        e = J.call(this, b);
        c && A(a, b);
        l(this) && y(a, b);
        return e;
      });
      t(Node.prototype, "cloneNode", function (b) {
        b = I.call(this, !!b);
        this.ownerDocument.__CE_hasRegistry ? B(a, b) : w(a, b);
        return b;
      });
      t(Node.prototype, "removeChild", function (b) {
        var c = l(b),
            e = L.call(this, b);
        c && A(a, b);
        return e;
      });
      t(Node.prototype, "replaceChild", function (b, c) {
        if (b instanceof DocumentFragment) {
          var e = Array.prototype.slice.apply(b.childNodes);
          b = M.call(this, b, c);
          if (l(this)) for (A(a, c), c = 0; c < e.length; c++) y(a, e[c]);
          return b;
        }

        e = l(b);
        var f = M.call(this, b, c),
            d = l(this);
        d && A(a, c);
        e && A(a, b);
        d && y(a, b);
        return f;
      });
      N && N.get ? b(Node.prototype, N) : v(a, function (a) {
        b(a, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            for (var b = [], a = 0; a < this.childNodes.length; a++) b.push(this.childNodes[a].textContent);

            return b.join("");
          },
          set: function (b) {
            for (; this.firstChild;) L.call(this, this.firstChild);

            J.call(this, document.createTextNode(b));
          }
        });
      });
    }

    function za(b) {
      function a(a) {
        return function (e) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];

          d = [];

          for (var k = [], h = 0; h < c.length; h++) {
            var n = c[h];
            n instanceof Element && l(n) && k.push(n);
            if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) d.push(n);else d.push(n);
          }

          a.apply(this, c);

          for (c = 0; c < k.length; c++) A(b, k[c]);

          if (l(this)) for (c = 0; c < d.length; c++) k = d[c], k instanceof Element && y(b, k);
        };
      }

      var d = Element.prototype;
      void 0 !== V && (d.before = a(V));
      void 0 !== V && (d.after = a(pa));
      void 0 !== qa && t(d, "replaceWith", function (a) {
        for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];

        d = [];

        for (var m = [], k = 0; k < c.length; k++) {
          var h = c[k];
          h instanceof Element && l(h) && m.push(h);
          if (h instanceof DocumentFragment) for (h = h.firstChild; h; h = h.nextSibling) d.push(h);else d.push(h);
        }

        k = l(this);
        qa.apply(this, c);

        for (c = 0; c < m.length; c++) A(b, m[c]);

        if (k) for (A(b, this), c = 0; c < d.length; c++) m = d[c], m instanceof Element && y(b, m);
      });
      void 0 !== ra && t(d, "remove", function () {
        var a = l(this);
        ra.call(this);
        a && A(b, this);
      });
    }

    function Aa() {
      function b(a, b) {
        Object.defineProperty(a, "innerHTML", {
          enumerable: b.enumerable,
          configurable: !0,
          get: b.get,
          set: function (a) {
            var d = this,
                e = void 0;
            l(this) && (e = [], q(this, function (a) {
              a !== d && e.push(a);
            }));
            b.set.call(this, a);
            if (e) for (var f = 0; f < e.length; f++) {
              var m = e[f];
              1 === m.__CE_state && c.disconnectedCallback(m);
            }
            this.ownerDocument.__CE_hasRegistry ? B(c, this) : w(c, this);
            return a;
          }
        });
      }

      function a(a, b) {
        t(a, "insertAdjacentElement", function (a, d) {
          var e = l(d);
          a = b.call(this, a, d);
          e && A(c, d);
          l(a) && y(c, d);
          return a;
        });
      }

      function d(a, b) {
        function d(a, b) {
          for (var d = []; a !== b; a = a.nextSibling) d.push(a);

          for (b = 0; b < d.length; b++) B(c, d[b]);
        }

        t(a, "insertAdjacentHTML", function (a, c) {
          a = a.toLowerCase();

          if ("beforebegin" === a) {
            var e = this.previousSibling;
            b.call(this, a, c);
            d(e || this.parentNode.firstChild, this);
          } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, c), d(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, c), d(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, c), d(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        });
      }

      var c = X;
      O && t(Element.prototype, "attachShadow", function (a) {
        return this.__CE_shadowRoot = a = O.call(this, a);
      });
      P && P.get ? b(Element.prototype, P) : W && W.get ? b(HTMLElement.prototype, W) : v(c, function (a) {
        b(a, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            return I.call(this, !0).innerHTML;
          },
          set: function (a) {
            var b = "template" === this.localName,
                c = b ? this.content : this,
                d = H.call(document, this.namespaceURI, this.localName);

            for (d.innerHTML = a; 0 < c.childNodes.length;) L.call(c, c.childNodes[0]);

            for (a = b ? d.content : d; 0 < a.childNodes.length;) J.call(c, a.childNodes[0]);
          }
        });
      });
      t(Element.prototype, "setAttribute", function (a, b) {
        if (1 !== this.__CE_state) return R.call(this, a, b);
        var d = Q.call(this, a);
        R.call(this, a, b);
        b = Q.call(this, a);
        c.attributeChangedCallback(this, a, d, b, null);
      });
      t(Element.prototype, "setAttributeNS", function (a, b, d) {
        if (1 !== this.__CE_state) return U.call(this, a, b, d);
        var e = T.call(this, a, b);
        U.call(this, a, b, d);
        d = T.call(this, a, b);
        c.attributeChangedCallback(this, b, e, d, a);
      });
      t(Element.prototype, "removeAttribute", function (a) {
        if (1 !== this.__CE_state) return S.call(this, a);
        var b = Q.call(this, a);
        S.call(this, a);
        null !== b && c.attributeChangedCallback(this, a, b, null, null);
      });
      t(Element.prototype, "removeAttributeNS", function (a, b) {
        if (1 !== this.__CE_state) return ka.call(this, a, b);
        var d = T.call(this, a, b);
        ka.call(this, a, b);
        var e = T.call(this, a, b);
        d !== e && c.attributeChangedCallback(this, b, d, e, a);
      });
      ta ? a(HTMLElement.prototype, ta) : la ? a(Element.prototype, la) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
      ua ? d(HTMLElement.prototype, ua) : ma ? d(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
      Y(c, Element.prototype, {
        g: na,
        append: oa
      });
      za(c);
    }
    /*
    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */

    var Z = window.customElements;

    if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
      var X = new u();
      wa();
      xa();
      Y(X, DocumentFragment.prototype, {
        g: ia,
        append: ja
      });
      ya();
      Aa();
      document.__CE_hasRegistry = !0;
      var customElements = new F(X);
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: !0,
        value: customElements
      });
    }
  }).call(self);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const directives = new WeakMap();
  const isDirective = o => typeof o === 'function' && directives.has(o);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
  /**
   * Removes nodes, starting from `startNode` (inclusive) to `endNode`
   * (exclusive), from `container`.
   */

  const removeNodes = (container, startNode, endNode = null) => {
    let node = startNode;

    while (node !== endNode) {
      const n = node.nextSibling;
      container.removeChild(node);
      node = n;
    }
  };

  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  const noChange = {};

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */
  const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
  /**
   * An expression marker used text-positions, not attribute positions,
   * in template.
   */

  const nodeMarker = `<!--${marker}-->`;
  const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
  const rewritesStyleAttribute = (() => {
    const el = document.createElement('div');
    el.setAttribute('style', '{{bad value}}');
    return el.getAttribute('style') !== '{{bad value}}';
  })();
  /**
   * An updateable Template that tracks the location of dynamic parts.
   */

  class Template {
    constructor(result, element) {
      this.parts = [];
      this.element = element;
      let index = -1;
      let partIndex = 0;
      const nodesToRemove = [];

      const _prepareTemplate = template => {
        const content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
        // null

        const walker = document.createTreeWalker(content, 133
        /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
        NodeFilter.SHOW_TEXT */
        , null, false); // The actual previous node, accounting for removals: if a node is removed
        // it will never be the previousNode.

        let previousNode; // Used to set previousNode at the top of the loop.

        let currentNode;

        while (walker.nextNode()) {
          index++;
          previousNode = currentNode;
          const node = currentNode = walker.currentNode;

          if (node.nodeType === 1
          /* Node.ELEMENT_NODE */
          ) {
              if (node.hasAttributes()) {
                const attributes = node.attributes; // Per
                // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                // attributes are not guaranteed to be returned in document order.
                // In particular, Edge/IE can return them out of order, so we cannot
                // assume a correspondance between part index and attribute index.

                let count = 0;

                for (let i = 0; i < attributes.length; i++) {
                  if (attributes[i].value.indexOf(marker) >= 0) {
                    count++;
                  }
                }

                while (count-- > 0) {
                  // Get the template literal section leading up to the first
                  // expression in this attribute
                  const stringForPart = result.strings[partIndex]; // Find the attribute name

                  const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                  // If the attribute name contains special characters, lower-case
                  // it so that on XML nodes with case-sensitive getAttribute() we
                  // can still find the attribute, which will have been lower-cased
                  // by the parser.
                  //
                  // If the attribute name doesn't contain special character, it's
                  // important to _not_ lower-case it, in case the name is
                  // case-sensitive, like with XML attributes like "viewBox".

                  const attributeLookupName = rewritesStyleAttribute && name === 'style' ? 'style$' : /^[a-zA-Z-]*$/.test(name) ? name : name.toLowerCase();
                  const attributeValue = node.getAttribute(attributeLookupName);
                  const strings = attributeValue.split(markerRegex);
                  this.parts.push({
                    type: 'attribute',
                    index,
                    name,
                    strings
                  });
                  node.removeAttribute(attributeLookupName);
                  partIndex += strings.length - 1;
                }
              }

              if (node.tagName === 'TEMPLATE') {
                _prepareTemplate(node);
              }
            } else if (node.nodeType === 3
          /* Node.TEXT_NODE */
          ) {
              const nodeValue = node.nodeValue;

              if (nodeValue.indexOf(marker) < 0) {
                continue;
              }

              const parent = node.parentNode;
              const strings = nodeValue.split(markerRegex);
              const lastIndex = strings.length - 1; // We have a part for each match found

              partIndex += lastIndex; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (let i = 0; i < lastIndex; i++) {
                parent.insertBefore(strings[i] === '' ? createMarker() : document.createTextNode(strings[i]), node);
                this.parts.push({
                  type: 'node',
                  index: index++
                });
              }

              parent.insertBefore(strings[lastIndex] === '' ? createMarker() : document.createTextNode(strings[lastIndex]), node);
              nodesToRemove.push(node);
            } else if (node.nodeType === 8
          /* Node.COMMENT_NODE */
          ) {
              if (node.nodeValue === marker) {
                const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
                // the following are true:
                //  * We don't have a previousSibling
                //  * previousSibling is being removed (thus it's not the
                //    `previousNode`)
                //  * previousSibling is not a Text node
                //
                // TODO(justinfagnani): We should be able to use the previousNode
                // here as the marker node and reduce the number of extra nodes we
                // add to a template. See
                // https://github.com/PolymerLabs/lit-html/issues/147

                const previousSibling = node.previousSibling;

                if (previousSibling === null || previousSibling !== previousNode || previousSibling.nodeType !== Node.TEXT_NODE) {
                  parent.insertBefore(createMarker(), node);
                } else {
                  index--;
                }

                this.parts.push({
                  type: 'node',
                  index: index++
                });
                nodesToRemove.push(node); // If we don't have a nextSibling add a marker node.
                // We don't have to check if the next node is going to be removed,
                // because that node will induce a new marker if so.

                if (node.nextSibling === null) {
                  parent.insertBefore(createMarker(), node);
                } else {
                  index--;
                }

                currentNode = previousNode;
                partIndex++;
              } else {
                let i = -1;

                while ((i = node.nodeValue.indexOf(marker, i + 1)) !== -1) {
                  // Comment node has a binding marker inside, make an inactive part
                  // The binding won't work, but subsequent bindings will
                  // TODO (justinfagnani): consider whether it's even worth it to
                  // make bindings in comments work
                  this.parts.push({
                    type: 'node',
                    index: -1
                  });
                }
              }
            }
        }
      };

      _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


      for (const n of nodesToRemove) {
        n.parentNode.removeChild(n);
      }
    }

  }
  const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
  // small manual size-savings.

  const createMarker = () => document.createComment('');
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#attributes-0
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-character
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */

  const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */

  class TemplateInstance {
    constructor(template, processor, options) {
      this._parts = [];
      this.template = template;
      this.processor = processor;
      this.options = options;
    }

    update(values) {
      let i = 0;

      for (const part of this._parts) {
        if (part !== undefined) {
          part.setValue(values[i]);
        }

        i++;
      }

      for (const part of this._parts) {
        if (part !== undefined) {
          part.commit();
        }
      }
    }

    _clone() {
      // When using the Custom Elements polyfill, clone the node, rather than
      // importing it, to keep the fragment in the template's document. This
      // leaves the fragment inert so custom elements won't upgrade and
      // potentially modify their contents by creating a polyfilled ShadowRoot
      // while we traverse the tree.
      const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
      const parts = this.template.parts;
      let partIndex = 0;
      let nodeIndex = 0;

      const _prepareInstance = fragment => {
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
        // null
        const walker = document.createTreeWalker(fragment, 133
        /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
        , null, false);
        let node = walker.nextNode(); // Loop through all the nodes and parts of a template

        while (partIndex < parts.length && node !== null) {
          const part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
          // multiple bound attributes on an element. So each iteration we either
          // increment the nodeIndex, if we aren't on a node with a part, or the
          // partIndex if we are. By not incrementing the nodeIndex when we find a
          // part, we allow for the next part to be associated with the current
          // node if neccessasry.

          if (!isTemplatePartActive(part)) {
            this._parts.push(undefined);

            partIndex++;
          } else if (nodeIndex === part.index) {
            if (part.type === 'node') {
              const part = this.processor.handleTextExpression(this.options);
              part.insertAfterNode(node);

              this._parts.push(part);
            } else {
              this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }

            partIndex++;
          } else {
            nodeIndex++;

            if (node.nodeName === 'TEMPLATE') {
              _prepareInstance(node.content);
            }

            node = walker.nextNode();
          }
        }
      };

      _prepareInstance(fragment);

      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }

      return fragment;
    }

  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */

  class TemplateResult {
    constructor(strings, values, type, processor) {
      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */


    getHTML() {
      const l = this.strings.length - 1;
      let html = '';
      let isTextBinding = true;

      for (let i = 0; i < l; i++) {
        const s = this.strings[i];
        html += s;
        const close = s.lastIndexOf('>'); // We're in a text position if the previous string closed its last tag, an
        // attribute position if the string opened an unclosed tag, and unchanged
        // if the string had no brackets at all:
        //
        // "...>...": text position. open === -1, close > -1
        // "...<...": attribute position. open > -1
        // "...": no change. open === -1, close === -1

        isTextBinding = (close > -1 || isTextBinding) && s.indexOf('<', close + 1) === -1;

        if (!isTextBinding && rewritesStyleAttribute) {
          html = html.replace(lastAttributeNameRegex, (match, p1, p2, p3) => {
            return p2 === 'style' ? `${p1}style$${p3}` : match;
          });
        }

        html += isTextBinding ? nodeMarker : marker;
      }

      html += this.strings[l];
      return html;
    }

    getTemplateElement() {
      const template = document.createElement('template');
      template.innerHTML = this.getHTML();
      return template;
    }

  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isPrimitive = value => value === null || !(typeof value === 'object' || typeof value === 'function');
  /**
   * Sets attribute values for AttributeParts, so that the value is only set once
   * even if there are multiple parts for an attribute.
   */

  class AttributeCommitter {
    constructor(element, name, strings) {
      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];

      for (let i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */


    _createPart() {
      return new AttributePart(this);
    }

    _getValue() {
      const strings = this.strings;
      const l = strings.length - 1;
      let text = '';

      for (let i = 0; i < l; i++) {
        text += strings[i];
        const part = this.parts[i];

        if (part !== undefined) {
          const v = part.value;

          if (v != null && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
            for (const t of v) {
              text += typeof t === 'string' ? t : String(t);
            }
          } else {
            text += typeof v === 'string' ? v : String(v);
          }
        }
      }

      text += strings[l];
      return text;
    }

    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    }

  }
  class AttributePart {
    constructor(comitter) {
      this.value = undefined;
      this.committer = comitter;
    }

    setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value; // If the value is a not a directive, dirty the committer so that it'll
        // call setAttribute. If the value is a directive, it'll dirty the
        // committer if it calls setValue().

        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    }

    commit() {
      while (isDirective(this.value)) {
        const directive$$1 = this.value;
        this.value = noChange;
        directive$$1(this);
      }

      if (this.value === noChange) {
        return;
      }

      this.committer.commit();
    }

  }
  class NodePart {
    constructor(options) {
      this.value = undefined;
      this._pendingValue = undefined;
      this.options = options;
    }
    /**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    appendIntoPart(part) {
      part._insert(this.startNode = createMarker());

      part._insert(this.endNode = createMarker());
    }
    /**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    insertAfterPart(ref) {
      ref._insert(this.startNode = createMarker());

      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    }

    setValue(value) {
      this._pendingValue = value;
    }

    commit() {
      while (isDirective(this._pendingValue)) {
        const directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      const value = this._pendingValue;

      if (value === noChange) {
        return;
      }

      if (isPrimitive(value)) {
        if (value !== this.value) {
          this._commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this._commitTemplateResult(value);
      } else if (value instanceof Node) {
        this._commitNode(value);
      } else if (Array.isArray(value) || value[Symbol.iterator]) {
        this._commitIterable(value);
      } else if (value.then !== undefined) {
        this._commitPromise(value);
      } else {
        // Fallback, will render the string representation
        this._commitText(value);
      }
    }

    _insert(node) {
      this.endNode.parentNode.insertBefore(node, this.endNode);
    }

    _commitNode(value) {
      if (this.value === value) {
        return;
      }

      this.clear();

      this._insert(value);

      this.value = value;
    }

    _commitText(value) {
      const node = this.startNode.nextSibling;
      value = value == null ? '' : value;

      if (node === this.endNode.previousSibling && node.nodeType === Node.TEXT_NODE) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.textContent = value;
      } else {
        this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
      }

      this.value = value;
    }

    _commitTemplateResult(value) {
      const template = this.options.templateFactory(value);

      if (this.value && this.value.template === template) {
        this.value.update(value.values);
      } else {
        // Make sure we propagate the template processor from the TemplateResult
        // so that we use its syntax extension, etc. The template factory comes
        // from the render function options so that it can control template
        // caching and preprocessing.
        const instance = new TemplateInstance(template, value.processor, this.options);

        const fragment = instance._clone();

        instance.update(value.values);

        this._commitNode(fragment);

        this.value = instance;
      }
    }

    _commitIterable(value) {
      // For an Iterable, we create a new InstancePart per item, then set its
      // value to the item. This is a little bit of overhead for every item in
      // an Iterable, but it lets us recurse easily and efficiently update Arrays
      // of TemplateResults that will be commonly returned from expressions like:
      // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
      // If _value is an array, then the previous render was of an
      // iterable and _value will contain the NodeParts from the previous
      // render. If _value is not an array, clear this part and make a new
      // array for NodeParts.
      if (!Array.isArray(this.value)) {
        this.value = [];
        this.clear();
      } // Lets us keep track of how many items we stamped so we can clear leftover
      // items from a previous render


      const itemParts = this.value;
      let partIndex = 0;
      let itemPart;

      for (const item of value) {
        // Try to reuse an existing part
        itemPart = itemParts[partIndex]; // If no existing part, create a new one

        if (itemPart === undefined) {
          itemPart = new NodePart(this.options);
          itemParts.push(itemPart);

          if (partIndex === 0) {
            itemPart.appendIntoPart(this);
          } else {
            itemPart.insertAfterPart(itemParts[partIndex - 1]);
          }
        }

        itemPart.setValue(item);
        itemPart.commit();
        partIndex++;
      }

      if (partIndex < itemParts.length) {
        // Truncate the parts array so _value reflects the current state
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    }

    _commitPromise(value) {
      this.value = value;
      value.then(v => {
        if (this.value === value) {
          this.setValue(v);
          this.commit();
        }
      });
    }

    clear(startNode = this.startNode) {
      removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }

  }
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */

  class BooleanAttributePart {
    constructor(element, name, strings) {
      this.value = undefined;
      this._pendingValue = undefined;

      if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
        throw new Error('Boolean attributes can only contain a single expression');
      }

      this.element = element;
      this.name = name;
      this.strings = strings;
    }

    setValue(value) {
      this._pendingValue = value;
    }

    commit() {
      while (isDirective(this._pendingValue)) {
        const directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      const value = !!this._pendingValue;

      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, '');
        } else {
          this.element.removeAttribute(this.name);
        }
      }

      this.value = value;
      this._pendingValue = noChange;
    }

  }
  /**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */

  class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
      super(element, name, strings);
      this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
    }

    _createPart() {
      return new PropertyPart(this);
    }

    _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }

      return super._getValue();
    }

    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element[this.name] = this._getValue();
      }
    }

  }
  class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
  // from the options object, then options are supported. If not, then the thrid
  // argument to add/removeEventListener is interpreted as the boolean capture
  // value so we should only pass the `capture` property.

  let eventOptionsSupported = false;

  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    };
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (_e) {}

  class EventPart {
    constructor(element, eventName, eventContext) {
      this.value = undefined;
      this._pendingValue = undefined;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;

      this._boundHandleEvent = e => this.handleEvent(e);
    }

    setValue(value) {
      this._pendingValue = value;
    }

    commit() {
      while (isDirective(this._pendingValue)) {
        const directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      const newListener = this._pendingValue;
      const oldListener = this.value;
      const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
      const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

      if (shouldRemoveListener) {
        this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      this._options = getOptions(newListener);

      if (shouldAddListener) {
        this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      this.value = newListener;
      this._pendingValue = noChange;
    }

    handleEvent(event) {
      if (typeof this.value === 'function') {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    }

  } // We copy options because of the inconsistent behavior of browsers when reading
  // the third argument of add/removeEventListener. IE11 doesn't support options
  // at all. Chrome 41 only reads `capture` if the argument is an object.

  const getOptions = o => o && (eventOptionsSupported ? {
    capture: o.capture,
    passive: o.passive,
    once: o.once
  } : o.capture);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Creates Parts when a template is instantiated.
   */

  class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
      const prefix = name[0];

      if (prefix === '.') {
        const comitter = new PropertyCommitter(element, name.slice(1), strings);
        return comitter.parts;
      }

      if (prefix === '@') {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }

      if (prefix === '?') {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }

      const comitter = new AttributeCommitter(element, name, strings);
      return comitter.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */


    handleTextExpression(options) {
      return new NodePart(options);
    }

  }
  const defaultTemplateProcessor = new DefaultTemplateProcessor();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * The default TemplateFactory which caches Templates keyed on
   * result.type and result.strings.
   */

  function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);

    if (templateCache === undefined) {
      templateCache = new Map();
      templateCaches.set(result.type, templateCache);
    }

    let template = templateCache.get(result.strings);

    if (template === undefined) {
      template = new Template(result, result.getTemplateElement());
      templateCache.set(result.strings, template);
    }

    return template;
  } // The first argument to JS template tags retain identity across multiple
  // calls to a tag for the same literal, so we can cache work done per literal
  // in a Map.

  const templateCaches = new Map();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const parts = new WeakMap();
  /**
   * Renders a template to a container.
   *
   * To update a container with new values, reevaluate the template literal and
   * call `render` with the new result.
   *
   * @param result a TemplateResult created by evaluating a template tag like
   *     `html` or `svg`.
   * @param container A DOM parent to render to. The entire contents are either
   *     replaced, or efficiently updated if the same result type was previous
   *     rendered there.
   * @param options RenderOptions for the entire render tree rendered to this
   *     container. Render options must *not* change between renders to the same
   *     container, as those changes will not effect previously rendered DOM.
   */

  const render = (result, container, options) => {
    let part = parts.get(container);

    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({
        templateFactory
      }, options)));
      part.appendInto(container);
    }

    part.setValue(result);
    part.commit();
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */

  const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const walkerNodeFilter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT;
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1,
   * removed 4 nodes)
   */

  function removeNodesFromTemplate(template, nodesToRemove) {
    const {
      element: {
        content
      },
      parts
    } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;

    while (walker.nextNode()) {
      nodeIndex++;
      const node = walker.currentNode; // End removal if stepped past the removing node

      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      } // A node to remove was found in the template


      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node); // Track node we're removing

        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      } // When removing, increment count by which to adjust subsequent part indices


      if (currentRemovingNode !== null) {
        removeCount++;
      }

      while (part !== undefined && part.index === nodeIndex) {
        // If part is in a removed node deactivate it by setting index to -1 or
        // adjust the index as needed.
        part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }

    nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
  }

  const countNodes = node => {
    let count = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

    while (walker.nextNode()) {
      count++;
    }

    return count;
  };

  const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
      const part = parts[i];

      if (isTemplatePartActive(part)) {
        return i;
      }
    }

    return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */


  function insertNodeIntoTemplate(template, node, refNode = null) {
    const {
      element: {
        content
      },
      parts
    } = template; // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.

    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }

    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;

    while (walker.nextNode()) {
      walkerIndex++;
      const walkerNode = walker.currentNode;

      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }

      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        // If we've inserted the node, simply adjust all subsequent parts
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }

          return;
        }

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

  let compatibleShadyCSSVersion = true;

  if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected.` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` + `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
  }
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */


  const shadyTemplateFactory = scopeName => result => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);

    if (templateCache === undefined) {
      templateCache = new Map();
      templateCaches.set(cacheKey, templateCache);
    }

    let template = templateCache.get(result.strings);

    if (template === undefined) {
      const element = result.getTemplateElement();

      if (compatibleShadyCSSVersion) {
        window.ShadyCSS.prepareTemplateDom(element, scopeName);
      }

      template = new Template(result, element);
      templateCache.set(result.strings, template);
    }

    return template;
  };

  const TEMPLATE_TYPES = ['html', 'svg'];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */

  const removeStylesFromLitTemplates = scopeName => {
    TEMPLATE_TYPES.forEach(type => {
      const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

      if (templates !== undefined) {
        templates.forEach(template => {
          const {
            element: {
              content
            }
          } = template; // IE 11 doesn't support the iterable param Set constructor

          const styles = new Set();
          Array.from(content.querySelectorAll('style')).forEach(s => {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };

  const shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered
   * output.
   */

  const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
    shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

    const styles = renderedDOM.querySelectorAll('style'); // If there are no styles, there's no work to do.

    if (styles.length === 0) {
      return;
    }

    const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.

    for (let i = 0; i < styles.length; i++) {
      const style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    } // Remove styles from nested templates in this scope.


    removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
    // `template`.

    insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).

    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

    if (window.ShadyCSS.nativeShadow) {
      // When in native Shadow DOM, re-add styling to rendered content using
      // the style ShadyCSS produced.
      const style = template.element.content.querySelector('style');
      renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    } else {
      // When not in native Shadow DOM, at this point ShadyCSS will have
      // removed the style from the lit template and parts will be broken as a
      // result. To fix this, we put back the style node ShadyCSS removed
      // and then tell lit to remove that node from the template.
      // NOTE, ShadyCSS creates its own style so we can safely add/remove
      // `condensedStyle` here.
      template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
      const removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };

  const render$1 = (result, container, options) => {
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    render(result, container, Object.assign({
      templateFactory: shadyTemplateFactory(scopeName)
    }, options)); // When rendering a TemplateResult, scope the template with ShadyCSS

    if (container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof TemplateResult) {
      // Scope the element template one time only for this scope.
      if (!shadyRenderSet.has(scopeName)) {
        const part = parts.get(container);
        const instance = part.value;
        prepareTemplateStyles(container, instance.template, scopeName);
      } // Update styling if this is the initial render to this container.


      if (!hasRendered) {
        window.ShadyCSS.styleElement(container.host);
      }
    }
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // serializer/deserializers for boolean attribute
  const fromBooleanAttribute = value => value !== null;

  const toBooleanAttribute = value => value ? '' : null;
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */


  const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
  };
  const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    reflect: false,
    hasChanged: notEqual
  };
  const microtaskPromise = new Promise(resolve => resolve(true));
  const STATE_HAS_UPDATED = 1;
  const STATE_UPDATE_REQUESTED = 1 << 2;
  const STATE_IS_REFLECTING = 1 << 3;
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   */

  class UpdatingElement extends HTMLElement {
    constructor() {
      super();
      this._updateState = 0;
      this._instanceProperties = undefined;
      this._updatePromise = microtaskPromise;
      /**
       * Map with keys for any properties that have changed since the last
       * update cycle with previous values.
       */

      this._changedProperties = new Map();
      /**
       * Map with keys of properties that should be reflected when updated.
       */

      this._reflectingProperties = undefined;
      this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     */


    static get observedAttributes() {
      // note: piggy backing on this to ensure we're _finalized.
      this._finalize();

      const attributes = [];

      for (const [p, v] of this._classProperties) {
        const attr = this._attributeNameForProperty(p, v);

        if (attr !== undefined) {
          this._attributeToPropertyMap.set(attr, p);

          attributes.push(attr);
        }
      }

      return attributes;
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     */


    static createProperty(name, options = defaultPropertyDeclaration) {
      // ensure private storage for property declarations.
      if (!this.hasOwnProperty('_classProperties')) {
        this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

        const superProperties = Object.getPrototypeOf(this)._classProperties;

        if (superProperties !== undefined) {
          superProperties.forEach((v, k) => this._classProperties.set(k, v));
        }
      }

      this._classProperties.set(name, options); // Allow user defined accessors by not replacing an existing own-property
      // accessor.


      if (this.prototype.hasOwnProperty(name)) {
        return;
      }

      const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
      Object.defineProperty(this.prototype, name, {
        get() {
          return this[key];
        },

        set(value) {
          const oldValue = this[name];
          this[key] = value;

          this._requestPropertyUpdate(name, oldValue, options);
        },

        configurable: true,
        enumerable: true
      });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     */


    static _finalize() {
      if (this.hasOwnProperty('_finalized') && this._finalized) {
        return;
      } // finalize any superclasses


      const superCtor = Object.getPrototypeOf(this);

      if (typeof superCtor._finalize === 'function') {
        superCtor._finalize();
      }

      this._finalized = true; // initialize Map populated in observedAttributes

      this._attributeToPropertyMap = new Map(); // make any properties

      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])];

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        this.createProperty(p, props[p]);
      }
    }
    /**
     * Returns the property name for the given attribute `name`.
     */


    static _attributeNameForProperty(name, options) {
      const attribute = options !== undefined && options.attribute;
      return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     */


    static _valueHasChanged(value, old, hasChanged = notEqual) {
      return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's `type`
     * or `type.fromAttribute` property option.
     */


    static _propertyValueFromAttribute(value, options) {
      const type = options && options.type;

      if (type === undefined) {
        return value;
      } // Note: special case `Boolean` so users can use it as a `type`.


      const fromAttribute = type === Boolean ? fromBooleanAttribute : typeof type === 'function' ? type : type.fromAttribute;
      return fromAttribute ? fromAttribute(value) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     */


    static _propertyValueToAttribute(value, options) {
      if (options === undefined || options.reflect === undefined) {
        return;
      } // Note: special case `Boolean` so users can use it as a `type`.


      const toAttribute = options.type === Boolean ? toBooleanAttribute : options.type && options.type.toAttribute || String;
      return toAttribute(value);
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */


    initialize() {
      this.renderRoot = this.createRenderRoot();

      this._saveInstanceProperties();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */


    _saveInstanceProperties() {
      for (const [p] of this.constructor._classProperties) {
        if (this.hasOwnProperty(p)) {
          const value = this[p];
          delete this[p];

          if (!this._instanceProperties) {
            this._instanceProperties = new Map();
          }

          this._instanceProperties.set(p, value);
        }
      }
    }
    /**
     * Applies previously saved instance properties.
     */


    _applyInstanceProperties() {
      for (const [p, v] of this._instanceProperties) {
        this[p] = v;
      }

      this._instanceProperties = undefined;
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */


    createRenderRoot() {
      return this.attachShadow({
        mode: 'open'
      });
    }
    /**
     * Uses ShadyCSS to keep element DOM updated.
     */


    connectedCallback() {
      if (this._updateState & STATE_HAS_UPDATED) {
        if (window.ShadyCSS !== undefined) {
          window.ShadyCSS.styleElement(this);
        }
      } else {
        this.requestUpdate();
      }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */


    disconnectedCallback() {}
    /**
     * Synchronizes property values when attributes change.
     */


    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
      const ctor = this.constructor;

      const attrValue = ctor._propertyValueToAttribute(value, options);

      if (attrValue !== undefined) {
        const attr = ctor._attributeNameForProperty(name, options);

        if (attr !== undefined) {
          // Track if the property is being reflected to avoid
          // setting the property again via `attributeChangedCallback`. Note:
          // 1. this takes advantage of the fact that the callback is synchronous.
          // 2. will behave incorrectly if multiple attributes are in the reaction
          // stack at time of calling. However, since we process attributes
          // in `update` this should not be possible (or an extreme corner case
          // that we'd like to discover).
          // mark state reflecting
          this._updateState = this._updateState | STATE_IS_REFLECTING;

          if (attrValue === null) {
            this.removeAttribute(attr);
          } else {
            this.setAttribute(attr, attrValue);
          } // mark state not reflecting


          this._updateState = this._updateState & ~STATE_IS_REFLECTING;
        }
      }
    }

    _attributeToProperty(name, value) {
      // Use tracking info to avoid deserializing attribute value if it was
      // just set from a property setter.
      if (!(this._updateState & STATE_IS_REFLECTING)) {
        const ctor = this.constructor;

        const propName = ctor._attributeToPropertyMap.get(name);

        if (propName !== undefined) {
          const options = ctor._classProperties.get(propName);

          this[propName] = ctor._propertyValueFromAttribute(value, options);
        }
      }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */


    requestUpdate(name, oldValue) {
      if (name !== undefined) {
        const options = this.constructor._classProperties.get(name) || defaultPropertyDeclaration;
        return this._requestPropertyUpdate(name, oldValue, options);
      }

      return this._invalidate();
    }
    /**
     * Requests an update for a specific property and records change information.
     * @param name {PropertyKey} name of requesting property
     * @param oldValue {any} old value of requesting property
     * @param options {PropertyDeclaration}
     */


    _requestPropertyUpdate(name, oldValue, options) {
      if (!this.constructor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        return this.updateComplete;
      } // track old value when changing.


      if (!this._changedProperties.has(name)) {
        this._changedProperties.set(name, oldValue);
      } // add to reflecting properties set


      if (options.reflect === true) {
        if (this._reflectingProperties === undefined) {
          this._reflectingProperties = new Map();
        }

        this._reflectingProperties.set(name, options);
      }

      return this._invalidate();
    }
    /**
     * Invalidates the element causing it to asynchronously update regardless
     * of whether or not any property changes are pending. This method is
     * automatically called when any registered property changes.
     */


    async _invalidate() {
      if (!this._hasRequestedUpdate) {
        // mark state updating...
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        let resolver;
        const previousValidatePromise = this._updatePromise;
        this._updatePromise = new Promise(r => resolver = r);
        await previousValidatePromise;

        this._validate();

        resolver(!this._hasRequestedUpdate);
      }

      return this.updateComplete;
    }

    get _hasRequestedUpdate() {
      return this._updateState & STATE_UPDATE_REQUESTED;
    }
    /**
     * Validates the element by updating it.
     */


    _validate() {
      // Mixin instance properties once, if they exist.
      if (this._instanceProperties) {
        this._applyInstanceProperties();
      }

      if (this.shouldUpdate(this._changedProperties)) {
        const changedProperties = this._changedProperties;
        this.update(changedProperties);

        this._markUpdated();

        if (!(this._updateState & STATE_HAS_UPDATED)) {
          this._updateState = this._updateState | STATE_HAS_UPDATED;
          this.firstUpdated(changedProperties);
        }

        this.updated(changedProperties);
      } else {
        this._markUpdated();
      }
    }

    _markUpdated() {
      this._changedProperties = new Map();
      this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. This getter can be implemented to
     * await additional state. For example, it is sometimes useful to await a
     * rendered element before fulfilling this Promise. To do this, first await
     * `super.updateComplete` then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */


    get updateComplete() {
      return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */


    shouldUpdate(_changedProperties) {
      return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated DOM in the element's
     * `renderRoot`. Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */


    update(_changedProperties) {
      if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
        for (const [k, v] of this._reflectingProperties) {
          this._propertyToAttribute(k, this[k], v);
        }

        this._reflectingProperties = undefined;
      }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */


    updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */


    firstUpdated(_changedProperties) {}

  }
  /**
   * Maps attribute names to properties; for example `foobar` attribute
   * to `fooBar` property.
   */

  UpdatingElement._attributeToPropertyMap = new Map();
  /**
   * Marks class as having finished creating properties.
   */

  UpdatingElement._finalized = true;
  /**
   * Memoized list of all class properties, including any superclass properties.
   */

  UpdatingElement._classProperties = new Map();
  UpdatingElement.properties = {};

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class LitElement extends UpdatingElement {
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
      super.update(changedProperties);
      const templateResult = this.render();

      if (templateResult instanceof TemplateResult) {
        this.constructor.render(templateResult, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        });
      }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     * @returns {TemplateResult} Must return a lit-html TemplateResult.
     */


    render() {}

  }
  /**
   * Render method used to render the lit-html TemplateResult to the element's
   * DOM.
   * @param {TemplateResult} Template to render.
   * @param {Element|DocumentFragment} Node into which to render.
   * @param {String} Element name.
   */

  LitElement.render = render$1;

  const anchors = parent => html`
      ${parent} a {
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        padding: 10px 7.5px;
        text-decoration: none;
        color: #828282;
      }
      ${parent} a.active {
        color: #61dafb;
      }
      ${parent} a:hover {
        color: #CCC;
      }
      @media screen and (min-width: 768px) {
        ${parent} a {
          padding: 10px 20px;
          text-decoration: none;
          color: #828282;
        }
      }
  `;

  let styles = document.createElement('style');
  render(anchors('wc-header'), styles);
  document.head.appendChild(styles);

  class WCHeader extends LitElement {
    static get properties() {
      return {
        duration: Number,
        name: String,
        isOpen: {
          type: Boolean,
          reflect: true
        }
      };
    }

    render() {
      return html`
      <style>
        :host {
          background: black;
          position: fixed;
          width: 100%;
        }

        ul {
          display: flex;
          list-style: none;
          justify-content: space-around;
          align-content: center;
          justify-items: inherit;
          align-items: center;
          flex-direction: row;
          margin: 0;
          max-width: 980px;
          margin: 0 auto;
          padding: 0;
        }

        @media screen and (min-width: 768px) {
          ul {
            justify-content: flex-start;
          }
          .navigation a {
            padding: 10px 20px;
            text-decoration: none;
            color: #828282;
          }
        }
      </style>

      <header>
        <ul>
          <slot></slot>
        </ul>
      </header>
    `;
    }

  }

  window.customElements.define('wc-header', WCHeader);

  class WCFooter extends LitElement {
    render() {
      return html`
      <style>
        footer {
          background: #000;
          bottom: 0;
          height: 40px;
          left: 0;
          position: fixed;
          text-align: center;
          width: 100%;
        }

        ul {
          display: inline-block;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          display: inline-block;
          vertical-align: middle;
        }

        svg {
          display: block;
          margin: auto;
        }

        ${anchors()}
      </style>
      <footer>
        <ul>
          <li>
            <svg width="30" height="30" viewBox="0 0 841.9 595.3">
              <path fill="#61DAFB" d="M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3 c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9 c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6 c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11 c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6 c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4 c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6 c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,328.9,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5 c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2 c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8 c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9 c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3 c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9 c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M310,490c-13.6-7.8-19.5-37.5-14.9-75.7 c1.1-9.4,2.9-19.3,5.1-29.4c19.6,4.8,41,8.5,63.5,10.9c13.5,18.5,27.5,35.3,41.6,50c-32.6,30.3-63.2,46.9-84,46.9 C316.8,492.6,313,491.7,310,490z M547.2,413.8c4.7,38.2-1.1,67.9-14.6,75.8c-3,1.8-6.9,2.6-11.5,2.6c-20.7,0-51.4-16.5-84-46.6 c14-14.7,28-31.4,41.3-49.9c22.6-2.4,44-6.1,63.6-11C544.3,394.8,546.1,404.5,547.2,413.8z M585.7,347.1c-8.6,3.7-18,7-27.7,10.1 c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,19.3,6.5,28.1,10.2c35.4,15.1,58.3,34.9,58.3,50.6 C644,312.2,621.1,332.1,585.7,347.1z"></path>
              <polygon fill="#61DAFB" points="320.8,78.4 320.8,78.4 320.8,78.4"></polygon>
              <circle fill="#61DAFB" cx="420.9" cy="296.5" r="45.7"></circle>
              <polygon fill="#61DAFB" points="520.5,78.1 520.5,78.1 520.5,78.1"></polygon>
            </svg>
          </li>
          <li>
            <a href="/terms">Terms</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </footer>
    `;
    }

  }

  window.customElements.define('wc-footer', WCFooter);

  class WCPagination extends LitElement {
    static get properties() {
      return {
        currentPage: Number,
        pages: Number,
        nextPage: Number,
        prevPage: Number,
        story: String
      };
    }

    render() {
      let {
        currentPage,
        pages,
        nextPage,
        prevPage,
        story
      } = this;
      return html`
      <style>
        .pagination {
          text-align: center;
          display: block;
        }
      </style>

      <div class="pagination">
        ${currentPage !== 1 && html`<a href="/${story}/${nextPage}">&lt; prev</a>`}
        <span>${currentPage}/${pages}</span>
        ${currentPage !== pages && html`<a href="/${story}/${prevPage}">next &gt;</a>`}
      </div>
    `;
    }

  }

  window.customElements.define('wc-pagination', WCPagination);

}());

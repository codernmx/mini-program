var t = require("../../@babel/runtime/helpers/typeof");

module.exports = function(e) {
    var r = {};
    function n(t) {
        if (r[t]) return r[t].exports;
        var i = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    return n.m = e, n.c = r, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" === t(e) && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var o in e) n.d(i, o, function(t) {
            return e[t];
        }.bind(null, o));
        return i;
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, "a", e), e;
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 3);
}([ function(t, e) {
    t.exports = require("jsbn");
}, function(t, e, r) {
    var n = r(0), i = n.BigInteger, o = n.SecureRandom, s = r(6).ECCurveFp, u = new o(), a = c(), h = a.curve, f = a.G, l = a.n;
    function c() {
        var t = new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16), e = new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16), r = new i("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16), n = new s(t, e, r), o = n.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0");
        return {
            curve: n,
            G: o,
            n: new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
        };
    }
    function p(t, e) {
        return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
    }
    t.exports = {
        getGlobalCurve: function() {
            return h;
        },
        generateEcparam: c,
        generateKeyPairHex: function() {
            var t = new i(l.bitLength(), u).mod(l.subtract(i.ONE)).add(i.ONE), e = p(t.toString(16), 64), r = f.multiply(t);
            return {
                privateKey: e,
                publicKey: "04" + p(r.getX().toBigInteger().toString(16), 64) + p(r.getY().toBigInteger().toString(16), 64)
            };
        },
        parseUtf8StringToHex: function(t) {
            for (var e = (t = unescape(encodeURIComponent(t))).length, r = [], n = 0; n < e; n++) r[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8;
            for (var i = [], o = 0; o < e; o++) {
                var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                i.push((s >>> 4).toString(16)), i.push((15 & s).toString(16));
            }
            return i.join("");
        },
        parseArrayBufferToHex: function(t) {
            return Array.prototype.map.call(new Uint8Array(t), function(t) {
                return ("00" + t.toString(16)).slice(-2);
            }).join("");
        },
        leftPad: p,
        arrayToHex: function(t) {
            for (var e = [], r = 0, n = 0; n < 2 * t.length; n += 2) e[n >>> 3] |= parseInt(t[r], 10) << 24 - n % 8 * 4, 
            r++;
            for (var i = [], o = 0; o < t.length; o++) {
                var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                i.push((s >>> 4).toString(16)), i.push((15 & s).toString(16));
            }
            return i.join("");
        },
        arrayToUtf8: function(t) {
            for (var e = [], r = 0, n = 0; n < 2 * t.length; n += 2) e[n >>> 3] |= parseInt(t[r], 10) << 24 - n % 8 * 4, 
            r++;
            try {
                for (var i = [], o = 0; o < t.length; o++) {
                    var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                    i.push(String.fromCharCode(s));
                }
                return decodeURIComponent(escape(i.join("")));
            } catch (t) {
                throw new Error("Malformed UTF-8 data");
            }
        },
        hexToArray: function(t) {
            var e = [], r = t.length;
            r % 2 != 0 && (t = p(t, r + 1)), r = t.length;
            for (var n = 0; n < r; n += 2) e.push(parseInt(t.substr(n, 2), 16));
            return e;
        }
    };
}, function(e, r, n) {
    var i = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
        return t(e);
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e);
    };
    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var s = n(0).BigInteger, u = n(1), a = function(t, e, r, n, i) {
        for (var o = 0; o < i; o++) r[n + o] = t[e + o];
    }, h = {
        minValue: -2147483648,
        maxValue: 2147483647,
        parse: function(t) {
            if (t < this.minValue) {
                for (var e = Number(-t).toString(2), r = e.substr(e.length - 31, 31), n = "", i = 0; i < r.length; i++) {
                    n += "0" === r.substr(i, 1) ? "1" : "0";
                }
                return parseInt(n, 2) + 1;
            }
            if (t > this.maxValue) {
                for (var o = Number(t).toString(2), s = o.substr(o.length - 31, 31), u = "", a = 0; a < s.length; a++) {
                    u += "0" === s.substr(a, 1) ? "1" : "0";
                }
                return -(parseInt(u, 2) + 1);
            }
            return t;
        },
        parseByte: function(t) {
            if (t < 0) {
                for (var e = Number(-t).toString(2), r = e.substr(e.length - 8, 8), n = "", i = 0; i < r.length; i++) {
                    n += "0" === r.substr(i, 1) ? "1" : "0";
                }
                return (parseInt(n, 2) + 1) % 256;
            }
            if (t > 255) {
                var o = Number(t).toString(2);
                return parseInt(o.substr(o.length - 8, 8), 2);
            }
            return t;
        }
    }, f = function() {
        function t() {
            o(this, t), this.xBuf = [], this.xBufOff = 0, this.byteCount = 0, this.DIGEST_LENGTH = 32, 
            this.v0 = [ 1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214 ], 
            this.v0 = [ 1937774191, 1226093241, 388252375, -628488704, -1452330820, 372324522, -477237683, -1325724082 ], 
            this.v = new Array(8), this.v_ = new Array(8), this.X0 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
            this.X = new Array(68), this.xOff = 0, this.T_00_15 = 2043430169, this.T_16_63 = 2055708042, 
            arguments.length > 0 ? this.initDigest(arguments.length <= 0 ? void 0 : arguments[0]) : this.init();
        }
        return t.prototype.init = function() {
            this.xBuf = new Array(4), this.reset();
        }, t.prototype.initDigest = function(t) {
            this.xBuf = [].concat(t.xBuf), this.xBufOff = t.xBufOff, this.byteCount = t.byteCount, 
            a(t.X, 0, this.X, 0, t.X.length), this.xOff = t.xOff, a(t.v, 0, this.v, 0, t.v.length);
        }, t.prototype.getDigestSize = function() {
            return this.DIGEST_LENGTH;
        }, t.prototype.reset = function() {
            this.byteCount = 0, this.xBufOff = 0;
            for (var t = Object.keys(this.xBuf), e = 0, r = t.length; e < r; e++) this.xBuf[t[e]] = null;
            a(this.v0, 0, this.v, 0, this.v0.length), this.xOff = 0, a(this.X0, 0, this.X, 0, this.X0.length);
        }, t.prototype.processBlock = function() {
            var t = void 0, e = this.X, r = new Array(64);
            for (t = 16; t < 68; t++) e[t] = this.p1(e[t - 16] ^ e[t - 9] ^ this.rotate(e[t - 3], 15)) ^ this.rotate(e[t - 13], 7) ^ e[t - 6];
            for (t = 0; t < 64; t++) r[t] = e[t] ^ e[t + 4];
            var n = this.v, i = this.v_;
            a(n, 0, i, 0, this.v0.length);
            var o = void 0, s = void 0, u = void 0, f = void 0, l = void 0;
            for (t = 0; t < 16; t++) l = this.rotate(i[0], 12), o = h.parse(h.parse(l + i[4]) + this.rotate(this.T_00_15, t)), 
            s = (o = this.rotate(o, 7)) ^ l, u = h.parse(h.parse(this.ff_00_15(i[0], i[1], i[2]) + i[3]) + s) + r[t], 
            f = h.parse(h.parse(this.gg_00_15(i[4], i[5], i[6]) + i[7]) + o) + e[t], i[3] = i[2], 
            i[2] = this.rotate(i[1], 9), i[1] = i[0], i[0] = u, i[7] = i[6], i[6] = this.rotate(i[5], 19), 
            i[5] = i[4], i[4] = this.p0(f);
            for (t = 16; t < 64; t++) l = this.rotate(i[0], 12), o = h.parse(h.parse(l + i[4]) + this.rotate(this.T_16_63, t)), 
            s = (o = this.rotate(o, 7)) ^ l, u = h.parse(h.parse(this.ff_16_63(i[0], i[1], i[2]) + i[3]) + s) + r[t], 
            f = h.parse(h.parse(this.gg_16_63(i[4], i[5], i[6]) + i[7]) + o) + e[t], i[3] = i[2], 
            i[2] = this.rotate(i[1], 9), i[1] = i[0], i[0] = u, i[7] = i[6], i[6] = this.rotate(i[5], 19), 
            i[5] = i[4], i[4] = this.p0(f);
            for (t = 0; t < 8; t++) n[t] ^= h.parse(i[t]);
            this.xOff = 0, a(this.X0, 0, this.X, 0, this.X0.length);
        }, t.prototype.processWord = function(t, e) {
            var r = t[e] << 24;
            r |= (255 & t[++e]) << 16, r |= (255 & t[++e]) << 8, r |= 255 & t[++e], this.X[this.xOff] = r, 
            16 == ++this.xOff && this.processBlock();
        }, t.prototype.processLength = function(t) {
            this.xOff > 14 && this.processBlock(), this.X[14] = this.urShiftLong(t, 32), this.X[15] = 4294967295 & t;
        }, t.prototype.intToBigEndian = function(t, e, r) {
            e[r] = 255 & h.parseByte(this.urShift(t, 24)), e[++r] = 255 & h.parseByte(this.urShift(t, 16)), 
            e[++r] = 255 & h.parseByte(this.urShift(t, 8)), e[++r] = 255 & h.parseByte(t);
        }, t.prototype.doFinal = function(t, e) {
            this.finish();
            for (var r = 0; r < 8; r++) this.intToBigEndian(this.v[r], t, e + 4 * r);
            return this.reset(), this.DIGEST_LENGTH;
        }, t.prototype.update = function(t) {
            this.xBuf[this.xBufOff++] = t, this.xBufOff === this.xBuf.length && (this.processWord(this.xBuf, 0), 
            this.xBufOff = 0), this.byteCount++;
        }, t.prototype.blockUpdate = function(t, e, r) {
            for (;0 !== this.xBufOff && r > 0; ) this.update(t[e]), e++, r--;
            for (;r > this.xBuf.length; ) this.processWord(t, e), e += this.xBuf.length, r -= this.xBuf.length, 
            this.byteCount += this.xBuf.length;
            for (;r > 0; ) this.update(t[e]), e++, r--;
        }, t.prototype.finish = function() {
            var t = this.byteCount << 3;
            for (this.update(128); 0 !== this.xBufOff; ) this.update(0);
            this.processLength(t), this.processBlock();
        }, t.prototype.rotate = function(t, e) {
            return t << e | this.urShift(t, 32 - e);
        }, t.prototype.p0 = function(t) {
            return t ^ this.rotate(t, 9) ^ this.rotate(t, 17);
        }, t.prototype.p1 = function(t) {
            return t ^ this.rotate(t, 15) ^ this.rotate(t, 23);
        }, t.prototype.ff_00_15 = function(t, e, r) {
            return t ^ e ^ r;
        }, t.prototype.ff_16_63 = function(t, e, r) {
            return t & e | t & r | e & r;
        }, t.prototype.gg_00_15 = function(t, e, r) {
            return t ^ e ^ r;
        }, t.prototype.gg_16_63 = function(t, e, r) {
            return t & e | ~t & r;
        }, t.prototype.urShift = function(t, e) {
            return (t > h.maxValue || t < h.minValue) && (t = h.parse(t)), t >>> e;
        }, t.prototype.urShiftLong = function(t, e) {
            var r = void 0, n = new s();
            if (n.fromInt(t), n.signum() >= 0) r = n.shiftRight(e).intValue(); else {
                var i = new s();
                i.fromInt(2);
                var o = ~e, u = "";
                if (o < 0) {
                    for (var a = 64 + o, h = 0; h < a; h++) u += "0";
                    var f = new s();
                    f.fromInt(t >> e);
                    var l = new s("10" + u, 2);
                    u = l.toRadix(10), r = l.add(f).toRadix(10);
                } else r = (t >> e) + (u = i.shiftLeft(~e).intValue());
            }
            return r;
        }, t.prototype.getZ = function(t, e, r) {
            var n = 0;
            if (r) {
                if ("string" != typeof r) throw new Error("sm2: Type of userId Must be String! Receive Type: " + (void 0 === r ? "undefined" : i(r)));
                if (r.length >= 8192) throw new Error("sm2: The Length of userId Must Less Than 8192! Length: " + r.length);
                n = 4 * (r = u.parseUtf8StringToHex(r)).length;
            }
            if (this.update(n >> 8 & 255), this.update(255 & n), r) {
                var o = u.hexToArray(r);
                this.blockUpdate(o, 0, o.length);
            }
            var s = u.hexToArray(u.leftPad(t.curve.a.toBigInteger().toRadix(16), 64)), a = u.hexToArray(u.leftPad(t.curve.b.toBigInteger().toRadix(16), 64)), h = u.hexToArray(u.leftPad(t.getX().toBigInteger().toRadix(16), 64)), f = u.hexToArray(u.leftPad(t.getY().toBigInteger().toRadix(16), 64)), l = u.hexToArray(e.substr(0, 64)), c = u.hexToArray(e.substr(64, 64));
            this.blockUpdate(s, 0, s.length), this.blockUpdate(a, 0, a.length), this.blockUpdate(h, 0, h.length), 
            this.blockUpdate(f, 0, f.length), this.blockUpdate(l, 0, l.length), this.blockUpdate(c, 0, c.length);
            var p = new Array(this.getDigestSize());
            return this.doFinal(p, 0), p;
        }, t;
    }();
    e.exports = f;
}, function(t, e, r) {
    t.exports = {
        sm2: r(4),
        sm3: r(8),
        sm4: r(9)
    };
}, function(t, e, r) {
    var n = r(0).BigInteger, i = r(5), o = i.encodeDer, s = i.decodeDer, u = r(2), a = r(7), h = r(1), f = h.generateEcparam(), l = f.G, c = f.curve, p = f.n;
    function g(t, e) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "1234567812345678", n = new u(), i = new u().getZ(l, e.substr(2, 128), r), o = h.hexToArray(h.arrayToHex(i).toString()), s = t, a = h.hexToArray(s), f = new Array(n.getDigestSize());
        return n.blockUpdate(o, 0, o.length), n.blockUpdate(a, 0, a.length), n.doFinal(f, 0), 
        h.arrayToHex(f).toString();
    }
    function y(t) {
        var e = l.multiply(new n(t, 16));
        return "04" + h.leftPad(e.getX().toBigInteger().toString(16), 64) + h.leftPad(e.getY().toBigInteger().toString(16), 64);
    }
    function d() {
        var t = h.generateKeyPairHex(), e = c.decodePointHex(t.publicKey);
        return t.k = new n(t.privateKey, 16), t.x1 = e.getX().toBigInteger(), t;
    }
    t.exports = {
        generateKeyPairHex: h.generateKeyPairHex,
        doEncrypt: function(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, n = new a();
            t = h.hexToArray(h.parseUtf8StringToHex(t)), e.length > 128 && (e = e.substr(e.length - 128));
            var i = e.substr(0, 64), o = e.substr(64);
            e = n.createPoint(i, o);
            var s = n.initEncipher(e);
            n.encryptBlock(t);
            var u = h.arrayToHex(t), f = new Array(32);
            return n.doFinal(f), f = h.arrayToHex(f), 0 === r ? s + u + f : s + f + u;
        },
        doDecrypt: function(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, i = new a();
            e = new n(e, 16);
            var o = t.substr(0, 64), s = t.substr(0 + o.length, 64), u = o.length + s.length, f = t.substr(u, 64), l = t.substr(u + 64);
            0 === r && (f = t.substr(t.length - 64), l = t.substr(u, t.length - u - 64));
            var c = h.hexToArray(l), p = i.createPoint(o, s);
            i.initDecipher(e, p), i.decryptBlock(c);
            var g = new Array(32);
            i.doFinal(g);
            var y = h.arrayToHex(g) === f;
            if (y) {
                var d = h.arrayToUtf8(c);
                return d;
            }
            return "";
        },
        doSignature: function(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = r.pointPool, s = r.der, u = r.hash, a = r.publicKey, f = r.userId, l = "string" == typeof t ? h.parseUtf8StringToHex(t) : h.parseArrayBufferToHex(t);
            u && (l = g(l, a = a || y(e), f));
            var c = new n(e, 16), v = new n(l, 16), F = null, m = null, b = null;
            do {
                do {
                    var x = void 0;
                    F = (x = i && i.length ? i.pop() : d()).k, m = v.add(x.x1).mod(p);
                } while (m.equals(n.ZERO) || m.add(F).equals(p));
                b = c.add(n.ONE).modInverse(p).multiply(F.subtract(m.multiply(c))).mod(p);
            } while (b.equals(n.ZERO));
            return s ? o(m, b) : h.leftPad(m.toString(16), 64) + h.leftPad(b.toString(16), 64);
        },
        doVerifySignature: function(t, e, r) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, o = i.der, u = i.hash, a = i.userId, f = "string" == typeof t ? h.parseUtf8StringToHex(t) : h.parseArrayBufferToHex(t);
            u && (f = g(f, r, a));
            var y = void 0, d = void 0;
            if (o) {
                var v = s(e);
                y = v.r, d = v.s;
            } else y = new n(e.substring(0, 64), 16), d = new n(e.substring(64), 16);
            var F = c.decodePointHex(r), m = new n(f, 16), b = y.add(d).mod(p);
            if (b.equals(n.ZERO)) return !1;
            var x = l.multiply(d).add(F.multiply(b)), B = m.add(x.getX().toBigInteger()).mod(p);
            return y.equals(B);
        },
        getPoint: d
    };
}, function(e, r, n) {
    function i(e, r) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !r || "object" !== t(r) && "function" != typeof r ? e : r;
    }
    function o(e, r) {
        if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + t(r));
        e.prototype = Object.create(r && r.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
    }
    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var u = n(0).BigInteger;
    var a = function() {
        function t() {
            s(this, t), this.isModified = !0, this.hTLV = null, this.hT = "00", this.hL = "00", 
            this.hV = "";
        }
        return t.prototype.getLengthHexFromValue = function() {
            var t = this.hV.length / 2, e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e), t < 128 ? e : (128 + e.length / 2).toString(16) + e;
        }, t.prototype.getEncodedHex = function() {
            return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), 
            this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, 
            this.isModified = !1), this.hTLV;
        }, t.prototype.getFreshValueHex = function() {
            return "";
        }, t;
    }(), h = function(t) {
        function e(r) {
            s(this, e);
            var n = i(this, t.call(this));
            return n.hT = "02", r && r.bigint && (n.hTLV = null, n.isModified = !0, n.hV = function(t) {
                var e = t.toString(16);
                if ("-" !== e.substr(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e); else {
                    var r = e.substr(1).length;
                    r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                    for (var n = "", i = 0; i < r; i++) n += "f";
                    e = new u(n, 16).xor(t).add(u.ONE).toString(16).replace(/^-/, "");
                }
                return e;
            }(r.bigint)), n;
        }
        return o(e, t), e.prototype.getFreshValueHex = function() {
            return this.hV;
        }, e;
    }(a), f = function(t) {
        function e(r) {
            s(this, e);
            var n = i(this, t.call(this));
            return n.hT = "30", n.asn1Array = [], r && r.array && (n.asn1Array = r.array), n;
        }
        return o(e, t), e.prototype.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                t += this.asn1Array[e].getEncodedHex();
            }
            return this.hV = t, this.hV;
        }, e;
    }(a);
    function l(t, e) {
        if ("8" !== t.substring(e + 2, e + 3)) return 1;
        var r = parseInt(t.substring(e + 3, e + 4), 10);
        return 0 === r ? -1 : r > 0 && r < 10 ? r + 1 : -2;
    }
    function c(t, e) {
        var r = function(t, e) {
            var r = l(t, e);
            return r < 1 ? "" : t.substring(e + 2, e + 2 + 2 * r);
        }(t, e);
        if ("" === r) return -1;
        return (parseInt(r.substring(0, 1), 10) < 8 ? new u(r, 16) : new u(r.substring(2), 16)).intValue();
    }
    function p(t, e) {
        var r = l(t, e);
        return r < 0 ? r : e + 2 * (r + 1);
    }
    function g(t, e) {
        var r = p(t, e), n = c(t, e);
        return t.substring(r, r + 2 * n);
    }
    function y(t, e) {
        return p(t, e) + 2 * c(t, e);
    }
    e.exports = {
        encodeDer: function(t, e) {
            var r = new h({
                bigint: t
            }), n = new h({
                bigint: e
            });
            return new f({
                array: [ r, n ]
            }).getEncodedHex();
        },
        decodeDer: function(t) {
            var e = function(t, e) {
                var r = [], n = p(t, e);
                r.push(n);
                for (var i = c(t, e), o = n, s = 0; ;) {
                    var u = y(t, o);
                    if (null == u || u - n >= 2 * i) break;
                    if (s >= 200) break;
                    r.push(u), o = u, s++;
                }
                return r;
            }(t, 0), r = e[0], n = e[1], i = g(t, r), o = g(t, n);
            return {
                r: new u(i, 16),
                s: new u(o, 16)
            };
        }
    };
}, function(t, e, r) {
    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var i = r(0).BigInteger, o = new i("3"), s = function() {
        function t(e, r) {
            n(this, t), this.x = r, this.q = e;
        }
        return t.prototype.equals = function(t) {
            return t === this || this.q.equals(t.q) && this.x.equals(t.x);
        }, t.prototype.toBigInteger = function() {
            return this.x;
        }, t.prototype.negate = function() {
            return new t(this.q, this.x.negate().mod(this.q));
        }, t.prototype.add = function(e) {
            return new t(this.q, this.x.add(e.toBigInteger()).mod(this.q));
        }, t.prototype.subtract = function(e) {
            return new t(this.q, this.x.subtract(e.toBigInteger()).mod(this.q));
        }, t.prototype.multiply = function(e) {
            return new t(this.q, this.x.multiply(e.toBigInteger()).mod(this.q));
        }, t.prototype.divide = function(e) {
            return new t(this.q, this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q));
        }, t.prototype.square = function() {
            return new t(this.q, this.x.square().mod(this.q));
        }, t;
    }(), u = function() {
        function t(e, r, o, s) {
            n(this, t), this.curve = e, this.x = r, this.y = o, this.z = null == s ? i.ONE : s, 
            this.zinv = null;
        }
        return t.prototype.getX = function() {
            return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
        }, t.prototype.getY = function() {
            return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
        }, t.prototype.equals = function(t) {
            return t === this || (this.isInfinity() ? t.isInfinity() : t.isInfinity() ? this.isInfinity() : !!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(i.ZERO) && t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(i.ZERO));
        }, t.prototype.isInfinity = function() {
            return null === this.x && null === this.y || this.z.equals(i.ZERO) && !this.y.toBigInteger().equals(i.ZERO);
        }, t.prototype.negate = function() {
            return new t(this.curve, this.x, this.y.negate(), this.z);
        }, t.prototype.add = function(e) {
            if (this.isInfinity()) return e;
            if (e.isInfinity()) return this;
            var r = this.x.toBigInteger(), n = this.y.toBigInteger(), o = this.z, s = e.x.toBigInteger(), u = e.y.toBigInteger(), a = e.z, h = this.curve.q, f = r.multiply(a).mod(h), l = s.multiply(o).mod(h), c = f.subtract(l), p = n.multiply(a).mod(h), g = u.multiply(o).mod(h), y = p.subtract(g);
            if (i.ZERO.equals(c)) return i.ZERO.equals(y) ? this.twice() : this.curve.infinity;
            var d = f.add(l), v = o.multiply(a).mod(h), F = c.square().mod(h), m = c.multiply(F).mod(h), b = v.multiply(y.square()).subtract(d.multiply(F)).mod(h), x = c.multiply(b).mod(h), B = y.multiply(F.multiply(f).subtract(b)).subtract(p.multiply(m)).mod(h), w = m.multiply(v).mod(h);
            return new t(this.curve, this.curve.fromBigInteger(x), this.curve.fromBigInteger(B), w);
        }, t.prototype.twice = function() {
            if (this.isInfinity()) return this;
            if (!this.y.toBigInteger().signum()) return this.curve.infinity;
            var e = this.x.toBigInteger(), r = this.y.toBigInteger(), n = this.z, i = this.curve.q, s = this.curve.a.toBigInteger(), u = e.square().multiply(o).add(s.multiply(n.square())).mod(i), a = r.shiftLeft(1).multiply(n).mod(i), h = r.square().mod(i), f = h.multiply(e).multiply(n).mod(i), l = a.square().mod(i), c = u.square().subtract(f.shiftLeft(3)).mod(i), p = a.multiply(c).mod(i), g = u.multiply(f.shiftLeft(2).subtract(c)).subtract(l.shiftLeft(1).multiply(h)).mod(i), y = a.multiply(l).mod(i);
            return new t(this.curve, this.curve.fromBigInteger(p), this.curve.fromBigInteger(g), y);
        }, t.prototype.multiply = function(t) {
            if (this.isInfinity()) return this;
            if (!t.signum()) return this.curve.infinity;
            for (var e = t.multiply(o), r = this.negate(), n = this, i = e.bitLength() - 2; i > 0; i--) {
                n = n.twice();
                var s = e.testBit(i);
                s !== t.testBit(i) && (n = n.add(s ? this : r));
            }
            return n;
        }, t;
    }(), a = function() {
        function t(e, r, i) {
            n(this, t), this.q = e, this.a = this.fromBigInteger(r), this.b = this.fromBigInteger(i), 
            this.infinity = new u(this, null, null);
        }
        return t.prototype.equals = function(t) {
            return t === this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b);
        }, t.prototype.fromBigInteger = function(t) {
            return new s(this.q, t);
        }, t.prototype.decodePointHex = function(t) {
            switch (parseInt(t.substr(0, 2), 16)) {
              case 0:
                return this.infinity;

              case 2:
              case 3:
                return null;

              case 4:
              case 6:
              case 7:
                var e = (t.length - 2) / 2, r = t.substr(2, e), n = t.substr(e + 2, e);
                return new u(this, this.fromBigInteger(new i(r, 16)), this.fromBigInteger(new i(n, 16)));

              default:
                return null;
            }
        }, t;
    }();
    t.exports = {
        ECPointFp: u,
        ECCurveFp: a
    };
}, function(t, e, r) {
    var n = r(0).BigInteger, i = r(2), o = r(1), s = function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.ct = 1, this.p2 = null, this.sm3keybase = null, this.sm3c3 = null, 
            this.key = new Array(32), this.keyOff = 0;
        }
        return t.prototype.reset = function() {
            this.sm3keybase = new i(), this.sm3c3 = new i();
            var t = o.hexToArray(o.leftPad(this.p2.getX().toBigInteger().toRadix(16), 64)), e = o.hexToArray(o.leftPad(this.p2.getY().toBigInteger().toRadix(16), 64));
            this.sm3keybase.blockUpdate(t, 0, t.length), this.sm3c3.blockUpdate(t, 0, t.length), 
            this.sm3keybase.blockUpdate(e, 0, e.length), this.ct = 1, this.nextKey();
        }, t.prototype.nextKey = function() {
            var t = new i(this.sm3keybase);
            t.update(this.ct >> 24 & 255), t.update(this.ct >> 16 & 255), t.update(this.ct >> 8 & 255), 
            t.update(255 & this.ct), t.doFinal(this.key, 0), this.keyOff = 0, this.ct++;
        }, t.prototype.initEncipher = function(t) {
            var e = o.generateKeyPairHex(), r = new n(e.privateKey, 16), i = e.publicKey;
            return this.p2 = t.multiply(r), this.reset(), i.length > 128 && (i = i.substr(i.length - 128)), 
            i;
        }, t.prototype.encryptBlock = function(t) {
            this.sm3c3.blockUpdate(t, 0, t.length);
            for (var e = 0; e < t.length; e++) this.keyOff === this.key.length && this.nextKey(), 
            t[e] ^= 255 & this.key[this.keyOff++];
        }, t.prototype.initDecipher = function(t, e) {
            this.p2 = e.multiply(t), this.reset();
        }, t.prototype.decryptBlock = function(t) {
            for (var e = 0; e < t.length; e++) this.keyOff === this.key.length && this.nextKey(), 
            t[e] ^= 255 & this.key[this.keyOff++];
            this.sm3c3.blockUpdate(t, 0, t.length);
        }, t.prototype.doFinal = function(t) {
            var e = o.hexToArray(o.leftPad(this.p2.getY().toBigInteger().toRadix(16), 64));
            this.sm3c3.blockUpdate(e, 0, e.length), this.sm3c3.doFinal(t, 0), this.reset();
        }, t.prototype.createPoint = function(t, e) {
            var r = "04" + t + e;
            return o.getGlobalCurve().decodePointHex(r);
        }, t;
    }();
    t.exports = s;
}, function(t, e, r) {
    function n(t, e) {
        return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
    }
    function i(t) {
        for (var e = "", r = 0; r < t.length / 2; r++) e += n(parseInt(t.substr(2 * r, 2), 16).toString(2), 8);
        return e;
    }
    function o(t, e) {
        return t.substring(e % t.length) + t.substr(0, e % t.length);
    }
    function s(t, e, r) {
        for (var n = t || "", i = e || "", o = [], s = void 0, u = n.length - 1; u >= 0; u--) s = r(n[u], i[u], s), 
        o[u] = s[0];
        return o.join("");
    }
    function u(t, e) {
        return s(t, e, function(t, e) {
            return [ t === e ? "0" : "1" ];
        });
    }
    function a(t, e) {
        return s(t, e, function(t, e) {
            return [ "1" === t && "1" === e ? "1" : "0" ];
        });
    }
    function h(t, e) {
        return s(t, e, function(t, e) {
            return [ "1" === t || "1" === e ? "1" : "0" ];
        });
    }
    function f(t, e) {
        return s(t, e, function(t, e, r) {
            var n = r ? r[1] : "0";
            return t !== e ? [ "0" === n ? "1" : "0", n ] : [ n, t ];
        });
    }
    function l(t) {
        return function() {
            for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) r[n] = arguments[n];
            return r.reduce(function(e, r) {
                return t(e, r);
            });
        };
    }
    function c(t) {
        return l(u)(t, o(t, 9), o(t, 17));
    }
    function p(t, e, r, n) {
        return n >= 0 && n <= 15 ? l(u)(t, e, r) : l(h)(a(t, e), a(t, r), a(e, r));
    }
    function g(t, e, r, n) {
        return n >= 0 && n <= 15 ? l(u)(t, e, r) : h(a(t, e), a(s(t, void 0, function(t) {
            return [ "1" === t ? "0" : "1" ];
        }), r));
    }
    function y(t) {
        return i(t >= 0 && t <= 15 ? "79cc4519" : "7a879d8a");
    }
    function d(t, e) {
        for (var r, n = [], i = [], s = 0; s < 16; s++) n.push(e.substr(32 * s, 32));
        for (var a = 16; a < 68; a++) n.push(l(u)((r = l(u)(n[a - 16], n[a - 9], o(n[a - 3], 15)), 
        l(u)(r, o(r, 15), o(r, 23))), o(n[a - 13], 7), n[a - 6]));
        for (var h = 0; h < 64; h++) i.push(u(n[h], n[h + 4]));
        for (var d = [], v = 0; v < 8; v++) d.push(t.substr(32 * v, 32));
        for (var F = d[0], m = d[1], b = d[2], x = d[3], B = d[4], w = d[5], I = d[6], S = d[7], T = void 0, q = void 0, A = void 0, E = void 0, k = 0; k < 64; k++) q = u(T = o(l(f)(o(F, 12), B, o(y(k), k)), 7), o(F, 12)), 
        A = l(f)(p(F, m, b, k), x, q, i[k]), E = l(f)(g(B, w, I, k), S, T, n[k]), x = b, 
        b = o(m, 9), m = F, F = A, S = I, I = o(w, 19), w = B, B = c(E);
        return u([ F, m, b, x, B, w, I, S ].join(""), t);
    }
    t.exports = function(t) {
        for (var e = function(t) {
            for (var e = "", r = 0, i = t.length; r < i; r++) {
                e += n(t[r].codePointAt(0).toString(2), 8);
            }
            return e;
        }(t), r = e.length, o = r % 512, s = (e + "1" + n("", o = o >= 448 ? 512 - o % 448 - 1 : 448 - o - 1) + n(r.toString(2), 64)).toString(), u = (r + o + 65) / 512, a = i("7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e"), h = 0; h <= u - 1; h++) {
            a = d(a, s.substr(512 * h, 512));
        }
        return function(t) {
            for (var e = "", r = 0; r < t.length / 8; r++) e += n(parseInt(t.substr(8 * r, 8), 2).toString(16), 2);
            return e;
        }(a);
    };
}, function(t, e, r) {
    var n = [ 214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72 ], i = [ 462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257 ];
    function o(t) {
        for (var e = [], r = 0, n = t.length; r < n; r += 2) e.push(parseInt(t.substr(r, 2), 16));
        return e;
    }
    function s(t) {
        return t.map(function(t) {
            return 1 === (t = t.toString(16)).length ? "0" + t : t;
        }).join("");
    }
    function u(t) {
        for (var e = [], r = 0, n = t.length; r < n; r++) {
            var i = t.charCodeAt(r);
            i <= 127 ? e.push(i) : i <= 2047 ? (e.push(192 | i >>> 6), e.push(128 | 63 & i)) : (e.push(224 | i >>> 12), 
            e.push(128 | i >>> 6 & 63), e.push(128 | 63 & i));
        }
        return e;
    }
    function a(t) {
        for (var e = [], r = 0, n = t.length; r < n; r++) t[r] >= 224 && t[r] <= 239 ? (e.push(String.fromCharCode(((15 & t[r]) << 12) + ((63 & t[r + 1]) << 6) + (63 & t[r + 2]))), 
        r += 2) : t[r] >= 192 && t[r] <= 223 ? (e.push(String.fromCharCode(((31 & t[r]) << 6) + (63 & t[r + 1]))), 
        r++) : e.push(String.fromCharCode(t[r]));
        return e.join("");
    }
    function h(t, e) {
        return t << e | t >>> 32 - e;
    }
    function f(t) {
        return (255 & n[t >>> 24 & 255]) << 24 | (255 & n[t >>> 16 & 255]) << 16 | (255 & n[t >>> 8 & 255]) << 8 | 255 & n[255 & t];
    }
    function l(t) {
        return t ^ h(t, 2) ^ h(t, 10) ^ h(t, 18) ^ h(t, 24);
    }
    function c(t) {
        return t ^ h(t, 13) ^ h(t, 23);
    }
    function p(t, e, r) {
        for (var n = new Array(4), i = new Array(4), o = 0; o < 4; o++) i[0] = 255 & t[0 + 4 * o], 
        i[1] = 255 & t[1 + 4 * o], i[2] = 255 & t[2 + 4 * o], i[3] = 255 & t[3 + 4 * o], 
        n[o] = i[0] << 24 | i[1] << 16 | i[2] << 8 | i[3];
        for (var s, u = 0; u < 32; u += 4) s = n[1] ^ n[2] ^ n[3] ^ r[u + 0], n[0] ^= l(f(s)), 
        s = n[2] ^ n[3] ^ n[0] ^ r[u + 1], n[1] ^= l(f(s)), s = n[3] ^ n[0] ^ n[1] ^ r[u + 2], 
        n[2] ^= l(f(s)), s = n[0] ^ n[1] ^ n[2] ^ r[u + 3], n[3] ^= l(f(s));
        for (var a = 0; a < 16; a += 4) e[a] = n[3 - a / 4] >>> 24 & 255, e[a + 1] = n[3 - a / 4] >>> 16 & 255, 
        e[a + 2] = n[3 - a / 4] >>> 8 & 255, e[a + 3] = 255 & n[3 - a / 4];
    }
    function g(t, e, r) {
        for (var n = new Array(4), o = new Array(4), s = 0; s < 4; s++) o[0] = 255 & t[0 + 4 * s], 
        o[1] = 255 & t[1 + 4 * s], o[2] = 255 & t[2 + 4 * s], o[3] = 255 & t[3 + 4 * s], 
        n[s] = o[0] << 24 | o[1] << 16 | o[2] << 8 | o[3];
        n[0] ^= 2746333894, n[1] ^= 1453994832, n[2] ^= 1736282519, n[3] ^= 2993693404;
        for (var u, a = 0; a < 32; a += 4) u = n[1] ^ n[2] ^ n[3] ^ i[a + 0], e[a + 0] = n[0] ^= c(f(u)), 
        u = n[2] ^ n[3] ^ n[0] ^ i[a + 1], e[a + 1] = n[1] ^= c(f(u)), u = n[3] ^ n[0] ^ n[1] ^ i[a + 2], 
        e[a + 2] = n[2] ^= c(f(u)), u = n[0] ^ n[1] ^ n[2] ^ i[a + 3], e[a + 3] = n[3] ^= c(f(u));
        if (0 === r) for (var h, l = 0; l < 16; l++) h = e[l], e[l] = e[31 - l], e[31 - l] = h;
    }
    function y(t, e, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i = n.padding, h = void 0 === i ? "pkcs#5" : i, f = (n.mode, 
        n.output), l = void 0 === f ? "string" : f;
        if ("string" == typeof e && (e = o(e)), 16 !== e.length) throw new Error("key is invalid");
        if (t = "string" == typeof t ? 0 !== r ? u(t) : o(t) : [].concat(t), "pkcs#5" === h && 0 !== r) for (var c = 16 - t.length % 16, y = 0; y < c; y++) t.push(c);
        var d = new Array(32);
        g(e, d, r);
        for (var v = [], F = t.length, m = 0; F >= 16; ) {
            var b = t.slice(m, m + 16), x = new Array(16);
            p(b, x, d);
            for (var B = 0; B < 16; B++) v[m + B] = x[B];
            F -= 16, m += 16;
        }
        if ("pkcs#5" === h && 0 === r) {
            var w = v[v.length - 1];
            v.splice(v.length - w, w);
        }
        return "array" !== l ? 0 !== r ? s(v) : a(v) : v;
    }
    t.exports = {
        encrypt: function(t, e, r) {
            return y(t, e, 1, r);
        },
        decrypt: function(t, e, r) {
            return y(t, e, 0, r);
        }
    };
} ]);
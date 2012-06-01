/*
 * twitter-text-js 1.4.10
 *
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this work except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 */
if (!window.twttr) {
    window.twttr = {}
}(function () {
    twttr.txt = {};
    twttr.txt.regexen = {};
    var C = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    twttr.txt.htmlEscape = function (R) {
        return R && R.replace(/[&"'><]/g, function (S) {
            return C[S]
        })
    };

    function D(S, R) {
        R = R || "";
        if (typeof S !== "string") {
            if (S.global && R.indexOf("g") < 0) {
                R += "g"
            }
            if (S.ignoreCase && R.indexOf("i") < 0) {
                R += "i"
            }
            if (S.multiline && R.indexOf("m") < 0) {
                R += "m"
            }
            S = S.source
        }
        return new RegExp(S.replace(/#\{(\w+)\}/g, function (U, T) {
            var V = twttr.txt.regexen[T] || "";
            if (typeof V !== "string") {
                V = V.source
            }
            return V
        }), R)
    }
    function E(S, R) {
        return S.replace(/#\{(\w+)\}/g, function (U, T) {
            return R[T] || ""
        })
    }
    function B(S, U, R) {
        var T = String.fromCharCode(U);
        if (R !== U) {
            T += "-" + String.fromCharCode(R)
        }
        S.push(T);
        return S
    }
    var J = String.fromCharCode;
    var H = [J(32), J(133), J(160), J(5760), J(6158), J(8232), J(8233), J(8239), J(8287), J(12288)];
    B(H, 9, 13);
    B(H, 8192, 8202);
    twttr.txt.regexen.spaces_group = D(H.join(""));
    twttr.txt.regexen.spaces = D("[" + H.join("") + "]");
    twttr.txt.regexen.punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~/;
    twttr.txt.regexen.atSigns = /[@＠]/;
    twttr.txt.regexen.extractMentions = D(/(^|[^a-zA-Z0-9_])(#{atSigns})([a-zA-Z0-9_]{1,20})(?=(.|$))/g);
    twttr.txt.regexen.extractReply = D(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/);
    twttr.txt.regexen.listName = /[a-zA-Z][a-zA-Z0-9_\-\u0080-\u00ff]{0,24}/;
    twttr.txt.regexen.extractMentionsOrLists = D(/(^|[^a-zA-Z0-9_])(#{atSigns})([a-zA-Z0-9_]{1,20})(\/[a-zA-Z][a-zA-Z0-9_\-]{0,24})?(?=(.|$))/g);
    var N = [];
    B(N, 1024, 1279);
    B(N, 1280, 1319);
    B(N, 11744, 11775);
    B(N, 42560, 42655);
    B(N, 4352, 4607);
    B(N, 12592, 12677);
    B(N, 43360, 43391);
    B(N, 44032, 55215);
    B(N, 55216, 55295);
    B(N, 65441, 65500);
    B(N, 12449, 12538);
    B(N, 12540, 12542);
    B(N, 65382, 65439);
    B(N, 65392, 65392);
    B(N, 65296, 65305);
    B(N, 65313, 65338);
    B(N, 65345, 65370);
    B(N, 12353, 12438);
    B(N, 12441, 12446);
    B(N, 13312, 19903);
    B(N, 19968, 40959);
    B(N, 173824, 177983);
    B(N, 177984, 178207);
    B(N, 194560, 195103);
    B(N, 12293, 12293);
    B(N, 12347, 12347);
    twttr.txt.regexen.nonLatinHashtagChars = D(N.join(""));
    twttr.txt.regexen.latinAccentChars = D("ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþş\\303\\277");
    twttr.txt.regexen.endScreenNameMatch = D(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/);
    twttr.txt.regexen.hashtagBoundary = D(/(?:^|$|#{spaces}|[「」。、.,!！?？:;"'])/);
    twttr.txt.regexen.hashtagAlpha = D(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    twttr.txt.regexen.hashtagAlphaNumeric = D(/[a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    twttr.txt.regexen.autoLinkHashtags = D(/(#{hashtagBoundary})(#|＃)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi);
    twttr.txt.regexen.autoLinkUsernamesOrLists = /(^|[^a-zA-Z0-9_]|RT:?)([@＠]+)([a-zA-Z0-9_]{1,20})(\/[a-zA-Z][a-zA-Z0-9_\-]{0,24})?/g;
    twttr.txt.regexen.autoLinkEmoticon = /(8\-\#|8\-E|\+\-\(|\`\@|\`O|\&lt;\|:~\(|\}:o\{|:\-\[|\&gt;o\&lt;|X\-\/|\[:-\]\-I\-|\/\/\/\/Ö\\\\\\\\|\(\|:\|\/\)|∑:\*\)|\( \| \))/g;
    twttr.txt.regexen.validPrecedingChars = D(/(?:[^-\/"'!=A-Za-z0-9_@＠\.]|^)/);
    twttr.txt.regexen.invalidDomainChars = E("\u00A0#{punct}#{spaces_group}", twttr.txt.regexen);
    twttr.txt.regexen.validDomainChars = D(/[^#{invalidDomainChars}]/);
    twttr.txt.regexen.validSubdomain = D(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/);
    twttr.txt.regexen.validDomainName = D(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/);
    twttr.txt.regexen.validGTLD = D(/(?:(?:aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)(?=[^a-zA-Z]|$))/);
    twttr.txt.regexen.validCCTLD = D(/(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)(?=[^a-zA-Z]|$))/);
    twttr.txt.regexen.validPunycode = D(/(?:xn--[0-9a-z]+)/);
    twttr.txt.regexen.validDomain = D(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/);
    twttr.txt.regexen.validShortDomain = D(/^#{validDomainName}#{validCCTLD}$/);
    twttr.txt.regexen.validPortNumber = D(/[0-9]+/);
    twttr.txt.regexen.validGeneralUrlPathChars = D(/[a-z0-9!\*';:=\+\$\/%#\[\]\-_,~|&#{latinAccentChars}]/i);
    twttr.txt.regexen.wikipediaDisambiguation = D(/(?:\(#{validGeneralUrlPathChars}+\))/i);
    twttr.txt.regexen.validUrlPathChars = D(/(?:#{wikipediaDisambiguation}|@#{validGeneralUrlPathChars}+\/|[\.,]?#{validGeneralUrlPathChars}?)/i);
    twttr.txt.regexen.validUrlPathEndingChars = D(/(?:[\+\-a-z0-9=_#\/#{latinAccentChars}]|#{wikipediaDisambiguation})/i);
    twttr.txt.regexen.validUrlQueryChars = /[a-z0-9!\*'\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
    twttr.txt.regexen.validUrlQueryEndingChars = /[a-z0-9_&=#\/]/i;
    twttr.txt.regexen.extractUrl = D("((#{validPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/(?:#{validUrlPathChars}+#{validUrlPathEndingChars}|#{validUrlPathChars}+#{validUrlPathEndingChars}?|#{validUrlPathEndingChars})?)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))", "gi");
    twttr.txt.regexen.validateUrlUnreserved = /[a-z0-9\-._~]/i;
    twttr.txt.regexen.validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
    twttr.txt.regexen.validateUrlSubDelims = /[!$&'()*+,;=]/i;
    twttr.txt.regexen.validateUrlPchar = D("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])", "i");
    twttr.txt.regexen.validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
    twttr.txt.regexen.validateUrlUserinfo = D("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*", "i");
    twttr.txt.regexen.validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
    twttr.txt.regexen.validateUrlIpv4 = D(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i);
    twttr.txt.regexen.validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
    twttr.txt.regexen.validateUrlIp = D("(?:#{validateUrlIpv4}|#{validateUrlIpv6})", "i");
    twttr.txt.regexen.validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
    twttr.txt.regexen.validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
    twttr.txt.regexen.validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
    twttr.txt.regexen.validateUrlDomain = D(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i);
    twttr.txt.regexen.validateUrlHost = D("(?:#{validateUrlIp}|#{validateUrlDomain})", "i");
    twttr.txt.regexen.validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    twttr.txt.regexen.validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    twttr.txt.regexen.validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    twttr.txt.regexen.validateUrlUnicodeDomain = D(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i);
    twttr.txt.regexen.validateUrlUnicodeHost = D("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})", "i");
    twttr.txt.regexen.validateUrlPort = /[0-9]{1,5}/;
    twttr.txt.regexen.validateUrlUnicodeAuthority = D("(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?", "i");
    twttr.txt.regexen.validateUrlAuthority = D("(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?", "i");
    twttr.txt.regexen.validateUrlPath = D(/(\/#{validateUrlPchar}*)*/i);
    twttr.txt.regexen.validateUrlQuery = D(/(#{validateUrlPchar}|\/|\?)*/i);
    twttr.txt.regexen.validateUrlFragment = D(/(#{validateUrlPchar}|\/|\?)*/i);
    twttr.txt.regexen.validateUrlUnencoded = D("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$", "i");
    var A = "tweet-url";
    var G = "list-slug";
    var Q = "username";
    var M = "hashtag";
    var O = ' rel="nofollow"';

    function K(T) {
        var S = {};
        for (var R in T) {
            if (T.hasOwnProperty(R)) {
                S[R] = T[R]
            }
        }
        return S
    }
    twttr.txt.autoLink = function (S, R) {
        R = K(R || {});
        return twttr.txt.autoLinkUsernamesOrLists(twttr.txt.autoLinkUrlsCustom(twttr.txt.autoLinkHashtags(S, R), R), R)
    };
    twttr.txt.autoLinkUsernamesOrLists = function (X, V) {
        V = K(V || {});
        V.urlClass = V.urlClass || A;
        V.listClass = V.listClass || G;
        V.usernameClass = V.usernameClass || Q;
        V.usernameUrlBase = V.usernameUrlBase || "http://twitter.com/";
        V.listUrlBase = V.listUrlBase || "http://twitter.com/";
        if (!V.suppressNoFollow) {
            var R = O
        }
        var W = "",
            U = twttr.txt.splitTags(X);
        for (var T = 0; T < U.length; T++) {
            var S = U[T];
            if (T !== 0) {
                W += ((T % 2 === 0) ? ">" : "<")
            }
            if (T % 4 !== 0) {
                W += S
            } else {
                W += S.replace(twttr.txt.regexen.autoLinkUsernamesOrLists, function (f, i, a, e, Y, c, j) {
                    var Z = j.slice(c + f.length);
                    var h = {
                        before: i,
                        at: a,
                        user: twttr.txt.htmlEscape(e),
                        slashListname: twttr.txt.htmlEscape(Y),
                        extraHtml: R,
                        preChunk: "",
                        chunk: twttr.txt.htmlEscape(j),
                        postChunk: ""
                    };
                    for (var b in V) {
                        if (V.hasOwnProperty(b)) {
                            h[b] = V[b]
                        }
                    }
                    if (Y && !V.suppressLists) {
                        var g = h.chunk = E("#{user}#{slashListname}", h);
                        h.list = twttr.txt.htmlEscape(g.toLowerCase());
                        return E('#{before}#{at}<a class="#{urlClass} #{listClass}" href="#{listUrlBase}#{list}"#{extraHtml}>#{preChunk}#{chunk}#{postChunk}</a>', h)
                    } else {
                        if (Z && Z.match(twttr.txt.regexen.endScreenNameMatch)) {
                            return f
                        } else {
                            h.chunk = twttr.txt.htmlEscape(e);
                            h.dataScreenName = !V.suppressDataScreenName ? E('data-screen-name="#{chunk}" ', h) : "";
                            return E('#{before}#{at}<a class="#{urlClass} #{usernameClass}" #{dataScreenName}href="#{usernameUrlBase}#{chunk}"#{extraHtml}>#{preChunk}#{chunk}#{postChunk}</a>', h)
                        }
                    }
                })
            }
        }
        return W
    };
    twttr.txt.autoLinkHashtags = function (T, S) {
        S = K(S || {});
        S.urlClass = S.urlClass || A;
        S.hashtagClass = S.hashtagClass || M;
        S.hashtagUrlBase = S.hashtagUrlBase || "http://twitter.com/search?q=%23";
        if (!S.suppressNoFollow) {
            var R = O
        }
        return T.replace(twttr.txt.regexen.autoLinkHashtags, function (V, W, X, Z) {
            var Y = {
                before: W,
                hash: twttr.txt.htmlEscape(X),
                preText: "",
                text: twttr.txt.htmlEscape(Z),
                postText: "",
                extraHtml: R
            };
            for (var U in S) {
                if (S.hasOwnProperty(U)) {
                    Y[U] = S[U]
                }
            }
            return E('#{before}<a href="#{hashtagUrlBase}#{text}" title="##{text}" class="#{urlClass} #{hashtagClass}"#{extraHtml}>#{hash}#{preText}#{text}#{postText}</a>', Y)
        })
    };
    twttr.txt.autoLinkUrlsCustom = function (U, S) {
        S = K(S || {});
        if (!S.suppressNoFollow) {
            S.rel = "nofollow"
        }
        if (S.urlClass) {
            S["class"] = S.urlClass;
            delete S.urlClass
        }
        var V, T, R;
        if (S.urlEntities) {
            V = {};
            for (T = 0, R = S.urlEntities.length; T < R; T++) {
                V[S.urlEntities[T].url] = S.urlEntities[T]
            }
        }
        delete S.suppressNoFollow;
        delete S.suppressDataScreenName;
        delete S.listClass;
        delete S.usernameClass;
        delete S.usernameUrlBase;
        delete S.listUrlBase;
        return U.replace(twttr.txt.regexen.extractUrl, function (e, h, g, X, i, a, c, j, W) {
            var Z;
            if (i) {
                var Y = "";
                for (var b in S) {
                    Y += E(' #{k}="#{v}" ', {
                        k: b,
                        v: S[b].toString().replace(/"/, "&quot;").replace(/</, "&lt;").replace(/>/, "&gt;")
                    })
                }
                var f = {
                    before: g,
                    htmlAttrs: Y,
                    url: twttr.txt.htmlEscape(X)
                };
                if (V && V[X] && V[X].display_url) {
                    f.displayUrl = twttr.txt.htmlEscape(V[X].display_url)
                } else {
                    f.displayUrl = f.url
                }
                return E('#{before}<a href="#{url}"#{htmlAttrs}>#{displayUrl}</a>', f)
            } else {
                return h
            }
        })
    };
    twttr.txt.extractMentions = function (U) {
        var V = [],
            R = twttr.txt.extractMentionsWithIndices(U);
        for (var T = 0; T < R.length; T++) {
            var S = R[T].screenName;
            V.push(S)
        }
        return V
    };
    twttr.txt.extractMentionsWithIndices = function (T) {
        if (!T) {
            return []
        }
        var S = [],
            R = 0;
        T.replace(twttr.txt.regexen.extractMentions, function (U, Y, X, V, Z) {
            if (!Z.match(twttr.txt.regexen.endScreenNameMatch)) {
                var W = T.indexOf(X + V, R);
                R = W + V.length + 1;
                S.push({
                    screenName: V,
                    indices: [W, R]
                })
            }
        });
        return S
    };
    twttr.txt.extractMentionsOrListsWithIndices = function (T) {
        if (!T) {
            return []
        }
        var S = [],
            R = 0;
        T.replace(twttr.txt.regexen.extractMentionsOrLists, function (U, Y, X, V, a, Z) {
            if (!Z.match(twttr.txt.regexen.endScreenNameMatch)) {
                a = a || "";
                var W = T.indexOf(X + V + a, R);
                R = W + V.length + a.length + 1;
                S.push({
                    screenName: V,
                    listSlug: a,
                    indices: [W, R]
                })
            }
        });
        return S
    };
    twttr.txt.extractReplies = function (S) {
        if (!S) {
            return null
        }
        var R = S.match(twttr.txt.regexen.extractReply);
        if (!R) {
            return null
        }
        return R[1]
    };
    twttr.txt.extractUrls = function (U) {
        var T = [],
            R = twttr.txt.extractUrlsWithIndices(U);
        for (var S = 0; S < R.length; S++) {
            T.push(R[S].url)
        }
        return T
    };
    twttr.txt.extractUrlsWithIndices = function (T) {
        if (!T) {
            return []
        }
        var S = [],
            R = 0;
        T.replace(twttr.txt.regexen.extractUrl, function (Z, c, b, U, d, W, V, e, a) {
            if (!d && !e && W.match(twttr.txt.regexen.validShortDomain)) {
                return
            }
            var X = T.indexOf(U, Y),
                Y = X + U.length;
            S.push({
                url: U,
                indices: [X, Y]
            })
        });
        return S
    };
    twttr.txt.extractHashtags = function (U) {
        var T = [],
            S = twttr.txt.extractHashtagsWithIndices(U);
        for (var R = 0; R < S.length; R++) {
            T.push(S[R].hashtag)
        }
        return T
    };
    twttr.txt.extractHashtagsWithIndices = function (T) {
        if (!T) {
            return []
        }
        var S = [],
            R = 0;
        T.replace(twttr.txt.regexen.autoLinkHashtags, function (U, X, Y, W) {
            var V = T.indexOf(Y + W, R);
            R = V + W.length + 1;
            S.push({
                hashtag: W,
                indices: [V, R]
            })
        });
        return S
    };
    twttr.txt.splitTags = function (X) {
        var R = X.split("<"),
            W, V = [],
            U;
        for (var T = 0; T < R.length; T += 1) {
            U = R[T];
            if (!U) {
                V.push("")
            } else {
                W = U.split(">");
                for (var S = 0; S < W.length; S += 1) {
                    V.push(W[S])
                }
            }
        }
        return V
    };
    twttr.txt.hitHighlight = function (c, e, U) {
        var a = "em";
        e = e || [];
        U = U || {};
        if (e.length === 0) {
            return c
        }
        var T = U.tag || a,
            d = ["<" + T + ">", "</" + T + ">"],
            b = twttr.txt.splitTags(c),
            f, k, h, X = "",
            R = 0,
            Y = b[0],
            Z = 0,
            S = 0,
            o = false,
            V = Y,
            g = [],
            W, l, p, n, m;
        for (k = 0; k < e.length; k += 1) {
            for (h = 0; h < e[k].length; h += 1) {
                g.push(e[k][h])
            }
        }
        for (W = 0; W < g.length; W += 1) {
            l = g[W];
            p = d[W % 2];
            n = false;
            while (Y != null && l >= Z + Y.length) {
                X += V.slice(S);
                if (o && l === Z + V.length) {
                    X += p;
                    n = true
                }
                if (b[R + 1]) {
                    X += "<" + b[R + 1] + ">"
                }
                Z += V.length;
                S = 0;
                R += 2;
                Y = b[R];
                V = Y;
                o = false
            }
            if (!n && Y != null) {
                m = l - Z;
                X += V.slice(S, m) + p;
                S = m;
                if (W % 2 === 0) {
                    o = true
                } else {
                    o = false
                }
            } else {
                if (!n) {
                    n = true;
                    X += p
                }
            }
        }
        if (Y != null) {
            if (S < V.length) {
                X += V.slice(S)
            }
            for (W = R + 1; W < b.length; W += 1) {
                X += (W % 2 === 0 ? b[W] : "<" + b[W] + ">")
            }
        }
        return X
    };
    var F = 140;
    var P = [J(65534), J(65279), J(65535), J(8234), J(8235), J(8236), J(8237), J(8238)];
    twttr.txt.isInvalidTweet = function (S) {
        if (!S) {
            return "empty"
        }
        if (S.length > F) {
            return "too_long"
        }
        for (var R = 0; R < P.length; R++) {
            if (S.indexOf(P[R]) >= 0) {
                return "invalid_characters"
            }
        }
        return false
    };
    twttr.txt.isValidTweetText = function (R) {
        return !twttr.txt.isInvalidTweet(R)
    };
    twttr.txt.isValidUsername = function (S) {
        if (!S) {
            return false
        }
        var R = twttr.txt.extractMentions(S);
        return R.length === 1 && R[0] === S.slice(1)
    };
    var L = D(/^#{autoLinkUsernamesOrLists}$/);
    twttr.txt.isValidList = function (S) {
        var R = S.match(L);
        return !!(R && R[1] == "" && R[4])
    };
    twttr.txt.isValidHashtag = function (S) {
        if (!S) {
            return false
        }
        var R = twttr.txt.extractHashtags(S);
        return R.length === 1 && R[0] === S.slice(1)
    };
    twttr.txt.isValidUrl = function (R, W, Z) {
        if (W == null) {
            W = true
        }
        if (Z == null) {
            Z = true
        }
        if (!R) {
            return false
        }
        var S = R.match(twttr.txt.regexen.validateUrlUnencoded);
        if (!S || S[0] !== R) {
            return false
        }
        var T = S[1],
            U = S[2],
            Y = S[3],
            X = S[4],
            V = S[5];
        if (!((!Z || (I(T, twttr.txt.regexen.validateUrlScheme) && T.match(/^https?$/i))) && I(Y, twttr.txt.regexen.validateUrlPath) && I(X, twttr.txt.regexen.validateUrlQuery, true) && I(V, twttr.txt.regexen.validateUrlFragment, true))) {
            return false
        }
        return (W && I(U, twttr.txt.regexen.validateUrlUnicodeAuthority)) || (!W && I(U, twttr.txt.regexen.validateUrlAuthority))
    };

    function I(S, T, R) {
        if (!R) {
            return ((typeof S === "string") && S.match(T) && RegExp["$&"] === S)
        }
        return (!S || (S.match(T) && RegExp["$&"] === S))
    }
    if (typeof module != "undefined" && module.exports) {
        module.exports = twttr.txt
    }
}());
TWTR = window.TWTR || {};
(function () {
    if (TWTR && TWTR.Widget) {
        return
    }
    function H(K, N, J) {
        for (var M = 0, L = K.length; M < L; ++M) {
            N.call(J || window, K[M], M, K)
        }
    }
    function B(J, K, L) {
        (Array.prototype.filter ||
        function (Q, R) {
            var P = R || window;
            var M = [];
            for (var O = 0, N = this.length; O < N; ++O) {
                if (!Q.call(P, this[O], O, this)) {
                    continue
                }
                M.push(this[O])
            }
            return M
        }).call(J, K, L)
    }
    function I(J, L, K) {
        this.el = J;
        this.prop = L;
        this.from = K.from;
        this.to = K.to;
        this.time = K.time;
        this.callback = K.callback;
        this.animDiff = this.to - this.from
    }
    I.canTransition = function () {
        var J = document.createElement("twitter");
        J.style.cssText = "-webkit-transition: all .5s linear;";
        return !!J.style.webkitTransitionProperty
    }();
    I.prototype._setStyle = function (J) {
        switch (this.prop) {
        case "opacity":
            this.el.style[this.prop] = J;
            this.el.style.filter = "alpha(opacity=" + J * 100 + ")";
            break;
        default:
            this.el.style[this.prop] = J + "px";
            break
        }
    };
    I.prototype._animate = function () {
        var J = this;
        this.now = new Date();
        this.diff = this.now - this.startTime;
        if (this.diff > this.time) {
            this._setStyle(this.to);
            if (this.callback) {
                this.callback.call(this)
            }
            clearInterval(this.timer);
            return
        }
        this.percentage = (Math.floor((this.diff / this.time) * 100) / 100);
        this.val = (this.animDiff * this.percentage) + this.from;
        this._setStyle(this.val)
    };
    I.prototype.start = function () {
        var J = this;
        this.startTime = new Date();
        this.timer = setInterval(function () {
            J._animate.call(J)
        }, 15)
    };
    TWTR.Widget = function (J) {
        this.init(J)
    };
    (function () {
        var X = window.twttr || {};
        var U = location.protocol.match(/https/);
        var W = /^.+\/profile_images/;
        var c = "https://s3.amazonaws.com/twitter_production/profile_images";
        var d = function (o) {
                return U ? o.replace(W, c) : o
            };
        var n = {};
        var l = function (p) {
                var o = n[p];
                if (!o) {
                    o = new RegExp("(?:^|\\s+)" + p + "(?:\\s+|$)");
                    n[p] = o
                }
                return o
            };
        var K = function (t, x, u, v) {
                var x = x || "*";
                var u = u || document;
                var p = [],
                    o = u.getElementsByTagName(x),
                    w = l(t);
                for (var q = 0, s = o.length; q < s; ++q) {
                    if (w.test(o[q].className)) {
                        p[p.length] = o[q];
                        if (v) {
                            v.call(o[q], o[q])
                        }
                    }
                }
                return p
            };
        var m = function () {
                var o = navigator.userAgent;
                return {
                    ie: o.match(/MSIE\s([^;]*)/)
                }
            }();
        var N = function (o) {
                if (typeof o == "string") {
                    return document.getElementById(o)
                }
                return o
            };
        var f = function (o) {
                return o.replace(/^\s+|\s+$/g, "")
            };
        var b = function () {
                var o = self.innerHeight;
                var p = document.compatMode;
                if ((p || m.ie)) {
                    o = (p == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight
                }
                return o
            };
        var k = function (q, o) {
                var p = q.target || q.srcElement;
                return o(p)
            };
        var Z = function (p) {
                try {
                    if (p && 3 == p.nodeType) {
                        return p.parentNode
                    } else {
                        return p
                    }
                } catch (o) {}
            };
        var a = function (p) {
                var o = p.relatedTarget;
                if (!o) {
                    if (p.type == "mouseout") {
                        o = p.toElement
                    } else {
                        if (p.type == "mouseover") {
                            o = p.fromElement
                        }
                    }
                }
                return Z(o)
            };
        var g = function (p, o) {
                o.parentNode.insertBefore(p, o.nextSibling)
            };
        var h = function (p) {
                try {
                    p.parentNode.removeChild(p)
                } catch (o) {}
            };
        var e = function (o) {
                return o.firstChild
            };
        var J = function (q) {
                var p = a(q);
                while (p && p != this) {
                    try {
                        p = p.parentNode
                    } catch (o) {
                        p = this
                    }
                }
                if (p != this) {
                    return true
                }
                return false
            };
        var M = function () {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    return function (p, t) {
                        var s = null;
                        var q = document.defaultView.getComputedStyle(p, "");
                        if (q) {
                            s = q[t]
                        }
                        var o = p.style[t] || s;
                        return o
                    }
                } else {
                    if (document.documentElement.currentStyle && m.ie) {
                        return function (o, q) {
                            var p = o.currentStyle ? o.currentStyle[q] : null;
                            return (o.style[q] || p)
                        }
                    }
                }
            }();
        var j = {
            has: function (o, p) {
                return new RegExp("(^|\\s)" + p + "(\\s|$)").test(N(o).className)
            },
            add: function (o, p) {
                if (!this.has(o, p)) {
                    N(o).className = f(N(o).className) + " " + p
                }
            },
            remove: function (o, p) {
                if (this.has(o, p)) {
                    N(o).className = N(o).className.replace(new RegExp("(^|\\s)" + p + "(\\s|$)", "g"), "")
                }
            }
        };
        var L = {
            add: function (q, p, o) {
                if (q.addEventListener) {
                    q.addEventListener(p, o, false)
                } else {
                    q.attachEvent("on" + p, function () {
                        o.call(q, window.event)
                    })
                }
            },
            remove: function (q, p, o) {
                if (q.removeEventListener) {
                    q.removeEventListener(p, o, false)
                } else {
                    q.detachEvent("on" + p, o)
                }
            }
        };
        var T = function () {
                function p(s) {
                    return parseInt((s).substring(0, 2), 16)
                }
                function o(s) {
                    return parseInt((s).substring(2, 4), 16)
                }
                function q(s) {
                    return parseInt((s).substring(4, 6), 16)
                }
                return function (s) {
                    return [p(s), o(s), q(s)]
                }
            }();
        var O = {
            bool: function (o) {
                return typeof o === "boolean"
            },
            def: function (p) {
                return !(typeof p === "undefined")
            },
            number: function (o) {
                return typeof o === "number" && isFinite(o)
            },
            string: function (o) {
                return typeof o === "string"
            },
            fn: function (o) {
                return typeof o === "function"
            },
            array: function (o) {
                if (o) {
                    return O.number(o.length) && O.fn(o.splice)
                }
                return false
            }
        };
        var S = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var Y = function (t) {
                var w = new Date(t);
                if (m.ie) {
                    w = Date.parse(t.replace(/( \+)/, " UTC$1"))
                }
                var p = "";
                var o = function () {
                        var s = w.getHours();
                        if (s > 0 && s < 13) {
                            p = "am";
                            return s
                        } else {
                            if (s < 1) {
                                p = "am";
                                return 12
                            } else {
                                p = "pm";
                                return s - 12
                            }
                        }
                    }();
                var q = w.getMinutes();
                var v = w.getSeconds();

                function u() {
                    var s = new Date();
                    if (s.getDate() != w.getDate() || s.getYear() != w.getYear() || s.getMonth() != w.getMonth()) {
                        return " - " + S[w.getMonth()] + " " + w.getDate() + ", " + w.getFullYear()
                    } else {
                        return ""
                    }
                }
                return o + ":" + q + p + u()
            };
        var Q = function (v) {
                var x = new Date();
                var t = new Date(v);
                if (m.ie) {
                    t = Date.parse(v.replace(/( \+)/, " UTC$1"))
                }
                var w = x - t;
                var p = 1000,
                    q = p * 60,
                    s = q * 60,
                    u = s * 24,
                    o = u * 7;
                if (isNaN(w) || w < 0) {
                    return ""
                }
                if (w < p * 2) {
                    return "right now"
                }
                if (w < q) {
                    return Math.floor(w / p) + " seconds ago"
                }
                if (w < q * 2) {
                    return "about 1 minute ago"
                }
                if (w < s) {
                    return Math.floor(w / q) + " minutes ago"
                }
                if (w < s * 2) {
                    return "about 1 hour ago"
                }
                if (w < u) {
                    return Math.floor(w / s) + " hours ago"
                }
                if (w > u && w < u * 2) {
                    return "yesterday"
                }
                if (w < u * 365) {
                    return Math.floor(w / u) + " days ago"
                } else {
                    return "over a year ago"
                }
            };

        function i(s) {
            var q = {};
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    q[p] = s[p]
                }
            }
            return q
        }
        X.txt.autoLink = function (p, o) {
            o = options_links = o || {};
            if (o.hasOwnProperty("extraHtml")) {
                options_links = i(o);
                delete options_links.extraHtml
            }
            return X.txt.autoLinkUsernamesOrLists(X.txt.autoLinkUrlsCustom(X.txt.autoLinkHashtags(p, o), options_links), o)
        };
        TWTR.Widget.ify = {
            autoLink: function (p) {
                options = {
                    extraHtml: "target=_blank",
                    target: "_blank",
                    urlEntities: []
                };
                if (p.needle.entities) {
                    if (p.needle.entities.urls) {
                        options.urlEntities = p.needle.entities.urls
                    }
                    if (p.needle.entities.media) {
                        options.urlEntities = options.urlEntities.concat(p.needle.entities.media)
                    }
                }
                if (X && X.txt) {
                    return X.txt.autoLink(p.needle.text, options).replace(/([@＠]+)(<[^>]*>)/g, "$2$1")
                } else {
                    return p.needle.text
                }
            }
        };

        function V(p, q, o) {
            this.job = p;
            this.decayFn = q;
            this.interval = o;
            this.decayRate = 1;
            this.decayMultiplier = 1.25;
            this.maxDecayTime = 3 * 60 * 1000
        }
        V.prototype = {
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
                var o = this;
                this.job(function () {
                    o.decayRate = o.decayFn() ? Math.max(1, o.decayRate / o.decayMultiplier) : o.decayRate * o.decayMultiplier;
                    var p = o.interval * o.decayRate;
                    p = (p >= o.maxDecayTime) ? o.maxDecayTime : p;
                    p = Math.floor(p);
                    o.worker = window.setTimeout(function () {
                        o.run.call(o)
                    }, p)
                })
            },
            destroy: function () {
                this.stop();
                this.decayRate = 1;
                return this
            }
        };

        function P(p, o, q) {
            this.time = p || 6000;
            this.loop = o || false;
            this.repeated = 0;
            this.callback = q;
            this.haystack = []
        }
        P.prototype = {
            set: function (o) {
                this.haystack = o
            },
            add: function (o) {
                this.haystack.unshift(o)
            },
            start: function () {
                if (this.timer) {
                    return this
                }
                this._job();
                var o = this;
                this.timer = setInterval(function () {
                    o._job.call(o)
                }, this.time);
                return this
            },
            stop: function () {
                if (this.timer) {
                    window.clearInterval(this.timer);
                    this.timer = null
                }
                return this
            },
            _next: function () {
                var o = this.haystack.shift();
                if (o && this.loop) {
                    this.haystack.push(o)
                }
                return o || null
            },
            _job: function () {
                var o = this._next();
                if (o) {
                    this.callback(o)
                }
                return this
            }
        };

        function R(p) {
            var o = '<div class="twtr-tweet-wrap">         <div class="twtr-avatar">           <div class="twtr-img"><a target="_blank" href="http://twitter.com/intent/user?screen_name=' + p.user + '"><img alt="' + p.user + ' profile" src="' + d(p.avatar) + '"></a></div>         </div>         <div class="twtr-tweet-text">           <p>             <a target="_blank" href="http://twitter.com/intent/user?screen_name=' + p.user + '" class="twtr-user">' + p.user + "</a> " + p.tweet + '             <em>            <a target="_blank" class="twtr-timestamp" time="' + p.timestamp + '" href="http://twitter.com/' + p.user + "/status/" + p.id + '">' + p.created_at + '</a>                        </em>           </p>         </div>       </div>';
            var q = document.createElement("div");
            q.id = "tweet-id-" + ++R._tweetCount;
            q.className = "twtr-tweet";
            q.innerHTML = o;
            this.element = q
        }
        R._tweetCount = 0;
        X.loadStyleSheet = function (q, p) {
            if (!TWTR.Widget.loadingStyleSheet) {
                TWTR.Widget.loadingStyleSheet = true;
                var o = document.createElement("link");
                o.href = q;
                o.rel = "stylesheet";
                o.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(o);
                var s = setInterval(function () {
                    var t = M(p, "position");
                    if (t == "relative") {
                        clearInterval(s);
                        s = null;
                        TWTR.Widget.hasLoadedStyleSheet = true
                    }
                }, 50)
            }
        };
        (function () {
            var o = false;
            X.css = function (s) {
                var q = document.createElement("style");
                q.type = "text/css";
                if (m.ie) {
                    q.styleSheet.cssText = s
                } else {
                    var t = document.createDocumentFragment();
                    t.appendChild(document.createTextNode(s));
                    q.appendChild(t)
                }
                function p() {
                    document.getElementsByTagName("head")[0].appendChild(q)
                }
                if (!m.ie || o) {
                    p()
                } else {
                    window.attachEvent("onload", function () {
                        o = true;
                        p()
                    })
                }
            }
        })();
        TWTR.Widget.isLoaded = false;
        TWTR.Widget.loadingStyleSheet = false;
        TWTR.Widget.hasLoadedStyleSheet = false;
        TWTR.Widget.WIDGET_NUMBER = 0;
        TWTR.Widget.REFRESH_MIN = 6000;
        TWTR.Widget.ENTITY_RANGE = 100;
        TWTR.Widget.ENTITY_PERCENTAGE = 100;
        TWTR.Widget.matches = {
            mentions: /^@[a-zA-Z0-9_]{1,20}\b/,
            any_mentions: /\b@[a-zA-Z0-9_]{1,20}\b/
        };
        TWTR.Widget.jsonP = function (p, s) {
            var o = document.createElement("script");
            var q = document.getElementsByTagName("head")[0];
            o.type = "text/javascript";
            o.src = p;
            q.insertBefore(o, q.firstChild);
            s(o);
            return o
        };
        TWTR.Widget.randomNumber = function (o) {
            r = Math.floor(Math.random() * o);
            return r
        };
        TWTR.Widget.SHOW_ENTITIES = TWTR.Widget.randomNumber(TWTR.Widget.ENTITY_RANGE) <= TWTR.Widget.ENTITY_PERCENTAGE;
        TWTR.Widget.prototype = function () {
            var u = window.twttr || {};
            var v = U ? "https://" : "http://";
            var t = "twitter.com";
            var p = v + "search." + t + "/search.";
            var o = v + "api." + t + "/1/statuses/user_timeline.";
            var s = v + "api." + t + "/1/favorites.";
            var q = v + "api." + t + "/1/";
            var w = 25000;
            var x = U ? "https://twitter-widgets.s3.amazonaws.com/j/1/default.gif" : "http://widgets.twimg.com/j/1/default.gif";
            return {
                init: function (z) {
                    var y = this;
                    this._widgetNumber = ++TWTR.Widget.WIDGET_NUMBER;
                    TWTR.Widget["receiveCallback_" + this._widgetNumber] = function (AA) {
                        y._prePlay.call(y, AA)
                    };
                    this._cb = "TWTR.Widget.receiveCallback_" + this._widgetNumber;
                    this.opts = z;
                    this._base = p;
                    this._isRunning = false;
                    this._hasOfficiallyStarted = false;
                    this._hasNewSearchResults = false;
                    this._rendered = false;
                    this._profileImage = false;
                    this._isCreator = !! z.creator;
                    this._setWidgetType(z.type);
                    this.timesRequested = 0;
                    this.runOnce = false;
                    this.newResults = false;
                    this.results = [];
                    this.jsonMaxRequestTimeOut = 19000;
                    this.showedResults = [];
                    this.sinceId = 1;
                    this.source = "TWITTERINC_WIDGET";
                    this.id = z.id || "twtr-widget-" + this._widgetNumber;
                    this.tweets = 0;
                    this.setDimensions(z.width, z.height);
                    this.interval = z.interval ? Math.max(z.interval, TWTR.Widget.REFRESH_MIN) : TWTR.Widget.REFRESH_MIN;
                    this.format = "json";
                    this.rpp = z.rpp || 50;
                    this.subject = z.subject || "";
                    this.title = z.title || "";
                    this.setFooterText(z.footer);
                    this.setSearch(z.search);
                    this._setUrl();
                    this.theme = z.theme ? z.theme : this._getDefaultTheme();
                    if (!z.id) {
                        document.write('<div class="twtr-widget" id="' + this.id + '"></div>')
                    }
                    this.widgetEl = N(this.id);
                    if (z.id) {
                        j.add(this.widgetEl, "twtr-widget")
                    }
                    if (z.version >= 2 && !TWTR.Widget.hasLoadedStyleSheet) {
                        if (U) {
                            u.loadStyleSheet("https://twitter-widgets.s3.amazonaws.com/j/2/widget.css", this.widgetEl)
                        } else {
                            if (z.creator) {
                                u.loadStyleSheet("/stylesheets/widgets/widget.css", this.widgetEl)
                            } else {
                                u.loadStyleSheet("http://widgets.twimg.com/j/2/widget.css", this.widgetEl)
                            }
                        }
                    }
                    this.occasionalJob = new V(function (AA) {
                        y.decay = AA;
                        y._getResults.call(y)
                    }, function () {
                        return y._decayDecider.call(y)
                    }, w);
                    this._ready = O.fn(z.ready) ? z.ready : function () {};
                    this._isRelativeTime = true;
                    this._tweetFilter = false;
                    this._avatars = true;
                    this._isFullScreen = false;
                    this._isLive = true;
                    this._isScroll = false;
                    this._loop = true;
                    this._behavior = "default";
                    this.setFeatures(this.opts.features);
                    this.intervalJob = new P(this.interval, this._loop, function (AA) {
                        y._normalizeTweet(AA)
                    });
                    return this
                },
                setDimensions: function (y, z) {
                    this.wh = (y && z) ? [y, z] : [250, 300];
                    if (y == "auto" || y == "100%") {
                        this.wh[0] = "100%"
                    } else {
                        this.wh[0] = ((this.wh[0] < 150) ? 150 : this.wh[0]) + "px"
                    }
                    this.wh[1] = ((this.wh[1] < 100) ? 100 : this.wh[1]) + "px";
                    return this
                },
                setRpp: function (y) {
                    var y = parseInt(y);
                    this.rpp = (O.number(y) && (y > 0 && y <= 100)) ? y : 30;
                    return this
                },
                _setWidgetType: function (y) {
                    this._isSearchWidget = false, this._isProfileWidget = false, this._isFavsWidget = false, this._isListWidget = false;
                    switch (y) {
                    case "profile":
                        this._isProfileWidget = true;
                        break;
                    case "search":
                        this._isSearchWidget = true, this.search = this.opts.search;
                        break;
                    case "faves":
                    case "favs":
                        this._isFavsWidget = true;
                        break;
                    case "list":
                    case "lists":
                        this._isListWidget = true;
                        break
                    }
                    return this
                },
                setFeatures: function (y) {
                    if (y) {
                        if (O.def(y.filters)) {
                            this._tweetFilter = y.filters
                        }
                        if (O.def(y.dateformat)) {
                            this._isRelativeTime = !! (y.dateformat !== "absolute")
                        }
                        if (O.def(y.fullscreen) && O.bool(y.fullscreen)) {
                            if (y.fullscreen) {
                                this._isFullScreen = true;
                                this.wh[0] = "100%";
                                this.wh[1] = (b() - 90) + "px";
                                var z = this;
                                L.add(window, "resize", function (AB) {
                                    z.wh[1] = b();
                                    z._fullScreenResize()
                                })
                            }
                        }
                        if (O.def(y.loop) && O.bool(y.loop)) {
                            this._loop = y.loop
                        }
                        if (O.def(y.behavior) && O.string(y.behavior)) {
                            switch (y.behavior) {
                            case "all":
                                this._behavior = "all";
                                break;
                            case "preloaded":
                                this._behavior = "preloaded";
                                break;
                            default:
                                this._behavior = "default";
                                break
                            }
                        }
                        if (O.def(y.avatars) && O.bool(y.avatars)) {
                            if (!y.avatars) {
                                u.css("#" + this.id + " .twtr-avatar { display: none; } #" + this.id + " .twtr-tweet-text { margin-left: 0; }");
                                this._avatars = false
                            } else {
                                var AA = (this._isFullScreen) ? "90px" : "40px";
                                u.css("#" + this.id + " .twtr-avatar { display: block; } #" + this.id + " .twtr-user { display: inline; } #" + this.id + " .twtr-tweet-text { margin-left: " + AA + "; }");
                                this._avatars = true
                            }
                        } else {
                            if (this._isProfileWidget) {
                                this.setFeatures({
                                    avatars: false
                                });
                                this._avatars = false
                            } else {
                                this.setFeatures({
                                    avatars: true
                                });
                                this._avatars = true
                            }
                        }
                        if (O.def(y.live) && O.bool(y.live)) {
                            this._isLive = y.live
                        }
                        if (O.def(y.scrollbar) && O.bool(y.scrollbar)) {
                            this._isScroll = y.scrollbar
                        }
                    } else {
                        if (this._isProfileWidget || this._isFavsWidget) {
                            this._behavior = "all"
                        }
                    }
                    return this
                },
                _fullScreenResize: function () {
                    var y = K("twtr-timeline", "div", document.body, function (z) {
                        z.style.height = (b() - 90) + "px"
                    })
                },
                setTweetInterval: function (y) {
                    this.interval = y;
                    return this
                },
                setBase: function (y) {
                    this._base = y;
                    return this
                },
                setUser: function (z, y) {
                    this.username = z;
                    this.realname = y || " ";
                    if (this._isFavsWidget) {
                        this.setBase(s + this.format + "?screen_name=" + z)
                    } else {
                        if (this._isProfileWidget) {
                            this.setBase(o + this.format + "?screen_name=" + z)
                        }
                    }
                    this.setSearch(" ");
                    return this
                },
                setList: function (z, y) {
                    this.listslug = y.replace(/ /g, "-").toLowerCase();
                    this.username = z;
                    this.setBase(q + z + "/lists/" + this.listslug + "/statuses.");
                    this.setSearch(" ");
                    return this
                },
                setProfileImage: function (y) {
                    this._profileImage = y;
                    this.byClass("twtr-profile-img", "img").src = d(y);
                    this.byClass("twtr-profile-img-anchor", "a").href = "http://twitter.com/intent/user?screen_name=" + this.username;
                    return this
                },
                setTitle: function (y) {
                    this.title = u.txt.htmlEscape(y);
                    this.widgetEl.getElementsByTagName("h3")[0].innerHTML = this.title;
                    return this
                },
                setCaption: function (y) {
                    this.subject = y;
                    this.widgetEl.getElementsByTagName("h4")[0].innerHTML = this.subject;
                    return this
                },
                setFooterText: function (y) {
                    this.footerText = (O.def(y) && O.string(y)) ? y : "Join the conversation";
                    if (this._rendered) {
                        this.byClass("twtr-join-conv", "a").innerHTML = this.footerText
                    }
                    return this
                },
                setSearch: function (z) {
                    this.searchString = z || "";
                    this.search = encodeURIComponent(this.searchString);
                    this._setUrl();
                    if (this._rendered) {
                        var y = this.byClass("twtr-join-conv", "a");
                        y.href = "http://twitter.com/" + this._getWidgetPath()
                    }
                    return this
                },
                _getWidgetPath: function () {
                    if (this._isProfileWidget) {
                        return this.username
                    } else {
                        if (this._isFavsWidget) {
                            return this.username + "/favorites"
                        } else {
                            if (this._isListWidget) {
                                return this.username + "/" + this.listslug
                            } else {
                                return "#search?q=" + this.search
                            }
                        }
                    }
                },
                _setUrl: function () {
                    var z = this;

                    function y() {
                        return "&" + (+new Date) + "=cachebust"
                    }
                    function AA() {
                        return (z.sinceId == 1) ? "" : "&since_id=" + z.sinceId + "&refresh=true"
                    }
                    if (this._isProfileWidget) {
                        this.url = this._includeEntities(this._base + "&callback=" + this._cb + "&include_rts=true&count=" + this.rpp + AA() + "&clientsource=" + this.source)
                    } else {
                        if (this._isFavsWidget) {
                            this.url = this._includeEntities(this._base + "&callback=" + this._cb + AA() + "&clientsource=" + this.source)
                        } else {
                            if (this._isListWidget) {
                                this.url = this._includeEntities(this._base + this.format + "?callback=" + this._cb + AA() + "&clientsource=" + this.source)
                            } else {
                                this.url = this._includeEntities(this._base + this.format + "?q=" + this.search + "&callback=" + this._cb + "&rpp=" + this.rpp + AA() + "&clientsource=" + this.source);
                                if (!this.runOnce) {
                                    this.url += "&result_type=recent"
                                }
                            }
                        }
                    }
                    this.url += y();
                    return this
                },
                _includeEntities: function (y) {
                    if (TWTR.Widget.SHOW_ENTITIES) {
                        return y + "&include_entities=true"
                    }
                    return y
                },
                _getRGB: function (y) {
                    return T(y.substring(1, 7))
                },
                setTheme: function (AD, y) {
                    var AB = this;
                    var z = " !important";
                    var AC = ((window.location.hostname.match(/twitter\.com/)) && (window.location.pathname.match(/goodies/)));
                    if (y || AC) {
                        z = ""
                    }
                    this.theme = {
                        shell: {
                            background: function () {
                                return AD.shell.background || AB._getDefaultTheme().shell.background
                            }(),
                            color: function () {
                                return AD.shell.color || AB._getDefaultTheme().shell.color
                            }()
                        },
                        tweets: {
                            background: function () {
                                return AD.tweets.background || AB._getDefaultTheme().tweets.background
                            }(),
                            color: function () {
                                return AD.tweets.color || AB._getDefaultTheme().tweets.color
                            }(),
                            links: function () {
                                return AD.tweets.links || AB._getDefaultTheme().tweets.links
                            }()
                        }
                    };
                    var AA = "#" + this.id + " .twtr-doc,                      #" + this.id + " .twtr-hd a,                      #" + this.id + " h3,                      #" + this.id + " h4 {            background-color: " + this.theme.shell.background + z + ";            color: " + this.theme.shell.color + z + ";          }          #" + this.id + " .twtr-tweet a {            color: " + this.theme.tweets.links + z + ";          }          #" + this.id + " .twtr-bd, #" + this.id + " .twtr-timeline i a,           #" + this.id + " .twtr-bd p {            color: " + this.theme.tweets.color + z + ";          }          #" + this.id + " .twtr-new-results,           #" + this.id + " .twtr-results-inner,           #" + this.id + " .twtr-timeline {            background: " + this.theme.tweets.background + z + ";          }";
                    if (m.ie) {
                        AA += "#" + this.id + " .twtr-tweet { background: " + this.theme.tweets.background + z + "; }"
                    }
                    u.css(AA);
                    return this
                },
                byClass: function (AB, y, z) {
                    var AA = K(AB, y, N(this.id));
                    return (z) ? AA : AA[0]
                },
                render: function () {
                    var AA = this;
                    if (!TWTR.Widget.hasLoadedStyleSheet) {
                        window.setTimeout(function () {
                            AA.render.call(AA)
                        }, 50);
                        return this
                    }
                    this.setTheme(this.theme, this._isCreator);
                    if (this._isProfileWidget) {
                        j.add(this.widgetEl, "twtr-widget-profile")
                    }
                    if (this._isScroll) {
                        j.add(this.widgetEl, "twtr-scroll")
                    }
                    if (!this._isLive && !this._isScroll) {
                        this.wh[1] = "auto"
                    }
                    if (this._isSearchWidget && this._isFullScreen) {
                        document.title = "Twitter search: " + escape(this.searchString)
                    }
                    this.widgetEl.innerHTML = this._getWidgetHtml();
                    var z = this.byClass("twtr-timeline", "div");
                    if (this._isLive && !this._isFullScreen) {
                        var AB = function (AC) {
                                if (AA._behavior === "all") {
                                    return
                                }
                                if (J.call(this, AC)) {
                                    AA.pause.call(AA)
                                }
                            };
                        var y = function (AC) {
                                if (AA._behavior === "all") {
                                    return
                                }
                                if (J.call(this, AC)) {
                                    AA.resume.call(AA)
                                }
                            };
                        this.removeEvents = function () {
                            L.remove(z, "mouseover", AB);
                            L.remove(z, "mouseout", y)
                        };
                        L.add(z, "mouseover", AB);
                        L.add(z, "mouseout", y)
                    }
                    this._rendered = true;
                    this._ready();
                    return this
                },
                removeEvents: function () {},
                _getDefaultTheme: function () {
                    return {
                        shell: {
                            background: "#8ec1da",
                            color: "#ffffff"
                        },
                        tweets: {
                            background: "#ffffff",
                            color: "#444444",
                            links: "#1985b5"
                        }
                    }
                },
                _getWidgetHtml: function () {
                    var AA = this;

                    function AC() {
                        if (AA._isProfileWidget) {
                            return '<a target="_blank" href="http://twitter.com/" class="twtr-profile-img-anchor"><img alt="profile" class="twtr-profile-img" src="' + x + '"></a>                      <h3></h3>                      <h4></h4>'
                        } else {
                            return "<h3>" + AA.title + "</h3><h4>" + AA.subject + "</h4>"
                        }
                    }
                    function z() {
                        return AA._isFullScreen ? " twtr-fullscreen" : ""
                    }
                    var AB = U ? "https://twitter-widgets.s3.amazonaws.com/i/widget-logo.png" : "http://widgets.twimg.com/i/widget-logo.png";
                    if (this._isFullScreen) {
                        AB = "https://twitter-widgets.s3.amazonaws.com/i/widget-logo-fullscreen.png"
                    }
                    var y = '<div class="twtr-doc' + z() + '" style="width: ' + this.wh[0] + ';">            <div class="twtr-hd">' + AC() + '             </div>            <div class="twtr-bd">              <div class="twtr-timeline" style="height: ' + this.wh[1] + ';">                <div class="twtr-tweets">                  <div class="twtr-reference-tweet"></div>                  <!-- tweets show here -->                </div>              </div>            </div>            <div class="twtr-ft">              <div><a target="_blank" href="http://twitter.com"><img alt="" src="' + AB + '"></a>                <span><a target="_blank" class="twtr-join-conv" style="color:' + this.theme.shell.color + '" href="http://twitter.com/' + this._getWidgetPath() + '">' + this.footerText + "</a></span>              </div>            </div>          </div>";
                    return y
                },
                _appendTweet: function (y) {
                    this._insertNewResultsNumber();
                    g(y, this.byClass("twtr-reference-tweet", "div"));
                    return this
                },
                _slide: function (z) {
                    var AA = this;
                    var y = e(z).offsetHeight;
                    if (this.runOnce) {
                        new I(z, "height", {
                            from: 0,
                            to: y,
                            time: 500,
                            callback: function () {
                                AA._fade.call(AA, z)
                            }
                        }).start()
                    }
                    return this
                },
                _fade: function (y) {
                    var z = this;
                    if (I.canTransition) {
                        y.style.webkitTransition = "opacity 0.5s ease-out";
                        y.style.opacity = 1;
                        return this
                    }
                    new I(y, "opacity", {
                        from: 0,
                        to: 1,
                        time: 500
                    }).start();
                    return this
                },
                _chop: function () {
                    if (this._isScroll) {
                        return this
                    }
                    var AD = this.byClass("twtr-tweet", "div", true);
                    var AE = this.byClass("twtr-new-results", "div", true);
                    if (AD.length) {
                        for (var AA = AD.length - 1; AA >= 0; AA--) {
                            var AC = AD[AA];
                            var AB = parseInt(AC.offsetTop);
                            if (AB > parseInt(this.wh[1])) {
                                h(AC)
                            } else {
                                break
                            }
                        }
                        if (AE.length > 0) {
                            var y = AE[AE.length - 1];
                            var z = parseInt(y.offsetTop);
                            if (z > parseInt(this.wh[1])) {
                                h(y)
                            }
                        }
                    }
                    return this
                },
                _appendSlideFade: function (z) {
                    var y = z || this.tweet.element;
                    this._chop()._appendTweet(y)._slide(y);
                    return this
                },
                _createTweet: function (y) {
                    y.tweet = TWTR.Widget.ify.autoLink(y);
                    y.timestamp = y.created_at;
                    y.created_at = this._isRelativeTime ? Q(y.created_at) : Y(y.created_at);
                    this.tweet = new R(y);
                    if (this._isLive && this.runOnce) {
                        this.tweet.element.style.opacity = 0;
                        this.tweet.element.style.filter = "alpha(opacity:0)";
                        this.tweet.element.style.height = "0"
                    }
                    return this
                },
                _getResults: function () {
                    var y = this;
                    this.timesRequested++;
                    this.jsonRequestRunning = true;
                    this.jsonRequestTimer = window.setTimeout(function () {
                        if (y.jsonRequestRunning) {
                            clearTimeout(y.jsonRequestTimer);
                            y.jsonRequestTimer = null
                        }
                        y.jsonRequestRunning = false;
                        h(y.scriptElement);
                        y.newResults = false;
                        y.decay();
                    }, this.jsonMaxRequestTimeOut);
                    TWTR.Widget.jsonP(y.url, function (z) {
                        y.scriptElement = z
                    })
                },
                clear: function () {
                    var z = this.byClass("twtr-tweet", "div", true);
                    var y = this.byClass("twtr-new-results", "div", true);
                    z = z.concat(y);
                    H(z, function (AA) {
                        h(AA)
                    });
                    return this
                },
                _sortByMagic: function (y) {
                    var z = this;
                    if (this._tweetFilter) {
                        if (this._tweetFilter.negatives) {
                            y = B(y, function (AA) {
                                if (!z._tweetFilter.negatives.test(AA.text)) {
                                    return AA
                                }
                            })
                        }
                        if (this._tweetFilter.positives) {
                            y = B(y, function (AA) {
                                if (z._tweetFilter.positives.test(AA.text)) {
                                    return AA
                                }
                            })
                        }
                    }
                    switch (this._behavior) {
                    case "all":
                        this._sortByLatest(y);
                        break;
                    case "preloaded":
                    default:
                        this._sortByDefault(y);
                        break
                    }
                    if (this._isLive && this._behavior !== "all") {
                        this.intervalJob.set(this.results);
                        this.intervalJob.start()
                    }
                    return this
                },
                _sortByLatest: function (y) {
                    this.results = y;
                    this.results = this.results.slice(0, this.rpp);
                    this.results.reverse();
                    return this
                },
                _sortByDefault: function (z) {
                    var AA = this;
                    var y = function (AB) {
                            return new Date(AB).getTime()
                        };
                    this.results.unshift.apply(this.results, z);
                    H(this.results, function (AB) {
                        if (!AB.views) {
                            AB.views = 0
                        }
                    });
                    this.results.sort(function (AC, AB) {
                        if (y(AC.created_at) > y(AB.created_at)) {
                            return -1
                        } else {
                            if (y(AC.created_at) < y(AB.created_at)) {
                                return 1
                            } else {
                                return 0
                            }
                        }
                    });
                    this.results = this.results.slice(0, this.rpp);
                    this.results = this.results.sort(function (AC, AB) {
                        if (AC.views < AB.views) {
                            return -1
                        } else {
                            if (AC.views > AB.views) {
                                return 1
                            }
                        }
                        return 0
                    });
                    if (!this._isLive) {
                        this.results.reverse()
                    }
                },
                _prePlay: function (z) {
                    if (this.jsonRequestTimer) {
                        clearTimeout(this.jsonRequestTimer);
                        this.jsonRequestTimer = null
                    }
                    if (!m.ie) {
                        h(this.scriptElement)
                    }
                    if (z.error) {
                        this.newResults = false
                    } else {
                        if (z.results && z.results.length > 0) {
                            this.response = z;
                            this.newResults = true;
                            this.sinceId = z.max_id_str;
                            this._sortByMagic(z.results);
                            if (this.isRunning()) {
                                this._play()
                            }
                        } else {
                            if ((this._isProfileWidget || this._isFavsWidget || this._isListWidget) && O.array(z) && z.length) {
                                this.newResults = true;
                                if (!this._profileImage && this._isProfileWidget) {
                                    var y = z[0].user.screen_name;
                                    this.setProfileImage(z[0].user.profile_image_url);
                                    this.setTitle(z[0].user.name);
                                    this.setCaption('<a target="_blank" href="http://twitter.com/intent/user?screen_name=' + y + '">' + y + "</a>")
                                }
                                this.sinceId = z[0].id_str;
                                this._sortByMagic(z);
                                if (this.isRunning()) {
                                    this._play()
                                }
                            } else {
                                this.newResults = false
                            }
                        }
                    }
                    this._setUrl();
                    if (this._isLive) {
                        this.decay()
                    }
                },
                _play: function () {
                    var y = this;
                    if (this.runOnce) {
                        this._hasNewSearchResults = true
                    }
                    if (this._avatars) {
                        this._preloadImages(this.results)
                    }
                    if (this._isRelativeTime && (this._behavior == "all" || this._behavior == "preloaded")) {
                        H(this.byClass("twtr-timestamp", "a", true), function (z) {
                            z.innerHTML = Q(z.getAttribute("time"))
                        })
                    }
                    if (!this._isLive || this._behavior == "all" || this._behavior == "preloaded") {
                        H(this.results, function (AA) {
                            if (AA.retweeted_status) {
                                AA = AA.retweeted_status
                            }
                            if (y._isProfileWidget) {
                                AA.from_user = AA.user.screen_name;
                                AA.profile_image_url = AA.user.profile_image_url
                            }
                            if (y._isFavsWidget || y._isListWidget) {
                                AA.from_user = AA.user.screen_name;
                                AA.profile_image_url = AA.user.profile_image_url
                            }
                            AA.id = AA.id_str;
                            y._createTweet({
                                id: AA.id,
                                user: AA.from_user,
                                tweet: AA.text,
                                avatar: AA.profile_image_url,
                                created_at: AA.created_at,
                                needle: AA
                            });
                            var z = y.tweet.element;
                            (y._behavior == "all") ? y._appendSlideFade(z) : y._appendTweet(z)
                        });
                        if (this._behavior != "preloaded") {
                            return this
                        }
                    }
                    return this
                },
                _normalizeTweet: function (z) {
                    var y = this;
                    z.views++;
                    if (this._isProfileWidget) {
                        z.from_user = y.username;
                        z.profile_image_url = z.user.profile_image_url
                    }
                    if (this._isFavsWidget || this._isListWidget) {
                        z.from_user = z.user.screen_name;
                        z.profile_image_url = z.user.profile_image_url
                    }
                    if (this._isFullScreen) {
                        z.profile_image_url = z.profile_image_url.replace(/_normal\./, "_bigger.")
                    }
                    z.id = z.id_str;
                    this._createTweet({
                        id: z.id,
                        user: z.from_user,
                        tweet: z.text,
                        avatar: z.profile_image_url,
                        created_at: z.created_at,
                        needle: z
                    })._appendSlideFade()
                },
                _insertNewResultsNumber: function () {
                    if (!this._hasNewSearchResults) {
                        this._hasNewSearchResults = false;
                        return
                    }
                    if (this.runOnce && this._isSearchWidget) {
                        var AB = this.response.total > this.rpp ? this.response.total : this.response.results.length;
                        var y = AB > 1 ? "s" : "";
                        var AA = (this.response.warning && this.response.warning.match(/adjusted since_id/)) ? "more than" : "";
                        var z = document.createElement("div");
                        j.add(z, "twtr-new-results");
                        z.innerHTML = '<div class="twtr-results-inner"> &nbsp; </div><div class="twtr-results-hr"> &nbsp; </div><span>' + AA + " <strong>" + AB + "</strong> new tweet" + y + "</span>";
                        g(z, this.byClass("twtr-reference-tweet", "div"));
                        this._hasNewSearchResults = false
                    }
                },
                _preloadImages: function (y) {
                    if (this._isProfileWidget || this._isFavsWidget || this._isListWidget) {
                        H(y, function (AA) {
                            var z = new Image();
                            z.src = d(AA.user.profile_image_url)
                        })
                    } else {
                        H(y, function (z) {
                            (new Image()).src = d(z.profile_image_url)
                        })
                    }
                },
                _decayDecider: function () {
                    var y = false;
                    if (!this.runOnce) {
                        this.runOnce = true;
                        y = true
                    } else {
                        if (this.newResults) {
                            y = true
                        }
                    }
                    return y
                },
                start: function () {
                    var y = this;
                    if (!this._rendered) {
                        setTimeout(function () {
                            y.start.call(y)
                        }, 50);
                        return this
                    }
                    if (!this._isLive) {
                        this._getResults()
                    } else {
                        this.occasionalJob.start()
                    }
                    this._isRunning = true;
                    this._hasOfficiallyStarted = true;
                    return this
                },
                stop: function () {
                    this.occasionalJob.stop();
                    if (this.intervalJob) {
                        this.intervalJob.stop()
                    }
                    this._isRunning = false;
                    return this
                },
                pause: function () {
                    if (this.isRunning() && this.intervalJob) {
                        this.intervalJob.stop();
                        j.add(this.widgetEl, "twtr-paused");
                        this._isRunning = false
                    }
                    if (this._resumeTimer) {
                        clearTimeout(this._resumeTimer);
                        this._resumeTimer = null
                    }
                    return this
                },
                resume: function () {
                    var y = this;
                    if (!this.isRunning() && this._hasOfficiallyStarted && this.intervalJob) {
                        this._resumeTimer = window.setTimeout(function () {
                            y.intervalJob.start();
                            y._isRunning = true;
                            j.remove(y.widgetEl, "twtr-paused")
                        }, 2000)
                    }
                    return this
                },
                isRunning: function () {
                    return this._isRunning
                },
                destroy: function () {
                    this.stop();
                    this.clear();
                    this.runOnce = false;
                    this._hasOfficiallyStarted = false;
                    this._profileImage = false;
                    this._isLive = true;
                    this._tweetFilter = false;
                    this._isScroll = false;
                    this.newResults = false;
                    this._isRunning = false;
                    this.sinceId = 1;
                    this.results = [];
                    this.showedResults = [];
                    this.occasionalJob.destroy();
                    if (this.jsonRequestRunning) {
                        clearTimeout(this.jsonRequestTimer)
                    }
                    j.remove(this.widgetEl, "twtr-scroll");
                    this.removeEvents();
                    return this
                }
            }
        }()
    })();
    var F = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
        A = {
            tweet: true,
            retweet: true,
            favorite: true
        },
        C = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
        E = screen.height,
        D = screen.width;

    function G(P) {
        if (twttr.widgets) {
            return
        }
        P = P || window.event;
        var O = P.target || P.srcElement,
            K, L, J, N, M;
        while (O && O.nodeName.toLowerCase() !== "a") {
            O = O.parentNode
        }
        if (O && O.nodeName.toLowerCase() === "a" && O.href) {
            K = O.href.match(F);
            if (K) {
                L = 550;
                J = (K[2] in A) ? 420 : 560;
                N = Math.round((D / 2) - (L / 2));
                M = 0;
                if (E > J) {
                    M = Math.round((E / 2) - (J / 2))
                }
                window.open(O.href, "intent", C + ",width=" + L + ",height=" + J + ",left=" + N + ",top=" + M);
                P.returnValue = false;
                P.preventDefault && P.preventDefault()
            }
        }
    }
    if (document.addEventListener) {
        document.addEventListener("click", G, false)
    } else {
        if (document.attachEvent) {
            document.attachEvent("onclick", G)
        }
    }
})();
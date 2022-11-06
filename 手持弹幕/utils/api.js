var t = require("./base");

t.getSiteInfo = function(e) {
    return t.get("/wp-json/mp/v1/setting", e);
}, t.getStickyPosts = function(e) {
    return t.get("/wp-json/mp/v1/posts/sticky", e);
}, t.getPostsList = function(e) {
    return t.get("/wp-json/wp/v2/posts", e, {
        token: !0
    });
}, t.getPostsbyID = function(e) {
    return t.get("/wp-json/wp/v2/posts/" + e, {}, {
        token: !0
    });
}, t.getPagesList = function(e) {
    return t.get("/wp-json/wp/v2/pages", e);
}, t.getPageByID = function(e) {
    return t.get("/wp-json/wp/v2/pages/" + e);
}, t.getCategories = function(e) {
    return t.get("/wp-json/wp/v2/categories?orderby=id&order=asc", e);
}, t.getCategoryByID = function(e) {
    return t.get("/wp-json/wp/v2/categories/" + e);
}, t.getTags = function(e) {
    return t.get("/wp-json/wp/v2/tags?orderby=id&order=asc", e);
}, t.getTagByID = function(e) {
    return t.get("/wp-json/wp/v2/tags/" + e);
}, t.getRandPosts = function(e) {
    return t.get("/wp-json/mp/v1/posts/rand", e);
}, t.getRelatePosts = function(e) {
    return t.get("/wp-json/mp/v1/posts/relate", e);
}, t.getMostViewsPosts = function(e) {
    return t.get("/wp-json/mp/v1/posts/most?meta=views", e);
}, t.getMostFavPosts = function(e) {
    return t.get("/wp-json/mp/v2/posts/most?meta=favs", e);
}, t.getMostLikePosts = function(e) {
    return t.get("/wp-json/mp/v2/posts/most?meta=likes", e);
}, t.getMostCommentPosts = function(e) {
    return t.get("/wp-json/mp/v2/posts/most?meta=comments", e);
}, t.getRecentCommentPosts = function(e) {
    return t.get("/wp-json/mp/v1/posts/comment", e);
}, t.getComments = function(e) {
    return t.get("/wp-json/mp/v1/comments", e);
}, t.getProfile = t.guard(function() {
    return t.getUserInfo();
}), t.fav = t.guard(function(e) {
    return t.post("/wp-json/mp/v1/comments?type=fav", e, {
        token: !0
    });
}), t.getFavPosts = t.guard(function(e) {
    return t.get("/wp-json/mp/v1/posts/comment?type=fav", e, {
        token: !0
    });
}), t.like = t.guard(function(e) {
    return t.post("/wp-json/mp/v1/comments?type=like", e, {
        token: !0
    });
}), t.getLikePosts = t.guard(function(e) {
    return t.get("/wp-json/mp/v1/posts/comment?type=like", e, {
        token: !0
    });
}), t.getCommentsPosts = t.guard(function(e) {
    return t.get("/wp-json/mp/v1/posts/comment?type=comment", e, {
        token: !0
    });
}), t.addComment = t.guard(function(e) {
    return t.post("/wp-json/mp/v1/comments?type=comment", e, {
        token: !0
    });
}), t.subscribeMessage = t.guard(function(e) {
    return t.post("/wp-json/mp/v1/subscribe", e, {
        token: !0
    });
}), t.getCodeImg = function(e) {
    return t.post("/wp-json/mp/v1/qrcode", e, {
        token: !1
    });
}, t.Loginout = function() {
    return t.logout();
}, t.getMenuSetting = function(e) {
    return t.get("/wp-json/mp/v1/menu", e);
}, t.indexAdsense = function(e) {
    return t.get("/wp-json/mp/v1/advert/wechat?type=index", e);
}, t.listAdsense = function(e) {
    return t.get("/wp-json/mp/v1/advert/wechat?type=list", e);
}, t.detailAdsense = function(e) {
    return t.get("/wp-json/mp/v1/advert/wechat?type=detail", e);
}, t.pageAdsense = function(e) {
    return t.get("/wp-json/mp/v1/advert/wechat?type=page", e);
}, t.getTwitterPosts = function(e) {
    return t.get("/wp-json/wp/v2/tweets", e);
}, t.getTwitterDetail = function(e) {
    return t.get("/wp-json/wp/v2/tweets/" + e, {}, {
        token: !0
    });
}, t.markComment = t.guard(function(e) {
    return t.post("/wp-json/mp/v1/comments/mark", e, {
        token: !0
    });
}), module.exports = t;
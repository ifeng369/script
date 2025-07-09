// ==UserScript==
// @name         湘潭技师学院继续教育
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://xiangtan.zgzjzj.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant unsafeWindow
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js
// ==/UserScript==

(function () {
    "use strict";
    let isLogining = false
    setInterval(() => {
        if (location.href == "https://xiangtan.zgzjzj.net/learncenter/buycourse") {
            if($(".buyCourse_classStudy").length>0)
            {
                $(".buyCourse_classStudy").first().click()
            }
        }
        else {
            if ($(".feedBackBox img").length > 0)
                $(".feedBackBox img").click()
            if ($("[role=progressbar]").attr("aria-valuenow") == "100" && isLogining==false) {
                console.log("本课程完成")
                isLogining=true
                //$(".feedBackBox img").click()
                //$("li:contains(下一节)").click()
                location.href = "https://xiangtan.zgzjzj.net/learncenter/buycourse"
            }
            else if ($("video")[0] && $("video")[0].paused) {
                $("video")[0].muted = "muted";
                $("video")[0].play();
            }
        }

    }, 100);
})();

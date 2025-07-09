// ==UserScript==
// @name         湖南师大继续教育
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ejxjy.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant unsafeWindow
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js
// ==/UserScript==

(function () {
    "use strict";
    let isLogining = false
    setInterval(() => {

        if (location.href == "https://www.ejxjy.com/a/sys/portal/person") {
            isLogining=false;
            if ($("#jbox-states:contains(课程观看窗口已经打开)").length > 0) {
                close();
            }
            if ($('#loaded').is(':visible')) {
                $("[value='确定']").click()
            }
            if($("li.hover:contains(公需科目)").length>0)
            {
                setTab('one',2,3);choocetab('2');
                setTab('a', 2, 3);
            }
            
            var alist = $("a:contains(继续学习),a:contains(开始学习)");
            if (alist.length > 0) {
                alist[0].click();
            }
        }
        else {
            var startTime = localStorage[document.title+" 开始时间"]
            if(!startTime)
                {
                     localStorage[document.title+" 开始时间"] = new Date().getTime();
                }
            if($("#loginForm").length>0 && isLogining==false)
            {
                $("[name=username]").val("18890256080")
                $("[name=password]").val("Ly111111")
                $("#loginForm").submit()
                isLogining = true;
            }
            if ($("#jbox-states:contains(学习完)").length > 0) {
                localStorage[document.title+" 完成时间"] = new Date().getTime();
                localStorage[document.title+" 耗时"] = ((localStorage[document.title+" 完成时间"] - localStorage[document.title+" 开始时间"])/1000/60).toFixed(1)+"分钟";

                $(".jbox-button").click();
                if ($(".catalog .hover").parent().next().find("a").length > 0) {
                    console.log("下一课");
                    $(".catalog .hover").parent().next().find("a")[0].click();
                } else {
                    console.log("全部学完");
                    location.href = "https://www.ejxjy.com/a/sys/portal/person"
                }
            }
            if ($("#jbox-states:contains(下一节)").length > 0) {
                $(".jbox-button").click();
            }

   
            if ($("#jbox-states:contains(刷新)").length > 0 || $("#jbox-states:contains(重新登录)").length > 0) {
                $(".jbox-button").click();
                if($(".menu_list .active").length == $(".menu_list dd").length)
                {
                    location.href = "https://www.ejxjy.com/a/sys/portal/person"
                }
                else
                    location.reload();
            }      
            if ($("video")[0] && $("video")[0].paused) {
                $("video")[0].muted = "muted";
                $("video")[0].play();
            }
        }
    }, 100);
})();

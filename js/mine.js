// vue
var mainsec = new Vue({
    el: "#main",
    data: {
        title: "", // The title of one page
        html: "", // HTML text of one page
        texts: [], // Pure texts of one page
        imgs: [], // Image url of a page's images

        startPage: 1, // First page of the website
        endPage: 3, // The last page of the website

        defaults: 1, // Show welcome message
        Contacts: 1, // Detect if to show contacts
        info: 0, // If to show designed pages
        deg: 0, // Main section rotate deg

        backButton: false,

        /*          Change things below this line               */
        //Contact info
        /**
         * 有关下方icon的优化
         * 因下方icon可以挂上用户自己的站点，所以做了如下修改
         * jump为true，会直接跳转链接，链接为用户自定义的content字段
         * jump为false，则是与原来一样。
         */
        contacts: [
            {
                name: "Email",
                icon: "icon fa-envelope",
                desc: "邮件",
                content: "mailto:wangchuanli_@hotmail.com",
                show: false,
                jump: true,
            },
            {
                name: "Wechat",
                icon: "icon brands fa-weixin",
                desc: "微信",
                content: "<img src='images/QR-weixin.jpg' class='qr' />",
                show: false,
                jump: false,
            },
            {
                name: "QQ",
                icon: "icon brands fa-qq",
                desc: "QQ",
                content:"<img src='images/QR-qq.png' class='qr' />",
                show: false,
                jump: false,
            },
            {
                name: "Github",
                icon: "icon brands fa-github",
                desc: "Github",
                content: "https://github.com/iwangchuanli",
                show: false,
                jump: true,
            },
            {
                name: "Blog",
                icon: "icon brands fa-wordpress",
                desc: "博客",
                content: "https://iwangchuanli.github.io/",
                show: false,
                jump: true,
            }
        ],

        //Pages content
        page: [
            {
                title: "About Me",
                texts: [
                    "95后😄，全栈开发工程师🧑🏻‍💻～19年毕业于黄山学院，🖥计算机科学与技术专业。，爱好广泛：旅游、摄影、篮球、设计等等～🏃"
                ],
                html: "",
                imgs: ["images/mine.jpg"],
            },
            {
                title: "Mine Work",
                texts: ["目前定居老家安徽阜阳🇨🇳，从事全栈软件开发🧑🏻‍💻，技术栈：Java、Python、VUE等～，喜欢研究和学习🏗，热爱开源。目前软考中级软件设计师，高级软件架构师努力💪中～"],
                html: "<a >☞简历&项目</a>",
                imgs: ["images/code.gif"],
            },
            {
                title: "Mine Life",
                texts: ["enjoy life ～"],
                imgs: ["images/bg.jpg"],
                html: "",
            },
            {
                title: "Eastern egg page!",
                texts: ["Can only access with ?page=#"],
                html: "<a href='https://github.com/iwangchuanli' target='_blank'>Origin project</a>",
            },
        ],
        /*            Change ends here                 */

        nowPage: 0, // Pointer to current page
        onTransition: 0, //If the transition animation is on
    },
    methods: {
        showContact: function (name) {
            let num = 0;
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].name == name) {
                    num = i;
                    break;
                }
            }
            if (this.contacts[num].jump == true) {
                window.open(this.contacts[num].content);
                return;
            }
            this.hideContact(false);
            this.defaults = 0;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.contacts[num].show = true;
                this.backButton = true;
            }, 500);
        },
        hideContact: function (neededDefault = true) {
            for (i = 0; i < this.contacts.length; i++) {
                this.contacts[i].show = false;
            }
            clearTimeout(this.timer);
            if (neededDefault == true) {
                this.backButton = false;
                this.timer = setTimeout(() => {
                    this.defaults = 1;
                }, 500);
            }
        },
        showAbout: function () {
            this.rotateCard(-360, 1, "Y");

            var that = this;
            setTimeout(function () {
                that.info = 1;
                that.Contacts = 0;
            }, 400);
        },
        returnToContact: function () {
            this.rotateCard(360, 1, "Y");
            var that = this;
            setTimeout(function () {
                that.info = 0;
                that.Contacts = 1;
            }, 400);
        },
        rotateCard: function (deg, time, axis) {
            this.onTransition = 1;
            this.deg += deg;
            var ele = document.getElementById("main");
            ele.style.transition = "transform " + time + "s 0s";
            ele.style.transform = "rotate" + axis + "(" + this.deg + "deg)";
            var that = this;
            setTimeout(function () {
                that.onTransition = 0;
            }, time * 1000);
        },
        loadPage: function () {
            this.title = this.page[this.nowPage].title;
            this.texts = this.page[this.nowPage].texts;
            this.html = this.page[this.nowPage].html;
            this.imgs = this.page[this.nowPage].imgs;
        },
        navigate: function (m) {
            if (m == 1) {
                this.nowPage++;
                this.rotateCard(-360, 1, "Y");
                setTimeout("mainsec.loadPage()", 400);
            }
            if (m == -1) {
                this.nowPage--;
                this.rotateCard(+360, 1, "Y");
                setTimeout("mainsec.loadPage()", 400);
            }
        }
    },
    mounted: function () {
        this.loadPage();
        this.startPage = 1;
        this.endPage = this.page.length;
    },
});

// 页面加载动画
if ("addEventListener" in window) {
    window.addEventListener("load", function () {
        setTimeout(function () {
            document.body.className = document.body.className.replace(
                /\bis-preload\b/,
                ""
            );
        }, 2000);
    });
    document.body.className += navigator.userAgent.match(/(MSIE|rv:11\.0)/)
        ? " is-ie"
        : "";
}

//页面切换
let FirstTriggered = true;

function loaded() {
    timeout = FirstTriggered ? 1200 : 0;
    var page = getQueryVariable("page");
    if (page >= mainsec.startPage && page <= mainsec.endPage && page) {
        var m = mainsec;
        mainsec.nowPage = page - 1;
        setTimeout(function () {
            m.rotateCard(-360, 1, "Y");
            setTimeout(function () {
                m.loadPage();
                m.info = 1;
                m.Contacts = 0;
            }, 400);
        }, timeout);
    }
    if (FirstTriggered) {
        $("body").on("dblclick", "img", function () {
            window.open(this.src);
        });
    }
    if (
        getQueryVariable("showContacts") ||
        getQueryVariable("showcontacts")
    ) {
        var url;
        var browser = navigator.userAgent.toLowerCase();
        if (mainsec.info == 1) {
            mainsec.returnToContact();
        }
    }

    FirstTriggered = false;
}

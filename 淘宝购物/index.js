function Taobao(options) {
    options = options || {}
    this.box = options.box || document.querySelector(".box")
    this.left = options.left || this.box.querySelector(".left")
    this.girlImg = options.girlImg || this.left.querySelector(".girlImg")
    this.centerImg = this.girlImg.querySelector("img")
    this.span = options.span || this.girlImg.querySelector("span")
    this.bigBox = options.bigBox || this.box.querySelector(".bigBox")
    this.bigImg = options.bigImg || this.bigBox.querySelector(".bigImg")
    this.ol = this.left.querySelector("ol")
    this.olis = this.ol.querySelectorAll("li")

    this.right = options.right || this.box.querySelector(".right")
    this.ul = this.right.querySelector("ul")
    this.ulis = this.ul.querySelectorAll("li")
    this.price = this.right.querySelector(".price")
    this.ems = this.price.querySelectorAll("em")
    this.count = 1
    this.inputText = this.right.querySelector("input[type=text]")
    this.addBtn = this.right.querySelector('.addBtn')
    this.subBtn = this.right.querySelector('.subBtn')
    this.okBtn = this.right.querySelector(".okBtn")
    this.num = 0

    this.init()
}
//初始化
Taobao.prototype.init = function () {
    this.inputText.value = this.count
    this.enterOut()
    this.move()
    this.change()
    this.addSub()
    this.entry()
    this.toCar()

}
//鼠标划入划出
Taobao.prototype.enterOut = function () {
    on(this.girlImg, "onmouseenter", () => {
        css(this.span, "opacity", "1")
        css(this.bigBox, "opacity", "1")
        css(this.bigBox, "zIndex", "1")
    })
    on(this.girlImg, "onmouseleave", () => {
        css(this.span, "opacity", "0")
        css(this.bigBox, "opacity", "0")
        css(this.bigBox, "zIndex", "-1")

    })
}

//鼠标移动
Taobao.prototype.move = function () {
    on(this.girlImg, 'onmousemove', (e) => {
        e = e || window.event
        let _left = e.pageX - this.box.offsetLeft - 21 - this.span.offsetWidth / 2
        let _top = e.pageY - this.box.offsetTop - 21 - this.span.offsetHeight / 2

        if (_left <= 0) {
            _left = 0
        } else if (_left >= this.girlImg.clientWidth - this.span.clientWidth) {
            _left = this.girlImg.clientWidth - this.span.clientWidth
        }

        if (_top <= 0) {
            _top = 0
        } else if (_top >= this.girlImg.clientHeight - this.span.clientHeight) {
            _top = this.girlImg.clientHeight - this.span.clientHeight
        }
        css(this.span, "left", _left + "px")
        css(this.span, "top", _top + "px")
        css(this.bigImg, "left", -_left * 2 + "px")
        css(this.bigImg, "top", -_top * 2 + "px")
    })
}

//点击列表
Taobao.prototype.change = function () {
    on(this.ol, "onclick", (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        fn.call(this, e, "IMG", this.olis, target)
        this.okBtn.disabled = false
    })
    on(this.ul, "onclick", (e) => {
        e = e || window.event
        const target = e.target || e.srcElement
        fn.call(this, e, "LI", this.ulis, target)
        this.okBtn.disabled = false
    })
}

function fn(e, str, a, target) {
    if (target.nodeName === str) {
        for (let i = 0; i < this.olis.length; i++) {
            this.olis[i].className = ""
            this.ulis[i].className = ""
            this.ems[i].className = ""
            this.ems[4].className = ""
        }
        if (str === "IMG") {
            target = target.parentNode
        }
        const index = Array.from(a).indexOf(target)
        this.olis[index].className = "active"
        this.ulis[index].className = "active"
        this.ems[index + 1].className = "ab"
        this.centerImg.src = "./images/" + index + ".jpg";
        this.bigImg.src = "./images/" + index + ".jpg";
    }
}
//加减数量
Taobao.prototype.addSub = function () {
    on(this.addBtn, 'onclick', () => {
        this.count++
        if (this.count >= 5) {
            this.count = 5
            alert("朋友   小心点儿肾啊")
        }
        this.inputText.value = this.count
    })
    on(this.subBtn, 'onclick', () => {
        this.count--
        if (this.count <= 1) {
            this.count = 1
        }
        this.inputText.value = this.count
    })
}

//输入数量
Taobao.prototype.entry = function () {
    const that = this
    on(this.inputText, "change", function () {
        that.count = this.value
    })
}

//添加到购物车
Taobao.prototype.toCar = function () {
    const shopNum = document.querySelector(".shopNum")
    const fly = document.querySelector(".fly")
    const that = this
    on(this.okBtn, "click", function (e) {
        const fly = document.createElement("div")
        fly.className = "fly"
        css(fly, "top", e.clientY - fly.clientWidth / 2 + "px")
        css(fly, "left", e.clientX - fly.clientHeight / 2 + "px")
        const body = document.body
        body.appendChild(fly)

        css(fly, "display", "block")
        animate(fly, {
            top: 220,
            left: document.documentElement.clientWidth - 30
        }, 2000, function () {
            css(fly, "display", "none")
        })
        shopNum.innerText = (shopNum.innerText - 0) + (that.inputText.value - 0)
    })
}
/* 
    工具类函数

*/
/* 
    检测一个字符串是否是可回文字符串
    @param a 要检测的字符串
    @return 返回值是一个布尔值  
*/
function fn(a) {
    return a.split('').reverse().join('') === a ? true : false
}
/* 
    求一个范围之间的随机数
    @param a 范围下限
    @param b 范围上限
    @return 范围之间的随机数
*/
function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}

/* 
    随机颜色
    @return  随机颜色字符串
*/
function getColor() {
    return "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"
}

/* 
    通过选择器获取元素
    @param selector 要获取的元素的 id/class/标签名
    @param context 从哪个范围获取
    @return 获取到的元素或者元素伪数组
*/
function my$(selector, context) {
    context = context || document
    if (selector.indexOf('#') === 0) {
        return document.getElementById(selector.slice(1))
    }
    if (selector.indexOf('.') === 0) {
        return context.getElementsByClassName(selector.slice(1))
    }
    return context.getElementsByTagName(selector)
}
/* 
    获取/设置元素的样式 
    @param ele 元素
    @param attr 要获取/设置的属性
    @param value 要获取/设置的属性值
    @return 获取/设置好的属性值
*/
function css(ele, attr, value) {
    if (value) {
        ele.style[attr] = value
    }
    // 有第三个参数就是设置 没有就是获取
    return window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
}

/* 
    绑定事件 兼容处理
    @param ele  要绑定事件的元素
    @param type 事件类型
    @param fn 事件处理函数
*/
function on(ele, type, fn) {
    if (ele.addEventListener) {
        if (type.indexOf('on') === 0) {
            type = type.slice(2)
        }
        ele.addEventListener(type, fn)
    } else {
        if (type.indexOf('on') !== 0) {
            type = 'on' + type
        }
        ele.attachEvent(type, fn)
    }
}

function off(){
    
}
/* 
    对 ie8 不支持  pageX pageY 做的兼容处理
    @param e event 对象
    @return 光标距离页面左边和上边的距离数据对象
*/
function page(e) {
    if (e.pageX) {
        return { x: e.pageX, y: e.pageY }
    }
    var _x = document.documentElement ? document.documentElement.scrollLeft + e.clientX : document.body.scrollLeft + e.clientX 
    var _y = document.documentElement ? document.documentElement.scrollTop + e.clientY : document.body.scrollTop + e.clientY
    return { x:_x,y:_y}
}


/* 
    运动框架函数
    @param ele 执行运动的元素 
    @param options 终点值 是一个对象
    @param duration 运动的总时间
    @param fn 运动执行完毕的回调函数

*/
function animate(ele, options, duration,fn) {
    
    clearInterval(ele.timer)
    const start = {}, range = {}
    for (var key in options) {
        start[key] = parseFloat(css(ele, key))
        range[key] = options[key] - start[key]
    }
    const startTime = +new Date()
    ele.timer = setInterval(() => {
        let nowTime = +new Date()
        let timeDifference = Math.min(nowTime - startTime,duration)
        for (let attr in options) {
            let result = start[attr] + range[attr] / duration * timeDifference
            result = attr === 'opacity' ? result : result + 'px'
            ele.style[attr] = result
        }
        if (timeDifference === duration) {
            clearInterval(ele.timer)
            fn && fn()
        }
    }, 10)
}
/* 
    淡入

*/
function fadeIn(ele,time,fn){
    css(ele,'display','block')
    css(ele,'opacity','0')
    animate(ele,{opacity:1},time,fn)
}
/* 
    淡出
*/
function fadeOut(ele,time,fn){
    css(ele,'display','block')
    css(ele,'opacity','1')
    animate(ele,{opacity:0},time,fn)

}
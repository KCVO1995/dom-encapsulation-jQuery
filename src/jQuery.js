window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }// api 可以操作elements
    const api = Object.create(jQuery.prototype)
    api.elements = elements
    return api
}


jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    find(selector) {
        const array = []
        this.each(node => {
            let elements2 = Array.from(node.querySelectorAll(selector))
            array.push(...elements2)
        })
        array.oldApi = this // this就是现有的api
        return jQuery(array) // 由于find改变了操作对象，重新构造一个jQuery对象
    },
    parent() {
        const array = []
        this.each(node => {
            if (array.indexOf(node.parentElement) === -1) {
                array.push(node.parentElement)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each(node => {
            array.push(...node.children)
            // ...新语法相当于 array.push(node.children[0],node.children[0],node.children[1]..node.children[n])
        })
        return jQuery(array)
    },
    siblings() {
        let array = []
        if (this.elements.length === 1) {
            let children = Array.from(this.elements[0].parentNode.children)
            for (let i = 0; i < children.length; i++) {
                if (children[i] !== elements[0]) {
                    array.push(children[i])
                }
            }
        }
        return jQuery(array)
    },
    index() {
        if (this.elements.length === 1) {
            let siblings = Array.from(this.elements[0].parentNode.children)
            return siblings.indexOf(this.elements[0])
        }
    },
    next() {
        let next
        if (this.elements.length === 1) {
            next = this.elements[0].nextElementSibling
        }
        return jQuery([next])
    },
    prev() {
        if (this.elements.length === 1) {
            prev = this.elements[0].previousElementSibling
        }
        return jQuery([prev])
    },
    print() {
        console.log(this.elements)
        return this
    },
    // 闭包：函数访问外部的变量
    addClass(className) {
        this.each(node => {
            node.classList.add(className)
        })
        return this
    },
    end() {
        return this.elements
    }
}
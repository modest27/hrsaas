export const imagerror = {
  // 指令对象 会在dom元素插入到节点之后执行
  inserted(dom, option) {
    // dom是当前指令作用的dom元素，option是对指令中变量的解释，其中有个属性value
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.src = dom.src || option.value
    dom.onerror = function() {
      dom.src = option.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}

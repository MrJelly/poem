export default function Queue(size) {
  var list = [];
  //向队列中添加数据
  this.push = function (data) {
    if (data == null) {
      return false;
    }
    //如果传递了size参数就设置了队列的大小
    if (size != null && !isNaN(size)) {
      if (list.length == size) {
        this.pop();
      }
    }
    list.unshift(data);
    return true;
  }

  this.has = function (id, key = "_id") {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element[key] === id) {
        return index
      }
    }
  }

  //从队列中取出数据
  this.pop = function () {
    return list.pop();
  }

  //返回队列的大小
  this.size = function () {
    return list.length;
  }

  //返回队列的内容
  this.queue = function (index) {
    return index !== undefined ? list[index] : list;
  }
}

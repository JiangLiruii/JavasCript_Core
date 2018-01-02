// 目的 降低程序的耦合性
const pubsub = (function () {
  // 创建一个事件列表
  const events = [];
  return {
    // 使用事件函数
    subscribe(event, listener) {
      events[event] = events[event] || [];
      events[event].push(listener) - 1;
    },
    // 创建/发布事件函数
    publish(event, info) {
      events[event].forEach((element) => {
        element(info !== undefined ? info : {});
      });
    },
  };
}());

// 业务模块
const cart = (function (pubsub) {
  const products = [];
  return {
    addProduct(product) {
      products.push(product);
      pubsub.publish('new-product', this.getTotal());
      pubsub.publish('promotion-check', product);
    },
    getProduct() {
      return products;
    },
    getTotal() {
      return products.reduce((total, product) => total += parseInt(product.price), 0);
    },
  };
}(pubsub));

const cartui = (function (pubsub) {
  pubsub.subscribe('new-product', (total) => {
    console.log('Total cost:', total);
  });
}(pubsub));

const promote = (function (pubsub) {
  pubsub.subscribe('promotion-check', (product) => {
    if (product.name === 'ipad') {
      console.log('ipad3 is out');
    }
  });
}(pubsub));

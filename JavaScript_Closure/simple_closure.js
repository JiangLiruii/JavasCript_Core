// 这是一个简单解释闭包原理的脚本
function foo() {
  const a = 1;
  const b = 2;
  return function () {
    console.log(a);
  };
}
const bar = foo();
console.dir(bar);
// 可以看到此时返回的是一个匿名函数，其中包含的Scope（作用域）有三个，
// scope[0]=Closure(foo),包含其中一个参数a的值1，只有变量a保存下来，因为b没有引用，所以在函数foo()调用之后就被垃圾回收
// scope[1]=Script 包含的是Script内置的方法和属性
// scope[2]=Global 包含的是全局的一些方法和属性


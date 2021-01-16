import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function () { //使用闭包，因为可能有很多

    return function (opts) {  //配置参数

        var defaults = {   //设置默认值
            title: '',
            content: '',
            cancel: '', //取消按钮的文字
            ok: '',//确定按钮的文字
            handleCancel: null, //取消按钮的执行函数
            handleOk: null//确定按钮的执行函数
        };

        for (var attr in opts) { //对默认值进行覆盖
            defaults[attr] = opts[attr];
        }

        var MyComponent = Vue.extend(MessageBox);  //把js与MessageBox组件进行结合，并返回一个新类 class MyComponent


        var vm = new MyComponent({
            el: document.createElement('div'), //创建容器节点;当vue组件中有template选项时，就会覆盖el
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });

        document.body.appendChild(vm.$el); //添加节点
    };

})();
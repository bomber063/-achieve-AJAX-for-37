# -achieve-AJAX-for-37
## HTTP各部分与代码的关系
### HTTP请求行的内容
* 请求行包括请求：
1. 方法(例如get,post等)
2. 请求对应的路径，它和报文头的Host属性组成完成的请求URL
3. 协议名称和版本号
* 我们可以用代码配置
* 有路径，协议和Host
```
request.open('get','http://bomber.com:8001/xxx')
```
或者只有路径
```
request.open('get','/xxx')
```

### 请求头的内容
* 请求头有Host，这个Host前面一部分bomber.com:8001就是啦
```
request.open('get','http://bomber.com:8001/xxx')
```
* 请求头的其他内容，比如content-type可以设置吗

### JS可以设置任意请求头（header）吗
* 在谷歌上面搜js set header可找到，或者直接找MDN，然后可以找一个API——[XMLHttpRequest.setRequestHeader()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)是设置HTTP请求头部的方法。此方法必须在open()方法和 send()之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
* 前端部分代码,我们在open和send之间插入：
```
  request.setRequestHeader('bomber', '18')//注意这里都是字符串
```
* 之后我们就可以在打开开发者工具在NetWork->All->xxx->Request Headers里面点击view source可以看到自己添加的bomber：18
* 所以HTTP请求里面第二部分请求头是可以自己设置，也可以是随便设置的。

### 第三部分是一个回车所以不需要设置
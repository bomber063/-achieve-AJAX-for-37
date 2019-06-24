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
* 如果浏览器已经有的请求头，比如User-Agent，**被浏览器禁止修改**。显示
```
Refused to set unsafe header "User-Agent"
```
* 通过查询MDN上解释，为安全起见，有些请求头的值只能由user agent设置：[forbidden header names](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%A6%81%E6%AD%A2%E4%BF%AE%E6%94%B9%E7%9A%84%E6%B6%88%E6%81%AF%E9%A6%96%E9%83%A8)和[forbidden response header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name).
* 在测试一个content-type，增加代码为
```
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
```
* 这里的[x-www-form-urlencoded](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST):数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 percent-encoding: 这也就是为什么这种类型不支持二进制数据的原因 (应使用 multipart/form-data 代替).
* 这里的[Content-type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)实体头部用于指示资源的MIME类型 media type 

* 所以HTTP请求里面第二部分请求头是可以自己设置，**但是也有部分是会被浏览器禁止的，需要注意**。

### 第三部分是一个回车所以不需要设置
### 第四部分可以设置任意请求体(body)吗
* 在谷歌上查询js set request body可找到，或者直接找MDN，然后可以找到一个API——[XMLHttpRequest.send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。
* 前端部分代码增加这个API：
```
  request.send('我偏要设置get请求的request第四部分内容')
```
* **方方老师说这里因为是get请求，在浏览器的开发者工具中是看不到这个请求的第四部分内容的(body)，因为chorme浏览器认为get请求理论上不会有request的body，所以它就不展示出来，这只是一个约定俗成。并没有禁止你这么做，所以是看不到报错的。想要看到第四部分，不要用get换做post就可以看到**.
* **MDN上面解释send()接受一个可选参数，允许您指定请求的正文; 这主要用于诸如此类的请求PUT。如果请求方法是GET或HEAD，body则忽略该参数并将请求正文设置为null**。
* **通过post方法来测试就可以在NetWork->All->xxx->Request Payload里面看到你设置的内容**
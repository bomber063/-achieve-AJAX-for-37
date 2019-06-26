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
***
上面就是介绍完设置**请求的部分**
***
下面就介绍如何读取**响应的部分**
***
### JS可以获取响应求头（header）吗
* 在谷歌上输入js get response headers，或者直接找MDN，然后可以找一个API——[getAllResponseHeaders()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)将所有响应头（由CRLF分隔）作为字符串返回，或者null如果未收到响应则返回。如果发生网络错误，则返回空字符串。
* 前端代码我们增加一句
```
      console.log(request.getAllResponseHeaders())
```
* 就可以在控制台看到**所有**的响应头信息啦,这些都是字符串，每一行都由回车符和换行符（\r\n）终止。这些基本上是分隔每个标题的分隔符，我们跟控制台的里面的NetWork->All->xxx->Response Headers里面点击view source可以看到响应头信息是一样的，但是**控制台的有大写，而且顺序有点不同**
```
access-control-allow-origin: *
date: Tue, 25 Jun 2019 10:15:12 GMT
connection: keep-alive
transfer-encoding: chunked
content-type: text/json;charset=utf-8
```
* 如果只需要获取一个响应头，不需要所有的响应头呢，可以用API——[XMLHttpRequest.getResponseHeader()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader)方法返回包含指定头文本的字符串。
如果在返回头中有多个具有相同的名称的响应头，那么响应的值就会是用逗号和空格将值分隔的字符串。getResponseHeader（）方法以UTF字节序列的形式返回值。搜索标题名称是不区分大小写的。
* 这里需要你写入相应的对应的参数，比如参数date就会返回Tue, 25 Jun 2019 10:15:12 GMT，代码为
```
      console.log(request.getResponseHeader('date'))
```
### JS可以获取响应求行吗
* 前面我们介绍过的API——[XMLHttpRequest.status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status)返回了XMLHttpRequest 响应中的数字状态码。status 的值是一个无符号短整型。在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。
* 响应行里面的OK能获取吗？通过谷歌上输入js get response message，或者直接找MDN，然后可以找一个API——[XMLHttpRequest.statusText](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/statusText)返回了XMLHttpRequest 请求中由服务器返回的一个DOMString 类型的文本信息，这则信息中也包含了响应的数字状态码。不同于使用一个数字来指示的状态码XMLHTTPRequest.status，这个属性包含了返回状态对应的文本信息，例如"OK"或是"Not Found"。如果请求的状态readyState的值为"UNSENT"或者"OPENED"，则这个属性的值将会是一个空字符串。
* 前端代码增加一句，我们就可以在控制台看到OK啦。
```
      console.log(request.statusText)
```
### 响应第三部分是一个空格，所以不用获取
### JS响应的第四部分如何获取呢
* 这个前面已经说过啦，就是API——[XMLHttpRequest.responseText](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText)属性返回一个DOMString，它包含对文本的请求的响应，如果请求不成功或尚未发送，则返回null。responseText属性在请求完成之前将会得到部分属性。 如果 XMLHttpRequest.responseType 的值不是 text 或者空字符串，届时访问 XMLHttpRequest.responseText 将抛出 InvalidStateError 异常。
* 前端增加一句代码，就可以看到后端返回的信息啦
```
      console.log(request.responseText)
```
* 后端返回的信息
```
    {
      "note":{
        "to": "小谷",
        "from": "bomber",
        "heading": "打招呼",
        "content": "hi"
      }
    }
```
***
* 到这里的，我们就知道了http响应部分我们也可以获取
***
### 请求和响应的小结
* JS可以设置请求header吗？
1. 第一部分 request.open('get','/xxx')
2. 第二部分 request.setHeader('Content-type','x-www-form-urlencoded')
3. 第三部分 空格换行不用管
4. 第四部分 request.send('a=1&b=2')
* JS可以获取响应header吗？
1. 第一部分 request.status / request.statusText
2. 第二部分 request.getResponseHeader() / request.getAllResponseHeaders()
3. 第三部分 空格换行不用管
4. 第四部分 request.responseText
* 可以看出来AJAX能够获取响应头，而node.js能够设置响应头。
* 从客户端和服务端来解释
1. 客户端(比如chorme)可以发请求，而且请求最多有四部分，说明可以设置请求，就是set request。客户端一般没有端口。
2. 服务端（比如node.js）可以发响应，而且响应最多有四部分，说明可以设置响应，就是set responese。而服务端一般响应的端口都是[80](https://baike.baidu.com/item/80%E7%AB%AF%E5%8F%A3/7581041?fr=aladdin)端口。
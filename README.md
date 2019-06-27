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

### 浏览器是先下载全部响应内容，然后再判断是不是400吗？
* 如果响应有400MB，那么下载400Mb的内容肯定不是一下就完成，需要几分钟的时间。
* 这里继续说一下TCP/IP协议
> HTML/CSS/JS/JSON是基于HTTP协议传输的。然后HTTP协议是基于TCP/IP协议传输的。一个人输入一个url请求并不是一下，马上就传给服务器的，而是经过了很多过程，比如从服务器（server）到客户端（client）经过的过程前面我们说明过，见[链接](https://github.com/bomber063/The-mid-term-exam-for-jirengu-fangfang/tree/master/%E7%AC%AC9%E9%A2%98)。这里在大概**补充**说一下：
1. 有些人会从计算机以外的信息来考虑，比如光->人眼->视觉神经->反馈到大脑->大脑指挥手去键盘来敲击回车键->键盘会触发电路的一个开关->电信号->到传感器->...->最终变成一个ASCII码的数字->传入给操作系统->操作系统就知道你按了回车或者字母或者某个按键->...->告诉浏览器
2. 浏览器拿到url，也就是网址后->看浏览器自己的DNS缓存(看看之前是否有访问过该网址)->如果没有访问过，就去问DNS，发起DNS查询(这个查询先从顶级域名到下一级域名开始查询，具体见[链接](https://github.com/bomber063/The-mid-term-exam-for-jirengu-fangfang/tree/master/%E7%AC%AC9%E9%A2%98))->查询到IP后返回给给浏览器
3. 拿到IP后就根据IP建立TCP链接(通过三次握手来建立，具体见[链接](https://github.com/bomber063/The-mid-term-exam-for-jirengu-fangfang/tree/master/%E7%AC%AC9%E9%A2%98))，当然如果是UTP协议就不需要确定这三次握手，为什么要三次握手？
> 1. A(比如某个浏览器)可以发请求.
> 2. A(比如某个浏览器)可以收请求。
> 3. B（比如某个服务器）可以发请求。
> 4. B（比如某个服务器）可以收请求。
> 简单说就是A和B双方都需要确定都可以收发请求。
4. 然后就开始发送HTTP请求，如果是**第二部分或者第四部分很大就需要分批发送**,有的服务器对数据包限制是4k(见[链接](https://www.jianshu.com/p/5e39929e1d57))有的64k(见[链接](https://www.cnblogs.com/mfrbuaa/p/4297874.html))
5. 然后就是建立连接，然后后台收到HTTP请求，后台去处理这个请求。后台就开始响应，响应依然是建立TCP/IP连接。也就是服务器(server)和客户端(client)传送HTTP的4个部分的响应传输。
6. 此时第一部分就包含了400,**发送完**第一部分就会发送第二部分，如果第二部分很大(比如超过一个数据包的大小)需要很多次发送
* 所以浏览器接受到的HTTP响应的**第一部分就可以判断400啦，然后再下载其他的响应内容的**。
* 所以我们一般都是先监听[XMLHttpRequest.readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)等于4,这个4的意思可以去[链接](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)看,就是代表下载完啦，**就获取到了完整的内容**，之后再去读取响应信息.因为还没有下载完就没必要去读取一个不完整的响应信息.
* **如果是面试问到，最高回答自己理解比较深刻的地方，避免回答自己不熟悉的地方，比如光到眼睛之类的物理，人体神经学科等等**

### 自己实现JQuery.ajax
* 简单来说就是实现类似下面这样的代码：
```
window.jQuery.ajax=function(options){
//代码
}
```
* 它的功能就是[前面](https://github.com/bomber063/AJAX-for-36)说到的主要四行代码信息变成一行代码就搞定啦。
* 前端部分代码修改为：
```
window.jQuery.ajax=function(url,method,body,successFn,failFn){//传入五个参数
    let request = new XMLHttpRequest()
    request.open(method, url)//这里两个参数分别是请求方法和路径
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          successFn.call(undefined,request.responseText)//这里的参数是调用成功后的函数
        }
        else if (request.status >= 400) {
          failFn.call(undefined,request)//这里的参数是调用失败后的函数
        }
      }
    }
    request.send(body)//这里的参数是请求的主体
}

window.$=window.jQuery
```
* 在定义了jQuery的前提下，我们使用如下代码：
```
 myButton.addEventListener('click', function (e) {
  window.jQuery.ajax(
    '/xxx',
    'post',
    'a=1&b=2',
    (x)=>{console.log(x)},//这里可以传入一个参数，如x，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request.responseText
    (xx)=>{console.log(xx)}//这里可以传入一个参数，如xx，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request
  )
})
```
* 之后我们就在点击button后就可以在开发者工具中看到请求信息啦。

* 以上的不足之处
1. 过段时间你可能不一定能知道这五个参数分别**代表什么意思**，参数有点多，所以需要加上一个名字。
2. 如果是get请求是没有请求体body的，但是这里又有body，那么就会出现问题。只能用一个undefined或者null来代替，如果有**很多undefined或者null显得代码有点奇怪**。C或者C++语言就有很多这样的代码,显的很奇怪，比如
```
xxx.(null,null,null,null,null,1)//C++的某个函数，是不是看不出来这些null是啥意思，而且太多null了。
```
***
解决上面的问题的一个小技巧就是需要一个有**结构的参数，在JS里面只有对象是有结构的**，其他的类型都是普通的变量。
***

### 解决参数命名的问题
* 前端代码修改为:
```
 myButton.addEventListener('click', function (e) {
  let obj={
    url:'/xxx',
    method:'post',
    body:'a=1&b=2',
    successFn:(x)=>{console.log(x)},//这里可以传入一个参数，如x，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request.responseText
    failFn:(xx)=>{console.log(xx)}//这里可以传入一个参数，如xx，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request
  }
  window.jQuery.ajax(obj)
})
```
* 在JQ里面增加
```
window.jQuery.ajax=function(options){//把五个参数变成一个参数，然后再去解析这五个参数
    let url=options.url
    let method=options.method
    let body=options.body
    let successFn=options.successFn
    let failFn=options.failFn
}
```
* 由于就一个变量obj，那么我们就可以直接省略obj的申明
* 前端代码修改为
```
  window.jQuery.ajax({
    url:'/xxx',
    method:'post',
    body:'a=1&b=2',
    successFn:(x)=>{console.log(x)},//这里可以传入一个参数，如x，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request.responseText
    failFn:(xx)=>{console.log(xx)}//这里可以传入一个参数，如xx，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request
  })
```
* 这里**说明一下，箭头函数是没有[arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)的**。
* 这里还有一个回调函数(callback)，也就是定义一个函数，但是并不调用它，而是别的地方来调用它。
* 回调函数也是可以说是满足某种条件的函数。
* 比如代码
```
 myButton.addEventListener('click', function (e) {
  window.jQuery.ajax({
    successFn:(x)=>{console.log(x)}//这里定义一个函数，但是没有调用它
  })
})
```
* 在JQ里面调用它并传入一个参数,而上面的x其实就是request.responeText。
```
        if (request.status >= 200 && request.status < 300) {
          successFn.call(undefined,request.responseText)//这里的才是调用并传入一个参数responseText
        }
```
* 我们可以直接把这个代码打印出来,因为是成功的，所以就可以看到后端传送给他的就是下面的信息
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
* 如果我们把url改成一个后端没有相应的路径，比如'/bomber'
```
 myButton.addEventListener('click', function (e) {
  window.jQuery.ajax({
    url:'/bomber',
    method:'post',
    body:'a=1&b=2',
    successFn:(x)=>{console.log(x)},//这里可以传入一个参数，如x，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request.responseText
    failFn:(xx)=>{console.log(xx)}//这里可以传入一个参数，如xx，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request
  })
})
```
* 我们就可以在控制台打出的信息报了404错误，并且穿了一个request信息。
* 另外需要注意**就算请求失败了报错了，那么也是有可能有第四部分响应信息的。因为这个是后端给的**。
* 比如后端代码中错误就显示
```
else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }
```
* 那么前端代码修改下
```
          failFn.call(undefined,request.responseText)//
```
* 开发者工具的控制台就可以看到
```
      {
        "error": "not found"
      }
```

### 成功后返回两个函数
* 前面的都是成功后返回一个函数，那么返回两个函数如何操作呢？
* 只需同一个参数，两个不同的函数来调用它就可以啦
* 前端部分代码修改为：
```
function f1(){}
function f2(){}

    successFn:(x)=>{
      f1.call(undefined.x)
      f2.call(undefined.x)
    },//这里一个参数x，传入到两个不同的函数f1和f2里面即可
```
* 这里总的来说就是定义一个函数successFn，但是不调用,让别人来调用，并且在调用的时候传入一个参数，之后得到的对应的两个函数，这个参数还是原来那个参数，但是函数是另外一个调用函数.

### 封装的ajax想要设置header
* 前端调用ajax代码增加一个header的value对应的是一个对象
```
  window.jQuery.ajax({
    header:{
      'content-type':'application/xxx-www-form-urlencode',
      'bomber':'18'
    },
  })
```
* ajax里面的增加设置header的代码，**这里需要记住request.setRequestHeader(key,value)需要放到open之后,send之前**
```
    let header=options.header

    for(let key in header){//request.setRequestHeader(key,value)需要放到open之后,send之前
      let value=header[key]
      request.setRequestHeader(key,value)
    }
```

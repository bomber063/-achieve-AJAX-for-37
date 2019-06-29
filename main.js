// window.jQuery = function(nodeOrSelector){
//   let nodes = {}
//   nodes.addClass = function(){}
//   nodes.html = function(){}
//   return nodes
// }
// window.$ = window.jQuery

// window.Promise = function(fn){
//   // ...
//   return {
//     then: function(){}
//   }
// }

// window.jQuery.ajax = function({url, method, body, headers}){
//   return new Promise(function(resolve, reject){
//     let request = new XMLHttpRequest()
//     request.open(method, url) // 配置request
//     for(let key in headers) {
//       let value = headers[key]
//       request.setRequestHeader(key, value)
//     }
//     request.onreadystatechange = ()=>{
//       if(request.readyState === 4){
//         if(request.status >= 200 && request.status < 300){
//           resolve.call(undefined, request.responseText)
//         }else if(request.status >= 400){
//           reject.call(undefined, request)
//         }
//       }
//     }
//     request.send(body)
//   })
// }

// myButton.addEventListener('click', (e)=>{
//   let promise = window.jQuery.ajax({
//     url: '/xxx',
//     method: 'get',
//     headers: {
//       'content-type':'application/x-www-form-urlencoded',
//       'frank': '18'
//     }
//   })

//   promise.then(
//     (text)=>{console.log(text)},
//     (request)=>{console.log(request)}
//   )

// })

// myButton.addEventListener('click',()=>{
//   let request=new XMLHttpRequest()
//   request.open('GET','/xxx')
//   request.send()
//   setInterval(() => {
//     console.log(request.readyState)
//   }, 0);
// })

// window.jQuery=function(nodeOrSelector){
//   let nodes={}
//   nodes.addClass=function(){}
//   nodes.html=function(){}
//   return nodes
// }

// window.jQuery.ajax=function({url,method,body,successFn,failFn,header}){//传入几个参数
//   // let url 
//   // if(arguments.length===1){
//   //   url=options.url
//   // }
//   // else if(arguments.length===2){
//   //   url=arguments[0]
//   //   options=arguments[1]
//   // }
//     // let url=options.url
//     // let method=options.method
//     // let body=options.body
//     // let successFn=options.successFn
//     // let failFn=options.failFn
//     // let header=options.header
//     //es6语法
//     // let {url,method,body,successFn,failFn,header}=options

//     let request = new XMLHttpRequest()
//     request.open(method, url)//这里两个参数分别是请求方法和路径

//     for(let key in header){//request.setRequestHeader(key,value)需要放到open之后,send之前
//       let value=header[key]
//       request.setRequestHeader(key,value)
//     }

//     request.onreadystatechange = function () {
//       if (request.readyState === 4) {
//         if (request.status >= 200 && request.status < 300) {
//           successFn.call(undefined,request.responseText)//这里的参数是调用成功后的函数
//         }
//         else if (request.status >= 400) {
//           failFn.call(undefined,request.responseText)//这里的参数是调用失败后的函数
//         }
//       }
//     }
//     request.send(body)//这里的参数是请求的主体
// }

// function f1(x){console.log('f1'+x)}
// function f2(x){console.log('f2'+x)}

// window.$=window.jQuery

//  myButton.addEventListener('click', function (e) {

//   window.jQuery.ajax({
//     url:'/xxx',
//     method:'post',
//     body:'a=1&b=2',
//     header:{
//       'content-type':'application/xxx-www-form-urlencode',
//       'bomber':'18'
//     },
//     successFn:(x)=>{
//       f1.call(undefined,x)
//       f2.call(undefined,x)
//     },//这里一个参数x，传入到两个不同的函数f1和f2里面即可
//     failFn:(xx)=>{console.log(xx)}//这里可以传入一个参数，如xx，经过jQuery后会使用这个参数，这个参数在jQuery里面就是request
//   })
// })


// myButton.addEventListener('click', function (e) {
//   let request = new XMLHttpRequest()
//   request.open('post', '/xxx')
//   request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
//   request.send('我偏要设置get请求的request第四部分内容')

//   request.onreadystatechange = function () {
//     if (request.readyState === 4) {
//       console.log('说明请求完毕')
//       console.log(request.getResponseHeader('date'))
//       console.log(request.statusText)
//       console.log(request.responseText)
//       if (request.status >= 200 && request.status < 300) {
//         let string = request.responseText
//         let object = window.JSON.parse(string)//把符合JSON语法的字符串转换成JS对应的值（这里就是对象）。这个值包括数组，函数，布尔等等

//       }
//       else if (request.status >= 400) {
//         console.log('说明请求失败')
//       }
//     }
//   }

// })


// myButton.addEventListener('click', function (e) {
//   $.ajax({
//     url:'/xxx',
//     method:'get',
//   }).then(
//     (responseText)=>{
//       console.log(responseText);
//         return '第一次的结果'
//     }, 
//     (request)=>{
//       console.log('error1')
//       return '已经处理'
//     }).then(
//       (r)=>{
//         console.log(r+'第二次的结果')
//       },
//       (a)=>{console.log('a'+a)}
//     )
// })

// myButton.addEventListener('click', function (e) {
//   $.ajax({
//     url:'/xxx',
//     method:'get',
//   }).then(
//     (responseText)=>{
//       console.log(responseText);
//         return responseText
//     },
//     (request)=>{
//       console.log('error1')
//       return '已经处理'
//     }).then(
//       (上一次的处理结果)=>{
//         console.log(上一次的处理结果)
//       },
//       (request)=>{console.log('error2')}
//     )
// })

// function success(x){console.log(x)}//这里的x代表request.responseText
// function fail(xx){console.log(xx)}//这里的xx代表request
// function f1(x){console.log(x)}
// function f2(xx){console.log(xx)}

myButton.addEventListener('click', function (e) {
  window.jQuery.ajax({
    url:'/xxx',
    method:'post',
  //   success:(x)=>{
  //     f1.call(undefined,x)//这里的x是request.responseText
  //     f2.call(undefined,x)//这里的x是request.responseText
  //   },
  //   error:(x)=>{
  //     console.log(x)//这里的x就是request
  //   }
  // })
  }).then(//把两个函数直接写到then后面,这里第一个的x代表request.responseText,这里第二个的xx代表request
    (x)=>{console.log('success1',x); return '第一个成功后return的结果'},
    (xx)=>{console.log('error1');return '第一个失败后return的结果'
    }).then(
    (x)=>{console.log(x+'你好')},//上一次处理的结果成功就调用成功后的return作为下一个then里面函数的参数x,失败就调用失败后的return作为下一个then里面函数的参数x
    (xx)=>{console.log(xx+'error2')//这个是本次如果失败才会出现
    })
})









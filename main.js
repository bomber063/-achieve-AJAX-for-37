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

myButton.addEventListener('click', function (e) {
  let request = new XMLHttpRequest()
  request.open('post', '/xxx')
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  request.send('我偏要设置get请求的request第四部分内容')

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('说明请求完毕')
      console.log(request.status)
      if (request.status >= 200 && request.status < 300) {
        let string = request.responseText
        let object = window.JSON.parse(string)//把符合JSON语法的字符串转换成JS对应的值（这里就是对象）。这个值包括数组，函数，布尔等等

      }
      else if (request.status >= 400) {
        console.log('说明请求失败')
      }
    }
  }

})


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









const express = require('express')
const path = require('path')
const http2Express = require('http2-express-bridge')
const http2 = require('http2')
const { readFileSync } = require('fs')



// only change required
const app = http2Express(express)

const port = 3000

// 托管静态文件
app.use('/static', express.static('assets_public'))



app.get('/', (req, res) => {
  let options = {
    root: path.join(__dirname, '/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('firstpage.html', options)
})
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

const options = {
  key: readFileSync('/root/myapp_cert/myapp.key'),
  cert: readFileSync('/root/myapp_cert/myapp.crt'),
  allowHTTP1: true
}

const httpsserver = http2.createSecureServer(options, app)
httpsserver.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
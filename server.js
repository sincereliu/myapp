const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// 托管静态文件
app.use('/static',express.static('assets_public'))



app.get('/', (req, res) => {
    let options = {
    root: path.join(__dirname, '/'),
  }
  res.sendFile('lxs.html', options)
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
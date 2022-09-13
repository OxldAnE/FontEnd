$(function () {
  let i = 0
  $('.get').click(function () {
    axios.get('/arr').then(res => {console.log(res.data)})
  })
  $('.post').click(function () {
    axios.post('/arr', {item : i++}).then(res => {console.log(res.data)})
  })
  $('.put').click(function () {
    axios.put('/arr/0', {item : i++}).then(res => {console.log(res.data)})
  })
  $('.delete').click(function () {
    axios.delete('/arr/0').then(res => {console.log(res.data)})
  })
})
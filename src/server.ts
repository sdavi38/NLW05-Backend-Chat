import express from 'express'


const app = express()

app.get('/', (request, response)=>{
  return response.json({
    mess:"ola"
  })
})
app.listen(3333 ,()=>console.log('Server is running on port 3333!!'))
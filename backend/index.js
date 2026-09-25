import express from 'express'
import profileroutes from './routes/profile.routes.js'
const app = express()

app.use(express.json())

app.use("profiles",profileroutes)

const PORT=5000

 app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
 })
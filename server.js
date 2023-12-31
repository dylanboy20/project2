const express =require ('express')
const cors= require('cors')

const connectDB=require('./config/db')


const app= express()
app.use(cors())


//conncect db
connectDB()

//Init Middleware
app.use(express.json({extended:false }))

app.get('/',(req,res) => res.json({msg:'Welcome to the Contact Keeper API..'}))

//Define ROUtes

app.use('/api/users',require('./routes/Users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT= process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

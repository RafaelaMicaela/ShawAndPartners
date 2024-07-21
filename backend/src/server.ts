import express from 'express'
import multer from 'multer'
import cors from 'cors' 
import { searchUsers, uploadFile } from './controllers/fileController'

const app = express()
const port = 3000
const upload = multer({ dest: 'src/uploads/' })

app.use(cors()) 

app.use(express.json())
app.post('/api/files', upload.single('file'), uploadFile)
app.get('/api/users', searchUsers)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

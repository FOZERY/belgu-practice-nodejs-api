require('dotenv').config()

const PORT = process.env.PORT || 5000

const Application = require('../myFramework/Application')

const json = require('../myFramework/middleware/json')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = new Application()

const router = require('./routes/index.router')

app.use(json)
app.use(bodyParser.json())
app.use(cors())
app.use(app.createRouterMiddleware('/api', router))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

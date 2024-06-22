require('dotenv').config()

const PORT = process.env.PORT || 5000

const Application = require('../myFramework/Application')

const parseUrl = require('../myFramework/middleware/parseUrl')
const json = require('../myFramework/middleware/json')
const bodyParser = require('../myFramework/middleware/bodyParser')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cors = require('cors')

const app = new Application()

const router = require('./routes/index.router')

app.use(json)
app.use(bodyParser)
app.use(parseUrl(`http://localhost:${PORT}`))
app.use(cors())
app.use(app.createRouterMiddleware('/api', router))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

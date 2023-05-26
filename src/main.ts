import express from 'express'
import { JwtAdapter } from './infra/adapters/jwt'
import { RegisterUserController } from './presentation/controllers/register-user'
import { RegisterTimeController } from './presentation/controllers/register-time'

const app = express()

app.use(express.json())

const jwtAdapter = new JwtAdapter('Gustavo')

const registerController = new RegisterUserController(
    jwtAdapter
)

const useTimeControler = new RegisterTimeController()

app.post('/user', (req, res) => registerController.handle(req, res))
app.post('/use-time', (req, res) => useTimeControler.handle(req, res))

app.listen(3000, () => {
    console.log('server is running at localhost: 3000')
})
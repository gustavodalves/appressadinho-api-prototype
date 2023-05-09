import express from 'express'
import { JwtAdapter } from './infra/adapters/jwt'
import { PrismaClient } from '@prisma/client'
import { RegisterUserController } from './presentation/controllers/register-user'
import { RegisterTimeController } from './presentation/controllers/register-time'

const app = express()

const jwtAdapter = new JwtAdapter('Gustavo')
const prisma = new PrismaClient({
    log: ['query']
})

const registerController = new RegisterUserController(
    prisma,
    jwtAdapter
)

const useTimeControler = new RegisterTimeController(prisma)

app.post('/user', registerController.handle)
app.post('/use-time', useTimeControler.handle)

app.listen(3000, () => {
    console.log('server is running at localhost: 3000')
})
import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionsRoute } from './http/routes/create-questions.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsQuestions } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

// toda nova rota devemos registrar
app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestions)
app.register(createQuestionsRoute)

app.listen({ port: env.PORT })

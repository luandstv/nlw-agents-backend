import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(10),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      const result = await db
        .insert(schema.questions)
        .values({ roomId, question })
        .returning() // Retorna os dados da linha que foi inserida.

      const insertedQuestion = result[0]

      if (!insertedQuestion) {
        throw new Error('Failed to create room')
      }

      return reply.status(201).send({
        questionId: insertedQuestion.id,
      })
    }
  )
}

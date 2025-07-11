// Importa o tipo FastifyPluginCallbackZod para criar rotas com validação de schema usando Zod.
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
// Importa o Zod para validação de dados.
import { z } from 'zod/v4'
// Importa a instância do banco de dados (Drizzle).
import { db } from '../../db/connection.ts'
// Importa os schemas das tabelas do banco de dados.
import { schema } from '../../db/schema/index.ts'

// Define e exporta a rota de criação de sala como um plugin do Fastify.
export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  // Registra uma nova rota POST no caminho '/create-room'.
  app.post(
    '/rooms',
    {
      // Define o schema de validação para a requisição.
      schema: {
        // Valida o corpo (body) da requisição.
        body: z.object({
          // O 'name' da sala é uma string obrigatória com no mínimo 1 caractere.
          name: z.string().min(1),
          // A 'description' da sala é uma string opcional.
          description: z.string().optional(),
        }),
      },
    },
    // Handler da rota, que é uma função assíncrona.
    async (request, reply) => {
      // Extrai 'name' e 'description' do corpo da requisição.
      const { name, description } = request.body

      // Insere uma nova sala no banco de dados usando o Drizzle.
      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          // Se a descrição não for fornecida, usa uma string vazia como padrão.
          description: description ?? '',
        })
        .returning() // Retorna os dados da linha que foi inserida.

      const insertedRoom = result[0]

      if (!insertedRoom) {
        throw new Error('Failed to create room')
      }

      // Retorna uma resposta com status 201 (Created) e o ID da sala criada.
      return reply.status(201).send({
        roomId: insertedRoom.id,
      })
    }
  )
}

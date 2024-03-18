import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { populateApi } from '~/src/helpers/db/populate-api'
import { config } from '~/src/config'

global.mockHandler = {
  response: jest.fn().mockReturnThis(),
  code: jest.fn().mockReturnThis()
}

let inMemoryMongo
let client

beforeAll(async () => {
  inMemoryMongo = await MongoMemoryServer.create()
  client = await MongoClient.connect(inMemoryMongo.getUri())
  global.mockMongo = client.db(config.get('mongoDatabase'))

  await populateApi(client, global.mockMongo)
})

afterAll(async () => {
  await inMemoryMongo.stop()
  await client.close()
})

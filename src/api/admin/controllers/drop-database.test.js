import { dropDatabaseController } from '~/src/api/admin/controllers/drop-database'

describe('POST /admin/drop-database', () => {
  test('should drop the mongo db applications and counters', async () => {
    const { mockMongo, mockHandler } = global

    const payload = {}

    await dropDatabaseController.handler(
      {
        db: mockMongo,
        payload
      },
      mockHandler
    )

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'success' })
    )

    expect(await mockMongo.collection('applications').count()).toEqual(0)

    expect(await mockMongo.collection('counters').count()).toEqual(0)
  })
})

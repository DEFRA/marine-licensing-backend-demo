import { getSiteController } from '~/src/api/sites/controllers/get-site'
import Boom from '@hapi/boom'

describe('GET /sites/{siteId}', () => {
  test('should return requested site when {siteId} is valid', async () => {
    const { mockMongo, mockHandler } = global

    await getSiteController.handler(
      {
        db: mockMongo,
        params: { siteId: 'df5d4b3a-83cb-4134-aa24-14e6efc197c1' }
      },
      mockHandler
    )

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith({
      message: 'success',
      site: expect.objectContaining({
        siteId: 'df5d4b3a-83cb-4134-aa24-14e6efc197c1'
      })
    })
  })

  test('should return 404 {siteId} is not valid', async () => {
    const { mockMongo, mockHandler } = global

    const error = await getSiteController.handler(
      { db: mockMongo, params: { siteId: '-1' } },
      mockHandler
    )

    expect(error).toEqual(Boom.notFound())
  })
})

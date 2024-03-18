import { getCaseController } from '~/src/api/cases/controllers/get-case'
import Boom from '@hapi/boom'

describe('GET /cases/{caseId}', () => {
  test('should return requested case when {caseId} is valid', async () => {
    const { mockMongo, mockHandler } = global

    await getCaseController.handler(
      {
        db: mockMongo,
        params: { caseId: 'd63145fd-a4f6-4a22-826a-2d99f24bfbcd' }
      },
      mockHandler
    )

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith({
      message: 'success',
      case: expect.objectContaining({
        caseId: 'd63145fd-a4f6-4a22-826a-2d99f24bfbcd'
      })
    })
  })

  test('should return 404 {siteId} is not valid', async () => {
    const { mockMongo, mockHandler } = global

    const error = await getCaseController.handler(
      { db: mockMongo, params: { caseId: '-1' } },
      mockHandler
    )

    expect(error).toEqual(Boom.notFound())
  })
})

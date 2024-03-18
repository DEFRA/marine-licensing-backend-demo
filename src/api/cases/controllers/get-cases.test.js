import { getCasesController } from '~/src/api/cases/controllers/get-cases'

describe('GET /cases', () => {
  test('should return expected cases', async () => {
    const { mockMongo, mockHandler } = global

    await getCasesController.handler({ db: mockMongo }, mockHandler)

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith({
      message: 'success',
      cases: [
        expect.objectContaining({
          caseId: 'd63145fd-a4f6-4a22-826a-2d99f24bfbcd'
        })
      ]
    })
  })
})

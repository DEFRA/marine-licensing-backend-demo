import { getApplicationController } from '~/src/api/applications/controllers/get-application'

describe('GET /application/{prefix}/{year}/{sequenceNumber}', () => {
  it('should return application from the database', async () => {
    const { mockMongo, mockHandler } = global

    await getApplicationController.handler(
      {
        db: mockMongo,
        params: { prefix: 'MLA', year: '2024', sequenceNumber: '00001' }
      },
      mockHandler
    )

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'success',
        value: expect.objectContaining({
          applicationId: 'MLA/2024/00001',
          title: 'The Seaside Serenity project'
        })
      })
    )
  })
})

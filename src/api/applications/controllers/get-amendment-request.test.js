import { getAmendmentRequestController } from '~/src/api/applications/controllers/get-amendment-request'

describe('GET /application/{prefix}/{year}/{sequenceNumber}/amendment-request', () => {
  it('should return an amendment request when one is available', async () => {
    const { mockMongo, mockHandler } = global

    await getAmendmentRequestController.handler(
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
          site: {
            coordinates: {
              originalValue: '53.589459598859236, -2.168875088935083',
              comment: 'These coordinates look wrong'
            }
          }
        })
      })
    )
  })
})

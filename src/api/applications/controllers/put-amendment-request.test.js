import { putAmendmentRequestController } from '~/src/api/applications/controllers/put-amendment-request'

describe('PUT /applications/{prefix}/{year}/{sequenceNumber}/amendment-request', () => {
  test('should create an amendment request with the correct data', async () => {
    const { mockMongo, mockHandler } = global

    const applicationId = 'MLA/2024/00001'

    const payload = {
      applicationId,
      site: {
        coordinates: {
          originalValue: '[0000001,0000002]',
          comment: 'These coordinates would have you in Shoreditch'
        }
      }
    }

    await putAmendmentRequestController.handler(
      {
        db: mockMongo,
        params: {
          prefix: 'MLA',
          year: '2024',
          sequenceNumber: '00001'
        },
        payload
      },
      mockHandler
    )

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'success' })
    )

    expect(
      await mockMongo.collection('amendment-requests').findOne({})
    ).toMatchObject(payload)

    expect(
      await mockMongo.collection('applications').findOne({ applicationId })
    ).toMatchObject({
      applicationStatus: 'amendment-requested'
    })
  })
})

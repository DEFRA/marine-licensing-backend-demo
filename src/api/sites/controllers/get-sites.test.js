import { getSitesController } from '~/src/api/sites/controllers/get-sites'

describe('GET /sites', () => {
  test('should return expected sites', async () => {
    const { mockMongo, mockHandler } = global

    await getSitesController.handler({ db: mockMongo }, mockHandler)

    expect(mockHandler.code).toHaveBeenCalledWith(200)
    expect(mockHandler.response).toHaveBeenCalledWith({
      message: 'success',
      sites: [
        expect.objectContaining({
          siteId: 'df5d4b3a-83cb-4134-aa24-14e6efc197c1'
        })
      ]
    })
  })
})

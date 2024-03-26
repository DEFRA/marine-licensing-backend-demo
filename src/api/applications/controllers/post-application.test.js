import { postApplicationController } from '~/src/api/applications/controllers/post-application'
import { upsertContactByEmail } from '~/src/helpers/dataverse/contacts'
import { createIncident } from '~/src/helpers/dataverse/incidents'

jest.mock('~/src/helpers/dataverse/contacts', () => ({
  upsertContactByEmail: jest.fn()
}))

jest.mock('~/src/helpers/dataverse/incidents', () => ({
  createIncident: jest.fn()
}))

describe('POST /applications', () => {
  beforeEach(() => {
    upsertContactByEmail.mockReturnValue({ contactid: '123' })
  })

  test('should upsert contact to dynamics and create application with correct applicationId', async () => {
    const { mockMongo, mockHandler } = global

    const payload = {
      title: 'App Title',
      background: 'App Background',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@domain.com',
      site: [],
      address: '1 Somewhere Place'
    }

    await postApplicationController.handler(
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

    expect(upsertContactByEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      })
    )

    expect(createIncident).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        title: payload.title,
        background: payload.background,
        contactId: '123',
        applicationId: 'MLA/2024/00001'
      })
    )
  })
})

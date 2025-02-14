import { postApplicationController } from '~/src/api/applications/controllers/post-application'
import { upsertContactByEmail } from '~/src/helpers/dataverse/contacts'
import { createIncident } from '~/src/helpers/dataverse/incidents'

jest.mock('~/src/helpers/dataverse/contacts', () => ({
  upsertContactByEmail: jest.fn()
}))

jest.mock('~/src/helpers/dataverse/incidents', () => ({
  createIncident: jest.fn()
}))

jest.mock('~/src/helpers/dataverse', () => ({
  getServerToServerAccessToken: jest.fn().mockResolvedValue('<token>')
}))

describe('POST /applications', () => {
  beforeEach(() => {
    upsertContactByEmail.mockReturnValue({ contactid: '123' })
  })

  test('should upsert contact to dynamics and create application with correct applicationId', async () => {
    const { mockMongo, mockHandler } = global

    const payload = {
      title: 'App Title',
      applicant: {
        background: 'App Background',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@domain.com',
        address: '1 Somewhere Place'
      },
      site: { coordinates: '' }
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
      expect.objectContaining({
        message: 'success',
        value: {
          applicationId: 'MLA/2025/00002',
          applicationStatus: 'submitted',
          ...payload
        }
      })
    )

    expect(upsertContactByEmail).toHaveBeenCalledWith(
      '<token>',
      expect.objectContaining({
        email: payload.applicant.email,
        firstName: payload.applicant.firstName,
        lastName: payload.applicant.lastName
      })
    )

    expect(createIncident).toHaveBeenCalledWith(
      '<token>',
      expect.objectContaining({
        title: payload.title,
        background: payload.background,
        contactId: '123',
        applicationId: 'MLA/2025/00002'
      })
    )

    expect(
      await mockMongo.collection('applications').findOne({
        applicationId: 'MLA/2025/00002'
      })
    ).toMatchObject({
      applicationId: 'MLA/2025/00002',
      applicationStatus: 'submitted',
      ...payload
    })
  })
})

describe('POST /applications validation', () => {
  const payloadValidator = postApplicationController.options.validate.payload

  it('should fail if fields are missing', () => {
    const result = payloadValidator.validate({
      title: '',
      background: '',
      applicant: {
        // firstName: '', // missing field
        lastName: '',
        email: '',
        address: ''
      },
      site: {
        coordinates: ''
      }
    })

    expect(result.error.message).toContain('"applicant.firstName" is required')
  })

  it('should succeed if fields are empty strings', () => {
    const result = payloadValidator.validate({
      title: '',
      background: '',
      applicant: {
        firstName: '', // missing field
        lastName: '',
        email: '',
        address: ''
      },
      site: {
        coordinates: ''
      }
    })

    expect(result.error).toBeUndefined()
  })
})

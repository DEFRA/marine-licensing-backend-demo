import { getServerToServerAccessToken } from '~/src/helpers/dataverse'
import { createIncident } from '~/src/helpers/dataverse/incidents'
import { upsertContactByEmail } from '~/src/helpers/dataverse/contacts'
import joi from 'joi'
import { generateApplicationId } from '~/src/helpers/counters/application-id'

export const postApplicationController = {
  options: {
    validate: {
      query: false,
      payload: joi.object({
        title: joi.string().required().allow(''),
        background: joi.string().required().allow(''),
        firstName: joi.string().required().allow(''),
        lastName: joi.string().required().allow(''),
        email: joi
          .string()
          .required()
          .email({ tlds: { allow: false } })
          .allow(''),
        site: joi.string().allow(''),
        address: joi.string().allow('')
      })
    }
  },
  handler: async (request, h) => {
    const {
      db,
      payload: { firstName, lastName, title, background, email }
    } = request

    const session = db.client.startSession()
    try {
      await session.withTransaction(async () => {
        const token = await getServerToServerAccessToken()

        const contactResponse = await upsertContactByEmail(token, {
          email,
          firstName,
          lastName
        })
        const { contactid: applicantId } = contactResponse

        const applicationId = await generateApplicationId(db)
        await createIncident(token, {
          title,
          background,
          contactId: applicantId,
          applicationId
        })

        await db
          .collection('applications')
          .insertOne({ applicantId, title, background })
      })

      return h.response({ message: 'success' }).code(200)
    } finally {
      session.endSession()
    }
  }
}

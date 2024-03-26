import { getServerToServerAccessToken } from '~/src/helpers/dataverse'
import { createIncident } from '~/src/helpers/dataverse/incidents'
import { upsertContactByEmail } from '~/src/helpers/dataverse/contacts'
import joi from 'joi'

export const postApplicationController = {
  options: {
    validate: {
      query: false,
      payload: joi.object({
        title: joi.string().required(),
        background: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi
          .string()
          .required()
          .email({ tlds: { allow: false } }),
        site: joi.string(),
        address: joi.string()
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

        const contactResponseP = upsertContactByEmail(token, {
          email,
          firstName,
          lastName
        })

        contactResponseP.catch(e => console.log('error', e, e.data.payload.toString()))
        const contactResponse = await contactResponseP
        const { contactid: applicantId } = contactResponse

        await createIncident(token, {
          title,
          background,
          contactId: applicantId
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

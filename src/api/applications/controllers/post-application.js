import joi from 'joi'
import { getServerToServerAccessToken } from '~/src/helpers/dataverse'
import { createIncident } from '~/src/helpers/dataverse/incidents'
import { getContactByEmail } from '~/src/helpers/dataverse/contacts'

export const postApplicationController = {
  options: {
    validate: {
      query: false,
      payload: joi.object({
        title: joi.string().required(),
        background: joi.string().required(),
        email: joi
          .string()
          .required()
          .email({ tlds: { allow: false } })
      })
    }
  },
  handler: async (request, h) => {
    const {
      db,
      payload: { title, background, email }
    } = request

    const token = await getServerToServerAccessToken()

    const { contactid: contactId } = await getContactByEmail(token, email)

    const incident = await createIncident(token, {
      title,
      contactId
    })

    await db
      .collection('applications')
      .insertOne({ applicantId: contactId, title, background })

    return h.response({ message: 'success', incident }).code(200)
  }
}

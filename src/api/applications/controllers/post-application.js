import { getServerToServerAccessToken } from '~/src/helpers/dataverse'
import { createIncident } from '~/src/helpers/dataverse/incidents'
import { getContactByEmail } from '~/src/helpers/dataverse/contacts'

export const postApplicationController = {
  options: {
    validate: {}
  },
  handler: async (request, h) => {
    const {
      db,
      payload: { title, background, email }
    } = request

    const session = db.client.startSession()
    try {
      await session.withTransaction(async () => {
        const token = await getServerToServerAccessToken()

        const contactResponse = await getContactByEmail(token, email)
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

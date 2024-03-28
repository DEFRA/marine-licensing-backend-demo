import { getServerToServerAccessToken } from '~/src/helpers/dataverse'
import { createIncident } from '~/src/helpers/dataverse/incidents'
import { upsertContactByEmail } from '~/src/helpers/dataverse/contacts'
import { generateApplicationId } from '~/src/helpers/counters/application-id'
import { application } from '~/src/models/application'

export const postApplicationController = {
  options: {
    validate: {
      query: false,
      payload: application
    }
  },
  handler: async (request, h) => {
    const { db, payload } = request

    const {
      title,
      background,
      applicant: { email, firstName, lastName }
    } = payload
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
          .insertOne({ applicationId, ...payload })
      })

      return h.response({ message: 'success' }).code(200)
    } finally {
      session.endSession()
    }
  }
}

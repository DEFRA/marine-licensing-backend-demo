import {
  getContactByEmail,
  getServerToServerAccessToken
} from '~/src/helpers/dataverse'

export const getApplicantsController = {
  handler: async (request, h) => {
    const cursor = request.db
      .collection('applicants')
      .find({}, { projection: { _id: 0 } })
    const applicants = await cursor.toArray()

    const token = await getServerToServerAccessToken()
    const augmentedApplicants = await Promise.all(
      applicants.map(async (applicant) => {
        const contact = await getContactByEmail(token, applicant.email)

        return { ...applicant, ...contact }
      })
    )

    return h
      .response({ message: 'success', applicants: augmentedApplicants })
      .code(200)
  }
}

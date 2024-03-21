import {
  getContacts,
  getServerToServerAccessToken
} from '~/src/helpers/dataverse'

export const getApplicantsController = {
  handler: async (request, h) => {
    const cursor = request.db
      .collection('applicants')
      .find({}, { projection: { _id: 0 } })
    const applicants = await cursor.toArray()

    const token = await getServerToServerAccessToken()
    const contacts = await getContacts(token)

    const augmentedApplicants = applicants.map((applicant) => {
      const matchingContact = contacts.find(
        (contact) => contact.emailaddress1 === applicant.email
      )

      return { ...applicant, ...matchingContact }
    })

    return h
      .response({ message: 'success', applicants: augmentedApplicants })
      .code(200)
  }
}

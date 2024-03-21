import { Wreck } from '@hapi/wreck'
import { config } from '~/src/config'
import { postHeaders, getApplicant } from '~/src/helpers/dataverse'

const dataverseApiUrl = config.get('dataverseApiUrl')

export const createApplication = async (
  token,
  { forename, surname, title }
) => {
  const { contactId } = await getApplicant(token, `${forename} ${surname}`)

  const { payload } = await Wreck.post(`${dataverseApiUrl}/contacts`, {
    headers: postHeaders(token),
    payload: JSON.stringify({
      title,
      statuscode: -1,
      prioritycode: 2,
      caseorigincode: null,
      ticketnumber: null,
      'customerid_contact@odata.bind': `/contacts(${contactId})`,
      createdon: null
    })
  })

  return payload
}

import Wreck from '@hapi/wreck'
import { config } from '~/src/config'
import { getHeaders, patchHeaders } from '~/src/helpers/dataverse'

export const upsertContactByEmail = async (
  token,
  { email, firstName, lastName }
) => {
  const { payload } = await Wreck.patch(
    `${config.get('dataverseApiUrl')}/contacts(emailaddress1='${email}')`,
    {
      headers: { ...patchHeaders(token) },
      payload: {
        firstname: firstName,
        lastname: lastName
      }
    }
  )

  return JSON.parse(payload)
}

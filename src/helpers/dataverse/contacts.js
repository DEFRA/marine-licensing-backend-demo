import { Wreck } from '@hapi/wreck'
import { config } from '~/src/config'
import { getHeaders } from '~/src/helpers/dataverse'

export const getContacts = async (token) => {
  const { payload } = await Wreck.get(
    `${config.get('dataverseApiUrl')}/contacts`,
    {
      headers: { ...getHeaders(token) }
    }
  )

  return JSON.parse(payload).value
}

export const getContactByName = async (token, name) => {
  const { payload } = await Wreck.get(
    `${config.get('dataverseApiUrl')}/contacts?$filter=contains(fullname, '${name}')`,
    {
      headers: { ...getHeaders(token) }
    }
  )

  return JSON.parse(payload).value[0]
}

export const getContactByEmail = async (token, email) => {
  const { payload } = await Wreck.get(
    `${config.get('dataverseApiUrl')}/contacts?$filter=contains(emailaddress1, '${email}')`,
    {
      headers: { ...getHeaders(token) }
    }
  )

  return JSON.parse(payload).value[0]
}

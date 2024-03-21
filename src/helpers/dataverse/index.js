import SimpleOAuth2 from 'simple-oauth2'

import { config } from '~/src/config'

const getOAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  'OData-MaxVersion': '4.0',
  'OData-Version': '4.0'
})

export const getHeaders = (token) => ({
  ...getOAuthHeaders(token),
  Accept: 'application/json'
})

export const postHeaders = (token) => ({
  ...getOAuthHeaders(token),
  Accept: 'application/json',
  Consistency: 'Strong',
  'Content-Type': 'application/json',
  Prefer: 'odata.include-annotations=' * ''
})

export const getServerToServerAccessToken = async () => {
  const oauthClient = new SimpleOAuth2.ClientCredentials({
    client: {
      id: config.get('entraClientId'),
      secret: config.get('entraClientSecret')
    },
    auth: {
      tokenHost: config.get('dataverseUrl'),
      tokenPath: `${config.get('entraOAuthUrl')}/oauth2/v2.0/token`
    },
    options: {
      authorizationMethod: 'body',
      bodyFormat: 'form'
    }
  })

  const { token } = await oauthClient.getToken({
    scope: `${config.get('dataverseUrl')}/.default`
  })

  return token.access_token
}

export * from '~/src/helpers/dataverse/contacts'

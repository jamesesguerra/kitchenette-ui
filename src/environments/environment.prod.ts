export const environment = {
  production: true,
  auth0: {
    domain: 'dev-qz3wlm2o81hgtfzp.us.auth0.com',
    clientId: '8y0CzWN4MoP7BAmqPrnvm8teIjQOUpwW',
    authorizationParams: {
      redirect_uri: 'https://kitchenet.vercel.app/callback',
    },
    errorPath: '/callback',
  },
  baseApiUrl: 'https://kitchenet.azurewebsites.net'
};

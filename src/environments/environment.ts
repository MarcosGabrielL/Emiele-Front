// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
  ,
   baseUrl : 'https://emiele-service-security.herokuapp.com',
   baseUrlVendas : 'https://emiele-service-vendas.herokuapp.com',
   AppID: "3843631125520319",
   SECRET_KEY: "nL7zr0VyFOtgUQu4YEmR4xYSMOgqLStz",
   accessToken: "APP_USR-3843631125520319-042518-e8d37d5c3f410238d5b745ff6c424dcc-69325226",
   autorizationUrl: "https://auth.mercadopago.com.ar/authorization?client_id=3843631125520319&response_type=code&platform_id=mp&redirect_uri=https://emiele-service-vendas.herokuapp.com/generic"
};

 

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

const config = { development: {
    secret: 'I_AME_LOGISTICS_FROM_TALYA_!@#$%^&*(',
    MONGO_URI: 'mongodb://localhost/talyaa_api',
    port: 5000,
 

},
};
export const getConfig = (env) => config[env] || config.development;
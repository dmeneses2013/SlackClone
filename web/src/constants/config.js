let PROD_API = 'https://intense-plateau-37336.herokuapp.com/api';
let LOCAL_API = 'http://localhost:4000/api';

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

const ENV = process.env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT : PRODUCTION;
const API = ENV === DEVELOPMENT ?  LOCAL_API : PROD_API;

export default API;

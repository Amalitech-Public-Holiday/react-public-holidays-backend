const Pool = require('pg').Pool;
const db = new Pool({
    user: 'me',
    host :'localhost',
    database: 'react_public_holidays',
    password: 'prince.asamoah@29',
    port: 5432
});
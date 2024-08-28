const app = require('./app'); 
const dotenv = require('dotenv');
const connect_Database=require('./config/database');
const cors = require('cors');
dotenv.config({ path: 'backend/config/config.env' });
connect_Database();
const PORT = process.env.PORT ; 
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

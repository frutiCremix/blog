const express = require("express");
require('./firebase')
const router=require('./src/routes/router.js')
const path=require('path')
const cors=require('cors')


const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);
app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});

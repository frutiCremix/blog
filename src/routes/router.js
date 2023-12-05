const router=require('express').Router();

const {setArticles}=require('../controllers/setArticles.js')
const {getArticle,getArticles,getMarkDown}=require('../controllers/getArticles.js')
//const {cargarArchivo}=require('../controllers/uploadFile.js')
const {upload,uploadFile}=require('../controllers/upload');
const logout =require('../controllers/logout.js');
const auth=require('../controllers/auth.js')



router.get('/get/:id',getArticle);
router.get('/getAll',getArticles);
router.post('/obtener-articulo',getMarkDown);
router.post('/cargar',upload,uploadFile);
router.post('/authenticate',auth);
router.post('/logout',logout);


module.exports=router;

const {db}=require('../../firebase.js')

async function setArticles(req,res){
    const {titulo,desc,url,imgUrl}=req.body;
               
            res.send('cargado correctamente')
            const fecha=new Date();
            const dia=fecha.getDate();
            const mes=fecha.getMonth()+1;
            const anio=fecha.getFullYear();
            
            try{
               await db.collection('posts').add({
                titulo,
                desc,
                url,
                imgUrl,
                fecha:`${dia}/${mes}/${anio}`
            })
            }catch(error){
                console.log(error)
                res.status(500).send('error al cargar los datos')
            }
    }
    
module.exports={setArticles}
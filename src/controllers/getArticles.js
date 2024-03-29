const { collection } = require('@firebase/firestore');
const {db,st}=require('../../firebase.js')
const axios = require('axios');
async function getArticles(req,res){
  
        const querySnapshot=await db.collection('posts').orderBy('fecha','desc').get()
        const datos=querySnapshot.docs.map(e=>({
            id:e.id,
            ...e.data()
        }));
        res.send(datos)
}
async function getArticle(req,res){
    const {id}= req.params;
    //id=Rw1g0cv3f4RV1lH9Tas3
    try{
      const idFormateado=id.split('=')[1];
      const docRef= db.collection('posts').doc(`${id}`);
      const doc=await docRef.get();
      if(!doc.exists){
        return res.status(404).json({message:"no se encontraron datos"})
    }
    return res.send(doc.data());
  }catch(error){
    return res.status(500).json({message:"error del servidor",error:error})
  }
}


async function getMarkDown(req, res) {
    const { url } = req.body;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.status(500).send('Error al obtener el archivo Markdown');
      }
    } catch (error) {
      console.error('Error al obtener el archivo Markdown:', error);
      res.status(500).send('Error al obtener el archivo Markdown');
    }
  }

module.exports={
    getArticles,getArticle,getMarkDown
}
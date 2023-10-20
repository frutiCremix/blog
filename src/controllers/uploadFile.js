const { db,st,getDownloadURL}= require ("../../firebase.js")
const { uploadBytes, ref } = require('firebase-admin/storage'); // Importa uploadBytes y ref
const { v4 }=require("uuid");
const axios = require('axios');

function cargarArchivo(req, res) {
  const titulo = req.body.titulo;
  const desc = req.body.desc;
 
 console.log(titulo,desc,file,img)
    res.send("datos")
   
}

async function guardarUrlYDatos(titulo, desc, urlFile, urlImg,res) {
  console.log("Guardando URL:", urlFile, "con título:", titulo);

  try {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    await db.collection('posts').add({
      titulo,
      desc,
      url: urlFile,
      imgUrl: urlImg,
      fecha: `${dia}/${mes}/${anio}`
    });

    console.log("Datos almacenados correctamente");
    res.status(200).json({ message: "Datos almacenados correctamente en BD" });
  } catch (error) {
    console.error("error al cargar los datos: ", error);
    res.status(500).json({ message: "Error al cargar los datos" });
  }
}
module.exports={cargarArchivo}/* const myRef = ref(st,v4());
const myRefImg = ref(st,v4());
try {
  const snapshot = await uploadBytes(myRef, file);
  const fileRef = snapshot.ref;
  const urlFile = await getDownloadURL(fileRef);
  console.log("archivo cargado correctamente", urlFile);

  const imgSnapshot = await uploadBytes(myRefImg, img);
  const imgRef = imgSnapshot.ref;
  const urlImg = await getDownloadURL(imgRef);
  console.log("archivo cargado correctamente", urlImg);

  guardarUrlYDatos(titulo, desc, urlFile, urlImg, res);
  res.status(200).json({ message: "Archivo cargado correctamente" });
} catch (error) {
  console.error("error al cargar el archivo: ", error);
  res.status(500).json({ message: "Error al cargar el archivo" });
}*/
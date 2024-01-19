const multer = require("multer");
const {
  db,
  st,
  collection,
  getDocs,
  addDoc,
  getDownloadURL,
  uploadBytes,
  ref,
  uploadBytesResumable,
} = require("../../firebase.js");

// Importa uploadBytes y ref
const { v4 } = require("uuid");
const axios = require("axios");

const storage2 = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder;

    // Determinar la carpeta de destino según el tipo de archivo
    if (file.fieldname === "imagen") {
      uploadFolder = "imagenes";
    } else if (file.fieldname === "archivoMD") {
      uploadFolder = "markdown";
    } else {
      // Otros tipos de archivos pueden ir a una carpeta predeterminada
      uploadFolder = "archivos";
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Mantén el nombre original del archivo
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage2});
exports.upload = upload.fields([
  { name: "titulo", maxCount: 1 },
  { name: "desc", maxCount: 1 },
  { name: "archivoMD", maxCount: 1 },
  { name: "imagen", maxCount: 1 },
]);
////fin de configuracion multer//////////////

exports.uploadFile = async (req, res) => {
  const titulo = req.body.titulo;
  const desc = req.body.desc;
  const archivoMD = req.files["archivoMD"][0];
  const imagen = req.files["imagen"][0];
  
  if (archivoMD != undefined || imagen != undefined) {
    
    const storageRef = ref(st, `markdown/${v4()}`);
    const storageRefImg = ref(st, `imagenes/${v4()}`);

    try {
      const snapshot = await uploadBytes(storageRef, archivoMD.buffer);
      const fileRef = snapshot.ref;

      const urlFile = await getDownloadURL(fileRef);
      //console.log("archivo cargado correctamente", urlFile);

      const imgSnapshot = await uploadBytes(storageRefImg, imagen.buffer);
      const imgRef = imgSnapshot.ref;
      const urlImg = await getDownloadURL(imgRef);
      //console.log("archivo cargado correctamente", urlImg);

      guardarUrlYDatos(titulo, desc, urlFile, urlImg, res);

      res.status(200).json({ message: "Archivo cargado correctamente" });
    } catch (error) {
      console.error("error al cargar el archivo: ", error);
      res.status(500).json({ message: "Error al cargar el archivo" });
    }
  } else {
    console.log("archivos undefined");
  }
};

async function guardarUrlYDatos(titulo, desc, urlFile, urlImg, res) {
  //console.log("Guardando URL:", urlFile, "con título:", titulo);

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  await db.collection("posts").add({
    titulo,
    desc,
    url: urlFile,
    urlImg: urlImg,
    fecha: `${dia}/${mes}/${anio}`,
  });
  //hacer el logout automatico
  //console.log("Datos almacenados correctamente");
}

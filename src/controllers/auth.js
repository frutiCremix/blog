const { auth, signInWithEmailAndPassword } = require('../../firebase');

const isLogin = async (req, res) => {
  try {
    // Extrae las credenciales de la solicitud
    const { email, password } = req.body;
   

    // Realiza la autenticación con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Obtiene el usuario autenticado
    const userObj = userCredential.user;


    // Genera el token con las opciones usando el objeto auth
    const token = await userObj.getIdToken();

    // Devuelve el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(401).json({ error: 'Autenticación fallida' });
  }
};

module.exports = isLogin;

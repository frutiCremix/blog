const { auth,signOut} = require('../../firebase')

async function logout(req,res){
    try {
        await signOut(auth);
        res.status(200).json({ message: "Sesión cerrada correctamente" });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ error: "Error al cerrar sesión" });
      }

}
module.exports=logout;
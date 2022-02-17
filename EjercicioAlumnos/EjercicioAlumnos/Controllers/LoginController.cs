using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using EjercicioAlumnos.Models;



namespace EjercicioAlumnos.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public int ValidaUsuario(string usuario, string contra)
        {
            int respuesta = 0;
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            try
            {
                //DECLARO LA CONTRASEÑA PARA QUE COINCIDA DESPUES LE AGREGAREMOS EL CIFRADO
                ////PARA CIFRAR LA VARIABLE DE LA CONTRASEÑA
                SHA256Managed sha = new SHA256Managed();
                ////obtengo los bites de la clave en una clave no cifrada
                byte[] clavenocifrada = Encoding.Default.GetBytes(contra);
                ////hago un cifrado de la clave
                byte[] clavecifrada = sha.ComputeHash(clavenocifrada);
                ////reemplazo los - que se insertan entre los caracteres y les pongo nada, asi tenemos la clave cifrada
                string Contraseñacifrada = BitConverter.ToString(clavecifrada).Replace("-", "");
                //string Contraseñacifrada = "123456";
                respuesta = bd.Usuario.Where(p => p.NombreUsuario == usuario && p.Contraseña == Contraseñacifrada ).Count();

                if (respuesta == 1)
                {
                    //DECLARO LAS VARIABLE DE SESION
                    ////BUSCO EL ID DEL ALUMNO/PERSONAL
                    Session["idbusqueda"] = bd.Usuario.Where(p => p.NombreUsuario == usuario && p.Contraseña == Contraseñacifrada ).First().Id_AlumnoPersonal;
                    //BUSCO EL TIPO DE USUARIO DOCENTE/ALUMNO/PERSONAL
                    Session["tipousuario"] = bd.Usuario.Where(p => p.NombreUsuario == usuario && p.Contraseña == Contraseñacifrada).First().TipoUsuario;
                }

            }
            catch (Exception ex)
            {
                respuesta = 0;
            }
            return respuesta;

        }

        //PARA EL CERRAR DEL LOGIN
        public ActionResult Cerrar()
        {
            return RedirectToAction("Index");
        }
    }
}
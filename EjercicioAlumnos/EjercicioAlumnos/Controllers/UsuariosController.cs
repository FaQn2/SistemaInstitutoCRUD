using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;
using EjercicioAlumnos.Models;

namespace EjercicioAlumnos.Controllers
{
    public class UsuariosController : Controller
    {
        // GET: Usuarios
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaUsuario()
        {
            //FIJARSE COMO SE ARMA LA FECHA EN LO QUE SE LLAMA CASTEO DEL C#
            //TENER EN CUENTA QUE EN LA LISTA EN EL JAVASCRIPT SE COLOCA EL NOMBRE DE LA VARIABLE EN LUGAR DEL NOMBRE
            //DEL CAMPO QUE CONTIENE A LA FECHA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Usuario.Where(p => p.Activo.Equals(1))
            .Select(p => new
            {
                p.NombreUsuario,
                p.Apellido,
                p.Nombres,
                p.Id_usuario,

            }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult TraerDatosUsuario(int idbusqueda)
        {
            //FIJARSE COMO SE ARMA LA FECHA EN LO QUE SE LLAMA CASTEO DEL C#
            //TENER EN CUENTA QUE EN LA LISTA EN EL JAVASCRIPT SE COLOCA EL NOMBRE DE LA VARIABLE EN LUGAR DEL NOMBRE
            //DEL CAMPO QUE CONTIENE A LA FECHA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Usuario.Where(p => p.Activo.Equals(1) && p.Id_usuario.Equals(idbusqueda))
            .Select(p => new {
                p.NombreUsuario,
                p.Nombres,
                p.Apellido,
                p.TipoUsuario,
                p.Id_usuario,
                p.Contraseña,
                p.Activo
            }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BuscaxApellido(string Apellido)
        {
            //PARA LA BUSQUEDA DEL USUARIO POR APELLIDO
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Usuario.Where(p => p.Activo.Equals(1) && p.Apellido.Contains(Apellido))
            .Select(p => new { p.NombreUsuario, p.Nombres, p.Apellido, p.Contraseña, p.TipoUsuario, p.Id_usuario }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscaxTipoUsuario(int idtipoUsuario)
        {
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var consulta = from TipoUsuario in bd.Usuario
                           where TipoUsuario.TipoUsuario.Equals(idtipoUsuario) && TipoUsuario.Activo.Equals(1)
                           select (new { TipoUsuario.NombreUsuario, TipoUsuario.Apellido, TipoUsuario.Nombres, TipoUsuario.Id_usuario });

            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        //OTRA FORMA DE HACER LAS CONSULTAS
        public JsonResult ListaTipoPersonal()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS USUARIOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from tipousuario in bd.TipoUsuario
                         where tipousuario.Activo.Equals(1)
                         select new
                         {
                             tipousuario.Id_tipousuario,
                             tipousuario.Nombre,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //PARA LLENAR EL COMBO DE TIPOS DE USUARIOS
        public JsonResult ListaTipoUsuario()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS USUARIOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from TipoUsuario in bd.TipoUsuario
                         where TipoUsuario.Activo.Equals(1)
                         select new
                         {
                             TipoUsuario.Id_tipousuario,
                             TipoUsuario.Nombre,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int GuardaUsuarios(Usuario DatoUsuario)
        {
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            int registros = 0;
            try
            {
                if (DatoUsuario.Id_usuario == 0)
                {
                    int control = bd.Usuario.Where(p => p.NombreUsuario.Equals(DatoUsuario.NombreUsuario)).Count();
                    if (control == 0)
                    {
                        //asigno a una variable
                        string clave = DatoUsuario.Contraseña;
                        //instancio el sha256managed , hay que agregar un using using System.Security.Cryptography;
                        SHA256Managed sha = new SHA256Managed();
                        //obtengo los bites de la clave en una clave no cifrada
                        byte[] clavenocifrada = Encoding.Default.GetBytes(clave);
                        //hago un cifrado de la clave
                        byte[] clavecifrada = sha.ComputeHash(clavenocifrada);
                        //reemplazo los - que se insertan entre los caracteres y les pongo nada, asi tenemos la clave cifrada
                        DatoUsuario.Contraseña = BitConverter.ToString(clavecifrada).Replace("-", "");
                        //Agrega en la tabla Usuarios
                        bd.Usuario.InsertOnSubmit(DatoUsuario);
                        bd.SubmitChanges();
                        registros = 1;
                    }
                    else
                    {
                        registros = -1;
                    }

                }
                else
                {

                    //LA EXPRESION LAMDA PARA QUE NOS TRAIGA LA PRIMER FILA QUE ENCUENTRA CON ESE ID DE USUARIO
                    //LA GUARDO EN LA VARIABLE AlumnoseleccionadoSS
                    Usuario Usuarioseleccionado = bd.Usuario.Where(p => p.Id_usuario.Equals(DatoUsuario.Id_usuario)).First();
                    //HAGO EL REEMPLAZO DE LO QUE VIENE EN DatoEspecialidadCursado Y LO ASIGNO A Especialidadseleccionado
                    //PARA EL CIFRADO DE LA CLAVE
                    //asigno a una variable
                    string clave = DatoUsuario.Contraseña;
                    //instancio el sha256managed , hay que agregar un using using System.Security.Cryptography;
                    SHA256Managed sha = new SHA256Managed();
                    //obtengo los bites de la clave en una clave no cifrada
                    byte[] clavenocifrada = Encoding.Default.GetBytes(clave);
                    //hago un cifrado de la clave
                    byte[] clavecifrada = sha.ComputeHash(clavenocifrada);
                    //reemplazo los - que se insertan entre los caracteres y les pongo nada, asi tenemos la clave cifrada
                    Usuarioseleccionado.NombreUsuario = DatoUsuario.NombreUsuario;
                    Usuarioseleccionado.Nombres = DatoUsuario.Nombres;
                    Usuarioseleccionado.Apellido = DatoUsuario.Apellido;
                    Usuarioseleccionado.Contraseña = BitConverter.ToString(clavecifrada).Replace("-", "");
                    Usuarioseleccionado.TipoUsuario = DatoUsuario.TipoUsuario;
                    Usuarioseleccionado.Activo = 1;
                    //CONFIRMO LOS CAMBIOS
                    bd.SubmitChanges();
                    registros = 1;

                }
            }
            catch (Exception ex)
            {
                registros = 0;
            }
            return registros;

        }
       
    }
}
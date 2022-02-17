using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EjercicioAlumnos.Models;

namespace EjercicioAlumnos.Controllers
{

    public class PaginaPrincipalController : Controller
    {
        // GET: PaginaPrincipal
        public ActionResult Index()
        {
            //DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            //int idalumnopersonal = Convert.ToInt16(Session["idbusqueda"]);
            //int tipousuario = Convert.ToInt16(Session["tipousuario"]);
            //var identificadorusuario = bd.TipoUsuario.Where(p => p.Id_tipousuario == tipousuario).First().Identificador;
            //string nombreusuario = "";
            //if (identificadorusuario == 'A')
            //{
            //    Alumno oalumno = bd.Alumno.Where(p => p.a_idalumno == idalumnopersonal).First();
            //    nombreusuario = oalumno.a_apellido + " " + oalumno.a_nombre;
            //    ViewBag.NombreUsuario = nombreusuario;
            //    ViewBag.IdUsuario = idalumnopersonal;
            //}
            //else
            //{
            //    PersonalDocenteNoDocente opersonal = bd.PersonalDocenteNoDocente.Where(p => p.Id_personal == idalumnopersonal ).First();
            //    nombreusuario = opersonal.Apellido + " " + opersonal.Nombre;
            //    ViewBag.NombreUsuario = nombreusuario;
            //    ViewBag.IdUsuario = idalumnopersonal;
                
            //}
            return View();
        }
    }
}
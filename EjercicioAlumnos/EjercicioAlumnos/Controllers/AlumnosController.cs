using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EjercicioAlumnos.Models;
namespace EjercicioAlumnos.Controllers
{
    public class AlumnosController : Controller
    {
        // GET: Alumnos
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista_Alumno

        //ARMO LA LISTA DE ALUMNOS CON SOLO LOS DATOS GENERALES
        public JsonResult ListaAlumno()
        {
            //FIJARSE COMO SE ARMA LA FECHA EN LO QUE SE LLAMA CASTEO DEL C#
            //TENER EN CUENTA QUE EN LA LISTA EN EL JAVASCRIPT SE COLOCA EL NOMBRE DE LA VARIABLE EN LUGAR DEL NOMBRE
            //DEL CAMPO QUE CONTIENE A LA FECHA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Alumno.Where(p => p.a_activo.Equals(1))
            .Select(p => new
            {
                p.a_nrodocumento,
                p.a_apellido,
                p.a_nombre,
                fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(),
                p.a_idalumno
            }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        //FUNCION PARA RECUPERAR LOS DATOS DE LA TABLA CON EL EDITAR
        //USANDO EL ID QUE LE PASAMOS COMO PARAMETRO
        public JsonResult TraerDatos(int idbusqueda)
        {
            //FIJARSE COMO SE ARMA LA FECHA EN LO QUE SE LLAMA CASTEO DEL C#
            //TENER EN CUENTA QUE EN LA LISTA EN EL JAVASCRIPT SE COLOCA EL NOMBRE DE LA VARIABLE EN LUGAR DEL NOMBRE
            //DEL CAMPO QUE CONTIENE A LA FECHA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Alumno.Where(p => p.a_activo.Equals(1) && p.a_idalumno.Equals(idbusqueda))
            .Select(p => new {
                p.a_idalumno,
                p.a_id_tipo_documento,
                p.a_nrodocumento,
                p.a_nombre,
                p.a_apellido,
                fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(),
                p.a_sexo,
                p.a_direccion,
                p.a_id_ciudadnacimiento,
                p.a_idpcianacimiento,
                p.a_idpaisnacimiento,
                p.a_mail,
                p.a_cuil,
                p.a_telefonofijo,
                p.a_telefonocelular,
                p.a_contactoemergencia,
                p.a_direccionresidencia,
                p.a_idciudadresidencia,
                p.a_pciaresidencia,
                p.a_paisresidencia,
                p.Idtipousuario,
                p.a_telefonofijoresidencia,
                p.a_telefonocelularresidencia,
                p.a_activo,
                fechaaltasistema = ((DateTime)p.a_fechaaltasistema).ToShortDateString(),
                fechaultimaactualizacion = ((DateTime)p.a_fechaultimaactualizacion).ToShortDateString(),
            }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscaxApellido(string Apellido)
        {
            //PARA LA BUSQUEDA DEL ALUMNO POR APELLIDO
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Alumno.Where(p => p.a_activo.Equals(1) && p.a_apellido.Contains(Apellido))
            .Select(p => new { p.a_nrodocumento, p.a_apellido, p.a_nombre, fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(), p.a_idalumno }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Lista(string Apellido)
        {
            //PARA LA BUSQUEDA DEL ALUMNO POR APELLIDO
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Alumno.Where(p => p.a_activo.Equals(1) && p.a_apellido.Contains(Apellido))
            .Select(p => new { p.a_nrodocumento, p.a_apellido, p.a_nombre, fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(), p.a_idalumno }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscaxDocumento(string NroDocumento)
        {
            //PARA LA BUSQUEDA DEL ALUMNO POR DOCUMENTO
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = bd.Alumno.Where(p => p.a_activo.Equals(1) && p.a_nrodocumento.Contains(NroDocumento))
            .Select(p => new { p.a_nrodocumento, p.a_apellido, p.a_nombre, fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(), p.a_idalumno }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //PARA LLENAR EL COMBO DE SEXO
        public JsonResult ListaSexo()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from Sexo in bd.Sexo
                         where Sexo.Activo.Equals(1)
                         select new
                         {
                             Sexo.Id_sexo,
                             Sexo.Descripcion,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //PARA LLENAR EL COMBO DE TIPOS DE USUARIOS
        public JsonResult ListaTipoUsuario()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
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

        //PARA LLENAR EL COMBO DE TIPOS DE DOCUMENTOS
        public JsonResult ListaDocumento()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from TipoDocumento in bd.TipoDocumento
                         where TipoDocumento.Activo.Equals(1)
                         select new
                         {
                             TipoDocumento.Id_tipodocumento,
                             TipoDocumento.Descripcion,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaCiudad()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from ciudad in bd.Ciudad
                         where ciudad.Activo.Equals(1)
                         select new
                         {
                             ciudad.id_ciudad,
                             ciudad.Nombre,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaProvincia()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from provincia in bd.Provincia
                         where provincia.Activo.Equals(1)
                         select new
                         {
                             provincia.id_provincia,
                             provincia.Descripcion,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaPais()
        {
            //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            var lista = (from pais in bd.Pais
                         where pais.Activo.Equals(1)
                         select new
                         {
                             pais.Id_pais,
                             pais.Descripcion,
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int GuardaAlumno(Alumno DatoAlumno)
        {
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
            int registros = 0;
            try
            {
                //SI EL ID ES 0 ES PORQUE ES NUEVO EL REGISTRO
                if (DatoAlumno.a_idalumno == 0)
                {
                    int control = bd.Alumno.Where(p => p.a_nrodocumento.Equals(DatoAlumno.a_nrodocumento)).Count();
                    if (control == 0)
                    {
                        //Agrega en la tabla Alumnos
                        bd.Alumno.InsertOnSubmit(DatoAlumno);
                        bd.SubmitChanges();
                        registros = 1;
                    }
                    else
                    {
                        registros = -1;
                    }

                }
                //SI ES UNA EDICION DE REGISTRO
                else
                {
                    //LA EXPRESION LAMDA PARA QUE NOS TRAIGA LA PRIMER FILA QUE ENCUENTRA CON ESE ID DE ALUMNO
                    //LA GUARDO EN LA VARIABLE Alumnoseleccionado
                    Alumno Alumnoseleccionado = bd.Alumno.Where(p => p.a_idalumno.Equals(DatoAlumno.a_idalumno)).First();
                    //HAGO EL REEMPLAZO DE LO QUE VIENE EN DatoAlumno Y LO ASIGNO A Alumnoseleccionado

                    Alumnoseleccionado.a_nrodocumento = DatoAlumno.a_nrodocumento;
                    Alumnoseleccionado.a_id_tipo_documento = DatoAlumno.a_id_tipo_documento;
                    Alumnoseleccionado.a_nombre = DatoAlumno.a_nombre;
                    Alumnoseleccionado.a_apellido = DatoAlumno.a_apellido;
                    Alumnoseleccionado.a_fecha_nacimiento = DatoAlumno.a_fecha_nacimiento;
                    Alumnoseleccionado.a_direccion = DatoAlumno.a_direccion;
                    Alumnoseleccionado.a_id_ciudadnacimiento = DatoAlumno.a_id_ciudadnacimiento;
                    Alumnoseleccionado.a_idpcianacimiento = DatoAlumno.a_idpcianacimiento;
                    Alumnoseleccionado.a_idpaisnacimiento = DatoAlumno.a_idpaisnacimiento;
                    Alumnoseleccionado.a_mail = DatoAlumno.a_mail;
                    Alumnoseleccionado.a_cuil = DatoAlumno.a_cuil;
                    Alumnoseleccionado.a_telefonofijo = DatoAlumno.a_telefonofijo;
                    Alumnoseleccionado.a_telefonocelular = DatoAlumno.a_telefonocelular;
                    Alumnoseleccionado.a_contactoemergencia = DatoAlumno.a_contactoemergencia;
                    Alumnoseleccionado.a_direccionresidencia = DatoAlumno.a_direccionresidencia;
                    Alumnoseleccionado.a_idciudadresidencia = DatoAlumno.a_idciudadresidencia;
                    Alumnoseleccionado.a_pciaresidencia = DatoAlumno.a_pciaresidencia;
                    Alumnoseleccionado.a_paisresidencia = DatoAlumno.a_paisresidencia;
                    Alumnoseleccionado.a_sexo = DatoAlumno.a_sexo;
                    Alumnoseleccionado.Idtipousuario = DatoAlumno.Idtipousuario;
                    Alumnoseleccionado.a_telefonofijoresidencia = DatoAlumno.a_telefonofijoresidencia;
                    Alumnoseleccionado.a_telefonocelularresidencia = DatoAlumno.a_telefonocelularresidencia;
                    Alumnoseleccionado.a_fechaaltasistema = DatoAlumno.a_fechaaltasistema;
                    Alumnoseleccionado.a_fechaultimaactualizacion = DatoAlumno.a_fechaultimaactualizacion;
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

        //PARA ELIMINAR LOS ALUMNOS CAMBIANDO HABILITADO A NO HABILITADO USANDO GET
        public int EliminaAlumno(int id)
        {
            DatosAlumnosDataContext bd = new DatosAlumnosDataContext();

            int registros = 0;
            try
            {
                //LA EXPRESION LAMDA PARA QUE NOS TRAIGA LA PRIMER FILA QUE ENCUENTRA CON ESE ID DE ALUMNO
                //LA GUARDO EN LA VARIABLE Alumnoseleccionado
                Alumno Alumnoseleccionado = bd.Alumno.Where(p => p.a_idalumno.Equals(id)).First();
                //HAGO EL REEMPLAZO DE LO QUE VIENE EN DatoAlumno Y LO ASIGNO A Alumnoseleccionado  

                Alumnoseleccionado.a_activo = 0;
                Alumnoseleccionado.a_fechaultimaactualizacion = DateTime.Today;
                //CONFIRMO LOS CAMBIOS
                bd.SubmitChanges();
                registros = 1;
            }
            catch (Exception ex)
            {
                registros = 0;
            }
            return registros;

        }
    }
}
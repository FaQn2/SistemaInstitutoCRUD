using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EjercicioAlumnos.Models;

namespace EjercicioAlumnos.Controllers
{
    public class PersonalController : Controller
    {
        // GET: Personal
        public ActionResult Index()
        {
            return View();
        }
    
    //ARMO LA LISTA DE ALUMNOS CON SOLO LOS DATOS GENERALES
    public JsonResult ListaDocente()
    {
        //FIJARSE COMO SE ARMA LA FECHA EN LO QUE SE LLAMA CASTEO DEL C#
        //TENER EN CUENTA QUE EN LA LISTA EN EL JAVASCRIPT SE COLOCA EL NOMBRE DE LA VARIABLE EN LUGAR DEL NOMBRE
        //DEL CAMPO QUE CONTIENE A LA FECHA
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        var lista = bd.PersonalDocenteNoDocente.Where(p => p.Activo.Equals(1) )
        .Select(p => new {
            p.Nrodocumento,
            p.Apellido,
            p.Nombre,
            fechanacimiento = ((DateTime)p.Fechanacimiento).ToShortDateString(),
            p.Id_personal
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
        var lista = bd.PersonalDocenteNoDocente.Where(p => p.Activo.Equals(1)  && p.Id_personal.Equals(idbusqueda) )
        .Select(p => new {
            p.Id_personal,
            p.Idtipopersonal,
            p.Tipodocumento,
            p.Nrodocumento,
            p.Cuil,
            p.Apellido,
            p.Nombre,
            fechanacimiento = ((DateTime)p.Fechanacimiento).ToShortDateString(),
            p.Sexo,
            p.Direccion,
            p.Barrio,
            p.Idciudad,
            p.Idprovincia,
            p.Idpais,
            p.Email,
            p.Telefonofijo,
            p.Telefonocelular,
            p.Ciudadnacimiento,
            p.Provincianacimiento,
            p.Paisnacimiento,
            p.Idtipousuario,
            
            p.Activo,
            fechaaltasistema = ((DateTime)p.Fechaalta).ToShortDateString(),
            fechaultimaactualizacion = ((DateTime)p.Fechaactualizacion).ToShortDateString(),
            p.Observaciones,
        }).ToList();
        return Json(lista, JsonRequestBehavior.AllowGet);
    }

    public JsonResult BuscaxApellido(string Apellido)
    {
        //PARA LA BUSQUEDA DEL ALUMNO POR APELLIDO
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        var lista = bd.PersonalDocenteNoDocente.Where(p => p.Activo.Equals(1)  && p.Apellido.Contains(Apellido) )
        .Select(p => new { p.Nrodocumento, p.Apellido, p.Nombre, fechanacimiento = ((DateTime)p.Fechanacimiento).ToShortDateString(), p.Id_personal }).ToList();
        return Json(lista, JsonRequestBehavior.AllowGet);
    }

    //public JsonResult Lista(string Apellido)
    //{
    //   //PARA LA BUSQUEDA DEL ALUMNO POR APELLIDO
    //    DatosInstitutoDataContext bd = new DatosInstitutoDataContext();
    //    var lista = bd.Alumno.Where(p => p.a_activo.Equals(1) && p.a_apellido.Contains(Apellido))
    //    .Select(p => new { p.a_nrodocumento, p.a_apellido, p.a_nombre, fechanacimiento = ((DateTime)p.a_fecha_nacimiento).ToShortDateString(), p.a_idalumno }).ToList();
    //    return Json(lista, JsonRequestBehavior.AllowGet);
    //}

    public JsonResult BuscaxDocumento(string NroDocumento)
    {
        //PARA LA BUSQUEDA DEL ALUMNO POR DOCUMENTO
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        var lista = bd.PersonalDocenteNoDocente.Where(p => p.Activo.Equals(1)  && p.Nrodocumento.Contains(NroDocumento))
        .Select(p => new { p.Nrodocumento, p.Apellido, p.Nombre, fechanacimiento = ((DateTime)p.Fechanacimiento).ToShortDateString(), p.Id_personal }).ToList();
        return Json(lista, JsonRequestBehavior.AllowGet);
    }


    //public JsonResult ListaCarrera()
    //{
    //    //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
    //    //DatosInstitutoDataContext bd = new DatosInstitutoDataContext();
    //    var lista = bd.PlanEstudio.Where(p => p.Activo.Equals(1))
    //    .Select(p => new
    //    {
    //        p.Id_planestudio,
    //        p.Descripcion,
    //    }).ToList();
    //    return Json(lista, JsonRequestBehavior.AllowGet);
    //}

    //OTRA FORMA DE HACER LAS CONSULTAS
    public JsonResult ListaTipoPersonal()
    {
        //PARA EL ARMADO DEL COMBO DE CARRERAS PARA LA BUSQUEDA DE LOS ALUMNOS POR CARRERA
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        var lista = (from tipopersonal in bd.TipoPersonal
                     where tipopersonal.Activo.Equals(1)
                     select new
                     {
                         tipopersonal.Id_tipopersonal,
                         tipopersonal.Descripcion,
                     }).ToList();
        return Json(lista, JsonRequestBehavior.AllowGet);
    }




    //PARA LLENAR EL COMBO DE TIPOS DE DOCUMENTOS
    public JsonResult ListaDocumento()
    {
        //PARA EL ARMADO DEL COMBO DE DOCUMENTOS
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

    public JsonResult BuscaxTipoPersonal(int idtipopersonal)
    {
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        var consulta = from tipopersonal in bd.PersonalDocenteNoDocente
                       where tipopersonal.Idtipopersonal.Equals(idtipopersonal) && tipopersonal.Activo.Equals(1) 
                       select (new { tipopersonal.Nrodocumento, tipopersonal.Apellido, tipopersonal.Nombre, fechanacimiento = ((DateTime)tipopersonal.Fechanacimiento).ToShortDateString(), tipopersonal.Id_personal });

        return Json(consulta, JsonRequestBehavior.AllowGet);
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

    public int GuardaDocente(PersonalDocenteNoDocente DatoDocente)
    {
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();
        int registros = 0;
        try
        {
            //SI EL ID ES 0 ES PORQUE ES NUEVO EL REGISTRO
            if (DatoDocente.Id_personal == 0)
            {
                bd.PersonalDocenteNoDocente.InsertOnSubmit(DatoDocente);
                bd.SubmitChanges();
                registros = 1;
            }
            //SI ES UNA EDICION DE REGISTRO
            else
            {
                //LA EXPRESION LAMDA PARA QUE NOS TRAIGA LA PRIMER FILA QUE ENCUENTRA CON ESE ID DE ALUMNO
                //LA GUARDO EN LA VARIABLE Alumnoseleccionado
                PersonalDocenteNoDocente Docenteseleccionado = bd.PersonalDocenteNoDocente.Where(p => p.Id_personal.Equals(DatoDocente.Id_personal) ).First();
                //HAGO EL REEMPLAZO DE LO QUE VIENE EN DatoDocente Y LO ASIGNO A Docenteseleccionado
                Docenteseleccionado.Idtipopersonal = DatoDocente.Idtipopersonal;
                Docenteseleccionado.Tipodocumento = DatoDocente.Tipodocumento;
                Docenteseleccionado.Nrodocumento = DatoDocente.Nrodocumento;
                Docenteseleccionado.Cuil = DatoDocente.Cuil;
                Docenteseleccionado.Apellido = DatoDocente.Apellido;
                Docenteseleccionado.Nombre = DatoDocente.Nombre;
                Docenteseleccionado.Fechanacimiento = DatoDocente.Fechanacimiento;
                Docenteseleccionado.Sexo = DatoDocente.Sexo;
                Docenteseleccionado.Direccion = DatoDocente.Direccion;
                Docenteseleccionado.Barrio = DatoDocente.Barrio;
                Docenteseleccionado.Idciudad = DatoDocente.Idciudad;
                Docenteseleccionado.Idprovincia = DatoDocente.Idprovincia;
                Docenteseleccionado.Idpais = DatoDocente.Idpais;
                Docenteseleccionado.Idtipousuario = DatoDocente.Idtipousuario;
                Docenteseleccionado.Email = DatoDocente.Email;
                Docenteseleccionado.Telefonofijo = DatoDocente.Telefonofijo;
                Docenteseleccionado.Telefonocelular = DatoDocente.Telefonocelular;
                Docenteseleccionado.Ciudadnacimiento = DatoDocente.Ciudadnacimiento;
                Docenteseleccionado.Provincianacimiento = DatoDocente.Provincianacimiento;
                Docenteseleccionado.Paisnacimiento = DatoDocente.Paisnacimiento;
                Docenteseleccionado.Idtipousuario = DatoDocente.Idtipousuario;
                
                Docenteseleccionado.Fechaalta = DatoDocente.Fechaalta;
                Docenteseleccionado.Fechaactualizacion = DatoDocente.Fechaactualizacion;

                Docenteseleccionado.Observaciones = DatoDocente.Observaciones;
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
    public int EliminaDocente(int id)
    {
        DatosAlumnosDataContext bd = new DatosAlumnosDataContext();

        int registros = 0;

        try
        {
            //LA EXPRESION LAMDA PARA QUE NOS TRAIGA LA PRIMER FILA QUE ENCUENTRA CON ESE ID DE ALUMNO
            //LA GUARDO EN LA VARIABLE Alumnoseleccionado
            PersonalDocenteNoDocente Docenteseleccionado = bd.PersonalDocenteNoDocente.Where(p => p.Id_personal.Equals(id) ).First();
            //HAGO EL REEMPLAZO DE LO QUE VIENE EN DatoAlumno Y LO ASIGNO A Alumnoseleccionado  
            Docenteseleccionado.Activo = 0;
            Docenteseleccionado.Fechaactualizacion = DateTime.Today;
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

//FORMATEO LAS FECHAS PAREA QUE SALGA EL ALMANAQUE
$("#fechanacimiento").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

$("#fechaalta").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

$("#fechamodificacion").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    });

//ESTAS SON LLAMADAS ASINCRONAS
//LLAMO A LA FUNCION LISTAR PARA EL LISTADO GENERAL
listar();

//CREO LA FUNCION PARA EL LISTADO GENERAL
function listar() {
    $.get("Personal/ListaDocente", function (data) {
        crearlistado(data);
    });
}

//PARA LLENAR EL COMBOBOX DE TIPO DE PERSONAL
$.get("/Personal/ListaTipoPersonal", function (data) {
    var contenido = "";
    contenido += "<option value=''>---SELECCIONE OPCION---</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_tipopersonal + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbotipopersonal").innerHTML = contenido;
    document.getElementById("cbotipopersonaldocente").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE TIPOS DE DOCUMENTOS
$.get("Personal/ListaDocumento", function (data) {
    var contenido = "";
    contenido += "<option value=''> TIPO DOCUMENTO</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_tipodocumento + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbodocumento").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE TIPOS DE SEXO
$.get("Personal/ListaSexo", function (data) {
    var contenido = "";
    contenido += "<option value=''>  SEXO  </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_sexo + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbosexo").innerHTML = contenido;
})

//PARA LLENAR EL COMBOBOX DE CIUDAD
$.get("Personal/ListaCiudad", function (data) {
    var contenido = "";
    contenido += "<option value=''>  CIUDAD  </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].id_ciudad + "'>";
        contenido += data[i].Nombre;
        contenido += "</option>";
    }
    document.getElementById("cbociudad").innerHTML = contenido;
    document.getElementById("cbociudadresidencia").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE PROVINCIA
$.get("Personal/ListaProvincia", function (data) {
    var contenido = "";
    contenido += "<option value=''>  PROVINCIA  </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].id_provincia + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbopcia").innerHTML = contenido;
    document.getElementById("cbopciaresidencia").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE PAIS
$.get("Personal/ListaPais", function (data) {
    var contenido = "";
    contenido += "<option value=''>    PAIS    </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_pais + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbopais").innerHTML = contenido;
    document.getElementById("cbopaisresidencia").innerHTML = contenido;
})

//PARA LISTAR LOS TIPOS DE USUARIOS
$.get("Personal/ListaTipoUsuario", function (data) {
    var contenido = "";
    contenido += "<option value=''>TIPO DE USUARIO</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_tipousuario + "'>";
        contenido += data[i].Nombre;
        contenido += "</option>";
    }
    document.getElementById("cbotipousuario").innerHTML = contenido;
})

//BUSQUEDA SENSITIVA
//CAPTURO LO QUE EL BOTON BUSCAR PIDE
var cbotipopersonal = document.getElementById("cbotipopersonal");
cbotipopersonal.onchange = function () {
    var tipopersonal = document.getElementById("cbotipopersonal").value;
    //HAGO LA PREGUNTA PARA CUANDO NO SE SELECCIONE UNA OPCION DEL COMBO
    //O CUANDO SE SELECCIONE ---SELECCIONAR---
    if (tipopersonal == "") {
        listar();
    } else
        $.get("Personal/BuscaxTipoPersonal/?idtipopersonal=" + tipopersonal, function (data) {
            crearlistado(data);
        });

}

//BUSQUEDA SENSITIVA
//CAPTURO LO QUE EL TEXTBOX TIENE MIENTRAS SE ESCRIBE
var buscar = document.getElementById("txtbuscar");
buscar.onkeyup = function () {
    var Apellido = document.getElementById("txtbuscar").value;
    $.get("Personal/BuscaxApellido/?Apellido=" + Apellido, function (data) {
        crearlistado(data);
    });

}

//BUSQUEDA SENSITIVA PARA BUSQUEDA POR DOCUMENTO
//CAPTURO LO QUE EL TEXTBOX TIENE MIENTRAS SE ESCRIBE
var buscar = document.getElementById("txtbuscardoc");
buscar.onkeyup = function () {
    var documento = document.getElementById("txtbuscardoc").value;
    $.get("Personal/BuscaxDocumento/?NroDocumento=" + documento, function (data) {
        crearlistado(data);
    });

}

//FUNCION PARA EL BOTON LIMPIAR
var btnlimpiar = document.getElementById("btnlimpiar");
btnlimpiar.onclick = function () {
    //LLAMA A LA FUNCION LISTADO COMPLETO
    listar();
    //CODIGO PARA ASIGNAR VACIO AL TEXTBOX
    document.getElementById("txtbuscar").value = "";
    document.getElementById("txtbuscardoc").value = "";

}

//FUNCION PARA CREAR EL LISTADO COMPLETO
function crearlistado(data) {
    var contenido = "";
    //ARMO LA TABLA
    contenido += "<table id ='tabla_docente' class='table'>";
    //DEFINO LAS COLUMNAS
    contenido += "<thead>";
    //DEFINO LAS FILAS
    contenido += "<tr>";
    //DEFINO LA CELDA
    contenido += "<td>Nro Documento</td>";
    contenido += "<td>Apellido</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Fecha Nac.</td>";
    contenido += "<td>Nro Reg.</td>";
    //AGREGAMOS UNA COLUMNA DE TITULO PARA LAS ACCIONES A REALIZAR
    contenido += "<td>Acciones</td>";
    //AGREGO EL CONTENIDO DE LA TABLA 
    contenido += "<tbody>";
    //RECORRO LOS DATOS DE LA TABLA QUE OBTENGO DEL CONTROLADOR PARA PASAR
    //LOS REGISTROS A LA TABLA
    for (var i = 0; i < data.length; i++) {
        //DEFINO LAS FILAS DE DATOS
        contenido += "<tr>";
        //DEFINO LA CELDA DE DATOS
        contenido += "<td><i class='fas fa-male'></i> " + data[i].Nrodocumento + "</td>";
        contenido += "<td>" + data[i].Apellido + "</td>";
        contenido += "<td>" + data[i].Nombre + "</td>";
        contenido += "<td>" + data[i].fechanacimiento + "</td>";
        contenido += "<td>" + data[i].Id_personal + "</td>";
        //AGREGAMOS UN CONTENIDO CON LOS BOTONES DE ACCION
        //DEFINO UNA VARIABLE QUE ME GUARDE EL ID DEL ALUMNO Y ME PERMITA PASARLO A LA FUNCION AbrirEdicion
        var nroidpersonal = data[i].Id_personal;
        contenido += "<td>";
        //AGREGAMOS UNA FUNCION PARA ABRIR EL BOTON DE EDITAR YO LA LLAME AbrirEdicion()
        contenido += "<button class='btn btn-primary' onclick='AbrirFormulario(" + nroidpersonal + ")' data-toggle='modal' data-target='#myModal'><i class= 'fas fa-edit'></i></button> ";
        ////AGREGAMOS UNA FUNCION PARA BUSCAR LA FUNCION DE ELIMINACIO YO LA LLAME EliminarRegistro() Y LE PASAMOS COMO PARAMETRO EL ID DEL ALUMNO
        contenido += "<button class='btn btn-danger'onclick='EliminarRegistro(" + nroidpersonal + ")'><i class= 'fas fa-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    //AGREGAMOS JUNTO CON EL ID DE LA TABLA PARA PODER HACER LA PAGINACION
    $("#tabla_docente").dataTable(
        {
            //SE AGREGA PARA QUE NO SALGA LA BUSQUEDA POR DEFECTO EN LA PAGINACION
            searching: false
        }
    );

}

//FUNCION QUE SE ABRE CON EL BOTON DE EDICION 
function AbrirFormulario(id) {
    ////CADA VEZ QUE SE ABRE EL MODAL SE SACAN LAS X DE LA FUNCION 
    var controlesok = document.getElementsByClassName("necesario");
    //ASIGNAMOS CUANTOS CONTROLES HAY PARA DAR LA VUELTA AL FOR
    var cantidadtexts = controlesok.length;
    for (var i = 0; i < cantidadtexts; i++) {
        controlesok[i].parentNode.classList.remove("error");
    }

    //SI VIENE DEL BOTON AGREGAR EL ID VIENE EN 0
    if (id == 0) {
        //LLAMA A LA FUNCION LIMPIATXT PARA LIMPIAR TODOS LOS TEXTS
        limpiatxt()
    } else {
        //TRAE LOS DATOS DE LA LISTA SACANDO CADA POSICION EN LOS TEXTS QUE CORRESPONDEN

        $.get("Personal/TraerDatos/?idbusqueda=" + id, function (data) {
            document.getElementById("txtidpersonal").value = data[0].Id_personal;
            document.getElementById("cbotipopersonaldocente").value = data[0].Idtipopersonal;
            document.getElementById("cbodocumento").value = data[0].Tipodocumento;
            document.getElementById("txtdocumento").value = data[0].Nrodocumento;
            document.getElementById("txtcuitcuil").value = data[0].Cuil;
            document.getElementById("txtnombre").value = data[0].Apellido;
            document.getElementById("txtapellido").value = data[0].Nombre;
            document.getElementById("fechanacimiento").value = data[0].fechanacimiento;
            document.getElementById("cbosexo").value = data[0].Sexo;
            document.getElementById("txtdireccion").value = data[0].Direccion;
            document.getElementById("txtbarrio").value = data[0].Barrio;
            document.getElementById("cbociudad").value = data[0].Ciudadnacimiento;
            document.getElementById("cbopcia").value = data[0].Provincianacimiento;
            document.getElementById("cbopais").value = data[0].Paisnacimiento;
            document.getElementById("txtmail").value = data[0].Email;
            document.getElementById("txttelefono").value = data[0].Telefonofijo;
            document.getElementById("txtcelular").value = data[0].Telefonocelular;
            document.getElementById("cbociudadresidencia").value = data[0].Idciudad;
            document.getElementById("cbopciaresidencia").value = data[0].Idprovincia;
            document.getElementById("cbopaisresidencia").value = data[0].Idpais;
            document.getElementById("cbotipousuario").value = data[0].Idtipousuario;
            document.getElementById("fechaalta").value = data[0].fechaaltasistema;
            document.getElementById("fechamodificacion").value = data[0].fechaultimaactualizacion;
            document.getElementById("txtobservaciones").value = data[0].Observaciones;
        });
    }


}

//FUNCION ELIMINAR REGISTROS USANDO UN GET
function EliminarRegistro(id) {
    if (confirm("¿Confirma la Eliminacion de los Datos Seleccionados?") == 1) {
        $.get("Personal/EliminaDocente/?id=" + id, function (data) {
            if (data == 0) {
                alert("Existe un error con la eliminacion del Personal");
            } else {
                alert("Se elimino correctamente el Personal");
                //LLAMO A LA FUNCION LISTAR
                listar();
            }
        });
    }
}

//FUNCION PARA LIMPIAR TODOS LOS CONTROLES
function limpiatxt() {
    //ASIGNAMOS A LA VARIABLES TODOS LOS CONTROLES QUE TENGAN LA CLASE limpia
    var textsaborrar = document.getElementsByClassName("limpia");
    //ASIGNAMOS CUANTOS CONTROLES HAY PARA DAR LA VUELTA AL FOR
    var cantidadtexts = textsaborrar.length;
    for (var i = 0; i < cantidadtexts; i++) {
        textsaborrar[i].value = ""
    }
}

//FUNCION PARA AGREGAR LOS DATOS Y CONTROLAR LOS NECESARIOS
function Agregar() {
    //DEVUELVE EL VALOR DE LOS CONTROLES DE CAMPOS NECESARIOS, LA FUNCION ES controlanecesario()
    if (controlanecesario() == true) {
        //DECLARAMOS UNA VARIABLE DE DATOS DE FORMULARIO PARA PASAR AL CONTROLADOR
        //Y LE ASIGNAMOS TODOS LOS DATOS DE LOS CAMPOS DE CADA DATO INGRESADO
        var frm = new FormData();
        frm.append("Id_personal", document.getElementById("txtidpersonal").value);
        frm.append("Idtipopersonal", document.getElementById("cbotipopersonaldocente").value);
        frm.append("Nrodocumento", document.getElementById("txtdocumento").value);
        frm.append("Tipodocumento", document.getElementById("cbodocumento").value);
        frm.append("Cuil", document.getElementById("txtcuitcuil").value);
        frm.append("Nombre", document.getElementById("txtnombre").value);
        frm.append("Apellido", document.getElementById("txtapellido").value);
        frm.append("Fechanacimiento", document.getElementById("fechanacimiento").value);
        frm.append("Sexo", document.getElementById("cbosexo").value);
        frm.append("Direccion", document.getElementById("txtdireccion").value);
        frm.append("Barrio", document.getElementById("txtbarrio").value);
        frm.append("Idciudad", document.getElementById("cbociudadresidencia").value);
        frm.append("Idprovincia", document.getElementById("cbopciaresidencia").value);
        frm.append("Idpais", document.getElementById("cbopaisresidencia").value);
        frm.append("Email", document.getElementById("txtmail").value);
        frm.append("Telefonofijo", document.getElementById("txttelefono").value);
        frm.append("Telefonocelular", document.getElementById("txtcelular").value);
        frm.append("Ciudadnacimiento", document.getElementById("cbociudad").value);
        frm.append("Provincianacimiento", document.getElementById("cbopcia").value);
        frm.append("Paisnacimiento", document.getElementById("cbopais").value);
        frm.append("a_mail", document.getElementById("txtmail").value);
        frm.append("Idtipousuario", document.getElementById("cbotipousuario").value);
        frm.append("Fechaalta", document.getElementById("fechaalta").value);
        frm.append("Fechaactualizacion", document.getElementById("fechamodificacion").value);
        frm.append("Observaciones", document.getElementById("txtobservaciones").value);
        frm.append("Activo", "1");

        //PREGUNTO SI VA A GRABAR LOS DATOS EL VALOR 1 ES VERDADERO
        if (confirm("¿Confirma los datos Ingresados?") == 1) {
            //FUNCION DE AJAX PARA PASAR DATOS DESDE EL JAVASCRIPT AL CONTROLADOR
            $.ajax({
                type: "POST",
                url: "Personal/GuardaDocente",
                data: frm,
                contentType: false,
                processData: false,
                //ESTE DATOS VA A SER EL RESULTADO DE LO QUE SE DE EN EL CONTROLADOR CON REGISTROS
                success: function (data) {
                    if (data != 0 & data != -1) {
                        //LLAMO A LA FUNCION LISTAR
                        listar();
                        //GENERO UN MENSAJE
                        alert("Los Datos se grabaron correctamente");
                        //LLAMO AL BOTON CANCELAR PARA QUE SE EJECUTE INTERNAMENTE ASI 
                        //SE DESCARGA EL FORMULARIO
                        document.getElementById("btncancelar").click();
                    }

                    if (data == 0) {
                        alert("Existe un Error en la Carga. Por favor Verifique");
                    }

                    if (data == -1) {
                        alert("Ya Existe un Docente con el Nro de DNI ingresado. Por favor, Verifique");
                    }
                }
            });
        }
    } else {
        alert("PROBLEMA CON EL PASAJE DEL AJAX!!!!!!!")
    }
}

////FUNCION PARA CONTROLAR LOS DATOS QUE SEAN OBLIGATORIOS
function controlanecesario() {
    var graba = true;
    //ASIGNAMOS A LA VARIABLES TODOS LOS CONTROLES QUE TENGAN LA CLASE limpia
    var controlesok = document.getElementsByClassName("necesario");
    //ASIGNAMOS CUANTOS CONTROLES HAY PARA DAR LA VUELTA AL FOR
    var cantidadtexts = controlesok.length;
    for (var i = 0; i < cantidadtexts; i++) {
        if (controlesok[i].value == "") {
            graba = false;
            //EL PARENTNODE NOS DA LA POSICION DE LA ETIQUETA QUE CONTIENE AL CONTROL , ES EL <TD>
            //AL CUAL LE AGREGAMOS LA CLASE DE ERROR, O SEA LA X QUE PUSIMOS AL FINAL
            controlesok[i].parentNode.classList.add("error");

        }
        else {
            controlesok[i].parentNode.classList.remove("error");
        }
    }
    return graba;
}
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
    $.get("Alumnos/ListaAlumno", function (data) {
        crearlistado(data);
    });
}

//PARA LLENAR EL COMBO DE TIPOS DE DOCUMENTOS
$.get("Alumnos/ListaDocumento", function (data) {
    var contenido = "";
    contenido += "<option value=''>  TIPO DOCUMENTO  </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_tipodocumento + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbodocumento").innerHTML = contenido;
})

//PARA LLENAR EL COMBOBOX DE CIUDAD
$.get("Alumnos/ListaCiudad", function (data) {
    var contenido = "";
    contenido += "<option value=''>   CIUDAD   </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].id_ciudad + "'>";
        contenido += data[i].Nombre;
        contenido += "</option>";
    }
    document.getElementById("cbociudadnacimiento").innerHTML = contenido;
    document.getElementById("cbociudadresidencia").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE PROVINCIA
$.get("Alumnos/ListaProvincia", function (data) {
    var contenido = "";
    contenido += "<option value=''>   PROVINCIA   </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].id_provincia + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbopcianacimiento").innerHTML = contenido;
    document.getElementById("cbopciaresidencia").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE PAIS
$.get("Alumnos/ListaPais", function (data) {
    var contenido = "";
    contenido += "<option value=''>   PAIS   </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_pais + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbopaisnacimiento").innerHTML = contenido;
    document.getElementById("cbopaisresidencia").innerHTML = contenido;
})

//PARA LLENAR EL COMBO DE SEXO
$.get("Alumnos/ListaSexo", function (data) {
    var contenido = "";
    contenido += "<option value=''>   SEXO   </option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_sexo + "'>";
        contenido += data[i].Descripcion;
        contenido += "</option>";
    }
    document.getElementById("cbosexo").innerHTML = contenido;
})

//PARA LLENAR EL COMBOBOX DE TIPO DE USUARIO
$.get("Alumnos/ListaTipoUsuario", function (data) {
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
//CAPTURO LO QUE EL TEXTBOX TIENE MIENTRAS SE ESCRIBE
var buscar = document.getElementById("txtbuscar");
buscar.onkeyup = function () {
    var Apellido = document.getElementById("txtbuscar").value;
    $.get("Alumnos/BuscaxApellido/?Apellido=" + Apellido, function (data) {
        crearlistado(data);
    });

}

//BUSQUEDA SENSITIVA PARA BUSQUEDA POR DOCUMENTO
//CAPTURO LO QUE EL TEXTBOX TIENE MIENTRAS SE ESCRIBE
var buscar = document.getElementById("txtbuscardoc");
buscar.onkeyup = function () {
    var documento = document.getElementById("txtbuscardoc").value;
    $.get("Alumnos/BuscaxDocumento/?NroDocumento=" + documento, function (data) {
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
    contenido += "<table id ='tabla_alumno' class='table'>";
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
        contenido += "<td>" + data[i].a_nrodocumento + "</td>";
        contenido += "<td>" + data[i].a_apellido + "</td>";
        contenido += "<td>" + data[i].a_nombre + "</td>";
        contenido += "<td>" + data[i].fechanacimiento + "</td>";
        contenido += "<td>" + data[i].a_idalumno + "</td>";
        //AGREGAMOS UN CONTENIDO CON LOS BOTONES DE ACCION
        //DEFINO UNA VARIABLE QUE ME GUARDE EL ID DEL ALUMNO Y ME PERMITA PASARLO A LA FUNCION AbrirEdicion
        var nroidalumno = data[i].a_idalumno;
        contenido += "<td>";
        //AGREGAMOS UNA FUNCION PARA ABRIR EL BOTON DE EDITAR YO LA LLAME AbrirEdicion()
        contenido += "<button class='btn btn-primary' onclick='AbrirFormulario(" + nroidalumno + ")' data-toggle='modal' data-target='#agregaalumno'><i class= 'fas fa-edit'></i></button> ";
        ////AGREGAMOS UNA FUNCION PARA BUSCAR LA FUNCION DE ELIMINACIO YO LA LLAME EliminarRegistro() Y LE PASAMOS COMO PARAMETRO EL ID DEL ALUMNO
        contenido += "<button class='btn btn-danger'onclick='EliminarRegistro(" + nroidalumno + ")'><i class= 'fas fa-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    //AGREGAMOS JUNTO CON EL ID DE LA TABLA PARA PODER HACER LA PAGINACION
    $("#tabla_alumno").dataTable(
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
        $.get("Alumnos/TraerDatos/?idbusqueda=" + id, function (data) {
            document.getElementById("txtidalumno").value = data[0].a_idalumno;
            document.getElementById("txtdocumento").value = data[0].a_nrodocumento;
            document.getElementById("txtnombre").value = data[0].a_nombre;
            document.getElementById("txtapellido").value = data[0].a_apellido;
            document.getElementById("fechanacimiento").value = data[0].fechanacimiento;
            document.getElementById("txtdireccion").value = data[0].a_direccion;
            document.getElementById("txtmail").value = data[0].a_mail;
            document.getElementById("txtcuitcuil").value = data[0].a_cuil;
            document.getElementById("txttelefono").value = data[0].a_telefonofijo;
            document.getElementById("txtcelular").value = data[0].a_telefonocelular;
            document.getElementById("txtcontactoemergencia").value = data[0].a_contactoemergencia;
            document.getElementById("txtdireccionresidencia").value = data[0].a_direccionresidencia;
            document.getElementById("txttelefonoresidencia").value = data[0].a_telefonofijoresidencia;
            document.getElementById("txtcelularresidencia").value = data[0].a_telefonocelularresidencia;
            document.getElementById("fechaalta").value = data[0].fechaaltasistema;
            document.getElementById("fechamodificacion").value = data[0].fechaultimaactualizacion;
            //combos
            document.getElementById("cbodocumento").value = data[0].a_id_tipo_documento;
            document.getElementById("cbosexo").value = data[0].a_sexo;
            document.getElementById("cbotipousuario").value = data[0].Idtipousuario;
            document.getElementById("cbociudadnacimiento").value = data[0].a_id_ciudadnacimiento;
            document.getElementById("cbopcianacimiento").value = data[0].a_idpcianacimiento;
            document.getElementById("cbopaisnacimiento").value = data[0].a_idpaisnacimiento;
            document.getElementById("cbociudadresidencia").value = data[0].a_idciudadresidencia;
            document.getElementById("cbopciaresidencia").value = data[0].a_pciaresidencia;
            document.getElementById("cbopaisresidencia").value = data[0].a_paisresidencia;
            //fin combos
        });
    }


}

//FUNCION ELIMINAR REGISTROS USANDO UN GET
function EliminarRegistro(id) {
    if (confirm("¿Confirma la Eliminacion de los Datos Seleccionados?") == 1) {
        $.get("Alumnos/EliminaAlumno/?id=" + id, function (data) {
            if (data == 0) {
                alert("Existe un error con la eliminacion del Alumno");
            } else {
                alert("Se elimino correctamente el Alumno");
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
        frm.append("a_idalumno", document.getElementById("txtidalumno").value);
        frm.append("a_nrodocumento", document.getElementById("txtdocumento").value);
        frm.append("a_id_tipo_documento", document.getElementById("cbodocumento").value);
        frm.append("a_nombre", document.getElementById("txtnombre").value);
        frm.append("a_apellido", document.getElementById("txtapellido").value);
        frm.append("a_fecha_nacimiento", document.getElementById("fechanacimiento").value);
        frm.append("a_direccion", document.getElementById("txtdireccion").value);
        frm.append("a_id_ciudadnacimiento", document.getElementById("cbociudadnacimiento").value);
        frm.append("a_idpcianacimiento", document.getElementById("cbopcianacimiento").value);
        frm.append("a_idpaisnacimiento", document.getElementById("cbopaisnacimiento").value);
        frm.append("a_mail", document.getElementById("txtmail").value);
        frm.append("a_cuil", document.getElementById("txtcuitcuil").value);
        frm.append("a_telefonofijo", document.getElementById("txttelefono").value);
        frm.append("a_telefonocelular", document.getElementById("txtcelular").value);
        frm.append("a_contactoemergencia", document.getElementById("txtcontactoemergencia").value);
        frm.append("a_direccionresidencia", document.getElementById("txtdireccionresidencia").value);
        frm.append("a_idciudadresidencia", document.getElementById("cbociudadresidencia").value);
        frm.append("a_pciaresidencia", document.getElementById("cbopciaresidencia").value);
        frm.append("a_paisresidencia", document.getElementById("cbopaisresidencia").value);
        frm.append("a_telefonofijoresidencia", document.getElementById("txttelefonoresidencia").value);
        frm.append("a_telefonocelularresidencia", document.getElementById("txtcelularresidencia").value);
        frm.append("a_sexo", document.getElementById("cbosexo").value);
        frm.append("Idtipousuario", document.getElementById("cbotipousuario").value);
        frm.append("a_fechaaltasistema", document.getElementById("fechaalta").value);
        frm.append("a_fechaultimaactualizacion", document.getElementById("fechamodificacion").value);
        frm.append("a_activo", "1");
        //PREGUNTO SI VA A GRABAR LOS DATOS EL VALOR 1 ES VERDADERO
        if (confirm("¿Confirma los datos Ingresados?") == 1) {
            //FUNCION DE AJAX PARA PASAR DATOS DESDE EL JAVASCRIPT AL CONTROLADOR
            $.ajax({
                type: "POST",
                url: "Alumnos/GuardaAlumno",
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
                        alert("Existe un Error en la Carga. Por favor, Verifique");
                    }

                    if (data == -1) {
                        alert("Ya Existe un Alumno con el Nro de DNI ingresado. Por favor, Verifique");
                    }
                }
            });
        }
    } else {
        alert("PROBLEMA CON EL PASAJE DEL AJAX!!!!!!!")
    }
}

//FUNCION PARA CONTROLAR LOS DATOS QUE SEAN OBLIGATORIOS
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
listar();

function listar() {
    $.get("Usuarios/ListaUsuario", function (data) {
        crearlistado(data);
    });
}

//PARA LLENAR EL COMBOBOX DE TIPO DE USUARIO
$.get("Usuarios/ListaTipoUsuario", function (data) {
    var contenido = "";
    contenido += "<option value=''>TIPO DE USUARIO</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].Id_tipousuario + "'>";
        contenido += data[i].Nombre;
        contenido += "</option>";
    }
    document.getElementById("cbotipousuario").innerHTML = contenido;
    document.getElementById("cbotipousuariomodal").innerHTML = contenido;
})

//CAPTURO LO QUE EL BOTON BUSCAR PIDE
var cbotipousuario = document.getElementById("cbotipousuario");
cbotipousuario.onchange = function () {
    var TipoUsuario = document.getElementById("cbotipousuario").value;
    //HAGO LA PREGUNTA PARA CUANDO NO SE SELECCIONE UNA OPCION DEL COMBO
    //O CUANDO SE SELECCIONE ---SELECCIONAR---
    if (TipoUsuario == "") {
        listar();
    } else
        $.get("Usuarios/BuscaxTipoUsuario/?idtipoUsuario=" + TipoUsuario, function (data) {
            crearlistado(data);
        });

}

//BUSQUEDA SENSITIVA PARA BUSQUEDA POR NOMBRE
//CAPTURO LO QUE EL TEXTBOX TIENE MIENTRAS SE ESCRIBE
var buscar = document.getElementById("txtbuscar");
buscar.onkeyup = function () {
    var Apellido = document.getElementById("txtbuscar").value;
    $.get("Usuarios/BuscaxApellido/?Apellido=" + Apellido, function (data) {
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
    contenido += "<table id ='tabla_usuario' class='w3-table w3-striped w3-bordered'>";
    //DEFINO LAS COLUMNAS
    contenido += "<thead>";
    //DEFINO LAS FILAS
    contenido += "<tr class='w3-red'>";
    //DEFINO LA CELDA
    contenido += "<td>Nombre Usuario</td>";
    contenido += "<td>Apellido</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Nro Reg.</td>";
    //AGREGAMOS UNA COLUMNA DE TITULO PARA LAS ACCIONES A REALIZAR
    contenido += "<td>Acciones</td>";
    //AGREGO EL CONTENIDO DE LA TABLA 
    contenido += "<tbody>";
    //RECORRO LOS DATOS DE LA TABLA QUE OBTENGO DEL CONTROLADOR PARA PASAR
    //LOS REGISTROS A LA TABLA
    for (var i = 0; i < data.length; i++) {
        //DEFINO LAS FILAS DE DATOS
        contenido += "<tr class='w3-hover-blue w3-dark-grey'>";
        //DEFINO LA CELDA DE DATOS
        contenido += "<td>" + data[i].NombreUsuario + "</td>";
        contenido += "<td>" + data[i].Apellido + "</td>";
        contenido += "<td>" + data[i].Nombres + "</td>";
        contenido += "<td>" + data[i].Id_usuario + "</td>";
        //AGREGAMOS UN CONTENIDO CON LOS BOTONES DE ACCION
        //DEFINO UNA VARIABLE QUE ME GUARDE EL ID DEL ALUMNO Y ME PERMITA PASARLO A LA FUNCION AbrirEdicion
        var nroid = data[i].Id_usuario;
        contenido += "<td>";
        //AGREGAMOS UNA FUNCION PARA ABRIR EL BOTON DE EDITAR YO LA LLAME AbrirEdicion()
        contenido += "<button class='btn btn-primary' onclick='AbrirFormulario(" + nroid + ")' data-toggle='modal' data-target='#myModal'><i class= 'fas fa-edit'></i></button> ";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    //AGREGAMOS JUNTO CON EL ID DE LA TABLA PARA PODER HACER LA PAGINACION
    $("#tabla_usuario").dataTable(
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

        $.get("Usuarios/TraerDatosUsuario/?idbusqueda=" + id, function (data) {
            document.getElementById("txtidusuario").value = data[0].Id_usuario;
            document.getElementById("txtnombreusuario").value = data[0].NombreUsuario;
            document.getElementById("txtapellido").value = data[0].Apellido;
            document.getElementById("txtnombre").value = data[0].Nombres;
            document.getElementById("cbotipousuariomodal").value = data[0].cbotipousuario;
            document.getElementById("txtcontraseña").value = data[0].Contraseña;
            document.getElementById("txtcontraseñaconfirma").value = data[0].Contraseña;
        });
    }


}

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
        var contra1 = document.getElementById("txtcontraseña").value;
        var contra2 = document.getElementById("txtcontraseñaconfirma").value;

        if (contra1 == contra2) {
            frm.append("Id_usuario", document.getElementById("txtidusuario").value);
            frm.append("NombreUsuario", document.getElementById("txtnombreusuario").value);
            frm.append("Nombres", document.getElementById("txtnombre").value);
            frm.append("Apellido", document.getElementById("txtapellido").value);
            frm.append("Contraseña", document.getElementById("txtcontraseña").value);
            frm.append("TipoUsuario", document.getElementById("cbotipousuariomodal").value);
            frm.append("Activo", "1");

            if (confirm("¿Confirma los datos Ingresados?") == 1) {
                //FUNCION DE AJAX PARA PASAR DATOS DESDE EL JAVASCRIPT AL CONTROLADOR
                $.ajax({
                    type: "POST",
                    url: "Usuarios/GuardaUsuarios",
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
                            alert("Ya Existe un Usuario con este Nombre de Usuario. Por favor, ingrese otro Nombre de Usuario");
                        }
                    }
                });
            }
        } else {
            alert("Las contraseñas no coinciden. Por favor, verifique y reintente")
        }
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

function Login() {
    var botoningresar = document.getElementById("btningresar");
    var usuario = document.getElementById("txtusuario").value;
    var contra = document.getElementById("txtcontra").value;
    //VALIDACION DE DATOS INGRESADOS
    
    if (usuario == "") {
        alert("Por Favor Ingrese un Usuario");
        return;
    }
    if (contra == "") {
        alert("Por Favor Ingrese una Contraseña");
        return;
    }
    //llama a la funcion para validar la empresa
    //llama a la funcion para validar el usuario y la contraseña
    $.get("Login/ValidaUsuario/?usuario=" + usuario + "&contra=" + contra, function (data) {

        if (data == 1) {
            var url = "PaginaPrincipal/Index";
            window.location.href = url;
        } else {
            alert("Los Datos Ingresados no son Correctos, Verifique");

        }
    })
}
/**
 * 
 * Función para iniciar sesión
 */
const IniciarSesion = () => {
    let Email = $("#EmailLogin").val(),
        Password = $("#PasswordLogin").val();
    if (Email == '' || Password == '')
        return Utilities.sweetAlertWarning('Hay campos vacios, revisa el formulario');
    const credenciales = { Email, Password };
    let jlogin = JSON.stringify(credenciales);
    HttpRequest.PostAsync('api/Auth/Login', jlogin, (response) => {
        console.log(response);
        debugger;
        if (response.textStatus == "success") {
            ClearInputs();
            window.location.href = 'http://localhost:5236/Home/Usuarios';
        } else {
            Utilities.sweetAlertWarning(response.xhr.responseJSON.Message);
        }
    })
};

//Clear modal inputs
const ClearInputs = () => {
    $('#EmailLogin').val('');
    $('#PasswordLogin').val('');
};

/** document ready modern */
$(() => {

});
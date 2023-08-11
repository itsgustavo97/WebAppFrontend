let usuarioModal = new bootstrap.Modal($('#usuariosModal'));

const SetUsuarioModal = (id) => {
    usuarioModal.show();
    HttpRequest.GetAsync(`api/Usuario/GetUsuarioByIdAsync/${id}`, null, (resp) => {
        const { id, nombre, apellido, userName, activo, email, emailConfirmed } = resp.data;
        console.log(resp);
        $('#IdUsuario').val(id);
        $('#NombreUsuario').val(nombre);
        $('#ApellidoUsuario').val(apellido);
        $('#UsernameUsuario').val(userName);
        $('#UsuarioActivo').val(activo ? 1 : 0);
        $('#CorreoElectronicoUsuario').val(email);
        $('#CorreoConfirmadoUsuario').val(emailConfirmed ? 1 : 0);
    });

};

const PostApiUsuario = (jusuario) => {
    HttpRequest.PostAsync(`api/Usuario/CreateUsuarioAsync`, jusuario, (resp) => {
        console.log(resp);
        if (resp.textStatus == "success") {
            $('.btnClearModalUsuarios').click();
            usuarioModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetUsuarios();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PutApiUsuario = (jusuario) => {
    HttpRequest.PutAsync(`api/Usuario/UpdateUsuarioAsync`, jusuario, (resp) => {
        //console.log(resp);
        if (resp.textStatus == "success") {
            $('.btnClearModalUsuarios').click();
            usuarioModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetUsuarios();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PostUsuario = () => {
    const Id = $('#IdUsuario').val(),
        Nombre = $('#NombreUsuario').val(),
        Apellido = $('#ApellidoUsuario').val(),
        UserName = $('#UsernameUsuario').val(),
        Activo = $('#UsuarioActivo').val() == '1' ? true : false,
        Email = $('#CorreoElectronicoUsuario').val(),
        EmailConfirmed = $('#CorreoConfirmadoUsuario').val() == '1' ? true : false;
    //Construct objeto as model class
    const Usuario = { Id, Nombre, Apellido, UserName, Activo, Email, EmailConfirmed };
    //Se valida el modelo antes de enviar al petición
    if (Usuario.Nombre == '' || Usuario.Apellido == '' || Usuario.UserName == '' || Usuario.Email == '')
        return Utilities.sweetAlertWarning('Hay campos vacios, revisa el formulario');
    //Convert to JSON
    let jusuario = JSON.stringify(Usuario);
    if (Id == '') {
        PostApiUsuario(jusuario);
    } else {
        PutApiUsuario(jusuario);
    }

};

const GetUsuarios = (route = 'api/Usuario/GetAllUsuariosAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        //console.log(response);
        if (response != undefined || response.textStatus == "success") {
            Utilities.GenerarTabla({
                idDiv: 'divForTableUsuarios',
                idTabla: 'dtUsuarios',
                cabeceras: ['Nombre', 'Apellido', 'Username', 'Activo', 'Email', 'EmailConfirmed', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-striped table-hover',
                propiedadesPersonalizadas: ''
            }, {
                data: response.data,
                language: lenguajeEspanniolDataTable,
                columns: [
                    { data: 'nombre' },
                    { data: 'apellido' },
                    { data: 'userName' },
                    {
                        data: 'activo',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-outline-dark btn-sm" onclick="">
                                                <i class="fa-solid fa-toggle-${data ? 'on' : 'off'}"></i>
                                            </a>`;
                            //console.log(full);
                            return actions;
                        }
                    },
                    { data: 'email' },
                    {
                        data: 'emailConfirmed',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-outline-dark btn-sm" onclick="">
                                                <i class="fa-solid fa-toggle-${data ? 'on': 'off'}"></i>
                                            </a>`;
                            //console.log(full);
                            return actions;
                        }
                    },
                    {
                        data: 'id',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetUsuarioModal('${data}');" >
                                                <i class="fa-solid fa-pen-to-square"></i> Editar
                                            </a>`;
                            //console.log(full);
                            return actions;
                        }
                    },
                ],
                order: [[0, "desc"]]
            });
        } else {
            Utilities.sweetAlertWarning('No se pudo realizar la peticion al servidor');
        }
    });
};

//Clear modal inputs
$('.btnClearModalUsuarios').click(() => {
    $('#IdUsuario').val('');
    $('#NombreUsuario').val('');
    $('#ApellidoUsuario').val('');
    $('#UsernameUsuario').val('');
    $('#UsuarioActivo').val(1);
    $('#CorreoElectronicoUsuario').val('');
    $('#CorreoConfirmadoUsuario').val(1);
});

/** document ready modern */
$(() => {
    GetUsuarios();
});
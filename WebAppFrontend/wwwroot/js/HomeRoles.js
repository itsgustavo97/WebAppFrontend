let rolesModal = new bootstrap.Modal($('#rolesModal'));

const SetRoleModal = (id) => {
    rolesModal.show();
    HttpRequest.GetAsync(`api/Roles/${id}`, null, (resp) => {
        const { id, name } = resp;
        console.log(resp);
        $('#IdRole').val(id);
        $('#NombreRole').val(name);
    });

};

const PostApiRole = (jrole) => {
    HttpRequest.PostAsync(`api/Roles/CreateRoleAsync`, jrole, (resp) => {
        //console.log(resp);
        $('.btnClearModalRoles').click();
        rolesModal.hide();
        Utilities.sweetAlertSuccess('Se guardó con exito');
        GetRoles();
        //if (resp == 1) {
        //    $('.btnClearModalRoles').click();
        //    rolesModal.hide();
        //    Utilities.sweetAlertSuccess('Se guardó con exito');
        //    GetRoles();
        //} else {
        //    Utilities.sweetAlertWarning('No se pudo guardar');
        //}
    });
};

const PutApiRole = (jrole) => {
    HttpRequest.PutAsync(`api/Roles/UpdateRoleAsync`, jrole, (resp) => {
        //console.log(resp);
        $('.btnClearModalRoles').click();
        rolesModal.hide();
        Utilities.sweetAlertSuccess('Se guardó con exito');
        GetRoles();
        //if (resp == 1) {
        //    $('.btnClearModalRoles').click();
        //    rolesModal.hide();
        //    Utilities.sweetAlertSuccess('Se guardó con exito');
        //    GetRoles();
        //} else {
        //    Utilities.sweetAlertWarning('No se pudo guardar');
        //}
    });
};

const PostRole = () => {
    const id = $('#IdRole').val(),
        name = $('#NombreRole').val();
        //Construct objeto as model class
    const Role = { id, name };
    //Se valida el modelo antes de enviar al petición
    if (Role.name == '')
        return Utilities.sweetAlertWarning('Hay campos vacios, revisa el formulario');
    //Convert to JSON
    let jrole = JSON.stringify(Role);
    if (id == '') {
        PostApiRole(jrole);
    } else {
        PutApiRole(jrole);
    }

};

const GetRoles = (route = 'api/Roles/') => {
    HttpRequest.GetAsync(route, null, (response) => {
        console.log(response);
        if (response != undefined || response != null) {
            Utilities.GenerarTabla({
                idDiv: 'divForTableRoles',
                idTabla: 'dtRoles',
                cabeceras: ['Nombre', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-striped table-hover',
                propiedadesPersonalizadas: ''
            }, {
                data: response,
                language: lenguajeEspanniolDataTable,
                columns: [
                    { data: 'name' },
                    {
                        data: 'id',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetRoleModal('${data}');" >
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
$('.btnClearModalRoles').click(() => {
    $('#IdRole').val('');
    $('#NombreRole').val('');
});

/** document ready modern */
$(() => {
    GetRoles();
});
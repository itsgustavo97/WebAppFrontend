let clientesModal = new bootstrap.Modal($('#clientesModal'));

const SetCostumerModal = (id) => {
    clientesModal.show();
    HttpRequest.GetAsync(`Cliente/GetById/${id}`, null, (resp) => {
        const { id, nombre, apellido, edad, correoElectronico, numeroTelefonico, direccion } = resp;
        //console.log(resp);
        $('#IdCliente').val(id);
        $('#NombreCliente').val(nombre);
        $('#ApellidoCliente').val(apellido);
        $('#EdadCliente').val(edad);
        $('#DireccionCliente').val(direccion);
        $('#TelefonoCliente').val(numeroTelefonico);
        $('#CorreoElectronicoCliente').val(correoElectronico);
    });

};

const PostApiCliente = (jcliente) => {
    HttpRequest.PostAsync(`Cliente/Create`, jcliente, (resp) => {
        //console.log(resp);
        if (resp == 1) {
            clear();
            clientesModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetClientes();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PutApiCliente = (jcliente) => {
    HttpRequest.PutAsync(`Cliente/Update`, jcliente, (resp) => {
        //console.log(resp);
        if (resp == 1) {
            clear();
            clientesModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetClientes();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PostCliente = () => {
    const Id = $('#IdCliente').val(),
        Nombre = $('#NombreCliente').val(),
        Apellido = $('#ApellidoCliente').val(),
        Edad = $('#EdadCliente').val(),
        Direccion = $('#DireccionCliente').val(),
        NumeroTelefonico = $('#TelefonoCliente').val(),
        CorreoElectronico = $('#CorreoElectronicoCliente').val();
        //Construct objeto as model class
    const Cliente = { Id, Nombre, Apellido, Edad, Direccion, NumeroTelefonico, CorreoElectronico };
    //Se valida el modelo antes de enviar al petición
    if (Cliente.Nombre == '' || Cliente.Apellido == '' || Cliente.Edad == '' || Cliente.Direccion == '' || Cliente.NumeroTelefonico == '' || Cliente.CorreoElectronico == '')
        return Utilities.sweetAlertWarning('Hay campos vacios, revisa el formulario');
    //Convert to JSON
    let jcliente = JSON.stringify(Cliente);
    if (Id == 0) {
        PostApiCliente(jcliente);
    } else {
        PutApiCliente(jcliente);
    }

};

const GetClientes = (route = 'Cliente/GetAllAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        //console.log(response);
        if (response != undefined || response != null) {
            Utilities.GenerarTabla({
                idDiv: 'divForTableClientes',
                idTabla: 'dtUsuarios',
                cabeceras: ['Nombre', 'Apellido', 'Edad', 'Email', 'Telefono', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-striped table-hover',
                propiedadesPersonalizadas: ''
            }, {
                data: response,
                language: lenguajeEspanniolDataTable,
                columns: [
                    { data: 'nombre' },
                    { data: 'apellido' },
                    { data: 'edad' },
                    { data: 'correoElectronico' },
                    { data: 'numeroTelefonico' },
                    {
                        data: 'id',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetCostumerModal(${data});" >
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
$('.btnClearModalClientes').click(() => {
    $('#IdCliente').val(0);
    $('#NombreCliente').val('');
    $('#ApellidoCliente').val('');
    $('#EdadCliente').val('');
    $('#DireccionCliente').val('');
    $('#TelefonoCliente').val('');
    $('#CorreoElectronicoCliente').val('');
});

/** document ready modern */
$(() => {
    GetClientes();
});
const SetCostumerModal = (id) => {
    HttpRequest.GetAsync('Cliente/GetById', { Id: id }, (resp) => {
        const { id, nombre, apellido, edad, correoElectronico, numeroTelefonico } = resp;
        console.log(resp);
        $('#NombreCliente').val(nombre);
        $('#ApellidoCliente').val(apellido);
    });
    
}

const GetClientes = (route = 'Cliente/GetAllAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        console.log(response);
        if (response != undefined || response != null) {
            Utilities.GenerarTabla({
                idDiv: 'divForTable',
                idTabla: 'dtUsuarios',
                cabeceras: ['Nombre', 'Apellido', 'Edad', 'Email', 'Telefono', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-hover',
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
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetCostumerModal(${data});" data-bs-toggle="modal" data-bs-target="#clientesHomeModal">
                                                Editar
                                            </a>`;
                            //console.log(full);
                            return actions;
                        }
                    },
                ],
                order: [[0, "desc"]]
            });
        } else {
            alert('No se pudo realizar la peticion');
        }
    })
}

/** document ready modern */
$(() => {
    GetClientes();
});
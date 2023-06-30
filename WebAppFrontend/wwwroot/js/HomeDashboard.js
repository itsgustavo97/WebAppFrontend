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
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetUserFields('${data}');" data-toggle="modal" data-target="#Modaledit">
                                                Editar
                                            </a>`;

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
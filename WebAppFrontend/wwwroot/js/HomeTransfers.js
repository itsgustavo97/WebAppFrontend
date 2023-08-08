let rolesModal = new bootstrap.Modal($('#transfersModal'));

$('#btnTransfersModal').click(() => {
    Utilities.LlenarSelectByUrl({ //Set select Cuentas
        url: 'Cuenta/GetAllAsync',
        idSelect: 'CuentaOrigen',
        value: 'id',
        texto: 'numeroCuenta',
    });
    //
    Utilities.LlenarSelectByUrl({ //Set select Cuentas
        url: 'Cuenta/GetAllAsync',
        idSelect: 'CuentaDestino',
        value: 'id',
        texto: 'numeroCuenta',
    });
});

const SetTransferModal = (id) => {
    $('#btnTransfersModal').click();
    rolesModal.show();
    HttpRequest.GetAsync(`Transferencia/GetById/${id}`, null, (resp) => {
        const { id, idCuentaOrigen, idCuentaDestino, monto, motivo } = resp;
        //console.log(resp);
        $('#IdTransferencia').val(id);
        $('#CuentaOrigen').val(idCuentaOrigen);
        $('#CuentaDestino').val(idCuentaDestino);
        $('#MontoTransferencia').val(monto);
        $('#MotivoTransferencia').val(motivo);
    });

};

const PostApiTransfer = (jtransfer) => {
    HttpRequest.PostAsync(`Transferencia/Create`, jtransfer, (resp) => {
        //console.log(resp);
        //debugger;
        if (resp == 1) {
            $('.btnClearModalTransfers').click();
            rolesModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetRoles();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PutApiTransfer = (jtransfer) => {
    HttpRequest.PutAsync(`Transferencia/Update`, jtransfer, (resp) => {
        //console.log(resp);
        //debugger;
        if (resp == 1) {
            $('.btnClearModalTransfers').click();
            rolesModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetRoles();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PostTransfer = () => {
    const Id = $('#IdTransferencia').val(),
        IdCuentaOrigen = $('#CuentaOrigen').val(),
        IdCuentaDestino = $('#CuentaDestino').val(),
        Monto = $('#MontoTransferencia').val(),
        Motivo = $('#MotivoTransferencia').val();
        //Construct objeto as model class
    const Transfer = { Id, IdCuentaOrigen, IdCuentaDestino, Monto, Motivo };
    //Se valida el modelo antes de enviar al petición
    if (Transfer.IdCuentaDestino == '' || Transfer.IdCuentaOrigen == '' || Transfer.Monto == '' || Transfer.Motivo == '')
        return Utilities.sweetAlertWarning('Hay campos vacios, revisa el formulario');
    if (Transfer.IdCuentaOrigen == Transfer.IdCuentaDestino)
        return Utilities.sweetAlertWarning('No se puede transferir a la misma cuenta');
    //Convert to JSON
    let jtransfer = JSON.stringify(Transfer);
    if (Id == 0) {
        PostApiTransfer(jtransfer);
    } else {
        PutApiTransfer(jtransfer);
    }

};

const GetRoles = (route = 'Transferencia/GetAllAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        //console.log(response);
        if (response != undefined || response != null) {
            Utilities.GenerarTabla({
                idDiv: 'divForTableTransfers',
                idTabla: 'dtTransferencias',
                cabeceras: ['# cuenta origen', '# Cuenta destino', '$ Monto', 'Motivo', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-striped table-hover',
                propiedadesPersonalizadas: ''
            }, {
                data: response,
                language: lenguajeEspanniolDataTable,
                columns: [
                    { data: 'idCuentaOrigen' },
                    { data: 'idCuentaDestino' },
                    {
                        data: 'monto',
                        render: (data, type, full, meta) => {
                            return `$${data}`;
                        }
                    },
                    { data: 'motivo' },
                    {
                        data: 'id',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetTransferModal(${data});" >
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
$('.btnClearModalTransfers').click(() => {
    $('#IdTransferencia').val(0);
    $("#CuentaOrigen option:selected").attr("selected", false);
    $("#CuentaDestino option:selected").attr("selected", false);
    $('#MontoTransferencia').val('');
    $('#MotivoTransferencia').val('');
});

/** document ready modern */
$(() => {
    GetRoles();
});
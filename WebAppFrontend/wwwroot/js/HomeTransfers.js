let transfersModal = new bootstrap.Modal($('#transfersModal'));

const SetTransferModal = (id) => {
    Utilities.LlenarSelectByUrl({ //Set select Cuentas
        url: 'Cuenta/GetAllAsync',
        idSelect: 'CuentaOrigen',
        value: 'id',
        texto: 'numeroCuenta',
    });
    transfersModal.show();
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
        if (resp == 1) {
            $('.btnClearModalTransfers').click();
            transfersModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetTransfers();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PutApiTransfer = (jtransfer) => {
    HttpRequest.PutAsync(`Transferencia/Update`, jtransfer, (resp) => {
        //console.log(resp);
        if (resp == 1) {
            $('.btnClearModalTransfers').click();
            transfersModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetTransfers();
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
        Motivo = $('#MotivoTransferencia').val(),
        //Construct objeto as model class
        Transfer = { Id, IdCuentaOrigen, IdCuentaDestino, Monto, Motivo };
    //Convert to JSON
    let jtransfer = JSON.stringify(Transfer);
    if (Id == 0) {
        PostApiTransfer(jtransfer);
    } else {
        PutApiTransfer(jtransfer);
    }

};

const GetTransfers = (route = 'Transferencia/GetAllAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        console.log(response);
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
    GetTransfers();
});
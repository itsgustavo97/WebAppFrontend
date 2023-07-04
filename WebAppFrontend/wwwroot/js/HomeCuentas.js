let cuentasModal = new bootstrap.Modal($('#cuentasModal'));

const SetCuentaModal = (id) => {
    transfersModal.show();
    HttpRequest.GetAsync(`Cuenta/GetById/${id}`, null, (resp) => {
        const { id, numeroCuenta, saldo } = resp;
        //console.log(resp);
        $('#IdCuenta').val(id);
        $('#NumeroCuenta').val(numeroCuenta);
        $('#SaldoCuenta').val(saldo);
    });

};

const PostApiCuenta = (jcuenta) => {
    HttpRequest.PostAsync(`Cuenta/Create`, jcuenta, (resp) => {
        //console.log(resp);
        if (resp == 1) {
            $('.btnClearModalCuentas').click();
            transfersModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetTransfers();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PutApiCuenta = (jcuenta) => {
    HttpRequest.PutAsync(`Cuenta/Update`, jcuenta, (resp) => {
        //console.log(resp);
        if (resp == 1) {
            $('.btnClearModalCuentas').click();
            transfersModal.hide();
            Utilities.sweetAlertSuccess('Se guardó con exito');
            GetTransfers();
        } else {
            Utilities.sweetAlertWarning('No se pudo guardar');
        }
    });
};

const PostCuenta = () => {
    const Id = $('#IdCuenta').val(),
        NumeroCuenta = $('#NumeroCuenta').val(),
        Saldo = $('#SaldoCuenta').val(),
        //Construct objeto as model class
        Cuenta = { Id, NumeroCuenta, Saldo };
    //Convert to JSON
    let jcuenta = JSON.stringify(Cuenta);
    if (Id == 0) {
        PostApiTransfer(jcuenta);
    } else {
        PutApiTransfer(jcuenta);
    }

};

const GetCuentas = (route = 'Cuenta/GetAllAsync') => {
    HttpRequest.GetAsync(route, null, (response) => {
        //console.log(response);
        if (response != undefined || response != null) {
            Utilities.GenerarTabla({
                idDiv: 'divForTableCuentas',
                idTabla: 'dtCuentas',
                cabeceras: ['Número de cuenta', '$ Saldo', 'Acciones'],
                estilos: 'width:100%',
                claseCss: 'table table-striped table-hover',
                propiedadesPersonalizadas: ''
            }, {
                data: response,
                language: lenguajeEspanniolDataTable,
                columns: [
                    { data: 'numeroCuenta' },
                    {
                        data: 'saldo',
                        render: (data, type, full, meta) => {
                            return `$${data}`;
                        }
                    },
                    {
                        data: 'id',
                        render: (data, type, full, meta) => {
                            let actions = `<a class="btn btn-primary btn-sm" onclick="SetCuentaModal(${data});" >
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
$('.btnClearModalCuentas').click(() => {
    $('#IdCuenta').val(0);
    $('#NumeroCuenta').val('');
    $('#SaldoCuenta').val('');
});

/** document ready modern */
$(() => {
    GetCuentas();
});
/* Este archivo es para desarrollar funciones en javascript como utilidades para el proyecto en general **/

/**
 * Este elemento contiene funciones para realizar peticiones HTTP
 * Las cuales son GetAsync, PostAsync, PostFormAsync(archivos) */
const HttpRequest = {
    /**
     * Esta función realiza una petición GET ajax por url 
     * @param ruta es la url del endpoint
     * @param data es la data de respuesta de la petición
     * @param callBack es una función para manipular la respuesta */
    GetAsync: (ruta, data, callBack) => {
        $.ajax({
            url: `http://localhost:5202/${ruta}`,
            type: "GET",
            data: data,
            async: true
        }).done((data) => {
            //rt = data;
            callBack(data);
        }).fail((xhr, textStatus, errorThrown) => {
            console.log(textStatus);
            console.log(xhr.responseText);
        });
        //return rt;
    },

    /**
     * Esta función realiza una petición POST ajax por url 
     * @param ruta es la url del endpoint
     * @param data es la data de respuesta de la petición
     * @param callBack es una función para manipular la respuesta */
    PostAsync: (ruta, data, callBack) => {
        $.ajax({
            url: `http://localhost:5202/${ruta}`,
            type: "POST",
            contentType: "application/json",
            data: data,
            async: true,
            dataType: "json"
        }).done((data) => {
            //rt = data;
            callBack(data);
        }).fail((xhr, textStatus, errorThrown) => {
            console.log(xhr.responseText);
            console.log(textStatus);
        });
        //return rt;
    },

    /**
     * Esta función realiza una petición PUT ajax por url 
     * @param ruta es la url del endpoint
     * @param data es la data de respuesta de la petición
     * @param callBack es una función para manipular la respuesta */
    PutAsync: (ruta, data, callBack) => {
        $.ajax({
            url: `http://localhost:5202/${ruta}`,
            type: "PUT",
            contentType: "application/json",
            data: data,
            async: true,
            dataType: "json"
        }).done((data) => {
            //rt = data;
            callBack(data);
        }).fail((xhr, textStatus, errorThrown) => {
            console.log(xhr.responseText);
            console.log(textStatus);
        });
        //return rt;
    },

    /**
     * Esta función realiza una petición DELETE ajax por url 
     * @param ruta es la url del endpoint
     * @param data es la data de respuesta de la petición
     * @param callBack es una función para manipular la respuesta */
    DeleteAsync: (ruta, data, callBack) => {
        $.ajax({
            url: `http://localhost:5202/${ruta}`,
            type: "DELETE",
            data: data,
            async: true,
            dataType: "json"
        }).done((data) => {
            //rt = data;
            callBack(data);
        }).fail((xhr, textStatus, errorThrown) => {
            console.log(xhr.responseText);
            console.log(textStatus);
        });
        //return rt;
    },
},

lenguajeEspanniolDataTable =
{
    // https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
},

Utilities = {
    /**
        * Función para llenar un input select con la data obtenida de una petición Get por url*/
    LlenarSelectByUrl: (objetoConsulta = null, addMethod = null) => {
        const { url, idSelect = '', value = '', texto = '', mensajeInicial = true, texto2 = null } = objetoConsulta;
        if ($(`#${idSelect}`) == undefined) {
            alert('No se encontro el input select');
            return;
        }
        HttpRequest.GetAsync(url, null, (resp) => {
            if (resp != null) {
                let contentHtml = '<option value="">Seleccione una opción</option>', objetoActual = null, mensaje2 = '';
                resp.map((item, index, array) => {
                    objetoActual = item;
                    mensaje2 = texto2 != null ? `, ${objetoActual[texto2]}` : '';
                    contentHtml += `<option value="${objetoActual[value]}">${objetoActual[texto]}${mensaje2}</option>`;
                })
                $(`#${idSelect}`).html(contentHtml);

                if (addMethod != undefined && addMethod != null) {
                    const { nameMethod, nameFunction } = addMethod;
                    $(`#${idSelect}`).attr(nameMethod, nameFunction);
                }
            } else {
                alert('Error al obtener la data para el select');
            }
        })
    },

    /**
         * Genera la tabla con la configuracion que tu definas
         * @param {any} configuracionTable es un objeto json con las siguientes propiedades: idDiv, idTabla, cabeceras, estilos, claseCss, propiedadesPersonalizadas
         * @param {any} configuracionDataTable
         */
    GenerarTabla: (configuracionTable, configuracionDataTable = null) => {
        const { idDiv, idTabla, cabeceras, estilos = 'width:100%;', claseCss = 'table table-hover', propiedadesPersonalizadas = '', claseCssTh = '' } = configuracionTable;
        let contenedor = document.getElementById(idDiv);
        if (contenedor != undefined) {
            contenedor.innerHTML = '';
            let contentHtml = `<table class="${claseCss}" id="${idTabla}" ${estilos != '' ? `style="${estilos}"` : ''} ${propiedadesPersonalizadas}><thead><tr>`;
            for (let i = 0; i < cabeceras.length; i++) {
                contentHtml += `<th  class="${claseCssTh}">${cabeceras[i].toUpperCase()}</th>`;
            }
            contentHtml += `</tr></thead><tbody></tbody></table>`;
            contenedor.innerHTML = contentHtml;
            configuracionDataTable != null ? $(`#${idTabla}`).DataTable({ ...configuracionDataTable, language: lenguajeEspanniolDataTable }) : $(`#${idTabla}`).DataTable({ 'language': lenguajeEspanniolDataTable });
        } else {
            this.sweetAlertWarning('No se encontró él contenedor donde se tiene que pintar la tabla');
        }
    },

    /**
         * muestra un mensaje de confirmacion
         * @param {any} mensaje mensaje que tendra la notificacion
         */
    sweetAlertSuccess: (mensaje) => Swal.fire('¡Exito!', mensaje, 'success'),
    /**
     * muestra un mensaje de error
     * @param {any} mensaje mensaje que tendra la notificacion
     */
    sweetAlertError: (mensaje) => Swal.fire('¡Error!', mensaje, 'error'),
    sweetAlertInfo: (mensaje) => Swal.fire('¡Información!', mensaje, 'info'),
    /**
     * muestra un mensaje de advertencia
     * @param {any} mensaje mensaje que tendra la notificacion
     */
    sweetAlertWarning: (mensaje) => Swal.fire('¡Advertencia!', mensaje, 'warning'),
}


//const GetAsync = (url, data, callBack) => {
//    axios.get(url, data != undefined ? data : null)
//    .then((response) => {
//        callBack(response);
//        console.log(response);
//    })
//    .catch((error) => {
//        console.log(error);
//    })
//}
let rt;

const path = '/', ModoSoloLectura = () => {

    let buttons = document.getElementsByClassName('btn');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if ($('#txtIdEstadoExpediente').val() == 24) {
            if (typeof $(button).attr('data-ssp') !== typeof undefined && $(button).attr('data-ssp') !== false) {//si tiene el atributo data-ssp
                $(button).removeClass('soloLectura');
            } else {
                $("#btnAmpliarTiempoResolucion").addClass('soloLectura');
                $(button).addClass('soloLectura');
            }
        } else {
            $(button).removeClass('soloLectura');
        }
    }
},
    fns = {
        PostData: (ruta, data) => {
            $.ajax({
                url: `/${ruta}`,
                type: "POST",
                data: data,
                async: false,
                dataType: "json"
            }).done((data) => {
                rt = data;
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },

        PostDataAsync: (ruta, data, callBack) => {
            $.ajax({
                url: `/${ruta}`,
                type: "POST",
                data: data,
                async: true,
                dataType: "json"
            }).done((data) => {
                rt = data;
                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        PostDataNoAsync: (ruta, data, callBack) => {
            $.ajax({
                url: `/${ruta}`,
                type: "POST",
                data: data,
                dataType: "json"
            }).done((data) => {
                rt = data;
                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        PostFormData: (ruta, formData, callBack) => {
            $.ajax({
                url: `/${ruta}`,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false
            }).done((data) => {
                rt = data;
                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        CallGet: (ruta, data) => {
            $.ajax({
                url: `/${ruta}`,
                type: "GET",
                data: data,
                async: false
            }).done((data) => {
                rt = data;
            }).fail((xhr, textStatus, errorThrown) => {
                if (flagMensajeDeProces == false) {
                    $.ajax({
                        url: `/${ruta}`,
                        type: "GET",
                        data: data,
                        async: !true
                    }).done((data) => {
                        rt = data;
                        callBack(data);
                    }).fail((xhr, textStatus, errorThrown) => {
                        alert(xhr.responseText);
                        alert(textStatus);
                    });
                    return rt;
                }

                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        CallGetAsync: (ruta, data, callBack) => {
            $.ajax({
                url: `/${ruta}`,
                type: "GET",
                data: data,
                async: true
            }).done((data) => {
                rt = data;
                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        PetitionGet: (ruta, data, callBack) => {
            $.ajax({
                url: `/${ruta}`,
                type: "GET",
                data: data,
                async: false
            }).done((data) => {
                rt = data;
                callBack(data);
            }).fail((xhr, textStatus, errorThrown) => {
                alert(xhr.responseText);
                alert(textStatus);
            });
            return rt;
        },
        MethodGet: (ruta, callback) => {
            $.get(`/${ruta}`, (result) => {
                callback(result);
            })
        }
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
    fnsGeneric = {
        textCapitalizate: (str = '') => {
            if (str == null) return '';
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        getControlsByPropertyPersonalize: (propiedad = '') => $(`[${propiedad}]`),
        /**
         * 
         * @param {any} array
         * @param {any} isId
         * @param {any} classCSS
         * @param {any} remove
         */
        addOrRemoveClassCSS: (array = [], isId = true, classCSS = '', remove = false) => {
            let complemento = isId ? '#' : '.';
            for (let i = 0; i < array.length; i++) {
                if (remove) {
                    $(complemento + array[i]).addClass(classCSS);
                } else {
                    $(complemento + array[i]).removeClass(classCSS);
                }
            }
        },
        Mensaje: (titulo = 'Se ha Eliminado!', texto = '', icono = 'success') => {
            Swal.fire(
                titulo,
                texto,
                icono
            );
        },
        MensajeConfirmacion: (titulo = 'Eliminar!', texto = 'Estas seguro que deseas eliminar el registro?',
            textoBoton = 'Si, Eliminar!', callback) => {
            Swal.fire({
                title: titulo,
                text: texto,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#162967',
                cancelButtonColor: '#d33',
                confirmButtonText: textoBoton,
                cancelButtonText: 'Cancelar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    callback();
                }
            })
        },
        /**
         * pinta la lista de errores que genera el metodo ListarErroresValidacion
         * PARA QUE FUNCIONE AL INPUT, SELECT, O TEXTAREA DEBE TENER EL NAME IGUAL A LA PROPIEDAD DEL MODELO PARA QUE HAGA MATCH
         * @param {any} ListaValidaciones la lista de errores
         */
        MostrarValidaciones: (ListaValidaciones) => {
            $('.erroresValidacion').remove();
            for (var i = 0; i < ListaValidaciones.length; i++) {
                let arregloValidacion = ListaValidaciones[i].split(':');
                if (arregloValidacion.length > 1) {
                    let InputActual = $('#' + arregloValidacion[0]);
                    if (InputActual != undefined) {
                        let mensaje = arregloValidacion[1];
                        InputActual.after('<span class="text-danger erroresValidacion">' + mensaje.trim() + '</span><br>');
                    }
                }
            }
        },
        /**
         * Esta funcion llena los una lista de select con la data que tu le pases
         * @param {any} objetoJson data json que se recibe del controlador
         * @param {any} arrayIdSelect pasas la lista de id de los select 
         * @param {any} value valor que tendra el option
         * @param {any} texto texto que mostrar el option
         * @param {any} mensajeInicial si quieres mostrar el mensaje --Seleccione una opción-- debes pasarlo como true
         * @param {any} texto2 este es un texto opcional este se pondra a la par del primer parametro (texto) 
         */
        LlenarListaDeSelects: (objetoJson, arrayIdSelect, value, texto, mensajeInicial = true, texto2 = null) => {
            let contentHtml = '', objetoActual = null, mensaje2 = '';
            if (mensajeInicial) { contentHtml += '<option value="">--Seleccione una opción--</option>' }
            //for (let i = 0; i < objetoJson.length; i++) {
            //    objetoActual = objetoJson[i];
            //    mensaje2 = texto2 != null ? objetoActual[texto2] : '';
            //    contentHtml += '<option value="' + objetoActual[value] + '" >' + objetoActual[texto] + ' ' + mensaje2 + '</option>';
            //}

            objetoJson.map((item, index, array) => {
                objetoActual = item;
                mensaje2 = texto2 != null ? objetoActual[texto2] : '';
                contentHtml += '<option value="' + objetoActual[value] + '" >' + objetoActual[texto] + ' ' + mensaje2 + '</option>';
            })
            for (var i = 0; i < arrayIdSelect.length; i++) {
                if ($('#' + arrayIdSelect[i]) != undefined) {
                    $('#' + arrayIdSelect[i]).html(contentHtml);
                }
            }
        },
        /**
         * Esta funcion llena los select con la data que tu le pases
         * @param {any} objetoJson data json que se recibe del controlador
         * @param {any} idSelect id del select al cual se le agregaran los options
         * @param {any} value valor que tendra el option
         * @param {any} texto texto que mostrar el option
         * @param {any} mensajeInicial si quieres mostrar el mensaje --Seleccione una opción-- debes pasarlo como true
         * @param {any} texto2 este es un texto opcional este se pondra a la par del primer parametro (texto) 
         */
        LlenarSelect: (objetoJson, idSelect, value, texto, mensajeInicial = true, texto2 = null) => {
            if ($(`#${idSelect}`) == undefined) {
                alert('No se encontro el combo box');
                return;
            }

            let contentHtml = '<option value="">--Seleccione una opción--</option>', objetoActual = null, mensaje2 = '';
            objetoJson.map((item, index, array) => {
                objetoActual = item;
                mensaje2 = texto2 != null ? objetoActual[texto2] : '';
                contentHtml += '<option value="' + objetoActual[value] + '" >' + objetoActual[texto] + ' ' + mensaje2 + '</option>';
            })
            $(`#${idSelect}`).html(contentHtml);
        },
        //Nueva Function
        LlenarSelectByUrl: (objetoConsulta = null, addMethod = null) => {
            const { url, idSelect = '', value = '', texto = '', mensajeInicial = true, texto2 = null } = objetoConsulta;
            if ($(`#${idSelect}`) == undefined) {
                alert('No se encontro el combo box');
                return;
            }
            fns.CallGetAsync(url, null, ({ Data, Message }) => {
                if (Data != null) {
                    let contentHtml = '<option value="">Seleccione una opción</option>', objetoActual = null, mensaje2 = '';
                    Data.map((item, index, array) => {
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
                    alert(Message);
                }
            })
        },

        /**
         * Valida que el tag seleccionado no este vacio 
         * si esta vacio agregara un mensaje debajo del input para notificar al usuario que es requerido
         * @param {any} claseValidar la clase por la cual se hara la validacion
         */
        ValidarVacios: (claseValidar) => {
            $('.erroresValidacion219089348').remove();
            let rpt = true;
            let listaInputs = $('.' + claseValidar);
            for (let i = 0; i < listaInputs.length; i++) {
                let inputActual = listaInputs[i];
                if (inputActual.value.trim() == '') {
                    rpt = false;
                    let p = document.createElement("span")
                    p.className = 'text-danger erroresValidacion219089348';
                    p.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> Dato requerido`;
                    inputActual.after(p);
                }
            }
            return rpt;
        },
        ValidarRequeridos: (idFormulario = null) => {
            $('.erroresValidacion219089348').remove();
            let controles = document.querySelectorAll(`#${idFormulario} [required]`), noHayVacios = true;
            for (let i = 0; i < controles.length; i++) {
                const control = controles[i];
                if (control.value.trim() == '') {
                    noHayVacios = false;
                    let p = document.createElement("span")
                    p.className = 'text-danger erroresValidacion219089348';
                    p.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i> Campo requerido`;
                    control.after(p);
                }
            }
            return noHayVacios;
        },
        /*
         *quita todos los mensajes de error
         */
        LimpiarValidaciones: () => $('.erroresValidacion219089348').remove(),
        /**
         *esta funcion limpia todos los componentes que contenga la clase que tu definas
         * @param {any} clase clase por la cual buscara los componentes
         */
        LimpiarFormularios: (clase = 'form-control') => {
            let controles = document.getElementsByClassName(clase);
            for (let i = 0; i < controles.length; i++) {
                controles[i].value = '';
            }
        },
        /**
         * esta funcion llena un formulario utilizando el name de los tag 
         * PARA QUE FUNCIONE AL INPUT, SELECT, O TEXTAREA DEBE TENER EL NAME IGUAL A LA PROPIEDAD DEL MODELO PARA QUE HAGA MATCH
         * @param {any} propiedades arreglo de name a los cuales se les asignara el valor
         * @param {any} objJSON json que contendra el valor de la propiedad
         */
        LlenarFormulario: (propiedades, objJSON) => {
            for (var i = 0; i < propiedades.length; i++) {
                let nombrePropiedad = propiedades[i], controlActual = document.getElementById(nombrePropiedad), dataObjeto = objJSON[nombrePropiedad];;
                if (controlActual != undefined) {
                    controlActual.value = dataObjeto;
                }
            }
        },

        /**
         * muestra un mensaje de confirmacion si se le da un ok ejecutara una funcion
         * @param {any} titulo titulo del mensaje
         * @param {any} mensaje texto de la accion
         * @param {any} icono icono que contendra el mensaje
         * @param {any} textoBotonConfirmacion el mesaje que tendra el boton de confirmacion
         * @param {any} textoBotonCancelar mensaje que contendra el boton de cancelar
         * @param {any} mostrarBotonCancelar si este parametro es true el boton de cancelar sera visible si es false se ocultara
         * @param {any} callback funcion que ejecutara al dar click al boton de confirmar
         */
        sweetAlertConfirm: (titulo = 'Confirmar', mensaje = '¿Estas seguro que deseas realizar esta acción?', icono = 'warning',
            textoBotonConfirmacion = 'Si, confirmar!', textoBotonCancelar = 'Cancelar!', mostrarBotonCancelar = true, callback, callbackCancel = null) => {
            Swal.fire({
                title: titulo,
                text: mensaje,
                icon: icono,
                showCancelButton: mostrarBotonCancelar,
                confirmButtonColor: '#162967',
                cancelButtonColor: '#d33',
                confirmButtonText: textoBotonConfirmacion,
                cancelButtonText: textoBotonCancelar
            }).then((result) => {
                if (result.isConfirmed) {
                    callback();
                } else {
                    if (callbackCancel != null) {
                        callbackCancel();
                    }
                }
            })
        },
        /**
         * agregar a un tag el popever 
         * @param {any} id el id del tag al que se le aplicara
         * @param {any} titulo que dira el titulo del popever
         * @param {any} mensaje el mensaje que tendra
         * @param {any} position la posicion que tomara 
         */
        popever: (id, titulo, mensaje, position = 'top') => {
            if (document.getElementById(id) != undefined) {
                $('#' + id).popover({
                    trigger: 'hover',
                    placement: position,
                    title: titulo.toUpperCase(),
                    content: mensaje,
                    delay: 500
                })
            }
        },
        /**
         * Agregar dom a un componente seleccionado
         * @param {any} id el id del tag que se afectara
         * @param {any} dom esta variable sera el dom que se pintara
         */
        pintarDOM: (id, dom) => {
            let tag = document.getElementById(id);
            if (tag != undefined) {
                tag.innerHTML = '';
                tag.innerHTML = dom;
            }
        },
        /**
         * oculta componentes del dom
         * @param {any} arreglo lista de los componentes a ocultar
         * @param {any} esArregloDeClases si es true buscara por el nombre de la clase si es true buscara por el id
         * @param {any} mostrarTag define si estara oculto o visible el componente, si es true oculta si es false muestra
         */
        hiddenDOM: (arreglo, esArregloDeClases = false, mostrarTag = true) => {
            let complemento = esArregloDeClases == false ? '.' : '#';
            for (let i = 0; i < arreglo.length; i++) {
                $(complemento + arreglo[i]).attr("hidden", mostrarTag);
            }
        },
        /**
         * Oculta o muestra secciones que tu elijas
         * @param {any} arreglo // el arreglo de id o clases por la cual buscara
         * @param {any} esClase// bool si es true asumira que es por clases la busque si es false buscara por id
         * @param {any} mostrar// bool si es true muestra si es false oculta
         *///
        displayTag: (arreglo, esClase = true, mostrar = true) => {
            let parametro = mostrar == false ? 'none' : 'block';
            for (var i = 0; i < arreglo.length; i++) {
                if (esClase) {
                    let lstControlesByClase = document.getElementsByClassName(arreglo[i]);
                    for (let i = 0; i < lstControlesByClase.length; i++) {
                        lstControlesByClase[i].style.display = parametro;
                    }
                } else {
                    let control = document.getElementById(arreglo[i]);
                    if (control != undefined)
                        control.style.display = parametro;
                }
            }
        },
        /**
         * quita los segundos a la hora  
         * @param {any} hora parametro que contiene la hora
         */
        quitarSegundosEnHora: (hora) => {
            let nuevaHora = "";
            if (hora != null && hora != '') {
                hora = hora.split(':');
                let horasinseg = hora[0].toString() + ":" + hora[1].toString();
                nuevaHora = horasinseg;
            }
            return nuevaHora;
        },
        /**
         * quita el resto de la fecha en formato ISO de JS para setear en un input desde JS, dejando un formato: yyyy-MM-dd
         * @param {any} fecha parametro que contiene la hora
         */
        formatFechaJS: (fecha) => {
            let nuevafecha = "";
            if (fecha != null && fecha != '') {
                fecha = fecha.split('T');
                let fechaformateada = fecha[0].toString();
                nuevafecha = fechaformateada;
            }
            return nuevafecha;
        },

        /**
         * cambia el formato de la hora  
         * @param {any} hora parametro que contiene la hora
         * @param {any} format12 si este parametro es true lo transformara a un formato de 12 hora si es false a un formato de 24 horas
         */
        cambiarFormatoHora: (hora, format12 = true) => {
            if (hora != null && hora != '') {
                //si format12 es true se hace la convercion de 24 horas a 12 horas
                if (format12) {
                    hora = hora.split(':');
                    let horaform12 = 0;
                    if ((hora[0] * 1) > 12) {
                        if (hora[0] == 12) {
                            horaform12 = 12;
                        } else {
                            for (let i = 12; i < hora[0]; i++) {
                                horaform12++;
                            }
                        }
                    }
                    else {
                        if (hora[0] < 10)
                            horaform12 = hora[0].replace('0', '');
                        else
                            horaform12 = hora[0];
                    }
                    let horaRender = horaform12 + ':' + hora[1];
                    //if ((hora[0] * 1) >= 12)
                    //    horaRender += ' PM';
                    //else
                    //    horaRender += ' AM';
                    horaRender += Number.parseInt(hora[0]) >= 12 ? ' PM' : ' AM';
                    return horaRender;
                }
                //si no se hace la inversa
                else {
                    let horaFormat12 = hora.split(' '), horaFormat24 = '', horaCapturada = horaFormat12[0].split(':');
                    if (horaFormat12[1] == 'PM') {//solo si es pm calculamos la hora
                        if (horaCapturada[0] != 12) {
                            let resultHora = (Number.parseInt(horaCapturada[0]) + 12)
                            horaCapturada[0] = resultHora > 24 ? 24 : resultHora;
                        }
                    }
                    horaFormat24 = horaCapturada[0] + ':' + horaCapturada[1] + ':00';
                    return horaFormat24;
                }
            } else {
                return null;
            }
        },
        /**
         * modifica el formato de la fecha para renderizarlo en las vistas
         * @param {any} fecha
         */
        cambiarFormatoFecha: (fecha) => {
            if (fecha != null && fecha != undefined) {
                fecha = fecha.split('T');
                let arrayFecha = fecha[0].split('-');
                let fechaFormt = arrayFecha[2] + '/' + arrayFecha[1] + '/' + arrayFecha[0];
                return fechaFormt;
            }
            return "No disponible";
        },
        /**
         * modifica el formato de la fecha para renderizarlo en las vistas
         * @param {any} fecha
         */
        getHoraFromDate: (fecha, onlyHours = false) => {

            let hora = '';
            if (onlyHours) {
                hora = fecha;
            } else {
                fecha = fecha.split('T');
                hora = fecha[1];
            }
            let arrayhora = (hora).split('.');
            return arrayhora[0];

        },
        /**
         * cambia el formato de la fecha que viene del controlador este es para agregar el value a un input tipo date
         * @param {any} fecha
         */
        cambiarFormatoFechaByInput: (fecha) => {
            if (fecha == '' || fecha == null || fecha == undefined) return null;
            if (fecha.includes('T')) {
                fecha = fecha.split('T');
                let arrayFecha = fecha[0].split('-');
                let fechaFormt = arrayFecha[0] + '-' + arrayFecha[1] + '-' + arrayFecha[2];
                return fechaFormt;
            } else {
                let arrayFecha = fecha.includes('-') ? fecha.split('-') : fecha.split('/');
                let fechaFormt = arrayFecha[0] + '-' + arrayFecha[1] + '-' + arrayFecha[2];
                return fechaFormt;
            }
        },
        /*
          funcion que permite poner el atributo disabled a algun o algunos componentes del dom utilizando su clase o id
          arreglo: variable que contendra el arreglo de id o clases por la cual agregara el atributo
          esClase: de tipo bool si es true buscara por clases si es false buscara por id
          ocultar: de tipo bool si es true agregara el atributo readonly si es false no agrega el atributo
          limpiarValue: de tipo bool si es true limpiara el value del componente
         */
        soloLectura: (arreglo, esClase = false, ocultar = true, limpiarValue = false) => {
            let complemento = esClase ? '.' : '#';
            if (esClase == false) {
                for (let i = 0; i < arreglo.length; i++) {
                    if ($(complemento + arreglo[i]) != undefined) {
                        if (limpiarValue) {
                            $(complemento + arreglo[i]).val('');
                            $(complemento + arreglo[i]).attr('disabled', ocultar);
                        } else {
                            $(complemento + arreglo[i]).attr('disabled', ocultar);
                        }
                    }
                }
            } else {
                for (let i = 0; i < arreglo.length; i++) {
                    let lstControlByClase = document.getElementsByClassName(complemento + arreglo[i]);
                    for (let j = 0; j < lstControlByClase.length; j++) {
                        if (limpiarValue) {
                            $(lstControlByClase[j]).val('');
                            $(lstControlByClase[j]).attr('disabled', ocultar);
                        } else {
                            $(lstControlByClase[j]).attr('disabled', ocultar);
                        }
                    }
                }
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
        sweetAlertLoad: (mensaje='Procesando petición...') => {
            Swal.fire({
                title: `<div><p>${mensaje}</p>
                    <center><i style="color:#184C8E" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></center></div>`,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
            });
        },
        sweetAlertPush: (message, positionMessage = 'top-end', timeMiliSecond = 1500, iconMessage = 'success') => Swal.fire({ position: positionMessage, icon: iconMessage, title: message, showConfirmButton: false, timer: timeMiliSecond }),
        /**
         * Limpia los controles que contengan x clase
         * @param {any} className
         */
        limpiarControlesByClassName(className) {
            $('.erroresValidacion219089348').remove(); let inputs = document.getElementsByClassName(className);
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }
        },
        /**
         * Pinta el tbody de una tabla
         * @param {any} idTbody el id donde se debe pintar la informacion
         * @param {any} data el json que se recibe del controlador
         * @param {any} propiedades arreglo del nombre de las propiedades a pintar
         * @param {any} acciones un string que tranforma en html (botones, select, input, textarea)
         * @param {any} propiedadesAcciones el arreglo de las propiedades qu tendra
         */
        dibujarTbody: (idTbody, data, propiedades, acciones = null, propiedadesAcciones) => {
            let content = '';
            for (let fila = 0; fila < data.length; fila++) {
                let ObjetoActual = data[fila];
                content += '<tr>';
                for (let columna = 0; columna < propiedades.length; columna++) {
                    content += '<td>' + ObjetoActual[propiedades[columna]] + '</td>';
                }
                if (acciones != null) {
                    let modificado = acciones;
                    for (let proAcc = 0; proAcc < propiedadesAcciones.length; proAcc++) {
                        let valor = ObjetoActual[propiedadesAcciones[proAcc]] == undefined ? propiedadesAcciones[proAcc] : ObjetoActual[propiedadesAcciones[proAcc]];
                        modificado = StringFormat(modificado, '{' + proAcc + '}', valor);
                        //acciones += modificado;
                    }
                    content += '<td>' + modificado + '</td>';
                }
                content += '</tr>';
            }
            document.getElementById(idTbody).innerHTML = content;
        },
        getById: (id = null) => {
            if (id != null && document.querySelector(`#${id}`) != undefined) {
                return document.querySelector(`#${id}`).value;
            } else {
                return "";
            }
        },
        setById: (id = null, value) => {
            if (id != null) {
                return document.querySelector(`#${id}`).value = value;
            }
        },
        /**
         * Genera la tabla con la configuracion que tu definas
         * @param {any} configuracionTable es un objeto json con las siguientes propiedades: idDiv, idTabla, cabeceras, estilos, claseCss, propiedadesPersonalizadas
         * @param {any} configuracionDataTable
         */
        GenerarTabla: (configuracionTable, configuracionDataTable = null) => {
            const { idDiv, idTabla, cabeceras, estilos = 'width:100%;', claseCss = 'table table-hover', propiedadesPersonalizadas = '', claseCssTh = ''} = configuracionTable;
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
        DateTimeNow: (formatYMD = false) => {
            let date = new Date(),
                month = (Number.parseInt(date.getMonth()) + 1);
            return formatYMD ? `${date.getFullYear()}/${month}/${date.getDate()}` : `${date.getDate()}/${month}/${date.getFullYear()}`;
        },
        BorrarElementosDOM: (attrName) => {
            let lstElements = document.querySelectorAll(attrName);
            for (var i = 0; i < lstElements.length; i++) {
                $(lstElements[i]).remove();
            }
        },
        GetFechaCaracteres: (fecha) => {
            if (fecha == '' || fecha == null || fecha == undefined) return 'Sin especificar';
            let fechaFormateada = new Date(fecha);
            let textFecha = ReemplazarMesIngles(fechaFormateada.toUTCString().replace('00:00:00 GMT', ''));
            return ReemplazarDiaIngles(textFecha);
        },
        GenerarFormulario: (configuracion = {}) => {
            try {
                const { contenedor, columnasContenedor, usarForm, controles, callback = null } = configuracion;
                let formularioHtml = `<div class="${columnasContenedor}">${(usarForm) ? `<form id="frm${contenedor}" class="row" >` : `<div class="row">`}`;
                const finFormularioHtml = `${(usarForm) ? `</form></div>` : `</div></div>`}`;
                for (let i = 0; i < controles.length; i++) {
                    const { columnas = 'col-sm-12', type, icon = null, leyenda, control } = controles[i];
                    if (type == 'hidden' || control == 'h4') {
                        formularioHtml += GenerarControlFormulario(controles[i]);
                    }
                    else {
                        let contenido = `<div class="${columnas} ">
                                                ${icon != null && leyenda != undefined && leyenda != '' ? `<div class"form-group"><label>${leyenda}</label></div>` : ''}
                                                <div class="${(icon != null) ? 'input-group' : 'form-group'}">
                                                    ${GenerarControlFormulario(controles[i])}
                                                </div>
                                           </div>`;
                        formularioHtml += contenido;
                    }
                }
                formularioHtml += finFormularioHtml;
                document.getElementById(contenedor).innerHTML = formularioHtml;
                if (callback != null)
                    callback();
            } catch (e) {
                console.clear();
                console.log(e);
                Swal.fire('¡Error!', 'Ocurrio un problema al generar el formulario, mas informacíon en consola', 'error')
            }
        }
    },
    fnsDataTable = {
        getNumberCurrentPage: (idTable) => document.querySelector(`#${idTable}_paginate .active a`).innerHTML,
        returnCurrentPage: (idTable, currentPage) => {
            while (true) {
                let indiceBucle, encontro = false, objetcUl = document.querySelector(`#${idTable}_paginate ul`), objectLi = objetcUl.querySelectorAll(`li`);
                for (let i = 0; i < objectLi.length; i++) {
                    if (objectLi[i].id != `${idTable}_previous`) {
                        let anclaActual = objectLi[i].querySelector('a');
                        indiceBucle = document.querySelector(`#${idTable}_paginate .active a`).innerHTML;
                        if (indiceBucle == currentPage) {
                            encontro = true;
                            break;
                        } else {
                            document.getElementById(`${idTable}_next`).click();
                            let indiceSiguientePagina = document.querySelector(`#${idTable}_paginate .active a`).innerHTML;
                            if (indiceBucle == indiceSiguientePagina) {
                                encontro = true;
                                break;
                            } else {

                            }
                        }

                    }
                }
                if (encontro) {
                    break;
                }
            }
        }
    },
    string = {
        Format: (cadena, ...indices) => {
            for (let i = 0; i < indices.length; i++) {
                while (cadena.includes(`{${i}}`)) {
                    cadena = cadena.replace(`{${i}}`, indices[i]);
                }
            }
            return cadena;
        }
    },
    StringFormat = (cadenaModificar, indice, dato) => {
        let ArrayByIndice = cadenaModificar.split(indice),
            textoRetornar = '';
        for (let i = 0; i < ArrayByIndice.length; i++) {
            textoRetornar += ArrayByIndice[i].trim();
            if (i < ArrayByIndice.length - 1)
                textoRetornar += dato;
        }
        return textoRetornar;
    },
    LoadingIcon = (pIdContenedor, pMostrar = true, mensaje = 'Creando datos, por favor espere.') => {
        const contenedor = document.getElementById(`${pIdContenedor}`);
        if (contenedor != undefined) {
            if (pMostrar) {
                contenedor.innerHTML = `<center><lottie-player src="/Scripts/JqueryUsuarioExpediente/animacionLottiefiles/IconoCarga.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player><p>${mensaje}</p></center>`;
            } else {
                if (contenedor != undefined && contenedor != null) {
                    contenedor.innerHTML = '';
                }
            }
        }
    },
    NotFoundIcon = (pIdContenedor, pMostrar = true, mensaje = 'No se encontraron resultados.') => {
        const contenedor = document.getElementById(`${pIdContenedor}`);
        if (contenedor != undefined) {
            if (pMostrar) {
                contenedor.innerHTML = `<center><lottie-player src="/Scripts/JqueryUsuarioExpediente/animacionLottiefiles/IconoNoEncontrado.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player><p>${mensaje}</p></center>`;
            } else {
                if (contenedor != undefined && contenedor != null) {
                    contenedor.innerHTML = '';
                }
            }
        }
    };


const ReemplazarMesIngles = (textFecha='') => {
    if (textFecha.toLowerCase().includes('jan'))
        return textFecha.replace('Jan', 'Enero');

    if (textFecha.toLowerCase().includes('feb'))
        return textFecha.replace('Feb', 'Febrero');

    if (textFecha.toLowerCase().includes('mar'))
        return textFecha.replace('Mar', 'Marzo');

    if (textFecha.toLowerCase().includes('apr'))
        return textFecha.replace('Apr', 'Abril');

    if (textFecha.toLowerCase().includes('may'))
        return textFecha.replace('May', 'Mayo');

    if (textFecha.toLowerCase().includes('jun'))
        return textFecha.replace('Jun', 'Junio');

    if (textFecha.toLowerCase().includes('jul'))
        return textFecha.replace('Jul', 'Julio');

    if (textFecha.toLowerCase().includes('aug'))
        return textFecha.replace('Aug', 'Agosto');

    if (textFecha.toLowerCase().includes('sep'))
        return textFecha.replace('Sep', 'Septiembre');

    if (textFecha.toLowerCase().includes('oct'))
        return textFecha.replace('Oct', 'Octubre');

    if (textFecha.toLowerCase().includes('nov'))
        return textFecha.replace('Nov', 'Noviembre');

    if (textFecha.toLowerCase().includes('dec'))
        return textFecha.replace('Dec', 'Diciembre');

    return textFecha;
}

const ReemplazarDiaIngles = (textFecha = '') => {
    if (textFecha.includes('Sun'))
        return textFecha.replace('Sun', 'Domingo');

    if (textFecha.includes('Mon'))
        return textFecha.replace('Mon', 'Lunes');

    if (textFecha.includes('Tue'))
        return textFecha.replace('Tue', 'Martes');

    if (textFecha.includes('Wed'))
        return textFecha.replace('Wed', 'Miercoles');

    if (textFecha.includes('Thu'))
        return textFecha.replace('Thu', 'Jueves');

    if (textFecha.includes('Fri'))
        return textFecha.replace('Fri', 'Viernes');

    if (textFecha.includes('Sat'))
        return textFecha.replace('Sat', 'Sabado');
    return textFecha;
}

const GenerarControlFormulario = (configControl = {}) => {
    const { leyenda = '', control = '', type = '', value = '', id, name,
        placeholder = 'Ingrese el registro', required = false, className = 'form-control', multiple = false,
        atributoPersonalizado = '', checked = false, options = [], rows = 5,
        icon = null,
        divider = false
    } = configControl;

    let controlGenerado = `${icon == null && leyenda != undefined && leyenda != '' ? `<label>${leyenda}</label>` : ''}`;
    const tipoControl = control.toLowerCase();
    let valueAnalizado = (value == null || value == 'null') ? '' : value;
    switch (tipoControl) {
        case 'input':
            if (type == 'hidden')
                controlGenerado = '';
            controlGenerado += `<input type="${type}" value="${valueAnalizado}" class="${className}" ${required ? `required` : ``} id="${id}" name="${name}" placeholder="${placeholder}" ${atributoPersonalizado} ${(checked) ? `checked` : ''}/>`;
            break;
        case 'button':
            controlGenerado += `<button type="${type}" class="${className}" ${atributoPersonalizado}>${valueAnalizado}</button>`;
            break;
        case 'select':
            controlGenerado += `<select value="${valueAnalizado}" class="${className}" ${required ? `required` : ``} id="${id}" name="${name}" ${(multiple) ? `multiple` : ``} ${atributoPersonalizado} >`;
            for (let i = 0; i < options.length; i++) {
                const { value, text } = options[i];
                controlGenerado += `<option value="${value}">${text}</option>`;
            }
            controlGenerado += '</select>';
            break;
        case 'textarea':
            controlGenerado += `<textarea id="${id}" name="${name}" rows="${rows}" class="${className}" placeholder="${placeholder}" ${atributoPersonalizado} ${(checked) ? `checked` : ''} >${valueAnalizado}</textarea>`
            break;
        case 'div':
            controlGenerado += `<div id="${id}" class="${className}" ${atributoPersonalizado}></div>`
            break;
        case 'h4':
            controlGenerado = '';
            controlGenerado += `<div class="col-sm-12"><h4 id="${id}" class="${className}" ${atributoPersonalizado}>${leyenda}</h4>${divider ? `<hr style="border:${'1px solid #000'}"/>` : ''}</div>`;
            break;

    }

    if (icon != null && (tipoControl == 'input' || tipoControl == 'select')) {
        const { id, className = 'input-group-addon bg-blue', title, atributoPersonalizado, classIcon = 'fa fa-plus' } = icon;
        controlGenerado += `<span id="${id}"
                                            class="${className}" title="${title}" ${atributoPersonalizado}>
                                        <i class="${classIcon}" aria-hidden="true"></i>
                                    </span>`;
    }
    return controlGenerado;
}

const onInputChange = (control) => {
    if ($(control).val().trim() != '') {
        $(control).removeAttr('onchange');
        let controlFiltrado = document.getElementById($(control).attr('id'));
        controlFiltrado.className = `${controlFiltrado.className.replace('is-invalid', '')} is-valid`;
        $(`#error_${controlFiltrado.id}`).remove();
    }
}

const onShowMessageByQuestion = (element, clsRemove = 'ri-message', messageContent = '') => {
    $(`.${clsRemove}`).remove();
    //if ($(element).is(':checked')) {

    //2114 es SI
    if (parseInt($(element).val()) == 2260) {
        messageContent = "<b>Resolución Inmediata</b> implica una reducción en el tiempo de respuesta de los trámites y un pago doble de la tasa o tarifa correspondiente. La procedencia de cada solicitud estará sujeta a las condiciones particulares de cada proyecto y será validada antes de aceptar el ingreso.";
        $(element).after(`<div class="ri-message"><br><div class="alert alert-success" role="alert"> ${messageContent} </div> <br></div>`);
    }
}
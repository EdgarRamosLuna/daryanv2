Descripcion
    Vincular los incisos con total  segun el Tipo de servicio NG y total RW
Analisis
    Objetivo: Crear un componente collapsable dentro de una tabla para visualizar los reportes individuales y sus incisos, según la descripción contenida en ellos.

    Pasos para lograr el objetivo:

        Componente collapsable:

        Se implementará un componente collapsable que permita mostrar los reportes individuales y sus incisos.
        Se creará una función que consulte la base de datos utilizando el ID del reporte para obtener las descripciones correspondientes a cada inciso.
        El componente collapsable contendrá una tabla para mostrar los totales de los incisos.
        Activación del componente collapsable:

        Se requerirá una función que se active al hacer click en el número que contiene el total en alguno de los siguientes campos: Total NG, Total ReWork, Total Scrap.
        El ID del reporte se pasará como parámetro en la propiedad onClick de la etiqueta <td> de la lista de reportes mostrados por número de parte.
        También se enviará como parámetro el tipo de total que se está visualizando (Total_NG, Total_RW, Total_SC).
        Consulta a la base de datos:

        Para obtener el ID necesario y consultar la base de datos, se utilizará la función mencionada en el paso anterior.
        La función enviará una solicitud a la base de datos utilizando el ID del reporte y el tipo de total como parámetros.
        Se obtendrán las descripciones correspondientes a cada inciso relacionado con el reporte y se utilizarán para actualizar dinámicamente la tabla interna del componente collapsable.

Diseño
    Para implementar el componente collapsable dentro de la tabla y visualizar los reportes individuales y sus incisos según la descripción, se puede seguir el siguiente diseño:

    Estructura HTML:

    Cada fila de la tabla contendrá una celda adicional al final para mostrar el total y actuará como activador del componente collapsable.
    Dentro de esta celda, se colocará un enlace o un botón que el usuario pueda hacer click para expandir/cerrar el componente.
    Se creará un contenedor para el componente collapsable, que inicialmente estará oculto y se mostrará cuando el usuario haga click en el total correspondiente.
    El componente collapsable contendrá una tabla interna para mostrar las descripciones y los incisos relacionados.
    CSS:

    Se utilizarán estilos CSS para ocultar inicialmente el componente collapsable y mostrarlo solo cuando sea necesario.
    Se pueden agregar estilos visuales para resaltar el total y el activador del componente cuando esté seleccionado o expandido.
    JavaScript:

    Se implementará una función para cada total (Total NG, Total ReWork, Total Scrap) que se active al hacer click en el número correspondiente.
    Al hacer click en el número del total, se llamará a la función JavaScript pasando el ID del reporte y el tipo de total como parámetros.
    La función realizará una consulta a la base de datos utilizando el ID del reporte y el tipo de total para obtener las descripciones e incisos correspondientes.
    Con los datos obtenidos, se actualizará dinámicamente la tabla interna del componente collapsable y se mostrará al usuario.
    
    Modificaciones en el cliente:

    Archivos modificado:
        src\pages\employee\Create.js
        src\pages\admin\reports\View.js

    Descripción: 
        Se realizarán modificaciones en el código del componente Create Reports para agegar prefijo obligatorio en el apartado INCIDENTES
        donde sera obligatorio colocar una descripcion del incidente en caso de contener un valor mayor que 0 (Pero no sabemos si cada item de la tabla tendra una descripcion diferente por cada inciso)        

    Archivo modificado:
        src\pages\admin\reports\View.js
    Archivo modificado: 
        src/components/admin/TotalByPartNumber.js

    Descripción: 
        Se realizarán modificaciones en el código de la tabla para agregar un menú collapsible y su funcionalidad correspondiente.
    
    Archivo modificado:
        src/styles/Styles.js

    Descripción: 
        Se realizarán modificaciones en el estilo de la tabla para ocultar el menú collapsible.
    
    Modificaciones en el servidor:

    Archivo modificado:
        application/controllers/api/Reports.php

    Descripción:
        Se creará una nueva función llamada getClausesByReportId en el controlador Reports. Esta función realizará una consulta al modelo Tabla_reportes, enviando el ID del reporte como parámetro. El modelo retornará los totales y los valores correspondientes a cada inciso, asociando las letras de los incisos con los nombres de sus incidentes.
        
    Archivo modificado: 
        application/config/routes.php

    Descripción:
        Se agregará la ruta a la nueva función del controlador Reports, para que pueda ser consultada desde el cliente.

    Archivo modificado:
        application/models/Tabla_reportes.php
        
    Descripción:
        Se creará una nueva función llamada getClausesByReportId en el modelo Tabla_reportes. Esta función recibirá el ID del reporte como parámetro y realizará un JOIN a la tabla reports_incidents para obtener los valores de los incisos según el reporte de ID. También se realizará un JOIN a la tabla report_incidents para obtener el inciso con su incidente correspondiente.
        




    

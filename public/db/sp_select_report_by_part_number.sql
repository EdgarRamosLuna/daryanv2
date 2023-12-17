DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_select_report_by_part_number`(IN `PO_nPartNumber` VARCHAR(100))
BEGIN
    -- Ajustando el límite de longitud para GROUP_CONCAT
    SET SESSION group_concat_max_len = 10000;

    -- Primero, sumamos todos los valores necesarios por reporte y por fecha
    -- en una subconsulta
    SELECT 
        agg.date AS dDateReport,
        agg.qt_inspected AS nTotalInspected,
        agg.ng_pieces AS nPiecesNG,
        agg.ok_pieces AS nPiecesOK,
        agg.re_work_parts AS nPiecesReWork,
        agg.scrap AS nPiecesScrap,
        CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT(
            'clause', ri.clause,
            'incident', ri.incident,
            'code', ci.code,
            'name', ci.name
        )), ']') AS IncidentsDetails
    FROM (
        SELECT 
            rep.id,
            rep.date,
            rcc.qt_inspected,
            rcc.ng_pieces,
            rcc.ok_pieces,
            rcc.re_work_parts,
            rcc.scrap
        FROM 
            daryan.reports rep
        JOIN 
            daryan.reports_customer_control rcc ON rep.id = rcc.id_report
        WHERE 
            rep.status IN (1, 3)
            AND rep.deleted = 0 
            AND rep.part_number = PO_nPartNumber
        GROUP BY 
            rep.id, rep.date
    ) AS agg
    -- Ahora hacemos LEFT JOIN con las tablas de incidentes para recoger los detalles
    LEFT JOIN daryan.report_incidents ri ON ri.id_report = agg.id
    LEFT JOIN daryan.cat_incidents ci ON ci.id = ri.incident
        AND ci.status = 1
        AND ci.deleted = 0
    GROUP BY agg.date;

END$$
DELIMITER ;
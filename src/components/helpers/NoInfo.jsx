import React from 'react'
import { useTranslation } from 'react-i18next';

const NoInfo = () => {
    const { t } = useTranslation();
    return (
        <tr>
            <td colSpan="12" className="table-center">
                <h1>{t('reports.no_data_in_database')}</h1>
            </td>
        </tr>
    )
}

export default NoInfo

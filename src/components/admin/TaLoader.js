import React from 'react'

const TaLoader = ({colspan}) => {
  return (
    <tr>
      <td colSpan={colspan ? colspan : 4} className='table-center'>
        
          <img src="/assets/img/loading2.svg" alt="" />
        
      </td>
    </tr>
  )
}

export default TaLoader

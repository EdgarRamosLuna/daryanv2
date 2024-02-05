import { Badge, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
const CustomInputTootip = ({
  incType,
  sClause,
  incidentLabels,
  incidents,
  dumpValue,
  setIncType,
  adminCallback
}) => {
  
  const deleteIncType = (sClause, nType, nIdDb = 0) => {
    if(typeof adminCallback === 'function'){
      adminCallback(nIdDb)
    }
    setIncType(prev => prev.filter(item => !(item.clause === sClause && item.type === nType)));
  }

  return incType?.filter((d) => d?.clause === sClause).length > 0 ? (
    <Tooltip
      title={incType
        ?.filter((d) => d?.clause === sClause)
        .map((m) => (
          <Grid sx={{
            display:'flex',
            gap:'10px',
            justifyContent:'space-between'
          }}>
            <Grid>
              <Typography>{`${incidentLabels[m.type]}`} </Typography>
            </Grid>
            <Grid
            
            ><CloseIcon color="error" onClick={() => deleteIncType(m.clause, m.type, m.nIdRit)} /></Grid>
          </Grid>
        ))}
      placement="top-end"
    >
      <Badge badgeContent={incidents[sClause]} color="primary">
        <input
          placeholder={sClause}
          readOnly
          type="text"
          style={{ textAlign: "center" }}
          defaultValue={dumpValue}
        />
      </Badge>
    </Tooltip>
  ) : (
    <input
      placeholder={sClause}
      readOnly
      type="text"
      style={{ textAlign: "center" }}
      defaultValue={dumpValue}
    />
  );
};

export default CustomInputTootip;

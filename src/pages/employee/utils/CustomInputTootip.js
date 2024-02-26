import { Badge, Grid, Tooltip, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { MainContext } from "../../../context/MainContext";
const CustomInputTootip = ({
  incType,
  sClause,
  incidentLabels,
  incidents,
  dumpValue,
  setIncType,
  adminCallback,
}) => {
  const { isAdmin } = useContext(MainContext);
  const deleteIncType = (sClause, nType, nIdDb = 0) => {
    if (typeof adminCallback === "function") {
      adminCallback(nIdDb);
    }
    setIncType((prev) =>
      prev.filter((item) => !(item.clause === sClause && item.type === nType))
    );
  };

  return incType?.filter((d) => d?.clause === sClause).length > 0 ? (
    <Tooltip
      title={incType
        ?.filter((d) => d?.clause === sClause)
        .map((m) => (
          <Grid
            sx={{
              display: `flex`,
              gap: "10px",
              justifyContent: "space-between",
              border:'1px solid',
              boxSizing:'border-box',
              padding:'5px 15px',
              borderRadius:'1rem',
              margin:"5px 0",
              alignItems:"center"
            }}
          >
            <Grid>
              <Typography>{`${incidentLabels[m.type]}`}asdadadasdad </Typography>
            </Grid>
            <Grid>
              {isAdmin ? <DeleteIcon sx={{color:"#fff", fontSize:"16px"}}  onClick={() => deleteIncType(m.clause, m.type, m.nIdRit)} /> : <></>}</Grid>   
                         
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

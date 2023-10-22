import { Badge, Tooltip, Typography } from "@mui/material";
import React from "react";

const CustomInputTootip = ({incType, sClause, incidentLabels, incidents, dumpValue}) => {
  return (
    <Tooltip
      title={incType
        ?.filter((d) => d.clause === sClause)
        .map((m) => (
          <Typography>{`${incidentLabels[m.type]}`}</Typography>
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
  );
};

export default CustomInputTootip;

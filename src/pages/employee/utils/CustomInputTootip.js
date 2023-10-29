import { Badge, Tooltip, Typography } from "@mui/material";
import React from "react";

const CustomInputTootip = ({
  incType,
  sClause,
  incidentLabels,
  incidents,
  dumpValue,
}) => {
  return incType?.filter((d) => d?.clause === sClause).length > 0 ? (
    <Tooltip
      title={incType
        ?.filter((d) => d?.clause === sClause)
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

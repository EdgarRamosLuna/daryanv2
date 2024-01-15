import { useState, useEffect } from "react";

const useReportsAdmin = () => {
  const [dfirstDate, setDFirstDate] = useState("");
  const [dLastDate, setDLastDate] = useState("");

  return { dfirstDate, setDFirstDate, dLastDate, setDLastDate };
};

export default useReportsAdmin;

import React, { useEffect, useState } from "react";
 
export const useExternalScript = (url, type = "application/javascript") => {
  let [state, setState] = useState(url ? "loading" : "idle");
 
  useEffect(() => {
    if (!url) {
      setState("idle");
 
      return;
    }
 
    let script = document.querySelector(`script[src="${url}"]`);
 
    const handleScript = (e) => {
      setState(e.type === "load" ? "ready" : "error");
    };
 
    if (!script) {
      script = document.createElement("script");
 
      script.type = type;
 
      script.src = url;
 
      script.async = true;
 
      document.body.appendChild(script);
 
      script.addEventListener("load", handleScript);
 
      script.addEventListener("error", handleScript);
    }
 
    script.addEventListener("load", handleScript);
 
    script.addEventListener("error", handleScript);
 
    return () => {
      script.removeEventListener("load", handleScript);
 
      script.removeEventListener("error", handleScript);
    };
  }, [url]);
 
  return state;
};
 
const TableauJSApiParameters = () => {
  const [newBase, setNewBase] = useState("");
 
  const viewsSrc =
    "https://public.tableau.com/views/Election3_17445537635860/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";
 
  const tableauScript =
    "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
 
  const status = useExternalScript(tableauScript, "module");
 
  const changeParameter = async () => {
    let viz = await document.getElementById("tableauViz");
 
    try {
      await viz.workbook.changeParameterValueAsync("Base Salary", newBase);
    } catch (error) {
      console.log(error);
    }
  };
 
  const renderButtons = () => (
    <>
      <input
        type="number"
        min="0"
        step="1000"
        id="newSalary"
        placeholder="Base Salary"
        value={newBase}
        onChange={(e) => setNewBase(e.target.value)}
      />
 
      <button type="button" id="changeParamButton" onClick={changeParameter}>
        Change Parameter
      </button>
    </>
  );
 
  return status === "ready" ? (
    <React.Fragment>
      {renderButtons()}
 
      <div style={{ width: "100%" }}>
        <tableau-viz
          id="tableauViz"
          src={viewsSrc}
          toolbar="hidden"
          hide-tabs
        ></tableau-viz>
      </div>
    </React.Fragment>
  ) : (
    <div>"loading..."</div>
  );
};
 
export default TableauJSApiParameters;
import { useState } from "react";

import Context from "./context";
import Loading from "components/Loading";

function Provider({ children }) {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };
  const endLoading = () => {
    setLoading(false);
  };

  const withLoading = async (func) => {
    startLoading();
    const resp = await func;
    endLoading();
    return resp;
  };

  const toggle = () => {
    setLoading(!loading);
  };

  const value = { startLoading, endLoading, withLoading, toggle, loading };

  return (
    <Context.Provider value={value}>
      {children}
      <Loading loading={loading} />
    </Context.Provider>
  );
}

export default Provider;

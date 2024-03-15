import { useContext } from "react";
import authContext from "./Context";

function _useContext() {
  return useContext(authContext);
}

export default _useContext;

import React, { useContext } from "react";
import { IUseContextValue, IBaseUiKit, IServices } from "@uikit/types"


export const Context = React.createContext<IUseContextValue<IServices, IBaseUiKit>>({} as any);

export const useCtx = () => {
    return useContext(Context);
};

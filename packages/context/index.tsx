import React, { useContext, useRef } from "react";
import { IUseContextValue, IBaseUiKit, IServices } from "@life-uikit/types";

export const Context = React.createContext<
  IUseContextValue<IServices, IBaseUiKit>
>({} as any);

export const Provider = (props: any) => {
  const { children, ...rest } = props;
  const ref = useRef<HTMLDivElement>();
  return (
    <div
      ref={(r) => {
        ref.current = r!;
      }}
    >
      <Context.Provider
        value={{
          getRootContainer: () => ref.current!,
          ...rest,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};

export const useCtx = () => {
  return useContext(Context);
};

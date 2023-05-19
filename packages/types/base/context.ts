export type IUseContextValue<S, U> = {
    services: S,
    uiKit: U,
    getRootContainer?: () => HTMLElement
}
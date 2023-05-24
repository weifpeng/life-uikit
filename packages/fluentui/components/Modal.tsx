import { IBaseUiKit } from "@life-uikit/types";
import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";

export const Modal: IBaseUiKit["Modal"] = (props) => {
  return (
    <Dialog
      open={props.visible}
      onOpenChange={(e, d) => props.afterOpenChange?.(d.open)}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>{props.children}</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={props.onCancel}>
                Cancel
              </Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={props.onOk}>
              Ok
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

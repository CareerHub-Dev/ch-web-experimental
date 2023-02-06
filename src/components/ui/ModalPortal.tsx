import { createPortal } from "react-dom";
import { type ReactNode } from "react";

export function ModalPortal(props: { children: ReactNode }) {
  return createPortal(props.children, document.getElementById("modal")!);
}

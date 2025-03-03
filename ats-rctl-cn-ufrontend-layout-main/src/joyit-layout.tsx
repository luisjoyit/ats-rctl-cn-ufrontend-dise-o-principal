import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
// export { DashboardLayout  } from "./components/layout";
export { useLanguage } from "./hooks/useLanguage";
export { t } from "i18next";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  renderType: "createRoot",
});

export const { bootstrap, mount, unmount } = lifecycles;

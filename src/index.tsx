import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterConfig } from "./router";

const root = document.querySelector("#root");
if (root) {
    createRoot(root).render(
        <StrictMode>
            <RouterConfig />
        </StrictMode>
    );
}

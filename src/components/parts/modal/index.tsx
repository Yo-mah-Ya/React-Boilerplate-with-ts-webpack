import { FC, memo, ReactNode } from "react";
import css from "./style.module.scss";

export const Modal: FC<{ children: ReactNode }> = memo(({ children }) => (
    <div className={css.overlay}>
        <div className={css.content}>{children}</div>
    </div>
));

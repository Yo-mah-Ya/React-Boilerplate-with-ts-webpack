import { FC, memo } from "react";
import css from "./style.module.scss";

export const Header: FC = memo(() => (
    <header className={css.container}>
        <nav>
            <div></div>
        </nav>
    </header>
));

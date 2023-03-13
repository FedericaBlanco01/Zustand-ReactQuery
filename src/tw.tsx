import { twMerge } from "tailwind-merge";
import classnames from "classnames";

export const tw: typeof classnames = (...args) => {
    return twMerge(classnames(...args));
    }

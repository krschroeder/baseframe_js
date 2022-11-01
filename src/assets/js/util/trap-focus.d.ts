import { Selector } from "cash-dom";

interface ITrapFocusProps {
    focusFirst?: boolean,
    nameSpace?: string,
    focusable?: ('button' | 'a' | 'input' | 'select' | 'textarea' | '[tabindex]')[]
};

declare const trapFocus: (modalEl: Selector, props: ITrapFocusProps) => {
    remove: () => void;
}

export default trapFocus;
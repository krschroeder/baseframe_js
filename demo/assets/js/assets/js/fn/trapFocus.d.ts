import type { Selector } from 'cash-dom';
interface ITrapFocusProps {
    focusFirst?: boolean;
    nameSpace?: string;
    focusable?: ('button' | 'a' | 'input' | 'select' | 'textarea' | '[tabindex]')[];
}
export interface ITrapFocusRemove {
    remove(): void;
}
declare const trapFocus: (modalEl: Selector, props?: ITrapFocusProps) => ITrapFocusRemove;
export default trapFocus;


export interface IFormInputs {
    version: string;
    radioCheckboxEnableSpacebar: () => this;
    init: () => void;
}

declare const formInputs: IFormInputs;

export default formInputs;
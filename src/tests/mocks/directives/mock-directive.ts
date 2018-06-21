import { Directive } from '@angular/core';

export const mockDirective = (options: any): Directive => {
    const metadata: Directive = {
        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs,
    };

    return Directive(metadata)(class mockDirective { });
};

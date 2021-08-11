import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appTelefone]'
})
export class TelefoneDirective {

  constructor(private el: ElementRef) { }

    @HostListener('click')
    @HostListener('input')
    onInput() {
        const inputEvent: any = event;
        const { inputType } = inputEvent;
        const { nativeElement } = this.el;
        const { selectionStart, selectionEnd } = nativeElement;
        let { value } = nativeElement;

        if (value.length > 15) {
            nativeElement.value = value.slice(0, -1);
            return;
        }

        value = value.replace(/\D/g, '');

        nativeElement.value = this.buildTelefone(value);

        if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
            nativeElement.selectionStart = selectionStart;
            nativeElement.selectionEnd = selectionEnd;
        }
    }

    private buildTelefone(value: String) {
        const stringLength = value.length;

        if (stringLength >= 0 && stringLength < 7) {
            return value.replace(/(\d{2})(\d{0,4})/g, '($1) $2');
        }

        if (stringLength >= 7 && stringLength < 11) {
            return value.replace(/(\d{2})(\d{4})(\d{0,4})/g, '($1) $2-$3');
        }

        return value.replace(/(\d{2})(\d{5})(\d{0,4})/g, '($1) $2-$3');
    }

}

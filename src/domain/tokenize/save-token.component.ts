import {Component, Input, OnChanges, Optional, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
    selector: 'app-save-token',
    templateUrl: './save-token.component.html'
})
export class SaveTokenComponent implements OnChanges, ControlValueAccessor {
    @Input()
    public token: string;
    private onChange: any;
    private onTouch: any;

    constructor(@Optional() private ngControl: NgControl) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    public ngOnChanges(simpleChanges: SimpleChanges) {
        this.token = simpleChanges.savedToken.currentValue;
    }

    public writeValue(token: string) {
        if (this.onChange) {
            this.onChange(token);
        }
        this.token = token;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public sendNewToken(formData: any) {
        this.writeValue(formData.token);
    }
}

import { Input, OnInit, Output, ViewChildren } from '@angular/core';
import { Component, ElementRef, EventEmitter, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

export interface otpModel {
  isValid: boolean;
  value: number;
  message? : string;
}

@Component({
  selector: 'lib-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.css']
})
export class OtpBoxComponent implements OnInit {
  @Output() otpChange = new EventEmitter<any>();
  @Input() otpLength = 6;
  @Input() inputType: 'text' | 'number' | 'mixed' | 'masked' = 'number';
  // @Input() allowUppercase: boolean = true;
  // @Input() showUnMaskCheckBoxYN : boolean = false;
  unmaskPassword: boolean = false;

  otpForm!: FormGroup;

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: this.fb.array([]),
    });
  }

  ngAfterViewInit(): void {
    this.buildOtpControls();

    // this.otpForm.valueChanges.subscribe((val) => {
    //   this.emitOtp();
    // });
  }

  get otpArray(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }

  private getInputPattern(): RegExp {
    const alpha =  'a-zA-Z';
    const alphanumeric = 'a-zA-Z0-9';
    switch (this.inputType) {
      case 'text':
        return new RegExp(`^[${alpha}]$`);

      case 'number':
        return /^[0-9+]$/;

      case 'mixed':
        return /^[a-zA-Z0-9]$/;

      case 'masked':
        return new RegExp(`^[${alphanumeric}]$`);

      default:
        return /^[0-9]$/;
    }
  }

  private buildOtpControls(): void {
    this.otpArray.clear();
    const pattern = this.getInputPattern();

    for (let i = 0; i < this.otpLength; i++) {
      this.otpArray.push(
        this.fb.control('', [Validators.required, Validators.pattern(pattern)])
      );
    }
  }

  togglePasswordVisibility(): void {
    this.unmaskPassword = !this.unmaskPassword;
  }

  focusFirstInput() {
    if (this.inputs && this.inputs.length > 0) {
      this.inputs.first.nativeElement.focus();
    }
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const { value, message } = this.sanitizeWithMessage(input.value);
    this.emitChange(message);
    this.otpArray.at(index).setValue(value, { emitEvent: false });

    if (value && index < this.otpLength - 1) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  private sanitizeWithMessage(rawValue: string): { value: string; message?: string } {
  switch (this.inputType) {
    case 'number':
      if (/[^0-9]/.test(rawValue)) {
        return {
          value: rawValue.replace(/\D/g, ''),
          message: 'Only numbers are allowed'
        };
      }
      return { value: rawValue };

    case 'text':
      if (/[^a-zA-Z]/.test(rawValue)) {
        return {
          value: rawValue.replace(/[^a-zA-Z]/g, ''),
          message: 'Only letters are allowed'
        };
      }
      return { value: rawValue, message: 'success' };

    case 'mixed':
    case 'masked':
      if (/[^a-zA-Z0-9]/.test(rawValue)) {
        return {
          value: rawValue.replace(/[^a-zA-Z0-9]/g, ''),
          message: 'Only letters and numbers are allowed'
        };
      }
      return { value: rawValue, message: 'success' };

    default:
      return { value: rawValue, message: 'success' };
  }
}

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (
      event.key === 'Backspace' &&
      !this.otpArray.at(index).value &&
      index > 0
    ) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

onPaste(event: ClipboardEvent): void {
  event.preventDefault();

  const pasteData = event.clipboardData?.getData('text') ?? '';
  const { value, message } = this.sanitizeWithMessage(pasteData);

  if (value.length !== this.otpLength) {
    this.emitChange('Invalid OTP length');
    return;
  }

  value.split('').forEach((char, i) => {
    this.otpArray.at(i).setValue(char, { emitEvent: false });
  });

  this.emitChange(message);
}

  private emitChange(message: any): void {
    const otp = this.otpArray.value.join('');
    this.otpChange.emit({
      value: otp,
      isValid: this.otpForm.valid,
      message: message
    });
  }
}

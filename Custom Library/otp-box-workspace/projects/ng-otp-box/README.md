# NgOtpBox

ng-otp-box is a flexible, reusable OTP (One-Time Password) input component for Angular applications.
It supports numeric, text, mixed, and password OTP, with built-in validation, paste handling, masking/unmasking, and Angular Reactive Forms support.

## Installation

#### This library supports Angular version 15 and above
```bash
npm install --save ng-otp-box
```

## Usage

### Import the Module

For **Modules**:

```typescript
import { NgOtpBoxModule } from 'ng-otp-box';

@NgModule({
  imports: [
    ...otherModules,
    NgOtpBoxModule,
  ],
})
export class AppModule {}
```

For **Standalone Components**:

```typescript
import { NgOtpBoxComponent } from 'ng-otp-box';

@Component({
  standalone: true,
  imports: [NgOtpBoxComponent],
})
export class YourComponent {}
```

```html
<ng-otp-input (otpChange)="onOtpChange($event)" [otpLength]="6" type="masked"></ng-otp-input>
```


## Component Inputs/Outputs

Name            | Type     | Required | Default | Description                                                                 |
|-----------------|----------|----------|---------|-----------------------------------------------------------------------------|
| `onOtpChange`   | `Output` | No       | --      | Emits the OTP value on change it will give your message value and otp form valid state so. Not required if using `formControl`
| `pastValue`      | function | No       | --      | Allows to paste the value.                        |
| `config`        | object   | NO      | `6` | Configuration object for customization it will take default otp length as 6 (see **Config Options** below). |


## Config Options

Name            | Type     | Required | Default | Description                                                                 |
|-----------------|----------|----------|---------|-----------------------------------------------------------------------------|
| `otpLength`      | number | No       | 6      | Number of OTP input fields.                       |
| `inputType`      |'number' | 'text' | 'mixed' | 'masked' | No       | `number`      | Determines the allowed input type:-
`• number → digits only
• text → uppercase letters
• mixed → alphanumeric
• masked → password/masked input with checkbox to unmask`                       |
| `pasteAllowed`      | boolean | No       | 6      | Allows pasting a full OTP value.                       |



## Contributing

Show your support by starring the repo!


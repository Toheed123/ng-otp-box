import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { OtpBoxComponent } from './otp-box/otp-box.component';

@NgModule({
  declarations: [OtpBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [OtpBoxComponent],
})
export class NgOtpBoxModule {}

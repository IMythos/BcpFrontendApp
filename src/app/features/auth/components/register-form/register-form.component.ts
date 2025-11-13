import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientRegister } from '../../interfaces/client-register.interface';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html'
})

export class RegisterFormComponent {
  sendRegister = output<ClientRegister>();
  readonly formBuilder = inject(FormBuilder);

  message: string = '';

  registerForm: FormGroup = this.formBuilder.group({

  })
}

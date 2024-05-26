import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isEmailInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && (emailControl?.dirty || emailControl?.touched);
  }

  isPasswordInvalid() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched);
  }

  isEmailRequiredError() {
    return this.loginForm.get('email')?.hasError('required');
  }

  isEmailFormatError() {
    return this.loginForm.get('email')?.hasError('email');
  }

  isPasswordRequiredError() {
    return this.loginForm.get('password')?.hasError('required');
  }

  isPasswordMinLengthError() {
    return this.loginForm.get('password')?.hasError('minlength');
  }

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/registro']);
    } else {
      alert('Por favor, complete los campos correctamente');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css'],
})
export class LoggingComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    if(!this.authService.autoAuthUser()){
      this.bsConfig = {
        containerClass: 'theme-red'
      };

      this.signInForm = new FormGroup({
        email: new FormControl(null, {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      });

      this.createSignUpForm();
    }
  }

  createSignUpForm () {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['male'],
        email: ['', [Validators.required, Validators.email]],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        repassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
      );
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('repassword').value
      ? null
      : { mismatch: true };
  }

  onSigningIn() {
    if (this.signInForm.invalid) {
      return;
    }
    // this.isLoading = true;
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password);
  }

  onSigningUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    // this.isLoading = true;
    const user = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      gender: this.signUpForm.value.gender,
      knownAs: this.signUpForm.value.knownAs,
      dateOfBirth: this.signUpForm.value.dateOfBirth,
      city: this.signUpForm.value.city,
      country: this.signUpForm.value.country,
      photoUrl: '../../assets/user.png'
    };
    this.authService.createUser(user);
  }
}

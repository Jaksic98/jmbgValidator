import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jmbgValidator';

  constructor(private formBuilder: FormBuilder) {}

  jmbgForm = this.formBuilder.group({
    gender: ['', Validators.required],
    jmbg: new FormControl('', [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13),
    ]),
  });

  onSubmit(): void {
    if (this.jmbgForm.valid) {
      alert(this.validate().isValid);
    }
  }

  validate(): any {
    var gender = this.jmbgForm.value.gender;
    var jmbg = this.jmbgForm.value.jmbg;

    var dd = '',
      mm = '',
      ggg = '',
      rr = '',
      bbb = '',
      k = '';

    if (jmbg !== null && jmbg !== undefined) {
      dd = String(jmbg.slice(0, 2));
      mm = String(jmbg.slice(2, 4));
      ggg = String(jmbg.slice(4, 7));
      rr = String(jmbg.slice(7, 9));
      bbb = String(jmbg.slice(9, 12));
      k = String(jmbg.slice(12, 13));
    }

    // Check if date is valid
    // there is no 31 of november

    // Check if regional code is valid
    if (Number(rr) < 1 && Number(rr) > 96) {
      return { isValid: false, errorMessage: 'Regional code is not valid!' };
    }

    // Check if gender code is valid
    if (gender === 'Male') {
      if (Number(bbb) >= 500) {
        return { isValid: false, errorMessage: 'Gender code is not valid!' };
      }
    } else {
      if (Number(bbb) < 500) {
        return { isValid: false, errorMessage: 'Gender code is not valid!' };
      }
    }

    // Check if control sum is valid
    if (jmbg !== null && jmbg !== undefined) {
      var controlCode = 0;
      controlCode =
        11 -
        ((7 * (Number(jmbg[0]) + Number(jmbg[6])) +
          6 * (Number(jmbg[1]) + Number(jmbg[7])) +
          5 * (Number(jmbg[2]) + Number(jmbg[8])) +
          4 * (Number(jmbg[3]) + Number(jmbg[9])) +
          3 * (Number(jmbg[4]) + Number(jmbg[10])) +
          2 * (Number(jmbg[5]) + Number(jmbg[11]))) %
          11);
      if (controlCode > 9) {
        controlCode = 0;
      }
      if (Number(k) !== controlCode) {
        return { isValid: false, errorMessage: 'Control code is not valid!' };
      }
    }

    return { isValid: true, errorMessage: null };
  }
}

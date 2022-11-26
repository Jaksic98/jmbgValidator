import { DatePipe } from '@angular/common';
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
  datePipeEn: DatePipe = new DatePipe('en-US');

  constructor(private formBuilder: FormBuilder) {}

  jmbgForm = this.formBuilder.group({
    jmbg: new FormControl('', [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13),
    ]),
  });

  onSubmit(): void {
    if (this.jmbgForm.valid) {
      let result = this.validate();
      alert(result.isValid);
      alert(result.errorMessage);
      // alert(this.validate().errorMessage);
    }
  }

  validate(): any {
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
    let currentDate = new Date();
    let inputDate = new Date(Number(ggg) + 1000, Number(mm) - 1, Number(dd));
    let currentMilenium =
      Number(this.datePipeEn.transform(currentDate, 'yyyy')?.slice(0, 1)) *
      1000;

    if (Number(inputDate.getDate()) !== Number(dd)) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    }

    if (Number(inputDate.getMonth()) + 1 !== Number(mm)) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    }

    if (inputDate > currentDate) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    } else {
      let isValidDate = false;
      while (currentMilenium > 0 && !isValidDate) {
        if (
          new Date(Number(ggg) + currentMilenium, Number(mm) - 1, Number(dd)) <=
          currentDate
        ) {
          isValidDate = true;
          break;
        }
        currentMilenium -= 1000;
      }

      if (!isValidDate) {
        return { isValid: false, errorMessage: 'Date is not valid!' };
      }

      // Check if regional code is valid
      if (Number(rr) < 1 && Number(rr) > 96) {
        return { isValid: false, errorMessage: 'Regional code is not valid!' };
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
}

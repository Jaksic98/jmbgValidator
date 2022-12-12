import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { concat } from 'rxjs';
import { RegionServiceService } from './region-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jmbgValidator';
  datePipeEn: DatePipe = new DatePipe('en-US');
  regions: any;
  formValid = false;
  dd = '';
  mm = '';
  yyy = '';
  rr = '';
  bbb = '';
  k = '';
  firstName: any;
  lastName: any;
  year: any;
  sex: any;
  region: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private regionService: RegionServiceService
  ) {
    this.regions = this.regionService.getRegions();
  }

  jmbgForm = this.formBuilder.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    jmbg: new FormControl('', [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13),
    ]),
  });

  onSubmit(): void {
    this.formValid = this.jmbgForm.valid;
    if (this.formValid) {
      this.firstName = this.jmbgForm.value.firstName;
      this.lastName = this.jmbgForm.value.lastName;
      let result = this.validate();
      if (result.isValid) {
        this.toastr.success('Your input for jmbg is valid!', 'JMBG is valid!');
      } else {
        this.toastr.error(result.errorMessage, 'JMBG is not valid!');
      }
    } else {
      this.toastr.error(
        'Input is not valid!',
        'First name, last name or JMBG are not valid!'
      );
    }
  }

  validate(): any {
    let jmbg = this.jmbgForm.value.jmbg;

    if (jmbg !== null && jmbg !== undefined) {
      this.dd = String(jmbg.slice(0, 2));
      this.mm = String(jmbg.slice(2, 4));
      this.yyy = String(jmbg.slice(4, 7));
      this.rr = String(jmbg.slice(7, 9));
      this.bbb = String(jmbg.slice(9, 12));
      this.k = String(jmbg.slice(12, 13));
    }

    // Check if date is valid
    let currentDate = new Date();
    let inputDate = new Date(
      Number(this.yyy) + 1000,
      Number(this.mm) - 1,
      Number(this.dd)
    );
    let currentMilenium =
      Number(this.datePipeEn.transform(currentDate, 'yyyy')?.slice(0, 1)) *
      1000;

    if (Number(inputDate.getDate()) !== Number(this.dd)) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    }

    if (Number(inputDate.getMonth()) + 1 !== Number(this.mm)) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    }

    if (inputDate > currentDate) {
      return { isValid: false, errorMessage: 'Date is not valid!' };
    } else {
      let isValidDate = false;
      while (currentMilenium > 0 && !isValidDate) {
        if (
          new Date(
            Number(this.yyy) + currentMilenium,
            Number(this.mm) - 1,
            Number(this.dd)
          ) <= currentDate
        ) {
          isValidDate = true;
          this.year = Number(currentMilenium) + Number(this.yyy);
          break;
        }
        currentMilenium -= 1000;
      }

      if (!isValidDate) {
        return { isValid: false, errorMessage: 'Date is not valid!' };
      }

      // Check if regional code is valid
      this.regions.forEach((region: { name: any; id: number }) => {
        if (region.id === Number(this.rr)) {
          this.region = region.name;
        }
      });
      if (this.region === '') {
        return { isValid: false, errorMessage: 'Regional code is not valid!' };
      }

      // Set sex
      Number(this.bbb) < 500 ? (this.sex = 'Male') : (this.sex = 'Female');

      // Check if control sum is valid
      if (jmbg !== null && jmbg !== undefined) {
        let controlCode = 0;
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
        if (Number(this.k) !== controlCode) {
          return { isValid: false, errorMessage: 'Control code is not valid!' };
        }
      }

      return { isValid: true, errorMessage: null };
    }
  }
}

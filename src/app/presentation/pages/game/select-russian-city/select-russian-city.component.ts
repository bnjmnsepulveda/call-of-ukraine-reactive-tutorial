import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RussianCityService } from 'src/app/core/application/service/russian-city.service';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { RussianCityState } from 'src/app/core/store/russian-city/russian-city.store';

@Component({
  selector: 'app-select-russian-city',
  templateUrl: './select-russian-city.component.html',
  styleUrls: ['./select-russian-city.component.css']
})
export class SelectRussianCityComponent implements OnInit {

  russianCityForm: FormGroup = null;
  city = new FormControl(null);
  russianCities: Pick<RussianCityState, 'id' | 'name'>[] = []
  @Output() russianCityChange: EventEmitter<RussianCity> = new EventEmitter<RussianCity>();

  constructor(
    private russianCityService: RussianCityService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // inti cities
    this.russianCityService
      .getInputSelectData()
      .subscribe(data => this.russianCities = data)
    // creating form
    this.russianCityForm = this.fb.group({
        city: [null]
      });
  }

  submit() {
    console.log("Form Submitted")
    this.russianCityChange.emit(this.russianCityForm.value.city)
  }




}

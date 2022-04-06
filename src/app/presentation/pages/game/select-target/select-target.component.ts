import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RussianTargetService } from 'src/app/core/application/service/russian-target.service';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';

@Component({
  selector: 'app-select-target',
  templateUrl: './select-target.component.html',
  styleUrls: ['./select-target.component.css']
})
export class SelectTargetComponent implements OnInit {

  formGroup: FormGroup;
  russianTarget = new FormControl(null)
  russianTargets: RussianTarget[] = []
  @Output() 
  russianTargetChange: EventEmitter<RussianTarget> = new EventEmitter<RussianTarget>();
  
  constructor(private fb: FormBuilder, private russiantargetService: RussianTargetService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      russianTarget: [null]
    })
    this.russianTargets = this.russiantargetService.all()
  }

  submit(){
    this.russianTargetChange.emit(this.formGroup.value.russianTarget)
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() title = ''
  @Input() message = ''

  constructor() { }

  ngOnInit(): void {
  }

}

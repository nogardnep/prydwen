import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  @Input() src: string;
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}

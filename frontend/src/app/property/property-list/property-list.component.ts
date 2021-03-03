import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Array<any> = [
    {
      ID: 1,
      Name: 'Fantastic House',
      Type: 'House',
      Price: 150000,
    },
    {
      ID: 2,
      Name: 'Heritage Property',
      Type: 'Appartment',
      Price: 100000,
    },
    {
      ID: 3,
      Name: 'Coze Home',
      Type: 'House',
      Price: 200000,
    },
    {
      ID: 4,
      Name: 'Pearl Villa',
      Type: 'House',
      Price: 500000,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

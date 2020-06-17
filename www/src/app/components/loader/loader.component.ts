import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isActive:string = "";

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.show$.subscribe( sub => {
      if (sub === true) {
        this.isActive = 'is-active';
      } else {
        this.isActive = '';
      }
    });
  }

}

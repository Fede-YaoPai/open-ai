import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/core/services/app-state.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(protected store: AppStateService) { }

  ngOnInit(): void {
  }

}

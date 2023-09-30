 import { Component,ViewChild } from '@angular/core';
import { FiltersComponent } from '../components/filters/filters.component';
@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;
  selectedFilters!:{course:string,year:number,sort:string,minMark:number,maxMark:number}
  onFiltersSelected(filters:{course:string,year:number,sort:string,minMark:number,maxMark:number}){
    console.log(filters.course,filters.year,filters.sort);
    this.selectedFilters=filters;
  }
}

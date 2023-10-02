 import { Component,ViewChild } from '@angular/core';
import { FiltersComponent } from '../components/filters/filters.component';
@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;
  selectedFilters!:{course:string,year:number,sort:string,minMark:number,maxMark:number,sortMarks:string}
  onFiltersSelected(filters:{course:string,year:number,sort:string,minMark:number,maxMark:number,sortMarks:string}){
    console.log(filters.course,filters.year,filters.sort,filters.sortMarks);
    this.selectedFilters=filters;
  }
}

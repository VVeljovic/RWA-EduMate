import { Component, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  selectedCourse: string ='';
  selectedYear:number=-1;
  selectedDirection:string = '';
  @Output() filtersSelected: EventEmitter<{ course: string, year: number,sort:string }> = new EventEmitter();  showSelectedOptions()
  {
    const selectedFilters = {
      course:this.selectedCourse,
      year:this.selectedYear,
      sort:this.selectedDirection
    }
    this.filtersSelected.emit(selectedFilters);
  }
}

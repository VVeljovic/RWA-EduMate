import { Component, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  selectedCourse: string = 'None';
  selectedYear:number=-1;
  @Output() filtersSelected: EventEmitter<{ course: string, year: number }> = new EventEmitter();  showSelectedOptions()
  {
    const selectedFilters = {
      course:this.selectedCourse,
      year:this.selectedYear
    }
    this.filtersSelected.emit(selectedFilters);
  }
}

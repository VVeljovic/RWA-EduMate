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
  selectedMinMark:number=-1;
  selectedMaxMark:number = -1;
  selectedDirectionOfMarks='';
  @Output() filtersSelected: EventEmitter<{ course: string, year: number,sort:string,minMark:number,maxMark:number,sortMarks:string }> = new EventEmitter();  showSelectedOptions()
  {
    const selectedFilters = {
      course:this.selectedCourse,
      year:this.selectedYear,
      sort:this.selectedDirection,
      minMark:this.selectedMinMark,
      maxMark:this.selectedMaxMark,
      sortMarks:this.selectedDirectionOfMarks
    }
    this.filtersSelected.emit(selectedFilters);
  }
}

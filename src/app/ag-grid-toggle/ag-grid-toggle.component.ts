import { Component } from '@angular/core';

@Component({
  selector: 'app-ag-grid-toggle',
  templateUrl: './ag-grid-toggle.component.html',
  styleUrls: ['./ag-grid-toggle.component.css']
})
export class AgGridToggleComponent {
  test : any = {
    "1" : true,
    "2" : true,
    "3" : true,
    "4" : true
  }
  expandHeader(hideElement: any) {
    
    hideElement.forEach((element : any) => {
      this.test[element] = false
  })
    const pageElement = document.getElementById('page');
    if (pageElement) {
      pageElement.style.gridTemplateAreas = '"head" ';
    }
  }
  revert(showElement: any) {
   showElement.forEach((element : any) => {
        this.test[element] = true
    });
    const pageElement = document.getElementById('page');
    if (pageElement) {
      pageElement.style.gridTemplateAreas = '"head head""nav  main"".  foot"';
    }
  }
}

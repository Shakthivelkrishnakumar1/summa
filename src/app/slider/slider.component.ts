import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  tests: any = {
    "1": true,
    "2": true,
  };
  userData: any[] = [];
  companyData: any[] = [];
  userColumnDefs = [
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'insuredAmount', headerName: 'Insured Amount' },
    { field: 'companyName', headerName: 'Company Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'userLocation', headerName: 'Location' }
  ];
  companyColumnDefs = [
    { field: 'companyName', headerName: 'Company Name' },
    { field: 'companyLocation', headerName: 'Location' },
    { field: 'startedOn', headerName: 'Started On' }
  ];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  isExpandedLeft = false;
  isExpandedRight = true;
  isLeftArrowVisible = true;
  isRightArrowVisible = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserData();
    this.fetchCompanyData();
  }

  fetchUserData() {
    this.http.get<any[]>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/users')
      .subscribe(data => {
        console.log('User Data:', data); // Log fetched data
        this.userData = data;
      }, error => {
        console.error('Error fetching user data:', error);
      });
  }

  fetchCompanyData() {
    this.http.get<any[]>('https://63ad81dada81ba97619ef936.mockapi.io/api/v1/company')
      .subscribe(data => {
        console.log('Company Data:', data); // Log fetched data
        this.companyData = data;
      }, error => {
        console.error('Error fetching company data:', error);
      });
  }

  expandHeaders(side: 'left' | 'right') {
    console.log(this.isExpandedLeft,this.isExpandedRight,this.isLeftArrowVisible,this.isRightArrowVisible)
    const pageElement = document.getElementById('pages');
    if (pageElement) {
      if (side === 'left') {
        if (this.isExpandedLeft) {
          pageElement.style.gridTemplateAreas = '"head nav"';
          this.tests['1'] = true;
          this.tests['2'] = true;
          this.isLeftArrowVisible = true;
          this.isRightArrowVisible = true;
        } else {
          pageElement.style.gridTemplateAreas = '"head"';
          this.tests['2'] = false;
          this.isLeftArrowVisible = false;
          this.isRightArrowVisible = true;
        }
        this.isExpandedLeft = !this.isExpandedLeft;
      } else if (side === 'right') {
        if (this.isExpandedRight) {
          pageElement.style.gridTemplateAreas = '"head nav"';
          this.tests['1'] = true;
          this.tests['2'] = true;
          this.isLeftArrowVisible = true;
          this.isRightArrowVisible = true;
        } else {
          pageElement.style.gridTemplateAreas = '"nav"';
          this.tests['1'] = false;
          this.isLeftArrowVisible = true;
          this.isRightArrowVisible = false;
        }
        this.isExpandedRight = !this.isExpandedRight;
      }
    }
  }

  getPageStyles() {
    if (this.isExpandedLeft) {
      return {
        'grid-template-areas': '"head"'
      };
    } 
    else {
      return {
        'grid-template-areas': '"head nav"'
      };
    }
  }
}

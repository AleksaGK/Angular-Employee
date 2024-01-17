import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SimpledEmployee } from 'src/app/models/simpledEmployee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  employees: SimpledEmployee[] = [];
  isLoading: boolean = true;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data;
      this.isLoading = false;
    });
  }
}

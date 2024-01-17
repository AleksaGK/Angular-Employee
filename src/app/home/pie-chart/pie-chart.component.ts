import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SimpledEmployee } from 'src/app/models/simpledEmployee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: (string | string[])[] = [];
  public pieChartDatasets: {
    data: number[];
  }[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  employees: SimpledEmployee[] = [];
  isLoading: boolean = true;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      const totalHours: number = this.employees.reduce(
        (total, employee) => total + employee.hours,
        0
      );
      this.isLoading = false;
      this.pieChartLabels = this.employees.map((employee) => employee.name);
      this.pieChartDatasets = [
        {
          data: this.employees.map(
            (employee) => (employee.hours / totalHours) * 100
          ),
        },
      ];
    });
  }
}

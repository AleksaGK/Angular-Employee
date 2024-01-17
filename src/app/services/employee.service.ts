import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, map } from 'rxjs';
import { SimpledEmployee } from '../models/simpledEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url: string =
    'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<SimpledEmployee[]> {
    return this.http.get<Employee[]>(this.url).pipe(
      map((employees) => {
        let simpledEmployees: SimpledEmployee[] = [];
        employees.forEach((e) => {
          if (!e.EmployeeName) return;
          const foundEmployee = this.employeeExists(
            simpledEmployees,
            e.EmployeeName
          );
          if (!foundEmployee)
            simpledEmployees.push({
              name: e.EmployeeName,
              hours: this.timeInHours(e.StarTimeUtc, e.EndTimeUtc),
            });
          else
            foundEmployee.hours += this.timeInHours(
              e.StarTimeUtc,
              e.EndTimeUtc
            );
        });
        return simpledEmployees
          .sort((a, b) => b.hours - a.hours)
          .map((e) => ({
            name: e.name,
            hours: Math.round(e.hours),
          }));
      })
    );
  }

  private employeeExists(employees: SimpledEmployee[], name: string) {
    return employees.find((e) => e.name === name);
  }

  private timeInHours(start: string, end: string) {
    const startTimeUtc: Date = new Date(start);
    const endTimeUtc: Date = new Date(end);

    const timeDifferenceMs = endTimeUtc.getTime() - startTimeUtc.getTime();

    return timeDifferenceMs / (1000 * 60 * 60);
  }
}

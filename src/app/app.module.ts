import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './home/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './home/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    SpinnerComponent,
    PieChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

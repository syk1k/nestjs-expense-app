import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ReportType } from './data';
import { v4 as uuid } from "uuid"
import { AppService } from './app.service';

@Controller("report/:type")
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getAllReports(@Param("type") type: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }


  @Get(":id")
  getReportById(@Param("type") type: string, @Param("id", ParseUUIDPipe) id: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(@Body() {amount, source}: {amount: number, source: string}, @Param("type") type: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(
      reportType, {amount, source}
    )
  }

  @Put(":id")
  updateReport(@Body() body: {amount: number, source: string}, @Param("type") type: string, @Param("id", ParseUUIDPipe) id: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport(reportType, body, id)
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(@Param("id", ParseUUIDPipe) id: string){
    return this.appService.deleteReport(id)
  }

}
 
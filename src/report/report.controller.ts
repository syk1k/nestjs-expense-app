import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType } from '../data';
import { v4 as uuid } from "uuid"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from '../dtos/report.dtos';
import { ReportService } from './report.service';

@Controller("report/:type")
export class ReportController {
  constructor(private readonly service: ReportService){}

  @Get()
  getAllReports(@Param("type", new ParseEnumPipe(ReportType)) type: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.service.getAllReports(reportType)
  }


  @Get(":id")
  getReportById(@Param("type", new ParseEnumPipe(ReportType)) type: string, @Param("id", ParseUUIDPipe) id: string){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.service.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() {amount, source}: CreateReportDto,
    @Param("type") type: string
  ): ReportResponseDto {
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.service.createReport(
      reportType, {amount, source}
    )
  }

  @Put(":id")
  updateReport(
    @Body() body: UpdateReportDto, 
    @Param("type") type: string, 
    @Param("id", ParseUUIDPipe) id: string
  ): ReportResponseDto{
    console.log(body);
  
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE
    return this.service.updateReport(reportType, body, id)
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(@Param("id", ParseUUIDPipe) id: string){
    return this.service.deleteReport(id)
  }
}

import { Injectable } from '@nestjs/common';
import { ReportType, data, Report, ReportCreateReqData } from "./data";
import { v4 as uuid } from "uuid"


@Injectable()
export class AppService {
  getAllReports(type: ReportType): Report[] {
    return data.report.filter(report => report.type === type)
  }


  getReportById(type: ReportType, id: string): Report{
    return data.report.filter(report => report.type === type).find(report => report.id === id)
  }


  createReport(type: ReportType, {amount, source}: ReportCreateReqData): Report{
    const newReport  = {
      id: uuid(),
      amount: amount,
      source: source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }

    data.report.push(newReport)
    return newReport

  }


  updateReport(type: ReportType, body: ReportCreateReqData, id: string): Report{
    const reportToUpdate = data.report.filter(report => report.type === type).find(report => report.id === id)

    if(!reportToUpdate) return;
    const reportIndex = data.report.findIndex(report => report.id === id)
    
    data.report[reportIndex] = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date()
    }

    return data.report[reportIndex]
  }


  deleteReport(id: string){
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return
    data.report.splice(reportIndex, 1)
    return "Data deleted"
  }
}

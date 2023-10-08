import { Injectable } from '@nestjs/common';
import { ReportType, data, ReportCreate, ReportUpdate } from  "../data"
import { v4 as uuid } from "uuid"
import { ReportResponseDto } from 'src/dtos/report.dtos';

@Injectable()
export class ReportService {
    getAllReports(type: ReportType): ReportResponseDto[] {
        return data.report.filter(report => report.type === type).map(report => new ReportResponseDto(report))
      }
    
    
      getReportById(type: ReportType, id: string): ReportResponseDto{
        const report = data.report.filter(report => report.type === type).find(report => report.id === id)
        if (!report) return
        return new ReportResponseDto(report)
      }
    
    
      createReport(type: ReportType, {amount, source}: ReportCreate): ReportResponseDto{
        const newReport  = {
          id: uuid(),
          amount: amount,
          source: source,
          created_at: new Date(),
          updated_at: new Date(),
          type: type
        }
    
        data.report.push(newReport)
        return new ReportResponseDto(newReport)
    
      }
    
    
      updateReport(type: ReportType, body: ReportUpdate, id: string): ReportResponseDto{
        const reportToUpdate = data.report.filter(report => report.type === type).find(report => report.id === id)
    
        if(!reportToUpdate) return;
        const reportIndex = data.report.findIndex(report => report.id === id)
        
        data.report[reportIndex] = {
          ...reportToUpdate,
          ...body,
          updated_at: new Date()
        }
        
        return new ReportResponseDto(data.report[reportIndex])
      }
    
    
      deleteReport(id: string){
        const reportIndex = data.report.findIndex(report => report.id === id)
        if(reportIndex === -1) return
        data.report.splice(reportIndex, 1)
        return "Data deleted"
      }
}

import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
    constructor(private readonly service: SummaryService){}
    @Get()
    calculateSummary(){
        return this.service.calculateSummary()
    }
}

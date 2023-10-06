interface Data{
    report: Report[]
}


export interface Report{
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType
}

export interface ReportCreateReqData {
    source: string;
    amount: number;
}



export enum ReportType{
    INCOME = "income",
    EXPENSE = "expense"
}

export const data: Data = {
    report: [
        {
            id: "uiid1",
            source: "Food",
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        },
        {
            id: "uiid2",
            source: "Salary",
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        }
    ]
};



data.report.push({
    id: "uiid",
    source: "Car Wash",
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.EXPENSE
})
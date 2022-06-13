const pdf_table_extractor_run = require('pdf-table-extractor');
 
export interface IPDFDataPageTableModel {
    page: number
    tables: any[]  
    merges: any
    merge_alias: any
    width: number
    height: number
}

export interface IPDFDataModel {
    numPages: number
    currentPages: number  
    pageTables: IPDFDataPageTableModel[]
}

export async function convertPdfTOJson(pdf_file: string): Promise<IPDFDataModel> {
    
    return new Promise((resolve, reject) => {
    
        pdf_table_extractor_run(pdf_file, 
            (result: IPDFDataModel) => resolve(result),
            (err: any) => reject(err))
    })
}
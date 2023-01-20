import { ref } from "vue";
import yaml from "yaml";

export const globalData = ref<string>("")
export const allNamespaces = ["TEST"]


export class QCReport {
    dangling_edges: [] = []
    edges: [] = [];
    missing_nodes: [] = [];
    nodes: [] = []
    constructor(source: Partial<QCReport>) {
        Object.assign(this, source);
    }
}


export class QCPart {
    categories: [] = [];
    missing: number | undefined;
    name: string = "";
    namespaces: [] = [];
    node_types: [] = [];
    predicates: [] = [];
    taxon: [] | undefined;
    total_number: number | undefined;
    constructor(source: Partial<QCPart>) {
        Object.assign(this, source)
    }
}


const files = ["https://data.monarchinitiative.org/monarch-kg-dev/latest/qc_report.yaml"];


async function fetchData(url = "") {
    const response = await fetch(url);
    const text = await response.text();
    const parsed = await yaml.parse(text);
    return parsed;
}


export async function fetchAllData() {
    const arrayofpromises = files.map(fetchData);
    const allresults = await Promise.all(arrayofpromises);
    console.log(allresults)
    globalData.value = allresults[0].toString();
    const allreports = allresults.map(processReport);
    console.log(allreports)
}


export function processReport(report: any) {
    const qc_report = new QCReport(report)
    console.log(qc_report)
    getNamespaces(qc_report.dangling_edges)
    return qc_report
}


export function getNamespaces(report_part: any) {
    console.log(report_part)
    for (const item in report_part) {
        // console.log(item)
        const qc_part = new QCPart(report_part[item])
        console.log(qc_part)
        // allNamespaces.join(item.)
    }
}

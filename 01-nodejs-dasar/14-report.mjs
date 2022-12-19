import process from "process";

process.report.reportOnFatalError = true;
process.report.reportOnSignal = true;
process.report.reportOnUncaughtException = true;
process.report.filename = "14-report.json";

function sampleError() {
  throw new Error("Ups");
}

sampleError();

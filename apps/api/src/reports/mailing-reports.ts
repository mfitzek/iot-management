import { Injectable } from '@nestjs/common';
import { ReportService } from './reports.service';
import { MailOptions } from '@iot/mailing';
import { AttributeData } from '@iot/reports';
import { GmailMailService } from '../mailing/mail.service';
import { Logger } from '@iot/logger';

@Injectable()
export class MailingReports {
  constructor(private reportService: ReportService, private mailService: GmailMailService) {}

  public async maillAllReports() {
    const reports = await this.reportService.getAllReportsForMail();

    const timestamp = Date.now();

    const reportsThatShouldBeSent = reports.filter((report) => {
      return (
        report.lastSent.getTime() + report.intervalMs < timestamp && report.attributes.length > 0
      );
    });
    console.log(reports.length, reportsThatShouldBeSent.length);
    for (const report of reportsThatShouldBeSent) {
      const data = await this.reportService.getReportData('', report.id);

      const mailOptions: MailOptions = {
        to: report.userEmail,
        subject: `Report ${report.name}`,
        text: this.generateMailHtml(report.name, data),
        html: this.generateMailHtml(report.name, data),
      };
      Logger.instance.info(`Sending report ${report.name} to ${report.userEmail}`);
      await this.mailService.sendMail(mailOptions);
      await this.reportService.updateLastSent(report.id, new Date(timestamp));
    }
  }

  private generateMailHtml(reportName: string, data: AttributeData[]): string {
    const table = this.generateTable(data);
    return `
    <h1>Report ${reportName}</h1>
    <table>
      <tr>
        <th>Device</th>
        <th>Attribute</th>
        <th>Min</th>
        <th>Max</th>
        <th>Average</th>
        <th>Records</th>
      </tr>
      ${table}
    </table>
    `;
  }
  private generateTable(data: AttributeData[]): string {
    let table = '';
    for (const attribute of data) {
      table += `
      <tr>
        <td>${attribute.device}</td>
        <td>${attribute.attribute}</td>
        <td>${attribute.min}</td>
        <td>${attribute.max}</td>
        <td>${attribute.avg}</td>
        <td>${attribute.records}</td>
      </tr>
      `;
    }
    return table;
  }
}

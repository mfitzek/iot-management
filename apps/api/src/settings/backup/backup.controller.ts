import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import moment from 'moment';
import 'multer';
import { JwtAuthGuard } from './../../auth/guards/jwt.guard';
import { BackupService } from './backup.service';
import { Response } from 'express';

@Controller('backup')
@UseGuards(JwtAuthGuard)
export class BackupController {
  constructor(private backupService: BackupService) {}

  @Get() async downloadBackup(@Res() res: Response) {
    const file = await this.backupService.createBackup();
    const filename = `${moment().format('YYYY-MM-DDTHH-mm-ss')}.zip`;
    res.set(
      'Content-Type',
      'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
    );
    res.set('Content-Disposition', `attachment; filename=${filename}`);
    res.set('Content-Length', file.length.toString());
    res.send(file);
    return res;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      if (file?.buffer) {
        this.backupService.restore(file.buffer);
      }
      return 'OK';
    } catch (error) {
      res.statusCode = 400;
      return 'Restore failed';
    }
  }
}

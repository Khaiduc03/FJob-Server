import { FcmService } from '@doracoder/fcm-nestjs';
import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FCMService {
    constructor(private readonly fcmService: FcmService) {}

    async sendToDevices(devices: Array<string>, payload: firebaseAdmin.messaging.MessagingPayload, silent: boolean) {
        await this.fcmService.sendNotification(devices, payload, silent);
    }
}

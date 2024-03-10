import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  generateToken(email: string, role: string): string {
    const secretKey = environment.secretKey;
    const timestamp = new Date().toISOString();
    const uniqueString = crypto.randomBytes(16).toString('hex');

    const token = crypto.createHmac('sha256', secretKey)
                        .update(`${email}${role}${timestamp}${uniqueString}`)
                        .digest('hex');

    return token;
  }
}

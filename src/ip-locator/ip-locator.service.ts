import { Injectable } from '@nestjs/common';
import { IpLocator } from '@sasmeee/ip-locator';

@Injectable()
export class IpLocatorService {
  private ipLocator: IpLocator;

  constructor() {
  }

  getIpAddress(req: any): string {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return Array.isArray(ip) ? ip[0] : ip;
  }

  async getIpLocation(ip: string): Promise<any> {
    try {
        this.ipLocator = new IpLocator();
      const location = await this.ipLocator.locate(ip);
      return location;
    } catch (error) {
      throw new Error('Unable to locate IP address');
    }
  }

}

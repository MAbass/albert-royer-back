import * as https from "https";
import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosExchange {
  instance() {
    return axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false
      })
    });
  }
}

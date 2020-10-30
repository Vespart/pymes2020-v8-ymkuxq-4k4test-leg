import { Injectable } from "@angular/core";
import { Servicio } from "../models/servicio";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiciosService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = "https://bitgocba.duckdns.org/api/servicios";
  }

  get() {
    return this.httpClient.get(this.url);
  }

  post(servicio: Servicio) {
    return this.httpClient.post(this.url, servicio);
  }
}

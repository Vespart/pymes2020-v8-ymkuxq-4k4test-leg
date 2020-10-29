import { Component, OnInit } from "@angular/core";
import { Servicio } from "../../models/servicio";
import { ServiciosService } from "../../services/servicios.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  constructor(
    private serviciosService: ServiciosService,
    public formBuilder: FormBuilder
  ) {}

  Titulo = "Servicios disponibles";
  Servicios: Servicio[] = [];
  FormGrabar: FormGroup;

  ngOnInit() {
    this.getServicio();
    this.FormGrabar = this.formBuilder.group({
      IdPais: 0,
      NombrePais: ["", Validators.required],
      PoblacionPais: [
        0,
        [Validators.required, Validators.pattern("[0-9]{1,7}")]
      ]
    });
  }

  getServicio() {
    this.serviciosService.get().subscribe((data: serviciosService[])=>this.Pais=data)
  }
}

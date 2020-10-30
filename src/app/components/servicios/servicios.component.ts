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
  Titulo = "Servicios disponibles";
  Items: Servicio[] = [];
  FormGrabar: FormGroup;
  Acciones = ["Listado", "Alta"];
  AccionActual = this.Acciones[0];

  constructor(
    private serviciosService: ServiciosService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getServicio(),
      (this.FormGrabar = this.formBuilder.group({
        IdServicio: 0,
        DescripcionServicio: [
          "",
          [Validators.required, Validators.maxLength(55)]
        ],
        ImporteServicio: [
          0,
          [
            Validators.required,
            Validators.pattern("[0-9]+(.[0-9][0-9])"),
            Validators.maxLength(15)
          ]
        ],
        CantidadHorasServicio: [0, [Validators.required]]
      }));
  }

  getServicio() {
    this.serviciosService.get().subscribe((res: Servicio[]) => {
      this.Items = res["Lista"];
    });
  }

  volver() {
    this.AccionActual = this.Acciones[0];
    this.getServicio();
  }

  showAltaForm() {
    this.FormGrabar.reset();
    this.AccionActual = this.Acciones[1];
  }

  alta() {
    const itemCopy = { ...this.FormGrabar.value };
    let newservicio = new Servicio();
    newservicio.IdServicio = 0;
    newservicio.Descripcion = itemCopy.Descripcion;
    newservicio.Importe = itemCopy.Importe;
    newservicio.CantidadHoras = itemCopy.CantidadHoras;
    console.log(newservicio);
    this.serviciosService.post(newservicio).subscribe(() => this.volver());
  }
}

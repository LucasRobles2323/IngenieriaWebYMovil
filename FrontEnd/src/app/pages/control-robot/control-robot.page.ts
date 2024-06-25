import { Component, OnInit } from '@angular/core';
import { SensorService } from 'src/app/services/sensor.service';
import { Subscription, interval } from 'rxjs';

interface Sensores {
  rgb: string;
  distance: string;
}

@Component({
  selector: 'app-control-robot',
  templateUrl: './control-robot.page.html',
  styleUrls: ['./control-robot.page.scss'],
})
export class ControlRobotPage implements OnInit {
  sensorData: any = {}; // Variable para almacenar los datos del sensor
  private sensorSubscription: Subscription = new Subscription();

  private R = 12;
  private G = 1;
  private B = 5;
  private Distance = 10;

  constructor(private sensorService: SensorService) { }

  ngOnInit() {
    // Llamar a getSensores cada segundo
    this.sensorSubscription = interval(1000).subscribe(() => {
      this.updateAndFetchSensorData();
    });
  }

  ngOnDestroy() {
    // Desechar la subscripción al destruir el componente para evitar memory leaks
    if (this.sensorSubscription) {
      this.sensorSubscription.unsubscribe();
    }
  }

  updateAndFetchSensorData() {
    // Aumentar los valores de R, G, B, y Distance en 1
    this.R++;
    this.G++;
    this.B++;
    this.Distance++;

    // Generar la cadena con los valores actualizados
    const cadenaSensor = `R:${this.R}G:${this.G}B:${this.B}D:${this.Distance.toFixed(2)}`;

    // Llamar al servicio para obtener los datos del sensor
    this.getSensorData(cadenaSensor);
  }

  getSensorData(cadenaSensor: string) {
    console.log("Obtener datos del sensor:", cadenaSensor);

    this.sensorService.getSensor(cadenaSensor).subscribe(
      response => {
        this.sensorData.rgb = `(${response.RGB})`;
        this.sensorData.distance = response.Distancia;
      },
      error => {
        console.error('Error al obtener los datos del sensor', error);
      }
    );
  }

}

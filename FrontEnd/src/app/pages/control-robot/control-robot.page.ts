import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SensorService } from 'src/app/services/sensor.service';
import { Subscription, interval } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-control-robot',
  templateUrl: './control-robot.page.html',
  styleUrls: ['./control-robot.page.scss'],
})
export class ControlRobotPage implements OnInit {
  sensorData: any = {};
  private sensorSubscription: Subscription = new Subscription();
  private bluetoothDeviceAddress = '00:22:06:01:71:D8';

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private sensorService: SensorService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.initBluetooth();
  }

  ngOnDestroy() {
    if (this.sensorSubscription) {
      this.sensorSubscription.unsubscribe();
    }
  }

  ionViewWillLeave() {
    // Se llama cuando el usuario se va de esta página
    this.sensorSubscription.unsubscribe();
    // limpiar la conexión Bluetooth después de 1 segundo
    setTimeout(() => {
      this.cleanupBluetoothConnection();
    }, 1000);
  }

  cleanupBluetoothConnection() {
    // Aquí puedes realizar cualquier limpieza necesaria para la conexión Bluetooth
    console.log('Realizando limpieza de conexión Bluetooth...');
    this.bluetoothSerial.disconnect(); // Desconectarse
  }

  initBluetooth() {
    this.bluetoothSerial.connect(this.bluetoothDeviceAddress).subscribe(
      () => {
        console.log('Conexión Bluetooth establecida con éxito.');
        this.subscribeToBluetoothData();
      },
      (error: any) => {
        console.error('Error al conectar con Bluetooth:', error);
      }
    );
  }

  subscribeToBluetoothData() {
    this.sensorSubscription = interval(1000).subscribe(() => {
      this.bluetoothSerial.readUntil('\n').then((data: any) => {
        console.log('Datos Bluetooth recibidos:', data);
        this.getSensorData(data);
      }).catch((error: any) => {
        console.error('Error al recibir datos Bluetooth:', error);
      });
    });
  }

  getSensorData(data: string) {
    console.log('Obtener datos del sensor:', data);

    // Llamar al servicio para procesar los datos del sensor
    this.sensorService.getSensor(data).subscribe(
      (response: any) => {
        this.sensorData.rgb = `(${response.RGB})`;
        this.sensorData.distance = response.Distancia;
      },
      (error: any) => {
        console.error('Error al obtener los datos del sensor:', error);
      }
    );
  }
}
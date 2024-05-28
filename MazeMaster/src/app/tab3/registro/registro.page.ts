import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  items: string[] = [];
  registroForm!: FormGroup;
  comunas: { value: string, label: string }[] = [];

  regiones: { value: string, label: string }[] = [
    { value: '15', label: 'Región de Arica y Parinacota' },
    { value: '1', label: 'Región de Tarapacá' },
    { value: '2', label: 'Región de Antofagasta' },
    { value: '3', label: 'Región de Atacama' },
    { value: '4', label: 'Región de Coquimbo' },
    { value: '5', label: 'Región de Valparaíso' },
    { value: '13', label: 'Región Metropolitana de Santiago' },
    { value: '6', label: 'Región del Libertador General Bernardo O\'Higgins' },
    { value: '7', label: 'Región del Maule' },
    { value: '16', label: 'Región de Ñuble' },
    { value: '8', label: 'Región del Biobío' },
    { value: '9', label: 'Región de La Araucanía' },
    { value: '14', label: 'Región de Los Ríos' },
    { value: '10', label: 'Región de Los Lagos' },
    { value: '11', label: 'Región de Aysén del General Carlos Ibáñez del Campo' },
    { value: '12', label: 'Región de Magallanes y de la Antártica Chilena' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.generateItems();
  }

  isEmailInvalid() {
    const emailControl = this.registroForm.get('email');
    return emailControl?.invalid && (emailControl?.dirty || emailControl?.touched);
  }

  isPasswordInvalid() {
    const passwordControl = this.registroForm.get('password');
    return passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched);
  }

  isEmailRequiredError() {
    return this.registroForm.get('email')?.hasError('required');
  }

  isEmailFormatError() {
    return this.registroForm.get('email')?.hasError('email');
  }

  isPasswordRequiredError() {
    return this.registroForm.get('password')?.hasError('required');
  }

  isPasswordMinLengthError() {
    return this.registroForm.get('password')?.hasError('minlength');
  }

  registrarUsuario() {
    // Verificar si el formulario es válido
    if (this.registroForm.valid) {
      // Realizar la acción de registro aquí, por ejemplo:
      // Enviar los datos del formulario a una API
      // Navegar a otra pantalla
      // Mostrar un mensaje de éxito, etc.

      // Ejemplo de navegación a otra pantalla después del registro
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      console.log('El formulario no es válido. Por favor, verifique todos los campos.');
    }
  }

  private generateItems() { 
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  noImplementado() {
    alert('Aun no está implementado.');
  }

  filterComunasPorRegion(regionValue: string) {
    switch(regionValue) {
      case '1': // Región de Tarapacá
        this.comunas = [

          { value: 'Iquique', label: 'Iquique' },
          { value: 'Alto Hospicio', label: 'Alto Hospicio' },
          { value: 'Pozo Almonte', label: 'Pozo Almonte' },
          { value: 'Camiña', label: 'Camiña' },
          { value: 'Colchane', label: 'Colchane' },
          { value: 'Huara', label: 'Huara' },
          { value: 'Pica', label: 'Pica' }
        ];
        break;
      case '2': // Región de Antofagasta
        this.comunas = [
          { value: 'Antofagasta', label: 'Antofagasta' },
          { value: 'Mejillones', label: 'Mejillones' },
          { value: 'Sierra Gorda', label: 'Sierra Gorda' },
          { value: 'Taltal', label: 'Taltal' },
          { value: 'Calama', label: 'Calama' },
          { value: 'Ollagüe', label: 'Ollagüe' },
          { value: 'San Pedro de Atacama', label: 'San Pedro de Atacama' },
          { value: 'Tocopilla', label: 'Tocopilla' },
          { value: 'María Elena', label: 'María Elena' }


        ];
        break;
      case '3': // Región de Atacama
        this.comunas = [
          { value: 'Copiapó', label: 'Copiapó' },
        { value: 'Caldera', label: 'Caldera' },
           { value: 'Tierra Amarilla', label: 'Tierra Amarilla' },
           { value: 'Chañaral', label: 'Chañaral' },
            { value: 'Diego de Almagro', label: 'Diego de Almagro' },
         { value: 'Vallenar', label: 'Vallenar' },
         { value: 'Alto del Carmen', label: 'Alto del Carmen' },
          { value: 'Freirina', label: 'Freirina' },
           { value: 'Huasco', label: 'Huasco' }

        ];
        break;
      case '4': // Región de Coquimbo
        this.comunas = [
          { value: 'Coquimbo', label: 'Coquimbo' },
          { value: 'La Serena', label: 'La Serena' },
          { value: 'Illapel', label: 'Illapel' },
          { value: 'Los Vilos', label: 'Los Vilos' },
          { value: 'Salamanca', label: 'Salamanca' },
          { value: 'Andacollo', label: 'Andacollo' },
          { value: 'Canela', label: 'Canela' },
          { value: 'Combarbalá', label: 'Combarbalá' },
          { value: 'La Higuera', label: 'La Higuera' },
          { value: 'Paihuano', label: 'Paihuano' },
          { value: 'Ovalle', label: 'Ovalle' },
          { value: 'Punitaqui', label: 'Punitaqui' },
          { value: 'Río Hurtado', label: 'Río Hurtado' },
          { value: 'Monte Patria', label: 'Monte Patria' },
          { value: 'Palpa', label: 'Palpa' },
          { value: 'Punitaqui', label: 'Punitaqui' },
          { value: 'Río Hurtado', label: 'Río Hurtado' },
          { value: 'Vicuña', label: 'Vicuña' },
          { value: 'La Higuera', label: 'La Higuera' }
        ];
        break;
      case '5': // Región de Valparaíso
        this.comunas = [
            { value: 'Valparaíso', label: 'Valparaíso' },
            { value: 'Viña del Mar', label: 'Viña del Mar' },
            { value: 'Quilpué', label: 'Quilpué' },
            { value: 'Villa Alemana', label: 'Villa Alemana' },
            { value: 'Concon', label: 'Concon' },
            { value: 'Quintero', label: 'Quintero' },
            { value: 'Puchuncaví', label: 'Puchuncaví' },
            { value: 'Limache', label: 'Limache' },
            { value: 'Olmué', label: 'Olmué' },
            { value: 'La Ligua', label: 'La Ligua' },
            { value: 'Cabildo', label: 'Cabildo' },
            { value: 'Papudo', label: 'Papudo' },
            { value: 'Petorca', label: 'Petorca' },
            { value: 'Zapallar', label: 'Zapallar' },
            { value: 'Santo Domingo', label: 'Santo Domingo' },
            { value: 'San Antonio', label: 'San Antonio' },
            { value: 'Algarrobo', label: 'Algarrobo' },
            { value: 'Cartagena', label: 'Cartagena' },
            { value: 'El Quisco', label: 'El Quisco' },
            { value: 'El Tabo', label: 'El Tabo' },
            { value: 'Casablanca', label: 'Casablanca' },
            { value: 'Juan Fernández', label: 'Juan Fernández' },
            { value: 'San Esteban', label: 'San Esteban' },
            { value: 'Los Andes', label: 'Los Andes' },
            { value: 'Calle Larga', label: 'Calle Larga' },
            { value: 'Rinconada', label: 'Rinconada' },
            { value: 'San Felipe', label: 'San Felipe' },
            { value: 'Catemu', label: 'Catemu' },
            { value: 'Llay-Llay', label: 'Llay-Llay' },
            { value: 'Panquehue', label: 'Panquehue' },
            { value: 'Putaendo', label: 'Putaendo' },
            { value: 'Santa María', label: 'Santa María' },
            { value: 'Hijuelas', label: 'Hijuelas' },
            { value: 'La Calera', label: 'La Calera' },
            { value: 'La Cruz', label: 'La Cruz' },
            { value: 'Nogales', label: 'Nogales' }
          
        ];
        break;
      case '6': // Región del Libertador General Bernardo O\'Higgins
        this.comunas = [
          { value: 'Rancagua', label: 'Rancagua' },
          { value: 'Machalí', label: 'Machalí' },
          { value: 'Graneros', label: 'Graneros' },
          { value: 'Doñihue', label: 'Doñihue' },
          { value: 'Coinco', label: 'Coinco' },
          { value: 'Coltauco', label: 'Coltauco' },
          { value: 'Quinta de Tilcoco', label: 'Quinta de Tilcoco' },
          { value: 'Olivar', label: 'Olivar' },
          { value: 'Codegua', label: 'Codegua' },
          { value: 'Mostazal', label: 'Mostazal' },
          { value: 'Requínoa', label: 'Requínoa' },
          { value: 'Rengo', label: 'Rengo' },
          { value: 'Peumo', label: 'Peumo' },
          { value: 'Las Cabras', label: 'Las Cabras' },
          { value: 'Pichidegua', label: 'Pichidegua' },
          { value: 'San Vicente', label: 'San Vicente' },
          { value: 'Peralillo', label: 'Peralillo' },
          { value: 'Malloa', label: 'Malloa' },
          { value: 'Placilla', label: 'Placilla' },
          { value: 'Navidad', label: 'Navidad' },
          { value: 'La Estrella', label: 'La Estrella' },
          { value: 'Litueche', label: 'Litueche' },
          { value: 'Marchihue', label: 'Marchihue' },
          { value: 'Pichilemu', label: 'Pichilemu' },
          { value: 'La Estrella', label: 'La Estrella' },
          { value: 'Paredones', label: 'Paredones' },
          { value: 'San Fernando', label: 'San Fernando' },
          { value: 'Chépica', label: 'Chépica' },
          { value: 'Chimbarongo', label: 'Chimbarongo' },
          { value: 'Nancagua', label: 'Nancagua' },
          { value: 'Palmilla', label: 'Palmilla' },
          { value: 'Peralillo', label: 'Peralillo' },
          { value: 'Placilla', label: 'Placilla' },
          { value: 'Santa Cruz', label: 'Santa Cruz' }
        ];
        break;
      case '7': // Región del Maule
        this.comunas = [
          { value: 'Talca', label: 'Talca' },
          { value: 'Constitución', label: 'Constitución' },
          { value: 'Curepto', label: 'Curepto' },
          { value: 'Empedrado', label: 'Empedrado' },
          { value: 'Maule', label: 'Maule' },
          { value: 'Pelarco', label: 'Pelarco' },
          { value: 'Pencahue', label: 'Pencahue' },
          { value: 'Río Claro', label: 'Río Claro' },
          { value: 'San Clemente', label: 'San Clemente' },
          { value: 'San Rafael', label: 'San Rafael' },
          { value: 'Cauquenes', label: 'Cauquenes' },
          { value: 'Chanco', label: 'Chanco' },
          { value: 'Pelluhue', label: 'Pelluhue' },
          { value: 'Curicó', label: 'Curicó' },
          { value: 'Hualañé', label: 'Hualañé' },
          { value: 'Licantén', label: 'Licantén' },
          { value: 'Molina', label: 'Molina' },
          { value: 'Rauco', label: 'Rauco' },
          { value: 'Romeral', label: 'Romeral' },
          { value: 'Sagrada Familia', label: 'Sagrada Familia' },
          { value: 'Teno', label: 'Teno' },
          { value: 'Vichuquén', label: 'Vichuquén' },
          { value: 'Linares', label: 'Linares' },
          { value: 'Colbún', label: 'Colbún' },
          { value: 'Longaví', label: 'Longaví' },
          { value: 'Parral', label: 'Parral' },
          { value: 'Retiro', label: 'Retiro' },
          { value: 'San Javier', label: 'San Javier' },
          { value: 'Villa Alegre', label: 'Villa Alegre' },
          { value: 'Yerbas Buenas', label: 'Yerbas Buenas' }
        ];
        break;
      case '8': // Región del Biobío
        this.comunas = [

          { value: 'Concepción', label: 'Concepción' },
          { value: 'Coronel', label: 'Coronel' },
          { value: 'Chiguayante', label: 'Chiguayante' },
          { value: 'Florida', label: 'Florida' },
          { value: 'Hualqui', label: 'Hualqui' },
          { value: 'Lota', label: 'Lota' },
          { value: 'Penco', label: 'Penco' },
          { value: 'San Pedro de la Paz', label: 'San Pedro de la Paz' },
          { value: 'Santa Juana', label: 'Santa Juana' },
          { value: 'Talcahuano', label: 'Talcahuano' },
          { value: 'Tomé', label: 'Tomé' },
          { value: 'Hualpén', label: 'Hualpén' },
          { value: 'Lebu', label: 'Lebu' },
          { value: 'Arauco', label: 'Arauco' },
          { value: 'Cañete', label: 'Cañete' },
          { value: 'Contulmo', label: 'Contulmo' },
          { value: 'Curanilahue', label: 'Curanilahue' },
          { value: 'Los Álamos', label: 'Los Álamos' },
          { value: 'Tirúa', label: 'Tirúa' },
          { value: 'Los Ángeles', label: 'Los Ángeles' },
          { value: 'Antuco', label: 'Antuco' },
          { value: 'Cabrero', label: 'Cabrero' },
          { value: 'Laja', label: 'Laja' },
          { value: 'Mulchén', label: 'Mulchén' },
          { value: 'Nacimiento', label: 'Nacimiento' },
          { value: 'Negrete', label: 'Negrete' },
          { value: 'Quilaco', label: 'Quilaco' },
          { value: 'Quilleco', label: 'Quilleco' },
          { value: 'San Rosendo', label: 'San Rosendo' },
          { value: 'Santa Bárbara', label: 'Santa Bárbara' },
          { value: 'Tucapel', label: 'Tucapel' },
          { value: 'Yumbel', label: 'Yumbel' },
          { value: 'Alto Biobío', label: 'Alto Biobío' },
          { value: 'Cabrero', label: 'Cabrero' },
          { value: 'Laja', label: 'Laja' },
          { value: 'Los Ángeles', label: 'Los Ángeles' },
          { value: 'Mulchén', label: 'Mulchén' },
          { value: 'Nacimiento', label: 'Nacimiento' },
          { value: 'Negrete', label: 'Negrete' },
          { value: 'Quilaco', label: 'Quilaco' },
          { value: 'Quilleco', label: 'Quilleco' },
          { value: 'San Rosendo', label: 'San Rosendo' },
          { value: 'Santa Bárbara', label: 'Santa Bárbara' },
          { value: 'Tucapel', label: 'Tucapel' },
          { value: 'Yumbel', label: 'Yumbel' },
          { value: 'Alto Biobío', label: 'Alto Biobío' }
        ];
        break;
      case '9': // Región de La Araucanía
        this.comunas = [
          { value: 'Temuco', label: 'Temuco' },
          { value: 'Padre Las Casas', label: 'Padre Las Casas' },
          { value: 'Carahue', label: 'Carahue' },
          { value: 'Cunco', label: 'Cunco' },
          { value: 'Curarrehue', label: 'Curarrehue' },
          { value: 'Freire', label: 'Freire' },
          { value: 'Galvarino', label: 'Galvarino' },
          { value: 'Gorbea', label: 'Gorbea' },
          { value: 'Lautaro', label: 'Lautaro' },
          { value: 'Loncoche', label: 'Loncoche' },
          { value: 'Melipeuco', label: 'Melipeuco' },
          { value: 'Nueva Imperial', label: 'Nueva Imperial' },
          { value: 'Padre Las Casas', label: 'Padre Las Casas' },
          { value: 'Perquenco', label: 'Perquenco' },
          { value: 'Pitrufquén', label: 'Pitrufquén' },
          { value: 'Pucón', label: 'Pucón' },
          { value: 'Saavedra', label: 'Saavedra' },
          { value: 'Teodoro Schmidt', label: 'Teodoro Schmidt' },
          { value: 'Toltén', label: 'Toltén' },
          { value: 'Vilcún', label: 'Vilcún' },
          { value: 'Villarrica', label: 'Villarrica' },
          { value: 'Cholchol', label: 'Cholchol' }

        ];
        break;
      case '10': // Región de Los Lagos
        this.comunas = [

          { value: 'Puerto Montt', label: 'Puerto Montt' },
          { value: 'Calbuco', label: 'Calbuco' },
          { value: 'Cochamó', label: 'Cochamó' },
          { value: 'Fresia', label: 'Fresia' },
          { value: 'Frutillar', label: 'Frutillar' },
          { value: 'Los Muermos', label: 'Los Muermos' },
          { value: 'Llanquihue', label: 'Llanquihue' },
          { value: 'Maullín', label: 'Maullín' },
          { value: 'Puerto Varas', label: 'Puerto Varas' },
          { value: 'Castro', label: 'Castro' },
          { value: 'Ancud', label: 'Ancud' },
          { value: 'Chonchi', label: 'Chonchi' },
          { value: 'Curaco de Vélez', label: 'Curaco de Vélez' },
          { value: 'Dalcahue', label: 'Dalcahue' },
          { value: 'Puqueldón', label: 'Puqueldón' },
          { value: 'Queilén', label: 'Queilén' },
          { value: 'Quellón', label: 'Quellón' },
          { value: 'Quemchi', label: 'Quemchi' },
          { value: 'Quinchao', label: 'Quinchao' },
          { value: 'Osorno', label: 'Osorno' },
          { value: 'Puerto Octay', label: 'Puerto Octay' },
          { value: 'Purranque', label: 'Purranque' },
          { value: 'Puyehue', label: 'Puyehue' },
          { value: 'Río Negro', label: 'Río Negro' },
          { value: 'San Juan de la Costa', label: 'San Juan de la Costa' },
          { value: 'San Pablo', label: 'San Pablo' },
          { value: 'Chaitén', label: 'Chaitén' },
          { value: 'Futaleufú', label: 'Futaleufú' },
          { value: 'Hualaihué', label: 'Hualaihué' },
          { value: 'Palena', label: 'Palena' }
        ];
        break;
      case '11': // Región de Aysén del General Carlos Ibáñez del Campo
        this.comunas = [

          { value: 'Coyhaique', label: 'Coyhaique' },
          { value: 'Lago Verde', label: 'Lago Verde' },
          { value: 'Aysén', label: 'Aysén' },
          { value: 'Cisnes', label: 'Cisnes' },
          { value: 'Guaitecas', label: 'Guaitecas' },
          { value: 'Cochrane', label: 'Cochrane' },
          { value: 'O\'Higgins', label: 'O\'Higgins' },
          { value: 'Tortel', label: 'Tortel' },
          { value: 'Chile Chico', label: 'Chile Chico' },
          { value: 'Río Ibáñez', label: 'Río Ibáñez' }
        ];
        break;
      case '12': // Región de Magallanes y de la Antártica Chilena
        this.comunas = [

          { value: 'Punta Arenas', label: 'Punta Arenas' },
          { value: 'Laguna Blanca', label: 'Laguna Blanca' },
          { value: 'Río Verde', label: 'Río Verde' },
          { value: 'San Gregorio', label: 'San Gregorio' },
          { value: 'Cabo de Hornos', label: 'Cabo de Hornos' },
          { value: 'Antártica', label: 'Antártica' },
          { value: 'Porvenir', label: 'Porvenir' },
          { value: 'Primavera', label: 'Primavera' },
          { value: 'Timaukel', label: 'Timaukel' },
          { value: 'Natales', label: 'Natales' },
          { value: 'Torres del Paine', label: 'Torres del Paine' }
        ];
        break;
      case '13': // Región Metropolitana de Santiago
        this.comunas = [

          { value: 'Santiago', label: 'Santiago' },
          { value: 'Cerrillos', label: 'Cerrillos' },
          { value: 'Cerro Navia', label: 'Cerro Navia' },
          { value: 'Conchalí', label: 'Conchalí' },
          { value: 'El Bosque', label: 'El Bosque' },
          { value: 'Estación Central', label: 'Estación Central' },
          { value: 'Huechuraba', label: 'Huechuraba' },
          { value: 'Independencia', label: 'Independencia' },
          { value: 'La Cisterna', label: 'La Cisterna' },
          { value: 'La Florida', label: 'La Florida' },
          { value: 'La Granja', label: 'La Granja' },
          { value: 'La Pintana', label: 'La Pintana' },
          { value: 'La Reina', label: 'La Reina' },
          { value: 'Las Condes', label: 'Las Condes' },
          { value: 'Lo Barnechea', label: 'Lo Barnechea' },
          { value: 'Lo Espejo', label: 'Lo Espejo' },
          { value: 'Lo Prado', label: 'Lo Prado' },
          { value: 'Macul', label: 'Macul' },
          { value: 'Maipú', label: 'Maipú' },
          { value: 'Ñuñoa', label: 'Ñuñoa' },
          { value: 'Pedro Aguirre Cerda', label: 'Pedro Aguirre Cerda' },
          { value: 'Peñalolén', label: 'Peñalolén' },
          { value: 'Providencia', label: 'Providencia' },
          { value: 'Pudahuel', label: 'Pudahuel' },
          { value: 'Quilicura', label: 'Quilicura' },
          { value: 'Quinta Normal', label: 'Quinta Normal' },
          { value: 'Recoleta', label: 'Recoleta' },
          { value: 'Renca', label: 'Renca' },
          { value: 'San Joaquín', label: 'San Joaquín' },
          { value: 'San Miguel', label: 'San Miguel' },
          { value: 'San Ramón', label: 'San Ramón' },
          { value: 'Vitacura', label: 'Vitacura' }
        ];
        break;
      case '14': // Región de Los Ríos
        this.comunas = [

          { value: 'Valdivia', label: 'Valdivia' },
          { value: 'Corral', label: 'Corral' },
          { value: 'Lanco', label: 'Lanco' },
          { value: 'Los Lagos', label: 'Los Lagos' },
          { value: 'Máfil', label: 'Máfil' },
          { value: 'Mariquina', label: 'Mariquina' },
          { value: 'Paillaco', label: 'Paillaco' },
          { value: 'Panguipulli', label: 'Panguipulli' },
          { value: 'La Unión', label: 'La Unión' },
          { value: 'Futrono', label: 'Futrono' },
          { value: 'Lago Ranco', label: 'Lago Ranco' },
          { value: 'Río Bueno', label: 'Río Bueno' }
        ];
        break;
      case '15': // Región de Arica y Parinacota
        this.comunas = [

          { value: 'Arica', label: 'Arica' },
          { value: 'Camarones', label: 'Camarones' },
          { value: 'Putre', label: 'Putre' },
          { value: 'General Lagos', label: 'General Lagos' }
        ];
        break;
      case '16': // Región de Ñuble
        this.comunas = [

          { value: 'Chillán', label: 'Chillán' },
          { value: 'Bulnes', label: 'Bulnes' },
          { value: 'Cobquecura', label: 'Cobquecura' },
          { value: 'Coelemu', label: 'Coelemu' },
          { value: 'Coihueco', label: 'Coihueco' },
          { value: 'Chillán Viejo', label: 'Chillán Viejo' },
          { value: 'El Carmen', label: 'El Carmen' },
          { value: 'Ninhue', label: 'Ninhue' },
          { value: 'Ñiquén', label: 'Ñiquén' },
          { value: 'Pemuco', label: 'Pemuco' },
          { value: 'Pinto', label: 'Pinto' },
          { value: 'Portezuelo', label: 'Portezuelo' },
          { value: 'Quillón', label: 'Quillón' },
          { value: 'Quirihue', label: 'Quirihue' },
          { value: 'Ránquil', label: 'Ránquil' },
          { value: 'San Carlos', label: 'San Carlos' },
          { value: 'San Fabián', label: 'San Fabián' },
          { value: 'San Ignacio', label: 'San Ignacio' },
          { value: 'San Nicolás', label: 'San Nicolás' },
          { value: 'Treguaco', label: 'Treguaco' },
          { value: 'Yungay', label: 'Yungay' }
        ];
        break;
      default:
        this.comunas = [];
        break;
    }
  }
}
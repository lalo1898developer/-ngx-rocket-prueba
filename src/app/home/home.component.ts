import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Declaro mis variables para la clase y ocultar un botón
  classText: string = '';
  isSelected: boolean = false;

  // Declaro mi variable que guardara lo que escriba el usuario y resultado
  form = new FormGroup({
    numero: new FormControl(''),
    resultado: new FormControl(''),
  });

  // Declaro la función que insertara el registro en la BD de Firebase
  create(data: unknown) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('reto')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  // Declaro la función que hara la busqueda de los multiplos y que llamara a la función para insertar el registro
  checkMultipli(number: number) {
    this.isSelected = true;

    if (number % 3 === 0) {
      this.form.value.resultado = '[3]';
      this.classText = 'text-success';

      if (number % 5 === 0) {
        this.form.value.resultado = '[3 & 5]';
        this.classText = 'text-success';

        if (number % 7 === 0) {
          this.form.value.resultado = '[3 & 5 & 7]';
          this.classText = 'text-success';
        }
      }

      if (number % 7 === 0) {
        this.form.value.resultado = '[3 & 7]';
        this.classText = 'text-success';
      }
    } else if (number % 5 === 0) {
      this.form.value.resultado = '[5]';
      this.classText = 'text-danger';

      if (number % 7 === 0) {
        this.form.value.resultado = '[5 & 7]';
        this.classText = 'text-danger';
      }
    } else if (number % 7 === 0) {
      this.form.value.resultado = '[7]';
      this.classText = 'text-primary';
    } else {
      this.form.value.resultado = 'No es multiplo de 3, 5 o 7';
      this.classText = 'text-warning';
    }

    // Declaro una cosntante que guardara lo que trae el formulario
    const data = this.form.value;

    // Mando a llamar a la función que insertara el registro en la BD
    this.create(data).then((res) => {
      alert('Creado exitosamente');
    });
  }

  constructor(private firestore: AngularFirestore) {}
}

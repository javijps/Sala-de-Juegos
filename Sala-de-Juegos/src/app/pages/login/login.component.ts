import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario'
import { UsuariosFirestoreService } from '../../servicios/usuarios-firestore.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : Usuario;

  constructor(private miServicio: UsuariosFirestoreService, private router: Router) {

    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }


  Login() {

    this.miServicio.VerificarCorreoContraseña(this.usuario).get().subscribe(result => {
      if (result.docs.length == 1) {

        this.miServicio.RegistrarLog(this.usuario).then(() => {

          localStorage.setItem('token', this.usuario.correo);
          this.router.navigateByUrl("home");

      })
      }
      else{
        alert('Datos incorrectos');
      }
  })
  }

}

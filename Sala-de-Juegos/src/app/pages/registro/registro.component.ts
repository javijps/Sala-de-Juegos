import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario'
import { UsuariosFirestoreService } from '../../servicios/usuarios-firestore.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor(private miServicio: UsuariosFirestoreService, private router: Router) {

    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  CrearUsuario() {

    this.miServicio.BuscarUsuario(this.usuario).get().subscribe(result => {
      if (result.docs.length === 0) {

        this.miServicio.Crear(this.usuario).then(() => {

          localStorage.setItem('token', this.usuario.correo);
          this.router.navigateByUrl("home");

      })
      }
      else{
        alert('existe');
      }
  })
  }


}

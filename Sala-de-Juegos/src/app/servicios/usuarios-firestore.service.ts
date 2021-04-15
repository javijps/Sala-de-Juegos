import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { promise } from 'selenium-webdriver';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFirestoreService {

  rutaDeLaColeccion = 'UsuariosFirestore';
  referenciaAlaColeccion: AngularFirestoreCollection<Usuario>;

  constructor(private bd: AngularFirestore) {
    this.referenciaAlaColeccion = bd.collection(this.rutaDeLaColeccion);
  }

  Crear(usuario: Usuario) {

    return this.referenciaAlaColeccion.add({ ...usuario });
  }

  TraerTodos(): AngularFirestoreCollection<Usuario> {
    return this.referenciaAlaColeccion;
  }

  BorrarUsuario(id: any): Promise<void> {
    return this.referenciaAlaColeccion.doc(id).delete();
  }

  Update(id: any, datos: any): Promise<void> {
    return this.referenciaAlaColeccion.doc(id).update(datos);
  }

  BuscarUsuario(usuario: Usuario) {
    //recupero la coleccion, query para buscar el correo del usuario
    return this.bd.collection(this.rutaDeLaColeccion, ref =>
      ref.where("correo", "==", usuario.correo))
  }

  VerificarCorreoContraseña(usuario: Usuario) {
    //recupero la coleccion, query para buscar el correo y la clave
    return this.bd.collection(this.rutaDeLaColeccion, ref =>
      ref.where("correo", "==", usuario.correo)
        .where("clave", "==", usuario.clave
        ))
  }

  RegistrarLog(usuario: Usuario) {
    return this.referenciaAlaColeccion.add({ ...usuario });
    
  }

}

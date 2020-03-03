import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular'; //import the modal and view controllers
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(

)
@Component({
  selector: 'page-meusfilmes',
  templateUrl: 'meus-filmes.html',
})
export class MeusFilmes {
    favoritos: any[]=[];
    selecionado: any[]=[];
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public modalCtrl:ModalController,
      private storage: Storage,
      public viewCtrl:ViewController) {
    }
  
    async ionViewDidLoad() { 
      await this.getFavoritos();
      console.log(this.favoritos); 
      console.log("abriu");         
    }

    async getFavoritos(){
      this.favoritos = await this.storage.get('favoritos') || [];
    }

    async deleteMovie(movie): Promise<void>{
      let favoritos: any[] = await this.storage.get('favoritos') || [];
      //If the movie favorited dont exist in array favoritos will be saved
      //If array favoritos is empty the movie will be saved
      if(favoritos.find(f=>f.id == movie))
      {
        //favoritos.splice(favoritos.indexOf(movie), 1);
        favoritos = favoritos.filter((f)=> f.id != movie);
        await this.storage.set('favoritos',favoritos);
        await this.getFavoritos();
      }
    }

    clear(){
      this.storage.clear();
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }

      launchMovieDetailsPage(movie){

        //Use the Modal Contoller to launch the movie details page and pass the movie object for the movie chosen by the User
        let movieModal = this.modalCtrl.create('MovieDetailsPage', movie);
    
        movieModal.present();
    
      }
  
  }
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
  
       
      this.favoritos = await this.storage.get('favoritos') || [];
      console.log(this.favoritos); 
      console.log("abriu");         
    }

    async deleteMovie(movie): Promise<void>{
      const favoritos: any[] = await this.storage.get('favoritos') || [];
      //If the movie favorited dont exist in array favoritos will be saved
      //If array favoritos is empty the movie will be saved
      if(favoritos.find(f=>f.id == movie))
      {
        favoritos.push(movie);
        this.storage.remove(movie);
        console.log(movie);
      }
      //localStorage.removeItem(movie);
      console.log(this.favoritos);
      console.log("id");
      console.log(movie);
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
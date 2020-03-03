import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular'; //import the Nave 
import { MovieServiceProvider } from '../../providers/movie-service/movie-service';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {
  isFavorite: boolean = false;
  movie: any = {};
  favoritos: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController,
    public movieService:MovieServiceProvider, 
    private storage: Storage,
    public viewCtrl:ViewController) {
  }

  async ionViewDidLoad() {

    this.movieService.getMovie(this.navParams.get('id')).subscribe(movie => {
      console.log(movie);
      this.movie = movie;
    });
    const favoritos: any[] = await this.storage.get('favoritos') || [];
    this.isFavorite = favoritos.find(f=>f.id == this.movie.id);    
    //    console.log('ionViewDidLoad MovieDetailsPage'); 
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  async toggleFavorite(): Promise<void> {
      let favoritos: any[] = await this.storage.get('favoritos') || [];
      //If the movie favorited dont exist in array favoritos will be saved
      //If array favoritos is empty the movie will be saved
        this.isFavorite=!this.isFavorite;
      if(!favoritos.find(f=>f.id == this.movie.id))
      {
        favoritos.unshift(this.movie);
      
        console.log(this.movie.id);
        this.saveToast('O filme foi adicionado com sucesso');
      }
      else{
        favoritos = favoritos.filter((f)=> f.id != this.movie.id);
        this.saveToast('Filme removido');
      }
      
      await this.storage.set('favoritos',favoritos);
    };

    saveToast(msg: string) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }


}

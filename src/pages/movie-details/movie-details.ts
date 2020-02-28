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
      console.log(movie)
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
      const favoritos: any[] = await this.storage.get('favoritos') || [];
      //If the movie favorited dont exist in array favoritos will be saved
      //If array favoritos is empty the movie will be saved
      if(!favoritos.find(f=>f.id == this.movie.id))
      {
        favoritos.push(this.movie);
        this.storage.set('favoritos',favoritos);
        console.log(this.movie.id);
        this.saveToast();
      }
      else{
        console.log("Filme ja existe");
        this.savedToast();
      }
    };

    saveToast() {
      let toast = this.toastCtrl.create({
        message: 'O filme foi adicionado',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }

    savedToast() {
      let toast = this.toastCtrl.create({
        message: 'O filme ja esta na lista de favoritos',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }

}

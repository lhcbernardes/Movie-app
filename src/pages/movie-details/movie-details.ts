import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular'; //import the Nave 
import { MovieServiceProvider } from '../../providers/movie-service/movie-service';
import { Storage } from '@ionic/storage';

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
    if(favoritos.find(f=>f.id == this.movie.id)==this.storage.get('favoritos'))
    {
      favoritos.push(this.movie);
      this.storage.set('favoritos',favoritos);
      console.log(this.movie);
    }
    else{
      console.log("JA EXISTEEEE");
      
    }
    
    };

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular'; //Import the Modal controller
import { MovieServiceProvider } from '../../providers/movie-service/movie-service';
import {Movie} from "../../model/model";
/**
 * Generated class for the PopularMoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popular-movies',
  templateUrl: 'popular-movies.html',
})
export class PopularMoviesPage {
  //create an empty array
  movies = new Array<Movie>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public movieService:MovieServiceProvider,
    public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {

    //call the getPopularMovies function from the movie service
    this.movieService.getPopularMovies()
    .subscribe(res => {

      console.log(res.results);

      //store the response on our empty array
      this.movies = res.results;
      
    });

    console.log('ionViewDidLoad PopularMoviesPage');
  }

  launchMovieDetailsPage(movie){

    //Use the Modal Contoller to launch the movie details page and pass the movie object for the movie chosen by the User
    let movieModal = this.modalCtrl.create('MovieDetailsPage', movie);

    movieModal.present();

  }

}

import { Video } from './../../model/video';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular'; //import the Nave 
import { MovieServiceProvider } from '../../providers/movie-service/movie-service';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Movie } from "../../model/model";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
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
  //create an empty array
  movie = new Array<Movie>();  
  video = new Array<Video>();
  favoritos: string = "";

  constructor(
    private youtube: YoutubeVideoPlayer,
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

      
      //movie.release_date=new Date(movie.release_date).toLocaleDateString();

      const date: string[] = movie.release_date.split('-');
      movie.release_date = `${date[2]}/${date[1]}/${date[0]}`;
      //let date = new Date(this.movie['release_date']);
    //let formatted_date = (date.getDate()+1) + "/" + (date.getMonth() + 1) + "/"+ date.getFullYear();

    // let month = String(date.getMonth() + 1);
    // let day = String(date.getDate()+1);
    // const year = String(date.getFullYear());

    // if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;

   // movie.release_date =`${day}/${month}/${year}`;
    });
    

    this.movieService.getVideosByMovie(this.navParams.get('id')).subscribe(video =>{
      this.video = video['results'];
    });

    const favoritos: any[] = await this.storage.get('favoritos') || [];
    this.isFavorite = favoritos.find(f=>f.id == this.movie['id']);    
    //    console.log('ionViewDidLoad MovieDetailsPage'); 
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  openVideo(videoID){
    this.youtube.openVideo(videoID);
  }
  
  async toggleFavorite(): Promise<void> {
      let favoritos: any[] = await this.storage.get('favoritos') || [];
      //If the movie favorited dont exist in array favoritos will be saved
      //If array favoritos is empty the movie will be saved
        this.isFavorite=!this.isFavorite;
      if(!favoritos.find(f=>f.id == this.movie['id']))
      {
        favoritos.unshift(this.movie);
        this.saveToast('O filme foi adicionado com sucesso');
      }
      else{
        favoritos = favoritos.filter((f)=> f.id != this.movie['id']);
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

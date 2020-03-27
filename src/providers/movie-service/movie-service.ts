import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/Rx';
 
/*
  Generated class for the MovieServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieServiceProvider {

  apiKey:string = 'dbd5da5accba2b0fb83479933e2afee6'; //Insert your TMDb api key
  language: string = '&language=pt-BR';

  constructor(public http: Http) {
    console.log('Hello MovieServiceProvider Provider');
  }

  //Function that returns the current popular movies from the TMDb
   getPopularMovies(){
    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+this.language+'&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
                        .map(res=> res.json());
  }

  //Function that returns movies that are currently showing in Cinemas from the TMDb
  getInTheaters(){

    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+this.language+'&primary_release_date.gte=2017-04-15&primary_release_date.lte=2017-12-25&include_adult=false&include_video=false&page=1')
                        .map(res=> res.json());

  }

  //Uses the TMDb Search api to return movies based on the users search
  searchMovies(searchStr:string){

    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key='+this.apiKey+'&query='+searchStr+this.language+'&primary_release_date.gte=2017-04-15&primary_release_date.lte=2017-12-25&include_adult=false&include_video=false&page=1')
                        .map(res=>res.json());

  }

  //returns the information on a particular movie using it's ID
  getMovie(id){

    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+this.apiKey+this.language)
                        .map(res=>res.json());

  }

    //Returns a the list of genres in TMDB
   getGenres(){

    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+this.apiKey+this.language)
                        .map(res=>res.json());

  }

    //Returns a list of movies with a specified genre 
   getMoviesByGenre(genreId){

    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+this.language+'&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+genreId)
                        .map(res=>res.json());

  }

  //REturns a list of videos by movie choiced
  getVideosByMovie(id){
   
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/videos'+'?api_key='+this.apiKey+this.language)
                        .map(res=>res.json());
  }


}

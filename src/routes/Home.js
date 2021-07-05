import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        isLoading:true,
        movies:[],
    };
    add = () => {
        this.setState(current=> ({count: current.count +1 }));
    };
    minus = () => {
        this.setState(current=> ({count: current.count -1 }));
    };
    getMovies = async () =>{
        const {
            data:{
                data :{ movies }
            }
        } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
            //} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
        this.setState({ movies ,isLoading :false });
    };
    componentDidMount(){
        this.getMovies();
        
    }

    componentDidUpdate(){
        console.log("ComponetUPdate");
    }
    componentWillUnmount(){
        console.log("ComponetWillUnmouint");
    }
    render(){
        console.log("render");
        const { isLoading , movies } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loding...</span>
                </div>
                )
                : (
                    <div className="movies">
                        {movies.map(movie =>(
                            <Movie 
                                key={movie.id}
                                id={movie.id} 
                                year={movie.year} 
                                title={movie.title} 
                                summary={movie.summary} 
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
 
export default Home;


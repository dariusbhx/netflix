import React from 'react'
import Banner from '../../banner/Banner'
import './HomeScreen.css'
import Navbar from '../../navbar/Navbar'
import requests from '../../Requests'
import Row from '../../rows/Row'

const HomeScreen = () => {
    return (
        <div className = "homeScreen">
            <Navbar />
            <Banner />
            {/*Row */}
            <Row title = 'Netflix Originals'  fetchURL ={requests.fetchNetflixOriginals} isLargeRow />
            <Row title = 'Top Rated'  fetchURL ={requests.fetchTopRated} />
            <Row title = 'Action Movies'  fetchURL ={requests.fetchActionMovies} />
            <Row title = 'Comedy Movies'  fetchURL ={requests.fetchComedyMovies} />
            <Row title = 'Horror Movies'  fetchURL ={requests.fetchHorrorMovies} />
            <Row title = 'Romance Movies'  fetchURL ={requests.fetchRomanceMovies} />
            <Row title = 'Documentaries'  fetchURL ={requests.fetchDocumentaries} />
         
        </div>
    )
}

export default HomeScreen

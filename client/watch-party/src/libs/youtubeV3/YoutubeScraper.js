import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/search"

export function scrapeVideos(query, maxResults) {  
    return new Promise(function (resolve, reject) { 
        axios.get(BASE_URL, { params: { q: query } }).then(function (response) {
            resolve(response.data.results.filter(item => ("video" in item)).splice(0, maxResults));
        }).catch(function (err) {
            reject(err);
        });
    });
}
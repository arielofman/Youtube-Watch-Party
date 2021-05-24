import axios from 'axios'

const SEARCH_ALL_URL = "https://www.googleapis.com/youtube/v3/search"; 
const SEARCH_VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos";

/* youtube api charges 100 units per search... this is an expensive operation */
export function searchAll(API_KEY, q, maxResults) { 
    return new Promise(function (resolve, reject) {
        if (maxResults > 50 || maxResults < 0) {
            reject(new Error("maxResults should be between 0 and 50."));
        }

        let args = {}
        args.part = "snippet";
        args.maxResults = maxResults;
        args.q = q;
        args.type = "video";
        args.key = API_KEY;
        axios.get(SEARCH_ALL_URL, { params: args }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export function getViewsByVideoID(API_KEY, videoId) {
    return new Promise(function (resolve, reject) { 
        let args = {}
        args.part="statistics";
        args.id = videoId;
        args.type = "video";
        args.key = API_KEY;
        axios.get(SEARCH_VIDEO_URL, { params: args }).then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            reject(err);
        });
    });
} 
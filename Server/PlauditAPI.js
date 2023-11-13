import { chownSync } from 'fs';
import API from './InrixAPI'
import Config from '../src/config.json'
let InrixAPI = new API(Config.INRIX_APPID,Config.INRIX_HASH_TOKEN);
class PLAUDITSCORING {
    constructor(){

    }
    async getParkingScore(point,radius) {
        return new Promise((resolve,reject)=>{
          InrixAPI.getOnStreetParking(point,radius).then(jsonData=>{
          let totalSpacesAllStreets = 0;
        if (jsonData && jsonData.result && Array.isArray(jsonData.result)) {
            jsonData.result.forEach(street => {
            if (street.segments && Array.isArray(street.segments)) {
              street.segments.forEach(segment => {
                if (segment.spacesTotal !== undefined && !isNaN(segment.spacesTotal)) {
                  totalSpacesAllStreets += segment.spacesTotal;
                }
              });
            }
          });
        }
        resolve(totalSpacesAllStreets);
        }).catch(err=>{
          throw err;
        })
        })
      }
      async getAttractionScore(radius,point,startDateTime,endDateTime) {
        return new Promise((resolve, reject) => {
            InrixAPI.getTradeTrips(radius,point,startDateTime,endDateTime).then(data=>{
                resolve(data.count);
            }).catch(err=>{
                throw err;    
            })
        })
    }
    async getCoords(address){
      return new Promise((resolve, reject) => {
        InrixAPI.getCoords(address).then(data=>{
            resolve(data);
        }).catch(err=>{
            throw err;    
        })
    })
    }

    async getCompetitionScore(point,radius, keyword) {
      return new Promise((resolve, reject) => {
          InrixAPI.getPlaces(point,radius,keyword).then(data=>{
            console.log(data);
              //Scoring algorithm here:
              let numPlaces = data.results.length;
              
              //-----------------
              resolve(numPlaces);
          }).catch(err=>{
              throw err;    
          })
      })
     }

      async getStreetViewImage(point) {
        return new Promise((resolve, reject) => {
            InrixAPI.getStreetViewImage(point).then(data=>{
                console.log(data);
                resolve(data);
            }).catch(err=>{
                throw err;    
            })
        })
  }
}

export default PLAUDITSCORING;

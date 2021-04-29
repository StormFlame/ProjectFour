import tokenService from './tokenService';


const BASE_URL = '/api';

export function create(carID){
    return fetch(`${BASE_URL}/cars/${carID}/likes`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json())
}


export function removePerformanceUpgrade(performanceUpgradeID){
    return fetch(`${BASE_URL}/likes/${performanceUpgradeID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json())
}
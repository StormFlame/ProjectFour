import tokenService from './tokenService';


const BASE_URL = '/api';

export function create(performanceUpgrade, carID){
    return fetch(`${BASE_URL}/cars/${carID}/performanceUpgrades`, {
        method: 'POST',
        body: JSON.stringify(performanceUpgrade),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
          }
    }).then(res => res.json())
}


export function removePerformanceUpgrade(performanceUpgradeID){
    return fetch(`${BASE_URL}/performanceUpgrades/${performanceUpgradeID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json())
}
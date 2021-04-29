import tokenService from './tokenService';

const BASE_URL = '/api/services';

export function create(service){
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(service),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function getAll(carID){
    return fetch(`${BASE_URL}/${carID}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(res => res.json());
}

export function deleteService(serviceID){
    return fetch(`${BASE_URL}/${serviceID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
}
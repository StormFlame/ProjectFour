import tokenService from './tokenService';

const BASE_URL = '/api/cars';

export function create(car){
    return fetch(BASE_URL, {
        method: 'POST',
        body: car,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function update(car, carID){
    return fetch(`${BASE_URL}/${carID}`, {
        method: 'PUT',
        body: car,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function updatePerfStats(car, carID){
    return fetch(`${BASE_URL}/${carID}/performance`, {
        method: 'PUT',
        body: JSON.stringify(car),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}


export function getOne(carID){
    return fetch(`${BASE_URL}/${carID}`,{
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export function getAll(){
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(res => res.json());
}

export function getBuilds(){
    return fetch(`${BASE_URL}/builds`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(res => res.json());
}

export function deleteCar(carID){
    return fetch(`${BASE_URL}/${carID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
}
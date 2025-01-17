function getEndpoint(production){
    let baseEndPoint;
    if (production==='true'){
        baseEndPoint = 'https://gringotts-vault.vercel.app/api';
    } else{
        baseEndPoint = 'http://localhost:3000/api';
    }
    return baseEndPoint;
}

export {
    getEndpoint
}
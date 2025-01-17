function getEndpoint(node_env){
    let baseEndPoint;
    if (node_env==='development'){
        baseEndPoint = 'http://localhost:3000/api';
    } else{
        baseEndPoint = 'https://gringotts-vault.vercel.app/api';
    }
    return baseEndPoint;
}

export {
    getEndpoint
}
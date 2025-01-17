function getEndpoint(production){
    if (production===true){
        return 'https://gringotts-vault.vercel.app/api';
    } else{
        return 'http://localhost:3000/api';
    }
}

export {
    getEndpoint
}
const baseURL='http://localhost:3000';

export const getFavorites=async()=>{
    const response=await fetch(`${baseURL}/favorites`);
    const json=await response.json();
    return json.favorites;
};

export const getFavorite=async(id)=>{
    const response=await fetch(`${baseURL}/favorites/${id}`);
    const json=await response.json();
    return json.favorite;
};

export const addFavorite=async(name, url)=>{
    const response=await fetch(`${baseURL}/favorites`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name, url})
    });
    const json=await response.json();
    return json.id;
};


export const deleteFavorite=async(id)=>{
    const response=await fetch(`${baseURL}/favorites/${id}`, {
        method:'DELETE'
    });
    return response.status;
};

export const replaceFavorite=async(id,newFav)=>{
    const response=await fetch(`${baseURL}/favorites/${id}`, {
        method:'PUT',
        headers:{ 'Content-Type':'application/json' },
        body:newFav
    });
    

};



try {
    
    const result=await addFavorite('examplle','example');
    console.log(result);
} catch (error) {
    console.error('Error:', error.message);
}
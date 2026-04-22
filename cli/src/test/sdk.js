try {
    
    const result=await addFavorite('examplle','example');
    console.log(result);
} catch (error) {
    console.error('Error:', error.message);
}
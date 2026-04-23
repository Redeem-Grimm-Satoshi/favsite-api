import { useEffect, useState } from "react";

// App component to fetch and display favorite items from the backend
const App=() => {
  const [data,setData]=useState(null);
  const [error,setError]=useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response=await fetch('http://localhost:3000/favorites');
        const data=await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  if(error){
    return <div>Error: {error?.message || 'An error occurred'}</div>;

  }
  if(!data){
    return <div>Loading...</div>;
  }
  return (

    // Render the list of favorite items
     <div>
    {data.favorites.map((fav) => {
      console.log(fav);
      return(
         <div key={fav.id}>
        <a href={fav.url}>{fav.name}</a>
      </div>
      );
    })}
  </div>
  );
};

export default App;
      
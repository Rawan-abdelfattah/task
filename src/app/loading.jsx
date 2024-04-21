'use client'  
import {CircleLoader , HashLoader} from 'react-spinners';

const Loading = () => { 
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center loading"  >      
 
     <HashLoader color="text-blue-900" /> 
    </div>

  );
};

export default Loading;

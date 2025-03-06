import { useNavigate } from "react-router-dom";


interface PrivateRouteProps{
    component:React.FC
}

export const PrivatRoute=({component:Component}:PrivateRouteProps)=>{
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    if(!token){
        navigate('/signup');
        return null;

    }
    return <Component/>
}
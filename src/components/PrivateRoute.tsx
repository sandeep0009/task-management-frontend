import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
    component: React.FC;
}

export const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/signup");
        }
    }, [token, navigate]);

    return token ? <Component /> : null;
};

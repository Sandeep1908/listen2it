import { useEffect } from "react";
import Main from "./screens/Main";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/signin");
    }
     else{
      navigate('/dashboard')
     }
  }, []);
  
  return (
    <div className="w-full h-full">
      <Main />
    </div>
  );
};

export default App;

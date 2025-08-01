import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    try{
       if(currentState === "Sign Up"){
         const res= await axios.post(backendUrl + "/api/user/register", {name, email, password});
      
        if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token)
        }else{
          toast.error(res.data.message)
        }
       }else{
         const res= await axios.post (backendUrl + "/api/user/login", {email, password});
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }else{
          toast.error(res.data.message)
        }
       }
    }catch(err){
       console.log(err);
       toast.error(err.message)
    }
  }
  
  useEffect(()=>{
  if(token){
    navigate("/")
  }
  }, [token])
  

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>
      {currentState === "Login" ? "" : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800"  placeholder="Name" required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800"  placeholder="Email" required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800"  placeholder="Password" required/>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState ==="Login" ? <p className="cursor-pointer" onClick={()=>setCurrentState("Sign Up")}>Create Account</p>: <p className="cursor-pointer" onClick={()=>setCurrentState("Login")}>Login Here</p>  }
      </div>
      <button className="text-white bg-black px-8 py-3 mt-4 font-light">{currentState === "Login"? "Sign In":"Sign Up"}</button>
    </form>
  );
};

export default Login;

import { useState , useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from "../assets";
import { links } from "../assets/constants";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";




const NavLinks = () => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-rose-200"
        onClick={() => handleClick && handleClick()}>
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((e) => console.log(e));
    navigate("/login", {replace : true})
  }

 
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-28 object-contain" />
        <h2 className="font-bold text-white text-center" style={{backgroundImage: 'linear-gradient(to right, #FF69B4, #FFA07A, #FFC0CB, #FF1493)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
  TuneUp
</h2>
<button className="absolute bottom-10 left-14 font-bold text-center mx-auto px-4 py-2 rounded-full bg-pink text-white  cursor-pointer hover:font-extrabold duration-150 transition-all ease-in-out" onClick={logOut}>
  Sign Out
</button>


        <NavLinks />
       

      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2"
          onClick={() => setMobileMenuOpen(false)}/>
        ) : <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>}

      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-t1 from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
        

      </div>


    </>
  )
};

export default Sidebar;

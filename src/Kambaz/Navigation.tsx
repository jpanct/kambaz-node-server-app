import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { CiSettings } from "react-icons/ci";

export default function KambazNavigation() {
  const location = useLocation();
  
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }} 
           className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
        <ListGroup.Item id="wd-neu-link" target="_blank" action
           href="https://www.northeastern.edu/"
           className="bg-black border-0 text-center">
           <img src="/images/NEU.png" width="75px" /></ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Account" as={Link}
           className={location.pathname === "/Kambaz/Account" 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <FaRegCircleUser className="fs-1 text-white" /><br />
           Account </ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
           className={location.pathname === "/Kambaz/Dashboard" 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <AiOutlineDashboard className="fs-1 text-danger" /><br />
           Dashboard </ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Courses" as={Link}
           className={location.pathname.startsWith("/Kambaz/Courses") 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <LiaBookSolid className="fs-1 text-danger" /><br />
           Courses </ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Calendar" as={Link}
           className={location.pathname === "/Kambaz/Calendar" 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <IoCalendarOutline className="fs-1 text-danger" /><br />
           Calendar </ListGroup.Item><br />
        
        <ListGroup.Item to="/Kambaz/Inbox" as={Link}
           className={location.pathname === "/Kambaz/Inbox" 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <FaInbox className="fs-1 text-danger" /><br />
           Inbox </ListGroup.Item><br />
        
        <ListGroup.Item to="/Labs" as={Link}
           className={location.pathname === "/Labs" 
              ? "text-center border-0 bg-white text-danger" 
              : "text-center border-0 bg-black text-white"}>
           <CiSettings className="fs-1 text-danger" /><br />
           Labs</ListGroup.Item><br />
    </ListGroup>
  );
}
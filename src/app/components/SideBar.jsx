"use client";
import Link from "next/link"; // Import Next.js Link

import { useState ,useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import cookie from "cookie";
import { 
  FaBars, FaMoneyBill ,
  FaHome, 
  FaUserGraduate, 
  FaBook, 
  FaChalkboardTeacher, 
  FaBuilding, 
  FaFlask, 
  FaCode, 
  FaCog, 
  FaComments, 
  FaCalculator, 
  FaBrain, 
  FaLaptopCode, 

  FaFilePdf,
  FaGraduationCap, 
  FaIdCard ,
  FaHeartbeat,
  FaFileMedical,
  FaBookOpen,
  FaTools
} from "react-icons/fa";
import { BiCog } from "react-icons/bi"; 
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { FaLock} from "react-icons/fa"; // Assuming you want to keep these imports
import { MdMessage } from "react-icons/md";


const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/Academic",
    name: "Academic",
    icon: <FaBuilding />, // Updated to a more representative icon
    subRoutes: [
      {
        path: "/Academic/Format",
        name: "Format of Official Documents",
        icon: <FaFilePdf />, // Suitable icon for documents
      },
      {
        path: "/Academic/Curriculam",
        name: "Rules and Regulation",
        icon: <FaLock />,
      },
      {
        path: "/Course",
        name: "Course Structure",
        icon: <FaBook />, // Updated to represent courses
        subRoutes: [
          {
            path: "/Course/Ug",
            name: "UG",
            icon: <FaUserGraduate />, // Suitable icon for undergraduate courses
          },
          {
            path: "/Course/Pg",
            name: "Post Graduate",
            icon: <FaGraduationCap />, // More suitable icon for post-graduate courses
          },
          {
            path: "/Course/MTech",
            name: "Dual Degree",
            icon: <FaChalkboardTeacher />, // Suitable icon for dual degree programs
          },
          {
            path: "/Course/MSc",
            name: "Integrated M.Sc",
            icon: <FaBook />, // Suitable icon for M.Sc courses
          },
          {
            path: "/Course/MCA",
            name: "MCA",
            icon: <FaLaptopCode />, // Suitable icon for MCA courses
          },
        ],
      },
      {
        path: "/Departments",
        name: "Departments",
        icon: <FaBuilding />, // General icon representing departments
        subRoutes: [
          {
            path: "/Department/Archi",
            name: "Architecture & Planning",
            icon: <FaBuilding />, // Icon for Architecture
          },
          {
            path: "/Department/Chem",
            name: "Chemistry",
            icon: <FaFlask />, // Icon for Chemistry
          },
          {
            path: "/Department/CE",
            name: "Civil Engineering",
            icon: <FaBuilding />, // Icon for Civil Engineering
          },
          {
            path: "/Department/CSE",
            name: "Computer Science and Engineering",
            icon: <FaCode />, // Icon for Computer Science
          },
          {
            path: "/Department/EE",
            name: "Electrical Engineering",
            icon: <FaCog />, // Icon for Electrical Engineering
          },
          {
            path: "/Department/ECE",
            name: "Electronics and Communication Engineering",
            icon: <FaCog />, // Icon for Electronics
          },
          {
            path: "/Department/Humanities",
            name: "Humanities & Social Sciences",
            icon: <FaComments />, // Icon for Humanities
          },
          {
            path: "/Department/Math",
            name: "Mathematics",
            icon: <FaCalculator />, // Icon for Mathematics
          },
          {
            path: "/Department/ME",
            name: "Mechanical Engineering",
            icon: <FaCog />, // Icon for Mechanical Engineering
          },
          {
            path: "/Department/Phy",
            name: "Physics",
            icon: <FaBrain />, // Icon for Physics
          },
          {
            path: "/Department/Mechatronics",
            name: "Mechatronics & Automation Engineering",
            icon: <FaCog />, // Icon for Mechatronics
          },
          {
            path: "/Department/Chemical",
            name: "Chemical Engineering and Technology",
            icon: <FaFlask />, // Icon for Chemical Engineering
          },
          {
            path: "/Department/Material",
            name: "Materials Science & Engineering",
            icon: <FaCog />, // Icon for Materials Science
          },
        ],
      },
    ],
  },
  {
    path: "/People",
    name: "Faculty and Staff",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "https://admin.nitp.ac.in/",
        name: "Admin Portal",
        icon: <FaUserGraduate />, // Suitable icon for admin
      },
      {
        path: "/People/Forms",
        name: "Staff Claim Form",
        icon: <FaBook />, // Suitable icon for form
      },
      {
        path: "http://mis.nitp.ac.in:81/",
        name: "Faculty Academic Portal",
        icon: <FaChalkboardTeacher />, // Suitable icon for faculty
      },
    ],
  },
  {
    path: "/Students",
    name: "Students",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "/Students/Format",
        name: "Forms",
        icon: <FaUserGraduate />, // Icon for forms
      },
      {
        path: "https://docs.google.com/forms/d/e/1FAIpQLSc5_x34TMtQdMaW2Ad9Nvsmz1N8YXdAGJHtAM5kn3a850Ekyw/viewform",
        name: "ID Card",
        icon: <FaIdCard />, // Suitable icon for ID card
      },
      {
        path: "http://exam.nitp.ac.in:9001",
        name: "Student Academic Portal",
        icon: <FaChalkboardTeacher />, // Icon for academic portal
      },
      {
        path: "https://docs.google.com/forms/d/e/1FAIpQLSf6",
        name: "Fee Payment",
        icon: <FaMoneyBill />, // Icon for Fee Payment
      },
    ],
  },
  {
    path: "/Facilities",
    name: "Facilities",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "#",
        name: "Guest House Forms",
        icon: <FaFilePdf />, // Icon for forms
      },
      {
        path: "/Facilities/MedicalFacilities",
        name: "Health Centre",
        icon: <FaHeartbeat />, // Icon for health centre
      },
      {
        path: "/Facilities/MedicalForms",
        name: "Medical Forms",
        icon: <FaFileMedical />, // Icon for medical forms
      },
      {
        path: "/Facilities/Library",
        name: "E-Library",
        icon: <FaBookOpen />, // Icon for e-library
      },
      {
        path: "/Facilities/Emu",
        name: "EMU",
        icon: <FaTools />, // Icon for EMU
      },
      {
        path: "/Facilities/Esu",
        name: "ESU",
        icon: <FaTools />, // Icon for ESU
      },
      {
        path: "/Facilities/ItServices",
        name: "IT Services",
        icon: <FaLaptopCode />, // Icon for IT Services
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('No email provided');
  const handleLogout = () => {
    auth.signOut().then(() => {
      document.cookie = cookie.serialize('auth', '', { maxAge: -1, path: '/' });
      router.push('/Login'); // Redirect to login after logout
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    setUsername(cookies.username || 'Guest');
    setEmail(cookies.email || 'No email provided');
  }, []);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "280px" : "38px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
               <motion.h1
               variants={showAnimation}
               initial="hidden"
               animate="show"
               exit="hidden"
               className="logo text-red-100 font-bold flex items-center" // Add flex and alignment classes
             >
               <img 
                 src="https://www.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.00e5159e.png&w=96&q=75" 
                 className="w-8 mr-2" // Add margin to the right for spacing
                 alt="NIT Patna Logo" // Add alt text for accessibility
               />
               NIT Patna
             </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars" onClick={toggle}>
              <FaBars />
            </div>
          </div>
          
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <Link href={route.path} key={index} className="link">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </section>

          {/* Display username and email */}
          <AnimatePresence>
            {isOpen && (
              <div className="user-info p-5 pt-[40vh] md:pt-[40vh]">
                <h2 className="text-sm text-red-300">{username}</h2>
                <p className="text-sm">{email}</p>
                <button 
          className="px-4 py-1 justify-center bg-red-500 text-sm text-white rounded-md hover:bg-red-600 transition duration-300" 
          onClick={handleLogout}
        >
          Logout
        </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
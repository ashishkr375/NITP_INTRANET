"use client"
import React, { useEffect, useState } from 'react'
import Title from './Title';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import CourseTable from "../CourseTable";
const FacultyHeader = dynamic(() => import("./FacultyHeader"), {
  loading: () => <div className='w-full h-full p-3 text-black m-3 bg-red-200'>loading</div>
})
const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <div className='w-full h-full p-3 text-black m-3 bg-red-200'>loading</div>
})
const FacultyInfo = () => {
  const [state, setstate] = useState(1)
  const [name, setname] = useState("")
  const [designation, setdesignation] = useState("")
  const [email, setemail] = useState("")
  const [research, setresearch] = useState("")
  const [image, setimage] = useState("")
  const [education, seteducation] = useState([])
  const [work_experience, setwork_experience] = useState([])
  const [Professional_Service, setProfessional_Service] = useState([])
  const [curr_admin_responsibility, setcurr_admin_responsibility] = useState([])
  const [past_admin_responsibility, setpast_admin_responsibility] = useState([])
  const [phd_students, setphd_students] = useState([])
  const [pg_ug_projects, setpg_ug_projects] = useState([])
  const [subjects, setsubjects] = useState([])
  const [publications, setpublications] = useState([])
  const [resume, setresume] = useState("")
  const [membership, setmemership] = useState([])
  const [conference, setconference] = useState([])
  const [books, setbooks] = useState([])
  const [scopus,setscopus]=useState("")
  const [google_scholar,setgoogle_scholar]=useState("")
  const [linkedin,setlinkedin]=useState("")
  const [orcid,setorcid]=useState("")
  const [vidwan,setvidwan]=useState("")
  const [personal_webpage,setpersonal_webpage]=useState("")
  const [article,setarticle]=useState([])
  const res = useParams()
  console.log(res.facultyid)
  const uri = `https://admin.nitp.ac.in/api/faculty/${res.facultyid}`
  useEffect(() => {
    fetch(uri).then(res => res.json()).then((data) => {
      console.log(data)
      setname(data.profile.name)
      setemail(data.profile.email)
      setresearch(data.profile.research_interest)
      setdesignation(data.profile.designation)
      setgoogle_scholar(data.profile.google_scholar)
      setlinkedin(data.profile.linkedin)
      setvidwan(data.profile.vidwan)
      setscopus(data.profile.scopus)
      setorcid(data.profile.orcid)
      setpersonal_webpage(data.profile.personal_webpage)
      setimage(data.profile.image)
      seteducation(data.education)
      setwork_experience(data.work_experience)
      setProfessional_Service(data.professional_service)
      setcurr_admin_responsibility(data.curr_admin_responsibility)
      setpast_admin_responsibility(data.past_admin_responsibility)
      setphd_students(data.phd_candidates)
      setpg_ug_projects(data.pg_ug_projects)
      setsubjects(data.subjects_teaching)
      setpublications(data.publications)
      setmemership(data.memberships)
      
      let arr = data.publications ? JSON.parse(data.publications[0].publications) : []
      console.log(arr)
      let conferences = arr.filter((item) => item.type === "conference")
      setconference(conferences)
      let booksdata = arr.filter((item) => item.type === "book")
      setbooks(booksdata)
      let articledata=arr.filter((item) => item.type === "article")
      setarticle(articledata)
      setresume(data.profile.cv)
    })
  }, [])

 
  return (
    <div>
      <FacultyHeader vidwan={vidwan} scopus={scopus} orcid={orcid} personal_webpage={personal_webpage} linkedin={linkedin} google_scholar={google_scholar} image={image} name={name} email={email} designation={designation} research={research} />
      <h2 className="text-sm md:text-2xl font-bold mt-4 mb-2 text-center">Shared Course Resources</h2>

      <CourseTable email={email} />
    </div>

  )
}
export default FacultyInfo

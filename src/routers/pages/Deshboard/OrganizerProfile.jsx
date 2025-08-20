
import useAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";


const OrganizerProfile = () => {
  const {user, Updateprofile,setuser}=useAuth()
  console.log(user)
  const handelupdate=(e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value
        console.log(name, photo)
        Updateprofile({displayName:name,photoURL:photo})
        .then(()=>{
            setuser({...user,displayName:name,photoURL:photo})
             Swal.fire({
                  title: "your Profil update succesfully!",
                  text: "You clicked the button!",
                  icon: "success"
                });
        })
    .catch((error) => {
       console.log(error)
      });
    }
  return (
     <div className='flex justify-center items-center text-black '>
            <div className=' bg-base-300  text-center  md:px-30 md:py-20   px-4 py-4 my-12 rounded-md'>
              <div className='flex justify-center items-center px-24 py-10 bg-white rounded-xl shadow-xl'>
              <img  className='md:w-24 md:h-24  rounded-full' src={user && user.photoURL} alt="" />
              </div>
            <h1 className='text-xl '><span className='font-bold'>{user && user.displayName }</span></h1>
            <h2 className='text-xl'>{user && user.email}</h2>
            <div className='text-start '>
            <form  onSubmit={handelupdate} className="fieldset">
            <label className="label text-xl">Name</label>
            <input type="text" name='name' className="input" placeholder="Name"/>
            <label className="label text-xl ">Photo URL</label>
            <input type="photo" name='photo' className="input" placeholder="photo url"></input>
            <button className='px-4 py-3  bg-cyan-400 text-lg font-semibold rounded-md mt-4' type='submit'>submit</button>
            </form>
            </div>

            </div>
        </div>
  );
};

export default OrganizerProfile;

import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { ModeToggle } from '../theme/mode-toggle';

// const Navbar = () => {
//   const {onOpen}= useCreatePost()
//   return (
//     <>
//       <div className="w-full h-24 bg-gray-900 fixed inset-0   ">
//         <div className=" w-full h-full flex justify-between items-center  container ">
//           <Link to={"/"} className="flex justify-center items-center gap-2 ml-2">
//             <img src="/logo.svg" alt="" />
//             <p className="font-bold text-4xl ">Jasur.inc</p>
//           </Link>
//           <div className="flex gap-2">
//             <Button
//               className="rounded-full font-bold"
//               size={"lg"}
//               variant={"outline"}
//               onClick={onOpen}
//             >
//               Create post
//             </Button>
//             <Link to={"auth"} >
//                 <Button  className="rounded-full font-bold"
//               size={"lg"}
//               >
//                     login
//                 </Button>
//             </Link>
            
//             <ModeToggle/>
//             <CreatePost/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar

const Navbar = () => {
  return (
    <div className="w-full h-24 bg-gray-900 fixed inset-0  ">
<div className=" w-full h-full flex justify-between items-center  container ">
<Link to={"/"} className="flex justify-center items-center gap-2 ml-2">
            <img src="/logo.svg" alt="" />
             <p className="font-bold text-4xl text-white  ">Jasur.inc</p>
           </Link>
           <div className="flex gap-2">
             <Button
               className="rounded-full font-bold"
               size={"lg"}
               variant={"outline"}
              
             >
               Create post
             </Button>
             <Link to={"auth"} >
                 <Button  className="rounded-full font-bold"
               size={"lg"}
               >
                     login
                 </Button>
             </Link>
             <ModeToggle/>
             </div>
</div>
    </div>
  )
}

export default Navbar
import { useQuery } from "@tanstack/react-query"
import $axios from '@/http';

import { IPost } from "@/interfaces";
import PostCard from "@/cards/post.card";
import PostLoading from "@/components/shared/postLoading";
import Errors from "@/components/shared/errors";
import { postStore } from "@/store/post.store";
import ConfirModal from "@/components/modals/confirm.modal";


const Home = () => {

  const {setPosts,posts} =postStore()

  const {isLoading,error} = useQuery({
    queryKey:["get-posts"],
    queryFn: async()=>{
      const {data}= await $axios.get("/post/get")
      setPosts(data)
      return data
    }
  })
  
  return (

    <div className="container max-w-4xl mx-auto mt-28 ">
<div className="grid grid-cols-3 gap-4 ">
  {error && <Errors error={error}/>}
  {isLoading && Array.from({length:6}).map((_,idx)=>(<PostLoading key={idx}/>))}
{posts?.map((post:IPost)=><PostCard key={post._id} post={post}/>)}
</div>
<ConfirModal/>
    </div>
  )
}

export default Home
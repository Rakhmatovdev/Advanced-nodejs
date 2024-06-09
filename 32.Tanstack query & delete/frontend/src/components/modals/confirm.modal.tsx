import { useConfirm } from "@/hooks/useConfirm";
import $axios from '@/http';
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { postStore } from "@/store/post.store";
import Errors from "../shared/errors";
import FillLoading from "../shared/fillLoading";

const ConfirModal = () => {

    const {isOpen,onClose,post}=useConfirm()
    const {setPosts,posts}=postStore()

    const {mutate,isPending,error}= useMutation({
        mutationKey:["delete-post"],
        mutationFn:async ()=>{
            const {data} = await $axios.delete(`/post/delete/${post._id}`)
            return data
        },
        onSuccess: data=>{
            const newData=posts.filter((post)=>post._id !== data._id)
            setPosts(newData)
            onClose()
        }
    })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        {error && <Errors error={error}/>}
        {isPending && <FillLoading/>}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button variant={"destructive"} onClick={onClose}>Cancel</Button>
        <Button onClick={()=>mutate()}>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default ConfirModal

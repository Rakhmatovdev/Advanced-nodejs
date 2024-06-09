import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { useConfirm } from "@/hooks/useConfirm"
import { API_URL } from "@/http"
import { IPost } from "@/interfaces"

const PostCard = ({post}:{post:IPost}) => {

const {onOpen,setPost}=useConfirm()

  const onDelete=()=>{
onOpen()
setPost(post)
  }
  return (
    <Card>
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md"/>
      <CardContent className="mt-2">
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <p className="line-clamp-2 mt-1 text-muted-foreground text-sm">{post.body}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full">Edit</Button>
        <Button className="w-full" variant={"destructive"} onClick={onDelete}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default PostCard
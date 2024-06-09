import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useConfirm } from "@/hooks/useConfirm"
import $axios, { API_URL } from "@/http"
import { IPost } from "@/interfaces"
import { postSchema } from "@/lib/validation"
import { postStore } from "@/store/post.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import FillLoading from "@/components/shared/fillLoading"

const PostCard = ({post}:{post:IPost}) => {
const [isOpen, setIsOpen] = useState(false)
const {onOpen,setPost}=useConfirm()
const {posts,setPosts} = postStore()

  const onDelete=()=>{
onOpen()
setPost(post)

  }

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const {mutate,isPending }= useMutation({
    mutationKey:["edit-post"],
    mutationFn:async (values: z.infer<typeof postSchema>)=>{
        const {data} = await $axios.put(`/post/edit/${post._id}`,values)
        return data
    },
    onSuccess: data=>{
        const newData=posts.map(up=>(up._id === data._id ? data:up))
        setPosts(newData)
        setIsOpen(false)
    },
    onError:()=>{
      toast.error("Something went wrong. Try again!")
    }
})

  function onSubmit(values: z.infer<typeof postSchema>) {
    mutate(values)
  }

  return (
    <Card>
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className="rounded-t-md"/>
      <CardContent className="mt-2">
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <p className="line-clamp-2 mt-1 text-muted-foreground text-sm">{post.body}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full" variant={"destructive"} onClick={onDelete}>Delete</Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
        <Button className="w-full">Edit</Button>
        </PopoverTrigger>
  <PopoverContent className="w-96 relative ">
    {isPending && <FillLoading/>}
  <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 mt-6"
          >
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a blog post..."
                      {...field}
                     disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="In this article you can improve..."
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
            <Button type="submit"     disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
  </PopoverContent>
</Popover>
       
      </CardFooter>
     

    </Card>
  )
}

export default PostCard
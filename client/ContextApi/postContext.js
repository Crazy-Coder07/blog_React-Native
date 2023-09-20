import react ,{useState,useEffect, createContext} from 'react';
import axios from "axios";

const PostContext=createContext();

const PostProvider=({children})=>{
    // global state
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    
    const getAllPosts=async()=>{
        setLoading(true);
        try{
           const {data}=await axios.get("/post/get-all-post");
           setLoading(false);
           setPosts(data?.posts);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    // initial posts
    useEffect(()=>{
        getAllPosts();
    },[]);

    return(
        <PostContext.Provider value={[posts,setPosts,getAllPosts]}>
            {children}
        </PostContext.Provider>
    )
}

export {PostProvider,PostContext};






import { useEffect, useState } from "react"

export const PostList = () => {
     const [posts, setPosts] = useState([])
     useEffect(() => {
          fetch('https://jsonplaceholder.typicode.com/photos')
               .then(response => response.json())
               .then(data => setPosts(data))
               .catch(err => console.log(err))
     }, [])

     return (
          <div>
               <ul>
                    {
                         posts.map(post => {
                              return <li key={post.id}>
                                        <img src={post.url}/>
                                   </li>
                         })
                    }
               </ul>
          </div>
     )
}

export default PostList
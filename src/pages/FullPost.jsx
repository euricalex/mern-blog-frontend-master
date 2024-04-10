import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../components/axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  

  const[data, setData] = React.useState();
  const[isLoading, setIsLoading] = React.useState(true);
  const {id} = useParams();

  React.useEffect(()=> {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
console.warn(err);
alert('Error getting article');
    });
    
  }, [id]);
  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  const formattedDate = new Date(data.createdAt).toLocaleString();
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageURL ? `http://localhost:4444${data.imageURL}` : ''}
        user={data.user}
        createdAt={formattedDate}
        viewCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Alex Rark",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 55",
          },
          {
            user: {
              fullName: "Alexei",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

import React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPopularPosts,  fetchPostsTagsSuccess,  fetchTags } from '../components/redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Popular.module.scss'
import axios from "../components/axios";

export const Popular = () => {
  const [selectedTag, setSelectedTag] = React.useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const {posts, tags} = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
dispatch(fetchPopularPosts());
dispatch(fetchTags());

  }, [])

  const handleOnTagClick = async (tag) => {
    try {
      const response = await axios.get(`/posts/tags/${tag}`);
      const data = response.data;
      dispatch(setSelectedTag(tag));
      dispatch(fetchPostsTagsSuccess(data));
      return data;

    } catch (error) {
      console.error("Error fetching posts with the selected tag:", error);
    }
  };
const filteredPosts = selectedTag ? posts.items.filter((post) => post.tags.includes(selectedTag)) : posts.items;
  return (
    <>
      <div className={styles.tabs} style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
      <Link className={styles.new} to="/">
        Новые
        </Link>
        <p className={styles.popular} >Популярные</p>  
        
      </div>
      <Grid container spacing={4}>
        <Grid xs={8} item>
        {filteredPosts.map((item, index) => isPostsLoading ? (<Post key={index} isLoading={true} />) : (
    item && (
        <Post
            id={item._id}
            title={item.title}
            imageUrl={ item.imageURL ? `http://localhost:4444${item.imageURL}` : ''}
            user={ item.user}
            createdAt={item.createdAt}
            viewCount={item.viewCount}
            commentsCount={3}
            tags={item.tags}
            isEditable={userData?._id === item.user._id}




        />
    )
))}
        </Grid>
        <Grid xs={4} item>
        {selectedTag && <h2 className={styles.headerTag}>#{selectedTag}</h2>}
          <TagsBlock onTagClick={handleOnTagClick} items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Alex Rark',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Alexei',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

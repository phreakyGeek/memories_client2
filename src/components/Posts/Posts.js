import React from 'react'
import { Grid, CircularProgress } from '@mui/material'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import style from './styles'
const Posts = ({ setCurrentId }) => {
  const posts = useSelector(state => state.posts)
  // console.log(posts)
  return (
      (posts.length < 1)
      ? <CircularProgress />
      : (
        <Grid style={style.container} container alignItems="stretch" spacing={3} >
          {posts.map(post =>(
            <Grid key={post._id} xs={12} sm={6} item>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )
  )
}

export default Posts

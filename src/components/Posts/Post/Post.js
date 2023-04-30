import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import style from './styles';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actiions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  const Likes = () => {
    if(post.likes.length > 0) {
      return post.likes.find((like) => like === ( user?.result?.googleId || user?.result?._id))
      ? (
        <><ThumbUpAltIcon fontSize='small' />&nbsp;{ post.likes.length > 2 ? `You and ${post.likes.length -1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      )
    }
    return <><ThumbUpAltIcon fontSize='small' />&nbsp;Like</>
  }
  // console.log(moment(post.createdAt).fromNow())
  return (
      <>
        <Card style={style.card}>
          <CardMedia style={style.media} image={post.selectedFile} />
          <div style={style.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div style={style.overlay2}>
              <Button
                style={{color: 'white'}}
                size="small"
                onClick={() => setCurrentId(post._id)} >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </div>
          )}
          <div style={style.details}>
            <Typography variant='body2' color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
          </div>
          <Typography style={style.title} variant='h5' gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant='h5' gutterBottom>{post.message}</Typography>
          </CardContent>
          <CardActions style={style.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
              <Likes />
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" />
                Delete
              </Button>
            )}
          </CardActions>
        </Card>

      </>
  )
}

export default Post


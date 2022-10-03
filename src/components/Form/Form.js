import React, { useEffect, useState } from 'react'
import style from './styles'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPosts, updatePost } from '../../actiions/posts'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: '',
    title: '', message: '', tags: '', selectedFile: ''
  })
  const currentPost = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if(currentPost)
    setPostData(currentPost)
  },[currentPost])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("postdata", postData)
    if(currentId){
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPosts({ ...postData, name: user?.result?.name }))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      // creator: '',
      title: '', message: '', tags: '', selectedFile: ''
    })
  }

  if(!user?.result?.name) {
    return (
      <Paper style={style.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper style={style.paper}>
      <form autoComplete='off' noValidate style={{...style.form}} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={e => setPostData({ ...postData,creator: e.target.value})}
          /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={e => setPostData({ ...postData,title: e.target.value})}
          />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={e => setPostData({ ...postData,message: e.target.value})}
          />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={e => setPostData({ ...postData,tags: e.target.value})}
          />
          <div style={style.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({base64}) =>  setPostData({ ...postData, selectedFile: base64})}
            />
          </div>
          <Button style={style.buttonSubmit} variant="contained" color="primary" fullWidth size="large" type="submit" >Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => clear} fullWidth type="submit" >Clear</Button>
      </form>

    </Paper>
  )
}

export default Form
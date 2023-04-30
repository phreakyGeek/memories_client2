import React,{ useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import memories from '../../images/memories.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import * as actionType from '../../actionTypes/actionTypes'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const loaction = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // console.log(user.result.imageUrl)
    useEffect(()=> {
      const token = user?.token

      // console.log(token)
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime())
         logout()
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
    },[loaction])

    const logout = () => {
      dispatch({ type: actionType.LOGOUT })
      history(0)
      setUser(null)
    }
  return (
    <AppBar style={style.appBar} position="static" color="inherit" >
        <div style={style.brandContainer}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography style={style.heading} variant='h2' align="center">
                Memories
              </Typography>
            </Link>
            <img style={style.image} src={memories} alt="memories" height="60"  />
        </div>
        <Toolbar style={style.toolbar}>
            {user ? (
                <div style={style.profile}>
                    <Avatar referrerPolicy="no-referrer" style={style.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                        <Typography style={style.userName} variant='h6'>
                            {user.result.name}
                        </Typography>
                        <Button variant='contained' style={style.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <div>
                    <Link to="/auth" style={{ textDecoration: 'none' }}>
                      <Button variant='contained' color='primary'>Sign In</Button>
                    </Link>
                </div>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar

const style = {
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      purple: {
        color: 'green',
        backgroundColor: 'pink',
      },
}
import React, {Component} from 'react'
import classes from './Login.module.scss'

class Login extends Component {
  
  render() {
    return (
      <div className={classes.Login}>
        <form className={classes.Form}>
          <div className={classes.FormItem}>
            <label htmlFor="">Login</label>
            <input type="text" placeholder="Login"/>
          </div>
          <div className={classes.FormItem}>
            <label htmlFor="">Password</label>
            <input type="text" placeholder="Password"/>
          </div>

          <div className={classes.FormItemButton}>
            <button>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
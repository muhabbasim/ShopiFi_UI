import './RegisterDone.scss'
import {TiUserAddOutline} from 'react-icons/ti'

import { Link } from 'react-router-dom'

export default function RegisterDone() {

  return (
    <section className="register-auth-done">
      <div className='register-page'>
        <div className='center-all' >
          <TiUserAddOutline size={30} color="gray"/>
        </div>
        <h1>Registered Succesfully</h1>
        <span>To explore you world here go to ... <Link className='--link' to='/login'>Login</Link></span>
      </div>
    </section>
  )
}

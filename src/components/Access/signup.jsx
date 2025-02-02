import React from "react";
import styles from "./index.module.scss";
import GoogleLogo from "../../assets/google.png";
import { FaGithub, FaEye} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';



const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 character').max(7, 'Name must be at most 7 character'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 character'),
  // confirmPassword: z.string().optional().refine((data) => data.password === data.comfirmPassword, {
  //   message: 'Password does not match',
  //   path: ['confirmPassword']
  // })
  
  // password1: z.string().min(8, 'Password must be at least 6 character')
  //             .regex(/[A-Z]/ , 'Password must contain at least one uppercase letter')
  //             .regex(/[a-z]/ , 'Password must contain at least one lowercase letter')
  //             .regex(/[0-9]/ , 'Password must contain at least one number')
  //             .regex(/[^A-Za-z0-9]/ , 'Password must contain at least one special character')
  //  Product ....
})


const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = ( data ) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signupRight}>
        <h2>Create Account</h2>
        <div className={styles.Form}>
          <input type="text" {...register("name")} placeholder="Full Name" />
          <SpanError errors={errors.name} />
          <input type="email" {...register("email")} placeholder="Email Address" />
          <SpanError errors={errors.email} />
          <div className={styles.passwordContainer}>
            <input type="password" {...register("password")} placeholder="Password" />
            <i><FaEye/></i>
          </div>
          <SpanError errors={errors.password} />
          <button >Create Account</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <div className={styles.divider}>
          <span>or Sign In with</span>
        </div>
        <div className={styles.socialLogin}>
          <button className={styles.googleBtn}>
            <i><img src={GoogleLogo} style={{width: '15px'}} alt="" /></i>Sign up with Google
            </button>
          <button className={styles.githubBtn}><i><FaGithub/></i>Sign up with Github</button>
        </div>
      </form>
  )
}

export default Signup;


const SpanError = ( { errors } ) => {
  return (
    errors &&
    <span className={styles.error}>
      <FiAlertCircle style={{paddingRight: '5px'}}/> {errors.message}
    </span>
  );
}

"use client"
import React, {useState} from 'react'
import Link from 'next/link'

const RegisterForm = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error,setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!name || !email || !password){
            setError("All fields are necessary")
        }

        try {
          const res =  await fetch('api/register', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,password
            })
           })

           if(res.ok){
            const form = e.target;
            form.reset();
           } else {
            console.log("User reg failed")
           }
        } catch (error) {
            console.log("error during registration:", error)
        }
    }

  return (
    <div
    className='grid place-items-center h-screen'
    >
        <div className='shadow-lg p-5 rounded border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Register</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input type="text" placeholder='Full name' onChange={(e)=>setName(e.target.value)} /> {console.log(name)}
                <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} /> {console.log(email)}
                <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/> {console.log(password)}
            <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>Register</button>

            { error && (
            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                {error}
            </div>
            )}

            <Link className='text-sm mt-3 text-right' href={'/'}>
                Already have an account? <span className='underline'>Login</span>
            </Link>
            </form>
        </div>
        </div>
  )
}

export default RegisterForm
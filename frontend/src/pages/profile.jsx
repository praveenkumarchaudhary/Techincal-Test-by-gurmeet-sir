import React from 'react'
import { useState, useEffect } from 'react'



const profile = () => {

    const [name, Setname] = useState("")
    const [email, SetEmail] = useState("")
    const [phone, Setphone] = useState("")
    const [address, Setaddress] = useState("")

    const [profile,Setprofile]= useState([])


    const handlesubmit = async(e) => {
        e.preventDefault()

        try {

            const profiledata = {
                name, email, phone, address
            }

            const response =  await axios.post("https://localhost:5000/api/profiles", profiledata)
            console.log(response.data)

        }

        catch(error){
            console.log(error)
        }

       
    }

    const Getdata = async()=>{
        const response = await fetch("http://localhost://5000/api/products")
        .then((response)=>response.json())
        .then(()=>{
           Setprofile(response.body)
        })


       .catch(()=>{
            oonsole.log(error)
        })
    }

    useEffect(()=>{
        Getdata()
    },[])


  


    return (
        <div>
            <form onSubmit={handlesubmit}>

                <input
                    type="text"
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => Setname(e.target.value)}
                />

                <br />


                <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                />

                <br />


                <input
                    type="number"
                    placeholder='Enter your phone'
                    value={phone}
                    onChange={(e) => Setphone(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    placeholder='Enter your adrress'
                    value={address}
                    onChange={(e) => Setaddress(e.target.value)}
                />

                <br />

            </form>

        </div>
    )
}

export default profile

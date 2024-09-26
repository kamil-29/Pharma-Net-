import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ color = "text-light", icon = true, fontSize = "25px" }) => {
    return (
        <>
            <Link to="/">
                <div className='d-flex gap-2  align-items-center'>
                    <h3 className={`fw-bold mb-0 ${color}`}>PHARMA-NET &#174;</h3>
                </div>
            </Link>
        </>
    )
}

export default Logo
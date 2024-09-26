import React from 'react'
import { Chip, Paper } from '@mui/material'

const ScoreCard = ({ name, number, i }) => {
    return (
        <>
            <div
                key={i}
                style={{
                    height: "100px",
                    padding: "10px",
                }}
                className='g_border_radius bg-white'
                // elevation={3}
            >
                <div className="d-flex h-100 justify-content-between flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 fs-6 fw-bold">
                            {name}
                        </p>
                    </div>

                    <div className="d-flex justify-content-between mt-3 " >
                        <Chip
                            sx={{ fontSize: '9px' }}
                            label={name}
                            size="small"
                            color="primary"
                        />
                        <p className='fs-4 fw-bold'>
                            {number}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreCard
import React from 'react'
import { FaCloud } from "react-icons/fa";
import '../App.css'

export default function ErrorMessageBox({message}) {
    return (
        <div className="transperent-box">
            <FaCloud color="red" className="mr-2" />
            {message}
        </div>
    )
}

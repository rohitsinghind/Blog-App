import React from 'react'
import {Footer} from "flowbite-react"
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function FooterCom() {
  return (
   <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright href='#' by="Lucid's blog" year={new Date().getFullYear()}/>
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={FaFacebook}/>
                <Footer.Icon href='#' icon={FaInstagram}/>
                <Footer.Icon href='#' icon={FaTwitter}/>
                <Footer.Icon href='#' icon={FaGithub}/>
                

            </div>
        </div>
    </div>
   </Footer>
  )
}

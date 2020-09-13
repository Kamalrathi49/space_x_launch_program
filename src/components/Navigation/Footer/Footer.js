import React from 'react'
import Disclaimer from './Disclaimer/Disclaimer'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.AppFooter}>
            <Disclaimer />
        </footer>
    )
}
export default Footer
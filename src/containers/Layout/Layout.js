import React from 'react'
import Header from '../../components/Navigation/Header/Header'
import Footer from '../../components/Navigation/Footer/Footer'
import './Layout.css'

class Layout extends React.Component {

    render() {
        return (
            <>
                <Header />
                {
                    <main className="main-container">
                        {this.props.children}
                    </main>
                }
                <Footer />
            </>
        )
    }
}

export default Layout
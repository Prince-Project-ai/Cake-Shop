import React from 'react'

const Footer = () => {
    console.log("FOOTER RENDER");
    return (
        <footer className="bg-white py-4 border-t-2  border-light px-5 text-sm text-primary-dark/80">
            <p>© 2025 Dashboard. All rights reserved.</p>
        </footer>
    )
}

export default React.memo(Footer)
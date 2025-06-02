import { React, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css"
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <div className="layout">
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h2>My App</h2>
                <ul>
                    <li><Link to="product">Product</Link></li>
                    <li><Link to="category">Category</Link></li>
                </ul>
            </div>
            {/* Main Content */}    
            <div className="main-content">
                <div className="topbar">
                    <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        close
                    </button>   
                    <h1>Dashboard</h1>
                </div>  
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

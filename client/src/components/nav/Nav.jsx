import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Dropdown from '../dropdown/Dropdown'
import './Nav.scss'
import { serviceDropDown } from '../../dropDownData'
import { animationDropDown } from '../../dropDownData'
import { lifestyleDropDown } from '../../dropDownData'
import { techDropDown } from '../../dropDownData'
import { marketingDropDown } from '../../dropDownData'
import { writingDropDown } from '../../dropDownData'
import {FiSearch} from 'react-icons/fi'
import { AuthContext } from '../../context/authContext'
import newRequest from '../../context/newRequest'
import { useQuery } from '@tanstack/react-query'



function Nav() {

    const detailsOption = [
        {
            "id": 6,
            "title": "All Categories"
        },
        {
            "id": 1,
            "title": "Graphics & design"
        },
        {
            "id": 2,
            "title": "Video & animation"
        },
        {
            "id": 3,
            "title": "Photography"
        },
        {
            "id": 4,
            "title": "Fitness & Sport"
        },
        {
            "id": 5,
            "title": "Tech & programming"
        },
        
    ]

    const paramsCat = useLocation().search
    // console.log(paramsCat)
    const navigate = useNavigate()

    const { currentUser, logout } = useContext(AuthContext)

    const [ openUserList, setOpenUserList ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ isActive2, setIsActive2 ] = useState(false);
    const [ showdropDown, setShowdropDown ] = useState(false);
    const [ animationDD, setanimationDD ] = useState(false);
    const [ writingDD, setWritingDD ] = useState(false);
    const [ TechDD, setTechDD ] = useState(false);
    const [ lifestyleDD, setLifestyleDD ] = useState(false);
    const [ marketingDD, setMarketingDD ] = useState(false);

    const [ openMenu, setOpenMenu ] = useState(false)

    const activeScroll = () => {
        window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
        window.scrollY > 500 ? setIsActive2(true) : setIsActive2(false);
    }

    useEffect(()=> {
        window.addEventListener('scroll', activeScroll)
        return () => { // clean up
            window.addEventListener('scroll', activeScroll)
        } 
    },[])

    useEffect(()=> {
        window.scrollTo(0, 0)
    },[paramsCat])
    
    const handleLogout = (e) => {
        e.preventDefault()
        logout();
        navigate("/");
    }


    const { isLoading, error, data: ordersLength } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
        newRequest.get(`/orders`).then((res) => {
            return res.data
        })
    })
    
    const { isLoading: isLoadingMessage, error: messageError, data: unreadMessageData } = useQuery({
        queryKey: ['unreadconversation'],
        queryFn: () =>
        newRequest.get(`/convo/unread`).then((res) => {
            return res.data
        })
    })

    let timer;
    // graphics 
    const onMouseEnter1 = () => {
        timer = setTimeout(() => {
            setShowdropDown(true)
        }, 500);
    }
    const onMouseLeave1 = () => {
        clearTimeout(timer)
        setShowdropDown(false)
    }

    // animation
    const onMouseEnter2 = () => {
        timer = setTimeout(() => {
            setanimationDD(true)
        }, 500);
    }
    const onMouseLeave2 = () => {
        clearTimeout(timer)
        setanimationDD(false)
    }

    // writing
    const onMouseEnter3 = () => {
        timer = setTimeout(() => {
            setWritingDD(true)
        }, 500);
    }
    const onMouseLeave3 = () => {
        clearTimeout(timer)
        setWritingDD(false)
    }

    // marketing
    const onMouseEnter4 = () => {
        timer = setTimeout(() => {
            setMarketingDD(true)
        }, 500);
    }
    const onMouseLeave4 = () => {
        clearTimeout(timer)
        setMarketingDD(false)
    }

    // tech
    const onMouseEnter5 = () => {
        timer = setTimeout(() => {
            setTechDD(true)
        }, 500);
    }
    const onMouseLeave5 = () => {
        clearTimeout(timer)
        setTechDD(false)
    }

    // lifestyle
    const onMouseEnter6 = () => {
        timer = setTimeout(() => {
            setLifestyleDD(true)
        }, 500);
    }
    const onMouseLeave6 = () => {
        clearTimeout(timer)
        setLifestyleDD(false)
    }

    // search function
    const [ input, setInput ] = useState()

    const handleSearch = () => {
        navigate(`/gigs?search=${input}`)
    }
    
    return (
        <div className={`nav ${isActive && "active"}`}>
            <div className="top flex-between">
                <div className="left flex">
                    <Link className='link' to={'/'}>
                        <h2>ShopiFi<span>.</span></h2>
                    </Link>
                </div>
                { isActive2 && <div className="center">
                    <div className="search-box">
                        <FiSearch className='search-icon' size={22} color="lightgray"/>
                        <input type="search" 
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Try "Search..."' 
                        />
                        <button style={{cursor: "pointer"}} onClick={handleSearch}>Search</button>
                    </div>
                </div>}

                { <div className={`right flex ${openMenu && "active"} `}>
                    <ul className='flex' onClick={()=> setOpenMenu(false)}>
                        <li><a href="">Business</a></li>
                        <li><a href="">Explore</a></li>
                        <li><a href="">About</a></li>
                        { !currentUser && <li><Link className='link' to={"/register"}>Sign_up</Link></li> }
                        { !currentUser && <li><Link className='link' to={"/login"}>Login</Link></li> }
                        { currentUser?.isSeller ? null : <li><Link className='link' to={"/"}>Become a Seller</Link></li> }
                    </ul>

                    { currentUser && <div className="user flex" onClick={()=> setOpenUserList(!openUserList)}>
                        <img src={currentUser.img} alt="" />
                        <span>{currentUser.username}</span>
                    </div>}

                    { openUserList && <div className="user-list">
                        <ul  onClick={()=> {setOpenUserList(!openUserList), setOpenMenu(false)}}>
                            { currentUser.isSeller && <>
                                <Link className='link' to={`/mygigs/${currentUser._id}`}>
                                    <li>Gigs</li>
                                </Link>
                                <Link className='link' to={'/adding'}>
                                    <li>Add New Gig</li>
                                </Link>
                            </>}
                            {isLoading 
                                ? "isLoading"
                                : error
                                ? "Something went wrog" 
                                : <Link className='link' to={`/orders/${currentUser._id}`}>
                                <li className='nav-order'>Orders <span>{ordersLength?.length}</span></li>
                            </Link>}
                            { isLoadingMessage 
                                ? "isLoading"
                                : messageError
                                ? "Something went wrog" 
                                : <Link className='link' to={`/messages/${currentUser._id}`}>
                                <li className='nav-message'>Messages <span>{unreadMessageData?.length}</span></li>
                            </Link>}
                            <Link className='link' to={`/`}>
                                <li onClick={handleLogout}>Logout</li>
                            </Link>
                        </ul>
                    </div>}
                </div>}

                <div className={`menu`} onClick={()=> {setOpenUserList(false), setOpenMenu(!openMenu)}}>
                    <div className={`line-one ${openMenu && "one-animation"} ${isActive && "black-color"}`}></div>
                    <div className={`line-center ${openMenu && "center-animation"} ${isActive && "black-color"}`}></div>
                    <div className={`line-two ${openMenu && "two-animation"} ${isActive && "black-color"}`}></div>
                </div>
            </div>
            <>
                { isActive && <ul className="bottom flex">
                    {detailsOption.map((option) => {

                        if (option.title === "All Categories") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter6}
                                    onMouseLeave={onMouseLeave6}
                                >
                                    <Link to={`/gigs?undefined`} className='link'>
                                        {option.title}
                                    </Link> 
                                    { lifestyleDD && <Dropdown serviceDropDown={lifestyleDropDown}/>}
                                </li>
                            )
                        }

                        if (option.title === "Graphics & design") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter1}
                                    onMouseLeave={onMouseLeave1}
                                >
                                    <Link to={`/gigs?cat=design`} className='link'>
                                        {option.title}
                                    </Link>
                                    { showdropDown && <Dropdown serviceDropDown={serviceDropDown}/>}
                                </li>
                            )
                        }

                        if (option.title === "Video & animation") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter2}
                                    onMouseLeave={onMouseLeave2}
                                >
                                    <Link to={`/gigs?cat=animation`} className='link'>
                                        {option.title}
                                    </Link> 
                                    { animationDD && <Dropdown serviceDropDown={animationDropDown}/>}
                                </li>
                            )
                        }

                        if (option.title === "Photography") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter3}
                                    onMouseLeave={onMouseLeave3}
                                >
                                    <Link to={`/gigs?cat=photography`} className='link'>
                                        {option.title}
                                    </Link> 
                                    { writingDD && <Dropdown serviceDropDown={writingDropDown}/>}
                                </li>
                            )
                        }

                        if (option.title === "Fitness & Sport") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter4}
                                    onMouseLeave={onMouseLeave4}
                                >
                                    <Link to={`/gigs?cat=sport`} className='link'>
                                        {option.title}
                                    </Link> 
                                    { marketingDD && <Dropdown serviceDropDown={marketingDropDown}/>}
                                </li>

                            )
                        }

                        if (option.title === "Tech & programming") {
                            return (
                                <li className='option-item' 
                                    key={option.id}
                                    onMouseEnter={onMouseEnter5}
                                    onMouseLeave={onMouseLeave5}
                                >
                                    <Link to={`/gigs?cat=tech`} className='link'>
                                        {option.title}
                                    </Link> 
                                    { TechDD && <Dropdown serviceDropDown={techDropDown}/>}
                                </li>
                            )
                        }

                        return (
                            <li className='option-item' key={option.id}>{option.title}</li>
                        )
                    })}
                </ul> }
            </>
        </div>
    )
}

export default Nav
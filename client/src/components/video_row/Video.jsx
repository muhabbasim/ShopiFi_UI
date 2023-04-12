import React from 'react'
import './Video.scss'
import { BsCheck2Circle } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import vid from '../../assets/vid.mp4'

function Video() {
    return (
        <div className='video'>
            <div className="left">
                <h2>A whole world of freelance talent at your fingertips</h2>
                <div className="item">
                    <div className="title">
                        <div className='first-row flex'>
                            <BsCheck2Circle size={25} color={"lightgray"}/>
                            <h3>Don’t walk in front of me… </h3>
                        </div>
                        <h4>Only light can do that. Hate cannot drive out hate: only love can do that single word of what I am saying  is doing</h4>
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        <div className='first-row flex'>
                            <BsCheck2Circle size={25} color={"lightgray"}/>
                            <h3>So many books, so little time</h3>
                        </div>
                        <h4>A room without books is like a body without a soul single word of what I am saying  is doing!</h4>
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        <div className='first-row flex'>
                            <BsCheck2Circle size={25} color={"lightgray"}/>
                            <h3>Two things are infinite</h3>
                        </div>
                        <h4>I am so clever that sometimes I don't understand a single word of what I am saying  is doing the same thing.</h4>
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        <div className='first-row flex'>
                            <BsCheck2Circle className='icon' size={25} color={"lightgray"}/>
                            <h3>adipisicing elit. Quia</h3>
                        </div>
                        <h4>Insanity is doing the same thing, over and over again, but expecting different results.</h4>
                    </div>
                </div>
            </div>

            <div className="right">
                <video src={vid} controls></video>
                {/* <ReactPlayer url="https://www.youtube.com/watch?v=KI5CnJ9u5ok&t=146s&ab_channel=LamaDev"/> */}
            </div>

        </div>
    )
}

export default Video
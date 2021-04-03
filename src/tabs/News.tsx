import React from 'react';
import MCButton from '../elements/MCButton';

const dev = false

const News = (props: { posts: { img: string, title: string, desc: string, link: string, date: string }[] }) => {
    const posts = props.posts

    const uiPosts = posts.map((post, i) => {
        return (<div key={i} className="text-white m-2 flex flex-col bg-mc-b100 p-2 rounded-lg shadow-xl">
            <div className="flex flex-row items-start">
                <h4 className="text-xl leading-tight mb-2 font-semibold">{post.title}</h4>
                <span className="text-blk-900 ml-2"> | {post.date}</span>
            </div>
            <div className="flex flex-row items-start">
                <img src={post.img} className="mr-2 rounded-lg" />
                <div className="flex flex-col">
                    <p className="text-gray-300 text-base mr-2 ml-1 inline">{post.desc}</p>
                </div>
            </div>
            <div className="self-end flex flex-row items-center mt-2 mr-3">
                <p className="text-sm ml-2 mr-2 text-blk-900 mt-1">@ MinecraftMain.ru</p>
                <MCButton text="Перейти" link={post.link}/>
            </div>
        </div>)
    })

    return (
        <div className="flex flex-col flex-1 flex-grow">
            <div className="mb-2 relative top-0">
                <img src="../assets/img/mcbg.png" alt="" className="block w-full" />
                <div className="w-full h-full bg-gradient-t-blkmc-img absolute z-10 top-0">
                    <p className="minecraft text-white text-2xl bottom-0 ml-2 absolute">
                        MATE
                        {dev ? <span className="text-sm text-blk-900">(0.0.1-react)</span> : null}
                    </p>
                </div>
            </div>
            <div className="mb-16 h-full bg-mc-b300">
                {uiPosts}
            </div>
        </div>
    )
}

export default News
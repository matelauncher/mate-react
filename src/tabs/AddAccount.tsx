import React, { useState, FormEvent } from 'react';
import MCButton from '../elements/MCButton';
import { addAccount } from '../../lib/userSettings'

const AddAccount = (props: { setTab: Function }) => {
    const setTab = props.setTab

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        console.log(nickname, password)
        addAccount({ nickname, type: 'pirate' })
        setTab('news')
        e.preventDefault()
    }

    return (
        <div className="flex flex-col flex-1 flex-grow h-full">
            <div className="h-full bg-login flex justify-center relative">
                <form onSubmit={handleSubmit} className="bg-white w-1/3 h-2/3 self-center flex flex-col p-4 justify-evenly rounded-lg relative">
                    <button onClick={() => setTab('news')} className="text-white absolute left-0 top-0 bg-mc-b100 h-8 w-8 m-1 rounded-lg">
                        {`<`}
                    </button>
                    <p className="self-center">Добавление аккаунта</p>
                    <div className="">
                        <div className="w-full flex justify-center items-center flex-col mb-4">
                            <label className="self-start">
                                Nickname:
                            </label>
                            <input className="border-black border-2 outline-none focus:outline-none w-full rounded-md h-8" type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} />
                        </div>
                        <div className="w-full flex justify-center items-center flex-col ">
                            <label className="self-start">
                                Password:
                            </label>
                            <input className="border-black border-2 outline-none focus:outline-none w-full rounded-md h-8" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <MCButton type="submit" text="Добавить" className="self-center"/>
                </form>
            </div>
        </div>
    )
}

export default AddAccount
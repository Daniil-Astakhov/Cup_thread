import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import io  from "socket.io-client";
import styles from '../styles/Chat.module.scss'
import EmojiPicker from "emoji-picker-react";


import icon from '../images/emoji.svg'
import Messages from "./Messages";


const socket = io.connect('http://localhost:5000')
const Chat = () => {
    const [state, setState] = useState([]);
    const { search } = useLocation()
    const [params, setParams] = useState({room: "", user: "" });
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams)
    }, [search]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            setState((_state) => [ ..._state, data ])
        });
    }, []);

    const leaveRoom = () => {};
    const handleChange = ({ target: {value} }) => setMessage(value);
    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`)
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!message) return;

        socket.emit('sendMessage', {message, params});

        setMessage('');
    };


    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {params.room}
                </div>
                <div className={styles.users}>
                    o users in whis room
                </div>
                <button className={styles.left} onClick={leaveRoom}>
                    leaveRoom
                </button>
            </div>
            <div className={styles.messages}>
                <Messages  messages={state} name={params.name}/>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <input 
                        type="text" 
                        name="message" 
                        value={message}
                        placeholder="What do you want?"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={styles.emoji}>
                    <img src={icon} alt="icon" onClick={() => setIsOpen(!isOpen)}/>
                    {isOpen && (
                        <div className={styles.emojies}>
                            <EmojiPicker onEmojiClick={onEmojiClick} /> 
                        </div>
                    )}
                </div>
                <div className={styles.button}>
                    <input type="submit" onSubmit={handleSubmit} value="Send a massage" />
                </div>
            </form>

        </div>
    )
};
export default Chat;
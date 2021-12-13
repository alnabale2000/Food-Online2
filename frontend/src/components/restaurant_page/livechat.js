import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router";

const ENDPOINT = "http://localhost:8000";

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();
    const socket = io.connect(ENDPOINT);
    const textInput = React.useRef();
    const id = useParams();

    const joinRoom = () => {
        socket.emit("join_room", id.id);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("message", message);
        textInput.current.value = "";
    };

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((messages) => [...messages, data]);
        });
        joinRoom();

        return () => socket.removeAllListeners();
    }, []);

    return (
        <section className="live-chat-body">
            {console.log("r")}
            <div>
                <header className="live-chat-header">
                    <h2>Live Chat</h2>
                    <p className="live-chat-header-text">
                        Talk And Connect With Another People Intrested In This Restaurant
                    </p>
                </header>
                <div className="messages">
                    {messages.map((message, index) => {
                        return (
                            <div key={index} className={"message "}>
                                {message[0] ?? "Guest"} : {message[1]}
                            </div>
                        );
                    })}
                </div>
            </div>
            <form>
                <input
                    className="live-chat-input-filed"
                    type="text"
                    ref={textInput}
                    placeholder="Write Your Comment Here ..."
                    onChange={(e) => {
                        setMessage([id.id, localStorage.getItem("username"), e.target.value]);
                    }}
                />
                <button onClick={sendMessage} className="live-chat-button">
                    Send
                </button>
                {/* <button
                    type="button"
                    class="btn btn-warning live-chat-button"
                    onClick={sendMessage}
                >
                    Send
                </button> */}
            </form>
        </section>
    );
};

export default LiveChat;

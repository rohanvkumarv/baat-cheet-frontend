import React, { useEffect } from "react";
import axios from "axios";
import { socket } from "./socket";
import { Button } from "@radix-ui/themes";

const App = () => {
    const [value, setValue] = React.useState("");
    const [id, setId] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("send_msg", value);
    };
    useEffect(() => {
        socket.on("connect", () => {
            setId(socket.id);
        });
        socket.on("send_msg", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        // socket.emit("send_msg", "Hello from client!");
        // socket.on("disconnect", () => {
        //     console.log("Disconnected from server");
        // });
    }, []);
    return (
        <div className="h-screen bg-[#202021]">
            <div>
                {messages.map((msg, i) => (
                    <div key={i}>
                        <span>{msg}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button>Send</Button>
            </form>
        </div>
    );
};

export default App;

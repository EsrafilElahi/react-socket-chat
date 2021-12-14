import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { v4 as uuid_v4 } from "uuid";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [val, setVal] = useState("");
  const [info, setInfo] = useState();

  useEffect(() => {
    const data = localStorage.getItem("firstUser");
    const info2 = JSON.parse(data);
    setInfo(info2);
  }, []);

  // Refs
  const messageRef = useRef();
  const socketRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    // input focus
    inputRef.current.focus();

    // connection
    socketRef.current = io.connect("/");

    // new Message
    socketRef.current.on("add msg", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // delete Message
    socketRef.current.on("delete message", () => {
      console.log("delete message");
    });
  }, []);

  useEffect(() => {
    if (messageRef) {
      messageRef.current.addEventListener("DOMNodeInserted", (e) => {
        // const { currentTarget } = e;
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messageRef]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!val) return {};

    const body = {
      name: info.userName,
      gender: info.gender,
      email: info.email,
      date: {
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
      },
      msg: val,
      id: uuid_v4(),
    };
    setVal("");
    console.log(body);
    inputRef.current.focus();

    socketRef.current.emit("send message", body);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const yourSelf = (itemSelf) => {
    if (
      info.email === itemSelf.email &&
      info.userName === itemSelf.name &&
      info.gender === itemSelf.gender
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteMessage = (id, item) => {
    if (yourSelf(item)) {
      const copyArr = [...messages];
      const filteredArr = copyArr.filter((item) => item.id !== id);
      setMessages(filteredArr);

      socketRef.current.emit("delete message", id);
    } else return {};
  };

  return (
    <div className="container_container">
      <div className="chat_container" ref={messageRef}>
        {messages.map((item) => {
          return (
            <div
              key={item.id}
              className={yourSelf(item) ? "message_div" : "message_div_reverse"}
            >
              <div
                className={
                  yourSelf(item) ? "message_info" : "message_info_reverse"
                }
              >
                <span>{item.name}</span>
                {/* {"\xa0\xa0\xa0\xa0"} */}
                <img
                  className="img_profile"
                  alt={
                    item.gender === "male" ? "male profile" : "female profile"
                  }
                  src={
                    item.gender === "male"
                      ? "/images/male_user.png"
                      : "/images/female_user.png"
                  }
                />
              </div>
              <div className="message_date_msg">
                <span
                  className={yourSelf(item) ? "date" : "date_reverse"}
                >{`${item.date.hour} : ${item.date.min} : ${item.date.sec}`}</span>
                <span
                  className={
                    yourSelf(item) ? "message_span" : "message_span_reverse"
                  }
                >
                  <RiDeleteBin7Fill
                    className={
                      yourSelf(item) ? "delete_icon" : "delete_icon_reverse"
                    }
                    onClick={() => handleDeleteMessage(item.id, item)}
                  />
                  {item.msg}
                </span>
              </div>
            </div>
          );
        })}

        <div className="chat_box">
          <input
            type="text"
            className="input_chat"
            placeholder="type something..."
            value={val}
            ref={inputRef}
            onChange={(e) => setVal(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button className="btn_send" onClick={(e) => sendMessage(e)}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

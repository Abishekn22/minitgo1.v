import React, { useEffect, useState } from "react";
import { topics } from "../components/help/topics";
import Bot from "../components/help/Bot";
import Topic from "../components/help/Topic";

function Help() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTopic, setSearchedTopic] = useState("");
  const [chat, setChat] = useState("hidden");
  const [botVisibility, setBotVisbility] = useState(false);

  const filteredTopics = searchTopic
    ? topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchTopic.toLowerCase())
      )
    : topics;

  const handleChatVisibility = () => {
    setChat(chat === "hidden" ? "" : "hidden");
    setBotVisbility(!botVisibility);
  };
  return (
    <div className="min-vh-100 position-relative my-md-4 py-1 bg-body-tertiary ">
      <div className=" container">
        <header
          className="mt-5 "
          style={{
            backgroundImage: "url('/helpBg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "250px",
          }}
        >
          <div className="container d-flex flex-column align-items-center justify-content-center gap-6  h-100">
            <h1 className="text-4xl font-bold text-white text-center">
              Help Center
            </h1>
            <div className="d-flex p-2 gap-1  rounded-md bg-white rounded  ">
              <div
                className=" d-flex align-items-center justify-content-center"
                style={{ height: "30px" }}
              >
                <img
                  src="/search-icon.svg"
                  alt="searchIcon"
                  style={{ width: "20px" }}
                />
              </div>
              <div className="h-100 d-flex align-items-center ">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTopic}
                  onChange={(e) => setSearchedTopic(e.target.value)}
                  className="p-1 text-sm h-100"
                  style={{ width: "250px", border: "none", outline: "none" }}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="d-flex flex-column py-5  min-vh-50 gap-4 ">
          <div className="container d-flex flex-column align-items-center gap-4">
            <h1 className="font-weight-bold">Need help?</h1>
            <p className="text-sm text-center">
              Click a topic below to get started, brush up on features and
              workflows, or troubleshoot an issue.
            </p>
          </div>
          <div className="container px-2 md:px-5 py-4 d-flex justify-content-center md:justify-content-between flex-wrap gap-4 ">
            {filteredTopics.map((topic, index) => (
              <Topic
                key={index}
                imgPath={topic.imgPath}
                title={topic.title}
                description={topic.description}
              />
            ))}
          </div>
        </section>
        <section
          className="position-fixed end-0 rounded-lg d-flex flex-column gap-4 align-items-end"
          style={{ bottom: "80px" }}
        >
          {botVisibility && (
            <div
              className={` rounded bg-body-secondary  ${chat}`}
              style={{
                scrollbarWidth: "thin",
                height: "350px",
                width: "250px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <Bot />
            </div>
          )}
          <img
            src="/chatbot-icon.svg"
            alt="chatbot"
            style={{ width: "50px", cursor: "pointer" }}
            onClick={handleChatVisibility}
          />
        </section>
      </div>
    </div>
  );
}

export default Help;

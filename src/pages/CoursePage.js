import React, { useState, useRef, useEffect } from "react";
import { List, message, Tabs, Button, Segmented } from "antd";
import { AudioOutlined, ReadOutlined } from "@ant-design/icons";
import conversationData from "../data/conversation.json";
import sarahAvatar from "../assets/sarah.png";

const { TabPane } = Tabs;

const CoursePage = () => {
  const [conversation, setConversation] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  useEffect(() => {
    setConversation(conversationData);
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        const userResponse = event.results[0][0].transcript;
        message.info(`You said: ${userResponse}`);
        const userPart = { speaker: "David", text: userResponse };
        setConversation((prevConversation) => [...prevConversation, userPart]);
        setIsRecording(false);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Recognition error:", event.error);
        message.error("Speech recognition error: " + event.error);
        setIsRecording(false);
      };
    } else {
      message.warn("Speech Recognition API not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance();
    utteranceRef.current.addEventListener("end", () => {
      if (currentPartIndex < conversation.length) {
        if (conversation[currentPartIndex].speaker === "Sarah") {
          utteranceRef.current.text = conversation[currentPartIndex].text;
          window.speechSynthesis.speak(utteranceRef.current);
          setTimeout(() => {
            setCurrentPartIndex((prevIndex) => prevIndex + 1);
          }, 2000);
        } else if (conversation[currentPartIndex].speaker === "David") {
          setIsRecording(true);
        }
      }
    });
  }, [currentPartIndex]);

  const startConversation = () => {
    setCurrentPartIndex(0);
  };

  const playConversation = () => {
    setCurrentPartIndex(0);
    setIsRecording(false);
    if (conversation.length > 0) {
      playNextPart();
    }
  };

  const playNextPart = () => {
    if (currentPartIndex < conversation.length) {
      utteranceRef.current.text = conversation[currentPartIndex].text;
      window.speechSynthesis.speak(utteranceRef.current);
      if (conversation[currentPartIndex].speaker === "David") {
        setIsRecording(true);
      } else {
        setTimeout(() => {
          setCurrentPartIndex((prevIndex) => prevIndex + 1);
        }, 2000);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current.stop();
  };

  return (
    <div
      style={{
        backgroundColor: "#E2F8FF",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "20px",
          width: "816px",
          border: "1px solid rgba(0, 0, 0, 0)",
          overflow: "auto",
          margin: "0 auto",
          borderRadius: "16px",
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={sarahAvatar}
                  alt="Sarah Avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span style={{ marginRight: "10px" }}>Talk with Sarah</span>
              </div>
            }
            key="1"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#F9F9F9",
              }}
            >
              <List
                style={{
                  width: "90%",
                  marginBottom: "20px",
                }}
                itemLayout="horizontal"
                dataSource={conversation}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems:
                        item.speaker === "Sarah" ? "flex-start" : "flex-end",
                      marginBottom: "10px",
                      textAlign: item.speaker === "Sarah" ? "left" : "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          item.speaker === "Sarah"
                            ? "var(--grey-300, #ECECEC)"
                            : "var(--grey-100, #FFFFFF)",
                        padding: "10px",
                        borderRadius: "10px",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.text}
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                        fontSize: "12px",
                        color: "rgba(0, 0, 0, 0.45)",
                      }}
                    >
                      {item.speaker}
                    </div>
                  </List.Item>
                )}
              />
              {isRecording && <p>Recording...</p>}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                  marginTop: "20px",
                }}
              >
                <Segmented
                  onChange={(index) => {
                    if (index === 0) {
                      startRecording();
                    } else if (index === 1) {
                      startConversation();
                    }
                  }}
                  disabled={!isRecording}
                  defaultSelectedIndex={1}
                  options={[
                    {
                      label: "Listen",
                      value: "listen",
                      icon: <AudioOutlined />,
                    },
                    {
                      label: "Practice",
                      value: "practice",
                      icon: <ReadOutlined />,
                    },
                  ]}
                />
                <Button
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#00A9FF",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "none",
                    marginBottom: "20px",
                  }}
                  onClick={playConversation}
                >
                  Start Playing
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CoursePage;

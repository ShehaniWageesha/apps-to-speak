import React, { useState, useRef, useEffect } from "react";
import { List, message, Tabs, Button, Segmented } from "antd";
import {
  CustomerServiceFilled,
  ReadOutlined,
  AudioFilled,
  PlayCircleFilled,
  SoundFilled,
} from "@ant-design/icons";
import conversationData from "../data/conversation.json";
import sarahAvatar from "../assets/sarah.png";

const { TabPane } = Tabs;

const normalizeText = (text) => text.replace(/[^\w\s]|_/g, "").toLowerCase();

const CoursePage = () => {
  const [conversation] = useState([...conversationData]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState("practice");
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);
  const [recordedParts, setRecordedParts] = useState([]);
  const [correctlyPronounced, setCorrectlyPronounced] = useState(new Set());

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        const userResponse = event.results[0][0].transcript;
        const normalizedUserResponse = normalizeText(userResponse);

        const currentPart = conversation[currentPartIndex];
        const normalizedCorrectPhrase = normalizeText(currentPart.text);

        if (normalizedUserResponse === normalizedCorrectPhrase) {
          setCorrectlyPronounced((prev) => new Set(prev).add(currentPartIndex));
        }

        message.info(`${userResponse}`);
        setRecordedParts((prev) => [
          ...prev,
          { speaker: "David", text: userResponse },
        ]);

        setIsRecording(false);
        setCurrentPartIndex((prevIndex) => prevIndex + 1);
        setTimeout(playNextPart, 2000);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Recognition error : ", event.error);
        setIsRecording(false);

        if (event.error === "aborted" || event.error === "no-speech") {
          setTimeout(() => {
            if (currentPartIndex < conversation.length) {
              startRecording();
            }
          }, 2000);
        }
      };
      recognitionRef.current.onend = () => {
        if (isRecording) {
          setIsRecording(false);
        }
        playNextPart();
      };
    } else {
      message.warn("Speech Recognition API not supported in this browser.");
    }
  }, [currentPartIndex, isRecording]);

  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance();
    utteranceRef.current.addEventListener("end", () => {
      if (mode === "practice" && currentPartIndex < conversation.length) {
        const nextPart = conversation[currentPartIndex];
        if (nextPart.speaker === "David" && !isRecording) {
          startRecording();
        } else {
          setCurrentPartIndex((prevIndex) => prevIndex + 1);
          setTimeout(playNextPart, 2000);
        }
      }
    });
  }, [conversation, currentPartIndex, mode]);

  const startConversation = () => {
    setCurrentPartIndex(0);
    setRecordedParts([]);
    setCorrectlyPronounced(new Set());
    playNextPart();
  };

  const playNextPart = () => {
    if (currentPartIndex < conversation.length) {
      const currentPart = conversation[currentPartIndex];
      if (mode === "practice") {
        if (currentPart.speaker === "Sarah") {
          utteranceRef.current.text = currentPart.text;
          window.speechSynthesis.speak(utteranceRef.current);
        } else if (currentPart.speaker === "David") {
          startRecording();
        }
      } else if (mode === "listen") {
        utteranceRef.current.text = currentPart.text;
        window.speechSynthesis.speak(utteranceRef.current);
        setCurrentPartIndex((prevIndex) => prevIndex + 1);
        setTimeout(playNextPart, 2000);
      }
    } else if (mode === "practice") {
      console.log(
        "Recorded parts before saving to local storage : ",
        recordedParts
      );

      if (recordedParts.length > 0) {
        try {
          localStorage.setItem(
            "recordedConversation",
            JSON.stringify(recordedParts)
          );
          console.log("Recorded conversation saved to local storage.");
        } catch (e) {
          console.error("Error saving to local storage : ", e);
        }
      } else {
        console.warn("No recorded parts to save.");
      }
    }
  };

  const startRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
      setTimeout(() => {
        if (isRecording) {
          recognitionRef.current.stop();
        }
      }, 5000);
    }
  };

  const handleModeChange = (value) => {
    setMode(value);
    setCurrentPartIndex(0);
    setIsRecording(false);
    setRecordedParts([]);
    setCorrectlyPronounced(new Set());
  };

  const playRecordedConversation = () => {
    try {
      const storedConversation = localStorage.getItem("recordedConversation");
      console.log(
        "Stored conversation from local storage : ",
        storedConversation
      );

      if (storedConversation) {
        const recordedUserParts = JSON.parse(storedConversation);
        console.log("Parsed recorded user parts : ", recordedUserParts);

        let recordedIndex = 0;
        const conversationWithUserVoice = conversation.map((part) => {
          if (
            part.speaker === "David" &&
            recordedIndex < recordedUserParts.length
          ) {
            part.text = recordedUserParts[recordedIndex].text;
            recordedIndex++;
          }
          return part;
        });

        setCurrentPartIndex(0);
        playConversation(conversationWithUserVoice);
      } else {
        message.warning("No recorded conversation found.");
      }
    } catch (e) {
      console.error("Error retrieving from local storage : ", e);
    }
  };

  const playConversation = (conv) => {
    if (currentPartIndex < conv.length) {
      const currentPart = conv[currentPartIndex];
      utteranceRef.current.text = currentPart.text;
      window.speechSynthesis.speak(utteranceRef.current);
      setCurrentPartIndex((prevIndex) => prevIndex + 1);
      setTimeout(() => playConversation(conv), 2000);
    }
  };

  const playPhrase = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
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
                renderItem={(item, index) => (
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
                        display: "flex",
                        alignItems: "center",
                        backgroundColor:
                          item.speaker === "Sarah"
                            ? "var(--grey-300, #ECECEC)"
                            : "var(--grey-100, #FFFFFF)",
                        padding: "10px",
                        borderRadius: "10px",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                        border:
                          item.speaker === "David"
                            ? `0.5px solid ${
                                correctlyPronounced.has(index)
                                  ? "green"
                                  : "none"
                              }`
                            : "none",
                      }}
                    >
                      {item.text}
                      {item.speaker === "David" && (
                        <Button
                          icon={<SoundFilled style={{ color: "lightgray" }} />}
                          onClick={() => playPhrase(item.text)}
                          style={{
                            marginLeft: "10px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        />
                      )}
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
                  justifyContent: "space-between",
                  width: "90%",
                  marginTop: "20px",
                }}
              >
                <Segmented
                  onChange={handleModeChange}
                  disabled={isRecording}
                  defaultValue="practice"
                  options={[
                    {
                      label: "Listen",
                      value: "listen",
                      icon: <CustomerServiceFilled />,
                    },
                    {
                      label: "Practice",
                      value: "practice",
                      icon: <ReadOutlined />,
                    },
                  ]}
                />
                {mode === "practice" ? (
                  <Button
                    style={{
                      padding: "12px 24px",
                      background:
                        "linear-gradient(279.77deg, #90E5FF 5.41%, #00A9FF 92.45%)",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "none",
                      marginBottom: "20px",
                      float: "right",
                      fontWeight: "bold",
                    }}
                    onClick={startConversation}
                  >
                    <AudioFilled /> Start Recording
                  </Button>
                ) : (
                  <Button
                    style={{
                      padding: "12px 24px",
                      background:
                        "linear-gradient(279.77deg, #90E5FF 5.41%, #00A9FF 92.45%)",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "none",
                      marginBottom: "20px",
                      float: "right",
                      fontWeight: "bold",
                    }}
                    // onClick={playRecordedConversation}
                  >
                    <PlayCircleFilled /> Start Playing
                  </Button>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CoursePage;

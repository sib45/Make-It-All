import { getTopics, addTopic, removeTopic } from "../../services/forum";
import Topic from "../../../../types/Topic";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

// Forum topic list component
// Displays all forum topics

export default function TopicList() {
  const nav = useNavigate();

  function newTopic() {
    let name = prompt("Enter topic name:");

    let topic = new Topic(name);
    let res = addTopic(topic);
    if (!res) {
      window.location.reload();
    }
  }

  function goToTopic(id) {
    nav("/forum/" + id);
  }
  function remove(id) {
    let sure = confirm("Are you sure you want to delete this topic?");
    if (sure) {
      removeTopic(id);
      window.location.reload();
    }
  }

  let topics = getTopics();
  return (
    <div>
      <h2>Forum Topics</h2>
      <div className="topiclist">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="topicitem"
            onClick={() => {
              goToTopic(topic.id);
            }}
          >
            <div>{topic.name}</div>
            <div
              className="cross"
              onClick={(e) => {
                e.stopPropagation();
                remove(topic.id);
              }}
            >
              ✕
            </div>
          </div>
        ))}
        <div className="topicitem new" onClick={newTopic}>
          <div>
            <span className="bigplus">+</span>
            &nbsp;&nbsp;Create new topic
          </div>
        </div>
      </div>
      {/* <p>List of all topics will appear here</p> */}
    </div>
  );
}

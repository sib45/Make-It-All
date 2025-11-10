import Topic from "../../../types/Topic";

// TODO: should be req, for now just use localstorage
export function getTopics(): Topic[] {
  let res = localStorage.getItem("topics") || "[]";
  let data = JSON.parse(res) as any[];

  let topics = data.map((x) => {
    let topic = new Topic("");
    return Object.assign(topic, x);
  });
  return topics;
}

// TODO: should be req, for now just use localstorage
export function addTopic(topic: Topic): void | string {
  let list = getTopics();
  list.push(topic);
  // TODO: check id doesn't conflict
  localStorage.setItem("topics", JSON.stringify(list));
}

export function removeTopic(id: string): void {
  let list = getTopics();
  list = list.filter((x) => x.id !== id);
  localStorage.setItem("topics", JSON.stringify(list));
}

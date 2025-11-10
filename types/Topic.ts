export default class Topic {
    name: string
    id: string



    constructor(name: string) {
        this.name = name;
        this.id = name.replaceAll(/\W/g, "_")
    }

    createPost() {

    }

    sharePost() {

    }

}

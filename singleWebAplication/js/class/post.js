class Posts{
    constructor(){
        this.posts = [];
        this.last = null;
    }
    agregar(newPost){
        this.last ? newPost['id'] = this.last['id'] + 1 : newPost['id'] = 1;
        this.posts.push(newPost);
        this.last = newPost;
    }
    getPostsFromUser(userId){
        let usersPosts = [];
        for(let i = 0, j= 0; i < getPosts.length; i++){
            getPosts[i].userId == userId ? (usersPosts[j] = getPosts[i], j++): null;
        }
        return usersPosts;
    }
    getPosts(){
        return this.posts;
    }
}
export default Posts;
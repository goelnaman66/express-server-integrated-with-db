<template>
  <div id="app">
    <h1>My ToDos App</h1>
    <ul>
      <li v-for= "post of posts" :key="post.id">{{post.title}}</li>
    </ul>
    <input type="text" v-model="postdata" @keyup.enter="addTodo">
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'App',

  data() {
    return {
      posts: [],
      postdata: ""
    }
  },

  //to display the saved posts
  async created(){
    try{
      const res = await axios.get("http://localhost:3000/api/post");
      this.posts = res.data.data;
    }
    catch(e){
      console.log(e);
    }
  },
  methods: {
  async addTodo(){
    const res = await axios.post("http://localhost:3000/api/post",{title:this.postdata});
    this.posts=[...this.posts, res.data.data];
    this.postdata='';
  }
}
  
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

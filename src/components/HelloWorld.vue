<template>
  <div class="hello">
    <form @submit.prevent="log">
      <div class="container">
        <label for="uname" style="float: left;"><b>Username</b></label>
        <input type="text" v-model="email" placeholder="Enter Username" name="uname" >

        <label for="psw" style="float: left;"><b>Password</b></label>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" >
            
        <!-- <button type="submit">Login</button> -->
      </div>
      <button style="width: 20%;" type="submit">login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data(){
    return{
      email:'',
      password:'',
    }
  },
  props: {
    msg: String
  },
  methods:{
    async log(){
      const res = await axios.post('/login',{
        email : this.email,
        password : this.password
      });
      localStorage.setItem('token',res.data.token);
      if(res.status == 200){
        this.$router.push('/about');
      }else {
        console.log('err');
      }
    }
  }
}
</script>
<style src="../assets/style.css"/>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

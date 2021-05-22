/**
 * 
 */

var join = {
	template:'<div><h3>join form</h3>'
			+'id:<input type="text" v-model="id"/><br/>'
			+'pwd:<input type="password" v-model="pwd"/><br/>'
			+'name:<input type="text" v-model="name"/><br/>'
			+'email:<input type="text" name="type" value="1" v-model="email"/>seller'
			+'<input type="radio" name="type" value="2" v-model="type">consumer<br/>'
			+'<button v-on:click="join">join</button>'
			+'</div>',
	
	data(){
		return{
			id:'',
			pwd:'',
			name:'',
			email:'',
			type:0
		};
	},
	methods:{
		join:function(){
		const form = new URLSearchParams();
		form.append('id',this.id);
		form.append('pwd',this.pwd);
		form.append('name',this.name);
		form.append('email',this.email);
		form.append('type',this.type);
		axios.post('http://localhost:8888/members',form)
		.then(function(res){
			if(res.data.result){
				alert('good');
			}else{
				alert('fail');
			}
		});
		}
	}
}

var login = {
		template:'<div><h3>login form</h3>'
			+'id:<input type="text" v-model="id"/><br/>'
			+'pwd:<input type="password" v-model="pwd"/><br/>'
			+'<button v-on:click="join">join</button>'
			+'</div>',
	
	data(){
		return{
			id:'',
			pwd:'',
		};
	},
	methods:{
		login:function(){
			const self = this;
			axios.get('http://localhost:8080/members/'+self.id)
			.then(function(res){
			if(res.data.result){
				if(res.data.m==null){
					alert('없는 아이디')
				}else{
					if(res.data.m.pwd==self.pwd){
						alert('로그인');
						sessionStorage.setItem("login_id", self.id);
					}else{
						alert('패스워드 불일치');
					}
				}
				}else{
					alert('fail')
				}
			});
		}
	}
};

var MyInfo = {
	template:'<div><h3>MyInfo form</h3>'
			+'id:<input type="text" v-model="id"/><br/>'
			+'name:<input type="text" v-model="name"/><br/>'
			+'email:<input type="text" name="type" value="1" v-model="email"/>seller'
			+'<input type="text" v-model="typeval"><br/>'
			+'<button v-on:click="edit">수정</button>'
			+'</div>',
	
	data(){
		return{
			id:'',
			pwd:'',
			name:'',
			email:'',
			type:''
		};
	},
	created:function(){
		this.sessionStorage.getItem("login_id");
		if(this.id==null || this.id ==''){
			alert('로그인 하세요');
			app.$router.push('/login')
		}else{
			alert(this.id+'info page');
		}
	},
	methods:{

	}
};

var routes = [
	{
	path:'join',
	component:Join
	},
	{
	path:'login',
	component:Login
	},
	{
	path:'myinfo',
	component:MyInfo,
	name:'MyInfo'
	},
]

var router = new VueRouter({
	routes
});
var app = new Vue({
	router
}).$mount('#app');
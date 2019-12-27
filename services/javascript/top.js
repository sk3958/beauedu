var topMeng = Vue.component('top-menu', {
	props: {
		menus: Array,
		logined: String,
		userkind: String
	},
	template:
		`
		<div class="nav">
			<button v-for="menu in menus"
				v-if="!menu.logined || menu.logined == logined"
				v-show="!menu.userKind || menu.userKind.indexOf(userkind) >= 0"
				v-on:click="go(menu.url)"
				v-bind:class="menu.class">{{ menu.text }}</button>
		</div>
		`,
	methods: {
		go: function (url) {
			window.location.href = url
		}
	}
})

var runTopMenu = function (logined, userKind) {
	var app = new Vue({
		el: '#header',
		data: {
			buttons: [
				{ text: 'Home', url: '/', class: 'nav-button' },
				{ text: 'What We Do', url: '#', class: 'nav-button' },
				{ text: 'For Students', url: 'selectStudentProfile', userKind: '01 99', class: 'nav-button' },
				{ text: 'For Teachers', url: 'selectTeacherProfile', userKind: '02 99', class: 'nav-button' },
				{ text: 'Contract', url: 'selectContract', userKind: '99', class: 'nav-button' },
				{ text: 'Report', url: 'selectReport', userKind: '99', class: 'nav-button' },
				{ text: 'Login', url: '/', logined: 'no', class: 'nav-button' },
				{ text: 'Logout', url: 'Logout', logined: 'yes', class: 'nav-button' }
			],
			signIn: logined,
			userType: userKind
		}
	})
}


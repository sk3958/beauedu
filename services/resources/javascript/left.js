Vue.component('left-menu', {
	props: {
		menus: Array,
		userkind: String
	},
	template:
		`<ul id="menu_tree" class="menu">
			<li v-for="menu in menus"
				v-if="!menu.userKind || menu.userKind.indexOf(userkind) >= 0"
				class="menu-level-1">
				<a href="#" v-bind:class="menu.class">{{ menu.text }}</a>
				<div v-if="menu.hasChildren" v-bind:id="menu.divID">
					<ul class="menu">
						<li v-for="child in menu.children">
							<a v-bind:href="child.url" class="tree-child">{{ child.title }}</a>
						</li>
					</ul>
				</div>
			</li>
		</ul>`,
	methods: {
		go: function (url) {
			window.location.href = url
		}
	}
})

var runLeftMenu = function (userKind) {
	var app = new Vue({
		el: '#left_menu',
		data: {
			userType: userKind,
			trees: [
				{
					text: 'Home',
					url: '#',
					class: 'tree-no-child',
					hasChildren: false,
					children: []
				},
				{
					text: 'What We Do',
					url: '#',
					class: 'tree-no-child',
					hasChildren: false,
					children: []
				},
				{
					text: 'For Students',
					url: '#',
					class: 'tree-has-child',
					hasChildren: true,
					divID: 'studentMenu',
					userKind: '01 99',
					children: [
						{ title: 'Student Application', url: 'selectStudentProfile' },
						{ title: 'Find a Teacher', url: 'findTeacher' },
						{ title: 'Careers with Our Partners', url: '#' }
					]
				},
				{
					text: 'For Teachers',
					url: '#',
					class: 'tree-has-child',
					hasChildren: true,
					divID: 'teacherMenu',
					userKind: '02 99',
					children: [
						{ title: 'Join us', url: 'selectTeacherProfile' },
						{ title: 'Find Students', url: 'findStudent' },
						{ title: 'Class Report', url: 'reportPage' },
						{ title: 'Opportunities with Our Partners', url: '#' }
					]
				},
				{
					text: 'For Managers',
					url: '#',
					class: 'tree-has-child',
					hasChildren: true,
					divID: 'managerMenu',
					userKind: '99',
					children: [
						{ title: 'View Contracts', url: 'selectContract' },
						{ title: 'View Reports', url: 'selectReport' }
					]
				}
			]
		}
	})
}

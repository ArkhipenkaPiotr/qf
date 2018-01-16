import angular from 'angular'
import routefile from './routes'
import login from './components/login'
import news from './components/news'
import edit from './components/edit'
import users from './components/users'
import profile from './components/profile'
import base from './components/base'

import '../assets/styles/styles.css'
import router from 'angular-ui-router'
import storage from 'angular-storage'
import ngInfiniteScroll from 'ng-infinite-scroll'

import loginService from './services/loginService'
import requestFactory from './services/requestFactory'
import usersService from './services/usersService'
import newsService from './services/newsService'
import addressService from './services/addressService'
import projectsService from './services/projectsService'

require('ng-upload');

export default angular.module('app', [
    router,
    storage,
    ngInfiniteScroll,
    'ngUpload'
])
    .config(routefile)
    .component('login', login)
    .component('news', news)
    .component('users', users)
    .component('profile', profile)
    .component('edit', edit)
    .component('base', base)
    .factory('loginService',loginService)
    .factory('usersService',usersService)
    .factory('requestFactory', requestFactory)
    .factory('newsService', newsService)
    .factory('addressService', addressService)
    .factory('projectsService', projectsService)


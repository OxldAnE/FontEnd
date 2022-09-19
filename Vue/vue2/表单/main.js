new Vue({
    el : '#root',
    data() {
        return {
            userInfo : {
                username : '',
                password : '',
                age      : undefined,
                region   : '请选择',
                gender   : '',
                hobby    : [],
                other    : '',
                agree    : '',
            },
        }
    },
    methods : {
        postData() {
            console.log(this.userInfo)
        },
    },
})
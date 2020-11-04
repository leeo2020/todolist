(function(window) {
    'use strict';
    window.storage = {
        getStorage() {
            return JSON.parse(window.localStorage.getItem('todos')||'[]');
        },
        setStorage(json) {
            window.localStorage.setItem('todos', JSON.stringify(json))
        }
    }
    window.vm = new Vue({
        el: '.todoapp',
        data: {
            title: 'Tomato工作法',
            job: '',
            status: true,
            isEditing: -1,
            count: 0,
            flag: '',
			tasks:window.storage.getStorage()
        },
        computed: {
            leftCount() {
            	// console.log(typeof JSON.parse(this.tasks),JSON.parse(this.tasks))
                this.count = 0
                this.tasks.forEach(v => {
                    if (!v.finished) {
                        this.count++
                    }
                })

                return this.count
            }
        },
        methods: {
            show(i) { //task.finished true已完成 this.flag.finished 查看已完成
                if (this.flag === '') {
                    return true
                } else if (this.flag.finished == i) {
                    return true
                }else{
					return false
				}
            },
            toggleAll: function() {
                this.tasks.forEach(v => {
                    v.finished = this.status;
                })
                this.status = !this.status;
				window.storage.setStorage(this.tasks)
            },
            clearFinished() {
                this.tasks = this.tasks.filter(v => {
                    return !v.finished
                })
				window.storage.setStorage(this.tasks)
            },
            addList: function() {
                if (this.job != '') {
                    this.tasks.push({
                        id: this.tasks.length + 1,
                        content: this.job,
                        finished: false
                    })
                    this.job = '';
					console.log(window.storage.getStorage())
					window.storage.setStorage(this.tasks)
                }
            },
            destory: function(index) {
                this.tasks = this.tasks.filter((v, i) => {
                    return v.id != index
                })
				window.storage.setStorage(this.tasks)
            }

        }
    })

    window.onhashchange = function() {
        if (location.hash == '#/active') {
            window.vm.flag = { finished: false }
            return
        } else if (location.hash == '#/completed') {
            window.vm.flag = { finished: true }
            return
        } else {
            window.vm.flag = ""
            return
        }
    }

})(window);

export default {
    components: {},
    template: `
        <div id="box">
            <div id="con1" ref="con1" :class="{anim:animate==true}" @mouseenter="mEnter" @mouseleave="mLeave">
                <p v-for='item in items'>中奖人的名字是--{{item.name}}</p>
            </div>
        </div>
    `,
    data () {
        return {
            animate: false,
            items: [ //消息列表对应的数组
                { name: "王勤1" },
                { name: "王勤2" },
                { name: "王勤3" },
                { name: "王勤4" },
                { name: "王勤5" }
            ]
        }

    },
    mounted () {
        this.$nextTick(() => {
            this.timer1 = setInterval(this.scroll, 1000)
        })
    },
    methods: {
        scroll () {
            if (!this.$refs.con1) return
            let con1 = this.$refs.con1
            con1.style.marginTop = '-30px'
            this.animate = !this.animate
            var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
            setTimeout(function () {
                that.items.push(that.items[0])
                that.items.shift()
                con1.style.marginTop = '0px'
                that.animate = !that.animate // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了

            }, 500)

        },
        mEnter () {
            clearInterval(this.timer1)
        },
        mLeave () {
            this.timer1 = setInterval(this.scroll, 1000)
        },


    }

}
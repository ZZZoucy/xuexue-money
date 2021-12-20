<template>
    <div class="a">
        <header class="community-header">
            <span>社区</span>
        </header>
        <main class="community-main">
            <div>
                <span class="zhiding">置顶</span>
                <span class="aticle">省钱攻略—好物推荐！</span>
            </div>
            <div>
                <span class="zhiding">置顶</span>
                <span class="aticle">学会理财—看看基金达人怎么说？</span>
            </div>
        </main>
        <footer class="community-footer">
            <div class="content">
                <div class="content-header">
                    <div class="yonghu">
                        <img width="40px" height="40px" src="../assets/touxiang.png"/>
                        <div class="yonghu-xinxi">
                            <p>小新要加油鸭～</p>
                            <p>3小时前</p>
                        </div>
                    </div>
                    <div class="guanzhu">
                        <Icon name="guanzhu"/>关注
                    </div>
                </div>
                <div class="zhaopian">
                    <img width="100px" src="../assets/1.jpeg"/>
                    <img width="100px" src="../assets/1.jpeg"/>
                    <img width="100px" src="../assets/1.jpeg"/>
                    <p>好物链接：<a href="https://m.tb.cn/h.fRnzHMz?sm=ab0bfd">https://m.tb.cn/h.fRnzHMz?sm=ab0bfd</a></p>
                </div>
            </div>
            <div class="content">
                <div class="content-header">
                    <div class="yonghu">
                        <img width="40px" height="40px" src="../assets/touxiang.png"/>
                        <div class="yonghu-xinxi">
                            <p>小新要加油鸭～</p>
                            <p>3小时前</p>
                        </div>
                    </div>
                    <div class="guanzhu">
                        <Icon name="guanzhu"/>关注
                    </div>
                </div>
                <div class="zhaopian">
                    <img width="100px" src="../assets/2.jpeg"/>
                    <img width="100px" src="../assets/2.jpeg"/>
                    <img width="100px" src="../assets/2.jpeg"/>
                    <p>好物链接：<a href="https://m.tb.cn/h.fRnzHMz?sm=ab0bfd">https://m.tb.cn/h.fRnzHMz?sm=ab0bfd</a></p>
                </div>
            </div>
            <div class="content">
                <div class="content-header">
                    <div class="yonghu">
                        <img width="40px" height="40px" src="../assets/touxiang.png"/>
                        <div class="yonghu-xinxi">
                            <p>小新要加油鸭～</p>
                            <p>3小时前</p>
                        </div>
                    </div>
                    <div class="guanzhu">
                        <Icon name="guanzhu"/>关注
                    </div>
                </div>
                <div class="zhaopian">
                    <img width="100px" src="../assets/3.jpeg"/>
                    <img width="100px" src="../assets/3.jpeg"/>
                    <img width="100px" src="../assets/3.jpeg"/>
                    <p>好物链接：<a href="https://m.tb.cn/h.fRnzHMz?sm=ab0bfd">https://m.tb.cn/h.fRnzHMz?sm=ab0bfd</a></p>
                </div>
            </div>
        </footer>
        <Nav class="nav"/>
    </div>
</template>

<script>
    export default {
        name:'Community',
        
    }
</script>

<style scoped>
.a{
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.community-header{
    text-align: center;
    font-size: 22px;
    padding: 18.5px 16px;
    font-weight: bold;
    background: white;
    height: 70px;
}
.community-main,.community-footer{
    margin-top: 8px;
    padding: 1px 0px;
    background: white;
    width: 100%;
}
.community-main{
    height: 138px - 56px;
}
.community-main div{
    margin: 16px;
}
.zhiding{   
    background: #a1decf;
    font-size: 14px;
    border-radius: 6px;
    padding: 2px 6px;
    margin-right: 6px;
}
.community-footer{
    overflow-y: auto;
    flex: 1;
    margin-top: 12px;
    margin-bottom: 16px;
}
.community-footer::-webkit-scrollbar {
    display: none;
}
.nav{
    height: 54px;
}

.content-header{
    display: flex;
    justify-content: space-between;
    padding: 16px;
}
.yonghu{
    display: flex;
    justify-content: space-between;
}
.yonghu img{
    border-radius: 100%;
}
.yonghu-xinxi{
    margin-left: 6px;
}
.guanzhu{
    border: 1px solid #999;
    height: 24px;
    border-radius: 8px;
    font-size: 14px;
    padding: 0px 4px;
    font-weight: bold;
}
.zhaopian{
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0px 52px;
   
}
.zhaopian img{
    border-radius: 6px;
}
.zhaopian p{
    margin-top: 8px;
    font-size: 14px;
    color: #999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
<template>
    <div class="a">
        <header class="financial-header">
            <span>理财</span>
        </header>
        <main class="financial-footer">
            <img src="../assets/小白理财.jpg" alt="小白理财" />
            <h3>更多课程</h3>
            <div class="classes">
                <div>
                    <img src="../assets/基金训练营.jpg" alt="基金训练营" />
                    <div class="right">
                        <h4>基金训练营</h4>
                        <p>轻轻松松，每年给自己加薪</p>
                        <span class="count1">共12讲</span><span class="count2">168元</span>
                    </div>
                </div>
                <div>
                    <img src="../assets/股票训练营.jpg" alt="股票训练营" />
                    <div class="right">
                        <h4>股票训练营</h4>
                        <p>从入门到实践，让好公司为你赚钱</p>
                        <span class="count1">共12讲</span><span class="count2">168元</span>
                    </div>
                </div>
                <div>
                    <img src="../assets/学基础保险课.jpg" alt="学基础保险课" />
                    <div class="right">
                        <h4>学基础保险课</h4>
                        <p>最全保险避坑指南</p>
                        <span class="count1">共12讲</span><span class="count2">128元</span>
                    </div>
                </div>
                <div>
                    <img src="../assets/货币基金捡钱课.jpg" alt="货币基金捡钱课" />
                    <div class="right">
                        <h4>货币基金捡钱课</h4>
                        <p>货币基金最全攻略</p>
                        <span class="count1">共6讲</span><span class="count2">68元</span>
                    </div>
                </div>
                <div>
                    <img src="../assets/基金高阶训练营.jpg" alt="基金高阶训练营" />
                    <div class="right">
                        <h4>基金高阶训练营</h4>
                        <p>提收益，降风险，成为基金达人</p>
                        <span class="count1">共6讲</span><span class="count2">198元</span>
                    </div>
                </div>
            </div>
        </main>
        <Nav class="nav" />
    </div>
</template>

<script>
export default {
    name: "financial",
};
</script>

<style scoped>
.a {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.financial-header {
    text-align: center;
    font-size: 22px;
    padding: 18.5px 16px;
    font-weight: bold;
    background: white;
    height: 70px;
}
.financial-footer {
    margin-top: 8px;
    padding: 1px 0px;
    background: white;
    width: 100%;
    overflow-y: auto;
    flex: 1;
    margin-top: 12px;
    margin-bottom: 16px;
}
.financial-footer::-webkit-scrollbar {
    display: none;
}
.financial-footer > img {
    width: 100%;
}
.financial-footer h3 {
    font-weight: bold;
    position: relative;
    left: 10px;
}
.financial-footer .classes div {
    margin: 10px 1px 40px 0px;
}
.financial-footer .classes div h4 {
    font-weight: bold;
    margin-left: 140px;
    font-size: 18px;
}
.financial-footer .classes div p {
    margin-left: 140px;
    color: #999;
    font-size: 15px;
}
.financial-footer .classes div span {
    margin-top: 10px;
}
.financial-footer .classes div .count1 {
    margin-left: 10px;
    color: #999;
    position: relative;
    top: 14px;
    font-size: 15px;
}
.financial-footer .classes div .count2 {
    margin-left: 100px;
    color: red;
    float: right;
    margin-right: 10px;
    font-size: 18px;
}
.financial-footer .classes img {
    width: 35%;
    float: left;
}

.nav {
    height: 54px;
}
</style>

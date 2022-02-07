<template>
    <layout>
        <header class="me-header">
            <div class="me-avatar">
                <img src="../assets/avatar.jpg" />
            </div>
            <p class="me-name">Chayym</p>
        </header>
        <div class="chang">常用功能</div>
        <main class="me-main">
            <ul class="me-ul">
                <li>
                    <router-link to="/statistics">
                        <img height="50px" src="../assets/账本.png" />
                        <p>我的账单</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/labels">
                        <img height="50px" src="../assets/标签.png" />
                        <p>标签管理</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/financial">
                        <img height="50px" src="../assets/理财.png" />
                        <p>理财</p>
                    </router-link>
                </li>
                <li>
                    <a href="https://www.zhihu.com/people/tian-cai-z-70">
                        <img height="50px" src="../assets/知乎.png" />
                        <p>作者知乎</p>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/ZZZoucy">
                        <img height="50px" src="../assets/github1.png" />
                        <p>作者Github</p>
                    </a>
                </li>
            </ul>
        </main>
    </layout>
</template>

<script>
export default {};
</script>

<style scoped>
.me-header {
    height: 170px;
    width: 100%;
    position: relative;
}
.me-avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    outline: 2px solid white;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.me-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.me-name {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: black;
    font-weight: bold;
}
.me-main {
    /* border: 1px solid red; */
    width: 100%;
    margin-top: 12px;
}
.chang {
    font-size: 18px;
    font-weight: bold;
    padding: 12px 0px 0px 16px;
    color: #999;
}
.me-ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
}
.me-ul li {
    background-color: #f3f3f1;
    border-radius: 12px;
    padding: 12px 0px;
    width: 26.55555%;
    margin: 14px;
    margin-top: 0px;
}
.me-ul li p {
    font-size: 16px;
    font-weight: bold;
    padding-top: 2px;
}
.me-ul li .img {
    width: 100px;
    height: 100px;
}
</style>

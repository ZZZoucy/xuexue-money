<template>
    <layout>
        <header class="me-header">
            <div class="me-avatar" @click=""></div>
            <p class="me-name">昵称</p>
        </header>
        <main>
            <router-link to="/statistics" class="me-statistics">
                <div class="bill">
                    <span>账单</span>
                    <Icon name="right" />
                </div>
                <div class="message">
                    <ul>
                        <li>收入</li>
                        <li>¥0.0</li>
                    </ul>
                    <ul>
                        <li>支出</li>
                        <li>¥0.0</li>
                    </ul>
                    <ul>
                        <li>结余</li>
                        <li class="jieyu">¥0.0</li>
                    </ul>
                </div>
            </router-link>
        </main>
        <footer>
            <router-link to="/labels">
                <div class="me-tables">
                    <span>标签</span>
                    <Icon name="right" />
                </div>
            </router-link>
        </footer>
    </layout>
</template>

<script>
export default {};
</script>

<style scoped>
.me-header {
    height: 200px;
    width: 100%;
    background-color: #b7dcd3;
    position: relative;
}
.me-avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 2px solid white;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.me-name {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: white;
    font-weight: bold;
}
.me-statistics {
    width: 100%;
    margin: 12px 0;
    background-color: white;
}
.me-tables {
    width: 100%;
    margin: 12px 0;
    background-color: white;
}
.me-statistics {
    display: flex;
    flex-direction: column;
}
.me-statistics .bill {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 12px 32px;
}
.me-statistics .message {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin: 0px 32px;
    padding-bottom: 10px;
}
.me-tables {
    font-weight: bold;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 32px;
}
.jieyu {
    color: #df110e;
}
</style>

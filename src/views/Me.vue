<template>
    <layout>
        <header class="me-header">
            <div class="me-avatar">
                <img src="../assets/avatar.jpg">
            </div>
            <p class="me-name">Chayym</p>
        </header>
        <main>
            <router-link to="/statistics" class="me-statistics">
                <div class="bill">
                    <span>账单</span>
                    <Icon name="right" />
                </div>
            </router-link>
        </main>
        <footer>
            <router-link to="/labels">
                <div class="me-tables">
                    <span>标签管理</span>
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
    outline: 2px solid white;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
img{
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
    margin: 10px 32px;
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

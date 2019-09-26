<template>
    <header class="header">
        <nav class="container flex-container">
            <div class="flex-item">
                <img src="../../assets/img/logo.png" alt="千兰" />
            </div>
            <div class="flex-item pr50">
                <img src="../../assets/img/logo.png" alt="千兰" />
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 70px;
        line-height: 70px;
        background: linear-gradient(to right, #0154af 0%, #049ad7 100%)
    }
    .flex-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .flex-item {
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-size: 32px;

            &.pr50 {
                margin-right: 50px
            }
            img {
                width: 100%
            }
        }
    }
</style>
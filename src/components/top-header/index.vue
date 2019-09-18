<template>
    <header class="header">
        <nav class="container flex-container">
            <div class="flex-item">左logo</div>
            <div class="flex-item pr50">右logo</div>
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
        display: flex;
        align-items: center;
        justify-content: space-between;

        .flex-item {
            color: #FFFFFF;
            font-size: 32px;

            &.pr50 {
                padding-right: 50px
            }
        }
    }
</style>
<template>
    <header class="header">
        <nav class="container flex-container">
            <div class="flex-item logo">
                <slot name="nav-left"></slot>
            </div>
            <div class="flex-item">
                <slot name="nav-right"></slot>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    .container {
        margin: 0 auto;
        width: 1200px;
    }
    .header {
        width: 100%;
        height: 60px;
        line-height: 70px;
        background: linear-gradient(to right, #0154af 0%, #049ad7 100%)
    }
    .flex-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .flex-item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-size: 32px;
            &.logo {
                // width: 60px;
                // height: 60px;
            }
            img {
                display: block;
                max-width: 100%
            }
        }
    }
    .nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  font-size: 14px;

  li {
    cursor: pointer;
    min-width: 50px;
    padding: 0 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &:first-child {
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
<template>
    <div class="box">
        <p>hello world11</p>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld'
};
</script>

<style lang="less">
@import '../less/index.less';
@color: red;
.box {
    background: @color;
}

a,
input,
button {
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-focus-ring-color: rgba(0, 0, 0, 0);
    border: none;
}
.button {
    display: block;
    margin: 12px auto;
    width: 250px;
    height: 40px;
    font: 13px miui;
    color: #fff;
    background-color: @primary-btn-color;
    border-radius: 25px;
    text-align: center;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.button.disabled {
    background: #d6d6d6;
}

.button__loading {
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 5px;
    width: 18px;
    height: 18px;
    /* background: url(./image/loading.webp) no-repeat; */
    background-size: 18px 18px;
    animation: spin linear 1s infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>

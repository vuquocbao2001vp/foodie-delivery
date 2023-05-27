<template>
    <div class="contact-container">
        <div class="contact-banner flex">
            <div>HAPPY CÙNG FOODIE</div>
            <div class="banner-hotline">0369.228.888</div>
        </div>
    </div>
    <div class="contact-info-container flex">
        <div class="contact-left">
            <div class="contact-title">VỀ CHÚNG TÔI</div>
            <div class="space-border"></div>
            <div @click="linkToPath('/intro')" class="contact-text pointer">Giới thiệu</div>
            <div @click="linkToPath('/menu/all')" class="contact-text pointer">Sản phẩm</div>
            <div @click="linkToPath('/news')" class="contact-text pointer">Tin Tức</div>
            <div @click="linkToPath('/contact')" class="contact-text pointer">Liên hệ</div>
        </div>
        <div class="contact-right">
            <div class="contact-title">THÔNG TIN LIÊN HỆ</div>
            <div class="space-border"></div>
            <div class="contact-text">Điện thoại: <span class="text-italic">0369228888</span></div>
            <div class="contact-text">Địa chỉ: <span class="text-italic">133 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</span></div>
            <div class="contact-text">Email: <span class="text-italic">contactus@foodie.vn</span></div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        linkToPath(path){
            this.$router.push({path: path})
        }
    }
}
</script>
<style scoped>
.contact-container{
    width: 100%;
    padding: 36px 10%;
    box-sizing: border-box;
}
.contact-banner {
    width: 100%;
    height: 120px;
    background-color: transparent;
    background-image: linear-gradient(90deg, #F99483 40%, #63ACBE 100%);
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.32);
    border-radius: 20px;
    justify-content: space-between;
    color: #fff;
    font-family: Font Bold;
    font-size: 3.2rem;
    padding-right: 48px;
    padding-left: 120px;
}
.banner-hotline {
    background-color: black;
    font-size: 1.5rem;
    padding: 12px 24px;
    border-radius: 10px;
}
.contact-info-container{
    width: 100%;
    padding: 36px 10%;
    box-sizing: border-box;
    align-items: flex-start;
    border-top: 1px solid var(--input-normal-border-color);
    justify-content: space-around;
}
.contact-title{
    font-family: Font Bold;
    font-size: 1.3rem;
    color: var(--text-secondary-color);
    padding-bottom: 6px;
}
.contact-text {
    font-size: 1.2rem;
    color: var(--text-secondary-color);
    padding: 6px 0;
}
.text-italic{
    font-family: Font Italic;
    color: var(--text-placeholder-color);
}
.pointer{
    cursor: pointer;
}
.pointer:hover {
    color: var(--text-red-color);
}
.space-border{
    width: 56px;
    height: 4px;
    background-color: var(--input-normal-border-color);
    border-radius: 4px;
    margin-bottom: 8px;
}
</style>
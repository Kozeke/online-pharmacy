<template>
  <div class="footer">
    <div class="section">
      <div class="sub_header">
        <h2>Покупателям</h2>
      </div>
      <div class="sub_text">
        <a @click="$router.push({path: '/howToBuy'})">Как сделать покупку</a>
        <!-- <a @click="$router.push({path: '/complain'})">Книга жалоб</a> -->
        <!-- <a>Гарантия возврата денег</a> -->
      </div>
    </div>
    <div class="section">
      <div class="sub_header">
        <h2>Продавцам</h2>
      </div>
      <div class="sub_text">
        <a @click="$router.push({path: '/howToAdd'})">Как добавить продукт</a>
        <a @click="$router.push({path: '/register'})">Регистрация</a>
        <a @click="$router.push({path: '/agreePolicy'})">Пользовательское соглашение</a>
      </div>
    </div>
    <div class="section">
      <div class="sub_header">
        <h2>Информация</h2>
      </div>
      <div class="sub_text">
        <a @click="$router.push({path: '/aboutUs'})">О нас</a>
        <a @click="$router.push({path: '/aboutPay'})">Об оплате</a>
        <a @click="$router.push({path: '/aboutShipping'})">О доставке</a>
        <a>Курьерские службы</a>
      </div>
    </div>
    <div class="section">
      <div class="sub_header">
        <h2>Контакты</h2>
      </div>
      <div class="sub_text">
        <span href>
          Call-center:
          <a class="link" href="tel:+7(701)7052899">+7(701)7052899,+7 708 837 4599</a>
        </span>
        <span href>
          Email:
          <a class="link" href="mailto:webmaster@example.com">miraptek.noreply@gmail.com</a>
        </span>
        <!-- <span class="feedback">Оставайтесь на связи:</span>
                <div class="social">
                    <a href=""><img src="https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png"/></a>
                    <a href=""><img src="https://cdn4.iconfinder.com/data/icons/social-circle/512/vk-512.png" alt=""></a>
                    <a href=""><img src="https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-37-512.png" alt=""></a>
                    <a href=""><img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-512.png" alt=""></a>
                </div>
                <div class="social_next">
                    <a href=""><img class="android" src="https://lh3.googleusercontent.com/qSTCb0X57SM9LP7G_UW8emN68uA1yEg_qsK68psO-lyexCIQG6BZt_vcLFjVOa-yCEm2"/><span>Google Play</span></a>
                    <a href=""><img class="zerokz" src="https://theme.zdassets.com/theme_assets/1061516/2a8a5957c066661491ac4629e83ea41dd0fc695e.png" alt=""></a>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.footer {
  margin-top: 50px;
  width: 100%;
  padding: 50px;
  background-color: #167f92;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.section {
  width: 20%;
  margin: 0 auto auto auto;
  .sub_header {
    h2 {
      font-size: 16px;
      font-family: montserrat;
      font-weight: 550;
    }
  }
  .sub_text {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    span {
      font-size: 14px;
      font-family: montserrat;
    }
    a {
      cursor: pointer;
      font-size: 14px;
      color: rgb(230, 238, 238);
      font-family: montserrat;
      padding: 2px 0;
    }
    a:hover {
      color: #999999;
      text-decoration: none;
    }
    .feedback {
      font-size: 14px;
    }
  }
  .social {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
    img {
      height: 30px;
      width: 30px;
      margin: 0 5px;
    }
  }
  .social_next {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
    .android {
      height: 30px;
      width: 30px;
      margin: 0;
    }
    .zerokz {
      height: 30px;
      width: 80px;
      margin: 0 5px;
    }
    a:first-of-type {
      background-color: rgb(157, 187, 75);
      border-radius: 3px;
    }
    span {
      font-size: 0.8rem;
      color: #fff;
      margin: 0 5px 0 0;
    }
  }
}
.link {
  font-size: 1rem;
  margin-left: 5px;
}
.section:first-of-type {
  margin-left: 6%;
}
.section:last-of-type {
  margin-right: 6%;
  width: 26%;
}
@media screen and (max-width: 958px) {
  .footer {
    padding: 0 50px 50px 50px;
  }
  .section {
    width: 44% !important;
    margin: 30px 3% 0 3%;
  }
  .section:first-of-type {
    margin-left: 3%;
  }
  .section:last-of-type {
    margin-right: 3%;
  }
  .sub_header h2 {
    font-size: 14px !important;
  }
  .sub_text {
    a {
      font-size: 14px !important;
    }
    span {
      font-size: 14px !important;
    }
  }
}
@media screen and (max-width: 667px) {
  .footer {
    padding: 0 40px 40px 40px;
  }
  .section {
    width: 44% !important;
    margin: 30px 3% 0 3%;
  }
  .section:first-of-type {
    margin-left: 3%;
  }
  .section:last-of-type {
    margin-right: 3%;
  }
  .sub_header h2 {
    font-size: 13px !important;
  }
  .sub_text {
    a {
      font-size: 12px !important;
    }
    span {
      font-size: 12px !important;
    }
  }
}
@media screen and (max-width: 420px) {
  .footer {
    padding: 0 35px 35px 35px;
  }
  .section {
    width: 46% !important;
    margin: 25px 2% 0 2%;
  }
  .section:first-of-type {
    margin-left: 2%;
  }
  .section:last-of-type {
    margin-right: 2%;
  }
  .sub_header h2 {
    font-size: 13px !important;
  }
  .sub_text {
    a {
      font-size: 12px !important;
    }
    span {
      font-size: 12px !important;
    }
  }
}
</style>

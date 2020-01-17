<template>
  <div class="about_us" v-if="$route.path == '/aboutPay'">
    <div class="text_part">
      <h2>Оплата при встрече с покупателем</h2>
      <p>Если при добавлении продукта продавец не выбрал способ доставки нашей курьерской службой, покупатель и продавец сами договариваются насчет оплаты и доставки.</p>
    </div>
    <div class="text_part">
      <h2>Оплата платежными картами онлайн на сайте</h2>
      <p>Если при добавлении препарата продавец выбрал способ доставки курьерской службой, покупатели могут оплатить онлайн стоимость покупки и услугу доставки.</p>
      <p>Ваш заказ обрабатывается курьерской службой только после оплаты.</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
@font-face {
  font-family: montserrat;
  src: url(/Applications/XAMPP/xamppfiles/htdocs/darihub.kz/resources/sass/montserrat/Montserrat-Light.otf);
}
.about_us {
  width: 72%;
  -webkit-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  -moz-box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  box-shadow: 1px 2px 23px 0px rgba(22, 127, 146, 0.3);
  border-radius: 3px;
  height: 100%;
  margin-bottom: 50px;
  padding: 18px 32px 0 32px;
}
.text_part {
  padding: 2.5%;
  font-family: montserrat;
  margin-bottom: 0;
  h2 {
    text-align: center;
    font-size: 22px;
    font-weight: 550;
    font-family: montserrat;
    background-color: rgba(22, 127, 146);
    border-radius: 26px;
    color: #fff;
    padding: 8px 18px;
  }
  span {
    font-weight: 550;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    font-family: montserrat;
    text-align: center;
  }
}
@media screen and (max-width: 1024px) {
  .about_us {
    width: 100%;
    margin-bottom: 30px;
    padding: 14px 24px 0 24px;
  }
}
@media screen and (max-width: 667px) {
  .about_us {
    margin-bottom: 20px;
    padding: 8px 16px 0 16px;
  }
  .text_part {
    h2 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>



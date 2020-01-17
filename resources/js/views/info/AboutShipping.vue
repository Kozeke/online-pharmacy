<template>
  <div class="about_us" v-if="$route.path == '/aboutShipping'">
    <div class="text_part">
      <h2>
        Курьерская служба работает в трех городах Казахстана:
        <br>Нур-Султан, Алматы и Шымкент
      </h2>
    </div>
    <div class="text_part">
      <h2>Способы доставки, сроки и цена</h2>
      <p>
        <strong>Самовывоз</strong> - получение товара в центре выдачи заказов.
      </p>
      <p>
        <strong>Доставка по городу</strong> - при оформлении заказа наша курьерская служба осуществит доставку в течении нескольких часов, при условии наличия товара в указанном городе(стоимость доставки 800тг)
      </p>
      <p>
        <strong>Доставка курьерской службой (По Казахстану)</strong> - доставка отправлений по указанному в заказе адресу, до двери по крупным областным центрам (от 2 до 14 дней).(стоимость услуги от 2000 тг)
      </p>
    </div>
    <div class="text_part">
      <h2>Условия курьерской доставки</h2>
      <p>
        Внимательно осмотрите товар, убедитесь в соответствии с перечнем, форма выпуска и дозировкой товаров согласно вашего заказа, отсутствии видимых механических повреждений, проверьте комплектность. Прием товара и бланк заказа подтвержденного вашей подписью свидетельствует об отсутствии претензий.
        При оплате за наличный расчет или оплаты онлайн вам будет выдан кассовый чек.
        Лекарственные средства предназначенные для отпуска по рецепту врача, отпускаются только при наличии рецепта, оформленного по всем правилам согласно
        <strong>ЗАКОНУ РЕСПУБЛИКИ КАЗАХСТАН О ЛЕКАРСТВЕННЫХ СРЕДСТВАХ</strong>
      </p>
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



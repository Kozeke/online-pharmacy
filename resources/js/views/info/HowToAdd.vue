<template>
  <div class="about_us" v-if="$route.path == '/howToAdd'">
    <div class="text_part">
      <h2>Как добавить препарат</h2>
      <p>Чтобы добавить препарат вы должны войти на сайт или зарегистрироваться</p>
      <ul type="square">
        <li>Если вы представитель аптеки ваши лекарство не будут проверяться администратором.</li>
        <li>Если вы не представляете аптеку то ваше объявление проверяется администратором.</li>
        <li>1)Чтобы ваше лекарство было в правильной категории перед добавлением узнайте к какому из перечисленных категории ваше лекарство принадлежит</li>
        <li>2) Вы не можете добавить продукт пока не заполните все обязательные поля(имя препарата, категория, производитель, цена, кол-во и способ доставки).</li>
        <li>3)Если вы выбрали способ доставки курьерской службой ваш попросят ввести номер карты если вы это еще не сделали</li>
        <li>4)Если у вас нету карты(деактивирована, потеряна и.т.д.) вы не можете использовать курьерскую службу предаставленные нашим сайтом</li>
      </ul>
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


